<template>
  <div class="overflow-hidden rounded-xl shadow-lg border border-gray-200">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gradient-to-r from-orange-400 to-orange-500">
          <th class="px-8 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
            Nome
          </th>
          <th class="px-8 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
            Tipo
          </th>
          <th class="px-8 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
            Status
          </th>
          <th class="px-8 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
            Ações
          </th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr
          v-for="u in maquina"
          :key="u._id"
          class="border-b border-gray-100 hover:bg-orange-50 transition-colors duration-200"
        >
          <td class="px-8 py-5 text-sm font-medium text-gray-900">
            {{ u.name }}
          </td>
          <td class="px-8 py-5 text-sm text-gray-700">
            {{ u.type }}
          </td>
          <td class="px-8 py-5 text-sm text-gray-700">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
              {{ u.status }}
            </span>
          </td>
          <td class="px-8 py-5">
            <div class="flex items-center gap-3">
              <button
                @click="$emit('edit', u)"
                class="inline-flex items-center justify-center bg-orange-400 hover:bg-orange-500 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                aria-label="Editar máquina"
              >
                Editar
              </button>
              <button
                @click="$emit('remove', u._id)"
                class="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                aria-label="Excluir máquina"
              >
                Excluir
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="maquina.length === 0">
          <td colspan="4" class="px-8 py-12 text-center">
            <div class="flex flex-col items-center justify-center">
              <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p class="text-gray-500 text-base font-medium">
                Nenhuma máquina cadastrada
              </p>
              <p class="text-gray-400 text-sm mt-1">
                Adicione uma máquina para começar
              </p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  maquina: { type: Array, default: () => [] }
});
const emit = defineEmits(["edit", "remove"]);
</script>