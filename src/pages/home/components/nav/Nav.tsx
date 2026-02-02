import {
	DownOutlined,
	MenuFoldOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Badge, Carousel } from 'antd';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { StoreContext } from '../../../../utils/context/store/StoreContext';
import { StoreProps } from '../../../../utils/context/store/StoreProps';
import CartItems from '../cart-items/CartItems';
import './nav.css';
import { UserContext } from '../../../../utils/context/user/UserContext';
import { UserProps } from '../../../../utils/context/user/types/UserType';
import MobileNav from './mobile-nav/mobileNav';
import { logOutUser } from '../../../../utils/firebase/auth/firebaseAuth';
import Logo from '/BEADT.jpg';

const Nav = () => {
	const navigate = useNavigate();

	const { cartItems, openCart, setOpenCart, mobileNav, setMobileNav } =
		useContext(StoreContext) as StoreProps;
	const { user } = useContext(UserContext) as UserProps;
	return (
		<>
			<AnimatePresence>{mobileNav && <MobileNav />}</AnimatePresence>
			<motion.nav
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
				className='font-bison sticky top-0 z-50 bg-white shadow-sm'>
				<Carousel
					dots={false}
					arrows={true}
					className='bg-main py-2 flex text-sm items-center text-white text-center justify-center'
					autoplay>
					<div>
						<h3>
							Get 10% off your first order!...
							<Link
								className='text-gold font-semibold hover:text-white transition-colors'
								to='/login'>
								Sign up now!
							</Link>
						</h3>
					</div>
					<div>
						<h3>
							Fast Delivery Worldwide!...{' '}
							<Link
								className='text-gold font-semibold hover:text-white transition-colors'
								to='/login'>
								Sign up now!
							</Link>
						</h3>
					</div>
				</Carousel>

				<header className='py-2 md:px-12 px-4 flex md:items-end items-center gap-5 md:gap-0 justify-between font-bison relative'>
					<div>
						<MenuFoldOutlined
							className=' lg:hidden'
							onClick={() => setMobileNav(true)}
						/>
						{/* <SearchOutlined className=" cursor-pointer text-[18px] md:text-[24px]" /> */}
					</div>

					<div className='flex font-bison gap-1 flex-col items-center'>
						<h1
							className='text-main font-bison font-bold cursor-pointer'
							onClick={() => navigate('/')}>
							<img src={Logo} alt='Logo' className=' w-16 h-16' />
						</h1>
						<ul className='flex desktopNav gap-5 text-sm'>
							<li className='relative group'>
								<Link to='#' className='underline-custom'>
									What's new
								</Link>
								{/* Hover Dropdown */}
								<div className='absolute z-40 hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-bison gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									<p onClick={() => navigate('/new-arrival')}>New Arrivals</p>
									<p onClick={() => navigate('/trending')}>Trending</p>
								</div>
							</li>

							<li className='relative group'>
								<Link to='#' className='underline-custom'>
									Shop
								</Link>
								<div className='absolute hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-bison gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									<p onClick={() => navigate('/shop')}>All Products</p>
									<p onClick={() => navigate('/popular-items')}>
										Popular Items
									</p>
								</div>
							</li>

							<li className='relative flex items-end underline-custom group'>
								<Link to='#' className='flex items-center'>
									Men <DownOutlined className='text-[10px]' />
								</Link>
								<div className='absolute z-40 hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-bison gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									{/* <p onClick={() => navigate('/men-clothing')}>
										Men's Clothing
									</p>
									<p onClick={() => navigate('/men-accesories')}>
										Men's Accessories
									</p> */}
									<p onClick={() => navigate('/bracelet-stacks')}>
										Bracelet stacks
									</p>
									<p onClick={() => navigate('/neck-candies')}>Neck candies</p>
									<p onClick={() => navigate('/grooms-owanbe-sets')}>
										Groom’s/Owambe sets
									</p>
									<p onClick={() => navigate('/walking-sticks')}>
										Walking sticks
									</p>
								</div>
							</li>

							<li className='relative flex items-end underline-custom group'>
								<Link to='#' className='flex items-center'>
									Women <DownOutlined className='text-[10px]' />
								</Link>
								<div className='absolute z-40 hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-bison gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									{/* <p onClick={() => navigate('/women-clothing')}>
										Women's Clothing
									</p>
									<p onClick={() => navigate('/women-acccesories')}>
										Women's Accessories
									</p> */}

									<p onClick={() => navigate('statement-earrings')}>
										Statement earrings
									</p>
									<p onClick={() => navigate('beaded-bags')}>Beaded bags</p>
									<p onClick={() => navigate('bracelet-stacks')}>
										Bracelet stacks
									</p>
									<p onClick={() => navigate('bridal')}>Bridal</p>
									<p onClick={() => navigate('statement-throwon')}>
										Statement throw-ons
									</p>
									<p onClick={() => navigate('gemstone-pendant')}>
										Gemstone pendants
									</p>
								</div>
							</li>
							{/* <li className="relative group">
                <Link to="#" className="underline-custom">
                  Giftings
                </Link>
              </li> */}

							<li className='relative group'>
								<Link to='#' className='underline-custom'>
									Contact us
								</Link>
								<div className='absolute z-40 hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-bison gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									<p onClick={() => navigate('/contact')}>
										Contact Information
									</p>
									<p onClick={() => navigate('/contact')}>Support</p>
								</div>
							</li>
						</ul>
					</div>

					<div className='flex gap-2 md:gap-4'>
						<li className='relative group list-none'>
							<UserOutlined className=' text-[18px] md:text-[24px]' />
							<div className='absolute z-30 hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-bison gap-5 top-full right-0 bg-white p-4 shadow-lg transition-all duration-200'>
								{user ? (
									<div>
										<p
											onClick={() => {
												navigate('/profile');
											}}>
											View Profile
										</p>
										<p
											onClick={() => {
												navigate('/popular-items');
												logOutUser(user);
											}}>
											Logout
										</p>
									</div>
								) : (
									<div className=' flex flex-col gap-3'>
										<h1 onClick={() => navigate('/login')}>
											{' '}
											Create an Account
										</h1>
										<h2 onClick={() => navigate('/login')}>Login</h2>
									</div>
								)}
							</div>
						</li>

						{/* <HeartOutlined className=' text-[18px] md:text-[24px]' /> */}
						<Badge
							count={cartItems === null ? 0 : cartItems.length}
							showZero={true}>
							<motion.div
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}>
								<ShoppingCartOutlined
									className='cursor-pointer text-[18px] md:text-[24px] text-main hover:text-gold transition-colors'
									onClick={() => setOpenCart(true)}
								/>
							</motion.div>
						</Badge>
					</div>
				</header>
			</motion.nav>

			<AnimatePresence>{openCart && <CartItems />}</AnimatePresence>
		</>
	);
};

export default Nav;
