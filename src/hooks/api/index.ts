import { AxiosRequestConfig } from 'axios'

export const useApi = () => {
  const basePath = '/api'
  const token =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('x-access-token')
      : null

  const authConfig: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const usersApiPath = `${basePath}/users`

  const productsApiPath = `${basePath}/products`

  return {
    basePath,
    authConfig,
    usersApiPath,
    productsApiPath,
  }
}
