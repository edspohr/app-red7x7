<script setup>
import { ref, computed } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import BaseModal from '@/components/BaseModal.vue'
import BoardEditorForm from '@/components/BoardEditorForm.vue' // 1. Importa el formulario

const store = useMainStore()

// --- Lógica del Modal ---
const isModalOpen = ref(false)
const editingMessage = ref(null) // Contendrá el anuncio a editar, o null si es nuevo

function openEditor(message = null) {
  editingMessage.value = message
  isModalOpen.value = true
}

function closeEditor() {
  isModalOpen.value = false
  editingMessage.value = null // Limpiamos al cerrar
}

function handleSaveMessage(messageData) {
  const dataToSave = { ...messageData }
  if (editingMessage.value) {
    dataToSave.id = editingMessage.value.id // Añade el ID si estamos editando
  }
  store.saveBoardMessage(dataToSave)
  closeEditor() // Cierra el modal después de guardar
}

const sortedMessages = computed(() =>
  [...store.state.boardMessages].sort((a, b) => b.pinned - a.pinned || b.createdAt - a.createdAt),
)
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-6 mt-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-gray-800">Gestionar Anuncios</h3>
      <button
        @click="openEditor()"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
      >
        + Nuevo Anuncio
      </button>
    </div>

    <div class="space-y-4">
      <div
        v-for="msg in sortedMessages"
        :key="msg.id"
        class="p-4 border rounded-lg flex justify-between items-start"
        :class="msg.pinned ? 'bg-yellow-50 border-yellow-300' : ''"
      >
        <div>
          <div class="font-semibold"><span v-if="msg.pinned">📌 </span>{{ msg.title }}</div>
          <div class="text-sm text-gray-700 mt-1">{{ msg.body }}</div>
        </div>
        <div class="flex gap-4 text-sm flex-shrink-0 ml-4">
          <button @click="openEditor(msg)" class="text-blue-600 hover:underline">Editar</button>
          <button
            @click="store.togglePinBoardMessage(msg.id)"
            class="text-gray-700 hover:underline"
          >
            {{ msg.pinned ? 'Quitar pin' : 'Fijar' }}
          </button>
          <button @click="store.deleteBoardMessage(msg.id)" class="text-red-600 hover:underline">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>

  <BaseModal :isOpen="isModalOpen" @close="closeEditor">
    <BoardEditorForm :message="editingMessage" @save="handleSaveMessage" @cancel="closeEditor" />
  </BaseModal>
</template>
