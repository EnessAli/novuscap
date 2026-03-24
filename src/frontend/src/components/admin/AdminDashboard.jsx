import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import organizationService from '../../services/organizationService';
import userService from '../../services/userService';
import { 
    ChartBarIcon, 
    UserGroupIcon, 
    BuildingOfficeIcon,
    MapPinIcon,
    DocumentTextIcon 
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
    const { data: organizations = [], isLoading: orgsLoading } = useQuery({
        queryKey: ['organizations'],
        queryFn: organizationService.getOrganizations
    });

    const { data: users = [], isLoading: usersLoading } = useQuery({
        queryKey: ['users'],
        queryFn: userService.getUsers
    });

    const stats = [
        {
            name: 'Toplam Kullanıcı',
            value: users.length,
            icon: UserGroupIcon,
            color: 'bg-blue-500'
        },
        {
            name: 'Toplam Organizasyon',
            value: organizations.length,
            icon: BuildingOfficeIcon,
            color: 'bg-green-500'
        },
        {
            name: 'Harita Noktaları',
            value: organizations.filter(org => org.latitude && org.longitude).length,
            icon: MapPinIcon,
            color: 'bg-purple-500'
        },
        {
            name: 'Raporlar',
            value: 0, // Will be updated when reports are implemented
            icon: DocumentTextIcon,
            color: 'bg-orange-500'
        }
    ];

    const quickActions = [
        {
            name: 'Organizasyonları Yönet',
            description: 'Organizasyonları görüntüle, düzenle ve sil',
            href: '/admin/organizations',
            icon: BuildingOfficeIcon,
            color: 'bg-blue-500 hover:bg-blue-600'
        },
        {
            name: 'Kullanıcıları Yönet',
            description: 'Kullanıcı hesaplarını yönet ve rolleri düzenle',
            href: '/admin/users',
            icon: UserGroupIcon,
            color: 'bg-green-500 hover:bg-green-600'
        },
        {
            name: 'Harita Yönetimi',
            description: 'Harita noktalarını ve konumları yönet',
            href: '/admin/map',
            icon: MapPinIcon,
            color: 'bg-purple-500 hover:bg-purple-600'
        },
        {
            name: 'Raporlar',
            description: 'Sistem raporlarını görüntüle ve analiz et',
            href: '/admin/reports',
            icon: DocumentTextIcon,
            color: 'bg-orange-500 hover:bg-orange-600'
        }
    ];

    if (orgsLoading || usersLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                    <ChartBarIcon className="h-8 w-8 mr-3 text-blue-500" />
                    Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-2">Sistem genel durumu ve yönetim araçları</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Hızlı İşlemler</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {quickActions.map((action) => (
                            <Link
                                key={action.name}
                                to={action.href}
                                className="group block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center">
                                    <div className={`p-3 rounded-lg ${action.color} transition-colors`}>
                                        <action.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600">
                                            {action.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">{action.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Organizations */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Son Eklenen Organizasyonlar</h2>
                </div>
                <div className="p-6">
                    {organizations.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">Henüz organizasyon bulunmuyor</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {organizations.slice(0, 6).map((org) => (
                                <div key={org.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center space-x-3">
                                        {org.logoUrl ? (
                                            <img 
                                                src={org.logoUrl} 
                                                alt={`${org.name} logo`}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                                                <BuildingOfficeIcon className="h-6 w-6 text-gray-600" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                                {org.name}
                                            </h3>
                                            <p className="text-xs text-gray-600 truncate">
                                                {org.description}
                                            </p>
                                        </div>
                                    </div>
                                    {org.website && (
                                        <a 
                                            href={org.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-500 hover:text-blue-600 mt-2 block truncate"
                                        >
                                            Website'yi ziyaret et
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;