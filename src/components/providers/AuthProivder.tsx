'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from '../../global/reducers/authReducer'
import { useAuth, guestRoutes } from '@sales-monitor-frontend/hooks/auth'
import LoadingPage from '@sales-monitor-frontend/app/loading'

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(getAuth)
  const router = useRouter()
  const { checkAuth, fetchTokenData } = useAuth()
  const [loading, setLoading] = React.useState(false)
  // console.log('AuthProvider', pathname)

  useEffect(() => {
    checkAuth().then((authenticated) => {
      // console.log('authenticated', authenticated)
      if (authenticated) {
        const tokenData = fetchTokenData()
        if (
          pathname === '/' ||
          pathname === '/login' ||
          pathname === `/${tokenData?.department}`
        ) {
          router.replace(`/${tokenData?.department}/dashboard`)
          // setLoading(false)
        }
        // add department to the every route
        if (!pathname.startsWith(`/${tokenData?.department}`)) {
          // remove the word beofre first slash
          const newPath = pathname.split('/').slice(2).join('/')
          router.replace(`/${tokenData?.department}/${newPath}`)
          // setLoading(false)
        }
      } else {
        // allow only guest routes
        if (!guestRoutes.includes(pathname)) {
          router.replace('/login')
        }
      }
      setLoading(false)
    })
  }, [isAuthenticated, dispatch, pathname, checkAuth, router, fetchTokenData])

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
