import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get("/", (req, res) => {
  res.send("Hello from DALL-E route");
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const image = response.data[0].b64_json;

    res.status(200).json({
      photo: image,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
});

export default router;