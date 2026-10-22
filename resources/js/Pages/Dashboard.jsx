import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard | Bee Near" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-2xl border border-[#303234] bg-[#101112] shadow-xl">
                        <div className="flex flex-col items-start justify-between gap-8 p-7 sm:flex-row sm:items-center sm:p-10">
                            <div>
                                <Link href="/" aria-label="Ir al inicio de Bee Near" className="inline-flex items-center">
                                    <img src="/images/beenear-imagotipo-dark.png" alt="Bee Near" className="h-[70px] w-auto max-w-[185px] object-contain object-left" />
                                </Link>
                                <h3 className="mt-5 text-2xl font-bold tracking-tight text-[#f2f0eb]">Dashboard</h3>
                                <p className="mt-3 text-sm text-[#b6b9b5]">You're logged in!</p>
                            </div>
                            <Link href="/" className="inline-flex min-h-11 items-center rounded-lg bg-[#f5be1e] px-5 text-sm font-bold text-[#101112] transition hover:bg-[#ffcf4a]">
                                Ir al sitio web
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
