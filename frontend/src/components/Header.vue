<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUsuariosStore } from '../stores/usuario';

const menuOpen = ref(false);
const router = useRouter();
const usuariosStore = useUsuariosStore();

const currentUser = computed(() => usuariosStore.currentUser);
const isLoggedIn = computed(() => !!currentUser.value);

function handleLogout() {
  usuariosStore.logout();
  menuOpen.value = false;
  router.push('/');
}

// Debug: mostra no console o estado atual
onMounted(() => {
  console.log('Header montado - Usuário logado:', currentUser.value);
});
</script>

<template>
  <nav class="bg-orange-400 text-white p-5 shadow-lg">
    <div class="flex justify-between items-center max-w-6xl mx-auto">
      <div class="text-2xl font-bold">
        ProMaq Solutions
      </div>

      <button
        @click="menuOpen = !menuOpen"
        class="md:hidden focus:outline-none text-white hover:text-orange-100 transition-colors"
        aria-label="Abrir menu"
      >
        <svg
          v-if="!menuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Desktop Menu -->
      <div class="hidden md:flex space-x-8 items-center">
        <router-link to="/" class="text-white hover:text-orange-100 transition-colors font-medium">Home</router-link>
        <router-link to="/servicos" class="text-white hover:text-orange-100 transition-colors font-medium">Serviços</router-link>
        <router-link to="/contato" class="text-white hover:text-orange-100 transition-colors font-medium">Contato</router-link>
        
        <!-- Se estiver logado -->
        <template v-if="isLoggedIn">
          <router-link 
            to="/perfil"
            class="text-white font-semibold bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
          >
            Olá, {{ currentUser?.name }}
          </router-link>
          <button 
            @click="handleLogout"
            class="bg-white text-orange-400 hover:bg-orange-50 transition-colors font-medium px-4 py-2 rounded-lg cursor-pointer"
          >
            Sair
          </button>
        </template>
        
        <!-- Se NÃO estiver logado -->
        <router-link 
          v-else 
          to="/login" 
          class="text-white hover:text-orange-100 transition-colors font-medium"
        >
          Login
        </router-link>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="menuOpen"
      class="flex flex-col mt-4 space-y-4 md:hidden bg-white text-orange-400 p-5 rounded-xl shadow-xl"
    >
      <router-link @click="menuOpen = false" to="/" class="hover:text-orange-600 transition-colors font-medium py-2">Home</router-link>
      <router-link @click="menuOpen = false" to="/servicos" class="hover:text-orange-600 transition-colors font-medium py-2">Serviços</router-link>
      <router-link @click="menuOpen = false" to="/contato" class="hover:text-orange-600 transition-colors font-medium py-2">Contato</router-link>
      
      <!-- Se estiver logado (Mobile) -->
      <template v-if="isLoggedIn">
        <div class="border-t border-orange-200 pt-4">
          <router-link 
            to="/perfil"
            @click="menuOpen = false"
            class="block text-orange-600 font-semibold mb-3 bg-orange-50 px-3 py-2 rounded-lg hover:bg-orange-100 transition-colors"
          >
            Olá, {{ currentUser?.name }}
          </router-link>
          <button 
            @click="handleLogout"
            class="w-full bg-orange-400 text-white hover:bg-orange-500 transition-colors font-medium py-2 rounded-lg cursor-pointer"
          >
            Sair
          </button>
        </div>
      </template>
      
      <!-- Se NÃO estiver logado (Mobile) -->
      <router-link 
        v-else 
        @click="menuOpen = false" 
        to="/login" 
        class="hover:text-orange-600 transition-colors font-medium py-2"
      >
        Login
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
div[v-cloak] {
  display: none;
}
</style>