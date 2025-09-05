<script setup>
import { useMainStore } from '@/stores/mainStore'
const store = useMainStore()
</script>
<template>
  <div v-if="store.currentUser" class="p-6 bg-white rounded-xl shadow-md">
    <div class="flex items-center space-x-4">
      <div class="flex-shrink-0">
        <img
          class="h-16 w-16 rounded-full object-cover"
          :src="store.currentUser.avatar"
          alt="Avatar de usuario"
        />
      </div>
      <div>
        <div class="text-2xl font-bold text-gray-900">{{ store.currentUser.nombre }}</div>
        <p class="text-gray-600">{{ store.currentUser.rol }} en {{ store.currentUser.sector }}</p>
      </div>
    </div>
    <div class="mt-4">
      <h4 class="font-semibold text-gray-800">Sobre mí:</h4>
      <p class="mt-1 text-gray-700 text-sm">
        {{ store.currentUser.bio || 'No hay información disponible.' }}
      </p>
      <h4 class="font-semibold text-gray-800 mt-4">Intereses:</h4>
      <p class="mt-1 text-gray-700 text-sm">{{ store.currentUser.intereses }}</p>
    </div>
  </div>
</template>
