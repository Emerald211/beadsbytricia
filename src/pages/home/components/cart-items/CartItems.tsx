import { useContext, useState } from 'react';
import { StoreContext } from '../../../../utils/context/store/StoreContext';
import { StoreProps } from '../../../../utils/context/store/StoreProps';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { UserContext } from '../../../../utils/context/user/UserContext';
import { UserProps } from '../../../../utils/context/user/types/UserType';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const CartItems = () => {
	const navigate = useNavigate();
	const { cartItems, setOpenCart, setCartItems } = useContext(
		StoreContext,
	) as StoreProps;
	const { user } = useContext(UserContext) as UserProps;
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const totalPrice = cartItems?.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	const handleDeleteItem = (id: string) => {
		const updatedCartItems = cartItems?.filter((item) => item.id !== id) || [];
		setCartItems(updatedCartItems);
		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
		setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
	};

	const handleIncreaseQuantity = (id: string) => {
		const updatedCartItems =
			cartItems?.map((item) => {
				if (item.id === id) return { ...item, quantity: item.quantity + 1 };
				return item;
			}) || [];
		setCartItems(updatedCartItems);
		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
	};

	const handleDecreaseQuantity = (id: string) => {
		const updatedCartItems =
			cartItems?.map((item) => {
				if (item.id === id && item.quantity > 1)
					return { ...item, quantity: item.quantity - 1 };
				return item;
			}) || [];
		setCartItems(updatedCartItems);
		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
	};

	const handleSelectAll = () => {
		if (selectedItems.length === cartItems?.length) {
			setSelectedItems([]);
		} else {
			setSelectedItems(cartItems?.map((item) => item.id) || []);
		}
	};

	const handleItemSelect = (id: string) => {
		if (selectedItems.includes(id)) {
			setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
		} else {
			setSelectedItems((prev) => [...prev, id]);
		}
	};

	const handleDeleteSelected = () => {
		const updatedCartItems =
			cartItems?.filter((item) => !selectedItems.includes(item.id)) || [];
		setCartItems(updatedCartItems);
		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
		setSelectedItems([]);
	};

	const checkOut = () => {
		if (user) {
			navigate('/checkout');
		} else {
			navigate('/login');
		}
		setOpenCart(false);
	};

	return (
		<AnimatePresence>
			<div className='z-50 fixed w-screen top-0 left-0 h-screen flex'>
				{/* Overlay */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='absolute inset-0 bg-black/60 backdrop-blur-sm'
					onClick={() => setOpenCart(false)}
				/>

				{/* Cart Panel */}
				<motion.div
					initial={{ x: '100%' }}
					animate={{ x: 0 }}
					exit={{ x: '100%' }}
					transition={{ type: 'spring', damping: 25, stiffness: 200 }}
					className='w-full sm:w-[420px] md:w-[450px] lg:w-[480px] bg-white h-full ml-auto flex flex-col relative z-10 shadow-2xl'>
					{/* Header */}
					<div className='bg-white px-6 py-5 border-b border-gray-100'>
						<div className='flex items-center justify-between'>
							<div>
								<h1 className='text-xl font-bold text-main font-bison tracking-wide'>
									Shopping Cart
								</h1>
								<p className='text-sm text-gray-500 mt-1'>
									{cartItems?.length || 0}{' '}
									{cartItems?.length === 1 ? 'item' : 'items'}
								</p>
							</div>

							<motion.button
								whileHover={{ scale: 1.1, rotate: 90 }}
								whileTap={{ scale: 0.9 }}
								onClick={() => setOpenCart(false)}
								className='w-10 h-10 bg-gray-100 hover:bg-main hover:text-white rounded-full flex items-center justify-center transition-all duration-300'>
								<CloseOutlined className='text-base' />
							</motion.button>
						</div>

						{/* Select All & Delete */}
						{cartItems && cartItems.length > 0 && (
							<div className='flex items-center justify-between mt-4 pt-4 border-t border-gray-100'>
								<label className='flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-main transition-colors'>
									<input
										type='checkbox'
										checked={
											selectedItems.length === cartItems?.length &&
											cartItems.length > 0
										}
										onChange={handleSelectAll}
										className='w-4 h-4 accent-gold rounded'
									/>
									Select All
								</label>
								{selectedItems.length > 0 && (
									<motion.button
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={handleDeleteSelected}
										className='text-red-500 hover:text-red-600 text-sm font-medium transition-colors'>
										Delete Selected ({selectedItems.length})
									</motion.button>
								)}
							</div>
						)}
					</div>

					{/* Cart Items List */}
					<div className='flex-1 overflow-y-auto px-6 py-6 bg-gray-50'>
						{!cartItems || cartItems.length === 0 ? (
							<div className='flex flex-col items-center justify-center h-full text-center'>
								<div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
									<svg
										className='w-10 h-10 text-gray-400'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={1.5}
											d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
										/>
									</svg>
								</div>
								<h3 className='text-lg font-medium text-main font-bison mb-2'>
									Your cart is empty
								</h3>
								<p className='text-gray-500 text-sm mb-6'>
									Looks like you haven't added anything yet
								</p>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => {
										navigate('/shop');
										setOpenCart(false);
									}}
									className='bg-main text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gold transition-colors'>
									Start Shopping
								</motion.button>
							</div>
						) : (
							<div className='space-y-4'>
								{cartItems?.map((eachItem, index) => {
									const { name, size, price, quantity, id, photoURLs } =
										eachItem;
									const isSelected = selectedItems.includes(id);
									return (
										<motion.div
											key={id}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: index * 0.05 }}
											className={`bg-white rounded-xl p-4 border-2 transition-all duration-200 ${
												isSelected
													? 'border-gold shadow-md'
													: 'border-transparent shadow-sm hover:shadow-md'
											}`}>
											<div className='flex gap-4'>
												<div className='flex items-start gap-3'>
													<input
														type='checkbox'
														className='w-4 h-4 accent-gold mt-1 rounded'
														checked={isSelected}
														onChange={() => handleItemSelect(id)}
													/>
													<div className='relative group'>
														<div
															style={{
																backgroundImage: `url(${photoURLs && photoURLs[0]})`,
															}}
															className='w-20 h-20 bg-gray-100 bg-cover bg-center rounded-lg'
														/>
														<motion.button
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.9 }}
															onClick={() => handleDeleteItem(id)}
															className='absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100'>
															×
														</motion.button>
													</div>
												</div>

												<div className='flex-1 min-w-0'>
													<h3 className='font-medium text-main font-bison truncate pr-2'>
														{name}
													</h3>
													<p className='text-sm text-gray-500 mt-1'>
														Size: {size}
													</p>
													<p className='text-lg font-bold text-gold mt-2 font-bison'>
														₦{price.toLocaleString('en-NG')}
													</p>
												</div>

												<div className='flex flex-col items-end justify-between'>
													<div className='text-right'>
														<p className='text-xs text-gray-400'>Total</p>
														<p className='font-bold text-main font-bison'>
															₦{(price * quantity).toLocaleString('en-NG')}
														</p>
													</div>
													<div className='flex items-center border border-gray-200 rounded-lg overflow-hidden'>
														<motion.button
															whileHover={{ backgroundColor: '#f9fafb' }}
															whileTap={{ scale: 0.95 }}
															onClick={() => handleDecreaseQuantity(id)}
															className='w-8 h-8 flex items-center justify-center transition-colors'
															disabled={quantity <= 1}>
															<MinusOutlined className='text-xs text-gray-600' />
														</motion.button>
														<span className='w-10 text-center text-sm font-medium font-bison'>
															{quantity}
														</span>
														<motion.button
															whileHover={{ backgroundColor: '#f9fafb' }}
															whileTap={{ scale: 0.95 }}
															onClick={() => handleIncreaseQuantity(id)}
															className='w-8 h-8 flex items-center justify-center transition-colors'>
															<PlusOutlined className='text-xs text-gray-600' />
														</motion.button>
													</div>
												</div>
											</div>
										</motion.div>
									);
								})}
							</div>
						)}
					</div>
					{/* Footer / Checkout */}
					{cartItems && cartItems.length > 0 && (
						<div className='bg-white border-t border-gray-100 px-6 py-6'>
							<div className='space-y-3 mb-6'>
								<div className='flex items-center justify-between text-sm'>
									<span className='text-gray-500'>Subtotal</span>
									<span className='font-medium text-main font-bison'>
										₦{totalPrice?.toLocaleString('en-NG')}
									</span>
								</div>
								<div className='flex items-center justify-between text-sm'>
									<span className='text-gray-500'>Shipping</span>
									<span className='text-gray-400 text-xs'>
										Calculated at checkout
									</span>
								</div>
								<div className='border-t border-gray-100 pt-3'>
									<div className='flex items-center justify-between'>
										<span className='text-base font-medium text-main font-bison'>
											Total
										</span>
										<span className='text-xl font-bold text-main font-bison'>
											₦{totalPrice?.toLocaleString('en-NG')}
										</span>
									</div>
								</div>
							</div>

							<motion.button
								whileHover={{ scale: 1.01, backgroundColor: '#D4AF37' }}
								whileTap={{ scale: 0.99 }}
								onClick={checkOut}
								className='w-full bg-main text-white font-medium py-4 rounded-xl transition-all duration-300 font-bison text-base tracking-wide'>
								Proceed to Checkout
							</motion.button>

							<button
								onClick={() => {
									navigate('/shop');
									setOpenCart(false);
								}}
								className='w-full text-center text-sm text-gray-500 hover:text-main mt-4 transition-colors'>
								Continue Shopping
							</button>
						</div>
					)}
				</motion.div>
			</div>
		</AnimatePresence>
	);
};

export default CartItems;
