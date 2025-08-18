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

	const filterSpecificProduct =
		products?.filter((eachproduct) => {
			return eachproduct.id === id;
		}) || [];

	console.log(filterSpecificProduct);

	const product = filterSpecificProduct[0];

	const { name, photoURL, price, category } = product;

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
			photoURL: product.photoURL || '',
		};

		let updatedCartItems: Cart[];

		if (cartItems) {
			const existingItemIndex = cartItems.findIndex(
				(item) => item.id === newCartItem.id && item.size === newCartItem.size
			);

			if (existingItemIndex > -1) {
				const existingItem = cartItems[existingItemIndex];
				existingItem.quantity += count; // Update quantity

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
							style={{ backgroundImage: `url(${photoURL})` }}
							className='image w-[100%] md:w-[40%] h-[350px] bg-slate-300 bg-cover bg-no-repeat relative group'></div>
						<div className='px-5 w-[100%]  md:w-[60%] flex flex-col overflow-scroll-hidden'>
							<h1 className=' mt-4 md:mt-0  font-bold text-2xl'>{name}</h1>
							<h5 className=' text-slate-300'>{category}</h5>
							<h6>₦{price}</h6>

							<a className=' underline'>View Product Details</a>

							<hr className=' mt-5' />

							<h5 className=' mt-5 font-bold mb-2'>Size</h5>
							<div className=' grid grid-cols-3 gap-4'>
								{size.map((size) => (
									<div
										key={size}
										onClick={() => handleSizeClick(size)} // Handle click event
										className={`border px-5 py-2 cursor-pointer ${
											selectedSize === size
												? 'bg-main text-white'
												: 'border-black '
										}`}>
										{size}
									</div>
								))}
							</div>

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
