import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useMaquinaStore = defineStore("maquina", () => {
  const maquinas = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const totalMaquinas = computed(() => maquinas.value.length);

  // ✅ Pega ID do usuário logado
  const getUsuarioId = () => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        console.log('👤 Usuário logado:', user);
        return user._id || user.id;
      } catch (e) {
        console.error('❌ Erro ao parsear usuário:', e);
        return null;
      }
    }
    console.warn('⚠️ Nenhum usuário encontrado no localStorage');
    return null;
  };

  // ✅ BUSCAR máquinas do usuário
  const fetchMaquina = async () => {
    const usuarioId = getUsuarioId();
    
    if (!usuarioId) {
      error.value = 'Usuário não identificado. Faça login novamente.';
      return;
    }

    try {
      loading.value = true;
      error.value = null;

      console.log('🔍 Buscando máquinas do usuário:', usuarioId);

      const response = await fetch(
        `http://localhost:3000/api/maquinas/usuario/${usuarioId}`
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar máquinas');
      }

      const data = await response.json();
      maquinas.value = data.maquinas || [];

      console.log(`✅ ${maquinas.value.length} máquinas carregadas`);
    } catch (err) {
      console.error('❌ Erro ao buscar máquinas:', err);
      error.value = err.message;
      maquinas.value = [];
    } finally {
      loading.value = false;
    }
  };

  // ✅ ADICIONAR máquina
  const addMaquina = async (payload) => {
    const usuarioId = getUsuarioId();
    
    if (!usuarioId) {
      error.value = 'Usuário não identificado. Faça login novamente.';
      alert('❌ Erro: Usuário não identificado');
      return;
    }

    try {
      loading.value = true;
      error.value = null;

      const dadosEnvio = {
        name: payload.name,
        type: payload.type,
        status: payload.status || "Funcionando",
        usuario: usuarioId
      };

      console.log('📤 Enviando dados:', dadosEnvio);

      const response = await fetch('http://localhost:3000/api/maquinas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosEnvio)
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Resposta do servidor:', data);
        throw new Error(data.error || 'Erro ao criar máquina');
      }

      console.log('✅ Máquina criada:', data.maquina);
      alert('✅ Máquina criada com sucesso!');

      // Recarrega a lista
      await fetchMaquina();

    } catch (err) {
      console.error('❌ Erro ao criar máquina:', err);
      error.value = err.message;
      alert(`❌ Erro: ${err.message}`);
    } finally {
      loading.value = false;
    }
  };

  // ✅ ATUALIZAR máquina
  const updateMaquina = async (id, payload) => {
    try {
      loading.value = true;
      error.value = null;

      console.log('📝 Atualizando máquina:', id, payload);

      const response = await fetch(`http://localhost:3000/api/maquinas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao atualizar máquina');
      }

      console.log('✅ Máquina atualizada:', data.maquina);
      alert('✅ Máquina atualizada com sucesso!');

      await fetchMaquina();

    } catch (err) {
      console.error('❌ Erro ao atualizar máquina:', err);
      error.value = err.message;
      alert(`❌ Erro: ${err.message}`);
    } finally {
      loading.value = false;
    }
  };

  // ✅ DELETAR máquina
  const removeMaquina = async (id) => {
    if (!confirm('Tem certeza que deseja deletar esta máquina?')) return;

    try {
      loading.value = true;
      error.value = null;

      console.log('🗑️ Deletando máquina:', id);

      const response = await fetch(`http://localhost:3000/api/maquinas/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao deletar máquina');
      }

      console.log('✅ Máquina deletada');
      alert('✅ Máquina deletada com sucesso!');

      await fetchMaquina();

    } catch (err) {
      console.error('❌ Erro ao deletar máquina:', err);
      error.value = err.message;
      alert(`❌ Erro: ${err.message}`);
    } finally {
      loading.value = false;
    }
  };

  return {
    maquinas,
    loading,
    error,
    totalMaquinas,
    fetchMaquina,
    addMaquina,
    updateMaquina,
    removeMaquina
  };
});