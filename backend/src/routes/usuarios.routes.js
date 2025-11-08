import { Router } from "express";
import Usuario from "../models/Usuario.js";

const router = Router();

// ============================================
// POST - CRIAR USUÁRIO (REGISTRO)
// ============================================
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    
    // Verifica se email já existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ 
        success: false,
        error: "Email já cadastrado" 
      });
    }

    // ✅ CORRETO: Usar new Usuario().save() para ativar o hook pre('save')
    const usuario = new Usuario(req.body);
    await usuario.save();
    
    // Retorna sem a senha
    const usuarioSemSenha = {
      _id: usuario._id,
      name: usuario.name,
      email: usuario.email,
      role: usuario.role,
      createdAt: usuario.createdAt
    };
    
    return res.status(201).json({
      success: true,
      usuario: usuarioSemSenha,
      message: "Usuário criado com sucesso!"
    });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    return res.status(400).json({ 
      success: false,
      error: "Erro ao criar usuário", 
      details: err.message 
    });
  }
});

// ============================================
// POST - LOGIN
// ============================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação de campos
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: "Email e senha são obrigatórios" 
      });
    }

    // Busca usuário pelo email
    const usuario = await Usuario.findOne({ email });
    
    if (!usuario) {
      return res.status(401).json({ 
        success: false,
        error: "Email ou senha incorretos" 
      });
    }

    // ✅ CORRETO: Usa o método comparePassword do model
    const senhaValida = await usuario.comparePassword(password);
    
    if (!senhaValida) {
      return res.status(401).json({ 
        success: false,
        error: "Email ou senha incorretos" 
      });
    }

    // Login bem-sucedido - retorna sem senha
    return res.json({
      success: true,
      usuario: {
        _id: usuario._id,
        name: usuario.name,
        email: usuario.email,
        role: usuario.role
      },
      message: "Login realizado com sucesso!"
    });
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    return res.status(500).json({ 
      success: false,
      error: "Erro ao fazer login",
      details: err.message 
    });
  }
});

// ============================================
// GET - BUSCAR TODOS OS USUÁRIOS
// ============================================
router.get("/", async (_req, res) => {
  try {
    const usuarios = await Usuario.find()
      .select('-password') // Não retorna a senha
      .sort({ createdAt: -1 });
    
    return res.json({
      success: true,
      usuarios,
      total: usuarios.length
    });
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    return res.status(500).json({ 
      success: false,
      error: "Erro ao buscar usuários" 
    });
  }
});

// ============================================
// GET - BUSCAR USUÁRIO POR ID
// ============================================
router.get("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-password');
    
    if (!usuario) {
      return res.status(404).json({ 
        success: false,
        error: "Usuário não encontrado" 
      });
    }
    
    return res.json({
      success: true,
      usuario
    });
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    return res.status(400).json({ 
      success: false,
      error: "ID inválido ou erro ao buscar usuário" 
    });
  }
});

// ============================================
// PUT - ATUALIZAR USUÁRIO
// ============================================
router.put("/:id", async (req, res) => {
  try {
    // ✅ CORREÇÃO CRÍTICA: Busca o usuário primeiro
    const usuario = await Usuario.findById(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({ 
        success: false,
        error: "Usuário não encontrado" 
      });
    }

    // Atualiza os campos manualmente
    if (req.body.name) usuario.name = req.body.name;
    if (req.body.email) usuario.email = req.body.email;
    if (req.body.role) usuario.role = req.body.role;
    
    // ⚠️ Se enviar nova senha, ela será criptografada pelo middleware
    if (req.body.password) {
      usuario.password = req.body.password;
    }

    // ✅ Usa .save() para disparar o hook pre('save')
    await usuario.save();
    
    // Retorna sem a senha
    const usuarioAtualizado = {
      _id: usuario._id,
      name: usuario.name,
      email: usuario.email,
      role: usuario.role,
      updatedAt: usuario.updatedAt
    };
    
    return res.json({
      success: true,
      usuario: usuarioAtualizado,
      message: "Usuário atualizado com sucesso!"
    });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    return res.status(400).json({ 
      success: false,
      error: "Erro ao atualizar usuário", 
      details: err.message 
    });
  }
});

// ============================================
// DELETE - DELETAR USUÁRIO
// ============================================
router.delete("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({ 
        success: false,
        error: "Usuário não encontrado" 
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Usuário deletado com sucesso",
      usuario: {
        _id: usuario._id,
        email: usuario.email
      }
    });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    return res.status(400).json({ 
      success: false,
      error: "Erro ao deletar usuário" 
    });
  }
});

export default router;