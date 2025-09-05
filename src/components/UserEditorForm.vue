<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  user: Object,
})
const emit = defineEmits(['save', 'cancel'])

// Variables locales para los campos del formulario
const formData = ref({
  nombre: '',
  email: '',
  sector: '',
  estado: 'Activo',
})

// Rellena el formulario cuando el 'user' prop cambia
watch(
  () => props.user,
  (selectedUser) => {
    if (selectedUser) {
      formData.value = {
        nombre: selectedUser.nombre || '',
        email: selectedUser.email || '',
        sector: selectedUser.sector || '',
        estado: selectedUser.estado || 'Activo',
      }
    }
  },
  { immediate: true },
)

function handleSubmit() {
  emit('save', formData.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="p-6">
    <h3 class="text-xl font-bold mb-4">Editar Socio</h3>
    <div class="space-y-4">
      <label class="block">
        <span class="text-sm font-medium text-gray-700">Nombre Completo</span>
        <input
          v-model="formData.nombre"
          class="w-full mt-1 p-2 border rounded-lg bg-gray-50"
          required
        />
      </label>
      <label class="block">
        <span class="text-sm font-medium text-gray-700">Email</span>
        <input
          v-model="formData.email"
          type="email"
          class="w-full mt-1 p-2 border rounded-lg bg-gray-50"
          required
        />
      </label>
      <label class="block">
        <span class="text-sm font-medium text-gray-700">Sector</span>
        <input v-model="formData.sector" class="w-full mt-1 p-2 border rounded-lg bg-gray-50" />
      </label>
      <label class="block">
        <span class="text-sm font-medium text-gray-700">Estado</span>
        <select v-model="formData.estado" class="w-full mt-1 p-2 border rounded-lg bg-gray-50">
          <option>Activo</option>
          <option>Pendiente</option>
          <option>Inactivo</option>
        </select>
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
        Guardar Cambios
      </button>
    </div>
  </form>
</template>
