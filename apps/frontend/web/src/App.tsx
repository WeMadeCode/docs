import './App.css'
import '@miaoma-doc/shadcn/style.css'

import { Toaster } from '@miaoma-doc/shadcn-shared-ui/components/ui/toaster'
import { QueryClientProvider } from '@tanstack/react-query'
import { setDefaultOptions } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'
import { queryClient } from './utils/query-client'

setDefaultOptions({ locale: zhCN })

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
