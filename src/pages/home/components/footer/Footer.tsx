import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppFooter: React.FC = () => {
	const navigate = useNavigate();
	return (
		<footer className='bg-main font-poppins'>
			<div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
				<div className='md:flex md:justify-between'>
					<div className='mb-6 w-[270px]  md:w-[400px] md:mb-0'>
						<h1 className='flex gap-3 items-center'>
							<img onClick={() => navigate('/')} className='w-32 h-32' src='/BEADT.jpg' alt='' />
							
						</h1>
						<h2 className=' mt-5  text-white'>
							Nigeria’s No.1 Luxury Bead Accessories Brand Explore
							BeadwithTricia’s luxury bead accessories handcrafted for kings,
							queens, and those who demand to stand out
						</h2>
					</div>

					<div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3'>
						<div>
							<h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white'>
								CATEGORIES
							</h2>
							<ul className='text-white dark:text-white font-medium'>
								<li className='mb-4'>
									<h1
										onClick={() => navigate('/men-clothing')}
										className='hover:underline'>
										For Men
									</h1>
								</li>
								<li>
									<h1
										onClick={() => navigate('/women-clothing')}
										className='hover:underline'>
										For Women
									</h1>
								</li>
							</ul>
						</div>
						<div>
							<h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white'>
								ABOUT US
							</h2>
							<ul className='text-white dark:text-white font-medium'>
								<li className='mb-4'>
									<h1 onClick={() => navigate('/')} className='hover:underline'>
										BeadsbyTricia
									</h1>
								</li>
								<li className=' mb-4'>
									<h1
										onClick={() => navigate('/shop')}
										className='hover:underline'>
										Shop
									</h1>
								</li>
								<li className=' mb-4'>
									<h1
										onClick={() => navigate('/contact')}
										className='hover:underline'>
										Contact Us
									</h1>
								</li>
							</ul>
						</div>
						<div>
							<h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white'>
								CUSTOMER CARE
							</h2>
							<ul className='text-white dark:text-white font-medium'>
								<li className='mb-4'>
									<a href='#' className='hover:underline'>
										FAQS
									</a>
								</li>
								<li className=' mb-4'>
									<a href='#' className='hover:underline'>
										Shipping
									</a>
								</li>
								<li className=' mb-4'>
									<a href='#' className='hover:underline'>
										Refund Policy
									</a>
								</li>
								<li>
									<a href='#' className='hover:underline'>
										Terms & Conditions
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<hr className='my-6 border-white sm:mx-auto dark:border-gray-white lg:my-8' />
				<div className='sm:flex sm:items-center sm:justify-between'>
					<span className='text-sm text-white sm:text-center dark:text-white'>
						© 2025
						<a href='https://flowbite.com/' className='hover:underline'>
							BeadsbyTricia
						</a>
						. All Rights Reserved.
					</span>
					<div className='flex mt-4 sm:justify-center sm:mt-0'>
						{/* Instagram */}
						<a
							href='#'
							className='text-white hover:text-gray-900 dark:hover:text-white'
							aria-label='Instagram page'>
							<svg
								className='w-4 h-4'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 24 24'>
								<path
									fillRule='evenodd'
									d='M12 2c-2.716 0-3.056.01-4.122.06A4.027 4.027 0 0 0 3.2 4.027C3.01 5.084 3 5.424 3 8.134v7.732c0 2.71.01 3.056.06 4.122a4.027 4.027 0 0 0 2.827 2.827c1.066.05 1.406.06 4.122.06h7.732c2.71 0 3.056-.01 4.122-.06a4.027 4.027 0 0 0 2.827-2.827c.05-1.066.06-1.406.06-4.122V8.134c0-2.71-.01-3.056-.06-4.122A4.027 4.027 0 0 0 19.973 3.2c-1.066-.05-1.406-.06-4.122-.06H8.134zm0 2.88c2.42 0 4.382 1.962 4.382 4.382S14.42 13.644 12 13.644 7.618 11.682 7.618 9.262 9.58 4.88 12 4.88zm0 2.47c-.98 0-1.77.79-1.77 1.77s.79 1.77 1.77 1.77 1.77-.79 1.77-1.77-.79-1.77-1.77-1.77zm5.558-2.528a1.018 1.018 0 0 1-1.018 1.018c-.562 0-1.018-.456-1.018-1.018s.456-1.018 1.018-1.018a1.018 1.018 0 0 1 1.018 1.018z'
									clipRule='evenodd'
								/>
							</svg>
							<span className='sr-only'>Instagram page</span>
						</a>

						{/* Facebook */}
						<a
							href='#'
							className='text-white hover:text-gray-900 dark:hover:text-white ms-5'
							aria-label='Facebook page'>
							<svg
								className='w-4 h-4'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 8 19'>
								<path
									fillRule='evenodd'
									d='M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6.6 0 0 1 5.592 3h.543Z'
									clipRule='evenodd'
								/>
							</svg>
							<span className='sr-only'>Facebook page</span>
						</a>

						{/* X (formerly Twitter) */}
						<a
							href='#'
							className='text-white hover:text-gray-900 dark:hover:text-white ms-5'
							aria-label='X (formerly Twitter) page'>
							<svg
								className='w-4 h-4'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 24 24'>
								<path
									fillRule='evenodd'
									d='M14.93 10.98a4.99 4.99 0 0 0-4.93-4.93c-2.73 0-4.93 2.2-4.93 4.93 0 1.93 1.13 3.59 2.76 4.39l-2.03.62c-.22.06-.3.3-.2.53l.63 2.03c.06.22.3.3.53.2l2.03-.62c.8.27 1.66.41 2.53.41 2.73 0 4.93-2.2 4.93-4.93zM16.5 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 10c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5 1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5z'
									clipRule='evenodd'
								/>
							</svg>
							<span className='sr-only'>X (formerly Twitter) page</span>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default AppFooter;
