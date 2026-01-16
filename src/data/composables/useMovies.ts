import { computed, unref, type Ref, type ComputedRef } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { MovieRepositoryImpl } from '../repositories'
import type { Movie, MoviesResponse } from '@core/entities'

const movieRepository = new MovieRepositoryImpl()

const ONE_HOUR = 60 * 60 * 1000 // 1 hour


export function useMovies(page: Ref<number>, year?: Ref<string>, type?: Ref<string>) {
  return useQuery<MoviesResponse>({
    queryKey: ['movies', page, year, type],
    queryFn: () => movieRepository.getMovies(page.value, year?.value, type?.value),
    enabled: computed(() => page.value > 0),
    staleTime: ONE_HOUR,
  })
}

export function useMovie(id: string | Ref<string> | ComputedRef<string>) {
  return useQuery<Movie>({
    queryKey: ['movie', id],
    queryFn: () => movieRepository.getMovie(unref(id)),
    enabled: computed(() => {
      const value = unref(id)
      return !!value && value.length > 0
    }),
    staleTime: ONE_HOUR,
  })
}

export function useFilterMovies(query: Ref<string>, page: Ref<number>, year?: Ref<string>, type?: Ref<string>) {
  return useQuery<MoviesResponse>({
    queryKey: ['movies', 'search', query, page, year, type],
    queryFn: () => movieRepository.filterMovies(query.value, page.value, year?.value, type?.value),
    enabled: computed(() => query.value.length > 0),
  })
}

