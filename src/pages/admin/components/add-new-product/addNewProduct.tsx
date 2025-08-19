import { UploadOutlined } from '@ant-design/icons';
import {
	Button,
	Input,
	InputNumber,
	Select,
	Upload,
	UploadFile,
	Image,
} from 'antd';
import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { firestore, storage } from '../../../../utils/firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Bounce, ToastContainer, toast } from 'react-toastify';

interface AddNewProductProps {
	name: string;
	description: string;
	price: number;
	category: string;
	gender: string;
	status: string;
	photo: UploadFile<unknown> | null; // Adjusted to allow null for no file selected
}

const ProductCategory = [
	'Bracelet stacks',
	'Neck candies',
	'Groom’s/Owambe sets',
	'Walking sticks',
	'Statement earrings',
	'Beaded bags',
	'Bracelet stacks',
	'Bridal',
	'Statement throw-ons',
	'Gemstone pendants',
];

const ProductStatus = ['IN-STOCK', 'OUT-OF-STOCK'];

const Gender = ['MALE', 'FEMALE'];

const AddNewProduct = () => {
	const { control, handleSubmit, reset } = useForm<AddNewProductProps>();
	const [preview, setPreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const onSubmit: SubmitHandler<AddNewProductProps> = async (data) => {
		setLoading(true);
		console.log('Form submitted:', data);

		try {
			let photoURL = '';

			const photoFile = data.photo?.originFileObj as File | undefined;
			if (photoFile) {
				const photoRef = ref(storage, `photos/${photoFile.name}`);
				console.log('Firebase storage ref created:', photoRef.fullPath);

				await uploadBytes(photoRef, photoFile);
				console.log('File successfully uploaded to Firebase Storage');

				photoURL = await getDownloadURL(photoRef);
				console.log('File available at:', photoURL);
			}

			const productCollectionRef = collection(firestore, 'products');
			const newProductRef = doc(productCollectionRef);

			await setDoc(newProductRef, {
				name: data.name,
				description: data.description,
				price: data.price,
				category: data.category,
				gender: data.gender,
				id: newProductRef.id,
				status: data.status,
				photoURL: photoURL,
				createdAt: serverTimestamp(),
			});

			console.log('Product successfully added to Firestore');

			setPreview(null);
			reset();

			setTimeout(() => {
				setLoading(false);
				toast.success('Product Upload Successful', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
					transition: Bounce,
				});
			}, 2000);
		} catch (error) {
			console.error('Error adding product to Firestore:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className=' w-full  '>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
				transition={Bounce}
			/>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full flex flex-col gap-5 mt-12 '>
				<Controller
					name='name'
					control={control}
					rules={{ required: 'Name is required' }}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Name of Product</label>
							<Input
								className='w-[100%] md:w-[40%]'
								size='large'
								placeholder='Enter the Name of your Product'
								{...field}
							/>
						</div>
					)}
				/>

				<Controller
					name='description'
					control={control}
					
					rules={{ required: 'Description is required' }}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>
								Description of the Product
							</label>
							<Input.TextArea
								rows={4}
								className='w-[100%] md:w-[60%]'
								size='large'
								placeholder='Enter a valid Description of your Product'
								{...field}
							/>
						</div>
					)}
				/>

				<Controller
					name='category'
					control={control}
					rules={{ required: 'Category is required' }}
					render={({ field }) => (
						<div className='flex flex-col w-full'>
							<label className='font-bold text-main'>Category</label>
							<Select
								className='w-[100%] md:w-[20%]'
								placeholder='Select a Category'
								{...field}>
								{ProductCategory.map((i) => (
									<Select.Option key={i} value={i}>
										{i}
									</Select.Option>
								))}
							</Select>
						</div>
					)}
				/>

				<Controller
					name='gender'
					control={control}
					rules={{ required: 'Gender is required' }}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Product for</label>
							<Select
								className='w-[100%] md:w-[20%]'
								size='large'
								placeholder='Select Gender'
								{...field}>
								{Gender.map((i) => (
									<Select.Option key={i} value={i}>
										{i}
									</Select.Option>
								))}
							</Select>
						</div>
					)}
				/>

				<Controller
					name='price'
					control={control}
					rules={{ required: 'Price is required' }}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Price</label>
							<InputNumber
								className=' w-[100%] md:w-[40%]'
								size='large'
								placeholder='Enter price in digits e.g 100000'
								{...field}
							/>
						</div>
					)}
				/>

				<Controller
					name='status'
					control={control}
					rules={{ required: 'Status is required' }}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Status</label>
							<Select
								className='w-[100%] md:w-[20%]'
								size='large'
								placeholder='Select Status'
								{...field}>
								{ProductStatus.map((i) => (
									<Select.Option key={i} value={i}>
										{i}
									</Select.Option>
								))}
							</Select>
						</div>
					)}
				/>

				<Controller
					name='photo'
					control={control}
					rules={{ required: 'Photo is required' }}
					render={({ field, fieldState: { error } }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Upload Photo</label>
							<Upload
								listType='picture'
								accept='image/*'
								beforeUpload={() => false}
								fileList={field.value ? [field.value] : []}
								onChange={({ fileList }) => {
									const file = fileList[0]?.originFileObj;
									if (file) {
										field.onChange(fileList[0]);

										const reader = new FileReader();
										reader.onload = (e) =>
											setPreview(e?.target?.result as string);
										reader.readAsDataURL(file);

										console.log(fileList[0]?.originFileObj);
									} else {
										setPreview(null);
										field.onChange(null);
									}
								}}
								onRemove={() => {
									setPreview(null);
									field.onChange(null);
								}}>
								<Button icon={<UploadOutlined />}>Select Photo</Button>
							</Upload>

							{preview && (
								<Image
									src={preview}
									alt='Uploaded Preview'
									style={{ marginTop: '10px', width: '200px' }}
									preview={false}
								/>
							)}

							{error && <p className='text-red-500'>{error.message}</p>}
						</div>
					)}
				/>

				<Button
					className='py-5 bg-main'
					htmlType='submit'
					type='primary'
					loading={loading}>
					Add Product
				</Button>
			</form>
		</div>
	);
};

export default AddNewProduct;
