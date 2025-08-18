import { useContext } from 'react';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';

import {  useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../../utils/context/user/UserContext';
import { UserProps } from '../../../../../utils/context/user/types/UserType';
import { StoreContext } from '../../../../../utils/context/store/StoreContext';
import { StoreProps } from '../../../../../utils/context/store/StoreProps';
import { logOutUser } from '../../../../../utils/firebase/auth/firebaseAuth';

const MobileNav = () => {
	const navigate = useNavigate();

	const { user } = useContext(UserContext) as UserProps;
	const { setMobileNav } = useContext(StoreContext) as StoreProps;

	return (
		<div className=' z-40 fixed w-screen top-0 left-0 h-screen  flex'>
			<div className=' w-[90%] md:w-[40%] opacity-100 px-5 py-5 z-40 bg-white relative h-full ml-auto overflow-scroll '>
				<div className=' '>
					<div className='flex font-serrat gap-6 flex-col '>
						<div className=' flex '>
							<h1
								className='text-main font-serrat font-bold text-2xl md:text-3xl cursor-pointer'
								onClick={() => navigate('/')}>
								Luxenexus
							</h1>

							<CloseOutlined
								className=' ml-auto'
								onClick={() => setMobileNav(false)}
							/>
						</div>
						<ul className='flex flex-col text-main  gap-5 text-sm'>
							<li className='relative group'>
								<h1  className='underline-custom'>
									What's new
								</h1>
								{/* Hover Dropdown */}
								<div className='absolute z-30 hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									<p onClick={() => {
										navigate('/new-arrival')
										setMobileNav(false)
									 }}>New Arrivals</p>
									<p onClick={() => {
										navigate('/trending')
										setMobileNav(false)
									 }}>Trending</p>
								</div>
							</li>

							<li className='relative group'>
								<h1  className='underline-custom'>
									Shop
								</h1>
								<div className='absolute z-30 hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
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
							</li>

							<li className='relative group'>
								<h1
									onClick={() => {
										navigate('/clothing');
										setMobileNav(false);
									}}
									className='underline-custom'>
									Clothing
								</h1>
							</li>

							<li className='relative group'>
								<h1
									onClick={() => {
										navigate('/bag');
										setMobileNav(false);
									}}
									className='underline-custom'>
									Bags
								</h1>
							</li>

							<li className='relative group'>
								<h1 onClick={() => {
										navigate('/shoes');
										setMobileNav(false);
									}}  className='underline-custom'>
									Shoes
								</h1>
							</li>

							<li className='relative flex items-end underline-custom group'>
								<h1  className='flex items-center'>
									Men <DownOutlined className='text-[10px]' />
								</h1>
								<div className='absolute z-30 hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									<p
										onClick={() => {
											navigate('/men-clothing');
											setMobileNav(false);
										}}>
										Men's Clothing
									</p>
									<p
										onClick={() => {
											navigate('/men-accesories');
											setMobileNav(false);
										}}>
										Men's Accessories
									</p>
								</div>
							</li>

							<li className='relative flex items-end underline-custom group'>
								<h1 className='flex items-center'>
									Women <DownOutlined className='text-[10px]' />
								</h1>
								<div className='absolute z-30 hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									<p
										onClick={() => {
											navigate('/women-clothing');
											setMobileNav(false);
										}}>
										Women's Clothing
									</p>
									<p
										onClick={() => {
											navigate('/women-acccesories');
											setMobileNav(false);
										}}>
										Women's Accessories
									</p>
								</div>
							</li>

							<li className='relative group'>
								<h1 className='underline-custom'>
									Contact us
								</h1>
								<div className='absolute hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
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
							</li>

							<li>
								{user ? (
									<div className=' flex flex-col gap-5'>
										<p onClick={() => navigate('/shop')}>View Profile</p>
										<p
											onClick={() => {
												navigate('/profile');
												logOutUser(user);
												setMobileNav(false);
											}}>
											Logout
										</p>
									</div>
								) : (
									<div className=' flex flex-col gap-5'>
										<h1
											onClick={() => {
												navigate('/login');
												setMobileNav(false);
											}}>
											{' '}
											Create an Account
										</h1>
										<h2
											onClick={() => {
												navigate('/login');
												setMobileNav(false);
											}}>
											Login
										</h2>
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
