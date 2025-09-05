<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/mainStore'

const store = useMainStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function handleLogin() {
  errorMessage.value = ''
  isLoading.value = true

  // Usamos la acción de la tienda para el login
  const result = await store.login(email.value, password.value)

  if (result.success) {
    if (result.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }
  } else {
    errorMessage.value = result.message || 'Error al iniciar sesión. Verifica tus credenciales.'
  }
  isLoading.value = false
}

// Función para simular login con Google
function loginWithGoogle() {
  alert('Funcionalidad de Google Login pendiente.')
  // Aquí integrarías la lógica real de Firebase/Google OAuth
}

function openWhatsApp() {
  const phoneNumber = '56912345678' // <-- ¡IMPORTANTE! Reemplaza con el número real
  const message = '¡Hola! Me gustaría obtener más información sobre Red 7x7.'
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
}
</script>

<template>
  <div class="min-h-screen flex">
    <div
      class="relative hidden lg:flex w-1/2 items-center justify-center bg-gray-100 text-gray-800 p-12 overflow-hidden"
    >
      <div class="relative z-10 text-center">
        <div class="w-60 h-60 mx-auto mb-6 flex items-center justify-center animate-bounce-in">
          <img src="/logo.png" alt="Logo Red 7x7" class="w-60 h-60 object-contain" />
        </div>

        <p class="text-xl font-light leading-relaxed max-w-md mx-auto animate-fade-in-up delay-200">
          Conectando líderes y fomentando la innovación en el ecosistema emprendedor de alto
          impacto.
        </p>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 md:p-10 lg:p-16">
      <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-8 animate-fade-in">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900">Bienvenido de nuevo</h2>
          <p class="mt-2 text-sm text-gray-600">Inicia sesión en tu cuenta</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Correo Electrónico</label
            >
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="email"
                class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                v-model="password"
                class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
          </div>

          <p v-if="errorMessage" class="text-sm text-red-600 text-center">{{ errorMessage }}</p>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 disabled:bg-blue-400"
            >
              <span v-if="isLoading">Ingresando...</span>
              <span v-else>Iniciar Sesión</span>
            </button>
          </div>
        </form>

        <div class="relative mt-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">O continuar con</span>
          </div>
        </div>

        <div>
          <button
            @click="loginWithGoogle"
            type="button"
            class="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <img
              src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
              alt="Google logo"
              class="h-5 w-5 mr-2"
            />
            Iniciar sesión con Google
          </button>
        </div>

        <p class="mt-8 text-center text-sm text-gray-600">
          ¿No eres miembro?
          <a
            href="https://suscripcion-pat.virtualpos.cl/red-7x7/bd918bf5a5240564f601f37978834b82"
            class="font-medium text-blue-800 hover:text-blue-600"
          >
            Suscríbete aquí
          </a>
        </p>
      </div>
    </div>
    <button
      @click="openWhatsApp"
      class="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center z-50 transition-transform transform hover:scale-110"
    >
      <svg
        class="w-8 h-8"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.687-1.475L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.001.004l-1.043 3.803l3.827-1.038z"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
/* Las animaciones se mantienen igual */
.text-shadow-md {
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@keyframes bounce-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-bounce-in {
  animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.delay-200 {
  animation-delay: 0.2s;
}
</style>
