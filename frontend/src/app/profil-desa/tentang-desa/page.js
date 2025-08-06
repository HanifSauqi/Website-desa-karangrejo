// file: frontend/src/app/profil-desa/tentang-desa/page.js

import DeskripsiDesa from "@/components/tentang-desa/DeskripsiDesa";
import DataPenduduk from "@/components/tentang-desa/DataPenduduk";
import DataAPBDes from "@/components/tentang-desa/DataAPBDes";

async function getKontenDesa() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/konten/tentang-desa`, {
            next: { revalidate: 10 }
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const metadata = {
    title: 'Tentang Desa - Desa Karangrejo'
};

export default async function TentangDesaPage() {
    const data = await getKontenDesa();

    if (!data) {
        return <p className="pt-32 text-center">Konten belum tersedia atau gagal dimuat.</p>;
    }

    return (
        <main className="pt-24 md:pt-32 pb-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6 space-y-8">
                <DeskripsiDesa data={data.deskripsi} />
                <DataPenduduk data={data.demografi} />
                <DataAPBDes data={data.apbdes} />
            </div>
        </main>
    )
}