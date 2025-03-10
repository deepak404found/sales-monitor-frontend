import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { IRoutesDetails } from './types'
import DashboardIcon from '@mui/icons-material/Dashboard'
import CategoryIcon from '@mui/icons-material/Category'

export const MySwal = withReactContent(Swal)

export function debounce(func: (...args: unknown[]) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (...args: unknown[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export interface ICommonListFilter {
  skip: number
  limit: number
  search?: string | null
  sortBy?: string | null
  sortOrder: 'asc' | 'desc'
}

export const commonListFilter: ICommonListFilter = {
  skip: 0,
  limit: 10,
  search: '',
  sortBy: '',
  sortOrder: 'asc',
}

export const topBarHeight = 52
export const sidebarWidth = 240

export const guestRoutes = ['/login', '/reset-password']

export const appRoutes: IRoutesDetails[] = [
  {
    route: '/dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
  },
  // {
  //   route: '/users',
  //   label: 'Users',
  // },
  {
    route: '/products',
    label: 'Products',
    icon: <CategoryIcon />,
  },
]
