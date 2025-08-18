import {
	LeftOutlined,
	MinusOutlined,
	PlusOutlined,
	RightOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { StoreContext } from '../../../utils/context/store/StoreContext';
import { StoreProps } from '../../../utils/context/store/StoreProps';
import { Controller, useForm } from 'react-hook-form';
import TextArea from 'antd/es/input/TextArea';
import { UserContext } from '../../../utils/context/user/UserContext';
import { UserProps } from '../../../utils/context/user/types/UserType';
import { PaystackButton } from 'react-paystack';
import { fetchUserById } from '../../../utils/firebase/auth/firebaseAuth';
import emailjs from '@emailjs/browser';
import {
	addOrderToFirestore,
	addOrderToUserFirestore,
} from '../../../utils/firebase/products/productConfig';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Import modules directly from 'swiper'
import 'swiper/swiper-bundle.css';
import ProductCard from '../components/product-card/ProductCard';
import { AdminDashboardContext } from '../../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../../utils/context/admin-state-context/types/AdminTypes';

interface CheckOutProps {
	message: string;
}

interface UserFromDocProps {
	displayName: string;
	email: string;
	id: string;
	phoneNo: string;
}

const Checkout = () => {
	const { cartItems, setCartItems } = useContext(StoreContext) as StoreProps;
	const { user } = useContext(UserContext) as UserProps;
	const [userFromDoc, setUserFromDoc] = useState<UserFromDocProps | null>(null);
	const [couponCode, setCouponCode] = useState('');
	const navigate = useNavigate();
	const swiperRef = useRef<SwiperCore| null>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;
	const goToNextSlide = () => {
		swiperRef.current?.slideNext();
	};

	const goToPrevSlide = () => {
		swiperRef.current?.slidePrev();
	};

	useEffect(() => {
		if (user) {
			fetchUserById(user.uid)
				.then((fetchedUser) => {
					if (fetchedUser) {
						console.log('User data:', fetchedUser);
						setUserFromDoc(fetchedUser);
					}
				})
				.catch((error) => {
					console.error('Error fetching user document:', error);
				});
		}
	}, [user]);

	const [orderNote, setOrderNote] = useState(false);
	const { control } = useForm<CheckOutProps>();

	const totalPrice = cartItems?.reduce((sum, item) => {
		return sum + item.price * item.quantity;
	}, 0);

	// Mock discount and tax for display (you can integrate real logic)
	const discount = 0;
	const tax = 0;
	const finalTotal = (totalPrice || 0) - discount + tax;

	const handleDeleteItem = (id: string) => {
		const updatedCartItems = cartItems?.filter((item) => item.id !== id) || [];
		setCartItems(updatedCartItems);
		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
	};

	const handleIncreaseQuantity = (id: string) => {
		const updatedCartItems =
			cartItems?.map((item) => {
				if (item.id === id) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			}) || [];

		setCartItems(updatedCartItems);
		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
	};

	const handleDecreaseQuantity = (id: string) => {
		const updatedCartItems =
			cartItems?.map((item) => {
				if (item.id === id && item.quantity > 1) {
					return { ...item, quantity: item.quantity - 1 };
				}
				return item;
			}) || [];

		setCartItems(updatedCartItems);
		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
	};

	const sendEmailOnSuccess = (
		userFromDoc: UserFromDocProps,
		amount: number
	) => {
		emailjs.init('mESjxZ_og4PkWRGaA');

		const templateParams = {
			customerName: userFromDoc?.displayName ?? 'Anonymous',
			customerEmail: userFromDoc?.email ?? 'default@example.com',
			orderNumber: crypto.randomUUID(),
			amount: amount,
			message: orderNote,
			phone_number: userFromDoc?.phoneNo,
		};

		emailjs.send('service_x1xb88n', 'template_vswwvhp', templateParams).then(
			(response) => {
				console.log('SUCCESS!', response.status, response.text);
			},
			(error) => {
				console.error('FAILED...', error);
			}
		);
	};

	const publicKey = 'pk_test_fb59388796c0aacc4979c718eac130656df09539';
	const amount = (totalPrice ?? 0) * 100;

	const componentProps = {
		email: user?.email ?? 'default@example.com',
		amount: amount,
		metadata: {
			custom_fields: [
				{
					display_name: userFromDoc?.displayName ?? 'Anonymous',
					variable_name: userFromDoc?.displayName ?? 'anonymous_display_name',
					value: userFromDoc?.displayName ?? 'Anonymous',
				},
				{
					display_name: 'Phone Number',
					variable_name: 'phone_number',
					value: userFromDoc?.phoneNo ?? 'Not provided',
				},
			],
		},
		publicKey,
		text: 'Go to Checkout →',
		onSuccess: async () => {
			if (userFromDoc) {
				const orderData = {
					amount: totalPrice,
					orderItems: cartItems,
					name: userFromDoc.displayName,
					email: userFromDoc.email,
					phoneNo: userFromDoc.phoneNo ?? 'Not provided',
					message: orderNote,
					orderNumber: crypto.randomUUID(),
					uid: user?.uid as string
				};

				await addOrderToFirestore(orderData);
				await addOrderToUserFirestore(userFromDoc.id, {
					orderNumber: crypto.randomUUID(),
					amount: totalPrice ?? 0,
					cartItems: cartItems ?? [],
				});

				sendEmailOnSuccess(userFromDoc, amount);
				navigate('/order-history');
			} else {
				console.error('User information is not available.');
			}
		},
		onClose: () => alert("Wait! Don't leave :("),
	};

	return (
		<div className='min-h-screen bg-gray-50 py-8 px-4'>
			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Left Section - Cart Items */}
					<div className='lg:col-span-2'>
						<div className='bg-white rounded-2xl p-6 shadow-sm'>
							{/* Header */}
							<div className='flex items-center justify-between mb-6'>
								<h1 className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
									Your cart <ShoppingCartOutlined />
								</h1>
							
							</div>

							<div className='text-sm text-gray-500 mb-6'>
								{cartItems?.length} Item{cartItems?.length !== 1 ? 's' : ''}
							</div>

							{/* Cart Items */}
							<div className='space-y-4'>
								{cartItems?.map((eachItem) => {
									const { name, category, size, price, quantity, id, photoURL } = eachItem;

									return (
										<div key={id} className='flex items-center gap-4 p-4 border border-gray-200 rounded-xl'>
										

											{/* Product Image */}
											<div className='relative'>
												<div
													style={{ backgroundImage: `url(${photoURL})` }}
													className='w-20 h-20 bg-gray-200 bg-cover bg-center rounded-lg'
												></div>
												<button
													onClick={() => handleDeleteItem(id)}
													className='absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors'
												>
													×
												</button>
											</div>

											{/* Product Info */}
											<div className='flex-1'>
												<h3 className='font-medium text-gray-900'>{name}</h3>
												<div className='text-sm text-gray-500 mt-1'>
													<span>Category: {category}</span>
													<span className='mx-2'>•</span>
													<span>Size: {size}</span>
												</div>
												<div className='text-lg font-bold text-gray-900 mt-2'>
													₦{price?.toLocaleString('en-NG')}
												</div>
											</div>

											{/* Quantity Controls */}
											<div className='flex items-center border border-gray-300 rounded-lg'>
												<button
													onClick={() => handleDecreaseQuantity(id)}
													className='p-2 hover:bg-gray-100 transition-colors'
													disabled={quantity <= 1}
												>
													<MinusOutlined className='text-xs' />
												</button>
												<span className='px-4 py-2 text-sm font-medium min-w-[3rem] text-center'>
													{quantity}
												</span>
												<button
													onClick={() => handleIncreaseQuantity(id)}
													className='p-2 hover:bg-gray-100 transition-colors'
												>
													<PlusOutlined className='text-xs' />
												</button>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>

					{/* Right Section - Order Summary */}
					<div className='lg:col-span-1'>
						<div className='bg-white rounded-2xl p-6 shadow-sm sticky top-8'>
							<h2 className='text-xl font-semibold text-gray-900 mb-6'>Order Summary</h2>

							{/* Coupon Code */}
							<div className='mb-6'>
								<div className='flex gap-2'>
									<input
										type='text'
										placeholder='Coupon Code'
										value={couponCode}
										onChange={(e) => setCouponCode(e.target.value)}
										className='flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
									/>
									<button className='bg-gray-900 text-white px-6 py-3 rounded-lg text-sm hover:bg-gray-800 transition-colors'>
										Apply
									</button>
								</div>
							</div>

							{/* Order Details */}
							<div className='space-y-4 mb-6'>
								<div className='flex justify-between text-gray-600'>
									<span>Subtotal ({cartItems?.length} items)</span>
									<span>₦{totalPrice?.toLocaleString('en-NG')}</span>
								</div>
								{discount > 0 && (
									<div className='flex justify-between text-gray-600'>
										<span>Discount</span>
										<span className='text-red-500'>-₦{discount.toLocaleString('en-NG')}</span>
									</div>
								)}
								{tax > 0 && (
									<div className='flex justify-between text-gray-600'>
										<span>Tax</span>
										<span>₦{tax.toLocaleString('en-NG')}</span>
									</div>
								)}
								<div className='border-t pt-4'>
									<div className='flex justify-between text-lg font-bold text-gray-900'>
										<span>Total</span>
										<span>₦{finalTotal.toLocaleString('en-NG')}</span>
									</div>
								</div>
							</div>

							{/* Order Notes Toggle */}
							<div className='mb-6'>
								<button
									onClick={() => setOrderNote(!orderNote)}
									className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors'
								>
									{orderNote ? <MinusOutlined /> : <PlusOutlined />}
									<span className='underline'>Add order notes</span>
								</button>

								{orderNote && (
									<div className='mt-3'>
										<Controller
											name='message'
											control={control}
											render={({ field }) => (
												<TextArea
													{...field}
													placeholder='Add special instructions for the seller...'
													className='w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
													rows={3}
												/>
											)}
										/>
									</div>
								)}
							</div>

							{/* Checkout Button */}
							<PaystackButton
								className='w-full bg-gray-900 text-white py-4 rounded-xl font-medium text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2'
								{...componentProps}
							/>

							{/* Additional Info */}
							<p className='text-xs text-gray-500 mt-4 text-center'>
								Taxes and shipping calculated at checkout
							</p>
						</div>
					</div>
				</div>
			</div>

			<main className=' mt-8 md:mt-24'>
				<div className=' px-12 flex justify-center items-center'>
					<h1 className=' text-main text-center font-bold font-poppins text-5xl'>
					Similar Products
					</h1>
				</div>
				<div className=' mt-12  flex   w-full'>
					<Swiper
						onSwiper={(swiper) => (swiperRef.current = swiper)}
						className='w-full flex  md:max-w-[1024px]'
						modules={[Navigation, Pagination, Autoplay]}
						spaceBetween={0}
						autoplay={{ delay: 3000, disableOnInteraction: false }}
						breakpoints={{
							320: {
								slidesPerView: 1,
								spaceBetween: 10,
							},
							480: {
								slidesPerView: 1,
								spaceBetween: 10,
							},
							768: {
								slidesPerView: 3,
								spaceBetween: 10,
							},
							1024: {
								slidesPerView: 4,
								spaceBetween: 10,
							},
						}}>
						{products?.map((product) => {
							const { id, name, price, category, photoURL, size, quantity } =
								product;
							return (
								<SwiperSlide key={id} className='flex justify-center items-center '>
									<ProductCard
										key={id}
										name={name}
										price={price}
										category={category}
										photoURL={photoURL}
										id={id}
										size={size}
										quantity={quantity}
									/>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
				<div className='ml-auto flex justify-center items-center mt-8 gap-5 text-slate-500 text-3xl'>
					<div
						className='w-12 h-12 rounded-full hover:bg-black hover:text-white text-black border border-black flex items-center justify-center cursor-pointer'
						onClick={goToPrevSlide}>
						<LeftOutlined />
					</div>

					<div
						className='w-12 h-12 rounded-full hover:bg-black hover:text-white text-black border border-black flex items-center justify-center cursor-pointer'
						onClick={goToNextSlide}>
						<RightOutlined />
					</div>
				</div>
			</main>
		</div>
	);
};

export default Checkout;