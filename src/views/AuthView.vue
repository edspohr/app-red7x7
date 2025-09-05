<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/mainStore'

// --- Lógica del Componente ---
const store = useMainStore()
const router = useRouter()

// Variables reactivas para los campos del formulario de login
const loginEmail = ref('')
const loginPassword = ref('')
const errorMessage = ref(null)

// Variable para alternar entre la vista de login y registro
const showRegister = ref(false)

// Función que se ejecuta al enviar el formulario de login
function onLoginSubmit() {
  errorMessage.value = null // Limpiar errores previos
  const result = store.login(loginEmail.value, loginPassword.value)

  if (result.success) {
    // Si el login es exitoso, Vue Router nos redirige a la página correcta
    router.push(result.role === 'admin' ? '/admin' : '/dashboard')
  } else {
    // Si falla, mostramos el mensaje de error que nos da la tienda
    errorMessage.value = result.message
  }
}

// Aquí añadiremos la lógica para el registro más adelante
function onRegisterSubmit() {
  alert('¡Funcionalidad de registro pendiente!')
}
</script>

<template>
  <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-4">
      <div v-if="!showRegister">
        <form @submit.prevent="onLoginSubmit" class="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8">
          <div class="mb-6 text-center">
            <h1 class="text-2xl font-bold text-gray-800">Bienvenido a Red 7x7</h1>
            <p class="text-gray-500 text-sm mt-1">Inicia sesión para continuar</p>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="login-email"
              >Correo Electrónico</label
            >
            <input
              v-model="loginEmail"
              class="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="login-email"
              type="email"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="login-password"
              >Contraseña</label
            >
            <input
              v-model="loginPassword"
              class="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="login-password"
              type="password"
              required
            />
          </div>

          <p v-if="errorMessage" class="text-red-500 text-sm text-center mb-4">
            {{ errorMessage }}
          </p>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg w-full"
              type="submit"
            >
              Iniciar Sesión
            </button>
          </div>

          <p class="text-center text-gray-500 text-sm mt-6">
            ¿No tienes una cuenta?
            <button
              @click="showRegister = true"
              type="button"
              class="font-semibold text-blue-600 hover:text-blue-800"
            >
              Regístrate aquí
            </button>
          </p>
        </form>
      </div>

      <div v-else>
        <form
          @submit.prevent="onRegisterSubmit"
          class="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8"
        >
          <div class="mb-6 text-center">
            <h1 class="text-2xl font-bold text-gray-800">Crea tu Cuenta</h1>
            <p class="text-gray-500 text-sm mt-1">Únete a la red de colaboración</p>
          </div>

          <p class="text-center p-8">Formulario de registro pendiente.</p>

          <div class="flex items-center justify-between">
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg w-full"
              type="submit"
            >
              Registrarme
            </button>
          </div>

          <p class="text-center text-gray-500 text-sm mt-6">
            ¿Ya tienes una cuenta?
            <button
              @click="showRegister = false"
              type="button"
              class="font-semibold text-blue-600 hover:text-blue-800"
            >
              Inicia sesión
            </button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
