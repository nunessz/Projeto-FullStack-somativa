import { Router } from "express";
import Maquina from "../models/Maquina.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    console.log("oi")
    const maquina = await Maquina.create(req.body);
    return res.status(201).json(maquina);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao criar maquina", details: err.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const maquina = await Maquina.find().sort({ createdAt: -1 });
    return res.json(maquina);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar maquina" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const maquina = await Maquina.findById(req.params.id);
    if (!maquina) return res.status(404).json({ error: "Maquina não encontrada" });
    return res.json(maquina);
  } catch (err) {
    return res.status(400).json({ error: "ID inválido" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const maquina = await Maquina.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!maquina) return res.status(404).json({ error: "Maquina não encontrada" });
    return res.json(maquina);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao atualizar", details: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const maquina = await Maquina.findByIdAndDelete(req.params.id);
    if (!maquina) return res.status(404).json({ error: "Maquina não encontrada" });
    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({ error: "ID inválido" });
  }
});

export default router;
