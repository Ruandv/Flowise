# FlowiseCanvas Library

A standalone React component library that exports the Flowise Canvas for use in external projects.

## Installation

```bash
npm install flowise-ui
```

## Usage

### Basic Usage

```jsx
import React from 'react'
import { FlowiseCanvas, FlowiseProvider } from 'flowise-ui'

function App() {
    const chatflow = {
        // Your chatflow data
    }

    const handleNavigation = (path) => {
        // Handle navigation based on your routing setup
        console.log('Navigate to:', path)
    }

    return (
        <div>
            <FlowiseCanvas chatflow={chatflow} navigateTo={handleNavigation} />
        </div>
    )
}
```

### With React Router

```jsx
import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { FlowiseCanvas } from 'flowise-ui'

function CanvasPage() {
    const navigate = useNavigate()

    const chatflow = {
        // Your chatflow data
    }

    return <FlowiseCanvas chatflow={chatflow} navigateTo={navigate} />
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/canvas' element={<CanvasPage />} />
                <Route path='/login' element={<div>Login Page</div>} />
                <Route path='/unauthorized' element={<div>Unauthorized</div>} />
            </Routes>
        </BrowserRouter>
    )
}
```

### Error Handling

The library provides a `useError` hook for handling errors:

```jsx
import React from 'react'
import { FlowiseCanvas, useError } from 'flowise-ui'

function ErrorDisplay() {
    const { error, setError } = useError()

    if (error) {
        return (
            <div>
                <h3>Error occurred:</h3>
                <pre>{error.message}</pre>
                <button onClick={() => setError(null)}>Clear Error</button>
            </div>
        )
    }

    return null
}

function App() {
    const handleNavigation = (path) => {
        // Handle navigation
        console.log('Navigate to:', path)
    }

    return (
        <div>
            <FlowiseCanvas navigateTo={handleNavigation} />
            <ErrorDisplay />
        </div>
    )
}
```

### Custom Provider

You can also use the FlowiseProvider directly with your own components:

```jsx
import React from 'react'
import { FlowiseProvider } from 'flowise-ui'
import YourCustomCanvas from './YourCustomCanvas'

function App() {
    const handleNavigation = (path) => {
        // Handle navigation
        console.log('Navigate to:', path)
    }

    return (
        <FlowiseProvider theme='dark' navigateTo={handleNavigation}>
            <YourCustomCanvas />
        </FlowiseProvider>
    )
}
```

## Props

### FlowiseCanvas

| Prop         | Type     | Default     | Description                             |
| ------------ | -------- | ----------- | --------------------------------------- |
| `chatflow`   | object   | `undefined` | The chatflow data object                |
| `navigateTo` | function | `undefined` | Navigation function for handling routes |
| `...props`   | any      | -           | Additional props passed to the canvas   |

### FlowiseProvider

| Prop          | Type      | Default     | Description                             |
| ------------- | --------- | ----------- | --------------------------------------- |
| `children`    | ReactNode | -           | Child components                        |
| `theme`       | string    | `'light'`   | Theme mode ('light' or 'dark')          |
| `customStore` | object    | `undefined` | Custom Redux store                      |
| `navigateTo`  | function  | `undefined` | Navigation function for handling routes |

## Requirements

-   React 16.8+
-   The consumer application must provide navigation handling via the `navigateTo` prop
-   For full functionality, wrap your app with a React Router context
-   All peer dependencies must be installed in the consuming project

## Peer Dependencies

Make sure to install these peer dependencies in your consuming project:

```bash
npm install react react-dom @mui/material @mui/system @mui/icons-material redux react-redux reactflow
```

## Error Handling

The library uses a context-based error handling system. All errors are routed through the ErrorContext, which provides:

-   `error`: Current error state
-   `setError`: Function to set/clear errors
-   `handleError`: Function to handle errors (used internally)

## Build Format

This library is built as a UMD module to ensure maximum compatibility across different module systems and avoid ESM import resolution issues.

## TypeScript Support

The library includes TypeScript definitions. Import types as needed:

```tsx
import { FlowiseCanvasProps, FlowiseProviderProps } from 'flowise-ui'
```
