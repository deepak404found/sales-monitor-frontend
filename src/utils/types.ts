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
