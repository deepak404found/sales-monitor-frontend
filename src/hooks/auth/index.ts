import { jwtDecode } from 'jwt-decode'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from '../../global/reducers/authReducer'
import { User } from '@sales-monitor-frontend/utils/types'

export const guestRoutes = ['/login', '/reset-password']

export type DecodedToken = {
  email?: string
  department?: string
  role?: string
}

/**
 *
 * @name isTokenExpiry
 *
 * @description This function is used to check if the token is expired before 5 minutes.
 *
 * @param token - The token to check if it is expired.
 *
 * @returns boolean
 *
 */
const isTokenExpiry = (token: string) => {
  const decodedToken = jwtDecode(token) as { exp: number }
  const currentTime = Date.now() / 1000 // to get in milliseconds
  return decodedToken.exp < currentTime + 300 // 5 minutes before expiry time
}

export const decodeToken = (token: string) => {
  const decodedToken = jwtDecode(token)
  return decodedToken
}

/**
 *
 * @name useAuth
 *
 * @description This hook is used to handle the authentication of the user.
 *
 * @member handleLogin - This function is used to login the user. (user: ServiceAccount, accessToken: string) => void
 * @member handleLogout - This function is used to logout the user. () => void
 * @member checkAuth - This function is used to check if the user is authenticated. () => boolean
 *
 */
export const useAuth = () => {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch()

  const handleLogin = useCallback(
    (user: User, accessToken: string) => {
      dispatch(login({ user, accessToken }))
    },
    [dispatch]
  )

  const handleLogout = useCallback(() => {
    dispatch(logout())
    // check if page is login
    if (pathname === '/login') return
    router.replace('/login')
  }, [dispatch, pathname, router])

  // this will make sure that the route is protected and the user is authenticated.
  const checkAuth = useCallback(async () => {
    // get token and user from localstorage
    const accessToken = localStorage.getItem('x-access-token')
    const user = localStorage.getItem('user')

    // if guestRoutes includes the pathname, ignore the checks
    if (guestRoutes.includes(pathname)) return accessToken ? true : false

    // if a token or user is not present in localstorage, logout
    if (!accessToken || !user) {
      handleLogout()
      return false
    }

    // if the token is expired, logout
    if (isTokenExpiry(accessToken)) {
      handleLogout()
      return false
    }

    // if the token is not expired, login
    handleLogin(JSON.parse(user), accessToken)
    return true
  }, [handleLogin, handleLogout, pathname])

  const fetchTokenData = useCallback(() => {
    const accessToken = localStorage.getItem('x-access-token')
    if (!accessToken) return
    const decodedToken = decodeToken(accessToken)
    console.log(decodedToken, 'decodedToken')
    // setDecodedToken(decodedToken as DecodedToken)
    return decodedToken as DecodedToken
  }, [])

  return {
    handleLogin,
    handleLogout,
    checkAuth,
    fetchTokenData,
  }
}
