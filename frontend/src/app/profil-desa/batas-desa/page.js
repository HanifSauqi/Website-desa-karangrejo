// file: frontend/src/app/batas-desa/page.js

import BatasDesaLoader from '@/components/batas-desa/BatasDesaLoader';
import FasilitasLoader from '@/components/batas-desa/FasilitasLoader'; // <-- Impor komponen loader baru

export const metadata = {
    title: 'Peta Batas Desa - Desa Karangrejo',
    description: 'Peta wilayah administratif Desa Karangrejo.',
};

export default function BatasDesaPage() {
    return (
        <main className="pt-24 md:pt-32 pb-16">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Peta Batas Wilayah Desa</h1>
                <p className="text-gray-600 mb-8">
                    Berikut adalah peta batas wilayah Desa Karangrejo.
                </p>
            </div>
            
            <div className="container mx-auto px-6 h-[calc(100vh-350px)] rounded-lg overflow-hidden shadow-lg mb-12">
                <BatasDesaLoader />
            </div>

            <div className="container mx-auto px-6">
                <FasilitasLoader />
            </div>
        </main>
    )
}