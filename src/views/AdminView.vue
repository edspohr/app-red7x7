<script setup>
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/mainStore'

// Importa los componentes de admin
import AdminUserList from '@/components/AdminUserList.vue'
import AdminBoard from '@/components/AdminBoard.vue'
import AdminMeetings from '@/components/AdminMeetings.vue'
import AdminDirectory from '@/components/AdminDirectory.vue'

const store = useMainStore()
const router = useRouter()

function handleLogout() {
  store.logout()
  router.push('/')
}
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <header class="bg-white shadow-md">
      <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1 class="text-xl font-bold text-red-600">Panel de Administrador</h1>
        <button
          @click="handleLogout"
          class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>

    <main class="container mx-auto p-6">
      <AdminUserList />
      <AdminBoard />
      <AdminMeetings />
      <AdminDirectory />
    </main>
  </div>
</template>
