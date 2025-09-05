<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/stores/mainStore'

const store = useMainStore()

const sortedMessages = computed(() =>
  [...store.state.boardMessages].sort((a, b) => b.pinned - a.pinned || b.createdAt - a.createdAt),
)
</script>
<template>
  <div class="mt-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">Pizarrón de Anuncios</h3>
    <div v-if="sortedMessages.length > 0" class="space-y-4">
      <div
        v-for="msg in sortedMessages"
        :key="msg.id"
        class="p-4 border rounded-xl"
        :class="msg.pinned ? 'border-yellow-400 bg-yellow-50 shadow-md' : 'bg-white shadow-sm'"
      >
        <div class="flex justify-between items-center">
          <div class="font-semibold text-gray-800">
            <span v-if="msg.pinned">📌 </span>{{ msg.title }}
          </div>
          <div class="text-xs text-gray-500">
            {{ new Date(msg.createdAt).toLocaleDateString() }}
          </div>
        </div>
        <div class="mt-2 text-sm text-gray-700">{{ msg.body }}</div>
      </div>
    </div>
    <div v-else class="text-sm text-gray-500 p-4 text-center bg-gray-50 rounded-lg">
      No hay anuncios en el pizarrón.
    </div>
  </div>
</template>
