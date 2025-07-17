import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

// material-ui
import { styled, useTheme } from '@mui/material/styles'
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material'

// project imports
import Header from './Header'
import Sidebar from './Sidebar'
import { drawerWidth, headerHeight } from '@/store/constant'
import { SET_MENU } from '@/store/actions'

// View imports
import AgentFlows from '@/views/agentflows'

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        backgroundColor: 'transparent',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginRight: 0,
        [theme.breakpoints.up('md')]: {
            marginLeft: -drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        backgroundColor: 'transparent',
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        marginRight: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`
    })
}))

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ navigateTo }) => {
    const theme = useTheme()
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'))

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened)
    const dispatch = useDispatch()
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened })
    }

    useEffect(() => {
        setTimeout(() => dispatch({ type: SET_MENU, opened: !matchDownMd }), 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            {/* <AppBar
                enableColorOnDark
                position='fixed'
                color='inherit'
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >  */}
            <Toolbar
                sx={{
                    height: `${headerHeight}px`,
                    'min-width': '100%',
                    borderBottom: '1px solid',
                    borderColor: theme.palette.grey[900] + 25
                }}
            >
                <Header handleLeftDrawerToggle={handleLeftDrawerToggle} navigateTo={navigateTo} />
            </Toolbar>
            {/* </AppBar> */}

            {/* drawer */}
            <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

            {/* main content */}
            <Main theme={theme} open={leftDrawerOpened}>
                <Routes>
                    {/* <Route path="/" element={<AgentFlows navigateTo={navigateTo} />} /> */}
                    <Route path='/agentflows' element={<AgentFlows navigateTo={navigateTo} />} />
                    <Route path='chatflows/*' element={<div>ChatFlows Component NO SLASH</div>} />
                    <Route path='/chatflows/*' element={<div>sss ChatFlows Component NO SLASH</div>} />
                    <Route path='/chatflows' element={<div>ChatFlows Component</div>} />
                    <Route path='/tools' element={<div>Tools Component</div>} />
                    <Route path='/credentials' element={<div>Credentials Component</div>} />
                    <Route path='/variables' element={<div>Variables Component</div>} />
                    <Route path='/marketplaces' element={<div>Marketplaces Component</div>} />
                    <Route path='/apikey' element={<div>API Key Component</div>} />
                    <Route path='/assistants' element={<div>Assistants Component</div>} />
                    <Route path='/executions' element={<div>Executions Component</div>} />
                </Routes>
            </Main>
        </Box>
    )
}

export default MainLayout
