<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <MovieFilters
        v-model:search-query="searchQuery"
        v-model:year-filter="yearFilter"
        v-model:type-filter="typeFilter"
        @filter-change="handleFilterChange"
      />

      <div v-if="isLoading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <MovieCardSkeleton v-for="n in 10" :key="n" />
      </div>

      <div v-else-if="error" class="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-button">
        {{ error }}
      </div>

      <div v-else-if="movies && movies.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <MovieCard
          v-for="movie in movies"
          :key="movie.imdbID"
          :title="movie.Title"
          :poster="movie.Poster"
          :year="movie.Year"
          :imdbID="movie.imdbID"
          @click="(id: string) => goToMovieDetail(id)"
        />
      </div>

      <div v-else class="text-center py-20">
        <Icon icon="mdi:movie-off" class="w-16 h-16 text-text-muted mx-auto mb-4" />
        <p class="text-text-secondary">No se encontraron películas</p>
      </div>

      <Pagination
        v-model:current-page="currentPage"
        :total-pages="totalPages"
        @change="changePage"
      />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMovies, useFilterMovies } from '@data/composables'
import type { MovieSearchResult } from '@core/entities'
import { MovieCardSkeleton, MovieCard, MovieFilters, Pagination } from '@presentation/components'
import { Icon } from '@iconify/vue'

const router = useRouter()

const currentPage = ref(1)
const searchQuery = ref('')
const yearFilter = ref('')
const typeFilter = ref('')

const {
  data: moviesData,
  isPending: moviesIsPending,
  error: moviesError,
} = useMovies(currentPage, yearFilter, typeFilter)

const {
  data: filterData,
  isPending: filterIsPending,
  error: filterError,
} = useFilterMovies(searchQuery, currentPage, yearFilter, typeFilter)

const hasSearch = computed(() => searchQuery.value.trim().length > 0)

const movies = computed<MovieSearchResult[]>(() => {
  const data = hasSearch.value ? filterData.value : moviesData.value
  return data?.results || []
})

const totalPages = computed(() => {
  const data = hasSearch.value ? filterData.value : moviesData.value
  return data?.totalPages ?? 0
})

const isLoading = computed(() => hasSearch.value ? filterIsPending.value : moviesIsPending.value)

const error = computed(() => {
  const err = hasSearch.value ? filterError.value : moviesError.value
  if (err) {
    return err instanceof Error ? err.message : String(err)
  }
  return null
})

watch([searchQuery, yearFilter, typeFilter], () => {
  currentPage.value = 1
})

const handleFilterChange = () => {
  currentPage.value = 1
}

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const goToMovieDetail = (imdbID: string) => {
  if (imdbID && imdbID !== 'undefined') {
    const path = `/movies/${imdbID}`
    router.push(path).catch((err) => {
      console.error('Router push error:', err)
    })
  } else {
    console.error('Invalid imdbID:', imdbID)
  }
}
</script>

