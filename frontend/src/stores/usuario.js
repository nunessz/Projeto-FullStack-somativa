import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '../services/api';

export const useUsuariosStore = defineStore('usuarios', () => {
  const usuarios = ref([]);
  const currentUser = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // ====== FUNÇÕES DE AUTENTICAÇÃO ======
  
  // Carrega usuário do localStorage ao iniciar
  function loadUser() {
    const savedUser = localStorage.getItem('currentUser');
    const accessToken = localStorage.getItem('accessToken');
    
    if (savedUser && accessToken) {
      try {
        currentUser.value = JSON.parse(savedUser);
      } catch (e) {
        console.error('Erro ao carregar usuário:', e);
        logout();
      }
    }
  }

  // Login com email/senha usando OAuth2
  async function login(credentials) {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.success) {
        const { user, accessToken, refreshToken } = response.data;
        
        currentUser.value = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        return { success: true, data: user };
      } else {
        error.value = 'Erro ao fazer login';
        return { success: false, error: error.value };
      }
      
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao fazer login';
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  // Login com Google usando OAuth2
  async function loginWithGoogle(credential) {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await api.post('/auth/google', { token: credential });
      
      if (response.data.success) {
        const { user, accessToken, refreshToken } = response.data;
        
        currentUser.value = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        return { success: true, data: user };
      } else {
        error.value = 'Erro ao fazer login com Google';
        return { success: false, error: error.value };
      }
      
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao fazer login com Google';
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  // Registrar novo usuário
  async function register(userData) {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.success) {
        const { user, accessToken, refreshToken } = response.data;
        
        currentUser.value = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        return { success: true, data: user };
      } else {
        error.value = 'Erro ao registrar';
        return { success: false, error: error.value };
      }
      
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao registrar';
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  // Logout - remove tokens e dados do usuário
  async function logout() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      // Notifica o backend para invalidar o refresh token
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      console.error('Erro ao fazer logout no servidor:', error);
    } finally {
      // Limpa dados locais independente do resultado
      currentUser.value = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      console.log('Logout realizado com sucesso');
    }
  }

  // Alterar senha
  async function changePassword(passwords) {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await api.post('/auth/change-password', passwords);
      
      if (response.data.success) {
        // Faz logout após alterar senha
        await logout();
        return { success: true, message: response.data.message };
      } else {
        error.value = 'Erro ao alterar senha';
        return { success: false, error: error.value };
      }
      
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao alterar senha';
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  // Solicitar reset de senha
  async function forgotPassword(email) {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return { success: true, message: response.data.message };
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao solicitar reset';
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  // Resetar senha com token
  async function resetPassword(token, newPassword) {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return { success: true, message: response.data.message };
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao resetar senha';
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  // Atualiza o usuário logado (útil para alterações de perfil)
  function updateCurrentUser(userData) {
    currentUser.value = { ...currentUser.value, ...userData };
    localStorage.setItem('currentUser', JSON.stringify(currentUser.value));
  }

  // ====== FUNÇÕES CRUD DE USUÁRIOS ======

  async function fetchUsuarios() {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get('/usuarios');
      usuarios.value = response.data;
      return { success: true };
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao buscar usuários';
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  async function createUsuario(usuarioData) {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post('/usuarios', usuarioData);
      usuarios.value.unshift(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao criar usuário';
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  async function getUsuarioById(id) {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.get(`/usuarios/${id}`);
      return { success: true, data: response.data };
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao buscar usuário';
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  async function updateUsuario(id, usuarioData) {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.put(`/usuarios/${id}`, usuarioData);
      const index = usuarios.value.findIndex(u => u._id === id);
      if (index !== -1) {
        usuarios.value[index] = response.data;
      }
      
      // Se o usuário atualizado é o usuário logado, atualiza também
      if (currentUser.value && currentUser.value._id === id) {
        updateCurrentUser(response.data);
      }
      
      return { success: true, data: response.data };
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao atualizar usuário';
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  async function deleteUsuario(id) {
    loading.value = true;
    error.value = null;
    try {
      await api.delete(`/usuarios/${id}`);
      usuarios.value = usuarios.value.filter(u => u._id !== id);
      return { success: true };
    } catch (err) {
      error.value = err.response?.data?.error || 'Erro ao excluir usuário';
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  // Carrega o usuário ao inicializar a store
  loadUser();

  return {
    // Estado
    usuarios,
    currentUser,
    loading,
    error,
    
    // Funções de Autenticação OAuth2
    login,
    loginWithGoogle,
    register,
    logout,
    changePassword,
    forgotPassword,
    resetPassword,
    loadUser,
    updateCurrentUser,
    
    // Funções CRUD de Usuários
    fetchUsuarios,
    createUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario
  };
});