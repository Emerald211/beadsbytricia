import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import AddtoCartModal from '../add-to-cart Modal/AddtoCartModal';
import ImageWithSkeleton from '../ImageSkeleton/ImageWithSkeleton';

type ProductCardProps = {
	name: string;
	category: string;
	price: number;
	photoURLs: string[] | undefined;
	id: string;
	size: string;
	quantity: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
	name,
	price,
	photoURLs,
	id,
	size,
	quantity,
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [like, setLike] = useState<boolean>(false);
	const navigate = useNavigate();

	const showAddToCartModal = () => {
		setOpen(true);
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	const handleCardClick = () => {
		navigate(`/product/${id}`);
	};

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				whileHover={{ y: -8 }}
				transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
				onClick={handleCardClick}
				className='w-[300px] bg-white rounded-2xl overflow-hidden flex flex-col font-bison group cursor-pointer luxury-shadow hover:luxury-shadow-lg transition-shadow duration-300'>
				<div className='w-full h-[480px] overflow-hidden relative'>
					{photoURLs && <ImageWithSkeleton photoURL={photoURLs[0]} />}

					{/* Overlay on hover */}
					<div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300' />

					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						onClick={(e) => {
							e.stopPropagation();
							showAddToCartModal();
						}}
						className='absolute bottom-4 right-16 bg-white text-main p-3 rounded-full shadow-lg flex items-center justify-center
                                   hover:bg-main hover:text-white transition-all duration-300
                                   w-11 h-11 group-hover:w-28 group-hover:rounded-full'
						aria-label='Add to cart'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5 flex-shrink-0'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
							/>
						</svg>

						<span className='ml-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden'>
							ADD
						</span>
					</motion.button>

					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
						onClick={(e) => {
							e.stopPropagation();
							setLike(!like);
						}}
						className={`absolute bottom-4 right-3 p-3 rounded-full shadow-lg flex items-center justify-center w-11 h-11 transition-all duration-300 ${
							like
								? 'bg-red-50 text-red-500'
								: 'bg-white text-main hover:bg-main hover:text-white'
						}`}
						aria-label='Add to wishlist'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill={like ? 'currentColor' : 'none'}
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
							/>
						</svg>
					</motion.button>
				</div>

				<div className='p-5 flex flex-col gap-2'>
					<h2 className='text-base font-medium text-main line-clamp-1 group-hover:text-gold transition-colors duration-300'>
						{name}
					</h2>
					<p className='text-lg font-bold text-main'>
						₦{price?.toLocaleString('en-NG')}
					</p>
				</div>
			</motion.div>

			<AddtoCartModal
				loading={loading}
				open={open}
				setOpen={setOpen}
				showLoading={showAddToCartModal}
				id={id}
				size={size}
				quantity={quantity}
			/>
		</>
	);
};

export default ProductCard;
