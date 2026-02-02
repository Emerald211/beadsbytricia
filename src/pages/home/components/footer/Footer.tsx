import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const AppFooter: React.FC = () => {
	const navigate = useNavigate();
	return (
		<footer className='bg-main font-bison'>
			<div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
				<div className='md:flex md:justify-between'>
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='mb-6 w-[270px] md:w-[400px] md:mb-0'>
						<h1 className='flex gap-3 items-center'>
							<motion.img
								whileHover={{ scale: 1.05 }}
								onClick={() => navigate('/')}
								className='w-32 h-32 cursor-pointer'
								src='/BEADT.jpg'
								alt='BeadsbyTricia Logo'
							/>
						</h1>
						<h2 className='mt-5 text-white/90 leading-relaxed'>
							Nigeria's No.1 Luxury Bead Accessories Brand. Explore
							BeadwithTricia's luxury bead accessories handcrafted for kings,
							queens, and those who demand to stand out.
						</h2>
					</motion.div>

					<div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.1 }}>
							<h2 className='mb-6 text-sm font-semibold text-gold uppercase tracking-wider'>
								CATEGORIES
							</h2>
							<ul className='text-white/80 font-medium space-y-4'>
								<li>
									<motion.h1
										whileHover={{ x: 5, color: '#D4AF37' }}
										onClick={() => navigate('/men-clothing')}
										className='cursor-pointer transition-colors'>
										For Men
									</motion.h1>
								</li>
								<li>
									<motion.h1
										whileHover={{ x: 5, color: '#D4AF37' }}
										onClick={() => navigate('/women-clothing')}
										className='cursor-pointer transition-colors'>
										For Women
									</motion.h1>
								</li>
							</ul>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}>
							<h2 className='mb-6 text-sm font-semibold text-gold uppercase tracking-wider'>
								ABOUT US
							</h2>
							<ul className='text-white/80 font-medium space-y-4'>
								<li>
									<motion.h1
										whileHover={{ x: 5, color: '#D4AF37' }}
										onClick={() => navigate('/')}
										className='cursor-pointer transition-colors'>
										BeadsbyTricia
									</motion.h1>
								</li>
								<li>
									<motion.h1
										whileHover={{ x: 5, color: '#D4AF37' }}
										onClick={() => navigate('/shop')}
										className='cursor-pointer transition-colors'>
										Shop
									</motion.h1>
								</li>
								<li>
									<motion.h1
										whileHover={{ x: 5, color: '#D4AF37' }}
										onClick={() => navigate('/contact')}
										className='cursor-pointer transition-colors'>
										Contact Us
									</motion.h1>
								</li>
							</ul>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.3 }}>
							<h2 className='mb-6 text-sm font-semibold text-gold uppercase tracking-wider'>
								CUSTOMER CARE
							</h2>
							<ul className='text-white/80 font-medium space-y-4'>
								<li>
									<motion.a
										whileHover={{ x: 5, color: '#D4AF37' }}
										href='#'
										className='block cursor-pointer transition-colors'>
										FAQS
									</motion.a>
								</li>
								<li>
									<motion.a
										whileHover={{ x: 5, color: '#D4AF37' }}
										href='#'
										className='block cursor-pointer transition-colors'>
										Shipping
									</motion.a>
								</li>
								<li>
									<motion.a
										whileHover={{ x: 5, color: '#D4AF37' }}
										href='#'
										className='block cursor-pointer transition-colors'>
										Refund Policy
									</motion.a>
								</li>
								<li>
									<motion.a
										whileHover={{ x: 5, color: '#D4AF37' }}
										href='#'
										className='block cursor-pointer transition-colors'>
										Terms & Conditions
									</motion.a>
								</li>
							</ul>
						</motion.div>
					</div>
				</div>

				<hr className='my-6 border-white/20 sm:mx-auto lg:my-8' />
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className='sm:flex sm:items-center sm:justify-between'>
					<span className='text-sm text-white/70 sm:text-center'>
						© 2025{' '}
						<span className='text-gold font-semibold'>BeadsbyTricia</span>. All
						Rights Reserved.
					</span>
					<div className='flex mt-4 sm:justify-center sm:mt-0 gap-4'>
						{/* Instagram */}
						<motion.a
							whileHover={{ scale: 1.2, color: '#D4AF37' }}
							whileTap={{ scale: 0.95 }}
							href='#'
							className='text-white/80 transition-colors'
							aria-label='Instagram page'>
							<svg
								className='w-5 h-5'
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
						</motion.a>

						{/* Facebook */}
						<motion.a
							whileHover={{ scale: 1.2, color: '#D4AF37' }}
							whileTap={{ scale: 0.95 }}
							href='#'
							className='text-white/80 transition-colors'
							aria-label='Facebook page'>
							<svg
								className='w-5 h-5'
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
						</motion.a>

						{/* X (formerly Twitter) */}
						<motion.a
							whileHover={{ scale: 1.2, color: '#D4AF37' }}
							whileTap={{ scale: 0.95 }}
							href='#'
							className='text-white/80 transition-colors'
							aria-label='X (formerly Twitter) page'>
							<svg
								className='w-5 h-5'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 24 24'>
								<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
							</svg>
						</motion.a>
					</div>
				</motion.div>
			</div>
		</footer>
	);
};

export default AppFooter;
