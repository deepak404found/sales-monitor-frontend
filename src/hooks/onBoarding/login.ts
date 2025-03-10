import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MySwal } from '../../utils/helpers'
import { decodeToken, useAuth } from '../auth'
import axios from 'axios'
import { useApi } from '../api'

const LoginForm = z.object({
  username: z.string().nonempty('Please enter a valid username'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export type LoginFormType = z.infer<typeof LoginForm>

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    getValues,
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginForm),
  })

  const { usersApiPath } = useApi()
  const { handleLogin } = useAuth()
  // Handle login
  const onLogin = useCallback(() => {
    handleSubmit(
      (data) => {
        // console.log(data)

        // Call login API
        axios
          .post(`${usersApiPath}/login/`, {
            username: data.username,
            password: data.password,
          })
          .then((res) => {
            // console.log(res)

            if (res?.data?.user && res?.data?.token) {
              const decoded = decodeToken(res?.data?.token)
              console.log(res?.data?.user, res?.data?.token, decoded)
              // handleLogin(res?.data?.user, res?.data?.token)
              MySwal.fire({
                title: 'Login Successful',
                text: 'You have successfully logged in',
                icon: 'success',
              })
            }

            window.location.href = `${res?.data?.user?.department}/dashboard`
          })
          .catch((err) => {
            console.log(err)
            MySwal.fire({
              title: 'Login Failed',
              text: 'Please check your credentials',
              icon: 'error',
            })
          })
      },
      (err) => {
        console.log(err, getValues())
        MySwal.fire({
          title: 'Invalid Input',
          text: 'Please check the input fields',
          icon: 'error',
        })
      }
    )()
  }, [usersApiPath, getValues, handleSubmit])

  return {
    register,
    errors,
    onLogin,
    reset,
    control,
    setValue,
    getValues,
  }
}
