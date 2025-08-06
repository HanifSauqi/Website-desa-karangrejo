// file: frontend/src/components/pariwisata/TourismList.js

import Image from "next/image";

const TourismCard = ({ location }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <div className="relative h-56 w-full">
            <Image 
                src={location.imageUrl} 
                alt={location.name} 
                layout="fill" 
                objectFit="cover"
            />
        </div>
        <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{location.name}</h3>
            <p className="text-gray-600 leading-relaxed">{location.description}</p>
        </div>
    </div>
);

const TourismList = ({ locations }) => {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Daftar Destinasi Wisata</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {locations.map((loc) => (
                        <TourismCard key={loc.id} location={loc} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TourismList;