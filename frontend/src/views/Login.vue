<template>
  <div class="h-[calc(100vh-132px)] w-full bg-gradient-to-br from-orange-50 via-white to-orange-50 flex justify-center items-center p-8 lg:p-10">
    <div class="w-full max-w-md relative">
      <div class="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-500/10 rounded-3xl blur-3xl"></div>
      
      <div class="relative bg-white rounded-3xl shadow-2xl border-2 border-orange-100 p-10">
        <div class="text-center mb-8">
          <h1 class="text-5xl pb-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 mb-2">
            Login
          </h1>
          <div class="h-1 w-20 bg-orange-400 rounded-full mx-auto"></div>
        </div>

        <!-- Mensagens de erro -->
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {{ errorMessage }}
        </div>

        <!-- Mensagem de sucesso -->
        <div v-if="successMessage" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
          {{ successMessage }}
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="relative group">
            <label for="email" class="block text-gray-700 font-medium mb-2 text-sm">Email</label>
            <div class="relative">
              <input
                type="email"
                id="email"
                v-model="formData.email"
                placeholder="seu@email.com"
                required
                class="w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl
                       focus:outline-none focus:border-orange-400 focus:bg-white
                       transition-all duration-300 group-hover:border-gray-300"
              />
              <div class="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 
                          scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>

          <div class="relative group">
            <label for="senha" class="block text-gray-700 font-medium mb-2 text-sm">Senha</label>
            <div class="relative">
              <input
                type="password"
                id="senha"
                v-model="formData.password"
                placeholder="••••••••"
                required
                minlength="6"
                class="w-full px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl
                       focus:outline-none focus:border-orange-400 focus:bg-white
                       transition-all duration-300 group-hover:border-gray-300"
              />
              <div class="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 
                          scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white 
                   rounded-xl font-bold text-lg shadow-lg shadow-orange-400/30
                   hover:shadow-2xl hover:shadow-orange-400/50 hover:scale-105
                   transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span class="relative flex items-center justify-center gap-2">
              {{ loading ? 'ENTRANDO...' : 'ENTRAR' }}
              <svg v-if="!loading" class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </form>

        <div class="relative mt-8 mb-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t-2 border-gray-200"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="px-4 bg-white text-gray-500 font-medium">Ou continue com</span>
          </div>
        </div>

        <div class="flex justify-center">
          <div id="g_id_onload"
               data-client_id="586571572155-mcq92oor3iogka831rbohqlp1bl5plco.apps.googleusercontent.com"
               data-callback="handleGoogleResponse"
               data-auto_prompt="false">
          </div>
          <div class="g_id_signin w-full"
               data-type="standard"
               data-shape="rectangular"
               data-theme="outline"
               data-text="signin_with"
               data-size="large"
               data-logo_alignment="left"
               data-width="100%">
          </div>
        </div>

        <div class="mt-8 text-center">
          <p class="text-gray-600">
            Primeiro acesso? 
            <router-link to="/cadastrar" class="text-orange-400 hover:text-orange-500 font-bold hover:underline transition-colors ml-1">
              Crie sua conta
            </router-link>
          </p>
        </div>
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

const formData = ref({
  email: '',
  password: ''
});

const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

onMounted(() => {
  loadGoogleScript();
  window.handleGoogleResponse = handleGoogleResponse;
});

function loadGoogleScript() {
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

async function handleSubmit() {
  errorMessage.value = '';
  successMessage.value = '';

  loading.value = true;

  try {
    const result = await usuariosStore.fetchUsuarios();

    if (result.success) {
      const user = usuariosStore.usuarios.find(
        u => u.email === formData.value.email && u.password === formData.value.password
      );

      if (user) {
        successMessage.value = 'Login realizado com sucesso! Redirecionando...';
        
        // Salva usuário diretamente
        usuariosStore.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        errorMessage.value = 'Email ou senha incorretos';
      }
    } else {
      errorMessage.value = 'Erro ao verificar credenciais';
    }
  } catch (error) {
    errorMessage.value = 'Erro ao realizar login';
    console.error('Erro no login:', error);
  } finally {
    loading.value = false;
  }
}

async function handleGoogleResponse(response) {
  console.log("Token JWT do Google:", response.credential);
  
  try {
    errorMessage.value = '';
    successMessage.value = 'Login com Google em desenvolvimento...';
  } catch (error) {
    console.error('Erro ao logar com Google:', error);
    errorMessage.value = 'Erro ao fazer login com Google';
  }
}
</script>