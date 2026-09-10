import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactCenter() {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            <Head title={`Contact Center | Bee Near`} />
            
            <div className="min-h-screen bg-corp-light font-sans flex flex-col">
                
                {/* Navbar */}
                <nav className="bg-white text-bee-dark px-8 h-[80px] flex justify-between items-center shadow-md relative z-50">
                    <Link href="/" className="flex items-center space-x-3 cursor-pointer">
                    <img src="/images/logo.png" alt="Bee Near Logo" className="h-12 w-12" />
                    <div className="text-3xl font-heading font-bold tracking-wider">
                        <span className="text-bee-dark">Bee</span><span className="text-bee-yellow">Near</span>
                        </div>
                    </Link>
                    
                    <div className="hidden md:flex space-x-6 items-center font-medium">
                        <Link href="/" className="hover:text-bee-yellow transition duration-300">{t('nav_home')}</Link>
                        <Link href="/nosotros" className="hover:text-bee-yellow transition duration-300">{t('nav_about')}</Link>
                        <Link href="/servicios" className="hover:text-bee-yellow transition duration-300">{t('nav_services')}</Link>
                        
                        <button onClick={toggleLanguage} className="font-bold text-bee-dark hover:text-bee-yellow transition duration-300 px-3 border-l-2 border-gray-200">
                            {i18n.language === 'es' ? '🇺🇸 EN' : '🇲🇽 ES'}
                        </button>

                        <Link
                        href="/contacto"
                        className="bg-bee-yellow text-bee-dark px-5 py-2 rounded-md font-bold hover:bg-yellow-500 transition duration-300 shadow-sm">
                            {t('nav_contact')}
                        </Link>
                    </div>
                </nav>

                {/* Hero Banner */}
                <header className="bg-bee-dark text-white py-16 px-8 text-center border-b-4 border-bee-yellow">
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">Contact Center <span className="text-bee-yellow">Portfolio</span></h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-300">
                        {t('cc_hero_desc')}
                    </p>
                </header>

                <main className="flex-grow py-16 px-8 max-w-6xl mx-auto w-full">
                    
                    {/* Sección 1: Goal & What we do */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                        <div>
                            <h2 className="text-3xl font-heading font-bold text-bee-dark mb-4">{t('cc_goal_title')}</h2>
                            <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                                {t('cc_goal_p1')}
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {t('cc_goal_p2')}
                            </p>
                        </div>
                        
                        {/* Tarjetas de Estadísticas */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-bee-yellow text-center transform hover:scale-105 transition duration-300">
                                <h3 className="text-5xl font-heading font-extrabold text-bee-dark mb-2">0%</h3>
                                <p className="text-gray-600 font-bold">{t('cc_stat_rot')}</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-bee-yellow text-center transform hover:scale-105 transition duration-300">
                                <h3 className="text-5xl font-heading font-extrabold text-bee-dark mb-2">93%</h3>
                                <p className="text-gray-600 font-bold">{t('cc_stat_perf')}</p>
                            </div>
                            <div className="col-span-2 bg-bee-dark text-white p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 transition duration-300">
                                <h3 className="text-4xl font-heading font-extrabold text-bee-yellow mb-2">Up to 40%</h3>
                                <p className="text-gray-300 font-bold">{t('cc_stat_sav')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sección 2: How we differ */}
                    <h2 className="text-3xl font-heading font-bold text-bee-dark mb-10 text-center">{t('cc_differ_title')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        
                        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition duration-300">
                            <div className="w-12 h-12 bg-bee-yellow text-bee-dark rounded-full flex items-center justify-center text-2xl mb-6 shadow-sm">🤝</div>
                            <h4 className="text-xl font-heading font-bold text-bee-dark mb-3">{t('cc_diff_1_title')}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t('cc_diff_1_desc')}
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition duration-300">
                            <div className="w-12 h-12 bg-bee-yellow text-bee-dark rounded-full flex items-center justify-center text-2xl mb-6 shadow-sm">📈</div>
                            <h4 className="text-xl font-heading font-bold text-bee-dark mb-3">{t('cc_diff_2_title')}</h4>
                            <ul className="text-gray-600 text-sm space-y-2 mb-4">
                                <li>{t('cc_diff_2_li1')}</li>
                                <li>{t('cc_diff_2_li2')}</li>
                                <li>{t('cc_diff_2_li3')}</li>
                            </ul>
                            <p className="font-bold text-bee-dark text-sm">{t('cc_diff_2_end')}</p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition duration-300">
                            <div className="w-12 h-12 bg-bee-yellow text-bee-dark rounded-full flex items-center justify-center text-2xl mb-6 shadow-sm">⭐</div>
                            <h4 className="text-xl font-heading font-bold text-bee-dark mb-3">{t('cc_diff_3_title')}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {t('cc_diff_3_desc')}
                            </p>
                        </div>

                    </div>
                </main>
                {/* Footer Corporativo */}
                <footer className="bg-bee-dark text-white pt-16 pb-8 px-8 border-t-4 border-bee-yellow mt-auto">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 mb-12">
                        {/* Columna 1: Marca */}
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                {/* Hacemos el logo blanco con filtros CSS para que resalte */}
                                <img src="/images/logo.png" alt="Bee Near Logo" className="h-10 w-10" />
                                <div className="text-2xl font-heading font-bold tracking-wider">
                                    <span>Bee</span><span className="text-bee-yellow">Near</span>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">{t('footer_desc')}</p>
                        </div>
                        
                        {/* Columna 2: Enlaces Rápidos */}
                        <div>
                            <h4 className="text-lg font-heading font-bold mb-6 text-bee-yellow">{t('footer_links')}</h4>
                            <ul className="space-y-3 text-sm text-gray-300 font-medium">
                                <li><Link href="/" className="hover:text-bee-yellow transition">{t('nav_home')}</Link></li>
                                <li><Link href="/nosotros" className="hover:text-bee-yellow transition">{t('nav_about')}</Link></li>
                                <li><Link href="/servicios" className="hover:text-bee-yellow transition">{t('nav_services')}</Link></li>
                                <li><Link href="/contacto" className="hover:text-bee-yellow transition">{t('nav_contact')}</Link></li>
                            </ul>
                        </div>
                        
                        {/* Columna 3: Contacto */}
                        <div>
                            <h4 className="text-lg font-heading font-bold mb-6 text-bee-yellow">{t('footer_contact')}</h4>
                            <ul className="space-y-4 text-sm text-gray-300">
                                <li className="flex items-center gap-3"><Mail size={18} className="text-bee-yellow" /> moreinfo@beenear.mx</li>
                                <li className="flex items-center gap-3"><Phone size={18} className="text-bee-yellow" /> +1 (215) 3180179</li>
                                <li className="flex items-start gap-3"><MapPin size={18} className="text-bee-yellow flex-shrink-0 mt-1" /> Ejército Nacional 373, CDMX</li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright y Políticas */}
                    <div className="max-w-6xl mx-auto border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
                        <p>&copy; {new Date().getFullYear()} Bee Near. {t('footer_rights')}</p>
                        <a href="#" className="hover:text-bee-yellow transition font-medium">{t('footer_privacy')}</a>
                    </div>
                </footer>
            </div>
        </>
    );
}