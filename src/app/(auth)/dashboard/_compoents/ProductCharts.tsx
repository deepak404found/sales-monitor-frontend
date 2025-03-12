'use client'
import Stack from '@mui/material/Stack'
import {
  useProductCharts,
  useProducts,
} from '@sales-monitor-frontend/hooks/products'
import React, { useEffect } from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import Typography from '@mui/material/Typography'
import { axisClasses } from '@mui/x-charts/ChartsAxis'

export const ProductCharts = () => {
  const { fetchItemsChart, fetchSalesChart, items_chart, sales_chart } =
    useProductCharts()
  const { categories, listCategories } = useProducts()

  // fetch data
  useEffect(
    () => {
      fetchItemsChart()
      fetchSalesChart()
      listCategories()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} width={'100%'}>
      {/* items chart */}
      {categories && items_chart && (
        <Stack width={'100%'}>
          <Typography variant="h6">
            Total Items in Each Category (Monthly):
          </Typography>

          <BarChart
            height={400}
            // title="Items"
            tooltip={{
              trigger: 'item',
            }}
            series={
              categories?.map((category) => ({
                label: category,
                data: items_chart?.map((item) => item.items[category] || 0),
              })) || []
            }
            xAxis={[
              {
                data: items_chart?.map((item) => item.month),
                scaleType: 'band',
              },
            ]}
            yAxis={[
              {
                id: 'items',
                scaleType: 'linear',
              },
            ]}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: -5,
              },
            }}
          />
        </Stack>
      )}

      {/* sales chart */}
      {categories && sales_chart && (
        <Stack width={'100%'}>
          <Typography variant="h6">
            Category-Wise Sales Amount (Monthly):
          </Typography>

          <BarChart
            height={400}
            // title="Sales"
            tooltip={{
              trigger: 'item',
            }}
            series={
              categories?.map((category) => ({
                label: category,
                data: sales_chart?.map((item) => item.sales[category] || 0),
                valueFormatter: (value) => `₹ ${value}`,
              })) || []
            }
            xAxis={[
              {
                id: 'month',
                data: sales_chart?.map((item) => item.month),
                scaleType: 'band',
              },
            ]}
            yAxis={[
              {
                id: 'sales',
                scaleType: 'linear',
                label: 'Sales Amount (Rs.)',
              },
            ]}
            sx={{
              [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-12px, 0)',
              },
            }}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: -5,
              },
            }}
          />
        </Stack>
      )}
    </Stack>
  )
}

export default React.memo(ProductCharts)
