import React from 'react';
import { Link } from 'react-router-dom';
import { 
    MapPinIcon,
    EnvelopeIcon,
    PhoneIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: 'Hakkımızda',
            links: [
                { name: 'Vizyon & Misyon', href: '/about' },
                { name: 'Ekibimiz', href: '/team' },
                { name: 'İletişim', href: '/contact' },
                { name: 'Blog', href: '/blog' }
            ]
        },
        {
            title: 'Hizmetler',
            links: [
                { name: 'Harita Görünümü', href: '/map' },
                { name: 'Organizasyonlar', href: '/organizations' },
                { name: 'Raporlar', href: '/reports' },
                { name: 'API Dokümantasyonu', href: '/api-docs' }
            ]
        },
        {
            title: 'Yasal',
            links: [
                { name: 'Gizlilik Politikası', href: '/privacy-policy' },
                { name: 'Hizmet Şartları', href: '/terms-of-service' },
                { name: 'Çerez Politikası', href: '/cookie-policy' },
                { name: 'KVKK', href: '/kvkk' }
            ]
        },
        {
            title: 'Destek',
            links: [
                { name: 'Yardım Merkezi', href: '/help' },
                { name: 'SSS', href: '/faq' },
                { name: 'Sistem Durumu', href: '/status' },
                { name: 'Geri Bildirim', href: '/feedback' }
            ]
        }
    ];

    const socialLinks = [
        { 
            name: 'Twitter', 
            href: 'https://twitter.com/novuscap',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
            )
        },
        { 
            name: 'LinkedIn', 
            href: 'https://linkedin.com/company/novuscap',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
            )
        },
        { 
            name: 'GitHub', 
            href: 'https://github.com/novuscap',
            icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
            )
        }
    ];

    return (
        <footer className="bg-gray-900">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                {/* Main footer content */}
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Company info */}
                    <div className="space-y-8 xl:col-span-1">
                        <div className="flex items-center">
                            <MapPinIcon className="h-8 w-8 text-blue-500" />
                            <span className="ml-2 text-xl font-bold text-white">NovusCap</span>
                        </div>
                        <p className="text-gray-400 text-base">
                            Türkiye'deki organizasyonları ve kurumları haritada görselleştiren, 
                            şeffaflığı ve erişilebilirliği artıran dijital platform.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center text-gray-400">
                                <EnvelopeIcon className="h-5 w-5 mr-3" />
                                <span>info@novuscap.com</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                                <PhoneIcon className="h-5 w-5 mr-3" />
                                <span>+90 (212) 123 45 67</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                                <GlobeAltIcon className="h-5 w-5 mr-3" />
                                <span>İstanbul, Türkiye</span>
                            </div>
                        </div>
                    </div>

                    {/* Links sections */}
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            {footerSections.slice(0, 2).map((section) => (
                                <div key={section.title}>
                                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                                        {section.title}
                                    </h3>
                                    <ul className="mt-4 space-y-4">
                                        {section.links.map((link) => (
                                            <li key={link.name}>
                                                <Link 
                                                    to={link.href} 
                                                    className="text-base text-gray-300 hover:text-white transition-colors"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            {footerSections.slice(2, 4).map((section) => (
                                <div key={section.title}>
                                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                                        {section.title}
                                    </h3>
                                    <ul className="mt-4 space-y-4">
                                        {section.links.map((link) => (
                                            <li key={link.name}>
                                                <Link 
                                                    to={link.href} 
                                                    className="text-base text-gray-300 hover:text-white transition-colors"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Newsletter subscription */}
                <div className="mt-12 border-t border-gray-800 pt-8">
                    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                        <div className="xl:col-span-2">
                            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                                Bültenimize Abone Olun
                            </h3>
                            <p className="text-gray-400 text-base mb-4">
                                Yeni özellikler ve güncellemeler hakkında bilgi almak için e-posta adresinizi bırakın.
                            </p>
                            <form className="sm:flex">
                                <label htmlFor="email-address" className="sr-only">
                                    E-posta adresi
                                </label>
                                <input
                                    id="email-address"
                                    name="email-address"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="w-full px-5 py-3 border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md sm:rounded-r-none"
                                    placeholder="E-posta adresiniz"
                                />
                                <button
                                    type="submit"
                                    className="mt-3 w-full sm:mt-0 sm:w-auto sm:flex-shrink-0 bg-blue-600 hover:bg-blue-700 px-5 py-3 border border-transparent text-base font-medium text-white rounded-md sm:rounded-l-none transition-colors"
                                >
                                    Abone Ol
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-12 border-t border-gray-800 pt-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex space-x-6 md:order-2">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-gray-300 transition-colors"
                                >
                                    <span className="sr-only">{item.name}</span>
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                        <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                            &copy; {currentYear} NovusCap. Tüm hakları saklıdır.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;