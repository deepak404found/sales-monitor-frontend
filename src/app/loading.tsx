import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

export default function LoadingPage() {
  return (
    <Stack
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
    >
      <CircularProgress />
    </Stack>
  )
}
