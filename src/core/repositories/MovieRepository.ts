import type { Movie, MoviesResponse } from '../entities/Movie'

export interface MovieRepository {
  searchMovies(query?: string, page?: number, year?: string, type?: string): Promise<MoviesResponse>
  getMovie(id: string): Promise<Movie>
}

