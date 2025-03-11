import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Avatar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
export interface IActions {
  label: string
  icon?: React.ReactNode | string
  onClick?: () => void
}

const useToggleActionMenu = () => {
  // variables for bulk action menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return {
    handleClick,
    handleClose,
    open,
    anchorEl
  }
}

export const ActionsCell = ({ actions }: { actions: IActions[] }) => {
  // variables for bulk action menu toggle
  const { anchorEl, open, handleClick, handleClose } = useToggleActionMenu()

  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent={'center'}>
      {/* action button */}
      <IconButton size="small" onClick={handleClick}>
        <MoreHorizIcon
          sx={{
            color: 'text.secondary'
          }}
        />
      </IconButton>
      {/* end of action button */}

      {/* bulk action menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        sx={{
          '& .MuiMenu-paper': {
            borderRadius: '10px'
          },
          '& .MuiMenuItem-root': {
            py: 1.5,
            gap: 1
          }
        }}
      >
        {actions.map((action, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => {
                handleClose()
                return action.onClick && action.onClick()
              }}
              sx={{
                color: 'text.secondary',
                '.MuiSvgIcon-root': {
                  height: 20,
                  width: 20
                }
              }}
            >
              {typeof action.icon === 'string' ? (
                <Avatar
                  src={action.icon}
                  alt={action.label}
                  sx={{
                    width: 20,
                    height: 20,
                    marginRight: 1
                  }}
                />
              ) : (
                action.icon
              )}
              <Typography variant={'body1'} fontWeight={'light'}>
                {action.label}
              </Typography>
            </MenuItem>
          )
        })}
      </Menu>
      {/* end of bulk action menu */}
    </Stack>
  )
}

export const DefaultActionsCell = ({
  options
}: {
  options: {
    action: 'edit' | 'delete' | 'details'
    onClick: () => void
    disabled?: boolean
    icon?: React.ReactNode | string
  }[]
}) => {
  // if icon is not provided, use default icons according to action
  options = options.map((option) => {
    if (!option.icon) {
      switch (option.action) {
        case 'edit':
          option.icon = <EditIcon sx={{ color: 'text.secondary' }} />
          break
        case 'delete':
          option.icon = <DeleteIcon sx={{ color: 'error.main' }} />
          break
        case 'details':
          option.icon = <VisibilityIcon sx={{ color: 'text.secondary' }} />
          break
      }
    }
    return option
  })

  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent={'center'} height={'100%'}>
      {/* action buttons */}
      {options.map((option, index) => {
        return (
          <IconButton
            key={index}
            size="small"
            onClick={() => {
              return option.onClick && option.onClick()
            }}
            disabled={option.disabled}
            sx={{ '&:disabled': { opacity: 0.5 } }}
          >
            {typeof option.icon === 'string' ? (
              <Avatar
                src={option.icon}
                alt={option.action}
                sx={{
                  width: 20,
                  height: 20,
                  marginRight: 1
                }}
              />
            ) : (
              option.icon
            )}
          </IconButton>
        )
      })}
      {/* end of action buttons */}
    </Stack>
  )
}

export default React.memo(ActionsCell)
