<script setup>
import { ref, computed } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import BaseModal from '@/components/BaseModal.vue'
import UserEditorForm from '@/components/UserEditorForm.vue' // 1. Importa el formulario

const store = useMainStore()

// --- Lógica del Modal ---
const isModalOpen = ref(false)
const editingUser = ref(null) // Contendrá el usuario a editar

function openEditor(user) {
  editingUser.value = user
  isModalOpen.value = true
}

function closeEditor() {
  isModalOpen.value = false
  editingUser.value = null
}

function handleSaveUser(userData) {
  const dataToSave = { ...userData, id: editingUser.value.id }
  store.updateUser(dataToSave)
  closeEditor()
}

const userList = computed(() => store.state.users.filter((u) => u.rol !== 'Administrador'))
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">Gestionar Socios</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="text-xs text-gray-800 uppercase bg-gray-50">
          <tr>
            <th class="p-3">Nombre</th>
            <th class="p-3">Email</th>
            <th class="p-3">Sector</th>
            <th class="p-3">Estado</th>
            <th class="p-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user.id" class="border-b hover:bg-gray-50">
            <td class="p-3 font-medium">{{ user.nombre }}</td>
            <td class="p-3 text-xs text-gray-600">{{ user.email }}</td>
            <td class="p-3">{{ user.sector }}</td>
            <td class="p-3">
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="{
                  'bg-green-100 text-green-800': user.estado === 'Activo',
                  'bg-yellow-100 text-yellow-800': user.estado === 'Pendiente',
                  'bg-red-100 text-red-800': user.estado === 'Inactivo',
                }"
                >{{ user.estado }}</span
              >
            </td>
            <td class="p-3 space-x-4 text-right">
              <button @click="openEditor(user)" class="text-blue-600 hover:underline">
                Editar
              </button>
              <button @click="store.toggleUserState(user.id)" class="text-gray-600 hover:underline">
                {{ user.estado === 'Activo' ? 'Desactivar' : 'Activar' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <BaseModal :isOpen="isModalOpen" @close="closeEditor">
    <UserEditorForm
      v-if="editingUser"
      :user="editingUser"
      @save="handleSaveUser"
      @cancel="closeEditor"
    />
  </BaseModal>
</template>
