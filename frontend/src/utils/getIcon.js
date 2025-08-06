// file: frontend/src/utils/getIcon.js
import L from 'leaflet';

export function getCustomIcon(locationName) {
  const lowerCaseName = locationName.toLowerCase();

  let iconContent = ''; 
  let iconColor = '#4A5568'; 

  // Logika untuk ikon dari file gambar (Masjid, Pemandian, Posyandu)
  if (lowerCaseName.includes('masjid')) {
    iconColor = '#38A169'; // Hijau
    iconContent = `<img src="/icons/icon-masjid.png" alt="masjid" class="w-5 h-5" />`;
  } else if (lowerCaseName.includes('pemandian')) {
    iconColor = '#319795'; // Teal
    iconContent = `<img src="/icons/icon-pemandian.png" alt="pemandian" class="w-5 h-5" />`;
  } else if (lowerCaseName.includes('posyandu')) {
    iconColor = '#D53F8C'; // Pink
    iconContent = `<img src="/icons/icon-posyandu.png" alt="posyandu" class="w-5 h-5" />`;
  } 
  // Logika untuk ikon SVG
  else if (lowerCaseName.includes('kantor desa')) {
    iconColor = '#3182CE'; // Biru
    iconContent = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" /></svg>`;
  } else if (lowerCaseName.includes('sd') || lowerCaseName.includes('mi') || lowerCaseName.includes('mts') || lowerCaseName.includes('tk')) {
    iconColor = '#DD6B20'; // Oranye
    iconContent = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>`;
  } else {
    // Ikon default untuk lokasi yang tidak cocok
    iconColor = '#A0AEC0'; // Abu-abu
    iconContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M9.69 18.933l.003.001a9.878 9.878 0 0 0 3.482-2.22c1.94-1.921 3.27-4.66 3.27-8.125C16.445 4.377 13.423 1.5 10 1.5S3.555 4.377 3.555 8.588c0 3.465 1.33 6.204 3.27 8.125a9.878 9.878 0 0 0 3.482 2.22l.003.001a.75.75 0 0 0 .31 0Z" clip-rule="evenodd" /></svg>`;
  }

  return L.divIcon({
    html: `<div style="background-color: ${iconColor};" class="flex justify-center items-center w-8 h-8 rounded-full shadow-lg border-2 border-white/75 text-white">${iconContent}</div>`,
    className: 'bg-transparent border-0',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
  });
}