// file: frontend/src/components/peternakan/KambingStats.js
'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { BsGenderMale, BsGenderFemale } from 'react-icons/bs';
import { GiGoat } from 'react-icons/gi';

ChartJS.register(ArcElement, Tooltip, Legend);

const KambingStats = ({ data }) => {
  const chartData = {
    labels: ['Jantan', 'Betina'],
    datasets: [{
      data: [data.jantan, data.betina],
      backgroundColor: ['#3B82F6', '#EC4899'],
      borderColor: ['#FFFFFF', '#FFFFFF'],
      borderWidth: 4,
      hoverOffset: 10,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center mb-6">
        <div className="bg-green-100 text-green-800 p-3 rounded-full mr-4">
            <GiGoat className="text-3xl" />
        </div>
        <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Populasi Kambing Etawa</h2>
            <p className="text-gray-500">Total Populasi: {data.total.toLocaleString('id-ID')} Ekor</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="relative h-64 w-full">
          <Doughnut data={chartData} options={options} />
          <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
            <p className="text-4xl font-bold text-gray-800">{data.total.toLocaleString('id-ID')}</p>
            <p className="text-gray-500">Total</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center bg-blue-50 p-4 rounded-lg">
            <BsGenderMale className="text-3xl text-blue-500 mr-4" />
            <div>
              <p className="font-semibold text-blue-800">Jantan</p>
              <p className="text-2xl font-bold text-blue-900">{data.jantan.toLocaleString('id-ID')} Ekor</p>
            </div>
          </div>
          <div className="flex items-center bg-pink-50 p-4 rounded-lg">
            <BsGenderFemale className="text-3xl text-pink-500 mr-4" />
            <div>
              <p className="font-semibold text-pink-800">Betina</p>
              <p className="text-2xl font-bold text-pink-900">{data.betina.toLocaleString('id-ID')} Ekor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default KambingStats;