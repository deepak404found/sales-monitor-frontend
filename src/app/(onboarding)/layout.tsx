import { Stack, Typography } from '@mui/material'
import Image from 'next/image'

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        // bgcolor: green[100],
        bgcolor: 'primary.main',
      }}
    >
      {/* onboarding card */}
      <Stack
        sx={{
          maxWidth: 1000,
          width: '100%',
          borderRadius: '8px',
        }}
        direction={'row'}
      >
        {/* banner */}
        <Stack
          sx={{
            borderTopLeftRadius: '8px',
            borderBottomLeftRadius: '8px',
            width: '100%',
            height: '100%',
            bgcolor: 'primary.dark',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 550,
            px: '32px',
            zIndex: 1,
          }}
          spacing={4}
        >
          {/* logo */}
          <Image
            src={
              '/assets/images/sales-monitor.png'
              // '/assets/images/sales-monitor-vector.svg'
            }
            alt={'logo'}
            width={0}
            height={0}
            unoptimized
            style={{ width: 'auto', height: 350 }}
          />

          {/* subtitle */}
          {/* <Typography variant={'h6'} textAlign={'center'} color="grey.300">
            Welcome to the Sales Monitor
          </Typography> */}

          {/* title */}
          <Typography variant={'h5'} textAlign={'center'} color="grey.200">
            Welcome to the Sales Monitor
          </Typography>
        </Stack>
        {/* end banner */}

        {/* content */}
        <Stack
          sx={{
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px',
            width: '100%',
            bgcolor: 'grey.100',
            p: '32px',
          }}
          spacing={2}
        >
          {children}
        </Stack>
        {/* end content */}
      </Stack>
      {/* end onboarding card */}
    </Stack>
  )
}
