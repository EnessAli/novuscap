import React from 'react';
import { 
    BuildingOfficeIcon,
    GlobeAltIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

const MapMarker = ({ organization, onClick, isSelected = false }) => {
    if (!organization) return null;

    const handleClick = (e) => {
        e.stopPropagation();
        onClick && onClick(organization);
    };

    const getMarkerColor = (type) => {
        switch (type?.toLowerCase()) {
            case 'company':
                return 'bg-blue-500 border-blue-600';
            case 'ngo':
                return 'bg-green-500 border-green-600';
            case 'government':
                return 'bg-red-500 border-red-600';
            case 'education':
                return 'bg-purple-500 border-purple-600';
            default:
                return 'bg-gray-500 border-gray-600';
        }
    };

    const getTypeIcon = (type) => {
        switch (type?.toLowerCase()) {
            case 'company':
                return BuildingOfficeIcon;
            case 'ngo':
                return GlobeAltIcon;
            case 'government':
                return BuildingOfficeIcon;
            case 'education':
                return BuildingOfficeIcon;
            default:
                return MapPinIcon;
        }
    };

    const TypeIcon = getTypeIcon(organization.organizationType?.name);

    return (
        <div 
            className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200 ${
                isSelected ? 'scale-110 z-20' : 'z-10 hover:scale-105'
            }`}
            onClick={handleClick}
            style={{
                left: '50%',
                top: '0%'
            }}
        >
            {/* Marker Pin */}
            <div className={`relative w-8 h-8 rounded-full border-2 ${getMarkerColor(organization.organizationType?.name)} ${
                isSelected ? 'ring-4 ring-white ring-opacity-75' : ''
            }`}>
                {organization.logoUrl ? (
                    <img 
                        src={organization.logoUrl} 
                        alt={organization.name}
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                
                {/* Fallback Icon */}
                <div 
                    className={`w-full h-full rounded-full flex items-center justify-center ${
                        organization.logoUrl ? 'hidden' : 'flex'
                    }`}
                >
                    <TypeIcon className="h-4 w-4 text-white" />
                </div>

                {/* Pin Point */}
                <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent ${
                    getMarkerColor(organization.organizationType?.name).replace('bg-', 'border-t-')
                }`} />
            </div>

            {/* Info Popup */}
            {isSelected && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white rounded-lg shadow-lg border p-4 z-30">
                    <div className="flex items-start space-x-3">
                        {organization.logoUrl ? (
                            <img 
                                src={organization.logoUrl} 
                                alt={organization.name}
                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            />
                        ) : (
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getMarkerColor(organization.organizationType?.name)}`}>
                                <TypeIcon className="h-6 w-6 text-white" />
                            </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                                {organization.name}
                            </h3>
                            {organization.organizationType && (
                                <p className="text-xs text-gray-500 mt-1">
                                    {organization.organizationType.name}
                                </p>
                            )}
                            {organization.description && (
                                <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                                    {organization.description}
                                </p>
                            )}
                            {organization.website && (
                                <a 
                                    href={organization.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-500 hover:text-blue-600 mt-2 inline-block"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Website'yi ziyaret et
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Popup Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white" />
                </div>
            )}

            {/* Pulsing Animation for Selected */}
            {isSelected && (
                <div className={`absolute inset-0 rounded-full ${getMarkerColor(organization.organizationType?.name)} animate-ping opacity-20`} />
            )}
        </div>
    );
};

export default MapMarker;