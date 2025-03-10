// import { OutlinedInput,OutlinedInputProps } from '@mui/material'
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput'
import React, { forwardRef } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Fade, InputAdornment } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'

export interface CustomOutlinedInputProps extends OutlinedInputProps {
  helperText?: string
  success?: boolean
  label?: string
}

/**
 * CustomOutlinedInput
 * @description Custom input field with helper text
 *
 * @param props - all outlined input props with helper text and success
 *
 * @returns custom outlined input field
 *
 * @see https://mui.com/components/text-fields/#outlined-input
 */
const CustomOutlinedInput = forwardRef<
  HTMLInputElement,
  CustomOutlinedInputProps
>(({ helperText, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <Stack spacing={'8px'} width={props.fullWidth ? '100%' : 'auto'}>
      {/* label section */}
      {props?.label && (
        <Stack direction="row" gap={'8px'} aria-label="label">
          <Typography
            color={props.disabled ? 'grey.500' : 'grey.800'}
            variant="body1"
          >
            {props.label}
          </Typography>

          {props?.required && (
            <Typography color={'error.main'} variant={'body1'}>
              *
            </Typography>
          )}
        </Stack>
      )}
      {/* end label section */}

      {/* input field */}
      <OutlinedInput
        fullWidth
        required
        placeholder="Enter text"
        size="small"
        sx={{
          p: 0,
        }}
        {...props}
        ref={ref}
        label={undefined}
        type={
          props?.type === 'password'
            ? showPassword
              ? 'text'
              : 'password'
            : props?.type || 'text'
        }
        // for right icon
        endAdornment={
          props?.type === 'password' && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() =>
                  setShowPassword((prevShowPassword) => !prevShowPassword)
                }
                sx={{
                  pr: 1,
                }}
              >
                {showPassword ? (
                  <VisibilityIcon
                    sx={{
                      color: 'textActive',
                    }}
                  />
                ) : (
                  <VisibilityOffIcon
                    sx={{
                      color: 'textActive',
                    }}
                  />
                )}
              </IconButton>
            </InputAdornment>
          )
        }
      />

      {/* helper text */}
      <Fade in={!!helperText} timeout={500} unmountOnExit>
        <Typography
          variant="caption"
          color={props.success ? 'success.main' : 'error.main'}
        >
          {helperText}
        </Typography>
      </Fade>
    </Stack>
  )
})

CustomOutlinedInput.displayName = 'CustomOutlinedInput'

export default CustomOutlinedInput
