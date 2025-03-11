import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
} from '@mui/x-data-grid'
import React from 'react'
// import { ExportModal, useToggleExportModal } from '../modals/ExportModal'
import { debounce } from '../../utils/helpers'
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined'
import RefreshIcon from '@mui/icons-material/Refresh'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import CustomOutlinedInput from '../inputs/InputField'
import { TablePagination } from '../pagination'
import DeleteIcon from '@mui/icons-material/Delete'

/**
 * @description TableToolbarBaseProps is an interface that defines the props of the TableToolbarBase component
 *
 * - Parameters of TableToolbarBaseProps:
 *
 * @param showColumnsButton is a boolean that represents the visibility of the columns button
 * @param showExportButton is a boolean that represents the visibility of the export button
 * @param exportVars is an object that represents the variables to be exported
 * @param exporter is a function that represents the export function to export the data from the table
 * @param bulkActions is an array of {@link IBulkActions} objects for bulk actions
 * @param onSearch is a function that represents the search event
 * @param onRefresh is a function that represents the refresh event
 * @param paginationProps is an object of pagination properties
 **/
interface TableToolbarBaseProps {
  /**
   * @description show/hide the columns button
   * @default default value is true
   * @optional if not provided, it will be true
   **/
  showColumnsButton?: boolean

  /**
   * @description function to handle the search event
   * @optional if not provided, it will be an empty function and the search bar will not be shown
   * @param e is a React.ChangeEvent<HTMLInputElement>
   **/
  onSearch?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void

  /**
   * @description export properties object to handle the export event and export the data from the table
   * @optional if not provided, it will be an empty object and the export button will not be shown
   **/
  exportProps?: {
    /**
     * @description object of variables to be exported
     * @optional if not provided, it will be empty object
     **/
    exportVars?: unknown

    /**
     * @description export function to export the data from the table
     * @optional if not provided, it will be a function that returns an empty array
     * @param variables is an object
     * @param columns is an array of strings
     * @returns a promise
     **/
    exporter?: (variables: unknown, columns: string[]) => Promise<unknown[]>

    /**
     * @description color of the export button
     * @default default value is 'secondary'
     * @optional if not provided, it will be 'secondary'
     **/
    color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'

    /**
     * @description variant of the export button
     * @default default value is 'outlined'
     * @optional if not provided, it will be 'outlined'
     * @see {@link Button}
     **/
    btnVariant?: 'text' | 'outlined' | 'contained'

    /**
     * @description icon of the export button
     * @optional if not provided, it will be an empty object and the export button will not have an icon
     **/
    icon?: React.ReactNode
  }

  /**
   * @description object of refresh properties
   * @optional if not provided, it will be an empty object and the refresh button will not be shown
   **/
  refreshProps?: {
    /**
     * @description function to handle the refresh event
     * @optional if not provided, it will be an empty function and the refresh button will not be shown
     **/
    onRefresh?: () => void

    /**
     * @description color of the refresh button
     * @default default value is 'secondary'
     * @optional if not provided, it will be 'secondary'
     **/
    color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'

    /**
     * @description variant of the refresh button
     * @default default value is 'outlined'
     * @optional if not provided, it will be 'outlined'
     * @see {@link Button}
     **/
    btnVariant?: 'text' | 'outlined' | 'contained'

    /**
     * @description icon of the refresh button
     * @optional if not provided, it will be an empty object and the refresh button will not have an icon
     **/
    icon?: React.ReactNode
  }

  deleteProps?: {
    /**
     * @description function to handle the delete event
     * @optional if not provided, it will be an empty function and the delete button will not be shown
     * @returns void
     * @see {@link BulkActionMenu}
     **/
    onDelete?: () => void

    /**
     * @description color of the delete button
     * @default default value is 'secondary'
     * @optional if not provided, it will be 'secondary'
     **/
    color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'

    /**
     * @description variant of the delete button
     * @default default value is 'outlined'
     * @optional if not provided, it will be 'outlined'
     * @see {@link Button}
     **/
    btnVariant?: 'text' | 'outlined' | 'contained'

    /**
     * @description icon of the delete button
     * @optional if not provided, it will be an empty object and the delete button will not have an icon
     **/
    icon?: React.ReactNode
  }

  /**
   * @description object of pagination properties
   * @optional if not provided, it will be an empty object and the pagination will not be shown
   *
   * - Parameters of paginationProps:
   *
   * @param page is a number that represents the current page
   * @param pageSize is a number that represents the number of rows per page
   * @param total is a number that represents the total number of rows
   * @param onPageChange is a function that represents the page change event
   * @param onPageSizeChange is a function that represents the page size change event
   * @param options is an array of strings that represents the options
   * @param showSize is a boolean that represents the visibility of the page size
   *
   * @returns void
   *
   * @see {@link TablePagination}
   **/
  paginationProps?: {
    page: number
    pageSize: number
    total: number
    onPageChange: (page: number) => void
    onPageSizeChange: (pageSize: number) => void
    options?: string[]
    showSize?: boolean
  }

  /**
   * @description alignment of the actions (export, bulk actions, refresh) in the toolbar
   * - if start, actions will be aligned to before the search bar
   * - if end, actions will be aligned to after the search bar
   * @optional if not provided, it will be 'start'
   **/
  actionAlign?: 'start' | 'end'
}

/**
 * @name TableToolbarBase
 *
 * @description TableToolbarBase is a component that represents the toolbar of the table
 *
 * @param showColumnsButton is a boolean that represents the visibility of the columns button. {Default: true}
 * @param showExportButton is a boolean that represents the visibility of the export button. {Default: true}
 * @param exportVars is an object that represents the variables to be exported.
 * @param exporter is a function that represents the export function to export the data from the table.
 * @param bulkActions is an array of {@link IBulkActions} objects for bulk actions. if not provided, bulk action button will not be shown.
 * @param onSearch is a function that represents the search event. if not provided, search bar will not be shown.
 * @param onRefresh is a function that represents the refresh event. if not provided, refresh button will not be shown.
 * @param paginationProps is an object of pagination properties. if not provided, pagination will not be shown.
 *
 * @example
 * ```tsx
 * toolbar: () => (
    <TableToolbarBase2
      actionAlign="end"
      onSearch={(e) => {
        console.log(e.target.value)
      }}
      refreshProps={{
        onRefresh: () => {
          console.log('Refresh')
        },
        color: 'info',
      }}
      deleteProps={{
        onDelete: () => {
          console.log('Delete')
        },
      }}
      paginationProps={{
        page: companiesFilters.skip / companiesFilters.limit,
        pageSize: companiesFilters.limit,
        total: companiesData.total,
        onPageChange: (page) =>
          setCompaniesFilters((prev) => {
            // check total
            const total = companiesData.total
            const newPage = page * prev.limit
            if (newPage < total && newPage >= 0) {
              return {
                ...prev,
                skip: newPage,
              }
            }
            return prev
          }),
        onPageSizeChange: (pageSize) =>
          setCompaniesFilters((prev) => {
            return {
              ...prev,
              limit: pageSize,
            }
          }),
        showSize: true,
        }}
      />
    ),
 * ```
 *
 * @see {@link TableToolbarBaseProps}
 * @see {@link IBulkActions}
 * @see {@link BulkActionMenu}
 * @see {@link TablePagination}
 * @see {@link ExportModal}
 *
 * @author @deepak404found
 */
export const TableToolbarBase = ({
  showColumnsButton = true,
  // showExportButton = true,
  // exportVars,
  // exporter,
  // onRefresh,
  exportProps,
  refreshProps,
  deleteProps,
  onSearch,
  paginationProps,
  actionAlign = 'start',
}: TableToolbarBaseProps) => {
  // const apiRef = useGridApiContext()
  // const { openExpModal, setOpenExpModal } = useToggleExportModal()

  return (
    <GridToolbarContainer
      sx={{
        justifyContent: 'space-between',
        p: 1,
        gap: 0,
        alignItems: 'center',
        width: '100%',
      }}
    >
      {/* columns button and actions */}
      <Stack
        direction={'row'}
        gap={'8px'}
        alignItems={'center'}
        maxWidth={paginationProps ? '82%' : '100%'}
        width={'100%'}
      >
        {/* columns button */}
        {showColumnsButton && (
          <GridToolbarColumnsButton
            slotProps={{
              button: {
                variant: 'outlined',
                size: 'medium',
                sx: {
                  height: '40px',
                },
              },
            }}
          />
        )}
        {/* end columns button */}

        {/* actions and searchbar */}
        <Stack
          direction={actionAlign === 'start' ? 'row' : 'row-reverse'}
          gap={'8px'}
          alignItems={'center'}
          // maxWidth={'79%'}
          // width={'100%'}
        >
          {/* actions */}
          <Stack direction={'row'} gap={'8px'} alignItems={'center'}>
            {/* export button */}
            {exportProps && (
              <Stack direction={'row'} gap={'8px'} alignItems={'center'}>
                <Button
                  variant={exportProps?.btnVariant || 'outlined'}
                  size="medium"
                  color={exportProps?.color || 'secondary'}
                  sx={{
                    height: '40px',
                  }}
                  onClick={() => {
                    // setOpenExpModal(true)
                    console.log('Export')
                  }}
                  startIcon={
                    actionAlign === 'start'
                      ? exportProps?.icon || <FileDownloadOutlined />
                      : undefined
                  }
                  endIcon={
                    actionAlign === 'end'
                      ? exportProps?.icon || <FileDownloadOutlined />
                      : undefined
                  }
                >
                  Export
                </Button>
              </Stack>
            )}
            {/* end export button */}

            {/* refresh button */}
            {refreshProps && (
              <Button
                variant={refreshProps?.btnVariant || 'outlined'}
                size="medium"
                color={refreshProps?.color || 'secondary'}
                sx={{
                  height: '40px',
                }}
                startIcon={
                  actionAlign === 'start'
                    ? refreshProps?.icon || <RefreshIcon />
                    : undefined
                }
                endIcon={
                  actionAlign === 'end'
                    ? refreshProps?.icon || <RefreshIcon />
                    : undefined
                }
                onClick={refreshProps?.onRefresh}
              >
                Refresh
              </Button>
            )}
            {/* end refresh button */}
          </Stack>
          {/* end actions */}

          {/* searchbar start */}
          {onSearch && (
            <CustomOutlinedInput
              size="small"
              placeholder={'Search in app...'}
              startAdornment={<SearchIcon />}
              onChange={(e) => {
                debounce(() => {
                  return onSearch && onSearch(e)
                }, 1000)()
              }}
              sx={{
                px: 1,
              }}
            />
          )}
          {/* searchbar end */}
        </Stack>
        {/* end actions and searchbar */}

        {/* delete button */}
        {deleteProps && (
          <Button
            variant={deleteProps?.btnVariant || 'contained'}
            size="medium"
            color={deleteProps?.color || 'error'}
            sx={{
              height: '40px',
            }}
            startIcon={
              actionAlign === 'start'
                ? deleteProps?.icon || <DeleteIcon />
                : undefined
            }
            endIcon={
              actionAlign === 'end'
                ? deleteProps?.icon || <DeleteIcon />
                : undefined
            }
            onClick={deleteProps?.onDelete}
          >
            Delete
          </Button>
        )}
        {/* end delete button */}
      </Stack>
      {/* end columns button and actions */}

      {/* pagination */}
      {paginationProps && (
        <TablePagination
          pageSize={paginationProps?.pageSize}
          page={paginationProps?.page}
          onPageChange={paginationProps?.onPageChange}
          onPageSizeChange={paginationProps?.onPageSizeChange}
          total={paginationProps?.total}
          options={paginationProps?.options}
          showSize={paginationProps?.showSize}
          containerSx={{
            width: 'auto',
            p: 0,
          }}
        />
      )}
      {/* end pagination */}
    </GridToolbarContainer>
  )
}

export default React.memo(TableToolbarBase)
