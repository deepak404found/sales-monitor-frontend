'use client'
import CustomOutlinedInput from '@sales-monitor-frontend/components/inputs/InputField'
import { useLogin } from '@sales-monitor-frontend/hooks/onBoarding/login'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { AnimationWrapper } from '@sales-monitor-frontend/components/providers/KeyFrameAnimations'
// import { useRouter } from 'next/navigation'

export default function LoginPage() {
  // const router = useRouter()
  const { errors, register, onLogin } = useLogin()

  return (
    <AnimationWrapper>
      <Stack spacing={2} justifyContent={'center'} height={'100%'} p={2}>
        {/* header */}
        <Stack spacing={1}>
          {/* title */}
          <Typography variant={'h4'}>Login in to your account</Typography>
          {/* subtitle */}
          <Typography variant={'body1'} color={'text.secondary'}>
            Please enter your credentials to proceed
          </Typography>
        </Stack>
        {/* end header */}

        {/* Form Section */}
        <Stack spacing={3}>
          {/* Username Field */}
          <CustomOutlinedInput
            fullWidth
            required
            type="text"
            label="Username"
            placeholder="Username"
            size="small"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          {/* Password Field */}
          <CustomOutlinedInput
            fullWidth
            required
            type="password"
            label="Password"
            placeholder="Password"
            size="small"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            name="submit"
            onClick={onLogin}
          >
            Log In
          </Button>
        </Stack>
        {/* end Form Section */}
      </Stack>
    </AnimationWrapper>
  )
}
