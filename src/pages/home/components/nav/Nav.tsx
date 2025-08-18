import {
	DownOutlined,
	MenuFoldOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Badge, Carousel } from 'antd';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
			{mobileNav && <MobileNav />}
			<nav className=' font-poppins'>
				<Carousel
					dots={false}
					arrows={true}
					className='bg-main py-2 flex text-sm items-center text-white text-center justify-center'
					autoplay>
					<div>
						<h3>
							Get 10% off your first order!...
							<Link className='  text-white' to='/login'>
								Sign up now!
							</Link>
						</h3>
					</div>
					<div>
						<h3>
							Fast Delivery Worldwide!...{' '}
							<Link className=' underline text-white' to='/login'>
								Sign up now!
							</Link>
						</h3>
					</div>
				</Carousel>

				<header className='py-2 md:px-12 px-4 flex md:items-end items-center gap-5 md:gap-0 justify-between font-poppins relative'>
					<div>
						<MenuFoldOutlined className=' lg:hidden'  onClick={() => setMobileNav(true)} />
						{/* <SearchOutlined className=" cursor-pointer text-[18px] md:text-[24px]" /> */}
					</div>

					<div className='flex font-poppins gap-1 flex-col items-center'>
						<h1
							className='text-main font-serrat font-bold cursor-pointer'
							onClick={() => navigate('/')}>
							<img src={Logo} alt="Logo" className=' w-16 h-16' />
						</h1>
						<ul className='flex desktopNav gap-5 text-sm'>
							<li className='relative group'>
								<Link to='#' className='underline-custom'>
									What's new
								</Link>
								{/* Hover Dropdown */}
								<div className='absolute hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									<p onClick={() => navigate('/new-arrival')}>New Arrivals</p>
									<p onClick={() => navigate('/trending')}>Trending</p>
								</div>
							</li>

							<li className='relative group'>
								<Link to='#' className='underline-custom'>
									Shop
								</Link>
								<div className='absolute hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
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
								<div className='absolute z-40 hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									{/* <p onClick={() => navigate('/men-clothing')}>
										Men's Clothing
									</p>
									<p onClick={() => navigate('/men-accesories')}>
										Men's Accessories
									</p> */}
									<p>Bracelet stacks</p>
									<p>Neck candies</p>
									<p>Groom’s/Owambe sets</p>
									<p>Walking sticks</p>
									<p></p>
								</div>
							</li>

							<li className='relative flex items-end underline-custom group'>
								<Link to='#' className='flex items-center'>
									Women <DownOutlined className='text-[10px]' />
								</Link>
								<div className='absolute z-40 hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
									{/* <p onClick={() => navigate('/women-clothing')}>
										Women's Clothing
									</p>
									<p onClick={() => navigate('/women-acccesories')}>
										Women's Accessories
									</p> */}

									<p>Statement earrings</p>
									<p>Beaded bags</p>
									<p>Bracelet stacks</p>
									<p>Bridal</p>
									<p>Statement throw-ons</p>
									<p>Gemstone pendants</p>
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
								<div className='absolute hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full left-0 bg-white p-4 shadow-lg transition-all duration-200'>
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
							<div className='absolute z-30 hidden cursor-pointer group-hover:flex flex-col mt-0 w-[200px]  font-serrat gap-5 top-full right-0 bg-white p-4 shadow-lg transition-all duration-200'>
								{user ? (
									<div>
										<p onClick={() => {
											navigate('/profile')
											
										 }}>View Profile</p>
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
							<ShoppingCartOutlined
								className=' cursor-pointer text-[18px] md:text-[24px]'
								onClick={() => setOpenCart(true)}
							/>
						</Badge>
					</div>
				</header>
			</nav>

			{openCart && <CartItems />}
		</>
	);
};

export default Nav;
