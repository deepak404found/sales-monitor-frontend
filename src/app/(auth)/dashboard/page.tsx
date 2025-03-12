import { Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import ProductCharts from './_compoents/ProductCharts'

export default function DashboardPage() {
  return (
    <Stack spacing={4}>
      <Typography variant="h4">Dashboard</Typography>

      {/* carts */}
      <ProductCharts />
    </Stack>
  )
}
