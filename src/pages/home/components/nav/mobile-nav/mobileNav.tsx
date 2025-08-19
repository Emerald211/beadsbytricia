import { useContext, useState } from 'react';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';

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
		<div className=' z-40 fixed w-screen font-poppins top-0 left-0 h-screen  flex'>
			<div className=' w-[90%] md:w-[40%] opacity-100 px-5 py-5 z-40 bg-white relative h-full ml-auto overflow-scroll '>
				<div className=' '>
					<div className='flex font-poppins gap-6 flex-col '>
						<div className=' flex '>
							<h1
								className='text-main font-poppins font-bold text-2xl md:text-3xl cursor-pointer'
								onClick={() => navigate('/')}>
								BeadsbyTricia
							</h1>

							<CloseOutlined
								className=' ml-auto'
								onClick={() => setMobileNav(false)}
							/>
						</div>

						<ul className='gap-3 text-sm flex flex-col'>
							<li>
								<button
									onClick={() => toggleMenu('new')}
									className='underline-custom w-full text-left flex justify-between items-center'>
									What's new <DownOutlined className='text-[10px]' />
								</button>
								{openMenu === 'new' && (
									<div className='flex flex-col mt-2 pl-4 gap-3 font-serrat'>
										<p
											onClick={() => {
												navigate('/new-arrival');
												setMobileNav(false);
											}}>
											New Arrivals
										</p>
										<p
											onClick={() => {
												navigate('/trending');
												setMobileNav(false);
											}}>
											Trending
										</p>
									</div>
								)}
							</li>

							<li>
								<button
									onClick={() => toggleMenu('shop')}
									className='underline-custom w-full text-left flex justify-between items-center'>
									Shop <DownOutlined className='text-[10px]' />
								</button>
								{openMenu === 'shop' && (
									<div className='flex flex-col mt-2 pl-4 gap-3 font-serrat'>
										<p
											onClick={() => {
												navigate('/shop');
												setMobileNav(false);
											}}>
											All Products
										</p>
										<p
											onClick={() => {
												navigate('/popular-items');
												setMobileNav(false);
											}}>
											Popular Items
										</p>
									</div>
								)}
							</li>

							<li>
								<button
									onClick={() => toggleMenu('men')}
									className='underline-custom w-full text-left flex justify-between items-center'>
									Men <DownOutlined className='text-[10px]' />
								</button>
								{openMenu === 'men' && (
									<div className='flex flex-col mt-2 pl-4 gap-3 font-serrat'>
										<p
											onClick={() => {
												navigate('/bracelet-stacks');
												setMobileNav(false);
											}}>
											Bracelet stacks
										</p>
										<p
											onClick={() => {
												navigate('/neck-candies');
												setMobileNav(false);
											}}>
											Neck candies
										</p>
										<p
											onClick={() => {
												navigate('/grooms-owanbe-sets');
												setMobileNav(false);
											}}>
											Groom’s/Owambe sets
										</p>
										<p
											onClick={() => {
												navigate('/walking-sticks');
												setMobileNav(false);
											}}>
											Walking sticks
										</p>
									</div>
								)}
							</li>

							<li>
								<button
									onClick={() => toggleMenu('women')}
									className='underline-custom w-full text-left flex justify-between items-center'>
									Women <DownOutlined className='text-[10px]' />
								</button>
								{openMenu === 'women' && (
									<div className='flex flex-col mt-2 pl-4 gap-3 font-serrat'>
										<p
											onClick={() => {
												navigate('statement-earrings');
												setMobileNav(false);
											}}>
											Statement earrings
										</p>
										<p
											onClick={() => {
												navigate('beaded-bags');
												setMobileNav(false);
											}}>
											Beaded bags
										</p>
										<p
											onClick={() => {
												navigate('bracelet-stacks');
												setMobileNav(false);
											}}>
											Bracelet stacks
										</p>
										<p
											onClick={() => {
												navigate('bridal');
												setMobileNav(false);
											}}>
											Bridal
										</p>
										<p
											onClick={() => {
												navigate('statement-throwon');
												setMobileNav(false);
											}}>
											Statement throw-ons
										</p>
										<p
											onClick={() => {
												navigate('gemstone-pendant');
												setMobileNav(false);
											}}>
											Gemstone pendants
										</p>
									</div>
								)}
							</li>

							<li>
								<button
									onClick={() => toggleMenu('contact')}
									className='underline-custom w-full text-left flex justify-between items-center'>
									Contact us <DownOutlined className='text-[10px]' />
								</button>
								{openMenu === 'contact' && (
									<div className='flex flex-col mt-2 pl-4 gap-3 font-serrat'>
										<p
											onClick={() => {
												navigate('/contact');
												setMobileNav(false);
											}}>
											Contact Information
										</p>
										<p
											onClick={() => {
												navigate('/contact');
												setMobileNav(false);
											}}>
											Support
										</p>
									</div>
								)}
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className=' w-[10%] md:w-[60%] h-full bg-slate-900 opacity-75 '></div>
		</div>
	);
};

export default MobileNav;
