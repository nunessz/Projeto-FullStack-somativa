<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Cabeçalho -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Calendário de Manutenções</h1>
        <p class="text-gray-600">Gerencie e agende manutenções para suas máquinas paradas</p>
      </div>

      <!-- Calendário -->
      <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <!-- Cabeçalho do Calendário -->
        <div class="flex items-center justify-between mb-6">
          <button
            @click="mesAnterior"
            class="p-2 rounded-lg hover:bg-orange-50 transition-colors duration-200"
          >
            <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <div class="text-center">
            <h2 class="text-2xl font-bold text-gray-800">
              {{ nomesMeses[mesAtual] }} {{ anoAtual }}
            </h2>
            <button
              @click="voltarHoje"
              class="text-sm text-orange-500 hover:text-orange-600 font-medium mt-1"
            >
              Hoje
            </button>
          </div>

          <button
            @click="proximoMes"
            class="p-2 rounded-lg hover:bg-orange-50 transition-colors duration-200"
          >
            <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <!-- Dias da Semana -->
        <div class="grid grid-cols-7 gap-2 mb-2">
          <div
            v-for="dia in diasSemana"
            :key="dia"
            class="text-center text-sm font-bold text-gray-600 py-2"
          >
            {{ dia }}
          </div>
        </div>

        <!-- Grade do Calendário -->
        <div class="grid grid-cols-7 gap-2">
          <div
            v-for="dia in diasDoMes"
            :key="dia.key"
            @click="dia.numero ? selecionarDia(dia) : null"
            :class="[
              'min-h-24 p-2 rounded-lg border-2 transition-all duration-200',
              dia.numero ? 'cursor-pointer hover:border-orange-300 hover:shadow-md' : 'bg-gray-50 cursor-default',
              dia.ehHoje ? 'border-orange-500 bg-orange-50' : 'border-gray-200',
              dia.numero && !dia.ehHoje ? 'hover:bg-orange-50' : ''
            ]"
          >
            <div v-if="dia.numero" class="h-full flex flex-col">
              <!-- Número do Dia -->
              <div
                :class="[
                  'text-sm font-semibold mb-1',
                  dia.ehHoje ? 'text-orange-600' : 'text-gray-700'
                ]"
              >
                {{ dia.numero }}
              </div>

              <!-- Manutenções do Dia -->
              <div class="flex-1 space-y-1 overflow-y-auto">
                <div
                  v-for="manutencao in dia.manutencoes.slice(0, 2)"
                  :key="manutencao._id"
                  @click.stop="verDetalhes(manutencao)"
                  class="bg-orange-400 text-white text-xs p-1.5 rounded hover:bg-orange-500 
                         transition-colors duration-200 cursor-pointer truncate"
                  :title="`${manutencao.maquina?.name || 'Máquina'} - ${manutencao.tecnico}`"
                >
                  <div class="font-semibold truncate">
                    {{ manutencao.maquina?.name || 'Máquina' }}
                  </div>
                  <div class="text-orange-100 truncate text-[10px]">
                    {{ manutencao.tecnico }}
                  </div>
                </div>
              </div>

              <!-- Indicador de mais manutenções -->
              <div
                v-if="dia.manutencoes.length > 2"
                class="text-[10px] text-gray-500 font-medium mt-1 text-center"
              >
                +{{ dia.manutencoes.length - 2 }} mais
              </div>
            </div>
          </div>
        </div>

        <!-- Botão de Agendar -->
        <div class="mt-6">
          <button
            @click="abrirModalAgendamento"
            class="w-full py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white 
                   rounded-xl font-bold text-lg shadow-lg shadow-orange-400/30
                   hover:shadow-2xl hover:shadow-orange-400/50 hover:scale-105
                   transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Agendar Nova Manutenção
          </button>
        </div>
      </div>

      <!-- Legenda -->
      <div class="mt-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
        <h3 class="font-semibold text-gray-700 mb-3">Legenda</h3>
        <div class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-orange-50 border-2 border-orange-500 rounded"></div>
            <span class="text-sm text-gray-600">Hoje</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-orange-400 rounded"></div>
            <span class="text-sm text-gray-600">Manutenção Agendada</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Agendamento -->
    <div
      v-if="mostrarModal"
      class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="fecharModal"
    >
      <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <!-- Cabeçalho do Modal -->
        <div class="bg-gradient-to-r from-orange-400 to-orange-500 p-6 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-white flex items-center gap-3">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Agendar Manutenção
            </h2>
            <button
              @click="fecharModal"
              class="text-white hover:bg-white/20 rounded-lg p-2 transition-colors duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Formulário -->
        <form @submit.prevent="agendar" class="p-6 space-y-6">
          <!-- Máquina -->
          <div class="relative group">
            <label class="block text-gray-700 font-semibold mb-2 text-sm">
              Máquina <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.maquinaId"
              required
              class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl
                     focus:outline-none focus:border-orange-400 focus:bg-white
                     transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="">Selecione uma máquina parada</option>
              <option
                v-for="maquina in maquinasParadas"
                :key="maquina._id"
                :value="maquina._id"
              >
                {{ maquina.name }} - {{ maquina.type }}
              </option>
            </select>
            <div class="absolute right-4 top-12 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
            <p v-if="maquinasParadas.length === 0" class="text-sm text-red-500 mt-2">
              ⚠️ Nenhuma máquina com status "Parada" disponível
            </p>
          </div>

          <!-- Data -->
          <div class="relative group">
            <label class="block text-gray-700 font-semibold mb-2 text-sm">
              Data da Manutenção <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.dataAgendada"
              type="datetime-local"
              required
              :min="dataMinima"
              class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl
                     focus:outline-none focus:border-orange-400 focus:bg-white
                     transition-all duration-300"
            />
          </div>

          <!-- Técnico -->
          <div class="relative group">
            <label class="block text-gray-700 font-semibold mb-2 text-sm">
              Técnico Responsável <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.tecnico"
              placeholder="Ex: João Silva"
              required
              class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl
                     focus:outline-none focus:border-orange-400 focus:bg-white
                     transition-all duration-300"
            />
          </div>

          <!-- Descrição -->
          <div class="relative group">
            <label class="block text-gray-700 font-semibold mb-2 text-sm">
              Descrição da Manutenção <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.descricao"
              placeholder="Descreva o problema e o tipo de manutenção necessária..."
              required
              rows="4"
              class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl
                     focus:outline-none focus:border-orange-400 focus:bg-white
                     transition-all duration-300 resize-none"
            ></textarea>
          </div>

          <!-- Erro -->
          <div
            v-if="erro"
            class="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3"
          >
            <svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-red-700 text-sm">{{ erro }}</p>
          </div>

          <!-- Botões -->
          <div class="flex gap-4 pt-4">
            <button
              type="submit"
              :disabled="enviando || maquinasParadas.length === 0"
              class="flex-1 py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white 
                     rounded-xl font-bold text-lg shadow-lg shadow-orange-400/30
                     hover:shadow-2xl hover:shadow-orange-400/50 hover:scale-105
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                     transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg v-if="!enviando" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <svg v-else class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ enviando ? 'Agendando...' : 'Agendar Manutenção' }}
            </button>

            <button
              type="button"
              @click="fecharModal"
              class="flex-1 py-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white 
                     rounded-xl font-bold text-lg shadow-lg shadow-gray-400/30
                     hover:shadow-2xl hover:shadow-gray-400/50 hover:scale-105
                     transition-all duration-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Detalhes -->
    <div
      v-if="mostrarDetalhes && manutencaoSelecionada"
      class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="fecharDetalhes"
    >
      <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full border border-white/20">
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
              @click="fecharDetalhes"
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
              {{ manutencaoSelecionada.maquina?.name || 'N/A' }}
            </p>
            <p class="text-sm text-gray-500">{{ manutencaoSelecionada.maquina?.type || '' }}</p>
          </div>

          <div class="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-400">
            <p class="text-sm text-gray-600 mb-1 font-medium">Técnico Responsável</p>
            <p class="text-lg font-semibold text-gray-900">{{ manutencaoSelecionada.tecnico }}</p>
          </div>

          <div class="bg-gray-50 rounded-xl p-4 border-l-4 border-green-400">
            <p class="text-sm text-gray-600 mb-1 font-medium">Data Agendada</p>
            <p class="text-lg font-semibold text-gray-900">
              {{ formatarData(manutencaoSelecionada.dataAgendada) }}
            </p>
          </div>

          <div class="bg-gray-50 rounded-xl p-4 border-l-4 border-purple-400">
            <p class="text-sm text-gray-600 mb-1 font-medium">Status</p>
            <span
              :class="[
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold',
                statusClass(manutencaoSelecionada.status)
              ]"
            >
              {{ manutencaoSelecionada.status }}
            </span>
          </div>

          <div class="bg-gray-50 rounded-xl p-4 border-l-4 border-gray-400">
            <p class="text-sm text-gray-600 mb-2 font-medium">Descrição</p>
            <p class="text-gray-900 leading-relaxed">{{ manutencaoSelecionada.descricao }}</p>
          </div>

          <!-- Botões de Ação -->
          <div class="flex gap-4 pt-4" v-if="manutencaoSelecionada.status === 'Agendada' || manutencaoSelecionada.status === 'Em andamento'">
            <button
              @click="concluir"
              v-if="manutencaoSelecionada.status === 'Agendada' || manutencaoSelecionada.status === 'Em andamento'"
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
              v-if="manutencaoSelecionada.status === 'Agendada'"
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
          <div class="pt-4 border-t border-gray-200" v-if="manutencaoSelecionada.createdAt">
            <p class="text-xs text-gray-500">
              Criado em: {{ formatarData(manutencaoSelecionada.createdAt) }}
            </p>
            <p class="text-xs text-gray-500" v-if="manutencaoSelecionada.updatedAt">
              Última atualização: {{ formatarData(manutencaoSelecionada.updatedAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMaquinaStore } from '../stores/maquina';
import { useManutencaoStore } from '../stores/manutencao';

const maquinaStore = useMaquinaStore();
const manutencaoStore = useManutencaoStore();

// Estados do Calendário
const anoAtual = ref(new Date().getFullYear());
const mesAtual = ref(new Date().getMonth());
const mostrarModal = ref(false);
const mostrarDetalhes = ref(false);
const dataSelecionada = ref(null);
const manutencaoSelecionada = ref(null);

// Estados do Formulário
const form = ref({
  maquinaId: '',
  dataAgendada: '',
  tecnico: '',
  descricao: ''
});

const enviando = ref(false);
const erro = ref('');

const nomesMeses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// Computeds
const diasDoMes = computed(() => {
  const primeiroDia = new Date(anoAtual.value, mesAtual.value, 1);
  const ultimoDia = new Date(anoAtual.value, mesAtual.value + 1, 0);
  const diasNoMes = ultimoDia.getDate();
  const diaSemanaInicio = primeiroDia.getDay();

  const dias = [];
  let key = 0;

  // Dias vazios antes do primeiro dia
  for (let i = 0; i < diaSemanaInicio; i++) {
    dias.push({ numero: null, key: `empty-${key++}`, manutencoes: [] });
  }

  // Dias do mês
  for (let dia = 1; dia <= diasNoMes; dia++) {
    const dataCompleta = new Date(anoAtual.value, mesAtual.value, dia);
    const hoje = new Date();
    const ehHoje = 
      dataCompleta.getDate() === hoje.getDate() &&
      dataCompleta.getMonth() === hoje.getMonth() &&
      dataCompleta.getFullYear() === hoje.getFullYear();

    // Buscar manutenções do dia
    const manutencoesVDia = manutencaoStore.manutencoes.filter(m => {
      const dataManutencao = new Date(m.dataAgendada);
      return (
        dataManutencao.getDate() === dia &&
        dataManutencao.getMonth() === mesAtual.value &&
        dataManutencao.getFullYear() === anoAtual.value
      );
    });

    dias.push({
      numero: dia,
      key: `day-${dia}`,
      ehHoje,
      data: dataCompleta,
      manutencoes: manutencoesVDia
    });
  }

  return dias;
});

// Apenas máquinas com status "Parada"
const maquinasParadas = computed(() => {
  return maquinaStore.maquinas.filter(m => m.status === 'Parada');
});

// Data mínima (agora)
const dataMinima = computed(() => {
  const agora = new Date();
  agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
  return agora.toISOString().slice(0, 16);
});

// Funções do Calendário
function mesAnterior() {
  if (mesAtual.value === 0) {
    mesAtual.value = 11;
    anoAtual.value--;
  } else {
    mesAtual.value--;
  }
}

function proximoMes() {
  if (mesAtual.value === 11) {
    mesAtual.value = 0;
    anoAtual.value++;
  } else {
    mesAtual.value++;
  }
}

function voltarHoje() {
  const hoje = new Date();
  anoAtual.value = hoje.getFullYear();
  mesAtual.value = hoje.getMonth();
}

function selecionarDia(dia) {
  dataSelecionada.value = dia.data;
  abrirModalAgendamento();
}

function abrirModalAgendamento() {
  // Se uma data foi selecionada no calendário, preencher
  if (dataSelecionada.value) {
    const data = new Date(dataSelecionada.value);
    data.setMinutes(data.getMinutes() - data.getTimezoneOffset());
    form.value.dataAgendada = data.toISOString().slice(0, 16);
  } else {
    form.value.dataAgendada = '';
  }
  
  // Resetar outros campos
  form.value.maquinaId = '';
  form.value.tecnico = '';
  form.value.descricao = '';
  erro.value = '';
  
  mostrarModal.value = true;
}

function fecharModal() {
  mostrarModal.value = false;
  dataSelecionada.value = null;
}

function verDetalhes(manutencao) {
  manutencaoSelecionada.value = manutencao;
  mostrarDetalhes.value = true;
}

function fecharDetalhes() {
  mostrarDetalhes.value = false;
  manutencaoSelecionada.value = null;
}

async function recarregarManutencoes() {
  await manutencaoStore.fetchManutencoes();
}

// Função de Agendamento
async function agendar() {
  if (!form.value.maquinaId) {
    erro.value = 'Selecione uma máquina';
    return;
  }

  enviando.value = true;
  erro.value = '';

  try {
    await manutencaoStore.addManutencao({
      maquina: form.value.maquinaId,
      dataAgendada: form.value.dataAgendada,
      tecnico: form.value.tecnico,
      descricao: form.value.descricao
    });

    await recarregarManutencoes();
    fecharModal();
  } catch (e) {
    erro.value = e?.response?.data?.error || 'Erro ao agendar manutenção';
  } finally {
    enviando.value = false;
  }
}

// Funções do Modal de Detalhes
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
      await manutencaoStore.updateManutencao(manutencaoSelecionada.value._id, {
        status: 'Concluída'
      });
      await recarregarManutencoes();
      fecharDetalhes();
    } catch (e) {
      alert('Erro ao atualizar manutenção');
    }
  }
}

async function cancelar() {
  if (confirm('Tem certeza que deseja cancelar esta manutenção?')) {
    try {
      await manutencaoStore.updateManutencao(manutencaoSelecionada.value._id, {
        status: 'Cancelada'
      });
      await recarregarManutencoes();
      fecharDetalhes();
    } catch (e) {
      alert('Erro ao cancelar manutenção');
    }
  }
}

// Carregar dados ao montar o componente
onMounted(async () => {
  await maquinaStore.fetchMaquinas();
  await manutencaoStore.fetchManutencoes();
});
</script>