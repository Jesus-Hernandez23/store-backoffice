import React, { useRef } from 'react'

import { Route, Routes } from 'react-router-dom'

import RequireRole from '@/services/auth/RequireRole'
import { ROLES } from '@/services/auth/permission-maps'

import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide'
import { useMediaQuery } from '@mui/material'

import Header from '@/components/Layout/Header'
import Sidebar from './Sidebar'
import { drawerWidth } from '@/services/constant'

//page
import Loader from '@/components/LoaderPage'

//redux
import { setShowBar } from '@/redux/features/appSlice'

import useSocket from '@/services/hooks/useSocket'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook'

const Chat = React.lazy(() => import('@/pages/admin/Chat'))
const Ventas = React.lazy(() => import('@/pages/admin/Venta'))
const Accountant = React.lazy(() => import('@/pages/admin/Accountant'))
const Session = React.lazy(() => import('@/pages/admin/Session'))
const Accessibility = React.lazy(() => import('@/pages/admin/Accessibility'))
const DetalleVenta = React.lazy(() => import('@/pages/admin/Venta/Detalle'))
const VentaNueva = React.lazy(() => import('@/pages/admin/Venta/Nueva'))
const Inventory = React.lazy(() => import('@/pages/admin/Inventory'))
const Lote = React.lazy(() => import('@/pages/admin/Lote'))
const Supplier = React.lazy(() => import('@/pages/admin/Supplier'))
const Dashboard = React.lazy(() => import('@/pages/admin/Dashboard'))
const Employee = React.lazy(() => import('@/pages/admin/Employee'))
const Product = React.lazy(() => import('@/pages/admin/Product'))
const Category = React.lazy(() => import('@/pages/admin/Category'))
const Brand = React.lazy(() => import('@/pages/admin/Brand'))
const Client = React.lazy(() => import('@/pages/admin/Client'))
const Guide = React.lazy(() => import('@/pages/admin/Guide'))
const Reporte = React.lazy(() => import('@/pages/admin/Report'))
const ReportViewer = React.lazy(() => import('@/pages/admin/Report/ReportViewer'))
const Setting = React.lazy(() => import('@/pages/admin/Setting'))
const NoFound = React.lazy(() => import('@/pages/error/NoFound'))

const MainLayout = () => {
  const containerRef = React.useRef(null)
  const { chatSocket, dashSocket } = useSocket()
  const matchUpMd = useMediaQuery('(min-width:600px)')

  //redux
  const dispatch = useAppDispatch()
  const drawerOpen = useAppSelector((state) => state.app.setting.showBar)

  const handleDrawerToggle = () => {
    dispatch(setShowBar(!drawerOpen))
  }

  React.useEffect(() => {
    dispatch(setShowBar(matchUpMd))
  }, [matchUpMd])

  return (
    <Box display='flex' sx={{ backgroundColor: 'background.default' }} ref={containerRef}>
      <Sidebar drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
      <Header drawerToggle={handleDrawerToggle} />
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          flexGrow: 1,
          ml: { xs: 0, md: drawerOpen ? 0 : `${-drawerWidth}px` },
        }}>
        <Slide direction='right' in container={containerRef.current}>
          <Box sx={{ p: { xs: 2, sm: 2.5 }, height: 'calc(100% - 3.6rem)', mt: '3.6rem' }}>
            <React.Suspense fallback={<Loader />}>
              <Routes>
                <Route
                  index
                  element={
                    <RequireRole roles={[ROLES.administrador]}>
                      <Dashboard />
                    </RequireRole>
                  }
                />

                <Route
                  path='venta'
                  element={
                    <RequireRole roles={[ROLES.administrador, ROLES.vendedor, ROLES.cajero]}>
                      <Ventas />
                    </RequireRole>
                  }
                />

                <Route
                  path='venta/:invoiceId'
                  element={
                    <RequireRole roles={[ROLES.administrador, ROLES.vendedor, ROLES.cajero]}>
                      <DetalleVenta />
                    </RequireRole>
                  }
                />

                <Route
                  path='venta/nueva'
                  element={
                    <RequireRole roles={[ROLES.administrador, ROLES.vendedor]}>
                      <VentaNueva />
                    </RequireRole>
                  }
                />

                <Route
                  path='Accountant'
                  element={
                    <RequireRole roles={[ROLES.administrador, ROLES.vendedor, ROLES.bodeguero]}>
                      <Accountant />
                    </RequireRole>
                  }
                />

                <Route
                  path='categoria'
                  element={
                    <RequireRole roles={[ROLES.administrador, ROLES.bodeguero]}>
                      <Category />
                    </RequireRole>
                  }
                />

                <Route
                  path='marca'
                  element={
                    <RequireRole roles={[ROLES.administrador, ROLES.bodeguero]}>
                      <Brand />
                    </RequireRole>
                  }
                />

                <Route
                  path='Inventario'
                  element={
                    <RequireRole roles={[ROLES.administrador, ROLES.bodeguero, ROLES.cajero]}>
                      <Inventory />
                    </RequireRole>
                  }
                />

                <Route
                  path='Lote'
                  element={
                    <RequireRole roles={[ROLES.administrador, ROLES.bodeguero]}>
                      <Lote />
                    </RequireRole>
                  }
                />

                <Route
                  path='producto'
                  element={
                    <RequireRole roles={[ROLES.administrador, ROLES.vendedor, ROLES.bodeguero]}>
                      <Product />
                    </RequireRole>
                  }
                />

                <Route
                  path='cliente'
                  element={
                    <RequireRole roles={[ROLES.administrador, ROLES.cajero, ROLES.vendedor]}>
                      <Client />
                    </RequireRole>
                  }
                />

                <Route
                  path='empleado'
                  element={
                    <RequireRole roles={[ROLES.administrador]}>
                      <Employee />
                    </RequireRole>
                  }
                />

                <Route
                  path='proveedor'
                  element={
                    <RequireRole roles={[ROLES.administrador, ROLES.bodeguero, ROLES.cajero]}>
                      <Supplier />
                    </RequireRole>
                  }
                />

                <Route path='sesion' element={<Session />} />

                <Route path='ayuda' element={<Guide />} />

                <Route
                  path='reporte'
                  element={
                    <RequireRole roles={[ROLES.administrador]}>
                      <Reporte />
                    </RequireRole>
                  }
                />

                <Route
                  path='reporte/ver'
                  element={
                    <RequireRole roles={[ROLES.administrador]}>
                      <ReportViewer />
                    </RequireRole>
                  }
                />

                <Route path='setting' element={<Setting />} />

                <Route path='accessibilidad' element={<Accessibility />} />

                <Route path='chat' element={<Chat chatSocket={chatSocket} />} />
                <Route path='load' element={<Loader />} />

                <Route path='*' element={<NoFound />} />
              </Routes>
            </React.Suspense>
          </Box>
        </Slide>
      </Box>
    </Box>
  )
}

export default MainLayout
