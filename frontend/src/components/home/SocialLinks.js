// file: frontend/src/components/home/SocialLinks.js

import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61571362812892', icon: <FaFacebookF /> },
  { name: 'Instagram', href: 'https://www.instagram.com/pemdeskarangrejo_official', icon: <FaInstagram /> },
  { name: 'TikTok', href: 'https://www.tiktok.com/@pemdeskarangrejo_oficial', icon: <FaTiktok /> },
  { name: 'YouTube', href: 'http://googleusercontent.com/youtube.com/4', icon: <FaYoutube /> },
];

// Komponen sekarang menerima prop 'className'
const SocialLinks = ({ className }) => {
  return (
    <div className="flex space-x-4">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          // Terapkan className dari prop, atau gunakan style default
          className={className || "bg-black/20 p-3 rounded-full text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"}
        >
          <div className="text-xl">{social.icon}</div>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;