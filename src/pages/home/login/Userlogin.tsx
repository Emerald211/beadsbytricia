import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { CreateNewUser } from '../../../utils/firebase/auth/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import {  message} from 'antd';

type UserLoginProps = {
	email: string;
	password: string;
};

const UserLogin = () => {
	const [loading, setLoading] = useState(false);
	const [loginType, setLoginType] = useState(false);
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<UserLoginProps>();

	const SwitchLoginMethod = (type: boolean) => {
		setLoginType(type);
	};

	const [messageApi, contextHolder] = message.useMessage();

	const loginToAdminDashboard = async (data: UserLoginProps) => {
		const { email, password } = data;
		console.log(email, password);
		if (data.email && data.password) {
			setLoading(true);

			const getLoginResponse = await CreateNewUser(email, password);

			const success = () => {
				messageApi.open({
					type: 'success',
					content: 'Login Successful',
				});
			};

			const error = (message: string) => {
				messageApi.open({
					type: 'error',
					content: message,
				});
			};

			const warning = (meessage: string) => {
				messageApi.open({
					type: 'warning',
					content: meessage,
				});
			};

			if (getLoginResponse && typeof getLoginResponse !== 'string') {
				setTimeout(() => {
					setLoading(false);
					success();
				}, 2000);

				navigate(`${loginType ? '/personal-information' : '/shop'}`);
			} else if (typeof getLoginResponse === 'string') {
				setTimeout(() => {
					setLoading(false);
					warning(getLoginResponse);
				}, 2000);
			} else {
				setTimeout(() => {
					setLoading(false);
					error('Error logging in, please try again');
				}, 2000);
			}
		}
	};

	return (
		<section className='flex flex-col font-main py-12 md:py-24 items-center w-full h-auto'>
			{contextHolder}

			<div className='flex gap-12 items-center '>
				<div
					onClick={() => SwitchLoginMethod(false)}
					className='cursor-pointer flex flex-col '>
					<h1 className='px-3 py-3 hover:text-main '>Account Login</h1>
					{loginType === false && (
						<div className='h-[2px] rounded-3xl w-full bg-main'></div>
					)}
				</div>
				<div
					onClick={() => SwitchLoginMethod(true)}
					className='cursor-pointer flex flex-col'>
					<h1 className=' hover:text-main px-3 py-2'>Create New Account</h1>
					{loginType === true && (
						<div className='h-[2px] rounded-3xl w-full bg-main'></div>
					)}
				</div>
			</div>

			<form
				onSubmit={handleSubmit(loginToAdminDashboard)}
				className='w-[80%] md:w-[30%] flex flex-col gap-5 mt-12'>
				<Controller
					name='email'
					control={control}
					rules={{
						required: 'Email is required',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'Invalid email address',
						},
					}}
					render={({ field }) => (
						<Input
							size='large'
							placeholder={
								loginType ? 'Enter your email address' : 'Login with your email'
							}
							prefix={<UserOutlined />}
							{...field}
						/>
					)}
				/>
				{errors.email && (
					<span className='text-red-500 text-sm'>{errors.email.message}</span>
				)}

				<Controller
					name='password'
					control={control}
					rules={{ required: 'Password is required' }}
					render={({ field }) => (
						<Input.Password
							size='large'
							placeholder={
								loginType ? 'Create a Password' : 'Enter your password'
							}
							prefix={<LockOutlined />}
							{...field}
						/>
					)}
				/>
				{errors.password && (
					<span className='text-red-500 text-sm'>
						{errors.password.message}
					</span>
				)}

				<div className='flex items-center justify-between text-sm'>
					<div className='flex gap-3 items-center'>
						<input type='checkbox' name='' id='' />
						<span> Remember me</span>
					</div>
					<h2 className='cursor-pointer text-sm'>Forgot Password?</h2>
				</div>

				<Button
					className='py-5 bg-main hover:bg-black'
					htmlType='submit'
					type='primary'
					loading={loading}>
					{loginType ? 'Create an Account' : 'Login'}
				</Button>
			</form>
		</section>
	);
};

export default UserLogin;
