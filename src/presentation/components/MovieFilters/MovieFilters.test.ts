import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import MovieFilters from './MovieFilters.vue'
import { Input } from '@presentation/shared/components'

describe('MovieFilters', () => {
  const defaultProps = {
    searchQuery: '',
    yearFilter: '',
    typeFilter: '',
  }

  it('should render search input', () => {
    render(MovieFilters, {
      props: defaultProps,
      global: {
        components: {
          Input,
        },
      },
    })

    expect(screen.getByLabelText('Buscar por título')).toBeInTheDocument()
  })

  it('should render year input', () => {
    render(MovieFilters, {
      props: defaultProps,
      global: {
        components: {
          Input,
        },
      },
    })

    expect(screen.getByLabelText('Año')).toBeInTheDocument()
  })

  it('should render type filter buttons', () => {
    render(MovieFilters, {
      props: defaultProps,
      global: {
        components: {
          Input,
        },
      },
    })

    expect(screen.getByText('Todos')).toBeInTheDocument()
    expect(screen.getByText('Película')).toBeInTheDocument()
    expect(screen.getByText('Serie')).toBeInTheDocument()
  })

  it('should display initial search query value', () => {
    render(MovieFilters, {
      props: {
        ...defaultProps,
        searchQuery: 'Batman',
      },
      global: {
        components: {
          Input,
        },
      },
    })

    const searchInput = screen.getByLabelText('Buscar por título') as HTMLInputElement
    expect(searchInput).toBeInTheDocument()
    expect(searchInput.value).toBe('Batman')
  })

  it('should display initial year filter value', () => {
    render(MovieFilters, {
      props: {
        ...defaultProps,
        yearFilter: '2020',
      },
      global: {
        components: {
          Input,
        },
      },
    })

    const yearInput = screen.getByLabelText('Año') as HTMLInputElement
    expect(yearInput).toBeInTheDocument()
    expect(yearInput.value).toBe('2020')
  })

  it('should highlight selected type filter', () => {
    render(MovieFilters, {
      props: {
        ...defaultProps,
        typeFilter: 'movie',
      },
      global: {
        components: {
          Input,
        },
      },
    })

    const movieButton = screen.getByText('Película')
    expect(movieButton).toHaveClass('bg-primary', 'text-white')
  })

  it('should emit update:searchQuery when search input changes', async () => {
    const user = userEvent.setup()
    const { emitted } = render(MovieFilters, {
      props: defaultProps,
      global: {
        components: {
          Input,
        },
      },
    })

    const searchInput = screen.getByLabelText('Buscar por título')
    await user.clear(searchInput)
    await user.type(searchInput, 'Inception')

    // Wait for debounced emission (500ms delay)
    await waitFor(() => {
      expect(emitted()['update:searchQuery']).toBeTruthy()
    }, { timeout: 1000 })
    
    const lastEmission = emitted()['update:searchQuery'][emitted()['update:searchQuery'].length - 1]
    expect(lastEmission).toEqual(['Inception'])
  })

  it('should emit update:yearFilter and filterChange when year input changes', async () => {
    const user = userEvent.setup()
    const { emitted } = render(MovieFilters, {
      props: defaultProps,
      global: {
        components: {
          Input,
        },
      },
    })

    const yearInput = screen.getByLabelText('Año')
    await user.clear(yearInput)
    await user.type(yearInput, '2020')

    // Wait for debounced emission (500ms delay)
    await waitFor(() => {
      expect(emitted()['update:yearFilter']).toBeTruthy()
    }, { timeout: 1000 })
    
    const lastYearEmission = emitted()['update:yearFilter'][emitted()['update:yearFilter'].length - 1]
    expect(lastYearEmission).toEqual(['2020'])
    expect(emitted().filterChange).toBeTruthy()
  })

  it('should emit update:typeFilter and filterChange when type button is clicked', async () => {
    const user = userEvent.setup()
    const { emitted } = render(MovieFilters, {
      props: defaultProps,
      global: {
        components: {
          Input,
        },
      },
    })

    const movieButton = screen.getByText('Película')
    await user.click(movieButton)

    expect(emitted()['update:typeFilter']).toBeTruthy()
    expect(emitted()['update:typeFilter'][0]).toEqual(['movie'])
    expect(emitted().filterChange).toBeTruthy()
  })

  it('should update selected type filter when clicking different option', async () => {
    const user = userEvent.setup()
    const { emitted, rerender } = render(MovieFilters, {
      props: {
        ...defaultProps,
        typeFilter: 'movie',
      },
      global: {
        components: {
          Input,
        },
      },
    })

    const seriesButton = screen.getByText('Serie')
    await user.click(seriesButton)

    expect(emitted()['update:typeFilter']).toBeTruthy()
    expect(emitted()['update:typeFilter'][0]).toEqual(['series'])
    
    rerender({
      ...defaultProps,
      typeFilter: 'series',
    })

    expect(seriesButton).toHaveClass('bg-primary', 'text-white')
  })

  it('should sync with prop changes', async () => {
    const { rerender } = render(MovieFilters, {
      props: defaultProps,
      global: {
        components: {
          Input,
        },
      },
    })

    await rerender({
      searchQuery: 'New Search',
      yearFilter: '2021',
      typeFilter: 'series',
    })

    await waitFor(() => {
      const searchInput = screen.getByLabelText('Buscar por título') as HTMLInputElement
      const yearInput = screen.getByLabelText('Año') as HTMLInputElement
      
      expect(searchInput.value).toBe('New Search')
      expect(yearInput.value).toBe('2021')
    })
    
    const seriesButton = screen.getByText('Serie')
    expect(seriesButton).toHaveClass('bg-primary', 'text-white')
  })
})

