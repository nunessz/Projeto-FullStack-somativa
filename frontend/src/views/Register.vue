<template>
  <div class="h-[calc(100vh-132px)] w-full bg-gradient-to-br from-orange-50 via-white to-orange-50 flex justify-center items-center p-8 lg:p-10">
    <div class="w-full max-w-md relative">
      <div class="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-500/10 rounded-3xl blur-3xl"></div>
      
      <div class="relative bg-white rounded-3xl shadow-2xl border-2 border-orange-100 p-10">
        <div class="text-center mb-8">
          <h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 mb-2">
            Criar Conta
          </h1>
          <div class="h-1 w-24 bg-orange-400 rounded-full mx-auto"></div>
          <p class="mt-3 text-gray-600">Preencha os dados abaixo</p>
        </div>

        <!-- Mensagens de erro -->
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {{ errorMessage }}
        </div>

        <!-- Mensagem de sucesso -->
        <div v-if="successMessage" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
          {{ successMessage }}
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div class="relative group">
            <label for="nome" class="block text-gray-700 font-medium mb-2 text-sm">Nome completo</label>
            <div class="relative">
              <input
                v-model="formData.name"
                type="text"
                id="nome"
                placeholder="Seu nome"
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
            <label for="email" class="block text-gray-700 font-medium mb-2 text-sm">Email</label>
            <div class="relative">
              <input
                v-model="formData.email"
                type="email"
                id="email"
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
                v-model="formData.password"
                type="password"
                id="senha"
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

          <div class="relative group">
            <label for="confirmar-senha" class="block text-gray-700 font-medium mb-2 text-sm">Confirmar senha</label>
            <div class="relative">
              <input
                v-model="confirmPassword"
                type="password"
                id="confirmar-senha"
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
                   rounded-xl font-bold text-lg shadow-lg shadow-orange-400/30 mt-8
                   hover:shadow-2xl hover:shadow-orange-400/50 hover:scale-105
                   transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span class="relative flex items-center justify-center gap-2">
              {{ loading ? 'CADASTRANDO...' : 'CADASTRAR' }}
              <svg v-if="!loading" class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-gray-600">
            Já tem uma conta? 
            <a href="/login" class="text-orange-400 hover:text-orange-500 font-bold hover:underline transition-colors ml-1">
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsuariosStore } from '../stores/usuario';

const router = useRouter();
const usuariosStore = useUsuariosStore();

const formData = ref({
  name: '',
  email: '',
  password: '',
  role: 'Usuario'
});

const confirmPassword = ref('');
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

async function handleSubmit() {
  errorMessage.value = '';
  successMessage.value = '';

  // Validação de senhas
  if (formData.value.password !== confirmPassword.value) {
    errorMessage.value = 'As senhas não coincidem';
    return;
  }

  loading.value = true;

  const result = await usuariosStore.createUsuario(formData.value);

  loading.value = false;

  if (result.success) {
    successMessage.value = 'Conta criada com sucesso! Redirecionando...';
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  } else {
    errorMessage.value = result.error;
  }
}
</script>