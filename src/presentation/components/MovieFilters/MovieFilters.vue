<template>
  <div class="mb-8 space-y-4">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <Input
          id="title-search"
          v-model="localSearchQuery"
          label="Buscar por título"
          placeholder="Ej: Batman, Inception..."
          @update:model-value="handleSearchChange"
        />
      </div>

      <div class="w-full md:w-48">
        <Input
          id="year-filter"
          v-model="localYearFilter"
          label="Año"
          placeholder="Ej: 2020"
          @update:model-value="handleYearChange"
        />
      </div>

      <div class="w-full md:w-auto">
        <label class="block text-sm font-medium text-text-secondary mb-2">
          Tipo
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="option in typeOptions"
            :key="option.value"
            type="button"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-button transition-colors',
              localTypeFilter === option.value
                ? 'bg-primary text-white'
                : 'bg-background-secondary text-text-primary hover:bg-background-tertiary'
            ]"
            @click="handleTypeChange(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Input } from '@presentation/shared/components'

const typeOptions = [
  { value: '', label: 'Todos' },
  { value: 'movie', label: 'Película' },
  { value: 'series', label: 'Serie' },
]

interface Props {
  searchQuery: string
  yearFilter: string
  typeFilter: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:yearFilter': [value: string]
  'update:typeFilter': [value: string]
  filterChange: []
}>()

const localSearchQuery = ref(props.searchQuery)
const localYearFilter = ref(props.yearFilter)
const localTypeFilter = ref(props.typeFilter)

watch(() => props.searchQuery, (newVal) => {
  localSearchQuery.value = newVal
})

watch(() => props.yearFilter, (newVal) => {
  localYearFilter.value = newVal
})

watch(() => props.typeFilter, (newVal) => {
  localTypeFilter.value = newVal
})

const handleSearchChange = (value: string) => {
  localSearchQuery.value = value
  emit('update:searchQuery', value)
}

const handleYearChange = (value: string) => {
  localYearFilter.value = value
  emit('update:yearFilter', value)
  emit('filterChange')
}

const handleTypeChange = (value: string) => {
  localTypeFilter.value = value
  emit('update:typeFilter', value)
  emit('filterChange')
}
</script>

