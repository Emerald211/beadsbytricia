import { useState, useEffect } from 'react';

interface ImageWithSkeletonProps {
	photoURL?: string;
	className?: string;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ photoURL }) => {
	const [loading, setLoading] = useState(true);
	const [imageLoaded, setImageLoaded] = useState(false);

	// Preload the background image using an invisible img tag
	useEffect(() => {
		if (photoURL) {
			const img = new Image();
			img.src = photoURL;
			img.onload = () => {
				setImageLoaded(true);
				setLoading(false);
			};
		} else {
			// Handle case when photoURL is undefined
			setLoading(false); // Stop loading if there's no image
		}
	}, [photoURL]);

	return (
		<div className='relative group w-full h-full'>
			{/* Skeleton effect shown when the image is loading */}
			{loading && (
				<div className='absolute inset-0 bg-slate-300 animate-pulse' />
			)}

			{/* Image container */}
			<div
				style={{ backgroundImage: imageLoaded ? `url("${photoURL}")` : 'none' }}
				className={`w-full h-full bg-no-repeat bg-cover bg-center bg-slate-300 transition-opacity duration-500 ${
					loading ? 'opacity-0' : 'opacity-100'
				}`}
			/>
		</div>
	);
};

export default ImageWithSkeleton;
