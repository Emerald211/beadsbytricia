import {
	LoadingOutlined,
	MinusOutlined,
	PlusOutlined,
} from '@ant-design/icons';
import { Spin, Modal, message } from 'antd';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { AdminDashboardContext } from '../../../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../../../utils/context/admin-state-context/types/AdminTypes';
import { StoreContext } from '../../../../utils/context/store/StoreContext';
import { StoreProps } from '../../../../utils/context/store/StoreProps';
import { Cart } from '../../../../utils/context/store/types/CartTypes';
import { Product } from '../../../../utils/context/admin-state-context/types/ProductTypes';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface LoadingComponentProps {
	loading: boolean;
	open: boolean;
	setOpen: (open: boolean) => void;
	showLoading: () => void;
	id: string;
}

interface FormProps {
	size: string;
	quantity: number;
}

type AddToCartModalProps = LoadingComponentProps & FormProps;
const AddtoCartModal: React.FC<AddToCartModalProps> = ({
	loading,
	open,
	setOpen,
	id,
}) => {
	const size = ['S', 'M', 'L', 'XL', 'XXL'];
	const [selectedSize, setSelectedSize] = useState<string | null>(null); // State to store the selected size
	const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;
	const { cartItems, setCartItems } = useContext(StoreContext) as StoreProps;
	const [addLoading, setAddLoading] = useState(false);
	// state for selected color & length
	const [selectedColor, setSelectedColor] = useState<string | null>(null);
	const [selectedLength, setSelectedLength] = useState<string | null>(null);
	const [showAllColors, setShowAllColors] = useState(false);
	const [showColorModal, setShowColorModal] = useState(false);
	const [customLength, setCustomLength] = useState<string>('');

	const ColorOptions = [
		// Basics
		{ name: 'Black', value: '#000000' },
		{ name: 'White', value: '#FFFFFF' },
		{ name: 'Gray', value: '#808080' },
		{ name: 'Silver', value: '#C0C0C0' },
		{ name: 'Gold', value: '#FFD700' },
		{ name: 'Rose Gold', value: '#B76E79' },
		{ name: 'Platinum', value: '#E5E4E2' },

		// Natural / Earth tones
		{ name: 'Brown', value: '#8B4513' },
		{ name: 'Beige', value: '#F5F5DC' },
		{ name: 'Tan', value: '#D2B48C' },
		{ name: 'Khaki', value: '#C3B091' },
		{ name: 'Olive', value: '#808000' },

		// Reds & Pinks
		{ name: 'Red', value: '#FF0000' },
		{ name: 'Burgundy', value: '#800020' },
		{ name: 'Maroon', value: '#800000' },
		{ name: 'Pink', value: '#FFC0CB' },
		{ name: 'Rose Pink', value: '#FF66CC' },

		// Purples
		{ name: 'Purple', value: '#800080' },
		{ name: 'Violet', value: '#8A2BE2' },
		{ name: 'Lavender', value: '#E6E6FA' },

		// Blues
		{ name: 'Blue', value: '#0000FF' },
		{ name: 'Navy', value: '#000080' },
		{ name: 'Sky Blue', value: '#87CEEB' },
		{ name: 'Turquoise', value: '#40E0D0' },
		{ name: 'Teal', value: '#008080' },

		// Greens
		{ name: 'Green', value: '#008000' },
		{ name: 'Emerald Green', value: '#50C878' },
		{ name: 'Mint Green', value: '#98FF98' },
		{ name: 'Lime', value: '#00FF00' },

		// Warm tones
		{ name: 'Yellow', value: '#FFFF00' },
		{ name: 'Mustard', value: '#FFDB58' },
		{ name: 'Orange', value: '#FFA500' },
		{ name: 'Coral', value: '#FF7F50' },

		// Neutrals / Soft tones
		{ name: 'Ivory', value: '#FFFFF0' },
		{ name: 'Cream', value: '#FFFDD0' },
		{ name: 'Champagne', value: '#F7E7CE' },
	];

	const filterSpecificProduct =
		products?.filter((eachproduct) => {
			return eachproduct.id === id;
		}) || [];

	console.log(filterSpecificProduct);

	const product = filterSpecificProduct[0];

	const { name, photoURLs, price, category } = product;

	const handleSizeClick = (size: string) => {
		setSelectedSize(size);
	};

	const [count, setCount] = useState(1);

	const navigate = useNavigate();

	const increaseCount = () => {
		setCount((prevCount) => prevCount + 1);
	};

	const decreaseCount = () => {
		if (count > 1) {
			setCount((prevCount) => prevCount - 1);
		}
	};

	const addToCart = (
		product: Product,
		size: string,
		cartItems: Cart[] | null,
		setCartItems: Dispatch<SetStateAction<Cart[] | null>>
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
				(item) => item.id === newCartItem.id && item.size === newCartItem.size
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

			setOpen(false);
		}, 1000);

		message.success('Product Updated Successfully');
	};

	return (
		<>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				closeOnClick
				draggable
				pauseOnHover
				transition={Bounce}
			/>

			<Modal
				open={open}
				onCancel={() => setOpen(false)}
				footer={null}
				width={740}
				style={{ borderRadius: 0 }}
				className='!rounded-none'>
				{loading ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '70vh',
						}}>
						<Spin size='large' className='custom-spinner' />{' '}
					</div>
				) : (
					<section className='h-auto font-poppins rounded-none flex flex-col md:flex-row'>
						<div
							style={{ backgroundImage: `url(${photoURLs && photoURLs[0]})` }}
							className='image w-[100%] md:w-[40%] h-[350px] bg-slate-300 bg-cover bg-no-repeat relative group'></div>
						<div className='px-5 w-[100%]  md:w-[60%] flex flex-col overflow-scroll-hidden'>
							<h1 className=' mt-4 md:mt-0  font-bold text-2xl'>{name}</h1>
							<h5 className=' text-slate-300'>{category}</h5>
							<h6>₦{price}</h6>

							<a className=' underline'>View Product Details</a>

							<hr className=' mt-5' />

							{/* SIZE */}

							<h5 className='mt-5 font-bold mb-2'>Size</h5>
							<div className='grid grid-cols-3 gap-4'>
								{size.map((size) => (
									<div
										key={size}
										onClick={() => handleSizeClick(size)}
										className={`border px-5 py-2 cursor-pointer ${
											selectedSize === size
												? 'bg-main text-white'
												: 'border-black'
										}`}>
										{size}
									</div>
								))}
							</div>

							{/* SHOW COLORS & LENGTH ONLY FOR BRACELETS */}
							{product.category?.toLowerCase().includes('bracelet') && (
								<>
									{/* COLORS */}
									{product.colors && product.colors.length > 0 && (
										<>
											<h5 className='mt-5 font-bold mb-2'>Select Color</h5>
											<div className='flex gap-3 flex-wrap'>
												{(showAllColors
													? [
															...product.colors,
															...(selectedColor &&
															!product.colors.includes(selectedColor)
																? [selectedColor]
																: []),
													  ]
													: [
															...product.colors.slice(0, 3),
															...(selectedColor &&
															!product.colors
																.slice(0, 3)
																.includes(selectedColor)
																? [selectedColor]
																: []),
													  ]
												).map((col: string, index: number) => (
													<div
														key={index}
														onClick={() => setSelectedColor(col)}
														className={`w-8 h-8 rounded-full border cursor-pointer ${
															selectedColor === col ? 'ring-2 ring-main' : ''
														}`}
														style={{ backgroundColor: col }}
														title={col}
													/>
												))}

												{product.colors.length > 2 && !showAllColors && (
													<button
														onClick={() => setShowColorModal(true)}
														className='px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-100'>
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
															className={`flex flex-col items-center cursor-pointer ${
																selectedColor === option.value
																	? 'ring-2 ring-main rounded-lg'
																	: ''
															}`}>
															<div
																className='w-10 h-10 rounded-full border'
																style={{ backgroundColor: option.value }}
															/>
															<span className='text-xs mt-1'>
																{option.name}
															</span>
														</div>
													))}
												</div>
											</Modal>
										</>
									)}

									{/* LENGTH */}
									{product.lengths && product.lengths.length > 0 && (
										<>
											<h5 className='mt-5 font-bold mb-2'>Wrist Length</h5>
											<div className='flex gap-3 flex-wrap'>
												{product.lengths.map((len: string, index: number) => (
													<div
														key={index}
														onClick={() => setSelectedLength(len)}
														className={`px-4 py-2 border rounded cursor-pointer ${
															selectedLength === len
																? 'bg-main text-white'
																: 'hover:bg-main hover:text-white'
														}`}>
														{len} cm
													</div>
												))}

												{/* Custom Length Option */}
												<div
													onClick={() => setSelectedLength('')} // clear first, then let input handle
													className={`px-4 py-2 border rounded cursor-pointer ${
														selectedLength &&
														!product.lengths.includes(selectedLength)
															? 'bg-main text-white'
															: 'hover:bg-main hover:text-white'
													}`}>
													Custom
												</div>
											</div>

											{/* If custom is active (not one of the predefined) */}
											{selectedLength !== null &&
												!product.lengths.includes(selectedLength) && (
													<div className='mt-3'>
														<input
															type='text'
															placeholder='Enter wrist size (e.g. 19cm)'
															value={selectedLength}
															onChange={(e) =>
																setSelectedLength(e.target.value)
															}
															className='border p-2 w-[200px]'
														/>
													</div>
												)}
										</>
									)}
								</>
							)}

							<h1 className=' mt-5 font-bold'>Quantity</h1>

							<div className=' flex w-[150px] py-4 mt-2 justify-between px-3 gap-3 border-[2px] items-center'>
								<MinusOutlined
									className=' cursor-pointer'
									onClick={decreaseCount}
								/>

								<span>{count}</span>

								<PlusOutlined
									className=' cursor-pointer'
									onClick={increaseCount}
								/>
							</div>

							<button
								onClick={() => {
									const size = selectedSize;
									if (size) {
										addToCart(product, size, cartItems, setCartItems);
									} else {
										alert('Please select a size.');
									}
								}}
								className=' bg-main text-center font-bold text-white py-4 mt-5 flex items-center justify-center gap-2'>
								{' '}
								{addLoading ? (
									<Spin
										indicator={<LoadingOutlined className=' text-white' spin />}
										size='small'
									/>
								) : (
									<div className=' flex items-center gap-2 justify-center'>
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
										<span>ADD TO CART</span>
									</div>
								)}
							</button>

							<button
								onClick={() => {
									const size = selectedSize;
									if (size) {
										addToCart(product, size, cartItems, setCartItems);
										navigate('/checkout');
									} else {
										alert('Please select a size.');
									}
								}}
								className=' bg-main text-center font-bold text-white py-4 mt-5 '>
								BUY IT NOW
							</button>
						</div>
					</section>
				)}
			</Modal>
		</>
	);
};

export default AddtoCartModal;
