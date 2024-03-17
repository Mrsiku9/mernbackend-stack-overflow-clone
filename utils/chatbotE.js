import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const my_api_key = process.env.SECRET_KEY_OPEN_AI;

if (!my_api_key) {
  console.error("OpenAI API key is missing. Please check your .env file.");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: my_api_key });

async function askOpenAI(message) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "gpt-3.5-turbo-0125",
    });

    const aiResponse = completion.choices[0].message.content;
    return aiResponse;
  } catch (error) {
    console.error("Error processing request:", error.message);
  
    return "Sorry, I couldn't process your request at the moment.";
  }
}

export default askOpenAI;
