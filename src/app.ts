import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import uploadRouter from "./routes/upload";
import ragRouter from "./routes/rag";


const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("RAG API is running 🚀");
});

app.use("/upload", uploadRouter);
app.use("/rag", ragRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
