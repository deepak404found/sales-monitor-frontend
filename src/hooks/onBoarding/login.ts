import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MySwal } from '../../utils/helpers'
import { useApi } from '../api'
import { useAuth } from '../auth'

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

            if (res?.data?.user && res?.data?.access) {
              handleLogin(res?.data?.user, res?.data?.access)
              MySwal.fire({
                title: 'Login Successful',
                text: 'You have successfully logged in',
                icon: 'success',
              })
            }
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
  }, [handleSubmit, usersApiPath, handleLogin, getValues])

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
