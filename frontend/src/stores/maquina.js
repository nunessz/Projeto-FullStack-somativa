import { defineStore } from "pinia";
import api from "../services/api.js";

export const useMaquinaStore = defineStore("maquina", {
  state: () => ({
    maquinas: [],
    loading: false,
    error: null
  }),
  getters: {
    totalMaquinas: (state) => state.maquinas.length
  },
  actions: {
    async fetchMaquina() {
      this.loading = true;
      this.error = null;
      try {
        const res = await api.get("/maquinas");
        this.maquinas = res.data;
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao buscar maquina";
      } finally {
        this.loading = false;
      }
    },
    async addMaquina(maquina) {
      this.error = null;
      try {
        const res = await api.post("/maquinas", maquina);
        this.maquinas.unshift(res.data);
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao criar maquina";
      }
    },
    async updateMaquina(id, payload) {
      this.error = null;
      try {
        const res = await api.put(`/maquinas/${id}`, payload);
        const idx = this.maquinas.findIndex(u => u._id === id);
        if (idx !== -1) this.maquinas[idx] = res.data;
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao atualizar maquina";
      }
    },
    async removeMaquina(id) {
      this.error = null;
      try {
        await api.delete(`/maquinas/${id}`);
        this.maquinas = this.maquinas.filter(u => u._id !== id);
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao remover maquina";
      }
    }
  }
});
