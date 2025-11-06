<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <div class="relative group">
      <label class="block text-gray-700 font-semibold mb-2 text-sm">Nome da Máquina</label>
      <div class="relative">
        <input
          v-model="state.name"
          placeholder="Ex: Torno CNC 3000"
          required
          class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl
                 focus:outline-none focus:border-orange-400 focus:bg-white
                 transition-all duration-300 group-hover:border-gray-300"
        />
        <div class="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 
                    scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
      </div>
    </div>

    <div class="relative group">
      <label class="block text-gray-700 font-semibold mb-2 text-sm">Tipo da Máquina</label>
      <div class="relative">
        <input
          v-model="state.type"
          placeholder="Ex: Torno, Fresadora, Prensa"
          required
          class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl
                 focus:outline-none focus:border-orange-400 focus:bg-white
                 transition-all duration-300 group-hover:border-gray-300"
        />
        <div class="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 
                    scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
      </div>
    </div>

    <div class="relative group">
      <label class="block text-gray-700 font-semibold mb-2 text-sm">Status</label>
      <div class="relative">
        <select
          v-model="state.status"
          required
          class="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl
                 focus:outline-none focus:border-orange-400 focus:bg-white
                 transition-all duration-300 group-hover:border-gray-300 appearance-none cursor-pointer"
        >
          <option value="" disabled>Selecione o status da máquina</option>
          <option value="Funcionando">✓ Funcionando</option>
          <option value="Parada">⊗ Parada</option>
          <option value="Em manutenção">⚙ Em manutenção</option>
        </select>
        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
        <div class="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 
                    scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
      </div>
    </div>

    <div class="flex gap-4 pt-4">
      <button
        :disabled="submitting"
        type="submit"
        class="group relative flex-1 py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white 
               rounded-xl font-bold text-lg shadow-lg shadow-orange-400/30
               hover:shadow-2xl hover:shadow-orange-400/50 hover:scale-105
               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
               transition-all duration-300 overflow-hidden"
      >
        <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <span class="relative flex items-center justify-center gap-2">
          {{ edit ? "Salvar Alterações" : "Adicionar Máquina" }}
          <svg v-if="!submitting" class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  :d="edit ? 'M5 13l4 4L19 7' : 'M12 4v16m8-8H4'"/>
          </svg>
          <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      </button>

      <button
        v-if="edit"
        type="button"
        @click="$emit('cancel')"
        class="group relative flex-1 py-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white 
               rounded-xl font-bold text-lg shadow-lg shadow-gray-400/30
               hover:shadow-2xl hover:shadow-gray-400/50 hover:scale-105
               transition-all duration-300 overflow-hidden"
      >
        <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <span class="relative flex items-center justify-center gap-2">
          Cancelar
          <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  initial: { type: Object, default: null },
  submitting: { type: Boolean, default: false },
  edit: { type: Boolean, default: false },
});
const emit = defineEmits(["submit", "cancel"]);

const state = reactive({
  name: "",
  type: "",
  status: "",
});

watch(
  () => props.initial,
  (val) => {
    if (val) {
      state.name = val.name || "";
      state.type = val.type || "";
      state.status = val.status || "";
    } else {
      state.name = "";
      state.type = "";
      state.status = "";
    }
  },
  { immediate: true }
);

function onSubmit() {
  emit("submit", {
    name: state.name,
    type: state.type,
    status: state.status,
  });
}
</script>