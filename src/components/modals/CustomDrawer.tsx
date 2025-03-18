import { Drawer } from '@mui/material'
import Stack from '@mui/material/Stack'
import { SxProps } from '@mui/material/styles'
import { TransitionProps } from '@mui/material/transitions/transition'
import React from 'react'
import { ModalHeader, ModalHeaderProps } from '.'

export const CustomDrawer = ({
  open,
  toggleDrawer,
  anchor = 'right',
  sx,
  duration,
  headerProps = {
    title: 'Title',
  },
  children,
}: {
  open: boolean
  toggleDrawer: () => void
  anchor?: 'left' | 'right' | 'top' | 'bottom'
  sx?: SxProps
  duration?: TransitionProps['timeout']
  children?: React.ReactNode
  headerProps?: ModalHeaderProps
}) => {
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={toggleDrawer}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundImage: 'none',
          backgroundColor: 'surface.page',
          p: '16px 24px',
          width: 472,
          flex: 1,
          gap: '24px',
          overflowY: 'scroll',
        },
        ...sx,
      }}
      // change duration of transition
      transitionDuration={duration}
    >
      {/* header and info */}
      <Stack
        // gap={'8px'}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'border.secondary',
          p: '8px',
        }}
      >
        {/* header */}
        {headerProps && (
          <ModalHeader
            title={headerProps.title}
            subtitle={headerProps.subtitle}
            icon={headerProps.icon}
            onClose={toggleDrawer}
          />
        )}
        {/* end header */}
      </Stack>
      {/* end of header and info */}

      {children}
      {/* end of wrapper */}
    </Drawer>
  )
}

export default CustomDrawer
