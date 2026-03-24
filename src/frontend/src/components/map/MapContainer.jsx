import React, { useCallback, useRef, useEffect } from 'react';
import { useMap } from '../../contexts/MapContext';
import MapMarker from './MapMarker';
import { 
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

const MapContainer = () => {
    const mapRef = useRef(null);
    const { 
        organizations, 
        filteredOrganizations,
        selectedOrganization,
        setSelectedOrganization,
        searchTerm,
        setSearchTerm,
        filters,
        updateFilter,
        isLoading,
        error
    } = useMap();

    const [map, setMap] = React.useState(null);
    const [markers, setMarkers] = React.useState([]);

    // Initialize map
    const onMapLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
    }, []);

    // Create markers when organizations or map changes
    useEffect(() => {
        if (!map || !filteredOrganizations.length) return;

        // Clear existing markers
        markers.forEach(marker => marker.setMap(null));

        // Create new markers
        const newMarkers = filteredOrganizations
            .filter(org => org.latitude && org.longitude)
            .map(org => {
                const marker = new window.google.maps.Marker({
                    position: { 
                        lat: parseFloat(org.latitude), 
                        lng: parseFloat(org.longitude) 
                    },
                    map: map,
                    title: org.name,
                    icon: {
                        url: org.logoUrl || '/default-marker.png',
                        scaledSize: new window.google.maps.Size(40, 40),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(20, 40)
                    }
                });

                marker.addListener('click', () => {
                    setSelectedOrganization(org);
                });

                return marker;
            });

        setMarkers(newMarkers);

        return () => {
            newMarkers.forEach(marker => marker.setMap(null));
        };
    }, [map, filteredOrganizations, setSelectedOrganization]);

    // Center map on selected organization
    useEffect(() => {
        if (map && selectedOrganization && selectedOrganization.latitude && selectedOrganization.longitude) {
            map.panTo({
                lat: parseFloat(selectedOrganization.latitude),
                lng: parseFloat(selectedOrganization.longitude)
            });
            map.setZoom(15);
        }
    }, [map, selectedOrganization]);

    if (error) {
        return (
            <div className="flex items-center justify-center h-64 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-center">
                    <MapPinIcon className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <p className="text-red-800">Harita yüklenirken hata oluştu</p>
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-full w-full">
            {/* Search and Filters */}
            <div className="absolute top-4 left-4 right-4 z-10 space-y-4">
                {/* Search Bar */}
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Organizasyon ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <button
                            onClick={() => updateFilter('showFilters', !filters.showFilters)}
                            className={`p-2 rounded-md ${
                                filters.showFilters 
                                    ? 'bg-blue-100 text-blue-700' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <AdjustmentsHorizontalIcon className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Filters */}
                    {filters.showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Organizasyon Türü
                                    </label>
                                    <select
                                        value={filters.organizationType}
                                        onChange={(e) => updateFilter('organizationType', e.target.value)}
                                        className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="">Tümü</option>
                                        <option value="company">Şirket</option>
                                        <option value="ngo">STK</option>
                                        <option value="government">Kamu</option>
                                        <option value="education">Eğitim</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Şehir
                                    </label>
                                    <select
                                        value={filters.city}
                                        onChange={(e) => updateFilter('city', e.target.value)}
                                        className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="">Tümü</option>
                                        <option value="istanbul">İstanbul</option>
                                        <option value="ankara">Ankara</option>
                                        <option value="izmir">İzmir</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Sıralama
                                    </label>
                                    <select
                                        value={filters.sortBy}
                                        onChange={(e) => updateFilter('sortBy', e.target.value)}
                                        className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="name">İsim</option>
                                        <option value="date">Tarih</option>
                                        <option value="type">Tür</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Counter */}
                <div className="bg-white rounded-lg shadow px-4 py-2">
                    <p className="text-sm text-gray-600">
                        {filteredOrganizations.length} organizasyon bulundu
                        {searchTerm && ` "${searchTerm}" için`}
                    </p>
                </div>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">Harita yükleniyor...</p>
                    </div>
                </div>
            )}

            {/* Google Map */}
            <div 
                ref={mapRef}
                className="w-full h-full"
                style={{ minHeight: '400px' }}
            />

            {/* Initialize Google Map */}
            <GoogleMapComponent onLoad={onMapLoad} />
        </div>
    );
};

// Separate component for Google Map initialization
const GoogleMapComponent = ({ onLoad }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (window.google && mapRef.current) {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 39.9334, lng: 32.8597 }, // Ankara coordinates
                zoom: 7,
                mapTypeControl: true,
                streetViewControl: true,
                fullscreenControl: true,
                zoomControl: true,
                styles: [
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [{ visibility: 'off' }]
                    }
                ]
            });

            onLoad(map);
        }
    }, [onLoad]);

    return <div ref={mapRef} className="w-full h-full" />;
};