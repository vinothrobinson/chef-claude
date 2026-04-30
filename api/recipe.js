import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make.`;

const hf = new InferenceClient(process.env.HF_ACCESS_TOKEN);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { ingredients } = req.body;

    const ingredientsString = ingredients.join(", ");

    const response = await hf.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe!`,
        },
      ],
      max_tokens: 1024,
    });

    return res.status(200).json({
      recipe: response.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Failed to generate recipe.",
    });
  }
}
