import React from 'react'
// import { Fade, Modal } from '@mui/material'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { SxProps } from '@mui/material/styles'

export type ModalHeaderProps = {
  title?: string
  subtitle?: string
  icon?: React.ReactNode
  onClose?: () => void
}

export const StyledModal = ({
  open,
  handleClose,
  children,
  sx,
}: {
  open: boolean
  handleClose: () => void
  children: React.ReactNode
  sx?: SxProps
}) => (
  <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    onClose={() => {
      handleClose()
      // resetForm()
    }}
    closeAfterTransition
    sx={{
      border: 'none',
    }}
  >
    <Fade in={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          boxShadow: 24,
          borderRadius: 4,
          p: 3,
          backgroundColor: 'surface.page',
          ...sx,
        }}
      >
        {children}
      </Box>
    </Fade>
  </Modal>
)

export const ModalHeader = ({
  icon,
  title,
  subtitle,
  onClose,
}: ModalHeaderProps) => {
  return (
    <Stack gap={'8px'} p={'8px'}>
      {/* title and action */}
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        {/* icon and title */}
        <Stack direction={'row'} alignItems={'center'} gap={'8px'}>
          {/* icon */}
          {icon && icon}
          {/* end icon */}

          {/* title */}
          {title && <Typography variant={'h6'}>{title}</Typography>}
          {/* end title */}
        </Stack>
        {/* end icon and title */}

        {/* close */}
        {onClose && (
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        )}
        {/* end close */}
      </Stack>
      {/* end title and action */}

      {/* subtitle */}
      {subtitle && (
        <Typography
          variant={'body1'}
          fontWeight={'light'}
          color={'textDisabled'}
        >
          {subtitle}
        </Typography>
      )}
      {/* end subtitle */}
    </Stack>
  )
}

export default StyledModal
