const bcrypt = require('bcrypt');
const saltRounds = 10;

class Auth {
  constructor(db) {
    this.db = db;
  }

  // REGISTRO - Cria novo usuário com senha criptografada
  async register(userData) {
    try {
      const { name, email, password, role } = userData;

      // Validações
      if (!name || !email || !password) {
        return {
          success: false,
          error: 'Todos os campos são obrigatórios'
        };
      }

      // Verifica se email já existe
      const [existente] = await this.db.query(
        'SELECT id FROM usuarios WHERE email = ?',
        [email]
      );

      if (existente.length > 0) {
        return {
          success: false,
          error: 'Email já cadastrado'
        };
      }

      // CRIPTOGRAFA A SENHA
      const senhaHash = await bcrypt.hash(password, saltRounds);

      // Insere no banco
      const [result] = await this.db.query(
        'INSERT INTO usuarios (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, senhaHash, role || 'Usuario']
      );

      return {
        success: true,
        message: 'Usuário criado com sucesso',
        userId: result.insertId
      };
    } catch (error) {
      console.error('Erro no registro:', error);
      return {
        success: false,
        error: 'Erro ao criar usuário'
      };
    }
  }

  // LOGIN - Valida credenciais com bcrypt
  async login(credentials) {
    try {
      const { email, password } = credentials;

      // Validações
      if (!email || !password) {
        return {
          success: false,
          error: 'Email e senha são obrigatórios'
        };
      }

      // Busca usuário pelo email
      const [usuarios] = await this.db.query(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
      );

      if (usuarios.length === 0) {
        return {
          success: false,
          error: 'Credenciais inválidas'
        };
      }

      const usuario = usuarios[0];

      // COMPARA SENHA COM BCRYPT
      const senhaValida = await bcrypt.compare(password, usuario.password);

      if (!senhaValida) {
        return {
          success: false,
          error: 'Credenciais inválidas'
        };
      }

      // Login bem-sucedido - NÃO RETORNA A SENHA
      return {
        success: true,
        usuario: {
          id: usuario.id,
          name: usuario.name,
          email: usuario.email,
          role: usuario.role
        }
      };
    } catch (error) {
      console.error('Erro no login:', error);
      return {
        success: false,
        error: 'Erro ao realizar login'
      };
    }
  }
}

module.exports = Auth;