// Example usage of FlowiseCanvas in a consumer project

import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { FlowiseCanvas, useError } from 'flowise-ui'

// Error boundary component using the useError hook
function ErrorBoundary({ children }) {
    const { error, setError } = useError()

    if (error) {
        return (
            <div style={{ padding: '20px', border: '1px solid red', borderRadius: '4px' }}>
                <h3>Something went wrong:</h3>
                <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                    {error.message || JSON.stringify(error, null, 2)}
                </pre>
                <button onClick={() => setError(null)}>Clear Error</button>
            </div>
        )
    }

    return children
}

// Canvas page component
function CanvasPage() {
    const navigate = useNavigate()

    // Sample chatflow data
    const chatflow = {
        id: 'sample-chatflow',
        name: 'Sample Chatflow',
        nodes: [],
        edges: []
        // Add your chatflow data here
    }

    // Handle navigation events from the canvas
    const handleNavigation = (path) => {
        navigate(path)
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <h1>My Flowise Canvas</h1>
            <ErrorBoundary>
                <FlowiseCanvas
                    chatflow={chatflow}
                    navigateTo={handleNavigation}
                    theme='light' // or "dark"
                />
            </ErrorBoundary>
        </div>
    )
}

// Login page component
function LoginPage() {
    const navigate = useNavigate()

    const handleLogin = () => {
        // Handle login logic
        navigate('/canvas')
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login and Go to Canvas</button>
        </div>
    )
}

// Unauthorized page component
function UnauthorizedPage() {
    const navigate = useNavigate()

    return (
        <div style={{ padding: '20px' }}>
            <h1>Unauthorized</h1>
            <p>You don't have permission to access this resource.</p>
            <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
    )
}

// Main App component
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<CanvasPage />} />
                <Route path='/canvas' element={<CanvasPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/unauthorized' element={<UnauthorizedPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
