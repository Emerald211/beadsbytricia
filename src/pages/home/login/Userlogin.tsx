import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { CreateNewUser } from '../../../utils/firebase/auth/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

type UserLoginProps = {
	email: string;
	password: string;
};

const UserLogin = () => {
	const [loading, setLoading] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UserLoginProps>();

	const [messageApi, contextHolder] = message.useMessage();

	const handleAuth = async (data: UserLoginProps) => {
		const { email, password } = data;

		if (email && password) {
			setLoading(true);

			const getLoginResponse = await CreateNewUser(email, password);

			if (getLoginResponse && typeof getLoginResponse !== 'string') {
				setTimeout(() => {
					setLoading(false);
					messageApi.success(
						isSignUp ? 'Account created successfully!' : 'Welcome back!',
					);
					navigate(isSignUp ? '/personal-information' : '/shop');
				}, 1500);
			} else if (typeof getLoginResponse === 'string') {
				setTimeout(() => {
					setLoading(false);
					messageApi.warning(getLoginResponse);
				}, 1500);
			} else {
				setTimeout(() => {
					setLoading(false);
					messageApi.error('Something went wrong. Please try again.');
				}, 1500);
			}
		}
	};

	const switchMode = () => {
		setIsSignUp(!isSignUp);
		reset();
	};

	return (
		<section className='min-h-screen flex font-bison'>
			{contextHolder}

			{/* Left Side - Image/Branding */}
			<motion.div
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
				className='hidden lg:flex lg:w-1/2 bg-main relative overflow-hidden'>
				{/* Decorative Elements */}
				<div className='absolute inset-0 opacity-10'>
					<div className='absolute top-20 left-20 w-72 h-72 border border-white/20 rounded-full' />
					<div className='absolute bottom-32 right-16 w-96 h-96 border border-white/10 rounded-full' />
					<div className='absolute top-1/2 left-1/3 w-48 h-48 border border-white/15 rounded-full' />
				</div>

				{/* Content */}
				<div className='relative z-10 flex flex-col justify-center px-16 text-white'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.8 }}>
						<h1 className='text-5xl font-bold tracking-wider mb-4'>
							BEADS BY TRICIA
						</h1>
						<div className='w-24 h-[2px] bg-gold mb-8' />
						<p className='text-lg text-white/70 leading-relaxed max-w-md'>
							Discover handcrafted luxury jewelry that speaks to your unique
							style. Each piece tells a story of elegance and sophistication.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6, duration: 0.8 }}
						className='mt-16'>
						<div className='flex items-center gap-8'>
							<div className='text-center'>
								<p className='text-3xl font-bold text-gold'>500+</p>
								<p className='text-sm text-white/50 mt-1'>Happy Customers</p>
							</div>
							<div className='w-px h-12 bg-white/20' />
							<div className='text-center'>
								<p className='text-3xl font-bold text-gold'>100%</p>
								<p className='text-sm text-white/50 mt-1'>Handcrafted</p>
							</div>
							<div className='w-px h-12 bg-white/20' />
							<div className='text-center'>
								<p className='text-3xl font-bold text-gold'>24/7</p>
								<p className='text-sm text-white/50 mt-1'>Support</p>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>

			{/* Right Side - Form */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6 }}
				className='w-full lg:w-1/2 flex items-center justify-center px-8 py-12 bg-cream'>
				<div className='w-full max-w-md'>
					{/* Logo for mobile */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className='lg:hidden text-center mb-12'>
						<h1 className='text-3xl font-bold text-main tracking-wider'>
							BEADS BY TRICIA
						</h1>
						<div className='w-16 h-[2px] bg-gold mx-auto mt-3' />
					</motion.div>

					{/* Form Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className='text-center mb-10'>
						<h2 className='text-3xl font-bold text-main mb-3'>
							{isSignUp ? 'Create Account' : 'Welcome Back'}
						</h2>
						<p className='text-gray-500'>
							{isSignUp
								? 'Join us and discover exclusive collections'
								: 'Sign in to continue your luxury shopping experience'}
						</p>
					</motion.div>

					{/* Toggle Tabs */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className='flex mb-10 bg-white rounded-full p-1 luxury-shadow'>
						<button
							onClick={() => isSignUp && switchMode()}
							className={`flex-1 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
								!isSignUp
									? 'bg-main text-white'
									: 'text-gray-500 hover:text-main'
							}`}>
							Sign In
						</button>
						<button
							onClick={() => !isSignUp && switchMode()}
							className={`flex-1 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
								isSignUp
									? 'bg-main text-white'
									: 'text-gray-500 hover:text-main'
							}`}>
							Sign Up
						</button>
					</motion.div>

					{/* Form */}
					<AnimatePresence mode='wait'>
						<motion.form
							key={isSignUp ? 'signup' : 'signin'}
							initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: isSignUp ? -20 : 20 }}
							transition={{ duration: 0.3 }}
							onSubmit={handleSubmit(handleAuth)}
							className='space-y-6'>
							{/* Email Field */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Email Address
								</label>
								<Controller
									name='email'
									control={control}
									rules={{
										required: 'Email is required',
										pattern: {
											value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
											message: 'Please enter a valid email',
										},
									}}
									render={({ field }) => (
										<input
											{...field}
											type='email'
											placeholder='hello@example.com'
											className='w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-main placeholder:text-gray-400 focus:outline-none focus:border-main focus:ring-1 focus:ring-main transition-all duration-300'
										/>
									)}
								/>
								{errors.email && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className='text-red-500 text-sm mt-2'>
										{errors.email.message}
									</motion.p>
								)}
							</div>

							{/* Password Field */}
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Password
								</label>
								<Controller
									name='password'
									control={control}
									rules={{
										required: 'Password is required',
										minLength: {
											value: 6,
											message: 'Password must be at least 6 characters',
										},
									}}
									render={({ field }) => (
										<input
											{...field}
											type='password'
											placeholder='••••••••'
											className='w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-main placeholder:text-gray-400 focus:outline-none focus:border-main focus:ring-1 focus:ring-main transition-all duration-300'
										/>
									)}
								/>
								{errors.password && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className='text-red-500 text-sm mt-2'>
										{errors.password.message}
									</motion.p>
								)}
							</div>

							{/* Remember Me / Forgot Password */}
							{!isSignUp && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className='flex items-center justify-between text-sm'>
									<label className='flex items-center gap-2 cursor-pointer group'>
										<input
											type='checkbox'
											className='w-4 h-4 rounded border-gray-300 text-main focus:ring-main cursor-pointer'
										/>
										<span className='text-gray-600 group-hover:text-main transition-colors'>
											Remember me
										</span>
									</label>
									<button
										type='button'
										className='text-gray-600 hover:text-main transition-colors'>
										Forgot password?
									</button>
								</motion.div>
							)}

							{/* Terms for Sign Up */}
							{isSignUp && (
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className='text-sm text-gray-500 text-center'>
									By creating an account, you agree to our{' '}
									<span className='text-main cursor-pointer hover:underline'>
										Terms of Service
									</span>{' '}
									and{' '}
									<span className='text-main cursor-pointer hover:underline'>
										Privacy Policy
									</span>
								</motion.p>
							)}

							{/* Submit Button */}
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								type='submit'
								disabled={loading}
								className='w-full py-4 bg-main text-white font-medium rounded-xl hover:bg-charcoal transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70'>
								{loading ? (
									<>
										<svg
											className='animate-spin h-5 w-5'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'>
											<circle
												className='opacity-25'
												cx='12'
												cy='12'
												r='10'
												stroke='currentColor'
												strokeWidth='4'
											/>
											<path
												className='opacity-75'
												fill='currentColor'
												d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
											/>
										</svg>
										<span>Please wait...</span>
									</>
								) : (
									<span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
								)}
							</motion.button>
						</motion.form>
					</AnimatePresence>

					{/* Divider */}
					<div className='flex items-center gap-4 my-8'>
						<div className='flex-1 h-px bg-gray-200' />
						<span className='text-sm text-gray-400'>or continue with</span>
						<div className='flex-1 h-px bg-gray-200' />
					</div>

					{/* Social Login */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className='flex gap-4'>
						<button className='flex-1 py-3 px-4 border border-gray-200 rounded-xl hover:border-main hover:bg-white transition-all duration-300 flex items-center justify-center gap-2'>
							<svg className='w-5 h-5' viewBox='0 0 24 24'>
								<path
									fill='currentColor'
									d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
								/>
								<path
									fill='currentColor'
									d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
								/>
								<path
									fill='currentColor'
									d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
								/>
								<path
									fill='currentColor'
									d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
								/>
							</svg>
							<span className='text-sm font-medium'>Google</span>
						</button>
						<button className='flex-1 py-3 px-4 border border-gray-200 rounded-xl hover:border-main hover:bg-white transition-all duration-300 flex items-center justify-center gap-2'>
							<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
								<path d='M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z' />
							</svg>
							<span className='text-sm font-medium'>Facebook</span>
						</button>
					</motion.div>

					{/* Footer Text */}
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
						className='text-center text-sm text-gray-500 mt-8'>
						{isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
						<button
							onClick={switchMode}
							className='text-main font-medium hover:underline'>
							{isSignUp ? 'Sign in' : 'Create one'}
						</button>
					</motion.p>
				</div>
			</motion.div>
		</section>
	);
};

export default UserLogin;
