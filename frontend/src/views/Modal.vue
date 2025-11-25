<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
      <!-- Cabeçalho -->
      <div class="bg-gradient-to-r from-orange-400 to-orange-500 p-6 rounded-t-2xl">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-white flex items-center gap-3">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Detalhes da Manutenção
          </h2>
          <button
            @click="$emit('close')"
            class="text-white hover:bg-white/20 rounded-lg p-2 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="p-6 space-y-4">
        <div class="bg-gray-50 rounded-xl p-4 border-l-4 border-orange-400">
          <p class="text-sm text-gray-600 mb-1 font-medium">Máquina</p>
          <p class="text-lg font-semibold text-gray-900">
            {{ manutencao.maquina?.name || 'N/A' }}
          </p>
          <p class="text-sm text-gray-500">{{ manutencao.maquina?.type || '' }}</p>
        </div>

        <div class="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-400">
          <p class="text-sm text-gray-600 mb-1 font-medium">Técnico Responsável</p>
          <p class="text-lg font-semibold text-gray-900">{{ manutencao.tecnico }}</p>
        </div>

        <div class="bg-gray-50 rounded-xl p-4 border-l-4 border-green-400">
          <p class="text-sm text-gray-600 mb-1 font-medium">Data Agendada</p>
          <p class="text-lg font-semibold text-gray-900">
            {{ formatarData(manutencao.dataAgendada) }}
          </p>
        </div>

        <div class="bg-gray-50 rounded-xl p-4 border-l-4 border-purple-400">
          <p class="text-sm text-gray-600 mb-1 font-medium">Status</p>
          <span
            :class="[
              'inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold',
              statusClass(manutencao.status)
            ]"
          >
            {{ manutencao.status }}
          </span>
        </div>

        <div class="bg-gray-50 rounded-xl p-4 border-l-4 border-gray-400">
          <p class="text-sm text-gray-600 mb-2 font-medium">Descrição</p>
          <p class="text-gray-900 leading-relaxed">{{ manutencao.descricao }}</p>
        </div>

        <!-- Botões de Ação -->
        <div class="flex gap-4 pt-4" v-if="manutencao.status === 'Agendada' || manutencao.status === 'Em andamento'">
          <button
            @click="concluir"
            v-if="manutencao.status === 'Agendada' || manutencao.status === 'Em andamento'"
            class="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white 
                   rounded-xl font-bold transition-all duration-300 hover:scale-105
                   shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Marcar como Concluída
          </button>

          <button
            @click="cancelar"
            v-if="manutencao.status === 'Agendada'"
            class="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white 
                   rounded-xl font-bold transition-all duration-300 hover:scale-105
                   shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Cancelar Manutenção
          </button>
        </div>

        <!-- Informação adicional -->
        <div class="pt-4 border-t border-gray-200" v-if="manutencao.createdAt">
          <p class="text-xs text-gray-500">
            Criado em: {{ formatarData(manutencao.createdAt) }}
          </p>
          <p class="text-xs text-gray-500" v-if="manutencao.updatedAt">
            Última atualização: {{ formatarData(manutencao.updatedAt) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useManutencaoStore } from '../stores/manutencao';

const props = defineProps({
  manutencao: { type: Object, required: true }
});

const emit = defineEmits(['close', 'atualizado']);
const manutencaoStore = useManutencaoStore();

function formatarData(data) {
  if (!data) return 'N/A';
  return new Date(data).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function statusClass(status) {
  const classes = {
    'Agendada': 'bg-blue-100 text-blue-800',
    'Em andamento': 'bg-yellow-100 text-yellow-800',
    'Concluída': 'bg-green-100 text-green-800',
    'Cancelada': 'bg-red-100 text-red-800'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
}

async function concluir() {
  if (confirm('Marcar esta manutenção como concluída?')) {
    try {
      await manutencaoStore.updateManutencao(props.manutencao._id, {
        status: 'Concluída'
      });
      emit('atualizado');
      emit('close');
    } catch (e) {
      alert('Erro ao atualizar manutenção');
    }
  }
}

async function cancelar() {
  if (confirm('Tem certeza que deseja cancelar esta manutenção?')) {
    try {
      await manutencaoStore.updateManutencao(props.manutencao._id, {
        status: 'Cancelada'
      });
      emit('atualizado');
      emit('close');
    } catch (e) {
      alert('Erro ao cancelar manutenção');
    }
  }
}
</script>