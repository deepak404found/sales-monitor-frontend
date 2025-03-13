'use client'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import { SxProps } from '@mui/material/styles'
import React from 'react'

export const AvatarCell = ({
  src,
  fallbackSrc,
  variant = 'circular',
  size = 'medium',
  tooltip,
  sx,
}: {
  src: string
  fallbackSrc?: string
  variant?: 'circular' | 'rounded' | 'square'
  size?: 'small' | 'medium'
  tooltip?: string
  sx?: SxProps
}) => {
  const [image, setImage] = React.useState(src)

  return (
    <Tooltip
      title={tooltip}
      placement="top"
      arrow
      enterTouchDelay={0}
      leaveTouchDelay={5000}
    >
      <Avatar
        src={image}
        sx={{
          width:
            size === 'small' ? '32px' : size === 'medium' ? '40px' : '56px',
          height:
            size === 'small' ? '32px' : size === 'medium' ? '40px' : '56px',
          borderWidth:
            size === 'small' ? '1px' : size === 'medium' ? '1.5px' : '2px',
          borderStyle: 'solid',
          borderColor: 'border.page',
          ...sx,
        }}
        variant={variant}
        onError={() => setImage(fallbackSrc || '')}
      />
    </Tooltip>
  )
}
