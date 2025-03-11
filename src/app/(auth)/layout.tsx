import Stack from '@mui/material/Stack'
import SideBar from '@sales-monitor-frontend/components/layouts/SideBar'
import TopBar from '@sales-monitor-frontend/components/layouts/TopBar'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Stack>
      {/* top bar */}
      <TopBar />

      {/* side bar and content */}
      <Stack direction="row">
        {/* side bar */}
        <SideBar />

        {/* content */}
        <Stack p={2} width={'100%'}>
          {children}
        </Stack>
      </Stack>
      {/* end side bar and content */}
    </Stack>
  )
}
