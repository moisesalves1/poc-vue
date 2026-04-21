export interface User {
  id: string
  name: string
  username?: string
  email: string
}

export interface CreateUserPayload {
  name: string
  email: string
}

export interface CreatedUser {
  id: string
  name: string
  email: string
}

export interface UpdateUserPayload {
  name: string
  email: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    },
    ...init
  })

  if (!response.ok) {
    throw new Error(`Erro ${response.status}: falha ao consumir ${path}`)
  }

  return (await response.json()) as T
}

export function getUsers(): Promise<User[]> {
  return request<User[]>('/users')
}

export function getUserById(userId: string): Promise<User> {
  return request<User>(`/users/${userId}`)
}

export function createUser(payload: CreateUserPayload): Promise<CreatedUser> {
  return request<CreatedUser>('/users', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export function updateUser(userId: string, payload: UpdateUserPayload): Promise<User> {
  return request<User>(`/users/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  })
}

export async function deleteUser(userId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error(`Erro ${response.status}: falha ao remover /users/${userId}`)
  }
}
