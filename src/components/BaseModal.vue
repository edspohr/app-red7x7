<script setup>
// defineProps y defineEmits son funciones de Vue para la comunicación entre componentes
// 'isOpen' es una propiedad (prop) para que el padre le diga al modal si debe mostrarse.
// 'close' es un evento que el modal "emite" para decirle al padre que quiere cerrarse.
defineProps({
  isOpen: Boolean,
})
const emit = defineEmits(['close'])
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div @click="emit('close')" class="absolute inset-0 bg-black bg-opacity-60"></div>

      <Transition name="zoom">
        <div
          v-if="isOpen"
          class="relative bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 my-8"
        >
          <slot></slot>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
/* Estilos para las animaciones de transición */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.zoom-enter-active,
.zoom-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
