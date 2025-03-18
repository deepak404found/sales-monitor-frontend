'use client'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import ProductModifyModal from './_components/ProductModifyModal'
import ProductsTable from './_components/ProductsTable'

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
      <Stack direction="row" justifyContent="space-between">
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
