// file: frontend/src/components/batas-desa/FasilitasUmum.js
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getCustomIcon } from '@/utils/getIcon'; // Impor fungsi ikon kita

const FasilitasUmum = () => {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        fetch('/batas-desa.geojson')
          .then(response => response.json())
          .then(data => {
            const pointFeatures = data.features.filter(feature => feature.geometry.type === 'Point');
            setPoints(pointFeatures);
          })
          .catch(error => console.error("Gagal memuat GeoJSON untuk titik:", error));
    }, []);

    const renderIcon = (locationName) => {
        const iconObject = getCustomIcon(locationName);
        if (iconObject.options.html) {
            // Untuk L.divIcon, kita render HTML nya
            return <div dangerouslySetInnerHTML={{ __html: iconObject.options.html }} />;
            // Untuk L.Icon, kita render sebagai <Image />
            return (
                <Image
                    src={iconObject.options.iconUrl}
                    alt={locationName}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                    unoptimized
                />
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Fasilitas Umum</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {points.map((point, index) => {
                    const [lon, lat] = point.geometry.coordinates;
                    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

                    return (
                        <div key={index} className="bg-gray-50 rounded-lg p-5 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-lg">
                            <div className="mb-4">
                                {renderIcon(point.properties.Field1)}
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-4 flex-grow">{point.properties.Field1}</h3>
                            <a 
                                href={googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Lihat di Peta
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default FasilitasUmum;