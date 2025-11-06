import { Router } from "express";
import Usuario from "../models/Usuario.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    return res.status(201).json(usuario);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao criar usuario", details: err.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const usuario = await Usuario.find().sort({ createdAt: -1 });
    return res.json(usuario);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar usuario" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario não encontrado" });
    return res.json(usuario);
  } catch (err) {
    return res.status(400).json({ error: "ID inválido" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!usuario) return res.status(404).json({ error: "Usuario não encontrado" });
    return res.json(usuario);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao atualizar", details: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ error: "usuario não encontrado" });
    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({ error: "ID inválido" });
  }
});

export default router;
