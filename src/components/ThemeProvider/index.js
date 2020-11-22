import { provideProps } from 'store/provideProps'
import component from './ThemeProvider'
import { dataGetter } from './handlers/dataGetter'

export const ThemeProvider = provideProps({ component, dataGetter })
