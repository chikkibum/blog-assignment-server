import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Configure the GenAI instance with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
  try {
    const { content } = req.body;

    // Validate content
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Summarize the following text:\n\n${content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    res.json({ summary });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to summarize text' });
  }
});

export default router;