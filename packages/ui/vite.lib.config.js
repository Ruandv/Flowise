import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    build: {
        lib: {
            minify: false,
            sourcemap: true,
            entry: resolve(__dirname, 'src/lib/index.js'),
            name: 'FlowiseUI',
            formats: ['es', 'umd'],
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                '@mui/material',
                '@mui/icons-material',
                'reactflow',
                'lodash',
                'react-redux',
                'redux',
                '@reduxjs/toolkit',
                'moment'
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                    '@mui/material': 'MaterialUI',
                    reactflow: 'ReactFlow',
                    lodash: '_',
                    'react-redux': 'ReactRedux',
                    redux: 'Redux',
                    '@reduxjs/toolkit': 'RTK'
                }
            }
        },
        outDir: 'dist',
        cssCodeSplit: false,
        sourcemap: true, // Add this for debugging
        minify: false // Optional: disable minification for debugging
    }
})
