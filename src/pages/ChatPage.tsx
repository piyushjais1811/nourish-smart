import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Loader2, ImagePlus, X } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useUser } from '@/contexts/UserContext';
import { getMealsForDay } from '@/data/sampleMeals';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageData?: string; // Base64 image data
  imagePreview?: string; // For displaying in chat
}

const suggestedQuestions = [
  "Suggest a high-protein dinner",
  "Replace lunch with something lighter",
  "Show eggless breakfast options",
  "What are the health benefits of omega-3?",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm NutriBot, your AI assistant. I can help you with meal suggestions, recipe swaps, nutrition questions, or really anything you'd like to chat about. 📸 **New!** Upload a food photo and I'll analyze its calories, nutrients, and compare it with your meal plan!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { userProfile } = useUser();

  // Get current meal plan context for the AI
  const mealPlanContext = useMemo(() => {
    const today = new Date();
    const hour = today.getHours();
    
    // Determine current meal time
    let currentMealTime = 'breakfast';
    if (hour >= 12 && hour < 15) currentMealTime = 'lunch';
    else if (hour >= 15 && hour < 18) currentMealTime = 'snacks';
    else if (hour >= 18) currentMealTime = 'dinner';
    
    // Get today's meals
    const mealsForDay = getMealsForDay(0, userProfile);
    
    const contextParts: string[] = [
      `Current time: ${today.toLocaleTimeString()} (${currentMealTime} time)`,
      `User's diet type: ${userProfile.dietType || 'anything'}`,
      '',
      "Today's Meal Plan:",
    ];
    
    if (mealsForDay.breakfast[0]) {
      const meal = mealsForDay.breakfast[0];
      contextParts.push(`- Breakfast: ${meal.name} (${meal.calories} cal, ${meal.protein}g protein, ${meal.carbs}g carbs, ${meal.fats}g fats)`);
    }
    if (mealsForDay.lunch[0]) {
      const meal = mealsForDay.lunch[0];
      contextParts.push(`- Lunch: ${meal.name} (${meal.calories} cal, ${meal.protein}g protein, ${meal.carbs}g carbs, ${meal.fats}g fats)`);
    }
    if (mealsForDay.snacks[0]) {
      const meal = mealsForDay.snacks[0];
      contextParts.push(`- Snacks: ${meal.name} (${meal.calories} cal, ${meal.protein}g protein, ${meal.carbs}g carbs, ${meal.fats}g fats)`);
    }
    if (mealsForDay.dinner[0]) {
      const meal = mealsForDay.dinner[0];
      contextParts.push(`- Dinner: ${meal.name} (${meal.calories} cal, ${meal.protein}g protein, ${meal.carbs}g carbs, ${meal.fats}g fats)`);
    }
    
    contextParts.push('');
    contextParts.push(`Most relevant meal to compare/swap: ${currentMealTime}`);
    
    return contextParts.join('\n');
  }, [userProfile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image too large', { description: 'Please select an image under 10MB.' });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type', { description: 'Please select an image file.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setSelectedImage(base64);
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    const hasImage = !!selectedImage;
    
    if (!messageText && !hasImage) return;
    if (isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText || (hasImage ? 'Analyze this food image' : ''),
      timestamp: new Date(),
      imageData: selectedImage || undefined,
      imagePreview: imagePreview || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    clearSelectedImage();
    setIsLoading(true);

    // Prepare messages for API
    const apiMessages = [...messages.filter(m => m.id !== '1'), userMessage].map(m => ({
      role: m.role,
      content: m.content,
      imageData: m.imageData,
    }));

    let assistantContent = '';
    
    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: apiMessages,
          imageData: hasImage ? selectedImage : undefined,
          mealPlanContext: hasImage ? mealPlanContext : undefined,
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        if (resp.status === 429) {
          toast.error('Rate limit exceeded', { description: 'Please try again in a moment.' });
        } else if (resp.status === 402) {
          toast.error('Service unavailable', { description: 'Please try again later.' });
        } else {
          toast.error('Failed to get response', { description: errorData.error || 'Please try again.' });
        }
        setIsLoading(false);
        return;
      }

      if (!resp.body) {
        throw new Error('No response body');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;
      const assistantId = (Date.now() + 1).toString();

      // Add empty assistant message that we'll update
      setMessages((prev) => [...prev, {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => 
                prev.map((m) => 
                  m.id === assistantId 
                    ? { ...m, content: assistantContent }
                    : m
                )
              );
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => 
                prev.map((m) => 
                  m.id === assistantId 
                    ? { ...m, content: assistantContent }
                    : m
                )
              );
            }
          } catch { /* ignore */ }
        }
      }

    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to send message', { description: 'Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-4rem-5rem)] md:h-[calc(100vh-4rem)]">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          className="hidden"
        />

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "flex gap-3",
                  message.role === 'user' ? "flex-row-reverse" : ""
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                    message.role === 'assistant'
                      ? "bg-gradient-success"
                      : "bg-muted"
                  )}
                >
                  {message.role === 'assistant' ? (
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  ) : (
                    <User className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    message.role === 'assistant'
                      ? "bg-card border border-border/50 shadow-soft"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {/* Show image preview if message has image */}
                  {message.imagePreview && (
                    <div className="mb-2 rounded-lg overflow-hidden">
                      <img 
                        src={message.imagePreview} 
                        alt="Uploaded food" 
                        className="max-w-full h-auto max-h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <p
                    className={cn(
                      "text-sm whitespace-pre-wrap",
                      message.role === 'assistant' ? "text-foreground" : ""
                    )}
                  >
                    {message.content.split('**').map((part, i) =>
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    )}
                  </p>
                  <p
                    className={cn(
                      "text-[10px] mt-1",
                      message.role === 'assistant'
                        ? "text-muted-foreground"
                        : "text-primary-foreground/70"
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-success shrink-0">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-card border border-border/50 rounded-2xl px-4 py-3 shadow-soft">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {selectedImage ? 'Analyzing image...' : 'Thinking...'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 pb-4"
          >
            <p className="text-xs text-muted-foreground mb-3">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSend(question)}
                  className="px-3 py-2 rounded-xl bg-muted text-sm text-foreground hover:bg-muted/80 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Image Preview */}
        {imagePreview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 pb-2"
          >
            <div className="relative inline-block">
              <img 
                src={imagePreview} 
                alt="Selected food" 
                className="h-20 w-20 object-cover rounded-xl border border-border"
              />
              <button
                onClick={clearSelectedImage}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-md hover:bg-destructive/90 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">📸 Food image ready for analysis</p>
          </motion.div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border/50 bg-background">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-xl shrink-0"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              <ImagePlus className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={imagePreview ? "Add a message (optional)..." : "Ask me anything..."}
              className="flex-1 h-12 rounded-xl"
              disabled={isLoading}
            />
            <Button
              type="submit"
              variant="hero"
              size="icon"
              className="h-12 w-12 rounded-xl"
              disabled={(!input.trim() && !imagePreview) || isLoading}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatPage;
