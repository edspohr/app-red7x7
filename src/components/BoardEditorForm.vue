<script setup>
import { ref, watch } from 'vue'

// El componente recibe un anuncio para editar (puede ser nulo si es nuevo)
const props = defineProps({
  message: Object,
})

// El componente emite un evento 'save' con los datos del formulario
const emit = defineEmits(['save', 'cancel'])

// Variables reactivas locales para los campos del formulario
const title = ref('')
const body = ref('')
const pinned = ref(false)

// 'watch' observa si la prop 'message' cambia para rellenar el formulario
watch(
  () => props.message,
  (newMessage) => {
    if (newMessage) {
      title.value = newMessage.title || ''
      body.value = newMessage.body || ''
      pinned.value = newMessage.pinned || false
    } else {
      // Si no hay mensaje, resetea el formulario para crear uno nuevo
      title.value = ''
      body.value = ''
      pinned.value = false
    }
  },
  { immediate: true },
) // 'immediate' hace que se ejecute al crear el componente

function handleSubmit() {
  // Al guardar, emitimos el evento 'save' con los datos actuales
  emit('save', { title: title.value, body: body.value, pinned: pinned.value })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="p-6">
    <h3 class="text-xl font-bold mb-4">{{ message ? 'Editar' : 'Nuevo' }} Anuncio</h3>
    <div class="space-y-4">
      <input
        v-model="title"
        placeholder="Título del anuncio"
        class="w-full p-2 border rounded-lg bg-gray-50"
        required
      />
      <textarea
        v-model="body"
        placeholder="Contenido del anuncio..."
        rows="5"
        class="w-full p-2 border rounded-lg bg-gray-50"
        required
      ></textarea>
      <label class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
        <input type="checkbox" v-model="pinned" class="h-5 w-5 text-blue-600" />
        <span class="font-medium">Fijar este anuncio</span>
      </label>
    </div>
    <div class="flex justify-end gap-3 pt-6">
      <button
        @click="$emit('cancel')"
        type="button"
        class="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200 font-semibold"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        {{ message ? 'Guardar Cambios' : 'Publicar' }}
      </button>
    </div>
  </form>
</template>
