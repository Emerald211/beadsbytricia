import ProductCard from './components/product-card/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Import modules directly from 'swiper'
import 'swiper/swiper-bundle.css';
import { useContext, useEffect, useRef, useState } from 'react';
import {  useForm } from 'react-hook-form';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { AdminDashboardContext } from '../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../utils/context/admin-state-context/types/AdminTypes';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import PromoBanner from './components/promo/Promo';

interface EmailSubscriberProps {
	email: string;
}

const images = [
	'/src/assets/SaveClip.App_483359871_18386397514136625_4581056299584229508_n.jpg',
	'/src/assets/SaveClip.App_476169066_18381805549136625_2188100446215539437_n.jpg',

	'/src/assets/SaveClip.App_474803449_18381463141136625_6714615974913905826_n.jpg',
	'/src/assets/SaveClip.App_483381184_18386702329136625_5147461997875932086_n.jpg',
	'/src/assets/SaveClip.App_475591272_18381463150136625_8773503604861933024_n.jpg',
];

const HomeIndexPage = () => {
	const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;

	const swiperRef = useRef<SwiperCore | null>(null);

	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % images.length);
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	const navigate = useNavigate();

	const {
	

		formState: { errors },
	} = useForm<EmailSubscriberProps>();

	console.log(errors);
	const goToNextSlide = () => {
		swiperRef.current?.slideNext();

		
		
	};

	const goToPrevSlide = () => {
		swiperRef.current?.slidePrev();
	};
	return (
		<>
			<section className=' relative  abg-no-repeat justify-center  px-12 md:px-24 flex-col bg-inherit bg-cover bg-center h-[100vh] md:h-[90vh] w-full flex'>
				<div className='absolute z-20 inset-0 bg-black/40 h-full'></div>
				{images.map((img, idx) => (
					<div
						key={idx}
						className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ease-in-out ${
							idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
						}`}
						style={{ backgroundImage: `url(${img})` }}
					/>
				))}
				<div className=' z-30 w-full md:w-[60%] font-poppins '>
					<motion.h1 className='text-white text-5xl font-extrabold drop-shadow-[0_2px_4px_rgba(255, 255, 255, 0.9)]'>
						Nigeria’s No.1 Bead Accessories Brand
					</motion.h1>
					<p className=' mt-3 text-slate-100 font-bold'>
						From timeless classics to bold statements — our pieces are crafted
						to elevate every look. Trusted by thousands across the country.
					</p>

					<button
						onClick={() => navigate('/shop')}
						className='relative font-bold w-[150px] text-white mt-8 font-poppins px-4 py-4 bg-main'>
						SHOP NOW
					</button>
				</div>
			</section>

			<section className='  md:h-auto md:mt-12 mt-6  px-8 md:px-16  font-poppins grid gap-10 md:grid-cols-2 grid-cols-1'>
				<div className=' flex flex-col justify-center p-5'>
					<h1 className='text-4xl md:text-5xl font-bold font-poppins text-main leading-tight'>
						Level Up Your Style
					</h1>
					<p className='mt-4 text-base  md:text-xl text-gray-700 leading-relaxed max-w-lg'>
						Get our premium bundles designed to elevate any traditional outfit.
						Stylish, timeless, and up to{' '}
						<span className='font-bold text-[#982F4B]'>30% off</span>.
					</p>

					<button
						onClick={() => navigate('/shop')}
						className='mt-6 inline-block w-40 px-6 py-2 bg-[#982F4B] text-white font-medium rounded-full hover:bg-[#7c243c] transition'>
						Shop Now
					</button>
				</div>

				<div className='relative flex justify-center items-center'>
					<img
						src='/src/assets/SaveClip.App_481994610_18385190431136625_1014949194919151044_n.jpg'
						alt='Styled model in agbada'
						className='w-full h-full object-cover rounded-xl shadow-lg'
					/>
					<div className='absolute bottom-4 right-4 bg-white px-3 py-1 text-sm font-semibold rounded shadow text-[#982F4B]'>
						Signature Look
					</div>
				</div>
			</section>

			<main className=' mt-8 md:mt-24'>
				<div className=' px-12 flex justify-center items-center'>
					<h1 className=' text-main text-center font-bold font-poppins text-5xl'>
					Just In: Our Latest Products
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


			<div className=' mt-24 px-8 md:px-16'>
				<h1 className='text-4xl text-center md:text-5xl font-extrabold text-main mb-4'>
					Browse Top Selling Products
				</h1>
			</div>

			<section className=' mt-2  flex justify-center items-center flex-col'>
				<div className=' mt-4 md:mt-12 flex justify-center flex-wrap gap-3 '>
					{products?.slice(0, 8).map((product) => {
						const { id, name, price, category, photoURL, size, quantity } =
							product;
						return (
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
						);
					})}
				</div>

				<button
					onClick={() => navigate('/shop')}
					className='border border-main px-5 py-3 rounded-full mt-8 hover:bg-black hover:border-black hover:text-white'>
					View all collections
				</button>
			</section>

			

			{/* <main className=' mt-8 md:mt-24'>
				<div className=' px-12 flex justify-center items-center'>
					<h1 className=' text-main text-center font-bold font-poppins text-5xl'>
						Browse Top Selling Products
					</h1>
				</div>
				<div className=' mt-12  flex  w-full'>
					<Swiper
						onSwiper={(swiper) => (swiperRef.current = swiper)}
						className='w-full md:max-w-[1024px]'
						modules={[Navigation, Pagination, Autoplay]}
						spaceBetween={0}
						autoplay={{ delay: 3000, disableOnInteraction: false }}
						breakpoints={{
							320: {
								slidesPerView: 2,
								spaceBetween: 10,
							},
							480: {
								slidesPerView: 2,
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
							const { id, category, photoURL } = product;
							return (
								<SwiperSlide key={id} className='flex '>
									<CategoryDisplayCard
										category={category}
										imageURL={photoURL}
									/>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>

				<div className='ml-auto flex justify-center items-center mt-8 gap-5 text-slate-500 text-3xl'>
					<div
						className='w-12 h-12 rounded-full text-black border border-black flex items-center justify-center cursor-pointer'
						onClick={goToPrevSlide}>
						<LeftOutlined />
					</div>

					<div
						className='w-12 h-12 rounded-full text-black border border-black flex items-center justify-center cursor-pointer'
						onClick={goToNextSlide}>
						<RightOutlined />
					</div>
				</div>
			</main> */}

			<PromoBanner />
			
		</>
	);
};

export default HomeIndexPage;
