import type { UserRepository } from '@core/repositories'
import type { LoginCredentials, LoginResponse, User } from '@core/entities'

export class UserRepositoryImpl implements UserRepository {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const dummyToken = `dummy_token_${Date.now()}_${Math.random().toString(36).substring(7)}`
    const dummyUser: User = {
      id: '1',
      email: credentials.email,
      name: credentials.email.split('@')[0] || 'Usuario',
    }

    const response: LoginResponse = {
      user: dummyUser,
      token: dummyToken,
    }

    localStorage.setItem('auth_token', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))

    return response
  }

  async logout(): Promise<void> {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }
}

