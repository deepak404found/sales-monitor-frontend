'use client'
import { Drawer, List, ListItemButton, Typography } from '@mui/material'
import {
  appRoutes,
  sidebarWidth,
  topBarHeight,
} from '@sales-monitor-frontend/utils/helpers'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { IRoutesDetails } from '../../utils/types'

export const SideBar = () => {
  const [currentPath, setCurrentPath] = React.useState<string>('')
  const path = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    // find the current path on appRoutes
    setCurrentPath(appRoutes.find((route) => route.route === path)?.route || '')
  }, [path])

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          mt: `${topBarHeight}px`,
          width: sidebarWidth,
          boxSizing: 'border-box',
          py: 1,
        },
      }}
      open={true}
    >
      {/* routes */}
      <List>
        {appRoutes.map((route) => (
          <RouteBtn
            key={route.route}
            details={route}
            selected={currentPath === route.route}
            onClick={() => router.push(route.route)}
          />
        ))}
      </List>
      {/* end routes */}
    </Drawer>
  )
}

const RouteBtn = ({
  details,
  selected,
  onClick,
}: {
  details: IRoutesDetails
  selected: boolean
  onClick: () => void
}) => {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        color: selected ? 'white' : 'black',
        bgcolor: selected ? 'primary.light' : 'transparent',
        // borderStartStartRadius: 20,
        // borderEndStartRadius: 20,
        fontWeight: selected ? 'bold' : 'normal',
        '&:hover': {
          opacity: 0.8,
          bgcolor: selected ? 'primary.light' : 'grey.200',
        },
        gap: 2,
        alignItems: 'center',
        px: 4,
        transition: 'all 0.3s',
      }}
    >
      {details.icon}
      <Typography variant="body1">{details.label}</Typography>
    </ListItemButton>
  )
}

export default React.memo(SideBar)
