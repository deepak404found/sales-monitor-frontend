'use client'
import { Slider } from '@mui/material'
import Box from '@mui/material/Box'
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
import React, { JSXElementConstructor } from 'react'

export default function ProductsPage() {
  const {
    products,
    loading,
    listProducts,
    productsFilter,
    setProductsFilter,
    categories,
    listCategories,
  } = useProducts()

  React.useEffect(
    () => {
      listProducts(productsFilter)
      listCategories()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // console.log(products)

  return (
    <Stack spacing={2}>
      {/* title */}
      <Typography variant="h4">Products</Typography>

      {/* filter bar */}
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

        {/* price range */}
        <Stack direction={'row'} spacing={2} alignItems="center">
          <Typography>Price range</Typography>
          {/* <Slider
            getAriaLabel={() => 'Price range'}
            valueLabelFormat={(value) => `$${value}`}
            value={
              productsFilter.price_min && productsFilter.price_max
                ? [productsFilter.price_min, productsFilter.price_max]
                : [0, 1200]
            }
            max={1200}
            min={0}
            step={10}
            onChange={(_, value) => {
              setProductsFilter((prev) => {
                const newFilters = {
                  ...prev,
                  price_min: Array.isArray(value) ? value[0] : 0,
                  price_max: Array.isArray(value) ? value[1] : 1200,
                  offset: 0,
                } as ListProductsFilter

                listProducts(newFilters)

                // debounce(() => {
                //                 return onSearch && onSearch(e)
                //               }, 1000)()

                // debounce(() => {
                //   listProducts(newFilters)
                // }, 1000)()
                return newFilters
              })
            }}
            getAriaValueText={(value) => `$${value}`}
            valueLabelDisplay="auto"
            disableSwap
          /> */}
          <CustomOutlinedInput
            type="number"
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

                listProducts(newFilters)
                return newFilters
              })
            }}
          />

          <CustomOutlinedInput
            type="number"
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

                listProducts(newFilters)
                return newFilters
              })
            }}
          />
        </Stack>
        {/* end price range */}

        {/* reset button */}
      </Stack>
      {/* end filter bar */}

      {/* products table */}
      <Box sx={{ width: '100%', height: '100%' }}>
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
              renderCell: (params) => <TextCell text={params.value} />,
            },
            {
              field: 'price',
              headerName: 'Price',
              flex: 0.5,
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
              renderCell: (params) => <TextCell text={params.value} />,
            },
            {
              field: 'category',
              headerName: 'Category',
              flex: 0.5,
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
              // renderCell: (params) => <TextCell text={params.value} />,
              renderCell: (params) => (
                <AvatarCell src={params.value} tooltip={params.value} />
              ),
            },
            {
              field: 'sold',
              headerName: 'Sold',
              flex: 0.4,
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
                    color: 'white',
                    bgcolor:
                      params.value == 'Yes' ? 'success.light' : 'error.light',
                    p: 1,
                    borderRadius: 2,
                  }}
                />
              ),
            },
            {
              field: 'is_sale',
              headerName: 'Is Sale',
              flex: 0.4,
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
                    color: 'white',
                    bgcolor:
                      params.value == 'Yes' ? 'success.light' : 'error.light',
                    p: 1,
                    borderRadius: 2,
                  }}
                />
              ),
            },
            {
              field: 'date_of_sale',
              headerName: 'Date Of Sale',
              flex: 0.5,
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
      actionAlign="end"
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
      // exportProps={{
      //   exporter(variables, columns) {
      //     console.log(variables, columns)
      //     return Promise.resolve([])
      //   },
      // }}
      refreshProps={{
        onRefresh: () => {
          setProductsFilter((prev) => {
            const newFilters = {
              ...prev,
            }
            listProducts(newFilters)
            return newFilters
          })
        },
        color: 'info',
      }}
    />
  )
}
