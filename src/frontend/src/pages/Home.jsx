import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
    MapPinIcon, 
    BuildingOfficeIcon, 
    UserGroupIcon, 
    RocketLaunchIcon,
    LightBulbIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

const Home = () => {
    const { isAuthenticated } = useAuth();

    const features = [
        {
            name: 'Harita Görünümü',
            description: 'Türkiye\'deki tüm girişimcilik ekosistemini tek haritada görüntüleyin',
            icon: MapPinIcon,
        },
        {
            name: 'Organizasyon Keşfi',
            description: 'Startuplar, yatırımcılar, inkübatörler ve teknoparkları keşfedin',
            icon: BuildingOfficeIcon,
        },
        {
            name: 'Topluluk Ağı',
            description: 'Girişimcilik topluluklarıyla bağlantı kurun ve ağınızı genişletin',
            icon: UserGroupIcon,
        },
        {
            name: 'İnovasyon Merkezleri',
            description: 'R&D merkezleri ve teknoloji geliştirme bölgelerini bulun',
            icon: LightBulbIcon,
        },
        {
            name: 'Startup Ekosistemine Katılın',
            description: 'Girişiminizi kaydedin ve ekosistemde görünür olun',
            icon: RocketLaunchIcon,
        },
        {
            name: 'Küresel Ağ',
            description: 'Yerel ve uluslararası iş birliği fırsatlarını keşfedin',
            icon: GlobeAltIcon,
        },
    ];

    const stats = [
        { id: 1, name: 'Kayıtlı Organizasyon', value: '500+' },
        { id: 2, name: 'Aktif Kullanıcı', value: '1,200+' },
        { id: 3, name: 'Şehir', value: '81' },
        { id: 4, name: 'İş Birliği', value: '300+' },
    ];

    return (
        <div className="bg-white">
            {/* Hero section */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Türkiye Girişimcilik Ekosistemi
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            NovusCap ile Türkiye'deki girişimcilik ekosistemini dijitalleştiriyoruz. 
                            Yatırımcılar, startuplar, R&D merkezleri, teknoparklar, inkübatörler, 
                            topluluklar ve ortak çalışma alanlarını tek haritada keşfedin.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to="/map"
                                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Haritayı Keşfet
                            </Link>
                            {!isAuthenticated && (
                                <Link
                                    to="/register"
                                    className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600"
                                >
                                    Kayıt Ol <span aria-hidden="true">→</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats section */}
            <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {/* Features section */}
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Özellikler</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Girişimcilik ekosistemini keşfetmenin yeni yolu
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            NovusCap ile Türkiye'deki girişimcilik ekosisteminin tüm bileşenlerini 
                            tek platformda bulabilir, ağınızı genişletebilir ve iş birliği fırsatları yakalayabilirsiniz.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* CTA section */}
            <div className="bg-blue-600">
                <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Ekosistemin bir parçası olmaya hazır mısınız?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
                            Organizasyonunuzu kaydedin ve Türkiye'nin en kapsamlı girişimcilik haritasında yerinizi alın.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {isAuthenticated ? (
                                <Link
                                    to="/profile"
                                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    Profilime Git
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/register"
                                        className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                    >
                                        Kayıt Ol
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="text-sm font-semibold leading-6 text-white hover:text-blue-100"
                                    >
                                        Giriş Yap <span aria-hidden="true">→</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;