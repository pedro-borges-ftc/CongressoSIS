const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// [GET] Buscar todos os posts
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ dataCriacao: -1 });
  res.json(posts);
});

// [POST] Criar novo post
router.post("/", async (req, res) => {
  const novoPost = new Post(req.body);
  await novoPost.save();
  res.json(novoPost);
});

// [DELETE] Excluir post
router.delete("/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post removido com sucesso" });
});

module.exports = router;