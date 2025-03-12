import React from 'react'
import Stack from '@mui/material/Stack'
import TopBar from '@sales-monitor-frontend/components/layouts/TopBar'
import SideBar from '@sales-monitor-frontend/components/layouts/SideBar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

export const metadata = {
  title: 'Page Not Found!',
}

const NotFoundPage = () => {
  return (
    <Stack>
      {/* top bar */}
      <TopBar />

      {/* side bar and content */}
      <Stack direction="row">
        {/* side bar */}
        <SideBar />

        {/* content */}
        <Stack
          width={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'calc(100vh - 64px)'}
        >
          <Avatar
            sx={{ width: 'auto', height: '50%' }}
            alt="Page Not Found"
            src="/assets/images/not_found.svg"
          />

          <Typography variant="h4" align="center">
            Page Not Found!
          </Typography>
        </Stack>
      </Stack>
      {/* end side bar and content */}
    </Stack>
  )
}

export default NotFoundPage
