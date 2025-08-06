// file: frontend/src/components/berita/BeritaCard.js
import Image from 'next/image';
import Link from 'next/link';

const BeritaCard = ({ post }) => {
  return (
    <Link href={`/berita/${post.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
        <div className="relative w-full h-56">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <p className="text-sm text-gray-500 mb-1">{post.date}</p>
          <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
          <span className="font-semibold text-blue-600 group-hover:underline">
            Baca Selengkapnya →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BeritaCard;