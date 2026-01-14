import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Loader2 } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "Suggest a high-protein dinner",
  "Replace lunch with something lighter",
  "Show eggless breakfast options",
  "Why am I not meeting my protein goal?",
];

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your nutrition assistant. I can help you with meal suggestions, recipe swaps, and nutrition questions. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "Suggest a high-protein dinner": "For a high-protein dinner, I recommend **Grilled Salmon with Sweet Potato**! It packs 45g of protein, is rich in omega-3 fatty acids, and takes only 30 minutes to prepare. The sweet potato adds healthy carbs for muscle recovery. Would you like me to add this to your meal plan?",
        "Replace lunch with something lighter": "How about a **Mediterranean Salad**? It's only 420 calories but still provides 22g of protein from chickpeas and feta. It's fresh, satisfying, and won't make you feel sluggish in the afternoon. Want me to swap your current lunch?",
        "Show eggless breakfast options": "Here are some delicious eggless breakfast options:\n\n1. **Overnight Oats** - 380 cal, 14g protein\n2. **Berry Yogurt Parfait** - 320 cal, 18g protein\n3. **Chia Pudding** - 290 cal, 12g protein\n\nAll are quick to prepare and packed with nutrients!",
        "Why am I not meeting my protein goal?": "Looking at your meal plan, you're currently getting about 98g of protein, but your goal is 150g. Here's how to bridge the gap:\n\n1. Add a protein shake between meals (+25g)\n2. Include Greek yogurt as a snack (+15g)\n3. Increase chicken portion at lunch (+12g)\n\nThese simple tweaks will help you hit your target! 💪",
      };

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[messageText] || "That's a great question! Based on your profile and goals, I'd suggest focusing on balanced meals with adequate protein. Would you like specific meal recommendations or help adjusting your current plan?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-4rem-5rem)] md:h-[calc(100vh-4rem)]">
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
          {isLoading && (
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
                  <span className="text-sm text-muted-foreground">Thinking...</span>
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

        {/* Input */}
        <div className="p-4 border-t border-border/50 bg-background">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your nutrition..."
              className="flex-1 h-12 rounded-xl"
              disabled={isLoading}
            />
            <Button
              type="submit"
              variant="hero"
              size="icon"
              className="h-12 w-12 rounded-xl"
              disabled={!input.trim() || isLoading}
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