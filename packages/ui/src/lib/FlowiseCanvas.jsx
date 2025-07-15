import React from 'react'
// import Canvas from '../views/agentflowsv2/Canvas'
import { FlowiseProvider } from './FlowiseProvider'
import MainLayout from '../layout/MainLayout'

/**
 * FlowiseCanvas - A standalone React component that wraps the Flowise Canvas
 * @param {Object} props - Component props
 * @param {Object} props.chatflow - Flow data object
 * @param {Function} props.navigateTo - Navigation function (optional)
 * @param {String} props.initialPath - Initial path for MemoryRouter (optional)
 * @param {Object} props.locationTo - Location object that may contain state
 * @param {Object} props.currentPath - Current path in the consuming application (for syncing)
 * @returns {JSX.Element} The FlowiseCanvas component
 */
const FlowiseCanvas = ({ chatflow, navigateTo, locationTo, initialPath = '/', currentPath, ...props }) => {
    // Use either explicitly provided initialPath or derive from locationTo or currentPath
    const effectivePath = initialPath || locationTo?.pathname || currentPath || '/'

    return (
        <FlowiseProvider navigateTo={navigateTo} initialPath={effectivePath}>
            <MainLayout navigateTo={navigateTo} locationTo={locationTo} {...props} />
        </FlowiseProvider>
    )
}

export default FlowiseCanvas
