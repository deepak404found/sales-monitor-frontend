import React from 'react'
import StyledModal from './index'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Button, Divider } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

export const ConfirmationModal = ({
  title = 'Confirmation to proceed',
  subtitle = 'Are you sure you want to proceed?',
  open,
  handleClose,
  handleProceed,
  loading,
}: {
  open: boolean
  handleClose: () => void
  title?: string
  subtitle?: string
  handleProceed: () => void
  loading?: boolean
}) => {
  return (
    <StyledModal open={open} handleClose={handleClose}>
      {/* main stack */}
      <Stack gap={'20px'} maxWidth={500}>
        {/* header */}
        <Stack gap={'12px'}>
          <Typography variant="h5">{title}</Typography>
          <Divider
            sx={{
              backgroundColor: 'text.disabled',
              height: 1,
              width: '100%',
            }}
          />
          <Typography variant="body1" color={'text.inactive'}>
            {subtitle}
          </Typography>
        </Stack>
        {/* end header */}

        {/* action buttons */}
        <Stack
          direction={'row'}
          justifyContent={'flex-end'}
          alignItems={'center'}
          alignSelf={'flex-end'}
          gap={'16px'}
          width={'100%'}
        >
          {/* cancel button */}
          <Button
            color={'secondary'}
            variant={'outlined'}
            onClick={() => {
              handleClose()
            }}
          >
            Cancel
          </Button>
          {/* end cancel button */}

          {/* submit button */}
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={() => {
              handleProceed()
            }}
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            Proceed
          </Button>
          {/* end submit button */}
        </Stack>
        {/* end action buttons */}
      </Stack>
      {/* end of main stack */}
    </StyledModal>
  )
}

export default ConfirmationModal
