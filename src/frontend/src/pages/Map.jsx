import React, { useState, useEffect } from 'react';
import { useMap } from '../contexts/MapContext';
import GoogleMapComponent from '../components/map/GoogleMap';
import { 
    MagnifyingGlassIcon, 
    FunnelIcon, 
    MapPinIcon,
    BuildingOfficeIcon,
    UserGroupIcon,
    LightBulbIcon,
    AdjustmentsHorizontalIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const Map = () => {
    const {
        organizations,
        organizationTypes,
        loading,
        filters,
        applyFilters,
        searchOrganizations,
        userLocation,
        getNearbyOrganizations
    } = useMap();

    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const [searchRadius, setSearchRadius] = useState(filters.radius || 10);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    // Available cities for filtering
    const cities = [
        'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Gaziantep', 
        'Konya', 'Kayseri', 'Mersin', 'Eskişehir', 'Diyarbakır', 'Samsun'
    ];

    // Handle search
    const handleSearch = async () => {
        try {
            await searchOrganizations(searchTerm);
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    // Handle filter application
    const handleFilterApply = async () => {
        const newFilters = {
            organizationType: selectedTypes.length > 0 ? selectedTypes : null,
            location: selectedCity || null,
            searchTerm: searchTerm || null,
            radius: searchRadius
        };
        
        try {
            await applyFilters(newFilters);
            setShowFilters(false);
            toast.success('Filtreler uygulandı');
        } catch (error) {
            console.error('Filter application failed:', error);
            toast.error('Filtreler uygulanırken hata oluştu');
        }
    };

    // Handle nearby search
    const handleNearbySearch = async () => {
        if (!userLocation) {
            toast.warning('Önce konumunuza erişim izni vermeniz gerekiyor');
            return;
        }
        
        try {
            await getNearbyOrganizations(
                userLocation.lat, 
                userLocation.lng, 
                searchRadius
            );
            toast.success(`${searchRadius} km çapında arama yapıldı`);
        } catch (error) {
            console.error('Nearby search failed:', error);
            toast.error('Yakındaki organizasyonlar bulunamadı');
        }
    };

    // Handle organization type toggle
    const handleTypeToggle = (typeId) => {
        setSelectedTypes(prev => 
            prev.includes(typeId) 
                ? prev.filter(id => id !== typeId)
                : [...prev, typeId]
        );
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedTypes([]);
        setSelectedCity('');
        setSearchTerm('');
        setSearchRadius(10);
        applyFilters({});
    };

    // Organization stats
    const orgs = organizations.items ?? [];
    const stats = {
        total: orgs.length,
        startups: orgs.filter(org => org.organizationType?.name === 'Startup').length,
        investors: orgs.filter(org => org.organizationType?.name === 'Yatırımcı').length,
        incubators: orgs.filter(org => org.organizationType?.name === 'İnkübatör').length
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Harita yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <MapPinIcon className="h-8 w-8 text-blue-600" />
                            <h1 className="text-xl font-semibold text-gray-900">Organizasyon Haritası</h1>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {/* Stats */}
                            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <BuildingOfficeIcon className="h-4 w-4" />
                                    <span>{stats.total} Toplam</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <LightBulbIcon className="h-4 w-4 text-green-600" />
                                    <span>{stats.startups} Startup</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <UserGroupIcon className="h-4 w-4 text-blue-600" />
                                    <span>{stats.investors} Yatırımcı</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white border-b px-4 sm:px-6 lg:px-8 py-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Organizasyon ara..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                            <button
                                onClick={handleSearch}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Ara
                            </button>
                            
                            <button
                                onClick={handleNearbySearch}
                                disabled={!userLocation}
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                title={!userLocation ? 'Konum erişimi gerekli' : 'Yakınımdakileri bul'}
                            >
                                Yakında
                            </button>
                            
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`relative px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                    showFilters 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <FunnelIcon className="h-5 w-5" />
                                    <span>Filtrele</span>
                                </div>
                                {(selectedTypes.length > 0 || selectedCity) && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {selectedTypes.length + (selectedCity ? 1 : 0)}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Filter Panel */}
                    {showFilters && (
                        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Organization Types */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Organizasyon Türü
                                    </label>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {organizationTypes.map((type) => (
                                            <label key={type.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTypes.includes(type.id)}
                                                    onChange={() => handleTypeToggle(type.id)}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">{type.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* City Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Şehir
                                    </label>
                                    <select
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Tüm Şehirler</option>
                                        {cities.map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Search Radius */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Arama Yarıçapı: {searchRadius} km
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={searchRadius}
                                        onChange={(e) => setSearchRadius(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>1 km</span>
                                        <span>100 km</span>
                                    </div>
                                </div>
                            </div>

                            {/* Filter Actions */}
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    onClick={clearFilters}
                                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Temizle
                                </button>
                                <button
                                    onClick={handleFilterApply}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Uygula
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative">
                <GoogleMapComponent
                    organizations={organizations}
                    selectedOrganization={selectedOrganization}
                    onMarkerClick={setSelectedOrganization}
                    onLocationSelect={(location) => {
                        console.log('Location selected:', location);
                    }}
                />
            </div>

            {/* Selected Organization Panel */}
            {selectedOrganization && (
                <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                    <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 pr-2">
                                {selectedOrganization.name}
                            </h3>
                            <button
                                onClick={() => setSelectedOrganization(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {selectedOrganization.organizationType?.name}
                            </span>
                            
                            <p className="text-gray-700">{selectedOrganization.description}</p>
                            
                            <div className="text-gray-600">
                                <p><strong>Adres:</strong> {selectedOrganization.address?.street}</p>
                                <p>{selectedOrganization.address?.city}, {selectedOrganization.address?.country}</p>
                                
                                {selectedOrganization.phone && (
                                    <p><strong>Tel:</strong> 
                                        <a href={`tel:${selectedOrganization.phone}`} className="ml-1 text-blue-600 hover:underline">
                                            {selectedOrganization.phone}
                                        </a>
                                    </p>
                                )}
                                
                                {selectedOrganization.email && (
                                    <p><strong>Email:</strong>
                                        <a href={`mailto:${selectedOrganization.email}`} className="ml-1 text-blue-600 hover:underline">
                                            {selectedOrganization.email}
                                        </a>
                                    </p>
                                )}
                            </div>
                            
                            <div className="flex space-x-2 pt-3">
                                <button
                                    onClick={() => window.open(
                                        `https://www.google.com/maps/dir/?api=1&destination=${selectedOrganization.latitude},${selectedOrganization.longitude}`,
                                        '_blank'
                                    )}
                                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
                                >
                                    Yol Tarifi
                                </button>
                                
                                {selectedOrganization.website && (
                                    <button
                                        onClick={() => window.open(
                                            selectedOrganization.website.startsWith('http') 
                                                ? selectedOrganization.website 
                                                : `https://${selectedOrganization.website}`,
                                            '_blank'
                                        )}
                                        className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
                                    >
                                        Website
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Map;