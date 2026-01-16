import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check, Download, ShoppingCart, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useLockedMeals } from '@/hooks/useLockedMeals';
import { useAuth } from '@/contexts/AuthContext';

interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
}

// Categorize ingredients
const categorizeIngredient = (ingredient: string): string => {
  const lowerIngredient = ingredient.toLowerCase();
  
  // Proteins
  if (/chicken|salmon|fish|egg|paneer|tofu|dal|lentil|bean|beef|bacon|shrimp|tuna|yogurt|cheese|protein/.test(lowerIngredient)) {
    return 'Proteins';
  }
  
  // Vegetables
  if (/onion|tomato|potato|spinach|carrot|pepper|broccoli|cucumber|lettuce|cabbage|mushroom|asparagus|avocado|zucchini|cauliflower|capsicum|vegetable|curry leaves|coriander|cilantro|ginger|garlic|chili|mint|basil|dill/.test(lowerIngredient)) {
    return 'Vegetables';
  }
  
  // Fruits
  if (/banana|apple|berry|mango|lemon|lime|orange|pineapple|coconut|dates|fig|grape/.test(lowerIngredient)) {
    return 'Fruits';
  }
  
  // Grains & Carbs
  if (/rice|wheat|oat|quinoa|bread|roti|naan|bagel|semolina|flour|pasta|noodle|batter|poha|granola/.test(lowerIngredient)) {
    return 'Grains';
  }
  
  // Dairy
  if (/milk|cream|butter|ghee|curd|cheese|yogurt/.test(lowerIngredient)) {
    return 'Dairy';
  }
  
  // Nuts & Seeds
  if (/nut|almond|cashew|peanut|walnut|seed|chia|sesame/.test(lowerIngredient)) {
    return 'Nuts & Seeds';
  }
  
  // Default to Pantry
  return 'Pantry';
};

// Parse quantity from ingredient string
const parseIngredientQuantity = (ingredient: string): { name: string; quantity: string } => {
  // Common patterns: "500g chicken", "2 cups rice", "1 tbsp oil"
  const quantityMatch = ingredient.match(/^(\d+\s*(?:g|kg|ml|l|cup|cups|tbsp|tsp|pcs|pieces|bunch|medium|large|small)?)\s+(.+)/i);
  
  if (quantityMatch) {
    return {
      quantity: quantityMatch[1].trim(),
      name: quantityMatch[2].trim(),
    };
  }
  
  return {
    name: ingredient,
    quantity: '1 unit',
  };
};

const GroceryListPage = () => {
  const { user } = useAuth();
  const { lockedMeals, isLoading: mealsLoading } = useLockedMeals();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'Proteins',
    'Vegetables',
    'Grains',
    'Fruits',
    'Dairy',
    'Nuts & Seeds',
    'Pantry',
  ]);

  // Generate grocery list from locked meals
  const groceryList = useMemo(() => {
    const ingredientMap = new Map<string, { count: number; category: string }>();
    
    lockedMeals.forEach(lm => {
      const meal = lm.meal_data;
      if (meal?.ingredients) {
        meal.ingredients.forEach(ingredient => {
          const { name } = parseIngredientQuantity(ingredient);
          const normalizedName = name.toLowerCase().trim();
          const category = categorizeIngredient(ingredient);
          
          if (ingredientMap.has(normalizedName)) {
            const existing = ingredientMap.get(normalizedName)!;
            existing.count += 1;
          } else {
            ingredientMap.set(normalizedName, { count: 1, category });
          }
        });
      }
    });
    
    const items: GroceryItem[] = [];
    let idCounter = 0;
    
    ingredientMap.forEach((data, name) => {
      items.push({
        id: `${idCounter++}`,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        quantity: data.count > 1 ? `${data.count}x` : '1 unit',
        category: data.category,
        checked: checkedItems.has(name),
      });
    });
    
    return items.sort((a, b) => a.category.localeCompare(b.category));
  }, [lockedMeals, checkedItems]);

  const categories = useMemo(() => {
    return [...new Set(groceryList.map(item => item.category))];
  }, [groceryList]);

  const toggleItem = (id: string, name: string) => {
    const normalizedName = name.toLowerCase();
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(normalizedName)) {
        newSet.delete(normalizedName);
      } else {
        newSet.add(normalizedName);
      }
      return newSet;
    });
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const markAllAsChecked = () => {
    const allNames = groceryList.map(item => item.name.toLowerCase());
    setCheckedItems(new Set(allNames));
  };

  const getCategoryItems = (category: string) =>
    groceryList.filter(item => item.category === category);

  const getCategoryProgress = (category: string) => {
    const items = getCategoryItems(category);
    const checked = items.filter(item => checkedItems.has(item.name.toLowerCase())).length;
    return { checked, total: items.length };
  };

  const totalProgress = {
    checked: groceryList.filter(item => checkedItems.has(item.name.toLowerCase())).length,
    total: groceryList.length,
  };

  const downloadGroceryList = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Group items by category
    const itemsByCategory = categories.map(category => ({
      category,
      items: getCategoryItems(category)
    }));

    // Create HTML content for the PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>NutriPlan Grocery List</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            padding: 40px; 
            color: #333;
            max-width: 800px;
            margin: 0 auto;
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px; 
            padding-bottom: 20px;
            border-bottom: 2px solid #6b9b7a;
          }
          .header h1 { 
            color: #6b9b7a; 
            font-size: 28px; 
            margin-bottom: 8px; 
          }
          .header p { 
            color: #666; 
            font-size: 14px; 
          }
          .category { 
            margin-bottom: 24px; 
          }
          .category-header { 
            background: linear-gradient(135deg, #6b9b7a, #8bb89a);
            color: white;
            padding: 10px 16px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 12px;
          }
          .items-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          .item { 
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 12px;
            background: #f8f9fa;
            border-radius: 6px;
          }
          .checkbox { 
            width: 16px; 
            height: 16px; 
            border: 2px solid #6b9b7a;
            border-radius: 3px;
            flex-shrink: 0;
          }
          .checkbox.checked {
            background: #6b9b7a;
          }
          .item-name { 
            flex: 1;
            font-size: 14px;
          }
          .item-name.checked {
            text-decoration: line-through;
            color: #999;
          }
          .item-qty { 
            color: #666; 
            font-size: 13px;
            font-weight: 500;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #999;
            font-size: 12px;
          }
          .progress {
            background: #f0f0f0;
            border-radius: 20px;
            padding: 16px 24px;
            margin-bottom: 30px;
            text-align: center;
          }
          .progress-text {
            font-size: 18px;
            font-weight: 600;
            color: #6b9b7a;
          }
          .meals-info {
            background: #e8f5e9;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 24px;
            text-align: center;
          }
          .meals-info p {
            color: #2e7d32;
            font-size: 14px;
          }
          @media print {
            body { padding: 20px; }
            .category { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🥗 NutriPlan Grocery List</h1>
          <p>${currentDate}</p>
        </div>
        
        <div class="meals-info">
          <p>📅 Generated from ${lockedMeals.length} locked meals</p>
        </div>
        
        <div class="progress">
          <span class="progress-text">📋 ${totalProgress.total} items to buy</span>
        </div>

        ${itemsByCategory.map(({ category, items }) => `
          <div class="category">
            <div class="category-header">${category}</div>
            <div class="items-grid">
              ${items.map(item => `
                <div class="item">
                  <div class="checkbox ${checkedItems.has(item.name.toLowerCase()) ? 'checked' : ''}"></div>
                  <span class="item-name ${checkedItems.has(item.name.toLowerCase()) ? 'checked' : ''}">${item.name}</span>
                  <span class="item-qty">${item.quantity}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <div class="footer">
          Generated by NutriPlan • Happy Shopping! 🛒
        </div>
      </body>
      </html>
    `;

    // Create a new window and print
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Wait for content to load then trigger print
      printWindow.onload = () => {
        printWindow.print();
      };
      
      toast.success('Grocery list ready to download!', {
        description: 'Use your browser\'s print dialog to save as PDF'
      });
    } else {
      toast.error('Could not open print window', {
        description: 'Please allow popups for this site'
      });
    }
  };

  if (!user) {
    return (
      <AppLayout>
        <div className="container py-6 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Grocery List</h1>
          <p className="text-muted-foreground mb-6">Please sign in to view your auto-generated grocery list.</p>
          <Button onClick={() => window.location.href = '/auth'}>Sign In</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between"
        >
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Grocery List
            </h1>
            <p className="text-muted-foreground">
              Auto-generated from your {lockedMeals.length} locked meals
            </p>
          </div>
          <Button variant="outline" size="icon" onClick={downloadGroceryList} disabled={groceryList.length === 0}>
            <Download className="h-5 w-5" />
          </Button>
        </motion.div>

        {mealsLoading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
            <p className="text-muted-foreground">Loading your grocery list...</p>
          </div>
        ) : groceryList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-card rounded-2xl shadow-soft border border-border/50"
          >
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No Items Yet</h2>
            <p className="text-muted-foreground mb-4">
              Lock meals in your meal plan to auto-generate your grocery list
            </p>
            <Button onClick={() => window.location.href = '/meal-plan'}>
              Go to Meal Plan
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-success rounded-2xl p-5 text-primary-foreground"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-foreground/20">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Shopping Progress</p>
                    <p className="text-2xl font-bold">
                      {totalProgress.checked} / {totalProgress.total} items
                    </p>
                  </div>
                </div>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={markAllAsChecked}
                  className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-none"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Mark All
                </Button>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary-foreground rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${totalProgress.total > 0 ? (totalProgress.checked / totalProgress.total) * 100 : 0}%`,
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </motion.div>

            {/* Categories */}
            <div className="space-y-4">
              {categories.map((category, categoryIndex) => {
                const isExpanded = expandedCategories.includes(category);
                const progress = getCategoryProgress(category);
                const items = getCategoryItems(category);

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + categoryIndex * 0.05 }}
                    className="bg-card rounded-2xl shadow-soft border border-border/50 overflow-hidden"
                  >
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between p-4"
                    >
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-foreground">{category}</h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          {progress.checked}/{progress.total}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>

                    {/* Items */}
                    {isExpanded && (
                      <div className="border-t border-border/50">
                        {items.map((item, itemIndex) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: itemIndex * 0.02 }}
                            className={cn(
                              "flex items-center gap-4 px-4 py-3",
                              itemIndex !== items.length - 1 && "border-b border-border/30"
                            )}
                          >
                            <Checkbox
                              checked={checkedItems.has(item.name.toLowerCase())}
                              onCheckedChange={() => toggleItem(item.id, item.name)}
                              className="h-5 w-5"
                            />
                            <div className="flex-1">
                              <p
                                className={cn(
                                  "font-medium transition-all duration-200",
                                  checkedItems.has(item.name.toLowerCase())
                                    ? "text-muted-foreground line-through"
                                    : "text-foreground"
                                )}
                              >
                                {item.name}
                              </p>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {item.quantity}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Download hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-xs text-muted-foreground"
            >
              📥 Tap the download button to save your list as PDF
            </motion.p>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default GroceryListPage;
