import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { SxProps } from '@mui/material/styles'
import { CustomSelect } from '../select'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import React from 'react'

// TablePagination
/**
 * Renders a table pagination component.
 * @name TablePagination
 * @description
 * @param page - The current page number.
 * @param pageSize - The number of items per page.
 * @param total - The total number of items.
 * @param onPageChange - The callback function when the page is changed.
 * @param onPageSizeChange - The callback function when the page size is changed.
 * @param options - The array of options for the page size. {@Default ['5', '10', '15', '50', '100']}
 * @param showSize - The boolean value to show the page size select component. {@Default true}
 * @param searchLabel - The label to display the search results.
 * @param onShowSearchResults - The boolean value to show the search results label. {@Default false}
 * @param width - The width of the table pagination component. {@Default '1095px'}
 *
 * @return The rendered table pagination component.
 *
 * @example
 *  const [Page, setPage] = React.useState({
 *  page: 0,
 *  pageSize: 5,
 * })
 * <TablePagination
 *  page={Page.page}
 *  pageSize={Page.pageSize}
 *  total={50}
 *  onPageChange={(page) =>
 *      setPage({
 *          ...Page,
 *          page,
 *      })
 *  }
 *  onPageSizeChange={(pageSize) =>
 *      setPage({
 *          ...Page,
 *          pageSize,
 *      })
 *  }
 *  />
 *  @author @deepak404found
 */

export function TablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  options = ['5', '10', '15'],
  showSize,
  searchLabel,
  onShowSearchResults = false,
  containerSx
}: {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  options?: string[]
  showSize?: boolean
  searchLabel?: string
  onShowSearchResults?: boolean
  containerSx?: SxProps
  buttonSelectProps?: {
    height?: string | number
  }
}) {
  return (
    <Stack
      gap={'8px'}
      direction={'row'}
      sx={{
        // justifyContent: 'space-between',
        justifyContent: !onShowSearchResults ? 'flex-end' : 'space-between',
        alignItems: 'center',
        width: '100%',
        p: '8px',
        ...containerSx
      }}
    >
      {' '}
      {onShowSearchResults && (
        <Stack direction={'row'} sx={{ gap: '4px' }}>
          <Typography variant="body2" fontWeight={'medium'} color={'textActive'}>
            Search Results For:
          </Typography>
          <Typography variant="body2" fontWeight={400} color={'textInactive'}>
            “{searchLabel}”
          </Typography>
        </Stack>
      )}
      <Stack
        gap={'12px'}
        display={'flex'}
        alignItems={'center'}
        flexDirection={'row'}
        alignContent={'end'}
        justifyContent={'flex-end'}
        // width={'1095px'}
      >
        {/* Start of customSelect components */}
        {showSize && (
          <Stack>
            <CustomSelect
              size="small"
              options={options.map((option) => ({
                label: option,
                value: option
              }))}
              value={pageSize.toString()}
              setvalue={(value) => onPageSizeChange(Number(value))}
              label={'Size'}
            />
          </Stack>
        )}
        {/* end of customSelect components */}

        {/* start for prevArrow IconButton */}
        <Stack>
          <IconButton onClick={() => onPageChange(page - 1)}>
            <ChevronLeftIcon sx={{ color: 'textActive' }} />
          </IconButton>
        </Stack>
        {/* end for prevArrow IconButton */}

        {/* Start of  pageindexing */}
        <Typography variant="body1" color={'textActive'} fontWeight={400}>
          {`${page * pageSize + 1}-${Math.min((page + 1) * pageSize, total).toFixed(0)} of ${total}
                    `}
        </Typography>
        {/* end  of  pageindexing */}

        {/* start for nextArrow IconButton */}
        <IconButton onClick={() => onPageChange(page + 1)}>
          <ChevronRightIcon sx={{ color: 'textActive' }} />
        </IconButton>
        {/* end for nextArrow IconButton */}
      </Stack>
    </Stack>
  )
}
