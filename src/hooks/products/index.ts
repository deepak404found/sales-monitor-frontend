import axios from 'axios'
import { useCallback, useState } from 'react'
import { useApi } from '../api'
import { ItemsByMonth, ProductsList, SalesByMonth } from '../../utils/types'
import { MySwal } from '@sales-monitor-frontend/utils/helpers'

export type ListProductsFilter = {
  offset: number
  limit: number
  loading?: boolean | null
  search?: string | null
  category?: string | null
  sortBy?: string | null
  sortOrder?: string | null
  is_sold?: boolean | null
  price_min?: number | null
  price_max?: number | null
}

export const useProducts = () => {
  const [products, setProducts] = useState<ProductsList | null>(null)
  const [categories, setCategories] = useState<string[] | null>(null)
  const [price_range, setPriceRange] = useState<number[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [productsFilter, setProductsFilter] = useState<ListProductsFilter>({
    offset: 0,
    limit: 10,
  })

  const { productsApiPath, authConfig } = useApi()

  /**
   * Fetch all products from the server and store them in the state.{@link products}
   *
   * @param filter - filter object to filter products
   * @param cb - callback function. It will be called after fetching data. (data?: ProductsList) => void
   * @param errCb - error callback function. It will be called if there is an error while fetching data. (err?: unknown) => void
   *
   * */
  const listProducts = useCallback(
    async (
      filter: ListProductsFilter,
      cb?: (data?: ProductsList) => void,
      errCb?: (err?: unknown) => void
    ) => {
      try {
        console.log('Fetching products', filter, filter.is_sold || undefined)

        // start loading
        setLoading(true)

        // call api to fetch products
        axios
          .get(`${productsApiPath}/list`, {
            params: {
              offset: filter.offset,
              limit: filter.limit,
              search: filter.search || undefined,
              category: filter.category || undefined,
              ordering: filter.sortBy
                ? `${filter.sortOrder === 'asc' ? '' : '-'}${filter.sortBy}`
                : undefined,
              sold: filter.is_sold || undefined,
              min_price: filter.price_min || undefined,
              max_price: filter.price_max || undefined,
            },
            headers: authConfig.headers,
          })
          .then((res) => {
            if (res?.data?.results) {
              setProducts(res.data)
              return cb && cb(res.data)
            }

            console.error('Error fetching products', res)
            MySwal.fire({
              icon: 'error',
              title: 'Error fetching products',
              text: `Error fetching products: ${
                res?.data?.message || 'Unknown error'
              }`,
            })
            return errCb && errCb(res)
          })
          .catch((error) => {
            console.error('Error fetching products', error?.response)
            const errorMsg = error?.response?.data?.message || error.message
            MySwal.fire({
              icon: 'error',
              title: 'Error fetching products',
              text: `Error fetching products: ${errorMsg || 'Unknown error'}`,
            })
            return errCb && errCb(error)
          })
          .finally(() => {
            // stop loading
            setLoading(false)
          })
      } catch (error) {
        setLoading(false)
        console.error('Error fetching products', error)
        MySwal.fire({
          icon: 'error',
          title: 'Error fetching products',
          text: `Error fetching products`,
        })
        return errCb && errCb(error)
      }
    },
    [authConfig.headers, productsApiPath]
  )

  /**
   * Fetch all categories from the server and store them in the state.{@link categories}
   *
   * @param cb - callback function. It will be called after fetching data. (data?: string[]) => void
   * @param errCb - error callback function. It will be called if there is an error while fetching data. (err?: unknown) => void
   *
   */
  const listCategories = useCallback(
    async (cb?: (data?: string[]) => void, errCb?: (err?: unknown) => void) => {
      try {
        console.log('Fetching categories')

        // call api to fetch categories
        axios
          .get(`${productsApiPath}/categories`, {
            headers: authConfig.headers,
          })
          .then((res) => {
            if (res?.data) {
              setCategories(res.data)
              return cb && cb(res.data)
            }

            console.error('Error fetching categories', res)
            MySwal.fire({
              icon: 'error',
              title: 'Error fetching categories',
              text: `Error fetching categories: ${
                res?.data?.message || 'Unknown error'
              }`,
            })
            return errCb && errCb(res)
          })
          .catch((error) => {
            console.error('Error fetching categories', error?.response)
            const errorMsg = error?.response?.data?.message || error.message
            MySwal.fire({
              icon: 'error',
              title: 'Error fetching categories',
              text: `Error fetching categories: ${errorMsg || 'Unknown error'}`,
            })
            return errCb && errCb(error)
          })
      } catch (error) {
        console.error('Error fetching categories', error)
        MySwal.fire({
          icon: 'error',
          title: 'Error fetching categories',
          text: `Error fetching categories`,
        })
        return errCb && errCb(error)
      }
    },
    [authConfig.headers, productsApiPath]
  )

  /**
   * Fetch price range from the server and store them in the state.{@link price_range}
   *
   * @param cb - callback function. It will be called after fetching data. (data?: number[]) => void
   * @param errCb - error callback function. It will be called if there is an error while fetching data. (err?: unknown) => void
   *
   */
  const fetchPriceRange = useCallback(
    async (cb?: (data?: number[]) => void, errCb?: (err?: unknown) => void) => {
      try {
        console.log('Fetching price range')

        // call api to fetch price range
        axios
          .get(`${productsApiPath}/price_range`, {
            headers: authConfig.headers,
          })
          .then((res) => {
            if (res?.data) {
              setPriceRange([
                res.data.min_price,
                res.data.max_price,
              ] as number[])
              return cb && cb(res.data)
            }

            console.error('Error fetching price range', res)
            MySwal.fire({
              icon: 'error',
              title: 'Error fetching price range',
              text: `Error fetching price range: ${
                res?.data?.message || 'Unknown error'
              }`,
            })
            return errCb && errCb(res)
          })
          .catch((error) => {
            console.error('Error fetching price range', error?.response)
            const errorMsg = error?.response?.data?.message || error.message
            MySwal.fire({
              icon: 'error',
              title: 'Error fetching price range',
              text: `Error fetching price range: ${
                errorMsg || 'Unknown error'
              }`,
            })
            return errCb && errCb(error)
          })
      } catch (error) {
        console.error('Error fetching price range', error)
        MySwal.fire({
          icon: 'error',
          title: 'Error fetching price range',
          text: `Error fetching price range`,
        })
        return errCb && errCb(error)
      }
    },
    [authConfig.headers, productsApiPath]
  )

  return {
    products,
    loading,
    listProducts,
    productsFilter,
    setProductsFilter,
    listCategories,
    categories,
    fetchPriceRange,
    price_range,
  }
}

export const useProductCharts = () => {
  const [sales_chart, setSalesChart] = useState<SalesByMonth[] | null>(null)
  const [items_chart, setItemsChart] = useState<ItemsByMonth[] | null>(null)

  const { productsApiPath, authConfig } = useApi()

  /**
   * Fetch sales chart data from the server and store them in the state.{@link sales_chart}
   *
   * @param cb - callback function. It will be called after fetching data. (data?: SalesByMonth) => void
   * @param errCb - error callback function. It will be called if there is an error while fetching data. (err?: unknown) => void
   *
   **/
  const fetchSalesChart = useCallback(
    async (
      cb?: (data?: SalesByMonth) => void,
      errCb?: (err?: unknown) => void
    ) => {
      try {
        console.log('Fetching sales chart')

        // call api to fetch sales chart
        axios
          .get(`${productsApiPath}/sales_chart`, {
            headers: authConfig.headers,
          })
          .then((res) => {
            if (res?.data) {
              setSalesChart(res.data)
              return cb && cb(res.data)
            }

            console.error('Error fetching sales chart', res)
            MySwal.fire({
              icon: 'error',
              title: 'Error fetching sales chart',
              text: `Error fetching sales chart: ${
                res?.data?.message || 'Unknown error'
              }`,
            })
            return errCb && errCb(res)
          })
          .catch((error) => {
            console.error('Error fetching sales chart', error?.response)
            const errorMsg = error?.response?.data?.message || error.message
            MySwal.fire({
              icon: 'error',
              title: 'Error fetching sales chart',
              text: `Error fetching sales chart: ${
                errorMsg || 'Unknown error'
              }`,
            })
            return errCb && errCb(error)
          })
      } catch (error) {
        console.error('Error fetching sales chart', error)
        MySwal.fire({
          icon: 'error',
          title: 'Error fetching sales chart',
          text: `Error fetching sales chart`,
        })
        return errCb && errCb(error)
      }
    },
    [authConfig.headers, productsApiPath]
  )

  /**
   * Fetch items chart data from the server and store them in the state.{@link items_chart}
   *
   * @param cb - callback function. It will be called after fetching data. (data?: ItemsByMonth) => void
   * @param errCb - error callback function. It will be called if there is an error while fetching data. (err?: unknown) => void
   *
   **/
  const fetchItemsChart = useCallback(
    async (
      cb?: (data?: ItemsByMonth) => void,
      errCb?: (err?: unknown) => void
    ) => {
      try {
        console.log('Fetching items chart')

        // call api to fetch items chart
        axios
          .get(`${productsApiPath}/items_chart`, {
            headers: authConfig.headers,
          })
          .then((res) => {
            if (res?.data) {
              setItemsChart(res.data)
              return cb && cb(res.data)
            }

            console.error('Error fetching items chart', res)
            MySwal.fire({
              icon: 'error',
              title: 'Error fetching items chart',
              text: `Error fetching items chart: ${
                res?.data?.message || 'Unknown error'
              }`,
            })
            return errCb && errCb(res)
          })
          .catch((error) => {
            console.error('Error fetching items chart', error?.response)
            const errorMsg = error?.response?.data?.message || error.message
            MySwal.fire({
              icon: 'error',
              title: 'Error fetching items chart',
              text: `Error fetching items chart: ${
                errorMsg || 'Unknown error'
              }`,
            })
            return errCb && errCb(error)
          })
      } catch (error) {
        console.error('Error fetching items chart', error)
        MySwal.fire({
          icon: 'error',
          title: 'Error fetching items chart',
          text: `Error fetching items chart`,
        })
        return errCb && errCb(error)
      }
    },
    [authConfig.headers, productsApiPath]
  )

  return {
    sales_chart,
    items_chart,
    fetchSalesChart,
    fetchItemsChart,
  }
}
