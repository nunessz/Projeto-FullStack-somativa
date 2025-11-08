import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../services/api';

export const useUsuariosStore = defineStore('usuarios', () => {
  const usuarios = ref([]);
  const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || null);
  const loading = ref(false);
  const error = ref(null);

  const isLoggedIn = computed(() => !!currentUser.value);

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

  function setCurrentUser(user) {
    currentUser.value = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  function logout() {
    currentUser.value = null;
    localStorage.removeItem('currentUser');
  }

  return {
    usuarios,
    currentUser,
    isLoggedIn,
    loading,
    error,
    fetchUsuarios,
    createUsuario,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
    setCurrentUser,
    logout
  };
});