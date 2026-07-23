// import express from "express";
// import dotenv from "dotenv";
// import OpenAI from "openai";

// dotenv.config();

// const router = express.Router();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// router.get("/", (req, res) => {
//   res.send("Hello from DALL-E route");
// });

// router.post("/", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const response = await openai.images.generate({
//       model: "gpt-image-1",
//       prompt,
//       size: "1024x1024",
//     });

//     const image = response.data[0].b64_json;

//     res.status(200).json({
//       photo: image,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       error: error.message || "Something went wrong",
//     });
//   }
// });

// export default router;


// import express from "express";
// import dotenv from "dotenv";
// import axios from "axios";

// dotenv.config();

// const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Hello from AI Image route");
// });

// router.post("/", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const response = await axios.post(
//       "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
//       {
//         inputs: prompt,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HF_API_KEY}`,
//         },
//         responseType: "arraybuffer",
//       }
//     );

//     const image = Buffer.from(response.data).toString("base64");

//     res.status(200).json({
//       photo: image,
//     });

//   } catch (error) {
//     console.error("========== HUGGING FACE ERROR ==========");
//   console.error("Status:", error.response?.status);
//   console.error("Data:", error.response?.data);
//   console.error("Message:", error.message);
//   console.error("========================================");

//   res.status(500).json({
//     error: error.response?.data?.error || error.message,
//     });
//   }
// });

// export default router;


// import express from "express";
// import dotenv from "dotenv";

// import { generateImage } from "../services/imageGenerator.js";

// dotenv.config();

// const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Hello from Gemini route");
// });

// router.post("/", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     if (!prompt) {
//       return res.status(400).json({
//         error: "Prompt is required.",
//       });
//     }

//     const photo = await generateImage(prompt);

//     res.status(200).json({
//       photo,
//     });

//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       error: error.message,
//     });
//   }
// });

// export default router;


import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Pollinations route working!");
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const imageResponse = await axios.get(
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`,
      {
        responseType: "arraybuffer",
      }
    );

    const image = Buffer.from(imageResponse.data).toString("base64");

    res.status(200).json({
      photo: image,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to generate image",
    });
  }
});

export default router;