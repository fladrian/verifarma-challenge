<template>
  <header class="bg-background-secondary border-b border-gray-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-3 md:flex md:justify-between items-center h-16">
        <div class="flex items-center justify-start md:flex-none">
          <button
            v-if="showBackButton"
            @click="handleBack"
            class="flex items-center text-text-primary hover:text-accent transition-colors mr-4"
          >
            <Icon icon="mdi:arrow-left" class="w-5 h-5 mr-2" />
            <span class="hidden sm:inline">Volver</span>
          </button>
          <div class="hidden md:block p-1 rounded-lg bg-gradient-to-r from-primary via-accent to-primary">
            <img
              :src="logoImage"
              alt="Verifarma"
              class="h-12 rounded-md bg-background-secondary"
            />
          </div>
        </div>
        <div class="flex items-center justify-center md:hidden">
          <div class="p-1 rounded-lg bg-gradient-to-r from-primary via-accent to-primary">
            <img
              :src="logoImage"
              alt="Verifarma"
              class="h-12 rounded-md bg-background-secondary"
            />
          </div>
        </div>
        <div class="flex items-center justify-end space-x-4">
          <span v-if="authStore.user" class="hidden md:inline text-text-secondary">
            {{ authStore.user.name }}
          </span>
          <button
            @click="handleLogout"
            class="p-2 bg-background-tertiary text-text-primary rounded-button hover:bg-gray-700 transition-colors flex items-center justify-center"
            aria-label="Salir"
          >
            <Icon icon="mdi:logout" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@application/stores'
import { Button } from '@presentation/shared/components'
import { Icon } from '@iconify/vue'
import logoImage from '../../assets/verifarma-stream.png'

interface Props {
  title?: string
  showBackButton?: boolean
}

withDefaults(defineProps<Props>(), {
  showBackButton: false,
})

const router = useRouter()
const authStore = useAuthStore()

const handleBack = () => {
  router.back()
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

