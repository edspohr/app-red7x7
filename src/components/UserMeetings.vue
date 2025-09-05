<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/stores/mainStore'

const store = useMainStore()

// Creamos una lista computada que se actualiza sola
const myMeetings = computed(() => {
  if (!store.currentUser) return []
  return store.state.meetings
    .filter((m) => m.attendees.includes(store.currentUser.id))
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
})
</script>
<template>
  <div class="mt-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">Mis Reuniones Recientes</h3>
    <div v-if="myMeetings.length > 0" class="space-y-4">
      <div
        v-for="meeting in myMeetings"
        :key="meeting.id"
        class="p-4 border rounded-lg bg-white shadow-sm"
      >
        <h4 class="font-semibold text-lg text-gray-800">{{ meeting.nombre }}</h4>
        <div class="text-xs text-gray-500 mt-1">
          Fecha:
          {{
            new Date(meeting.fecha).toLocaleDateString('es-CL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}
        </div>
      </div>
    </div>
    <div v-else class="text-sm text-gray-500 p-4 text-center bg-gray-50 rounded-lg">
      Aún no has asistido a ninguna reunión.
    </div>
  </div>
</template>
