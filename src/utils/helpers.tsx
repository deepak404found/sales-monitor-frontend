import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
