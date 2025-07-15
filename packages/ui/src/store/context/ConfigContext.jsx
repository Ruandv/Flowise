import platformsettingsApi from '@/api/platformsettings'
import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from 'react'

const ConfigContext = createContext()

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState({})
    const [loading, setLoading] = useState(true)
    const [isEnterpriseLicensed, setEnterpriseLicensed] = useState(false)
    const [isCloud, setCloudLicensed] = useState(false)
    const [isOpenSource, setOpenSource] = useState(false)

    useEffect(() => {
        const userSettings = platformsettingsApi.getSettings()
        Promise.all([userSettings])
            .then(([currentSettingsData]) => {
                // Check if the response exists and has the expected structure
                if (!currentSettingsData || !currentSettingsData.data) {
                    console.warn('Settings API returned invalid response:', currentSettingsData)
                    // Set defaults for open source platform
                    setConfig({ PLATFORM_TYPE: 'opensource' })
                    setOpenSource(true)
                    setEnterpriseLicensed(false)
                    setCloudLicensed(false)
                    setLoading(false)
                    return
                }

                const finalData = {
                    ...currentSettingsData.data
                }
                setConfig(finalData)
                if (finalData.PLATFORM_TYPE) {
                    if (finalData.PLATFORM_TYPE === 'enterprise') {
                        setEnterpriseLicensed(true)
                        setCloudLicensed(false)
                        setOpenSource(false)
                    } else if (finalData.PLATFORM_TYPE === 'cloud') {
                        setCloudLicensed(true)
                        setEnterpriseLicensed(false)
                        setOpenSource(false)
                    } else {
                        setOpenSource(true)
                        setEnterpriseLicensed(false)
                        setCloudLicensed(false)
                    }
                } else {
                    // Default to open source if no platform type
                    setOpenSource(true)
                    setEnterpriseLicensed(false)
                    setCloudLicensed(false)
                }

                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                // Set defaults on error
                setConfig({ PLATFORM_TYPE: 'opensource' })
                setOpenSource(true)
                setEnterpriseLicensed(false)
                setCloudLicensed(false)
                setLoading(false)
            })
    }, [])

    return (
        <ConfigContext.Provider value={{ config, loading, isEnterpriseLicensed, isCloud, isOpenSource }}>{children}</ConfigContext.Provider>
    )
}

export const useConfig = () => useContext(ConfigContext)

ConfigProvider.propTypes = {
    children: PropTypes.any
}
