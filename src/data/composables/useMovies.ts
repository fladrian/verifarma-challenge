import { computed, ref, unref, type Ref, type ComputedRef } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { MovieRepositoryImpl } from '../repositories'
import type { Movie, MoviesResponse } from '@core/entities'

const movieRepository = new MovieRepositoryImpl()

const ONE_HOUR = 60 * 60 * 1000 // 1 hour


export function useMovies(
  query?: Ref<string> | string,
  page?: Ref<number>,
  year?: Ref<string>,
  type?: Ref<string>
) {
  const queryValue = computed(() => unref(query) || 'movie')
  const pageValue = page || ref(1)

  return useQuery<MoviesResponse>({
    queryKey: ['movies', queryValue, pageValue, year, type],
    queryFn: () => movieRepository.searchMovies(
      queryValue.value,
      unref(pageValue),
      year ? unref(year) : undefined,
      type ? unref(type) : undefined
    ),
    enabled: computed(() => {
      const q = queryValue.value
      const p = unref(pageValue)
      return !!q && q.length > 0 && p > 0
    }),
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

