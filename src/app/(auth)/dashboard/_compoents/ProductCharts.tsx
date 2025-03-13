'use client'
import { useTheme } from '@mui/material'
import {
  cyan,
  deepOrange,
  deepPurple,
  indigo,
  lightGreen,
  teal,
} from '@mui/material/colors'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { BarChart, BarChartProps } from '@mui/x-charts/BarChart'
import {
  useProductCharts,
  useProducts,
} from '@sales-monitor-frontend/hooks/products'
import React, { useEffect } from 'react'

export const ProductCharts = () => {
  const { fetchItemsChart, fetchSalesChart, items_chart, sales_chart } =
    useProductCharts()
  const { categories, listCategories } = useProducts()
  const theme = useTheme()

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
  const width = window ? window.innerWidth : 0

  const chartSettings: BarChartProps = {
    height: 400,
    tooltip: {
      trigger: 'item',
    },
    xAxis: [
      {
        data: items_chart?.map((item) => item.month) || [],
        scaleType: 'band',
      },
    ],
    yAxis: [
      {
        id: 'items',
        scaleType: 'linear',
      },
    ],
    slotProps: {
      legend: {
        direction: theme.breakpoints.values.md >= width ? 'column' : 'row',
        position: {
          vertical: theme.breakpoints.values.md >= width ? 'top' : 'bottom',
          horizontal: theme.breakpoints.values.md >= width ? 'right' : 'middle',
        },
        padding: theme.breakpoints.values.md >= width ? 0 : -5,
      },
    },
    colors: [
      teal[300],
      cyan[300],
      lightGreen[300],
      indigo[300],
      deepPurple[300],
      deepOrange[300],
    ],
    borderRadius: 4,
    series: [],
  }

  return (
    <Stack direction={{ md: 'column', lg: 'row' }} width={'100%'}>
      {/* items chart */}
      {categories && items_chart && (
        <Stack width={'100%'}>
          <Typography variant="h6">
            Total Items in Each Category (Monthly):
          </Typography>

          <BarChart
            // title="Items"
            {...chartSettings}
            series={
              categories?.map((category) => ({
                label: category,
                data: items_chart?.map((item) => item.items[category] || 0),
              })) || []
            }
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
            {...chartSettings}
            // title="Sales"
            series={
              categories?.map((category) => ({
                label: category,
                data: sales_chart?.map((item) => item.sales[category] || 0),
                valueFormatter: (value) => `₹ ${value}`,
              })) || []
            }
          />
        </Stack>
      )}
    </Stack>
  )
}

export default React.memo(ProductCharts)
