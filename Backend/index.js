import express from "express"
import cors from "cors"
const app = express();
app.use(cors());
app.use(express.json());
import dotenv from "dotenv";
dotenv.config();



import {router as mainRouter} from "./routes/index.js"

app.use("/api/v1", mainRouter);
app.get("/", (req, res) => {
    res.send("Backend is running! 🚀");
});


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});