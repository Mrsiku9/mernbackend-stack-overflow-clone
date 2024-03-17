import askOpenAI from "../utils/chatbotE.js";

const aiChatBot = async (req, res) => {
  const { message } = req.body;
  try {
    const response = await askOpenAI(message);
    res.json({ response });
  } catch (error) {
    console.error("Error with OpenAI:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default aiChatBot;
