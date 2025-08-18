import { useState } from 'react';
import AddtoCartModal from '../add-to-cart Modal/AddtoCartModal';
import ImageWithSkeleton from '../ImageSkeleton/ImageWithSkeleton';

type ProductCardProps = {
	name: string;
	category: string;
	price: number;
	photoURL: string | undefined;
	id: string;
	size: string;
	quantity: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
	name,
	price,
	photoURL,
	id,
	size,
	quantity,
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const [like, setLike] = useState<boolean>(false)

	const showAddToCartModal = () => {
		setOpen(true);
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	return (
		<>
			<div className='w-[300px] bg-white  rounded-lg overflow-hidden flex flex-col font-poppins group cursor-pointer'>
				<div className='w-full h-100 overflow-hidden relative'>
					<ImageWithSkeleton photoURL={photoURL} />

					<button
						onClick={(e) => {
							e.stopPropagation(); // Prevent card click if it navigates elsewhere
							showAddToCartModal();
						}}
						className='absolute bottom-3 right-14 bg-white text-gray-800 p-2 rounded-full shadow-md flex items-center justify-center
                                   hover:bg-gray-100 hover:scale-105 transition-all duration-200
                                   w-10 h-10 group-hover:w-24 group-hover:pl-2 group-hover:pr-4 group-hover:rounded-full' /* Added hover width/padding and rounded-md */
						aria-label='Add to cart'>
						{/* Shopping Bag/Cart Icon */}
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

						<span className='ml-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap overflow-hidden'>
							ADD
						</span>
					</button>

					<button
	onClick={(e) => {
		e.stopPropagation();
		setLike(!like);
	}}
	className={`absolute bottom-3 right-1 p-2 rounded-full shadow-md flex items-center justify-center w-10 h-10 transition-all duration-200 ${
		like ? 'bg-pink-100 text-red-500 scale-110' : 'bg-white text-gray-800 hover:bg-gray-100 hover:scale-105'
	}`}
	aria-label='Add to cart'>
	<svg
		xmlns='http://www.w3.org/2000/svg'
		className='h-6'
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
</button>

				</div>

				{/* Product Details Area - No border, simple text */}
				<div className='p-4 flex justify-between items-center text-center'>
					<h2 className='mt-1 text-base font-medium text-gray-900 line-clamp-2'>
						{name}
					</h2>
					<p className='mt-1 text-lg font-bold text-gray-800'>
						₦{price?.toLocaleString('en-NG')}
					</p>
				</div>
			</div>

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
