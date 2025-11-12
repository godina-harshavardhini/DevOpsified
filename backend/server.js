import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// ✅ Simple Schema
const messageSchema = new mongoose.Schema({
  text: String,
});
const Message = mongoose.model("Message", messageSchema);

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const newMsg = new Message({ text: req.body.text });
    await newMsg.save();
    res.json(newMsg);
  } catch (err) {
    res.status(500).json({ error: "Error saving message" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
