'use client'
import {
  Drawer,
  List,
  ListItemButton,
  Typography,
  useTheme,
} from '@mui/material'
import {
  appRoutes,
  sidebarWidth,
  topBarHeight,
} from '@sales-monitor-frontend/utils/helpers'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { IRoutesDetails } from '../../utils/types'
import { blue } from '@mui/material/colors'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectLayout,
  toggleSidebar,
} from '@sales-monitor-frontend/global/reducers/layouts'

export const SideBar = () => {
  const [currentPath, setCurrentPath] = React.useState<string>('')
  const path = usePathname()
  const router = useRouter()
  const layoutState = useSelector(selectLayout)
  const dispatch = useDispatch()
  const theme = useTheme()
  const width = window ? window.innerWidth : 0

  React.useEffect(() => {
    // find the current path on appRoutes
    setCurrentPath(appRoutes.find((route) => route.route === path)?.route || '')
  }, [path])

  console.log('currentPath', layoutState)

  return (
    <Drawer
      variant={theme.breakpoints.values.md > width ? 'temporary' : 'permanent'}
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          // paddingTop: topBarHeight,
          width: sidebarWidth,
          boxSizing: 'border-box',
          py: `${topBarHeight}px`,
        },
        zIndex: {
          sm: theme.zIndex.drawer + 1,
          md: 1,
          lg: 1,
        },
      }}
      open={layoutState.sidebarOpen}
      onClose={() => dispatch(toggleSidebar())}
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
        color: selected ? blue[800] : 'black',
        bgcolor: selected ? blue[50] : 'transparent',
        // borderStartStartRadius: 20,
        // borderEndStartRadius: 20,
        fontWeight: selected ? 'bold' : 'normal',
        '&:hover': {
          opacity: 0.8,
          bgcolor: selected ? blue[50] : 'grey.100',
        },
        gap: 2,
        alignItems: 'center',
        px: 4,
        py: 1.5,
        transition: 'all 0.3s',
      }}
    >
      {details.icon}
      <Typography variant="body1">{details.label}</Typography>
    </ListItemButton>
  )
}

export default React.memo(SideBar)
