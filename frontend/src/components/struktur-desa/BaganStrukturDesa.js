// file: frontend/src/components/struktur-desa/BaganStrukturDesa.js
import PejabatCard from "./PejabatCard";
// Hapus -> import { dataStruktur } from "@/data/strukturDesa";

// Fungsi untuk mengubah data flat menjadi struktur pohon (tree)
function buildTree(list) {
  const map = {};
  const roots = [];
  
  list.forEach((node, i) => {
    map[node._id] = i;
    node.children = [];
  });
  
  list.forEach(node => {
    if (node.parentId) {
      // Cek jika parent ada di daftar
      if (list[map[node.parentId]]) {
        list[map[node.parentId]].children.push(node);
      }
    } else {
      roots.push(node);
    }
  });
  
  return roots[0]; // Asumsikan hanya ada satu root (Kepala Desa)
}

// Komponen BaganOrganisasi tidak perlu diubah, karena sudah rekursif
const BaganOrganisasi = ({ data }) => { /* ... kode tetap sama ... */ };

// Komponen utama yang mengambil data
const BaganStrukturDesa = async () => {
  let dataPohon = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pejabat`, { next: { revalidate: 10 } });
    if(res.ok) {
      const dataFlat = await res.json();
      if(dataFlat.length > 0) {
        dataPohon = buildTree(dataFlat);
      }
    }
  } catch (error) {
    console.error("Gagal mengambil struktur desa:", error);
  }

  if (!dataPohon) {
    return <p className="text-center">Struktur organisasi belum tersedia.</p>;
  }

  return <BaganOrganisasi data={dataPohon} />;
};

export default BaganStrukturDesa;