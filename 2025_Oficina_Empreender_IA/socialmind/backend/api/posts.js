import mongoose from "mongoose";
import Post from "../models/Post.js";

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_CLUSTER,
  MONGO_DB
} = process.env;

const mongoURI = `mongodb+srv://${MONGO_USER}:${encodeURIComponent(MONGO_PASS)}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`;

let isConnected = false; // Evita múltiplas conexões

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(mongoURI);
  isConnected = true;
}

// Função handler (rota serverless)
export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const posts = await Post.find().sort({ dataCriacao: -1 });
    return res.status(200).json(posts);
  }

  if (req.method === "POST") {
    const novoPost = new Post(req.body);
    await novoPost.save();
    return res.status(201).json(novoPost);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    await Post.findByIdAndDelete(id);
    return res.status(200).json({ message: "Post removido com sucesso" });
  }

  res.status(405).json({ message: "Método não permitido" });
}