import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ProductsTable from './_components/ProductsTable'
import { useProduct } from '@sales-monitor-frontend/hooks/products'
import Button from '@mui/material/Button'
import ProductModifyModal from './_components/ProductModifyModal'
import React from 'react'

export default function ProductsPage() {
  const [openAddModal, setOpenAddModal] = React.useState(false)
  return (
    <Stack spacing={3}>
      {/* add modal */}
      <ProductModifyModal
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false)
        }}
        action="add"
      />

      {/* header */}
      <Stack>
        <Typography variant="h4">Products</Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpenAddModal(true)
          }}
        >
          Add Product
        </Button>
      </Stack>
      {/* end header */}

      {/* products table */}
      <ProductsTable />
    </Stack>
  )
}
