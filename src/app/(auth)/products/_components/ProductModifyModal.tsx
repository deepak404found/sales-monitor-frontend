'use client'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import CustomOutlinedInput from '@sales-monitor-frontend/components/inputs/InputField'
import CustomDrawer from '@sales-monitor-frontend/components/modals/CustomDrawer'
import { CustomSelect } from '@sales-monitor-frontend/components/select'
import { useProduct, useProducts } from '@sales-monitor-frontend/hooks/products'
import { Product } from '@sales-monitor-frontend/utils/types'
import dayjs from 'dayjs'
import React from 'react'
import { Controller } from 'react-hook-form'

const ProductModifyModal = ({
  open,
  onClose,
  action,
  defaultValues,
}: {
  open: boolean
  onClose: () => void
  action: 'add' | 'edit'
  defaultValues?: Product
}) => {
  const { categories, listCategories } = useProducts()

  const {
    register,
    errors,
    addProduct,
    updateProduct,
    // deleteProduct,
    // setValue,
    reset,
    control,
  } = useProduct()

  const onSubmit = () => {
    if (action === 'add') {
      addProduct(() => {
        window.location.reload()
      })
    } else {
      updateProduct(defaultValues?.id || 0, () => {
        onClose()
      })
    }
  }

  React.useEffect(
    () => {
      listCategories()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // reset from if action is edit
  React.useEffect(() => {
    if (action === 'edit') {
      reset({
        title: defaultValues?.title,
        category: defaultValues?.category || '',
        description: defaultValues?.description,
        image: defaultValues?.image,
        price: defaultValues?.price,
        is_sale: defaultValues?.is_sale || false,
        sold: defaultValues?.sold || false,
        date_of_sale: defaultValues?.date_of_sale
          ? dayjs(defaultValues?.date_of_sale).format('YYYY-MM-DD')
          : undefined,
      })
    }
  }, [action, defaultValues, reset])

  return (
    <CustomDrawer
      open={open}
      toggleDrawer={onClose}
      headerProps={{
        title: action === 'add' ? 'Add Product' : 'Edit Product',
      }}
    >
      {/* wrapper */}
      <Stack
        sx={{
          minHeight: '80vh',
          justifyContent: 'space-between',
        }}
      >
        {/* form */}
        <Stack gap={'24px'}>
          {/* product title */}
          <CustomOutlinedInput
            label={'Product title'}
            defaultValue={defaultValues?.title}
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register('title', { required: 'This field is required' })}
          />

          {/* product description */}
          <CustomOutlinedInput
            label={'Product description'}
            defaultValue={defaultValues?.description}
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description', { required: 'This field is required' })}
          />

          {/* product price */}
          <CustomOutlinedInput
            label={'Product price'}
            defaultValue={defaultValues?.price}
            error={!!errors.price}
            helperText={errors.price?.message}
            type="number"
            {...register('price', { required: 'This field is required' })}
          />

          {/* product category */}
          <Controller
            name="category"
            control={control}
            defaultValue={defaultValues?.category}
            render={({ field }) => (
              <CustomSelect
                label="Category"
                options={[{ value: '', label: 'Select Category' }].concat(
                  categories?.map((category) => ({
                    value: category,
                    label: category,
                  })) || []
                )}
                value={field.value || ''}
                setvalue={(value) => {
                  field.onChange(value)
                }}
              />
            )}
          />
          {/* end select product category */}

          {/* product image */}
          <CustomOutlinedInput
            label={'Product image'}
            defaultValue={defaultValues?.image}
            error={!!errors.image}
            helperText={errors.image?.message}
            {...register('image', { required: 'This field is required' })}
          />

          {/* sold and is sale */}
          <Stack direction={'row'} gap={'16px'}>
            {/* is sale */}
            <Controller
              name="is_sale"
              control={control}
              defaultValue={defaultValues?.is_sale}
              render={({ field }) => (
                <CustomSelect
                  label="Is sale"
                  options={[
                    { value: true, label: 'Yes' },
                    { value: false, label: 'No' },
                  ]}
                  value={field.value || false}
                  setvalue={(value) => {
                    field.onChange(value)
                  }}
                />
              )}
            />
            {/* end is sale */}

            {/* sold */}
            <Controller
              name="sold"
              control={control}
              defaultValue={defaultValues?.sold}
              render={({ field }) => (
                <CustomSelect
                  label="Sold"
                  options={[
                    { value: true, label: 'Yes' },
                    { value: false, label: 'No' },
                  ]}
                  value={field.value || false}
                  setvalue={(value) => {
                    field.onChange(value)
                  }}
                />
              )}
            />
            {/* end sold */}
          </Stack>

          {/* product date of sale */}
          <CustomOutlinedInput
            label={'Date of sale'}
            defaultValue={defaultValues?.date_of_sale}
            error={!!errors.date_of_sale}
            helperText={errors.date_of_sale?.message}
            type="date"
            {...register('date_of_sale', {
              required: 'This field is required',
            })}
          />
          {/* end product date of sale */}
        </Stack>
        {/* end form */}

        {/* actions */}
        <Stack
          direction={'row'}
          justifyContent={'flex-end'}
          gap={'16px'}
          width={'100%'}
        >
          <Button color={'secondary'} onClick={onClose}>
            Cancel
          </Button>

          <Button variant={'contained'} color={'primary'} onClick={onSubmit}>
            {action === 'add' ? 'Add' : 'Save'}
          </Button>
        </Stack>
        {/* end actions */}
      </Stack>
      {/* end wrapper */}
    </CustomDrawer>
  )
}

export default React.memo(ProductModifyModal)
