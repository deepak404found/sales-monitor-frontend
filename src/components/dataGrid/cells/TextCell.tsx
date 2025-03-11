// import { SxProps, Tooltip, Stack } from '@mui/material';
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import { SxProps } from '@mui/material/styles'
import React from 'react'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Stack from '@mui/material/Stack'

export const TextCell = ({
  text,
  color = 'textInactive',
  showCopyIcon = false,
  sx,
  stackSx,
}: {
  text?: string | number | null
  color?: string
  showCopyIcon?: boolean
  sx?: SxProps
  stackSx?: SxProps
}) => {
  // console.log('TextCell', text)
  const invalid = text === '' || text === undefined || text === null
  return (
    <Tooltip
      title={text}
      placement="top"
      arrow
      enterTouchDelay={0}
      leaveTouchDelay={5000}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={'space-between'}
        width={showCopyIcon ? '100%' : 'fir-content'}
        height="100%"
        sx={stackSx}
      >
        <Typography
          variant="body1"
          fontWeight={400}
          sx={{
            color: invalid ? 'text.disabled' : color,
            textAlign: invalid ? 'center' : 'left',
            maxWidth: '100%',
            ...sx,
          }}
          noWrap
        >
          {
            // text is '' show 'N/A'
            invalid ? 'N/A' : text
          }
        </Typography>

        {showCopyIcon && (
          <IconButton
            size="small"
            sx={{ color: 'textSecondary.active' }}
            onClick={() => {
              navigator.clipboard.writeText(text?.toString() || '')
            }}
          >
            <ContentCopyIcon fontSize="medium" />
          </IconButton>
        )}
      </Stack>
    </Tooltip>
  )
}

export default React.memo(TextCell)
