import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send('Hello from DALL-E!');
});

const startServer = async () => {
    try {
        const PORT = process.env.PORT || 8080;
        // console.log(process.env.MONGODB_URL);
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
    } catch (error) {
        console.error('Error starting server:', error);
    }
};
startServer();


