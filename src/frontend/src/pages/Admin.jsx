import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import MarkerManager from '../components/admin/MarkerManager';
import UserManager from '../components/admin/UserManager';
import { 
    ChartBarIcon,
    MapPinIcon,
    UserGroupIcon,
    DocumentTextIcon,
    CogIcon
} from '@heroicons/react/24/outline';

const Admin = () => {
    const { user, isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');

    // Check if user is admin
    if (!user || !isAdmin()) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                        <CogIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Yetkisiz Erişim</h3>
                    <p className="mt-2 text-sm text-gray-600">
                        Bu sayfaya erişim için admin yetkisine sahip olmanız gerekmektedir.
                    </p>
                </div>
            </div>
        );
    }

    const tabs = [
        {
            id: 'dashboard',
            name: 'Dashboard',
            icon: ChartBarIcon,
            component: AdminDashboard
        },
        {
            id: 'organizations',
            name: 'Organizasyonlar',
            icon: MapPinIcon,
            component: MarkerManager
        },
        {
            id: 'users',
            name: 'Kullanıcılar',
            icon: UserGroupIcon,
            component: UserManager
        },
        {
            id: 'reports',
            name: 'Raporlar',
            icon: DocumentTextIcon,
            component: () => (
                <div className="text-center py-12">
                    <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Raporlar</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Raporlar özelliği henüz geliştirme aşamasındadır.
                    </p>
                </div>
            )
        }
    ];

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || AdminDashboard;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
                            <p className="text-gray-600">Sistem yönetimi ve kontrol paneli</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-600">
                                Hoş geldiniz, <span className="font-medium">{user?.name || user?.email || 'Kullanıcı'}</span>
                            </div>
                            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                    {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:w-64 flex-shrink-0">
                        <nav className="bg-white rounded-lg shadow">
                            <div className="p-4">
                                <h2 className="text-sm font-medium text-gray-900 mb-4">Yönetim Menüsü</h2>
                                <ul className="space-y-2">
                                    {tabs.map((tab) => (
                                        <li key={tab.id}>
                                            <button
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                                    activeTab === tab.id
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                            >
                                                <tab.icon className="h-5 w-5 mr-3" />
                                                {tab.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </nav>

                        {/* Quick Stats */}
                        <div className="mt-8 bg-white rounded-lg shadow p-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Sistem Durumu</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-600">Sistem</span>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Aktif
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-600">Veritabanı</span>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Bağlı
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-600">API</span>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Çalışıyor
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg shadow min-h-[600px] p-6">
                            <ActiveComponent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;