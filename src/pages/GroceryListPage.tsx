import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Download, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
}

const initialGroceryList: GroceryItem[] = [
  // Proteins
  { id: '1', name: 'Chicken Breast', quantity: '500g', category: 'Proteins', checked: false },
  { id: '2', name: 'Atlantic Salmon', quantity: '400g', category: 'Proteins', checked: false },
  { id: '3', name: 'Greek Yogurt', quantity: '500g', category: 'Proteins', checked: false },
  { id: '4', name: 'Eggs', quantity: '12 pcs', category: 'Proteins', checked: true },
  
  // Vegetables
  { id: '5', name: 'Asparagus', quantity: '1 bunch', category: 'Vegetables', checked: false },
  { id: '6', name: 'Sweet Potato', quantity: '4 medium', category: 'Vegetables', checked: false },
  { id: '7', name: 'Mixed Greens', quantity: '200g', category: 'Vegetables', checked: false },
  { id: '8', name: 'Bell Peppers', quantity: '3 pcs', category: 'Vegetables', checked: true },
  { id: '9', name: 'Avocado', quantity: '4 pcs', category: 'Vegetables', checked: false },
  { id: '10', name: 'Carrots', quantity: '500g', category: 'Vegetables', checked: true },

  // Grains
  { id: '11', name: 'Quinoa', quantity: '500g', category: 'Grains', checked: false },
  { id: '12', name: 'Rolled Oats', quantity: '500g', category: 'Grains', checked: true },
  { id: '13', name: 'Granola', quantity: '300g', category: 'Grains', checked: false },

  // Fruits
  { id: '14', name: 'Mixed Berries', quantity: '300g', category: 'Fruits', checked: false },
  { id: '15', name: 'Banana', quantity: '6 pcs', category: 'Fruits', checked: false },
  { id: '16', name: 'Lemon', quantity: '4 pcs', category: 'Fruits', checked: true },

  // Pantry
  { id: '17', name: 'Olive Oil', quantity: '500ml', category: 'Pantry', checked: true },
  { id: '18', name: 'Honey', quantity: '250g', category: 'Pantry', checked: false },
  { id: '19', name: 'Almond Milk', quantity: '1L', category: 'Pantry', checked: false },
  { id: '20', name: 'Hummus', quantity: '250g', category: 'Pantry', checked: false },
];

const GroceryListPage = () => {
  const [groceryList, setGroceryList] = useState(initialGroceryList);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'Proteins',
    'Vegetables',
    'Grains',
    'Fruits',
    'Pantry',
  ]);

  const categories = [...new Set(groceryList.map((item) => item.category))];

  const toggleItem = (id: string) => {
    setGroceryList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const markAllAsChecked = () => {
    setGroceryList((prev) => prev.map((item) => ({ ...item, checked: true })));
  };

  const getCategoryItems = (category: string) =>
    groceryList.filter((item) => item.category === category);

  const getCategoryProgress = (category: string) => {
    const items = getCategoryItems(category);
    const checked = items.filter((item) => item.checked).length;
    return { checked, total: items.length };
  };

  const totalProgress = {
    checked: groceryList.filter((item) => item.checked).length,
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
        
        <div class="progress">
          <span class="progress-text">📋 ${totalProgress.total - totalProgress.checked} items to buy</span>
        </div>

        ${itemsByCategory.map(({ category, items }) => `
          <div class="category">
            <div class="category-header">${category}</div>
            <div class="items-grid">
              ${items.map(item => `
                <div class="item">
                  <div class="checkbox ${item.checked ? 'checked' : ''}"></div>
                  <span class="item-name ${item.checked ? 'checked' : ''}">${item.name}</span>
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
              Auto-generated from your weekly meals
            </p>
          </div>
          <Button variant="outline" size="icon" onClick={downloadGroceryList}>
            <Download className="h-5 w-5" />
          </Button>
        </motion.div>

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
                width: `${(totalProgress.checked / totalProgress.total) * 100}%`,
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
                          checked={item.checked}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="h-5 w-5"
                        />
                        <div className="flex-1">
                          <p
                            className={cn(
                              "font-medium transition-all duration-200",
                              item.checked
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
      </div>
    </AppLayout>
  );
};

export default GroceryListPage;