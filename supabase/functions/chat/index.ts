import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, imageData, mealPlanContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build system prompt based on whether image analysis is requested
    let systemPrompt = `You are NutriBot, a friendly, knowledgeable, and helpful AI assistant. You can answer ANY question the user asks - whether it's about nutrition, health, fitness, cooking, recipes, general knowledge, science, technology, travel, entertainment, or anything else.

While you have expertise in nutrition and meal planning, you are a versatile assistant capable of helping with:
- Nutrition advice, meal suggestions, and diet planning
- Recipe recommendations and cooking tips
- General health and fitness questions
- Any other topics the user is curious about

Be conversational, encouraging, and thorough in your responses. Use markdown formatting like **bold** for emphasis when helpful. If asked about nutrition or meals, provide specific, actionable advice. For other topics, be equally helpful and informative.

Keep responses concise but comprehensive - aim for helpful answers that respect the user's time.`;

    // If there's an image and meal plan context, add special instructions
    if (imageData && mealPlanContext) {
      systemPrompt = `You are NutriBot, a nutrition expert AI assistant with food image recognition capabilities.

When analyzing a food image:
1. **Identify the Food**: Accurately identify the food item(s) in the image. Be specific about the dish name and any visible ingredients.

2. **Estimate Nutrition**: Provide estimated nutritional information:
   - Calories (kcal)
   - Protein (g)
   - Carbohydrates (g)
   - Fats (g)
   - Key vitamins/minerals if applicable

3. **Health Assessment**: Evaluate whether this food is a healthy choice considering:
   - Overall nutritional balance
   - Portion size (if visible)
   - Potential health benefits or concerns

4. **Meal Plan Comparison**: The user's current meal plan is provided below. Based on the current time and meal context:
   - Identify which meal slot this could replace (breakfast, lunch, snacks, or dinner)
   - Name the specific recipe from their plan that would be replaced
   - Calculate the EXACT difference in nutrients:
     * If consuming this food INSTEAD of the planned meal
     * Show: "Additional/Less: X calories, Xg protein, Xg carbs, Xg fats"
   - Give a clear recommendation: Should they swap or stick with the plan?

**Current Meal Plan Context:**
${mealPlanContext}

Format your response clearly with sections:
📸 **Food Identified**: [name of food]
🍽️ **Estimated Nutrition**: 
   - Calories: X kcal
   - Protein: Xg
   - Carbs: Xg
   - Fats: Xg

✅ **Health Assessment**: [your evaluation]

🔄 **Meal Swap Analysis**:
   - Would replace: [meal time] - [recipe name]
   - Planned meal nutrition: [X cal, Xg protein, Xg carbs, Xg fats]
   - This food nutrition: [X cal, Xg protein, Xg carbs, Xg fats]
   - **Difference**: [+/- X cal, +/- Xg protein, +/- Xg carbs, +/- Xg fats]

💡 **Recommendation**: [Should they swap? Why or why not?]`;
    }

    // Build the messages array for the API
    const apiMessages: any[] = [
      { role: "system", content: systemPrompt },
    ];

    // Process messages - handle image content if present
    for (const msg of messages) {
      if (msg.role === 'user' && msg.imageData) {
        // Multimodal message with image
        apiMessages.push({
          role: "user",
          content: [
            {
              type: "text",
              text: msg.content || "Please analyze this food image and provide nutritional information."
            },
            {
              type: "image_url",
              image_url: {
                url: msg.imageData
              }
            }
          ]
        });
      } else {
        apiMessages.push({
          role: msg.role,
          content: msg.content
        });
      }
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash", // Using flash model which supports vision
        messages: apiMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
