// Type definitions for FlowiseCanvas library

export interface FlowiseCanvasProps {
    chatflow?: any
    navigateTo?: (path: string) => void
    [key: string]: any
}

export interface FlowiseProviderProps {
    children: React.ReactNode
    theme?: 'light' | 'dark'
    customStore?: any
    navigateTo?: (path: string) => void
}

export interface ErrorContextType {
    error: Error | null
    setError: (error: Error | null) => void
    handleError: (error: Error) => void
}

export interface UseErrorHook {
    (): ErrorContextType
}

// Error handling hook
export declare const useError: UseErrorHook

// Main components
export declare const FlowiseCanvas: React.FC<FlowiseCanvasProps>
export declare const FlowiseProvider: React.FC<FlowiseProviderProps>
