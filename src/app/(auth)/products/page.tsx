'use client'
import RestoreIcon from '@mui/icons-material/Restore'
import { Button, debounce } from '@mui/material'
import Box from '@mui/material/Box'
import { green, red } from '@mui/material/colors'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { GridToolbarProps } from '@mui/x-data-grid'
import {
  CustomLoadingOverlay,
  CustomNoRowsOverlay,
  StyledDataGrid,
} from '@sales-monitor-frontend/components/dataGrid'
import { AvatarCell } from '@sales-monitor-frontend/components/dataGrid/cells/AvatarCell'
import TextCell from '@sales-monitor-frontend/components/dataGrid/cells/TextCell'
import { TableToolbarBase } from '@sales-monitor-frontend/components/dataGrid/TabletoolbarBase'
import CustomOutlinedInput from '@sales-monitor-frontend/components/inputs/InputField'
import { TablePagination } from '@sales-monitor-frontend/components/pagination'
import { CustomSelect } from '@sales-monitor-frontend/components/select'
import {
  ListProductsFilter,
  useProducts,
} from '@sales-monitor-frontend/hooks/products'
import dayjs from 'dayjs'
import React, { JSXElementConstructor, useMemo } from 'react'

export default function ProductsPage() {
  const {
    products,
    loading,
    listProducts,
    productsFilter,
    setProductsFilter,
    categories,
    listCategories,
    fetchPriceRange,
    // price_range,
  } = useProducts()

  React.useEffect(
    () => {
      listProducts(productsFilter)
      listCategories()
      fetchPriceRange()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const debouncedListProducts = useMemo(
    () =>
      debounce((newFilters: ListProductsFilter) => {
        listProducts(newFilters)
      }, 1000),
    [listProducts]
  )

  return (
    <Stack spacing={3}>
      {/* title */}
      <Typography variant="h4">Products</Typography>

      {/* filter bar */}
      <Stack
        direction={{
          xs: 'column',
          sm: 'column',
          md: 'row',
          lg: 'row',
        }}
        spacing={2}
        alignItems={{
          xs: 'flex-start',
          sm: 'flex-start',
          md: 'center',
          lg: 'center',
        }}
      >
        {/* category and sold select */}
        <Stack direction="row" spacing={2} alignItems="center">
          {/* select category */}
          <CustomSelect
            label="Category"
            options={[{ value: 'all', label: 'All' }].concat(
              categories?.map((category) => ({
                value: category,
                label: category,
              })) || []
            )}
            value={productsFilter.category || 'all'}
            setvalue={(value) => {
              setProductsFilter((prev) => {
                const newFilters = {
                  ...prev,
                  category: value === 'all' ? null : value,
                  offset: 0,
                } as ListProductsFilter

                listProducts(newFilters)
                return newFilters
              })
            }}
          />
          {/* end select category */}

          {/* sold select */}
          <CustomSelect
            label="Sold"
            options={[
              { value: 'all', label: 'All' },
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' },
            ]}
            value={
              productsFilter.is_sold ? productsFilter.is_sold.toString() : 'all'
            }
            setvalue={(value) => {
              setProductsFilter((prev) => {
                const newFilters = {
                  ...prev,
                  is_sold: value === 'all' ? null : value,
                  offset: 0,
                } as ListProductsFilter

                listProducts(newFilters)
                return newFilters
              })
            }}
          />
          {/* end sold select */}
        </Stack>
        {/* end category and sold select */}

        {/* price range */}
        <Stack direction={'row'} spacing={2} alignItems="center">
          <Typography>Price range</Typography>
          <CustomOutlinedInput
            type="number"
            placeholder="min"
            value={productsFilter.price_min || ''}
            onChange={(value) => {
              setProductsFilter((prev) => {
                const newFilters = {
                  ...prev,
                  price_min: value?.target?.value
                    ? parseFloat(value.target.value)
                    : null,
                  offset: 0,
                } as ListProductsFilter

                debouncedListProducts(newFilters)
                return newFilters
              })
            }}
            sx={{
              width: 80,
            }}
          />

          <Typography>to</Typography>

          <CustomOutlinedInput
            type="number"
            placeholder="max"
            value={productsFilter.price_max || ''}
            onChange={(value) => {
              setProductsFilter((prev) => {
                const newFilters = {
                  ...prev,
                  price_max: value?.target?.value
                    ? parseFloat(value.target.value)
                    : null,
                  offset: 0,
                } as ListProductsFilter

                debouncedListProducts(newFilters)
                return newFilters
              })
            }}
            sx={{
              width: 80,
            }}
          />
        </Stack>
        {/* end price range */}

        {/* reset button */}
        <Button
          variant="outlined"
          onClick={() => {
            setProductsFilter(() => {
              const newFilters = {
                offset: 0,
                limit: 10,
              } as ListProductsFilter

              listProducts(newFilters)
              return newFilters
            })
          }}
          startIcon={<RestoreIcon />}
        >
          Reset
        </Button>
        {/* end reset button */}
      </Stack>
      {/* end filter bar */}

      {/* products table */}
      <Box
        sx={{
          width: {
            xs: '94%',
            sm: '94%',
            md: '100%',
            lg: '100%',
          },
          height: '100%',
        }}
      >
        <StyledDataGrid
          loading={loading}
          // autoHeight
          disableRowSelectionOnClick
          pagination
          checkboxSelection={false}
          // onRowSelectionModelChange={(newSelection) => {
          //   setSelectedDomains(newSelection)
          // }}
          sortingMode="server"
          onSortModelChange={(model) => {
            // console.log(model)
            return model.length > 0
              ? setProductsFilter((prev) => {
                  const vars = {
                    ...prev,
                    sortBy: model[0].field as string,
                    sortOrder: model[0].sort,
                  }

                  listProducts(vars)
                  return vars
                })
              : setProductsFilter((prev) => {
                  const vars = {
                    ...prev,
                    sortOrder: 'asc',
                    sortBy: null,
                  } as ListProductsFilter

                  listProducts(vars)
                  return vars
                })
          }}
          paginationMode="server"
          rowCount={products?.count || 0}
          slots={{
            loadingOverlay: CustomLoadingOverlay,
            noRowsOverlay: () => <CustomNoRowsOverlay />,
            toolbar: CustomToolbar as JSXElementConstructor<unknown>,
            pagination: () => (
              <TablePagination
                page={productsFilter.offset / productsFilter.limit}
                pageSize={productsFilter.limit}
                total={products?.count || 0}
                showSize
                onPageChange={(page) =>
                  setProductsFilter((prev) => {
                    const total = products?.count || 0
                    const newPage = page * prev.limit
                    const newFilters = {
                      ...prev,
                      offset: newPage,
                    }
                    if (newPage < total && newPage >= 0) {
                      listProducts(newFilters)
                      return newFilters
                    }
                    return prev
                  })
                }
                onPageSizeChange={(pageSize) =>
                  setProductsFilter((prev) => {
                    const newFilters = {
                      ...prev,
                      offset: 0,
                      limit: pageSize,
                    }

                    listProducts(newFilters)
                    return newFilters
                  })
                }
              />
            ),
          }}
          slotProps={{
            toolbar: {
              listProducts,
              setProductsFilter,
            } as GridToolbarProps,
          }}
          rows={products?.results || []}
          getRowId={(row) => row?.id}
          columns={[
            {
              field: 'title',
              headerName: 'Title',
              flex: 0.6,
              minWidth: 150,
              renderCell: (params) => <TextCell text={params.value} />,
            },
            {
              field: 'price',
              headerName: 'Price',
              flex: 0.5,
              minWidth: 150,
              headerAlign: 'center',
              align: 'center',
              renderCell: (params) => (
                <TextCell
                  text={params.value}
                  stackSx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              ),
            },
            {
              field: 'description',
              headerName: 'Description',
              flex: 1.3,
              minWidth: 200,
              renderCell: (params) => <TextCell text={params.value} />,
            },
            {
              field: 'category',
              headerName: 'Category',
              flex: 0.5,
              minWidth: 140,
              headerAlign: 'center',
              align: 'center',
              renderCell: (params) => (
                <TextCell
                  text={params.value}
                  stackSx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              ),
            },
            {
              field: 'image',
              headerName: 'Image',
              flex: 0.2,
              minWidth: 120,
              // renderCell: (params) => <TextCell text={params.value} />,
              renderCell: (params) => (
                <AvatarCell
                  src={params.value}
                  tooltip={params.value}
                  fallbackSrc="https://www.svgrepo.com/show/422038/product.svg"
                  sx={{
                    border: 0,
                  }}
                />
              ),
            },
            {
              field: 'sold',
              headerName: 'Sold',
              flex: 0.4,
              minWidth: 140,
              headerAlign: 'center',
              align: 'center',
              valueGetter: (params: boolean) => (params ? 'Yes' : 'No'),
              renderCell: (params) => (
                <TextCell
                  text={params.value}
                  stackSx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  sx={{
                    color: params.value == 'Yes' ? green[900] : red[900],
                    bgcolor: params.value == 'Yes' ? green[100] : red[100],
                    px: 2,
                    py: 1,
                    minWidth: 30,
                    borderRadius: 2,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    fontSize: 14,
                  }}
                />
              ),
            },
            {
              field: 'is_sale',
              headerName: 'Is Sale',
              flex: 0.4,
              minWidth: 150,
              headerAlign: 'center',
              align: 'center',
              valueGetter: (params: boolean) => (params ? 'Yes' : 'No'),
              renderCell: (params) => (
                <TextCell
                  text={params.value}
                  stackSx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  sx={{
                    color: params.value == 'Yes' ? green[900] : red[900],
                    bgcolor: params.value == 'Yes' ? green[100] : red[100],
                    px: 2,
                    py: 1,
                    minWidth: 30,
                    borderRadius: 2,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    fontSize: 14,
                  }}
                />
              ),
            },
            {
              field: 'date_of_sale',
              headerName: 'Date Of Sale',
              flex: 0.5,
              minWidth: 200,
              renderCell: (params) => (
                <TextCell
                  text={
                    params.value ? dayjs(params.value).format('YYYY-MM-DD') : ''
                  }
                />
              ),
            },
          ]}
        />
      </Box>
      {/* end products table */}
    </Stack>
  )
}

const CustomToolbar = ({
  setProductsFilter,
  listProducts,
}: {
  setProductsFilter: React.Dispatch<React.SetStateAction<ListProductsFilter>>
  listProducts: (
    filter: ListProductsFilter,
    cb?: (data?: unknown) => void,
    errCb?: (err?: unknown) => void
  ) => Promise<void>
}) => {
  return (
    <TableToolbarBase
      actionAlign="start"
      onSearch={(e) => {
        setProductsFilter((prev) => {
          const newFilters = {
            ...prev,
            search: e.target.value,
          }
          listProducts(newFilters)
          return newFilters
        })
      }}
      exportProps={{
        showExportButton: true,
      }}
    />
  )
}
