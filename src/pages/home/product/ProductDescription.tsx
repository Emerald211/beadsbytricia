import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	MinusOutlined,
	PlusOutlined,
	LoadingOutlined,
} from '@ant-design/icons';
import { Spin, message, Modal } from 'antd';
import { AdminDashboardContext } from '../../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../../utils/context/admin-state-context/types/AdminTypes';
import { StoreContext } from '../../../utils/context/store/StoreContext';
import { StoreProps } from '../../../utils/context/store/StoreProps';
import { Cart } from '../../../utils/context/store/types/CartTypes';
import { Product } from '../../../utils/context/admin-state-context/types/ProductTypes';
import { Dispatch, SetStateAction } from 'react';
import { UserContext } from '../../../utils/context/user/UserContext';
import { UserProps } from '../../../utils/context/user/types/UserType';
import { motion } from 'motion/react';

const ColorOptions = [
	{ name: 'Black', value: '#000000' },
	{ name: 'White', value: '#FFFFFF' },
	{ name: 'Gray', value: '#808080' },
	{ name: 'Silver', value: '#C0C0C0' },
	{ name: 'Gold', value: '#FFD700' },
	{ name: 'Rose Gold', value: '#B76E79' },
	{ name: 'Platinum', value: '#E5E4E2' },
	{ name: 'Brown', value: '#8B4513' },
	{ name: 'Beige', value: '#F5F5DC' },
	{ name: 'Tan', value: '#D2B48C' },
	{ name: 'Khaki', value: '#C3B091' },
	{ name: 'Olive', value: '#808000' },
	{ name: 'Red', value: '#FF0000' },
	{ name: 'Burgundy', value: '#800020' },
	{ name: 'Maroon', value: '#800000' },
	{ name: 'Pink', value: '#FFC0CB' },
	{ name: 'Rose Pink', value: '#FF66CC' },
	{ name: 'Purple', value: '#800080' },
	{ name: 'Violet', value: '#8A2BE2' },
	{ name: 'Lavender', value: '#E6E6FA' },
	{ name: 'Blue', value: '#0000FF' },
	{ name: 'Navy', value: '#000080' },
	{ name: 'Sky Blue', value: '#87CEEB' },
	{ name: 'Turquoise', value: '#40E0D0' },
	{ name: 'Teal', value: '#008080' },
	{ name: 'Green', value: '#008000' },
	{ name: 'Emerald Green', value: '#50C878' },
	{ name: 'Mint Green', value: '#98FF98' },
	{ name: 'Lime', value: '#00FF00' },
	{ name: 'Yellow', value: '#FFFF00' },
	{ name: 'Mustard', value: '#FFDB58' },
	{ name: 'Orange', value: '#FFA500' },
	{ name: 'Coral', value: '#FF7F50' },
	{ name: 'Ivory', value: '#FFFFF0' },
	{ name: 'Cream', value: '#FFFDD0' },
	{ name: 'Champagne', value: '#F7E7CE' },
];

const ProductDescription: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;
	const { cartItems, setCartItems } = useContext(StoreContext) as StoreProps;
	const { user } = useContext(UserContext) as UserProps;

	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const [selectedColor, setSelectedColor] = useState<string | null>(null);
	const [selectedLength, setSelectedLength] = useState<string | null>(null);
	const [showColorModal, setShowColorModal] = useState(false);
	const [count, setCount] = useState(1);
	const [addLoading, setAddLoading] = useState(false);

	const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

	// Find the product by id
	const product = products?.find((p) => p.id === id);

	// Set the initial selected image when product loads
	useEffect(() => {
		if (product?.photoURLs && product.photoURLs.length > 0) {
			setSelectedImage(product.photoURLs[0]);
		}
	}, [product]);

	const increaseCount = () => setCount((prev) => prev + 1);
	const decreaseCount = () => {
		if (count > 1) setCount((prev) => prev - 1);
	};

	const addToCart = (
		product: Product,
		size: string,
		cartItems: Cart[] | null,
		setCartItems: Dispatch<SetStateAction<Cart[] | null>>,
	) => {
		setAddLoading(true);
		const newCartItem: Cart = {
			...product,
			size: size,
			quantity: count,
			status: 'inCart',
			photoURLs: product.photoURLs,
			color: selectedColor,
			length: selectedLength,
		};

		let updatedCartItems: Cart[];

		if (cartItems) {
			const existingItemIndex = cartItems.findIndex(
				(item) => item.id === newCartItem.id && item.size === newCartItem.size,
			);

			if (existingItemIndex > -1) {
				const existingItem = cartItems[existingItemIndex];
				existingItem.quantity += count;

				updatedCartItems = [
					...cartItems.slice(0, existingItemIndex),
					existingItem,
					...cartItems.slice(existingItemIndex + 1),
				];
			} else {
				updatedCartItems = [...cartItems, newCartItem];
			}
		} else {
			updatedCartItems = [newCartItem];
		}

		setCartItems(updatedCartItems);
		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

		setTimeout(() => {
			setAddLoading(false);
		}, 1000);

		message.success('Product added to cart!');
	};

	// Loading state
	if (!products) {
		return (
			<section className='flex justify-center items-center w-full h-screen'>
				<Spin size='large' className='custom-spinner' />
			</section>
		);
	}

	// Product not found
	if (!product) {
		return (
			<section className='flex flex-col justify-center items-center w-full h-screen font-bison'>
				<h1 className='text-3xl font-bold mb-4'>Product Not Found</h1>
				<p className='text-gray-500 mb-6'>
					The product you're looking for doesn't exist or has been removed.
				</p>
				<button
					onClick={() => navigate('/shop')}
					className='bg-main text-white px-6 py-3 rounded-lg hover:opacity-80 transition-opacity'>
					Back to Shop
				</button>
			</section>
		);
	}

	const { name, price, category, photoURLs, description } = product;

	return (
		<section className='min-h-screen py-10 px-4 md:px-10 lg:px-20 font-bison'>
			{/* Breadcrumb */}
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className='mb-6 text-sm text-gray-500'>
				<span
					className='cursor-pointer hover:text-gold transition-colors'
					onClick={() => navigate('/')}>
					Home
				</span>
				<span className='mx-2'>/</span>
				<span
					className='cursor-pointer hover:text-gold transition-colors'
					onClick={() => navigate('/shop')}>
					Shop
				</span>
				<span className='mx-2'>/</span>
				<span className='text-main'>{name}</span>
			</motion.div>

			<div className='flex flex-col lg:flex-row gap-10'>
				{/* Left: Image Gallery */}
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className='w-full lg:w-1/2'>
					{/* Main Image */}
					<div className='w-full h-[400px] md:h-[500px] bg-gray-100 rounded-lg overflow-hidden mb-4'>
						{selectedImage ? (
							<motion.img
								key={selectedImage}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
								src={selectedImage}
								alt={name}
								className='w-full h-full object-cover'
							/>
						) : (
							<div className='w-full h-full flex items-center justify-center text-gray-400'>
								No Image Available
							</div>
						)}
					</div>

					{/* Thumbnail Gallery */}
					{photoURLs && photoURLs.length > 1 && (
						<div className='flex gap-3 overflow-x-auto pb-2'>
							{photoURLs.map((url, index) => (
								<motion.div
									key={index}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={() => setSelectedImage(url)}
									className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
										selectedImage === url
											? 'border-gold'
											: 'border-transparent hover:border-gray-300'
									}`}>
									<img
										src={url}
										alt={`${name} ${index + 1}`}
										className='w-full h-full object-cover'
									/>
								</motion.div>
							))}
						</div>
					)}
				</motion.div>

				{/* Right: Product Info */}
				<motion.div
					initial={{ opacity: 0, x: 30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='w-full lg:w-1/2'>
					<span className='text-sm text-gray-400 uppercase tracking-wide'>
						{category}
					</span>
					<h1 className='text-3xl md:text-4xl font-bold mt-2 mb-4'>{name}</h1>
					<p className='text-2xl font-bold text-gold mb-6'>
						₦{price?.toLocaleString('en-NG')}
					</p>

					{/* Description */}
					{description && (
						<div className='mb-6'>
							<h3 className='font-bold mb-2'>Description</h3>
							<p className='text-gray-600 leading-relaxed'>{description}</p>
						</div>
					)}

					<hr className='my-6' />

					{/* Size Selection */}
					<div className='mb-6'>
						<h3 className='font-bold mb-3'>Size</h3>
						<div className='flex flex-wrap gap-3'>
							{sizes.map((size) => (
								<div
									key={size}
									onClick={() => setSelectedSize(size)}
									className={`border px-5 py-2 cursor-pointer transition-all ${
										selectedSize === size
											? 'bg-main text-white border-main'
											: 'border-gray-300 hover:border-main'
									}`}>
									{size}
								</div>
							))}
						</div>
					</div>

					{/* Colors & Length for Bracelets */}
					{product.category?.toLowerCase().includes('bracelet') && (
						<>
							{/* Colors */}
							{product.colors && product.colors.length > 0 && (
								<div className='mb-6'>
									<h3 className='font-bold mb-3'>Select Color</h3>
									<div className='flex gap-3 flex-wrap'>
										{product.colors
											.slice(0, 5)
											.map((col: string, index: number) => (
												<div
													key={index}
													onClick={() => setSelectedColor(col)}
													className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-all ${
														selectedColor === col
															? 'ring-2 ring-main ring-offset-2'
															: 'hover:scale-110'
													}`}
													style={{ backgroundColor: col }}
													title={col}
												/>
											))}
										{product.colors.length > 5 && (
											<button
												onClick={() => setShowColorModal(true)}
												className='px-4 py-2 border rounded text-sm text-gray-600 hover:bg-gray-100'>
												More Colors
											</button>
										)}
									</div>

									<Modal
										open={showColorModal}
										onCancel={() => setShowColorModal(false)}
										footer={null}
										title='Choose a Color'>
										<div className='grid grid-cols-5 gap-4'>
											{ColorOptions.map((option, index) => (
												<div
													key={index}
													onClick={() => {
														setSelectedColor(option.value);
														setShowColorModal(false);
													}}
													className={`flex flex-col items-center cursor-pointer p-2 rounded-lg transition-all ${
														selectedColor === option.value
															? 'ring-2 ring-main'
															: 'hover:bg-gray-100'
													}`}>
													<div
														className='w-10 h-10 rounded-full border'
														style={{ backgroundColor: option.value }}
													/>
													<span className='text-xs mt-1'>{option.name}</span>
												</div>
											))}
										</div>
									</Modal>
								</div>
							)}

							{/* Length */}
							{product.lengths && product.lengths.length > 0 && (
								<div className='mb-6'>
									<h3 className='font-bold mb-3'>Wrist Length</h3>
									<div className='flex gap-3 flex-wrap'>
										{product.lengths.map((len: string, index: number) => (
											<div
												key={index}
												onClick={() => setSelectedLength(len)}
												className={`px-4 py-2 border rounded cursor-pointer transition-all ${
													selectedLength === len
														? 'bg-main text-white'
														: 'hover:border-main'
												}`}>
												{len} cm
											</div>
										))}
										<div
											onClick={() => setSelectedLength('')}
											className={`px-4 py-2 border rounded cursor-pointer transition-all ${
												selectedLength !== null &&
												!product.lengths.includes(selectedLength)
													? 'bg-main text-white'
													: 'hover:border-main'
											}`}>
											Custom
										</div>
									</div>

									{selectedLength !== null &&
										!product.lengths.includes(selectedLength) && (
											<div className='mt-3'>
												<input
													type='text'
													placeholder='Enter wrist size (e.g. 19cm)'
													value={selectedLength}
													onChange={(e) => setSelectedLength(e.target.value)}
													className='border p-2 w-full max-w-[200px] rounded'
												/>
											</div>
										)}
								</div>
							)}
						</>
					)}

					{/* Quantity */}
					<div className='mb-6'>
						<h3 className='font-bold mb-3'>Quantity</h3>
						<div className='flex w-[150px] py-3 justify-between px-4 gap-3 border-2 items-center rounded'>
							<MinusOutlined
								className='cursor-pointer hover:text-main'
								onClick={decreaseCount}
							/>
							<span className='font-bold'>{count}</span>
							<PlusOutlined
								className='cursor-pointer hover:text-main'
								onClick={increaseCount}
							/>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex flex-col gap-4'>
						<button
							onClick={() => {
								if (selectedSize) {
									addToCart(product, selectedSize, cartItems, setCartItems);
								} else {
									message.warning('Please select a size.');
								}
							}}
							className='bg-main text-white font-bold py-4 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity'>
							{addLoading ? (
								<Spin
									indicator={<LoadingOutlined className='text-white' spin />}
									size='small'
								/>
							) : (
								<>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5'
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
									<span>ADD TO CART</span>
								</>
							)}
						</button>

						<button
							onClick={() => {
								if (selectedSize) {
									if (!user) {
										message.info('Please login to continue with checkout');
										navigate('/login');
										return;
									}
									addToCart(product, selectedSize, cartItems, setCartItems);
									navigate('/checkout');
								} else {
									message.warning('Please select a size.');
								}
							}}
							className='bg-main text-white font-bold py-4 hover:opacity-90 transition-opacity'>
							BUY IT NOW
						</button>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default ProductDescription;
