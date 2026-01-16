import { computed, unref, type Ref, type ComputedRef } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { MovieRepositoryImpl } from '../repositories'
import type { Movie, MoviesResponse } from '@core/entities'

const movieRepository = new MovieRepositoryImpl()


export function useMovies(page: Ref<number>, year?: Ref<string>, type?: Ref<string>) {
  return useQuery<MoviesResponse>({
    queryKey: ['movies', computed(() => page.value), computed(() => year?.value), computed(() => type?.value)],
    queryFn: () => movieRepository.getMovies(page.value, year?.value, type?.value),
  })
}

export function useMovie(id: string | Ref<string> | ComputedRef<string>) {
  return useQuery<Movie>({
    queryKey: ['movie', computed(() => unref(id))],
    queryFn: () => movieRepository.getMovie(unref(id)),
    enabled: computed(() => {
      const value = unref(id)
      return !!value && value.length > 0
    }),
  })
}

export function useFilterMovies(query: Ref<string>, page: Ref<number>, year?: Ref<string>, type?: Ref<string>) {
  return useQuery<MoviesResponse>({
    queryKey: ['movies', 'search', computed(() => query.value), computed(() => page.value), computed(() => year?.value), computed(() => type?.value)],
    queryFn: () => movieRepository.filterMovies(query.value, page.value, year?.value, type?.value),
    enabled: computed(() => query.value.length > 0),
  })
}

