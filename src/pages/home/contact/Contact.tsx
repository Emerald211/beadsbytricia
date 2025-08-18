import React from 'react';
import { Form, Input, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import {
	InstagramOutlined,
	LinkedinOutlined,
	TwitterOutlined,
} from '@ant-design/icons';

type ContactFormValues = {
	name: string;
	email: string;
	message: string;
};

const ContactPage: React.FC = () => {
	const { handleSubmit, control, reset } = useForm<ContactFormValues>();

	const onSubmit = (data: ContactFormValues) => {
		console.log('Form Data:', data);
		reset(); // Clear form fields after submit
	};

	return (
		<div className=' px-12 flex flex-col md:flex-row gap-7 md:gap-12 justify-center  mt-12 md:mt-24 mb-24 '>
			<div className=' py-12 flex flex-col '>
				<h1 className=' text-3xl font-bold'>We want to hear from you!</h1>

				<h2>Send a DM now</h2>
			</div>

			<div className=' border py-4' >
				<Form
					className=' px-7 w-[300px] md:w-[400px]'
					layout='vertical'
					onFinish={handleSubmit(onSubmit)}>
					<Form.Item label='Name'>
						<Controller
							name='name'
							control={control}
							defaultValue=''
							rules={{ required: 'Please enter your name' }}
							render={({ field }) => (
								<Input {...field} placeholder='Your Name' />
							)}
						/>
					</Form.Item>

					<Form.Item label='Email'>
						<Controller
							name='email'
							control={control}
							defaultValue=''
							rules={{
								required: 'Please enter your email',
								pattern: {
									value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
									message: 'Enter a valid email address',
								},
							}}
							render={({ field }) => (
								<Input {...field} placeholder='Your Email' />
							)}
						/>
					</Form.Item>

					<Form.Item label='Message'>
						<Controller
							name='message'
							control={control}
							defaultValue=''
							rules={{ required: 'Please enter your message' }}
							render={({ field }) => (
								<Input.TextArea
									{...field}
									rows={4}
									placeholder='Your Message'
								/>
							)}
						/>
					</Form.Item>

					<Form.Item>
						<Button className=' bg-main' type='primary' htmlType='submit'>
							Send Message
						</Button>
					</Form.Item>
				</Form>

        <div className=' px-7'>
        <h1 className=' mt-4 text-xl font-bold'>Follow us on our socials</h1>

<div className=' mt-2 text-2xl gap-1 flex '>
  <InstagramOutlined />
  <TwitterOutlined />
  <LinkedinOutlined />
</div>
        </div>
			</div>
		</div>
	);
};

export default ContactPage;
