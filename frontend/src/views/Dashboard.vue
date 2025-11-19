<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-8 lg:p-10">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-12 relative">
        <div class="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-transparent rounded-2xl blur-2xl"></div>
        <div class="relative flex items-center gap-4">
          <h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
            Dashboard de Máquinas
          </h1>
          <span class="px-5 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full text-xl font-bold shadow-lg shadow-orange-400/30">
            {{ totalMaquinas }}
          </span>
        </div>
        <div class="relative h-1 w-40 bg-gradient-to-r from-orange-400 to-transparent rounded-full mt-4"></div>
      </div>

      <!-- Cards de Resumo -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <!-- Total de Máquinas -->
        <div class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border-2 border-orange-100 
                   hover:border-orange-400 transition-all duration-500 p-8 shadow-xl hover:shadow-2xl hover:shadow-orange-400/20">
          <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent rounded-3xl 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <p class="text-gray-600 font-medium text-sm">Total de Máquinas</p>
              <div class="bg-orange-100 rounded-2xl p-3">
                <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
            <p class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
              {{ totalMaquinas }}
            </p>
          </div>
        </div>

        <!-- Funcionando -->
        <div class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border-2 border-orange-100 
                   hover:border-orange-400 transition-all duration-500 p-8 shadow-xl hover:shadow-2xl hover:shadow-orange-400/20">
          <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent rounded-3xl 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <p class="text-gray-600 font-medium text-sm">Funcionando</p>
              <div class="bg-emerald-100 rounded-2xl p-3">
                <svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">
              {{ statusCount.funcionando }}
            </p>
            <p class="text-sm text-gray-500 font-medium mt-2">{{ getPercentage('funcionando') }}% do total</p>
          </div>
        </div>

        <!-- Paradas -->
        <div class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border-2 border-orange-100 
                   hover:border-orange-400 transition-all duration-500 p-8 shadow-xl hover:shadow-2xl hover:shadow-orange-400/20">
          <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent rounded-3xl 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <p class="text-gray-600 font-medium text-sm">Paradas</p>
              <div class="bg-red-100 rounded-2xl p-3">
                <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">
              {{ statusCount.parada }}
            </p>
            <p class="text-sm text-gray-500 font-medium mt-2">{{ getPercentage('parada') }}% do total</p>
          </div>
        </div>

        <!-- Em Manutenção -->
        <div class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border-2 border-orange-100 
                   hover:border-orange-400 transition-all duration-500 p-8 shadow-xl hover:shadow-2xl hover:shadow-orange-400/20">
          <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent rounded-3xl 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <p class="text-gray-600 font-medium text-sm">Em Manutenção</p>
              <div class="bg-amber-100 rounded-2xl p-3">
                <svg class="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <p class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
              {{ statusCount.manutencao }}
            </p>
            <p class="text-sm text-gray-500 font-medium mt-2">{{ getPercentage('manutencao') }}% do total</p>
          </div>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Gráfico de Pizza -->
        <div class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border-2 border-orange-100 
                   hover:border-orange-400 transition-all duration-500 p-8 shadow-xl hover:shadow-2xl hover:shadow-orange-400/20">
          <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent rounded-3xl 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10">
            <h2 class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 mb-6">
              Distribuição por Status
            </h2>
            <div class="bg-gradient-to-br from-emerald-500/10 via-orange-500/10 to-red-500/10 rounded-2xl p-6 h-80 flex items-center justify-center">
              <canvas ref="pieChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Gráfico de Barras -->
        <div class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border-2 border-orange-100 
                   hover:border-orange-400 transition-all duration-500 p-8 shadow-xl hover:shadow-2xl hover:shadow-orange-400/20">
          <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent rounded-3xl 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10">
            <h2 class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 mb-6">
              Comparativo de Status
            </h2>
            <div class="bg-gradient-to-br from-emerald-500/10 via-orange-500/10 to-red-500/10 rounded-2xl p-6 h-80 flex items-center justify-center">
              <canvas ref="barChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Gráfico Doughnut -->
        <div class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border-2 border-orange-100 
                   hover:border-orange-400 transition-all duration-500 p-8 shadow-xl hover:shadow-2xl hover:shadow-orange-400/20">
          <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent rounded-3xl 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10">
            <h2 class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 mb-6">
              Status das Máquinas
            </h2>
            <div class="bg-gradient-to-br from-emerald-500/10 via-orange-500/10 to-red-500/10 rounded-2xl p-6 h-80 flex items-center justify-center">
              <canvas ref="doughnutChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Resumo Detalhado -->
        <div class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border-2 border-orange-100 
                   hover:border-orange-400 transition-all duration-500 p-8 shadow-xl hover:shadow-2xl hover:shadow-orange-400/20">
          <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent rounded-3xl 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10">
            <h2 class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 mb-6">
              Resumo Detalhado
            </h2>
            
            <div class="space-y-4">
              <!-- Funcionando -->
              <div class="group/item relative bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border-2 border-emerald-200 
                        hover:border-emerald-400 p-6 transition-all duration-300">
                <div class="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent rounded-2xl opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                <div class="relative z-10 flex justify-between items-center">
                  <span class="font-semibold text-emerald-700">Funcionando</span>
                  <div class="text-right">
                    <span class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">
                      {{ statusCount.funcionando }}
                    </span>
                    <span class="text-sm text-emerald-600 ml-2 font-medium">({{ getPercentage('funcionando') }}%)</span>
                  </div>
                </div>
              </div>

              <!-- Paradas -->
              <div class="group/item relative bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl border-2 border-red-200 
                        hover:border-red-400 p-6 transition-all duration-300">
                <div class="absolute inset-0 bg-gradient-to-br from-red-400/5 to-transparent rounded-2xl opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                <div class="relative z-10 flex justify-between items-center">
                  <span class="font-semibold text-red-700">Paradas</span>
                  <div class="text-right">
                    <span class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                      {{ statusCount.parada }}
                    </span>
                    <span class="text-sm text-red-600 ml-2 font-medium">({{ getPercentage('parada') }}%)</span>
                  </div>
                </div>
              </div>

              <!-- Em Manutenção -->
              <div class="group/item relative bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl border-2 border-amber-200 
                        hover:border-amber-400 p-6 transition-all duration-300">
                <div class="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent rounded-2xl opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                <div class="relative z-10 flex justify-between items-center">
                  <span class="font-semibold text-amber-700">Em Manutenção</span>
                  <div class="text-right">
                    <span class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                      {{ statusCount.manutencao }}
                    </span>
                    <span class="text-sm text-amber-600 ml-2 font-medium">({{ getPercentage('manutencao') }}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useMaquinaStore } from '../stores/maquina';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const maquinaStore = useMaquinaStore();
const pieChart = ref(null);
const barChart = ref(null);
const doughnutChart = ref(null);

let pieChartInstance = null;
let barChartInstance = null;
let doughnutChartInstance = null;

// Computed properties
const totalMaquinas = computed(() => maquinaStore.totalMaquinas);

const statusCount = computed(() => {
  const count = {
    funcionando: 0,
    parada: 0,
    manutencao: 0
  };

  maquinaStore.maquinas.forEach(maq => {
    const status = maq.status.toLowerCase();
    if (status === 'funcionando') count.funcionando++;
    else if (status === 'parada') count.parada++;
    else if (status === 'em manutenção') count.manutencao++;
  });

  return count;
});

const getPercentage = (status) => {
  if (totalMaquinas.value === 0) return 0;
  return ((statusCount.value[status] / totalMaquinas.value) * 100).toFixed(1);
};

// Configuração dos gráficos
const chartColors = {
  funcionando: 'rgb(34, 197, 94)',
  parada: 'rgb(239, 68, 68)',
  manutencao: 'rgb(234, 179, 8)'
};

const createPieChart = () => {
  if (pieChartInstance) pieChartInstance.destroy();

  const ctx = pieChart.value.getContext('2d');
  pieChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Funcionando', 'Paradas', 'Em Manutenção'],
      datasets: [{
        data: [
          statusCount.value.funcionando,
          statusCount.value.parada,
          statusCount.value.manutencao
        ],
        backgroundColor: [
          chartColors.funcionando,
          chartColors.parada,
          chartColors.manutencao
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: { size: 12 },
            color: '#6b7280'
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              const percentage = ((value / totalMaquinas.value) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
};

const createBarChart = () => {
  if (barChartInstance) barChartInstance.destroy();

  const ctx = barChart.value.getContext('2d');
  barChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Funcionando', 'Paradas', 'Em Manutenção'],
      datasets: [{
        label: 'Quantidade de Máquinas',
        data: [
          statusCount.value.funcionando,
          statusCount.value.parada,
          statusCount.value.manutencao
        ],
        backgroundColor: [
          chartColors.funcionando,
          chartColors.parada,
          chartColors.manutencao
        ],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.parsed.y || 0;
              const percentage = ((value / totalMaquinas.value) * 100).toFixed(1);
              return `${value} máquinas (${percentage}%)`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1, color: '#6b7280' },
          grid: { color: '#e5e7eb' }
        },
        x: {
          ticks: { color: '#6b7280' },
          grid: { display: false }
        }
      }
    }
  });
};

const createDoughnutChart = () => {
  if (doughnutChartInstance) doughnutChartInstance.destroy();

  const ctx = doughnutChart.value.getContext('2d');
  doughnutChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Funcionando', 'Paradas', 'Em Manutenção'],
      datasets: [{
        data: [
          statusCount.value.funcionando,
          statusCount.value.parada,
          statusCount.value.manutencao
        ],
        backgroundColor: [
          chartColors.funcionando,
          chartColors.parada,
          chartColors.manutencao
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: { size: 12 },
            color: '#6b7280'
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              const percentage = ((value / totalMaquinas.value) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
};

const updateCharts = () => {
  if (pieChart.value) createPieChart();
  if (barChart.value) createBarChart();
  if (doughnutChart.value) createDoughnutChart();
};

onMounted(async () => {
  await maquinaStore.fetchMaquina();
  setTimeout(() => {
    updateCharts();
  }, 100);
});

// Atualiza os gráficos quando os dados mudarem
watch(() => maquinaStore.maquinas, () => {
  setTimeout(() => {
    updateCharts();
  }, 100);
}, { deep: true });
</script>