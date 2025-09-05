<script setup>
import { ref, computed } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import BaseModal from '@/components/BaseModal.vue' // Importamos el modal

const store = useMainStore()

// --- Lógica del Modal ---
const isModalOpen = ref(false)
const selectedMeeting = ref(null)
const summaryText = ref('')
const isLoadingSummary = ref(false)

function openSummaryEditor(meeting) {
  selectedMeeting.value = meeting
  summaryText.value = meeting.resumen || ''
  isModalOpen.value = true
}

function closeAndResetModal() {
  isModalOpen.value = false
  selectedMeeting.value = null
  summaryText.value = ''
}

function saveSummary() {
  store.updateMeetingSummary(selectedMeeting.value.id, summaryText.value)
  closeAndResetModal()
}

async function generateSummaryWithAI() {
  isLoadingSummary.value = true

  const attendees = selectedMeeting.value.attendees
    .map((id) => store.state.users.find((u) => u.id === id))
    .filter(Boolean)
  const attendeesInfo = attendees
    .map((a) => `- ${a.nombre}, ${a.rol} del sector ${a.sector}.`)
    .join('\n')
  const prompt = `Actúa como un asistente ejecutivo. Genera un resumen conciso y profesional para la reunión "${selectedMeeting.value.nombre}" con los asistentes:\n${attendeesInfo}\nGenera el resumen en un párrafo.`

  const generatedText = await store.callGemini(prompt)
  summaryText.value = generatedText
  isLoadingSummary.value = false
}

// Ordenamos las reuniones por fecha
const sortedMeetings = computed(() =>
  [...store.state.meetings].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)),
)
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-6 mt-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">Gestionar Reuniones</h3>
    <div class="space-y-3">
      <div
        v-for="meeting in sortedMeetings"
        :key="meeting.id"
        class="p-4 border rounded-lg flex justify-between items-center"
      >
        <div>
          <div class="font-semibold text-gray-800">{{ meeting.nombre }}</div>
          <div class="text-xs text-gray-500">
            Fecha: {{ new Date(meeting.fecha).toLocaleDateString('es-CL') }}
          </div>
        </div>
        <button
          @click="openSummaryEditor(meeting)"
          class="text-white px-4 py-2 rounded-lg text-sm font-semibold flex-shrink-0"
          :class="
            meeting.resumen
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90'
          "
        >
          {{ meeting.resumen ? 'Editar Resumen' : '✨ Generar Resumen' }}
        </button>
      </div>
    </div>
  </div>

  <BaseModal :isOpen="isModalOpen" @close="closeAndResetModal">
    <div v-if="selectedMeeting" class="p-6">
      <h3 class="text-xl font-bold mb-2">Editor de Resumen</h3>
      <p class="text-sm text-gray-600 mb-4">{{ selectedMeeting.nombre }}</p>

      <textarea
        v-model="summaryText"
        rows="10"
        class="w-full p-2 border rounded-lg bg-gray-50"
        placeholder="Genera un resumen con IA o escribe uno aquí..."
      ></textarea>

      <div v-if="isLoadingSummary" class="my-2 text-center text-gray-600">Generando resumen...</div>

      <div class="flex justify-between items-center mt-4">
        <button
          @click="generateSummaryWithAI"
          :disabled="isLoadingSummary"
          class="bg-gradient-to-r from-purple-500 to-indigo-600 hover:opacity-90 disabled:opacity-50 text-white px-3 py-2 rounded-lg text-sm font-semibold"
        >
          ✨ Generar con IA
        </button>
        <div>
          <button
            @click="closeAndResetModal"
            class="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200 font-semibold"
          >
            Cancelar
          </button>
          <button
            @click="saveSummary"
            class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold ml-2"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
