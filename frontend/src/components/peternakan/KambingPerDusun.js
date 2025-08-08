// file: frontend/src/components/peternakan/KambingPerDusun.js
'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// HAPUS -> import { dataKambingPerDusun } from "@/data/kambing";
import { useInView } from "react-intersection-observer";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Komponen sekarang menerima 'data' sebagai prop
const KambingPerDusun = ({ data }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Populasi Kambing Jantan & Betina per Dusun',
                font: { size: 18 },
                color: '#334155'
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                title: { display: true, text: 'Jumlah Ekor' }
            }
        }
    };

    const chartData = {
        // Gunakan data dari props
        labels: data?.map(item => item.dusun),
        datasets: [
            {
                label: 'Jantan',
                data: data?.map(item => item.kambing.jantan),
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
            {
                label: 'Betina',
                data: data?.map(item => item.kambing.betina),
                backgroundColor: 'rgba(236, 72, 153, 0.7)',
                borderColor: 'rgba(236, 72, 153, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div ref={ref} className={`bg-white p-6 md:p-8 rounded-xl shadow-lg border mt-12 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative h-[28rem] w-full">
                {inView && <Bar options={options} data={chartData} />}
            </div>
        </div>
    )
}

export default KambingPerDusun;