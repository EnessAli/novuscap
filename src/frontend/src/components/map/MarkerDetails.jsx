import React from 'react';
import { 
    BuildingOfficeIcon,
    GlobeAltIcon,
    MapPinIcon,
    CalendarIcon,
    PhoneIcon,
    EnvelopeIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const MarkerDetails = ({ organization, onClose }) => {
    if (!organization) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <MapPinIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Organizasyon Seçilmedi</h3>
                <p className="text-gray-600">
                    Detayları görüntülemek için haritadan bir organizasyon seçin.
                </p>
            </div>
        );
    }

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

    const getTypeBadgeColor = (type) => {
        switch (type?.toLowerCase()) {
            case 'company':
                return 'bg-blue-100 text-blue-800';
            case 'ngo':
                return 'bg-green-100 text-green-800';
            case 'government':
                return 'bg-red-100 text-red-800';
            case 'education':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const TypeIcon = getTypeIcon(organization.organizationType?.name);

    const formatDate = (dateString) => {
        if (!dateString) return 'Belirtilmemiş';
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="relative">
                {/* Close Button */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all"
                    >
                        <XMarkIcon className="h-5 w-5 text-gray-600" />
                    </button>
                )}

                {/* Cover Image or Gradient */}
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>

                {/* Organization Logo & Name */}
                <div className="absolute -bottom-8 left-6">
                    <div className="flex items-end space-x-4">
                        {organization.logoUrl ? (
                            <img 
                                src={organization.logoUrl} 
                                alt={`${organization.name} logo`}
                                className="w-16 h-16 rounded-xl border-4 border-white object-cover bg-white"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}
                        <div 
                            className={`w-16 h-16 rounded-xl border-4 border-white bg-gray-100 flex items-center justify-center ${
                                organization.logoUrl ? 'hidden' : 'flex'
                            }`}
                        >
                            <TypeIcon className="h-8 w-8 text-gray-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="pt-12 px-6 pb-6">
                {/* Name and Type */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {organization.name}
                    </h2>
                    {organization.organizationType && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            getTypeBadgeColor(organization.organizationType.name)
                        }`}>
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {organization.organizationType.name}
                        </span>
                    )}
                </div>

                {/* Description */}
                {organization.description && (
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Açıklama</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {organization.description}
                        </p>
                    </div>
                )}

                {/* Contact Information */}
                <div className="space-y-4">
                    {organization.website && (
                        <div className="flex items-center space-x-3">
                            <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Website</p>
                                <a 
                                    href={organization.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-800 break-all"
                                >
                                    {organization.website}
                                </a>
                            </div>
                        </div>
                    )}

                    {organization.email && (
                        <div className="flex items-center space-x-3">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">E-posta</p>
                                <a 
                                    href={`mailto:${organization.email}`}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    {organization.email}
                                </a>
                            </div>
                        </div>
                    )}

                    {organization.phone && (
                        <div className="flex items-center space-x-3">
                            <PhoneIcon className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Telefon</p>
                                <a 
                                    href={`tel:${organization.phone}`}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    {organization.phone}
                                </a>
                            </div>
                        </div>
                    )}

                    {(organization.latitude && organization.longitude) && (
                        <div className="flex items-center space-x-3">
                            <MapPinIcon className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Konum</p>
                                <p className="text-sm text-gray-600">
                                    {parseFloat(organization.latitude).toFixed(4)}, {parseFloat(organization.longitude).toFixed(4)}
                                </p>
                            </div>
                        </div>
                    )}

                    {organization.address && (
                        <div className="flex items-start space-x-3">
                            <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Adres</p>
                                <p className="text-sm text-gray-600">
                                    {organization.address}
                                </p>
                            </div>
                        </div>
                    )}

                    {organization.createdAt && (
                        <div className="flex items-center space-x-3">
                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Kayıt Tarihi</p>
                                <p className="text-sm text-gray-600">
                                    {formatDate(organization.createdAt)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex space-x-3">
                    {organization.website && (
                        <a
                            href={organization.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
                        >
                            Website'yi Ziyaret Et
                        </a>
                    )}
                    
                    {(organization.latitude && organization.longitude) && (
                        <button
                            onClick={() => {
                                const url = `https://www.google.com/maps?q=${organization.latitude},${organization.longitude}`;
                                window.open(url, '_blank');
                            }}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
                        >
                            Haritada Göster
                        </button>
                    )}
                </div>

                {/* Additional Info */}
                {organization.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                            Organizasyon ID: {organization.id}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarkerDetails;