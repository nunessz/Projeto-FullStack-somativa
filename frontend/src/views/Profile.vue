<template>
  <section class="min-h-[calc(100vh-132px)] p-10 flex flex-col max-w-6xl mx-auto">
    <div class="mb-12 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-transparent rounded-2xl blur-2xl"></div>
      <div class="relative flex items-center gap-4">
        <h2 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
          Máquinas
        </h2>
        <span class="px-4 py-1.5 bg-orange-400 text-white rounded-full text-lg font-bold shadow-lg">
          {{ storeM.totalMaquinas }}
        </span>
      </div>
      <div class="relative h-1 w-32 bg-gradient-to-r from-orange-400 to-transparent rounded-full mt-3"></div>
    </div>

    <div class="group relative bg-gradient-to-br from-white to-orange-50/30 rounded-3xl border-2 border-orange-100 
                hover:border-orange-400 transition-all duration-500 p-8 mb-12 shadow-xl hover:shadow-2xl">
      <div class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent rounded-3xl 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <MaquinaForm
        v-if="!editingM"
        :submitting="storeM.loading"
        @submit="storeM.addMaquina"
        class="relative z-10"
      />
      
      <MaquinaForm
        v-else
        :initial="editingM"
        :submitting="storeM.loading"
        @submit="(payload) => { storeM.updateMaquina(editingM._id, payload); editingM=null; }"
        @cancel="cancelEditM"
        edit
        class="relative z-10"
      />
    </div>

    <div v-if="storeM.error" 
         class="bg-red-50 border-l-4 border-red-600 text-red-600 p-4 mb-8 rounded-r-xl shadow-md">
      <p class="font-semibold flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        {{ storeM.error }}
      </p>
    </div>

    <div class="bg-white rounded-3xl border-2 border-orange-100 shadow-2xl overflow-hidden 
                hover:shadow-orange-400/20 transition-shadow duration-500">
      <MaquinaList
        :maquina="storeM.maquinas"
        @edit="editM"
        @remove="storeM.removeMaquina"
      />
    </div>
  </section>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMaquinaStore } from "../stores/maquina";
import MaquinaForm from "../components/MaquinaForm.vue";
import MaquinaList from "../components/MaquinaList.vue";

const storeM = useMaquinaStore();
const editingM = ref(null);

onMounted(() => {
  storeM.fetchMaquina();
});

function editM(maquina) {
  editingM.value = { ...maquina };
}

function cancelEditM() {
  editingM.value = null;
}

</script>