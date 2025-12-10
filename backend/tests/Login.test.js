// tests/login.test.js
import { describe, it, expect } from 'vitest';
import bcrypt from 'bcrypt';

describe('Validacao de Login', () => {
  describe('Bcrypt - Hash de Senha', () => {
    it('deve criar hash de senha corretamente', async () => {
      const senha = 'senha123';
      const hash = await bcrypt.hash(senha, 10);
      
      expect(hash).toBeDefined();
      expect(hash).not.toBe(senha);
      expect(hash.length).toBeGreaterThan(0);
    });

    it('deve validar senha correta', async () => {
      const senha = 'senha123';
      const hash = await bcrypt.hash(senha, 10);
      const resultado = await bcrypt.compare(senha, hash);
      
      expect(resultado).toBe(true);
    });

    it('deve rejeitar senha incorreta', async () => {
      const senha = 'senha123';
      const senhaErrada = 'senhaerrada';
      const hash = await bcrypt.hash(senha, 10);
      const resultado = await bcrypt.compare(senhaErrada, hash);
      
      expect(resultado).toBe(false);
    });

    it('deve criar hashes diferentes para mesma senha', async () => {
      const senha = 'senha123';
      const hash1 = await bcrypt.hash(senha, 10);
      const hash2 = await bcrypt.hash(senha, 10);
      
      expect(hash1).not.toBe(hash2);
      expect(await bcrypt.compare(senha, hash1)).toBe(true);
      expect(await bcrypt.compare(senha, hash2)).toBe(true);
    });
  });

  describe('Validacao de Email', () => {
    it('deve validar email correto', () => {
      const emailValido = 'usuario@email.com';
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      expect(regex.test(emailValido)).toBe(true);
    });

    it('deve rejeitar email sem arroba', () => {
      const emailInvalido = 'usuarioemail.com';
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      expect(regex.test(emailInvalido)).toBe(false);
    });

    it('deve rejeitar email sem dominio', () => {
      const emailInvalido = 'usuario@';
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      expect(regex.test(emailInvalido)).toBe(false);
    });

    it('deve rejeitar email vazio', () => {
      const emailInvalido = '';
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      expect(regex.test(emailInvalido)).toBe(false);
    });
  });

  describe('Validacao de Senha', () => {
    it('deve aceitar senha com 6 caracteres', () => {
      const senha = 'abc123';
      
      expect(senha.length >= 6).toBe(true);
    });

    it('deve rejeitar senha com menos de 6 caracteres', () => {
      const senha = 'abc12';
      
      expect(senha.length >= 6).toBe(false);
    });

    it('deve aceitar senha com letras e numeros', () => {
      const senha = 'senha123';
      const temLetra = /[a-zA-Z]/.test(senha);
      const temNumero = /[0-9]/.test(senha);
      
      expect(temLetra).toBe(true);
      expect(temNumero).toBe(true);
    });
  });

  describe('Validacao de Dados de Login', () => {
    it('deve validar dados completos', () => {
      const dados = {
        email: 'usuario@email.com',
        password: 'senha123'
      };
      
      expect(dados.email).toBeDefined();
      expect(dados.password).toBeDefined();
      expect(dados.email.length).toBeGreaterThan(0);
      expect(dados.password.length).toBeGreaterThan(0);
    });

    it('deve detectar email ausente', () => {
      const dados = {
        password: 'senha123'
      };
      
      expect(dados.email).toBeUndefined();
      expect(dados.password).toBeDefined();
    });

    it('deve detectar senha ausente', () => {
      const dados = {
        email: 'usuario@email.com'
      };
      
      expect(dados.email).toBeDefined();
      expect(dados.password).toBeUndefined();
    });
  });
});