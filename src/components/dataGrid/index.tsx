import Box from '@mui/material/Box'
import { grey } from '@mui/material/colors'
import LinearProgress from '@mui/material/LinearProgress'
import Pagination from '@mui/material/Pagination'
import { styled, SxProps } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid'
import React from 'react'
import { NoRowsIcon, StyledNoRowsIcon } from '../icons'
// import { blueGrey } from '@mui/material/colors'

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}))

export const CustomNoRowsOverlay = ({
  label = 'No Rows',
  styledIcon = false,
  iconSx,
}: {
  label?: string
  styledIcon?: boolean
  iconSx?: SxProps
}) => {
  return (
    <StyledGridOverlay>
      {styledIcon ? (
        <StyledNoRowsIcon
          sx={{
            width: '68px !important',
            height: '68px !important',
            ...iconSx,
          }}
        />
      ) : (
        <NoRowsIcon
          sx={{
            width: '68px !important',
            height: '68px !important',
            ...iconSx,
          }}
        />
      )}
      <Box sx={{ mt: 1 }}>
        <Typography variant={'h6'} fontWeight={'medium'} color={'textInactive'}>
          {label}
        </Typography>
      </Box>
    </StyledGridOverlay>
  )
}

// loading overlay
export const CustomLoadingOverlay = () => {
  // console.log('loading')
  return (
    <LinearProgress
      sx={{
        zIndex: 1000,
        color: 'primary.500',
      }}
    />
  )
}
export const StyledDataGrid = styled(DataGrid)(() => {
  // const tableBackgroundColor = theme.palette.background.paper
  const tableBackgroundColor = grey[100]
  return {
    borderRadius: '8px',
    // color: 'grey',
    bgColor: '#000',

    // top container (toolbar)
    '& .MuiDataGrid-toolbarContainer': {
      backgroundColor: tableBackgroundColor,
    },

    // headers
    '& .MuiDataGrid-columnHeader': {
      backgroundColor: tableBackgroundColor,
    },

    // header titles
    '& .MuiDataGrid-columnHeaderTitle': {
      // color: 'text.secondary',
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '24px',
    },

    // main rows
    '& .MuiDataGrid-main': {
      backgroundColor: tableBackgroundColor,
    },

    // footer
    '& .MuiDataGrid-footerContainer': {
      backgroundColor: tableBackgroundColor,
    },
  }
})

export function CustomPagination() {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // Add some custom styles here
      sx={{ marginTop: '16px' }}
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
    />
  )
}
