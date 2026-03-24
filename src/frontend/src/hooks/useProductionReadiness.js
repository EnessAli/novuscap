import { useState, useEffect } from 'react';

export const useProductionReadiness = () => {
    const [checks, setChecks] = useState({
        apiConnection: false,
        googleMapsLoaded: false,
        environmentVariables: false,
        performanceOptimized: false
    });

    const [loading, setLoading] = useState(true);
    const [overallHealth, setOverallHealth] = useState(false);

    useEffect(() => {
        performHealthChecks();
    }, []);

    const performHealthChecks = async () => {
        setLoading(true);
        
        const results = {
            apiConnection: await checkApiConnection(),
            googleMapsLoaded: checkGoogleMapsLoaded(),
            environmentVariables: checkEnvironmentVariables(),
            performanceOptimized: checkPerformanceOptimizations()
        };

        setChecks(results);
        setOverallHealth(Object.values(results).every(check => check));
        setLoading(false);
    };

    const checkApiConnection = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/health`, {
                method: 'GET',
                timeout: 5000
            });
            return response.ok;
        } catch (error) {
            console.warn('API Health Check Failed:', error);
            return false;
        }
    };

    const checkGoogleMapsLoaded = () => {
        return window.google && window.google.maps && 
               !!process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    };

    const checkEnvironmentVariables = () => {
        const requiredVars = [
            'REACT_APP_API_URL',
            'REACT_APP_GOOGLE_MAPS_API_KEY'
        ];
        
        return requiredVars.every(varName => !!process.env[varName]);
    };

    const checkPerformanceOptimizations = () => {
        // Check if source maps are disabled in production
        const sourceMapsDisabled = process.env.NODE_ENV === 'production' && 
                                   process.env.GENERATE_SOURCEMAP === 'false';
        
        // Check if service worker is enabled
        const serviceWorkerEnabled = 'serviceWorker' in navigator;
        
        return sourceMapsDisabled && serviceWorkerEnabled;
    };

    return {
        checks,
        loading,
        overallHealth,
        refresh: performHealthChecks
    };
};

export default useProductionReadiness;
