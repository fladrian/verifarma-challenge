import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import MovieCard from './MovieCard.vue'
import { Icon } from '@iconify/vue'

describe('MovieCard', () => {
  const defaultProps = {
    title: 'Test Movie',
    imdbID: 'tt1234567',
    poster: 'https://example.com/poster.jpg',
    year: '2023',
  }

  const renderOptions = {
    global: {
      components: {
        Icon,
      },
    },
  }

  it('should render movie title', () => {
    render(MovieCard, {
      props: defaultProps,
      ...renderOptions,
    })

    expect(screen.getByText('Test Movie')).toBeInTheDocument()
  })

  it('should render movie poster when provided', () => {
    render(MovieCard, {
      props: defaultProps,
      ...renderOptions,
    })

    const image = screen.getByAltText('Test Movie')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/poster.jpg')
  })

  it('should render placeholder icon when poster is N/A', () => {
    render(MovieCard, {
      props: {
        ...defaultProps,
        poster: 'N/A',
      },
      ...renderOptions,
    })

    const image = screen.queryByAltText('Test Movie')
    expect(image).not.toBeInTheDocument()
  })

  it('should render placeholder icon when poster is not provided', () => {
    render(MovieCard, {
      props: {
        title: 'Test Movie',
        imdbID: 'tt1234567',
      },
      ...renderOptions,
    })

    const image = screen.queryByAltText('Test Movie')
    expect(image).not.toBeInTheDocument()
  })

  it('should render year badge when year is provided', () => {
    render(MovieCard, {
      props: defaultProps,
      ...renderOptions,
    })

    expect(screen.getByText('2023')).toBeInTheDocument()
  })

  it('should not render year badge when year is not provided', () => {
    render(MovieCard, {
      props: {
        title: 'Test Movie',
        imdbID: 'tt1234567',
        poster: 'https://example.com/poster.jpg',
      },
      ...renderOptions,
    })

    expect(screen.queryByText('2023')).not.toBeInTheDocument()
  })

  it('should emit click event with imdbID when clicked', async () => {
    const user = userEvent.setup()
    const { emitted } = render(MovieCard, {
      props: defaultProps,
      ...renderOptions,
    })

    const card = screen.getByText('Test Movie').closest('div')
    if (card) {
      await user.click(card)
    }

    expect(emitted().click).toBeTruthy()
    expect(emitted().click[0]).toEqual(['tt1234567'])
  })

  it('should not emit click event when imdbID is missing', async () => {
    const user = userEvent.setup()
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    const { emitted } = render(MovieCard, {
      props: {
        title: 'Test Movie',
        imdbID: '',
        poster: 'https://example.com/poster.jpg',
      },
      ...renderOptions,
    })

    const card = screen.getByText('Test Movie').closest('div')
    if (card) {
      await user.click(card)
    }

    expect(emitted().click).toBeFalsy()
    expect(consoleErrorSpy).toHaveBeenCalled()
    
    consoleErrorSpy.mockRestore()
  })

  it('should have cursor-pointer class', () => {
    render(MovieCard, {
      props: defaultProps,
      ...renderOptions,
    })

    const card = screen.getByText('Test Movie').closest('div')
    expect(card).toHaveClass('cursor-pointer')
  })
})

