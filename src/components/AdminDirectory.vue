<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/stores/mainStore'

const store = useMainStore()

// Obtenemos la lista de usuarios, excluyendo al administrador
const members = computed(() => store.state.users.filter((u) => u.rol !== 'Administrador'))
</script>
<template>
  <div class="mt-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">Directorio de Socios</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="user in members"
        :key="user.id"
        class="p-4 border rounded-xl bg-white shadow-md flex items-center gap-4"
      >
        <img
          :src="user.avatar"
          class="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-gray-200"
        />
        <div class="flex-grow">
          <div class="font-bold text-lg text-gray-900">{{ user.nombre }}</div>
          <div class="text-xs text-gray-500 uppercase font-semibold">{{ user.rol }}</div>
          <div class="text-sm text-blue-600 font-semibold mt-1">{{ user.sector }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
