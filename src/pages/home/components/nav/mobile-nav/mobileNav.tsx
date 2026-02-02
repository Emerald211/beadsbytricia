import { useContext, useState } from 'react';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../../../utils/context/store/StoreContext';
import { StoreProps } from '../../../../../utils/context/store/StoreProps';

const MobileNav = () => {
	const navigate = useNavigate();

	const { setMobileNav } = useContext(StoreContext) as StoreProps;
	const [openMenu, setOpenMenu] = useState<string | null>(null);

	const toggleMenu = (menu: string) => {
		setOpenMenu(openMenu === menu ? null : menu);
	};

	return (
		<div className='z-50 fixed w-screen font-bison top-0 left-0 h-screen flex'>
			{/* Dark Overlay */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.6 }}
				exit={{ opacity: 0 }}
				className='absolute inset-0 bg-black z-40'
				onClick={() => setMobileNav(false)}
			/>

			{/* Mobile Nav Panel */}
			<motion.div
				initial={{ x: '-100%' }}
				animate={{ x: 0 }}
				exit={{ x: '-100%' }}
				transition={{ type: 'spring', damping: 25, stiffness: 200 }}
				className='w-[85%] max-w-[350px] px-6 py-6 z-50 bg-white relative h-full overflow-y-auto'>
				{/* Header with Close Button */}
				<div className='flex items-center justify-between mb-8 pb-4 border-b border-gray-200'>
					<h1
						className='text-main font-bison font-bold text-xl cursor-pointer'
						onClick={() => {
							navigate('/');
							setMobileNav(false);
						}}>
						BeadsbyTricia
					</h1>

					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => setMobileNav(false)}
						className='w-10 h-10 bg-main text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gold transition-colors'>
						<CloseOutlined className='text-lg' />
					</motion.button>
				</div>

				<ul className='space-y-4 text-base'>
					<li>
						<button
							onClick={() => toggleMenu('new')}
							className='w-full text-left flex justify-between items-center py-2 text-main font-medium hover:text-gold transition-colors'>
							What's new{' '}
							<DownOutlined
								className={`text-[10px] transition-transform duration-300 ${openMenu === 'new' ? 'rotate-180' : ''}`}
							/>
						</button>
						<AnimatePresence>
							{openMenu === 'new' && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.2 }}
									className='flex flex-col mt-2 pl-4 gap-3 overflow-hidden'>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('/new-arrival');
											setMobileNav(false);
										}}>
										New Arrivals
									</p>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('/trending');
											setMobileNav(false);
										}}>
										Trending
									</p>
								</motion.div>
							)}
						</AnimatePresence>
					</li>

					<li>
						<button
							onClick={() => toggleMenu('shop')}
							className='w-full text-left flex justify-between items-center py-2 text-main font-medium hover:text-gold transition-colors'>
							Shop{' '}
							<DownOutlined
								className={`text-[10px] transition-transform duration-300 ${openMenu === 'shop' ? 'rotate-180' : ''}`}
							/>
						</button>
						<AnimatePresence>
							{openMenu === 'shop' && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.2 }}
									className='flex flex-col mt-2 pl-4 gap-3 overflow-hidden'>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('/shop');
											setMobileNav(false);
										}}>
										All Products
									</p>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('/popular-items');
											setMobileNav(false);
										}}>
										Popular Items
									</p>
								</motion.div>
							)}
						</AnimatePresence>
					</li>

					<li>
						<button
							onClick={() => toggleMenu('men')}
							className='w-full text-left flex justify-between items-center py-2 text-main font-medium hover:text-gold transition-colors'>
							Men{' '}
							<DownOutlined
								className={`text-[10px] transition-transform duration-300 ${openMenu === 'men' ? 'rotate-180' : ''}`}
							/>
						</button>
						<AnimatePresence>
							{openMenu === 'men' && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.2 }}
									className='flex flex-col mt-2 pl-4 gap-3 overflow-hidden'>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('/bracelet-stacks');
											setMobileNav(false);
										}}>
										Bracelet stacks
									</p>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('/neck-candies');
											setMobileNav(false);
										}}>
										Neck candies
									</p>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('/grooms-owanbe-sets');
											setMobileNav(false);
										}}>
										Groom's/Owambe sets
									</p>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('/walking-sticks');
											setMobileNav(false);
										}}>
										Walking sticks
									</p>
								</motion.div>
							)}
						</AnimatePresence>
					</li>

					<li>
						<button
							onClick={() => toggleMenu('women')}
							className='w-full text-left flex justify-between items-center py-2 text-main font-medium hover:text-gold transition-colors'>
							Women{' '}
							<DownOutlined
								className={`text-[10px] transition-transform duration-300 ${openMenu === 'women' ? 'rotate-180' : ''}`}
							/>
						</button>
						<AnimatePresence>
							{openMenu === 'women' && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.2 }}
									className='flex flex-col mt-2 pl-4 gap-3 overflow-hidden'>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('statement-earrings');
											setMobileNav(false);
										}}>
										Statement earrings
									</p>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('beaded-bags');
											setMobileNav(false);
										}}>
										Beaded bags
									</p>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('bracelet-stacks');
											setMobileNav(false);
										}}>
										Bracelet stacks
									</p>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('bridal');
											setMobileNav(false);
										}}>
										Bridal
									</p>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('statement-throwon');
											setMobileNav(false);
										}}>
										Statement throw-ons
									</p>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('gemstone-pendant');
											setMobileNav(false);
										}}>
										Gemstone pendants
									</p>
								</motion.div>
							)}
						</AnimatePresence>
					</li>

					<li>
						<button
							onClick={() => toggleMenu('contact')}
							className='w-full text-left flex justify-between items-center py-2 text-main font-medium hover:text-gold transition-colors'>
							Contact us{' '}
							<DownOutlined
								className={`text-[10px] transition-transform duration-300 ${openMenu === 'contact' ? 'rotate-180' : ''}`}
							/>
						</button>
						<AnimatePresence>
							{openMenu === 'contact' && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.2 }}
									className='flex flex-col mt-2 pl-4 gap-3 overflow-hidden'>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('/contact');
											setMobileNav(false);
										}}>
										Contact Information
									</p>
									<p
										className='text-gray-600 hover:text-gold cursor-pointer transition-colors py-1'
										onClick={() => {
											navigate('/contact');
											setMobileNav(false);
										}}>
										Support
									</p>
								</motion.div>
							)}
						</AnimatePresence>
					</li>
				</ul>

				{/* Footer CTA */}
				<div className='mt-10 pt-6 border-t border-gray-200'>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={() => {
							navigate('/login');
							setMobileNav(false);
						}}
						className='w-full bg-main text-white py-3 rounded-lg font-medium hover:bg-gold transition-colors'>
						Sign In / Register
					</motion.button>
				</div>
			</motion.div>
		</div>
	);
};

export default MobileNav;
