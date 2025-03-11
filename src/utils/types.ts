export type User = {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  date_joined: string
  last_login: string
}

export type IRoutesDetails = {
  route: string
  icon?: React.ReactNode
  label: string
}

export type Product = {
  id: number
  title: string
  price: string
  description: string
  category: string
  image: string
  sold: boolean
  is_sale: boolean
  date_of_sale: string
}

export type ProductsList = {
  count: number
  next: string | null
  previous: string | null
  results: Product[]
}
