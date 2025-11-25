import { defineStore } from "pinia";
import api from "../services/api.js";
import { useUsuariosStore } from "../stores/usuario"; 

export const useManutencaoStore = defineStore("manutencao", {
  state: () => ({
    manutencoes: [],
    loading: false,
    error: null
  }),
  getters: {
    totalManutencoes: (state) => state.manutencoes.length,
    
    manutencoesPorData: (state) => (ano, mes) => {
      return state.manutencoes.filter(m => {
        const data = new Date(m.dataAgendada);
        return data.getFullYear() === ano && data.getMonth() === mes;
      });
    },
    
    manutencoesAgendadas: (state) => {
      return state.manutencoes.filter(m => 
        m.status === "Agendada" || m.status === "Em andamento"
      );
    }
  },
  actions: {
    async fetchManutencoes() {
      this.loading = true;
      this.error = null;
      try {
        const usuariosStore = useUsuariosStore();
        const userId = usuariosStore.currentUser?._id;
        
        if (!userId) {
          throw new Error('Usuário não autenticado');
        }
        
        const res = await api.get("/manutencoes", {
          params: { userId }
        });
        this.manutencoes = res.data;
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao buscar manutenções";
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    
    async addManutencao(manutencao) {
      this.error = null;
      try {
        const usuariosStore = useUsuariosStore();
        const userId = usuariosStore.currentUser?._id;
        
        if (!userId) {
          throw new Error('Usuário não autenticado');
        }
        
        const res = await api.post("/manutencoes", {
          ...manutencao,
          userId
        });
        this.manutencoes.unshift(res.data);
        return res.data;
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao criar manutenção";
        throw e;
      }
    },
    
    async updateManutencao(id, payload) {
      this.error = null;
      try {
        const res = await api.put(`/manutencoes/${id}`, payload);
        const idx = this.manutencoes.findIndex(m => m._id === id);
        if (idx !== -1) this.manutencoes[idx] = res.data;
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao atualizar manutenção";
        throw e;
      }
    },
    
    async removeManutencao(id) {
      this.error = null;
      try {
        await api.delete(`/manutencoes/${id}`);
        this.manutencoes = this.manutencoes.filter(m => m._id !== id);
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao remover manutenção";
        throw e;
      }
    }
  }
});