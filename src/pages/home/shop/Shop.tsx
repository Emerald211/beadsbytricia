import { useContext, useEffect, useState } from 'react';
import { AdminDashboardContext } from '../../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../../utils/context/admin-state-context/types/AdminTypes';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../components/product-card/ProductCard';
import { Select } from 'antd';
import { AppstoreOutlined, RightOutlined } from '@ant-design/icons';
import { motion } from 'motion/react';

const { Option } = Select;

const images = [
	'/src/assets/SaveClip.App_483359871_18386397514136625_4581056299584229508_n.jpg',
	'/src/assets/SaveClip.App_476169066_18381805549136625_2188100446215539437_n.jpg',
	'/src/assets/SaveClip.App_474803449_18381463141136625_6714615974913905826_n.jpg',
	'/src/assets/SaveClip.App_483381184_18386702329136625_5147461997875932086_n.jpg',
	'/src/assets/SaveClip.App_475591272_18381463150136625_8773503604861933024_n.jpg',
];

const Shop = () => {
	const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;
	const [activeIndex, setActiveIndex] = useState(0);
	const [priceRange, setPriceRange] = useState([0, 300000000]);
	const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
	const [sortOrder, setSortOrder] = useState('Default');
	const [itemsToShow, setItemsToShow] = useState(12);
	const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
	const [displayedProducts, setDisplayedProducts] = useState(products ?? []);

	const navigate = useNavigate();
	const params = useParams();

	const toggleSize = (size: string) => {
		setSelectedSizes((prev) =>
			prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
		);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % images.length);
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (!products) return;

		let filtered = [...products];

		if (filteredCategory) {
			filtered = filtered.filter(
				(product) => product.category === filteredCategory,
			);
		}

		filtered = filtered.filter(
			(product) =>
				product.price >= priceRange[0] && product.price <= priceRange[1],
		);

		if (sortOrder === 'LowToHigh') {
			filtered.sort((a, b) => a.price - b.price);
		} else if (sortOrder === 'HighToLow') {
			filtered.sort((a, b) => b.price - a.price);
		}

		setDisplayedProducts(filtered);
	}, [filteredCategory, priceRange, sortOrder, products]);

	return (
		<>
			<section className='relative font-bison px-12 md:px-24 flex-col bg-cover bg-center h-[50vh] w-full flex justify-center overflow-hidden'>
				<div className='absolute inset-0 bg-black/40 z-20'></div>
				{images.map((img, idx) => (
					<div
						key={idx}
						className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ease-in-out ${
							idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
						}`}
						style={{ backgroundImage: `url(${img})` }}
					/>
				))}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='z-30 w-full text-center'>
					<h1 className='text-white text-5xl font-bison drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)]'>
						Home/{params.category ? params.category : 'Shop'}
					</h1>
				</motion.div>
			</section>

			<section className='flex flex-col md:flex-row gap-10 px-6 md:px-12 py-12'>
				<motion.aside
					initial={{ opacity: 0, x: -30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className='w-full md:w-1/4 bg-white p-6 font-bison'>
					<div className='mb-8'>
						<h2 className='text-lg font-semibold mb-6 text-main'>
							Product Categories
						</h2>

						<ul className='space-y-4'>
							<li
								onClick={() => setFilteredCategory(null)}
								className='flex items-center justify-between text-gray-600 hover:text-gold cursor-pointer py-1 transition-colors'>
								<h3 className=' text-base font-semibold text-gray-800'>
									All Products
								</h3>
								<RightOutlined className='text-xs text-gray-400' />
							</li>
							{['men', 'women'].map((gender) => {
								const genderCategories = [
									...new Set(
										(products ?? [])
											.filter((product) => {
												const g = product.gender?.toLowerCase();
												const isMale = g === 'male' || g === 'men';
												const isFemale = g === 'female' || g === 'women';
												return (
													(gender === 'men' ? isMale : isFemale) &&
													product.category?.toLowerCase() !== 'tissue'
												);
											})
											.map((product) => product.category),
									),
								];

								if (genderCategories.length === 0) return null;

								return (
									<div key={gender} className='mb-6'>
										<h3 className='text-base font-semibold text-gray-800 mb-2'>
											For {gender.charAt(0).toUpperCase() + gender.slice(1)}
										</h3>
										<ul className='space-y-4'>
											{genderCategories.map((category) => (
												<li
													key={category}
													onClick={() => setFilteredCategory(category)}
													className='flex ml-4 items-center justify-between text-gray-600 hover:text-gray-800 cursor-pointer py-1'>
													<span className='text-sm'>{category}</span>
													<RightOutlined className='text-xs text-gray-400' />
												</li>
											))}
										</ul>
									</div>
								);
							})}
						</ul>
					</div>

					<div className='mb-8'>
						<h3 className='text-lg font-semibold mb-6 text-gray-800'>
							Pricing
						</h3>
						<div className='px-2'>
							<div className='flex justify-between text-sm text-gray-600 mb-4'>
								<span>₦{priceRange[0]}</span>
								<span>₦{priceRange[1]}</span>
							</div>
							<div className='relative'>
								<input
									type='range'
									min={0}
									max={3000000}
									value={priceRange[1]}
									onChange={(e) =>
										setPriceRange([priceRange[0], parseInt(e.target.value)])
									}
									className='w-full h-2 rounded-lg appearance-none cursor-pointer slider'
									style={{
										background: `linear-gradient(to right, #ff6b35 0%, #ff6b35 ${
											(priceRange[1] / 3000000) * 100
										}%, #e5e7eb ${(priceRange[1] / 3000000) * 100}%, #e5e7eb 100%)`,
									}}
								/>
							</div>
						</div>
					</div>

					<div className='mb-8'>
						<h3 className='text-lg font-semibold mb-4 text-gray-800'>Size</h3>
						<ul className='flex flex-wrap gap-2'>
							{['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
								<li
									key={size}
									onClick={() => toggleSize(size)}
									className={`border rounded px-3 py-2 text-sm cursor-pointer transition-colors ${
										selectedSizes.includes(size)
											? 'bg-gold text-white border-gold'
											: 'border-gray-300 hover:bg-gray-50 text-gray-600'
									}`}>
									{size}
								</li>
							))}
						</ul>
					</div>
				</motion.aside>

				<motion.main
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='w-full'>
					<div className='flex flex-nowrap items-center justify-between overflow-x-auto px-3 py-2 border rounded-full mb-3 shadow-sm bg-white text-xs text-slate-700 w-full gap-x-3'>
						<div className='flex items-center gap-2 flex-shrink-0 whitespace-nowrap'>
							<button className='text-gold text-lg'>
								<AppstoreOutlined />
							</button>
							<span>
								Showing {Math.min(itemsToShow, displayedProducts.length)} of{' '}
								{displayedProducts.length} item(s)
							</span>
						</div>

						<div className='flex items-center gap-3 flex-shrink-0 whitespace-nowrap'>
							<div className='flex items-center gap-1'>
								<span className='text-slate-500'>Sort</span>
								<Select
									defaultValue='Default'
									size='small'
									className='!min-w-[90px] !text-xs'
									onChange={setSortOrder}>
									<Option value='Default'>Default</Option>
									<Option value='LowToHigh'>Low → High</Option>
									<Option value='HighToLow'>High → Low</Option>
								</Select>
							</div>

							<div className='flex items-center gap-1'>
								<span className='text-slate-500'>Show</span>
								<Select
									value={itemsToShow.toString()}
									size='small'
									className='!min-w-[60px] !text-xs'
									onChange={(value) => setItemsToShow(Number(value))}>
									<Option value='10'>10</Option>
									<Option value='12'>12</Option>
									<Option value='15'>15</Option>
									<Option value='20'>20</Option>
								</Select>
							</div>
						</div>
					</div>

					<div className='flex justify-center flex-wrap gap-2'>
						{displayedProducts.slice(0, itemsToShow).map((product) => {
							const { id, name, price, category, photoURLs, size, quantity } =
								product;
							return (
								<ProductCard
									key={id}
									name={name}
									price={price}
									category={category}
									photoURLs={photoURLs}
									id={id}
									size={size}
									quantity={quantity}
								/>
							);
						})}
					</div>

					{itemsToShow < displayedProducts.length && (
						<div className='flex justify-center mt-6'>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setItemsToShow((prev) => prev + 12)}
								className='bg-main hover:bg-main/90 text-white font-semibold py-2 px-6 rounded-full transition-colors'>
								Show More
							</motion.button>
						</div>
					)}
				</motion.main>
			</section>

			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
				className='relative h-[60vh] overflow-hidden bg-main text-white shadow-xl mx-4 md:mx-16 mb-12 rounded-lg p-8 md:p-16 mt-16 flex items-center'>
				<div className='relative z-10 flex flex-col md:flex-row items-center justify-between md:text-left'>
					<div className='mb-6 md:mb-0 md:mr-8'>
						<h2 className='text-3xl md:text-4xl font-extrabold leading-tight'>
							Grab an Amazing Piece today!
						</h2>
						<p className='mt-2 text-lg md:text-xl font-light opacity-90'>
							Get 5% OFF your entire order. Limited time offer!
						</p>

						<motion.button
							whileHover={{ scale: 1.05, backgroundColor: '#D4AF37' }}
							whileTap={{ scale: 0.95 }}
							onClick={() => navigate('/login')}
							className='mt-5 bg-white text-main px-8 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300'>
							Buy now
						</motion.button>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default Shop;
