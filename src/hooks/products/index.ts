import axios from 'axios'
import { useCallback, useState } from 'react'
import { useApi } from '../api'
import { ProductsList } from '../../utils/types'
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

  // list categories
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

  return {
    products,
    loading,
    listProducts,
    productsFilter,
    setProductsFilter,
    listCategories,
    categories,
  }
}
