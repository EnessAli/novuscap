import React, { createContext, useState, useEffect, useContext } from 'react';
import mapService from '../services/mapService';
import organizationTypeService from '../services/organizationTypeService';
import locationService from '../services/locationService';
import { toast } from 'react-toastify';

const MapContext = createContext();

export const useMap = () => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('useMap must be used within a MapProvider');
    }
    return context;
};

export const MapProvider = ({ children }) => {
    const [organizations, setOrganizations] = useState([]);
    const [organizationTypes, setOrganizationTypes] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [mapCenter, setMapCenter] = useState(mapService.getDefaultCenter());
    const [mapZoom, setMapZoom] = useState(7);
    const [filters, setFilters] = useState({
        organizationType: '',
        location: '',
        searchTerm: '',
        radius: 10
    });
    const [loading, setLoading] = useState(true);
    const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

    // Initialize Google Maps ve load data
    useEffect(() => {
        const initializeMap = async () => {
            try {
                setLoading(true);
                // Sadece veri yükle, Google Maps script yükleme fonksiyonu kaldırıldı
                await Promise.all([
                    loadOrganizations(),
                    loadOrganizationTypes(),
                    loadLocations(),
                    getCurrentLocation()
                ]);
            } catch (error) {
                console.error('Map initialization failed:', error);
                toast.error('Harita yüklenirken bir hata oluştu');
            } finally {
                setLoading(false);
            }
        };

        initializeMap();
    }, []);

    // Load organizations with current filters
    const loadOrganizations = async (customFilters = null) => {
        try {
            const filterParams = customFilters || filters;
            const response = await mapService.getOrganizationsForMap(filterParams);
            setOrganizations(response);
            return response;
        } catch (error) {
            console.error('Failed to load organizations:', error);
            toast.error('Organizasyonlar yüklenirken bir hata oluştu');
            throw error;
        }
    };

    // Load organization types
    const loadOrganizationTypes = async () => {
        try {
            const response = await organizationTypeService.getOrganizationTypes();
            setOrganizationTypes(response.data || response);
            return response;
        } catch (error) {
            console.error('Failed to load organization types:', error);
            toast.error('Organizasyon türleri yüklenirken bir hata oluştu');
            throw error;
        }
    };

    // Load locations
    const loadLocations = async () => {
        try {
            const response = await locationService.getLocations();
            setLocations(response.data || response);
            return response;
        } catch (error) {
            console.error('Failed to load locations:', error);
            toast.error('Konumlar yüklenirken bir hata oluştu');
            throw error;
        }
    };

    // Get user's current location
    const getCurrentLocation = async () => {
        try {
            const location = await mapService.getCurrentLocation();
            setUserLocation(location);
            setMapCenter(location);
            setMapZoom(10);
            return location;
        } catch (error) {
            console.error('Failed to get current location:', error);
            // Don't show error toast for location permission denial
            return null;
        }
    };

    // Get nearby organizations
    const getNearbyOrganizations = async (latitude, longitude, radiusKm = 10) => {
        try {
            const response = await mapService.getNearbyOrganizations(latitude, longitude, radiusKm);
            return response;
        } catch (error) {
            console.error('Failed to get nearby organizations:', error);
            toast.error('Yakındaki organizasyonlar alınırken bir hata oluştu');
            throw error;
        }
    };

    // Search organizations
    const searchOrganizations = async (searchTerm) => {
        try {
            const searchFilters = { ...filters, searchTerm };
            const response = await loadOrganizations(searchFilters);
            setFilters(searchFilters);
            return response;
        } catch (error) {
            console.error('Search failed:', error);
            toast.error('Arama sırasında bir hata oluştu');
            throw error;
        }
    };

    // Apply filters
    const applyFilters = async (newFilters) => {
        try {
            const updatedFilters = { ...filters, ...newFilters };
            setFilters(updatedFilters);
            await loadOrganizations(updatedFilters);
        } catch (error) {
            console.error('Filter application failed:', error);
            toast.error('Filtreler uygulanırken bir hata oluştu');
            throw error;
        }
    };

    // Clear filters
    const clearFilters = async () => {
        const defaultFilters = {
            organizationType: '',
            location: '',
            searchTerm: '',
            radius: 10
        };
        setFilters(defaultFilters);
        await loadOrganizations(defaultFilters);
    };

    // Set map instance
    const setMap = (map) => {
        setMapInstance(map);
    };

    // Update map center and zoom
    const updateMapView = (center, zoom) => {
        setMapCenter(center);
        setMapZoom(zoom);
        if (mapInstance) {
            mapInstance.setCenter(center);
            mapInstance.setZoom(zoom);
        }
    };

    // Select organization for details view
    const selectOrganization = async (organizationId) => {
        try {
            if (organizationId) {
                const organization = await mapService.getOrganizationDetails(organizationId);
                setSelectedOrganization(organization);
            } else {
                setSelectedOrganization(null);
            }
        } catch (error) {
            console.error('Failed to load organization details:', error);
            toast.error('Organizasyon detayları yüklenirken bir hata oluştu');
        }
    };

    // Refresh all data
    const refreshData = async () => {
        try {
            setLoading(true);
            await Promise.all([
                loadOrganizations(),
                loadOrganizationTypes(),
                loadLocations()
            ]);
        } catch (error) {
            console.error('Data refresh failed:', error);
            toast.error('Veriler yeniden yüklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const value = {
        // Data
        organizations,
        organizationTypes,
        locations,
        selectedOrganization,
        
        // Map state
        mapInstance,
        mapCenter,
        mapZoom,
        userLocation,
        filters,
        loading,
        isGoogleMapsLoaded,

        // Actions
        loadOrganizations,
        loadOrganizationTypes,
        loadLocations,
        getCurrentLocation,
        getNearbyOrganizations,
        searchOrganizations,
        applyFilters,
        clearFilters,
        setMap,
        updateMapView,
        selectOrganization,
        refreshData,
        setUserLocation // <-- Eksik olan fonksiyon eklendi
    };

    return (
        <MapContext.Provider value={value}>
            {children}
        </MapContext.Provider>
    );
};

export default MapContext;