<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-8 lg:p-10">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-12 relative">
        <div class="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-transparent rounded-2xl blur-2xl"></div>
        <div class="relative flex items-center gap-4">
          <h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
            Meu Perfil
          </h1>
        </div>
        <div class="relative h-1 w-40 bg-gradient-to-r from-orange-400 to-transparent rounded-full mt-4"></div>
      </div>

      <!-- Card de Perfil Principal -->
      <div class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border-2 border-orange-100 
                 hover:border-orange-400 transition-all duration-500 p-12 shadow-xl hover:shadow-2xl hover:shadow-orange-400/20 mb-12">
        <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent rounded-3xl 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div class="relative z-10">
          <!-- Avatar -->
          <div class="flex flex-col items-center mb-8">
            <div class="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-orange-400/30">
              <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 class="text-3xl font-extrabold text-gray-800 text-center mb-2">
              {{ currentUser.nome }}
            </h2>
            <p class="text-gray-500 font-medium">Bem-vindo ao ProMaq Solutions</p>
          </div>

          <!-- Informações do Usuário -->
          <div class="space-y-6">
            <!-- Email -->
            <div class="group/item relative bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl border-2 border-orange-200 
                      hover:border-orange-400 p-6 transition-all duration-300">
              <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent rounded-2xl opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
              <div class="relative z-10">
                <div class="flex items-center gap-3 mb-2">
                  <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="text-sm font-semibold text-orange-700">Email</span>
                </div>
                <p class="text-lg font-medium text-gray-800 ml-9">{{ currentUser.email || 'email@exemplo.com' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Seção de Navegação -->
      <div class="mb-12">
        <h3 class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 mb-6">
          Acesso Rápido
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Card Dashboard -->
          <router-link to="/dashboard" class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border-2 border-orange-100 
                   hover:border-orange-400 transition-all duration-500 p-8 shadow-xl hover:shadow-2xl hover:shadow-orange-400/20 overflow-hidden
                   hover:scale-105 duration-300">
            <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent rounded-3xl 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div class="relative z-10 text-center">
              <div class="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-4 mb-4 inline-flex">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l-4-4m0 0l-4 4m4-4v4" />
                </svg>
              </div>
              <h4 class="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 mb-2">
                Dashboard
              </h4>
              <p class="text-sm text-gray-600">Visualize os dados e gráficos das máquinas</p>
            </div>
          </router-link>

          <!-- Card Máquinas -->
          <router-link to="/maquina" class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border-2 border-orange-100 
                   hover:border-orange-400 transition-all duration-500 p-8 shadow-xl hover:shadow-2xl hover:shadow-orange-400/20 overflow-hidden
                   hover:scale-105 duration-300">
            <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent rounded-3xl 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div class="relative z-10 text-center">
              <div class="bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl p-4 mb-4 inline-flex">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h4 class="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500 mb-2">
                Máquinas
              </h4>
              <p class="text-sm text-gray-600">Gerencie e controle todas as máquinas</p>
            </div>
          </router-link>

          <!-- Card Calendário -->
          <router-link to="/calendario" class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border-2 border-orange-100 
                   hover:border-orange-400 transition-all duration-500 p-8 shadow-xl hover:shadow-2xl hover:shadow-orange-400/20 overflow-hidden
                   hover:scale-105 duration-300">
            <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent rounded-3xl 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div class="relative z-10 text-center">
              <div class="bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl p-4 mb-4 inline-flex">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 class="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500 mb-2">
                Calendário
              </h4>
              <p class="text-sm text-gray-600">Visualize agendamentos e manutenções</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Botão Logout -->
      <div class="flex justify-center">
        <button
          @click="logout"
          class="group relative bg-gradient-to-r from-red-400 to-red-500 text-white 
                 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-red-400/30
                 hover:shadow-2xl hover:shadow-red-400/50 hover:scale-105
                 transition-all duration-300 overflow-hidden"
        >
          <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span class="relative flex items-center justify-center gap-2">
            Sair da Conta
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUsuariosStore } from '../stores/usuario';

const router = useRouter();
const usuariosStore = useUsuariosStore();

const currentUser = ref({
  nome: '',
  email: '',
  _id: '',
  criadoEm: ''
});

const formatarData = (data) => {
  if (!data) return 'Data não disponível';
  const d = new Date(data);
  return d.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
};

const logout = () => {
  // Limpa dados do usuário
  usuariosStore.currentUser = null;
  localStorage.removeItem('currentUser');
  
  // Redireciona para login
  router.push('/login');
};

onMounted(() => {
  // Obtém usuário logado da store ou localStorage
  let user = usuariosStore.currentUser;
  
  if (!user) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        user = JSON.parse(savedUser);
      } catch (e) {
        console.error('Erro ao parsear usuário:', e);
      }
    }
  }
  
  if (user) {
    currentUser.value = {
      nome: user.nome || user.name || 'Usuário',
      email: user.email || 'email@exemplo.com',
      _id: user._id || '',
      criadoEm: user.criadoEm || ''
    };
    console.log('Usuário carregado:', currentUser.value);
  } else {
    console.log('Nenhum usuário encontrado');
    // Redireciona para login se não há usuário
    router.push('/login');
  }
});
</script>