import { zodResolver } from '@hookform/resolvers/zod'
import { MySwal } from '@sales-monitor-frontend/utils/helpers'
import axios from 'axios'
import dayjs from 'dayjs'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ItemsByMonth, ProductsList, SalesByMonth } from '../../utils/types'
import { useApi } from '../api'

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

const ProductForm = z.object({
  title: z.string().nonempty('Please enter a valid title'),
  price: z.string().nonempty('Please enter a valid price'),
  description: z.string().nonempty('Please enter a valid description'),
  category: z.string().nonempty('Please enter a valid category'),
  image: z.string().nonempty('Please enter a valid image url'),
  sold: z.boolean().optional().default(false),
  is_sale: z.boolean().optional().default(false),
  date_of_sale: z.string().optional(),
})

export type ProductFormType = z.infer<typeof ProductForm>

export const useProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    getValues,
  } = useForm<ProductFormType>({
    resolver: zodResolver(ProductForm),
  })

  const { productsApiPath, authConfig } = useApi()

  /**
   * Add a new product to the server
   *
   * @param cb - callback function. It will be called after adding a new product. (data?: Product) => void
   * @param errCb - error callback function. It will be called if there is an error while adding a new product. (err?: unknown) => void
   */
  const addProduct = useCallback(
    (
      cb?: (data?: ProductFormType) => void,
      errCb?: (err?: unknown) => void
    ) => {
      handleSubmit(
        (data) => {
          // console.log(data)

          // Call add product API
          axios
            .post(
              `${productsApiPath}/add`,
              {
                title: data.title,
                price: data.price,
                description: data.description,
                category: data.category,
                image: data.image,
                sold: data.sold,
                is_sale: data.is_sale,
                date_of_sale:
                  data?.date_of_sale === '' ? null : data.date_of_sale,
              },
              {
                headers: authConfig.headers,
              }
            )
            .then((res) => {
              // console.log(res)

              if (res?.data) {
                MySwal.fire({
                  title: 'Product Added',
                  text: 'You have successfully added a new product',
                  icon: 'success',
                })
                reset()
                return cb && cb(data)
              }
            })
            .catch((err) => {
              console.log(err, data)
              MySwal.fire({
                title: 'Adding Product Failed',
                text: 'Please check your product details',
                icon: 'error',
              })
              return errCb && errCb(err)
            })
        },
        (err) => {
          console.log(err, getValues())
          MySwal.fire({
            title: 'Invalid Input',
            text: 'Please check the input fields',
            icon: 'error',
          })
          return errCb && errCb(err)
        }
      )()
    },
    [authConfig.headers, getValues, handleSubmit, productsApiPath, reset]
  )

  /**
   * Update a product on the server
   *
   * @param id - id of the product to be updated
   * @param cb - callback function. It will be called after updating a product. (data?: Product) => void
   * @param errCb - error callback function. It will be called if there is an error while updating a product. (err?: unknown) => void
   */
  const updateProduct = useCallback(
    (
      id: number,
      cb?: (data?: ProductFormType) => void,
      errCb?: (err?: unknown) => void
    ) => {
      handleSubmit(
        (data) => {
          // console.log(data)

          // Call update product API
          axios
            .put(
              `${productsApiPath}/${id}`,
              {
                title: data.title,
                price: data.price,
                description: data.description,
                category: data.category,
                image: data.image,
                sold: data.sold,
                is_sale: data.is_sale,
                date_of_sale: data.date_of_sale,
              },
              {
                headers: authConfig.headers,
              }
            )
            .then((res) => {
              // console.log(res)

              if (res?.data) {
                MySwal.fire({
                  title: 'Product Updated',
                  text: 'You have successfully updated the product',
                  icon: 'success',
                })
                reset()
                return cb && cb()
              }
            })
            .catch((err) => {
              console.log(err)
              MySwal.fire({
                title: 'Updating Product Failed',
                text: 'Please check your product details',
                icon: 'error',
              })
            })
          return errCb && errCb('Error updating product')
        },
        (err) => {
          console.log(err, getValues())
          MySwal.fire({
            title: 'Invalid Input',
            text: 'Please check the input fields',
            icon: 'error',
          })
          return errCb && errCb(err || 'Error updating product')
        }
      )()
    },
    [getValues, handleSubmit, productsApiPath, reset, authConfig.headers]
  )

  /**
   * delete a product from the server
   *
   * @param id - id of the product to be deleted
   * @param cb - callback function. It will be called after deleting a product. (data?: Product) => void
   * @param errCb - error callback function. It will be called if there is an error while deleting a product. (err?: unknown) => void
   */
  const deleteProduct = useCallback(
    (
      id: number,
      cb?: (data?: ProductFormType) => void,
      errCb?: (err?: unknown) => void
    ) => {
      axios
        .delete(`${productsApiPath}/${id}/delete`, {
          headers: authConfig.headers,
        })
        .then((res) => {
          // console.log(res)

          if (res?.status === 204) {
            MySwal.fire({
              title: 'Product Deleted',
              text: 'You have successfully deleted the product',
              icon: 'success',
            })
            return cb && cb()
          }
        })
        .catch((err) => {
          console.log(err)
          MySwal.fire({
            title: 'Deleting Product Failed',
            text: 'Please check your product details',
            icon: 'error',
          })
          return errCb && errCb(err)
        })
    },
    [authConfig.headers, productsApiPath]
  )

  return {
    register,
    errors,
    addProduct,
    updateProduct,
    deleteProduct,
    setValue,
    reset,
    control,
  }
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
        // console.log('Fetching categories')

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
        // console.log('Fetching price range')

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
        // console.log('Fetching sales chart')

        // call api to fetch sales chart
        axios
          .get(`${productsApiPath}/sales_chart`, {
            headers: authConfig.headers,
          })
          .then((res) => {
            if (res?.data) {
              const lastMonth = dayjs(res.data[res.data.length - 1]?.month)
              const upcomingMonths = Array.from(
                { length: 3 - res.data.length },
                (_, i) => ({
                  month: lastMonth.add(i + 1, 'month').format('MMM YYYY'),
                  sales: 0,
                })
              )
              setSalesChart([...res.data, ...upcomingMonths])
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
        // console.log('Fetching items chart')

        // call api to fetch items chart
        axios
          .get(`${productsApiPath}/items_chart`, {
            headers: authConfig.headers,
          })
          .then((res) => {
            if (res?.data) {
              const lastMonth = dayjs(res.data[res.data.length - 1]?.month)
              const upcomingMonths = Array.from(
                { length: 3 - res.data.length },
                (_, i) => ({
                  month: lastMonth.add(i + 1, 'month').format('MMM YYYY'),
                  items: 0,
                })
              )
              setItemsChart([...res.data, ...upcomingMonths])
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
