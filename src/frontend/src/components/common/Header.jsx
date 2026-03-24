import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
    Bars3Icon, 
    XMarkIcon, 
    UserIcon,
    MapIcon,
    HomeIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated, user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
        setMobileMenuOpen(false);
    };

    const navigation = [
        { name: 'Ana Sayfa', href: '/', icon: HomeIcon },
        { name: 'Harita', href: '/map', icon: MapIcon },
    ];

    const userNavigation = isAuthenticated ? [
        { name: 'Profil', href: '/profile', icon: UserIcon },
        ...(isAdmin() ? [{ name: 'Admin Panel', href: '/admin', icon: Cog6ToothIcon }] : []),
    ] : [];

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="text-2xl font-bold text-orange-500">NovusCap</span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Menüyü aç</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="text-sm font-semibold leading-6 text-gray-900 hover:text-orange-500 flex items-center gap-1"
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-x-4">
                            <span className="text-sm text-gray-700">
                                Merhaba, {user?.firstName || user?.email}
                            </span>
                            {userNavigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="text-sm font-semibold leading-6 text-gray-900 hover:text-orange-500 flex items-center gap-1"
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="text-sm font-semibold leading-6 text-gray-900 hover:text-red-500"
                            >
                                Çıkış
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-x-4">
                            <Link
                                to="/login"
                                className="text-sm font-semibold leading-6 text-gray-900 hover:text-orange-500"
                            >
                                Giriş Yap
                            </Link>
                            <Link
                                to="/register"
                                className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                            >
                                Kayıt Ol
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="fixed inset-0 z-10" />
                    <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                                <span className="text-2xl font-bold text-orange-500">NovusCap</span>
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Menüyü kapat</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-2"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="py-6">
                                    {isAuthenticated ? (
                                        <div className="space-y-2">
                                            <div className="px-3 py-2 text-sm text-gray-700">
                                                Merhaba, {user?.firstName || user?.email}
                                            </div>
                                            {userNavigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-2"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <item.icon className="h-5 w-5" />
                                                    {item.name}
                                                </Link>
                                            ))}
                                            <button
                                                onClick={handleLogout}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-red-600 hover:bg-gray-50 w-full text-left"
                                            >
                                                Çıkış Yap
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <Link
                                                to="/login"
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Giriş Yap
                                            </Link>
                                            <Link
                                                to="/register"
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-orange-500 hover:bg-orange-400"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                Kayıt Ol
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;