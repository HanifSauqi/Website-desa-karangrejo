// file: frontend/src/components/struktur-desa/BaganStrukturDesa.js
import PejabatCard from "./PejabatCard";
import { dataStruktur } from "@/data/strukturDesa";

const Connector = ({ className }) => <div className={`bg-gray-300 ${className}`}></div>;

const BaganStrukturDesa = () => {
  const kades = dataStruktur;
  const sekdes = kades.children.find(p => p.jabatan === 'Sekretaris Desa');
  const kaurDanKasi = sekdes ? sekdes.children : [];
  const kadusGroup = kades.children.find(p => p.jabatan === 'Kepala Dusun');
  const paraKadus = kadusGroup ? kadusGroup.children : [];

  return (
    <div className="flex flex-col items-center w-full text-center">
      {/* Level 1: Kepala Desa */}
      <div className="fade-in-up">
        <PejabatCard pejabat={kades} />
      </div>
      
      <Connector className="w-0.5 h-16" />

      {/* Level 2: Sekretaris Desa */}
      <div className="relative fade-in-up">
        <PejabatCard pejabat={sekdes} />
      </div>

      <Connector className="w-0.5 h-16" />

      {/* Level 3: Kaur & Kasi */}
      <div className="relative w-full">
        <Connector className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] h-0.5" />
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-16 pt-16">
          {kaurDanKasi.map((pejabat, index) => (
            <div key={pejabat.name} className="relative fade-in-up" style={{ animationDelay: `${0.4 + index * 0.05}s` }}>
              <Connector className="absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 h-16" />
              <PejabatCard pejabat={pejabat} />
            </div>
          ))}
        </div>
      </div>
      
      <Connector className="w-0.5 h-16" />

      {/* Level 4: Judul Grup Kepala Dusun */}
      <div className="fade-in-up" style={{ animationDelay: '1s' }}>
          <PejabatCard pejabat={kadusGroup} />
      </div>

      <Connector className="w-0.5 h-16" />

      {/* Level 5: Para Kepala Dusun */}
      <div className="relative w-full">
        <Connector className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] h-0.5" />
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-16 pt-16">
          {paraKadus.map((pejabat, index) => (
            <div key={pejabat.name} className="relative fade-in-up" style={{ animationDelay: `${1.2 + index * 0.05}s` }}>
              <Connector className="absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 h-16" />
              <PejabatCard pejabat={pejabat} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BaganStrukturDesa;