'use client'

import LoadingPage from '@sales-monitor-frontend/app/loading'
import { guestRoutes, useAuth } from '@sales-monitor-frontend/hooks/auth'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from '../../global/reducers/authReducer'

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(getAuth)
  const router = useRouter()
  const { checkAuth } = useAuth()
  const [loading, setLoading] = React.useState(false)
  // console.log('AuthProvider', pathname)

  useEffect(() => {
    checkAuth().then((authenticated) => {
      // console.log('authenticated', authenticated)

      // check if user is authenticated or valid guest route is accessed
      if (
        authenticated
          ? pathname === '/' || pathname === '/login'
          : !guestRoutes.includes(pathname)
      ) {
        router.replace(authenticated ? '/dashboard' : '/login')
        setLoading(false)
      }
    })
  }, [isAuthenticated, dispatch, pathname, checkAuth, router])

  return (
    <>
      {
        // show only onboarding page if not authenticated
        isAuthenticated || guestRoutes.includes(pathname) ? (
          loading ? (
            <LoadingPage />
          ) : (
            children
          )
        ) : (
          <LoadingPage />
        )
      }
    </>
  )
}

export default AuthProvider
