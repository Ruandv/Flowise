import React, { createContext, useEffect } from 'react'
import { store } from '@/store'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { ThemeProvider, createTheme } from '@mui/material'
import { ConfigProvider } from '@/store/context/ConfigContext'
import ConfirmContextProvider from '@/store/context/ConfirmContextProvider'
import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { ErrorProvider } from '@/store/context/ErrorContext'
// Add this import
import { MemoryRouter, Routes, Route } from 'react-router-dom'
// defaultTheme
import themes from '@/themes'

// Main provider component
export const FlowiseProvider = ({ children, navigateTo, initialPath = '/' }) => {
    // Define available routes based on the API structure from backend
    const availableRoutes = [
        '/',
        '/canvas',
        '/chatflows',
        '/agentflows',
        '/credentials',
        '/assistants',
        '/tools',
        '/docstore',
        '/evaluations',
        '/evaluators',
        '/variables',
        '/datasets',
        '/vectorstore',
        '/files',
        '/account',
        '/settings',
        '/roles',
        '/marketplace',
        '/workspace',
        '/organization',
        '/apikey',
        '/serverlogs'
    ]

    return (
        <Provider store={store}>
            <ThemeProvider theme={themes({})}>
                <CssBaseline />
                <SnackbarProvider maxSnack={3}>
                    <ConfigProvider>
                        <ErrorProvider navigateTo={navigateTo}>
                            <MemoryRouter initialEntries={[initialPath]}>
                                <ConfirmContextProvider>
                                    <Routes>
                                        {/* Default route */}
                                        <Route path='/' element={children} />

                                        {/* Create routes for all paths based on API structure */}
                                        {availableRoutes.map((path) => path !== '/' && <Route key={path} path={path} element={children} />)}

                                        {/* Add nested routes for item details */}
                                        <Route path='/chatflows/:id' element={children} />
                                        <Route path='/agentflows/:id' element={children} />
                                        <Route path='/evaluations/:id' element={children} />
                                        <Route path='/docstore/:id' element={children} />
                                        <Route path='/tools/:id' element={children} />
                                        <Route path='/credentials/:id' element={children} />
                                        <Route path='/datasets/:id' element={children} />

                                        {/* Catch-all route */}
                                        <Route path='*' element={children} />
                                    </Routes>
                                </ConfirmContextProvider>
                            </MemoryRouter>
                        </ErrorProvider>
                    </ConfigProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    )
}
