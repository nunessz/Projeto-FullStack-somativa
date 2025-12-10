import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";

const router = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     tags: [Autenticação]
 *     summary: Login com Google
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token do Google (credential)
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Token inválido
 */
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        error: "Token não fornecido"
      });
    }

    // Verifica o token com o Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    console.log('Token Google válido:', payload.email);

    // Busca ou cria usuário
    let usuario = await Usuario.findOne({ email: payload.email });

    if (usuario) {
      console.log('Usuário já existe:', usuario.email);
      
      // Se não tem googleId, adiciona
      if (!usuario.googleId) {
        usuario.googleId = payload.sub;
        await usuario.save();
      }
    } else {
      // Cria novo usuário
      console.log('Criando novo usuário do Google');
      usuario = new Usuario({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8),
        role: "Usuario"
      });

      await usuario.save();
      console.log('Novo usuário criado:', usuario.email);
    }

    // Gera JWT (opcional)
    const jwtToken = jwt.sign(
      { 
        id: usuario._id, 
        email: usuario.email,
        role: usuario.role 
      },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "7d" }
    );

    // Retorna usuário e token
    return res.json({
      success: true,
      usuario: {
        _id: usuario._id,
        name: usuario.name,
        email: usuario.email,
        role: usuario.role
      },
      token: jwtToken,
      message: "Login com Google realizado com sucesso!"
    });

  } catch (error) {
    console.error('Erro ao verificar token Google:', error);
    return res.status(401).json({
      success: false,
      error: "Token do Google inválido",
      details: error.message
    });
  }
});

export default router;