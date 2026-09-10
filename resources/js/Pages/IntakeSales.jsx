import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function IntakeSales() {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            <Head title={`Intake Sales | Bee Near`} />
            
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

                {/* Hero Banner del Servicio */}
                <header className="bg-bee-dark text-white py-16 px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">Intake Sales <span className="text-bee-yellow">Portfolio</span></h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-300 font-sans">
                        {t('is_hero_desc')}
                    </p>
                </header>

                {/* Sección 1: Introducción y Timeline */}
                <section className="py-16 px-8 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-bee-dark mb-6">{t('is_what_title')}</h2>
                        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                            {t('is_what_desc')}
                        </p>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-bee-yellow mb-8">
                            <p className="text-gray-800 font-medium italic">
                                {t('is_quote')}
                            </p>
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-bee-dark mb-4">{t('is_lead_gen_title')}</h3>
                        <p className="text-gray-700 mb-2 font-medium">
                            {t('is_lead_gen_desc')}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-2xl font-heading font-bold text-bee-dark mb-8 text-center">{t('is_process_title')}</h3>
                        <div className="relative border-l-4 border-bee-dark/20 ml-4 space-y-6">
                            <div className="relative pl-8">
                                <div className="absolute -left-[14px] top-1 bg-bee-yellow h-6 w-6 rounded-full border-4 border-white shadow-md"></div>
                                <h4 className="text-lg font-heading font-bold text-bee-dark">{t('is_proc_1_title')}</h4>
                                <p className="text-gray-600 text-sm">{t('is_proc_1_desc')}</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-[14px] top-1 bg-bee-dark h-6 w-6 rounded-full border-4 border-white shadow-md"></div>
                                <h4 className="text-lg font-heading font-bold text-bee-dark">{t('is_proc_2_title')}</h4>
                                <p className="text-gray-600 text-sm">{t('is_proc_2_desc')}</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-[14px] top-1 bg-bee-yellow h-6 w-6 rounded-full border-4 border-white shadow-md"></div>
                                <h4 className="text-lg font-heading font-bold text-bee-dark">{t('is_proc_3_title')}</h4>
                                <p className="text-gray-600 text-sm">{t('is_proc_3_desc')}</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-[14px] top-1 bg-bee-dark h-6 w-6 rounded-full border-4 border-white shadow-md"></div>
                                <h4 className="text-lg font-heading font-bold text-bee-dark">{t('is_proc_4_title')}</h4>
                                <p className="text-gray-600 text-sm">{t('is_proc_4_desc')}</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-[14px] top-1 bg-bee-yellow h-6 w-6 rounded-full border-4 border-white shadow-md"></div>
                                <h4 className="text-lg font-heading font-bold text-bee-dark">{t('is_proc_5_title')}</h4>
                                <p className="text-gray-600 text-sm">{t('is_proc_5_desc')}</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-[14px] top-1 bg-green-500 h-6 w-6 rounded-full border-4 border-white shadow-md"></div>
                                <h4 className="text-lg font-heading font-bold text-bee-dark">{t('is_proc_6_title')}</h4>
                                <p className="text-gray-600 text-sm">{t('is_proc_6_desc')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección 2: How is Massive Prospecting Managed? */}
                <section className="bg-bee-dark py-16 px-8">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-heading font-bold text-white mb-10 text-center">{t('is_massive_title')}</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-bee-yellow hover:-translate-y-2 transition transform duration-300">
                                <div className="text-4xl mb-4">🤖</div>
                                <h4 className="text-xl font-heading font-bold text-bee-dark mb-3">{t('is_mass_1_title')}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{t('is_mass_1_desc')}</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-bee-yellow hover:-translate-y-2 transition transform duration-300">
                                <div className="text-4xl mb-4">✉️</div>
                                <h4 className="text-xl font-heading font-bold text-bee-dark mb-3">{t('is_mass_2_title')}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{t('is_mass_2_desc')}</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-bee-yellow hover:-translate-y-2 transition transform duration-300">
                                <div className="text-4xl mb-4">📞</div>
                                <h4 className="text-xl font-heading font-bold text-bee-dark mb-3">{t('is_mass_3_title')}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{t('is_mass_3_desc')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección 3: Charging Structure & Values */}
                <section className="py-20 px-8 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-bee-dark mb-10">{t('is_charge_title')}</h2>
                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="bg-bee-yellow text-bee-dark w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-xl shadow-md">1</div>
                                </div>
                                <div>
                                    <h4 className="text-xl font-heading font-bold text-bee-dark mb-2">{t('is_charge_1_title')}</h4>
                                    <p className="text-gray-700 leading-relaxed text-sm">{t('is_charge_1_desc')}</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="bg-bee-dark text-white w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-xl shadow-md">2</div>
                                </div>
                                <div>
                                    <h4 className="text-xl font-heading font-bold text-bee-dark mb-2">{t('is_charge_2_title')}</h4>
                                    <p className="text-gray-700 leading-relaxed text-sm">{t('is_charge_2_desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4">
                        <div className="bg-bee-yellow p-8 rounded-3xl flex items-center justify-center text-center text-bee-dark font-heading font-bold text-lg shadow-lg aspect-square hover:scale-105 transition transform duration-300">
                            Bee <br /> Efective
                        </div>
                        <div className="bg-white border-2 border-bee-dark p-8 rounded-3xl flex items-center justify-center text-center text-bee-dark font-heading font-bold text-lg shadow-sm aspect-square translate-y-8 hover:scale-105 transition transform duration-300">
                            Bee <br /> Competitive
                        </div>
                        <div className="bg-bee-dark text-white p-8 rounded-3xl flex items-center justify-center text-center font-heading font-bold text-lg shadow-lg aspect-square hover:scale-105 transition transform duration-300">
                            Bee <br /> Productive
                        </div>
                        <div className="bg-bee-yellow p-8 rounded-3xl flex items-center justify-center text-center text-bee-dark font-heading font-bold text-xl shadow-lg aspect-square translate-y-8 hover:scale-105 transition transform duration-300">
                            Bee what <br /> you've <br /> always wanted
                        </div>
                    </div>
                </section>
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