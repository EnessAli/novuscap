import React from 'react';
import { 
    CheckCircleIcon, 
    XCircleIcon, 
    ClockIcon,
    ServerIcon,
    MapIcon,
    CogIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline';
import useProductionReadiness from '../../hooks/useProductionReadiness';

const SystemStatus = ({ onClose }) => {
    const { checks, loading, overallHealth, refresh } = useProductionReadiness();

    const StatusIcon = ({ status, loading }) => {
        if (loading) return <ClockIcon className="h-5 w-5 text-yellow-500 animate-spin" />;
        return status ? 
            <CheckCircleIcon className="h-5 w-5 text-green-500" /> : 
            <XCircleIcon className="h-5 w-5 text-red-500" />;
    };

    const checkItems = [
        {
            key: 'apiConnection',
            label: 'Backend API Bağlantısı',
            description: 'Backend API servisine erişim',
            icon: ServerIcon
        },
        {
            key: 'googleMapsLoaded',
            label: 'Google Maps API',
            description: 'Google Maps servisleri yüklü',
            icon: MapIcon
        },
        {
            key: 'environmentVariables',
            label: 'Environment Variables',
            description: 'Gerekli environment değişkenleri',
            icon: CogIcon
        },
        {
            key: 'performanceOptimized',
            label: 'Performance Optimizasyonu',
            description: 'Production optimizasyonları aktif',
            icon: RocketLaunchIcon
        }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Sistem Durumu
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <XCircleIcon className="h-5 w-5" />
                    </button>
                </div>

                {/* Overall Status */}
                <div className={`mb-4 p-3 rounded-lg ${
                    loading ? 'bg-yellow-50 border border-yellow-200' :
                    overallHealth ? 'bg-green-50 border border-green-200' : 
                    'bg-red-50 border border-red-200'
                }`}>
                    <div className="flex items-center">
                        <StatusIcon status={overallHealth} loading={loading} />
                        <span className={`ml-2 font-medium ${
                            loading ? 'text-yellow-800' :
                            overallHealth ? 'text-green-800' : 'text-red-800'
                        }`}>
                            {loading ? 'Kontrol Ediliyor...' :
                             overallHealth ? 'Tüm Sistemler Çalışıyor' : 
                             'Sistemde Sorunlar Var'}
                        </span>
                    </div>
                </div>

                {/* Individual Checks */}
                <div className="space-y-3">
                    {checkItems.map((item) => {
                        const IconComponent = item.icon;
                        const status = checks[item.key];
                        
                        return (
                            <div key={item.key} className="flex items-center justify-between p-3 rounded-lg border">
                                <div className="flex items-center">
                                    <IconComponent className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <div className="font-medium text-gray-900">
                                            {item.label}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                                <StatusIcon status={status} loading={loading} />
                            </div>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="mt-6 flex space-x-3">
                    <button
                        onClick={refresh}
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Kontrol Ediliyor...' : 'Yenile'}
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                    >
                        Kapat
                    </button>
                </div>

                {/* Environment Info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 space-y-1">
                        <div>Environment: {process.env.NODE_ENV}</div>
                        <div>Version: {process.env.REACT_APP_VERSION || '1.0.0'}</div>
                        <div>Build Time: {new Date().toLocaleString('tr-TR')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemStatus;
