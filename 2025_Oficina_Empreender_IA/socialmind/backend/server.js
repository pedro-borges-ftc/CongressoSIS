require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postsRouter = require("./routes/posts");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/posts", postsRouter);

// Conexão com o MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB Atlas"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

// Inicializa o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));