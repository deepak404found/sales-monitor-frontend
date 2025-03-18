import {
  Fade,
  MenuItem,
  Select,
  SelectProps,
  Stack,
  Typography,
} from '@mui/material'

type CustomSelectProps = SelectProps & {
  /** lable location to display if not provided then it will not display
   *
   * - True - lable will be displayed inside the input
   * - False - lable will be displayed outside the input and above the input
   *
   */
  showlabelInsideInput?: boolean

  /** array of options to display in the select */
  options: { label: string; value: unknown }[]

  /** callback function to set the value of the select */
  setvalue?: (value: unknown) => void

  /** helper text to display with the select */
  helperText?: string

  /** success state of the select */
  success?: boolean
}

/**
 * CustomSelect
 * @description A custom select component to display options with label
 *
 * @param label - label of the select
 * @param options - array of options to display in the select. {@link CustomSelectProps.options}
 * @param setvalue - callback function to set the value of the select
 * @param props - all other props of the Select component
 *
 * @returns CustomSelect component
 *
 * @example
 * ```
 * <CustomSelect
        value={'hr'}
        variant={'outlined'}
        label={'Select Department'}
        options={[
          { label: 'HR', value: 'hr' },
          { label: 'Finance', value: 'finance' },
          { label: 'IT', value: 'it' },
        ]}
      />
      ```
 *
 * @author @deepak404found
 */
export const CustomSelect = ({
  showlabelInsideInput = true,
  size = 'small',
  options,
  ...props
}: Readonly<CustomSelectProps>) => {
  return (
    <Stack spacing={'8px'} width={props.fullWidth ? '100%' : 'auto'}>
      {/* label section */}
      {!showlabelInsideInput && (
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

      <Select
        {
          // exclude the label and options and setvalue from the props
          ...{
            ...props,
            label: undefined,
            options: undefined,
            setvalue: undefined,
          }
        }
        renderValue={(value) => {
          const selectedOption = options.find(
            (option) => option.value === value
          )

          return selectedOption && showlabelInsideInput
            ? `${props.label}: ${selectedOption.label}`
            : selectedOption?.label
        }}
        onChange={(e) => {
          // match with the value of the option
          const value = options.find(
            (option) => option.value === e.target.value
          )?.value

          // set value
          return props.setvalue && props.setvalue(value || '')
        }}
        size={size}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value as string}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {/* helper text */}
      <Fade in={!!props.helperText} timeout={500} unmountOnExit>
        <Typography
          variant="caption"
          color={props.success ? 'success.main' : 'error.main'}
        >
          {props.helperText}
        </Typography>
      </Fade>
    </Stack>
  )
}
