// components/CategoryDisplayCard.tsx - Concept 1: Dynamic Hover Reveal
import React from 'react';
import ImageWithSkeleton from '../ImageSkeleton/ImageWithSkeleton';
import { useNavigate } from 'react-router-dom';

type CategoryDisplayCardProps = {
    category: string;
    imageURL: string | undefined;
};

const CategoryDisplayCard: React.FC<CategoryDisplayCardProps> = ({
    category,
    imageURL,
}) => {
    const navigate = useNavigate();
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');

    const handleViewCollection = () => {
        navigate(`/${categorySlug}`);
    };

    return (
        <div
            className='w-[300px] h-100 rounded-lg overflow-hidden relative group cursor-pointer' // Fixed height, relative for absolute positioning of overlay
            onClick={handleViewCollection}
        >
            {/* Image fills the entire card background */}
            <ImageWithSkeleton
                photoURL={imageURL}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-in-out" // Subtle zoom on hover
            />

            {/* Overlay that reveals on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                <h2 className='text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2'>
                    {category}
                </h2>
                <button
                    onClick={(e) => { e.stopPropagation(); handleViewCollection(); }}
                    className='bg-white text-gray-900 py-2 px-6 rounded-md hover:bg-gray-200 transition-colors duration-300 text-base font-medium self-start' // Button aligned left
                >
                    View All
                </button>
            </div>

            {/* Optional: Subtle initial text, always visible (e.g., category, but smaller) */}
            <div className="absolute bottom-3 left-4 text-sm font-semibold text-white/70 group-hover:opacity-0 transition-opacity duration-300">
                {category}
            </div>
        </div>
    );
};

export default CategoryDisplayCard;