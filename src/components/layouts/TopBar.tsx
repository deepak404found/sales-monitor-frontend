'use client'
import LogoutIcon from '@mui/icons-material/Logout'
import { AppBar } from '@mui/material'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { getAuth } from '@sales-monitor-frontend/global/reducers/authReducer'
import { useAuth } from '@sales-monitor-frontend/hooks/auth'
import { topBarHeight } from '@sales-monitor-frontend/utils/helpers'
import React from 'react'
import { useSelector } from 'react-redux'

const TopBar = () => {
  const { user } = useSelector(getAuth)
  const { handleLogout } = useAuth()
  return (
    <AppBar
      position="sticky"
      sx={{
        px: 4,
        py: 1,
        height: topBarHeight,
        // zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'background.paper',
        color: 'grey.800',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: 2,
      }}
    >
      {/* wrapper */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* left section */}
        <Stack direction="row" spacing={2}>
          {/* title */}
          <Typography variant="h6">Sales Monitor</Typography>
        </Stack>
        {/* end left section */}

        {/* right section */}
        <Stack direction="row" spacing={2} alignItems="center">
          {/* user */}
          <Typography variant="body1">
            Hello, {user?.username || 'Guest'}
          </Typography>

          {/* logout */}
          <Button
            variant="text"
            startIcon={<LogoutIcon />}
            onClick={() => {
              handleLogout()
            }}
            color="inherit"
          >
            Logout
          </Button>
        </Stack>
        {/* end right section */}
      </Stack>
      {/* end wrapper */}
    </AppBar>
  )
}

export default React.memo(TopBar)
