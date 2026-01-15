<template>
  <div
    class="group cursor-pointer"
    @click="handleClick"
  >
    <div class="aspect-[2/3] bg-background-secondary rounded-card overflow-hidden mb-2 shadow-card hover:shadow-card-hover transition-shadow relative">
      <img
        v-if="poster && poster !== 'N/A'"
        :src="poster"
        :alt="title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gray-800">
        <Icon icon="mdi:movie-open" class="w-16 h-16 text-text-muted" />
      </div>
      <div
        v-if="year"
        class="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded-button text-xs font-semibold"
      >
        {{ year }}
      </div>
    </div>
    <h3 class="text-sm font-medium text-text-primary line-clamp-2 group-hover:text-accent transition-colors">
      {{ title }}
    </h3>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
  title: string
  poster?: string
  year?: string
  imdbID: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [imdbID: string]
}>()

const handleClick = () => {
  const id = props.imdbID
  if (id) {
    emit('click', id)
  } else {
    console.error('MovieCard: imdbID is missing', props)
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

