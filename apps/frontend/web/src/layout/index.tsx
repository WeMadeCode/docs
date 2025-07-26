import { SidebarProvider } from '@miaoma-doc/shadcn-shared-ui/components/ui/sidebar'
import { useLayoutEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { Aside } from '@/components/LayoutAside/Aside'

export function Layout() {
  useLayoutEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = `/account/login?redirect=${window.location.pathname}`
    }
  }, [])
  return (
    <SidebarProvider>
      <Aside />
      <Outlet />
    </SidebarProvider>
  )
}
