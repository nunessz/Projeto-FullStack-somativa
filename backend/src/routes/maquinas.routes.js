import { Router } from "express";
import Maquina from "../models/Maquina.js";

const router = Router();

/**
 * @swagger
 * /api/maquinas:
 *   post:
 *     tags: [Máquinas]
 *     summary: Criar nova máquina
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - usuario
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               status:
 *                 type: string
 *               usuario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Máquina criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
// ============================================
// POST - CRIAR MÁQUINA (vinculada ao usuário)
// ============================================
router.post("/", async (req, res) => {
  try {
    const { name, type, status, usuario } = req.body;
    
    console.log('📥 Recebendo dados:', { name, type, status, usuario });
    
    if (!name || !type || !usuario) {
      return res.status(400).json({ 
        success: false,
        error: "Nome, tipo e usuário são obrigatórios" 
      });
    }

    const maquina = new Maquina({
      name,
      type,
      status: status || "Funcionando",
      usuario
    });
    
    await maquina.save();
    
    console.log('✅ Máquina criada:', maquina);
    
    return res.status(201).json({
      success: true,
      maquina,
      message: "Máquina criada com sucesso!"
    });
  } catch (err) {
    console.error('❌ Erro ao criar máquina:', err);
    return res.status(400).json({ 
      success: false,
      error: "Erro ao criar máquina", 
      details: err.message 
    });
  }
});

/**
 * @swagger
 * /api/maquinas/usuario/{usuarioId}:
 *   get:
 *     tags: [Máquinas]
 *     summary: Buscar máquinas do usuário
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de máquinas do usuário
 */
// ============================================
// GET - BUSCAR MÁQUINAS DO USUÁRIO
// ============================================
router.get("/usuario/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;
    
    console.log('🔍 Buscando máquinas do usuário:', usuarioId);
    
    const maquinas = await Maquina.find({ usuario: usuarioId })
      .sort({ createdAt: -1 });
    
    console.log(`✅ Encontradas ${maquinas.length} máquinas`);
    
    return res.json({
      success: true,
      maquinas,
      total: maquinas.length
    });
  } catch (err) {
    console.error('❌ Erro ao buscar máquinas:', err);
    return res.status(500).json({ 
      success: false,
      error: "Erro ao buscar máquinas" 
    });
  }
});

/**
 * @swagger
 * /api/maquinas:
 *   get:
 *     tags: [Máquinas]
 *     summary: Buscar todas as máquinas (ADMIN)
 *     responses:
 *       200:
 *         description: Lista de todas as máquinas
 */
// ============================================
// GET - BUSCAR TODAS (ADMIN)
// ============================================
router.get("/", async (req, res) => {
  try {
    const maquinas = await Maquina.find()
      .populate('usuario', 'name email')
      .sort({ createdAt: -1 });
    
    return res.json({
      success: true,
      maquinas,
      total: maquinas.length
    });
  } catch (err) {
    console.error('❌ Erro ao buscar máquinas:', err);
    return res.status(500).json({ 
      success: false,
      error: "Erro ao buscar máquinas" 
    });
  }
});

/**
 * @swagger
 * /api/maquinas/{id}:
 *   get:
 *     tags: [Máquinas]
 *     summary: Buscar máquina por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados da máquina
 *       404:
 *         description: Máquina não encontrada
 */
// ============================================
// GET - BUSCAR POR ID
// ============================================
router.get("/:id", async (req, res) => {
  try {
    const maquina = await Maquina.findById(req.params.id)
      .populate('usuario', 'name email');
    
    if (!maquina) {
      return res.status(404).json({ 
        success: false,
        error: "Máquina não encontrada" 
      });
    }
    
    return res.json({
      success: true,
      maquina
    });
  } catch (err) {
    console.error('❌ Erro ao buscar máquina:', err);
    return res.status(400).json({ 
      success: false,
      error: "ID inválido" 
    });
  }
});

/**
 * @swagger
 * /api/maquinas/{id}:
 *   put:
 *     tags: [Máquinas]
 *     summary: Atualizar máquina
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Máquina atualizada
 *       404:
 *         description: Máquina não encontrada
 */
// ============================================
// PUT - ATUALIZAR
// ============================================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, status } = req.body;
    
    const maquina = await Maquina.findById(id);
    
    if (!maquina) {
      return res.status(404).json({ 
        success: false,
        error: "Máquina não encontrada" 
      });
    }

    if (name) maquina.name = name;
    if (type) maquina.type = type;
    if (status) maquina.status = status;
    
    await maquina.save();
    
    console.log('✅ Máquina atualizada:', maquina);
    
    return res.json({
      success: true,
      maquina,
      message: "Máquina atualizada com sucesso!"
    });
  } catch (err) {
    console.error('❌ Erro ao atualizar máquina:', err);
    return res.status(400).json({ 
      success: false,
      error: "Erro ao atualizar máquina", 
      details: err.message 
    });
  }
});

/**
 * @swagger
 * /api/maquinas/{id}:
 *   delete:
 *     tags: [Máquinas]
 *     summary: Deletar máquina
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Máquina deletada
 *       404:
 *         description: Máquina não encontrada
 */
// ============================================
// DELETE - DELETAR
// ============================================
router.delete("/:id", async (req, res) => {
  try {
    const maquina = await Maquina.findByIdAndDelete(req.params.id);
    
    if (!maquina) {
      return res.status(404).json({ 
        success: false,
        error: "Máquina não encontrada" 
      });
    }
    
    console.log('✅ Máquina deletada:', maquina._id);
    
    return res.status(200).json({
      success: true,
      message: "Máquina deletada com sucesso",
      maquina
    });
  } catch (err) {
    console.error('❌ Erro ao deletar máquina:', err);
    return res.status(400).json({ 
      success: false,
      error: "Erro ao deletar máquina" 
    });
  }
});

export default router;