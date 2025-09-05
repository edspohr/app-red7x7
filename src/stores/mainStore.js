import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'red7x7_maqueta_v9_admin'

export const useMainStore = defineStore('main', () => {
  const state = ref({
    currentUserId: null,
    users: [
      {
        id: 1,
        nombre: 'Carlos Santana',
        email: 'carlos.s@example.com',
        password: '1234',
        sector: 'Fintech',
        rol: 'CEO y Fundador',
        estado: 'Activo',
        intereses: 'Inversión ángel, SaaS B2B, Blockchain',
        avatar: 'https://placehold.co/120x120/D1FAE5/10B981?text=CS',
        bio: 'Emprendedor en serie con más de 15 años de experiencia en el sector financiero. Apasionado por la tecnología y cómo puede resolver problemas reales. Busco activamente sinergias con otros sectores.',
      },
      {
        id: 2,
        nombre: 'Laura Gómez',
        email: 'laura.g@example.com',
        password: '1234',
        sector: 'EdTech',
        rol: 'Directora de Producto',
        estado: 'Activo',
        intereses: 'UX/UI, Inteligencia Artificial, Aprendizaje adaptativo',
        avatar: 'https://placehold.co/120x120/DBEAFE/3B82F6?text=LG',
        bio: 'Líder de producto con foco en crear experiencias educativas impactantes y accesibles para todos. Buscando siempre la próxima innovación en EdTech.',
      },
      {
        id: 3,
        nombre: 'Pedro Ramos',
        email: 'pedro.r@example.com',
        password: '1234',
        sector: 'AgroTech',
        rol: 'Fundador y CEO',
        estado: 'Pendiente',
        intereses: 'IoT, Drones, Sostenibilidad',
        avatar: 'https://placehold.co/120x120/FEF3C7/F59E0B?text=PR',
        bio: 'Ingeniero agrónomo convertido en emprendedor. Mi misión es optimizar el uso de recursos en el campo a través de la tecnología.',
      },
      {
        id: 4,
        nombre: 'Ana Torres',
        email: 'ana.t@example.com',
        password: '1234',
        sector: 'HealthTech',
        rol: 'Investigadora Principal',
        estado: 'Activo',
        intereses: 'Biotech, Data Science, Genómica',
        avatar: 'https://placehold.co/120x120/FCE7F3/EC4899?text=AT',
        bio: 'Científica dedicada a encontrar soluciones tecnológicas para los desafíos de la salud moderna. Abierta a colaboraciones interdisciplinarias.',
      },
      {
        id: 5,
        nombre: 'Admin',
        email: 'admin@red7x7.cl',
        password: 'admin',
        rol: 'Administrador',
        estado: 'Activo',
        intereses: 'Gestión de Plataformas',
        avatar: 'https://placehold.co/120x120/E0E7FF/4F46E5?text=A',
        bio: 'Administrador de la plataforma Red 7x7.',
      },
    ],
    boardMessages: [],
    meetings: [],
  })

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.value))
  }

  function login(email, password) {
    // ... tu lógica de login ...
    if (email === 'admin@red7x7.cl' && password === 'admin') {
      state.value.currentUserId = 'admin'
      saveState()
      return { success: true, role: 'admin' }
    }
    const user = state.value.users.find((u) => u.email === email && u.password === password)
    if (user && user.estado === 'Activo') {
      state.value.currentUserId = user.id
      saveState()
      return { success: true, role: 'user' }
    } else if (user && user.estado !== 'Activo') {
      return { success: false, message: 'Tu cuenta está pendiente de activación.' }
    } else {
      return { success: false, message: 'Email o contraseña incorrectos.' }
    }
  }

  function logout() {
    state.value.currentUserId = null
    saveState()
  }

  function saveBoardMessage(messageData) {
    if (messageData.id) {
      // Si el mensaje ya tiene un ID, es una actualización
      const index = state.value.boardMessages.findIndex((m) => m.id === messageData.id)
      if (index !== -1) {
        state.value.boardMessages[index] = { ...state.value.boardMessages[index], ...messageData }
      }
    } else {
      // Si no tiene ID, es uno nuevo
      const newMsg = {
        id: 'm' + Date.now(),
        createdAt: Date.now(),
        ...messageData,
      }
      state.value.boardMessages.push(newMsg)
    }
    saveState()
  }

  function deleteBoardMessage(messageId) {
    state.value.boardMessages = state.value.boardMessages.filter((m) => m.id !== messageId)
    saveState()
  }

  function togglePinBoardMessage(messageId) {
    const msg = state.value.boardMessages.find((m) => m.id === messageId)
    if (msg) {
      msg.pinned = !msg.pinned
      saveState()
    }
  }

  function updateMeetingSummary(meetingId, newSummary) {
    const meeting = state.value.meetings.find((m) => m.id === meetingId)
    if (meeting) {
      meeting.resumen = newSummary
      saveState()
    }
  }

  function toggleUserState(userId) {
    const user = state.value.users.find((u) => u.id === userId)
    if (user) {
      user.estado = user.estado === 'Activo' ? 'Inactivo' : 'Activo'
      saveState() // Guardamos el cambio en localStorage
    }
  }

  function updateUser(userData) {
    const index = state.value.users.findIndex((u) => u.id === userData.id)
    if (index !== -1) {
      // Fusionamos los datos antiguos con los nuevos
      state.value.users[index] = { ...state.value.users[index], ...userData }
      saveState()
    }
  }

  async function callGemini(prompt) {
    console.log('--- PROMPT A GEMINI (SIMULADO) ---')
    console.log(prompt)
    console.log('---------------------------------')

    // Simula una espera de 1.5 segundos
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (prompt.includes('resumen conciso y profesional')) {
      return `Se llevó a cabo una productiva sesión de networking centrada en el tema de la reunión. Los participantes exploraron diversas sinergias y oportunidades de colaboración. Se destacaron los puntos de interés común y se acordó dar seguimiento a las conversaciones más prometedoras para materializar posibles proyectos conjuntos. El ambiente fue propicio para el intercambio de ideas y el fortalecimiento de la red.`
    }
    // ... (puedes añadir las otras respuestas simuladas si quieres)
    return 'Respuesta simulada de Gemini.'
  }

  const currentUser = computed(() => {
    // ... tu lógica de currentUser ...
    if (!state.value.currentUserId) return null
    if (state.value.currentUserId === 'admin') {
      return { id: 'admin', nombre: 'Administrador', rol: 'Administrador' }
    }
    return state.value.users.find((u) => u.id === state.value.currentUserId)
  })

  function deepMerge(target, source) {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        target[key] = deepMerge(target[key] || {}, source[key])
      } else {
        target[key] = source[key]
      }
    }
    return target
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const loaded = JSON.parse(raw)
      // Mergea el estado inicial con el cargado
      state.value = { ...state.value, ...loaded }
    }
  } catch (e) {
    console.warn('No se pudo cargar el estado', e)
  }

  // =======================================================
  // 2. AQUÍ LA AÑADIMOS AL RETURN
  // =======================================================
  return {
    state,
    login,
    logout,
    currentUser,
    toggleUserState,
    saveBoardMessage,
    deleteBoardMessage,
    togglePinBoardMessage,
    updateMeetingSummary,
    callGemini,
    updateUser,
    deepMerge,
  }
})
