<script setup>
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/mainStore'

// Importamos los componentes que acabamos de crear
import UserProfile from '@/components/UserProfile.vue'
import UserMeetings from '@/components/UserMeetings.vue'
import BoardPublic from '@/components/BoardPublic.vue'

const store = useMainStore()
const router = useRouter()

function handleLogout() {
  store.logout()
  router.push('/') // Redirigimos al login
}
</script>
<template>
  <div class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow-md">
      <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1 class="text-xl font-bold text-blue-600">Red 7x7</h1>
        <button
          @click="handleLogout"
          class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>

    <main class="container mx-auto p-6">
      <UserProfile />
      <UserMeetings />
      <BoardPublic />
    </main>
  </div>
</template>
