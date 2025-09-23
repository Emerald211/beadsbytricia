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
	photos: UploadFile<unknown>[] | null;
	colors?: string[];
	lengths?: string[];
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

const ColorOptions = [
	// Basics
	{ name: 'Black', value: 'black' },
	{ name: 'White', value: 'white' },
	{ name: 'Gray', value: 'gray' },
	{ name: 'Silver', value: 'silver' },
	{ name: 'Gold', value: 'gold' },
	{ name: 'Rose Gold', value: 'rose-gold' },
	{ name: 'Platinum', value: 'platinum' },

	// Natural / Earth tones
	{ name: 'Brown', value: 'brown' },
	{ name: 'Beige', value: 'beige' },
	{ name: 'Tan', value: 'tan' },
	{ name: 'Khaki', value: 'khaki' },
	{ name: 'Olive', value: 'olive' },

	// Reds & Pinks
	{ name: 'Red', value: 'red' },
	{ name: 'Burgundy', value: 'burgundy' },
	{ name: 'Maroon', value: 'maroon' },
	{ name: 'Pink', value: 'pink' },
	{ name: 'Rose Pink', value: 'rose-pink' },

	// Purples
	{ name: 'Purple', value: 'purple' },
	{ name: 'Violet', value: 'violet' },
	{ name: 'Lavender', value: 'lavender' },

	// Blues
	{ name: 'Blue', value: 'blue' },
	{ name: 'Navy', value: 'navy' },
	{ name: 'Sky Blue', value: 'sky-blue' },
	{ name: 'Turquoise', value: 'turquoise' },
	{ name: 'Teal', value: 'teal' },

	// Greens
	{ name: 'Green', value: 'green' },
	{ name: 'Emerald Green', value: 'emerald-green' },
	{ name: 'Mint Green', value: 'mint-green' },
	{ name: 'Lime', value: 'lime' },

	// Warm tones
	{ name: 'Yellow', value: 'yellow' },
	{ name: 'Mustard', value: 'mustard' },
	{ name: 'Orange', value: 'orange' },
	{ name: 'Coral', value: 'coral' },

	// Neutrals / Soft tones
	{ name: 'Ivory', value: 'ivory' },
	{ name: 'Cream', value: 'cream' },
	{ name: 'Champagne', value: 'champagne' },
];

const LengthOptions = ['10cm (Baby size)', '16cm', '18cm', '20cm'];

const AddNewProduct = () => {
	const { control, handleSubmit, reset, watch } = useForm<AddNewProductProps>();
	const selectedCategory = watch('category');
	const [preview, setPreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	

	const onSubmit: SubmitHandler<AddNewProductProps> = async (data) => {
		setLoading(true);

		try {
			let photoURLs: string[] = [];

			if (data.photos && data.photos.length > 0) {
				for (const photo of data.photos) {
					const photoFile = photo.originFileObj as File;
					if (photoFile) {
						const photoRef = ref(
							storage,
							`photos/${Date.now()}-${photoFile.name}`
						);
						await uploadBytes(photoRef, photoFile);
						const url = await getDownloadURL(photoRef);
						photoURLs.push(url);
					}
				}
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
				photoURLs: photoURLs,
				createdAt: serverTimestamp(),
				colors: data.colors || [], 
				lengths: data.lengths || []
			});

			reset();
			setPreview(null);

			toast.success('Product Upload Successful', { transition: Bounce });
		} catch (error) {
			console.error('Error adding product:', error);
			toast.error('Error uploading product');
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

				{selectedCategory === 'Bracelet stacks' && (
					<>
						{/* Colors Field */}
						<Controller
							name='colors'
							control={control}
							render={({ field }) => (
								<div className='flex flex-col'>
									<label className='font-bold text-main'>
										Available Colors
									</label>
									<Select
										mode='multiple'
										className='w-[100%] md:w-[40%]'
										placeholder='Select colors'
										{...field}>
										{ColorOptions.map((color) => (
											<Select.Option key={color.value} value={color.value}>
												<div className='flex items-center gap-2'>
													<span
														style={{
															backgroundColor: color.value,
															width: 16,
															height: 16,
															borderRadius: '50%',
															border: '1px solid #ccc',
															display: 'inline-block',
														}}
													/>
													{color.name}
												</div>
											</Select.Option>
										))}
									</Select>
								</div>
							)}
						/>

						{/* Length Field */}
						<Controller
							name='lengths'
							control={control}
							render={({ field }) => (
								<div className='flex flex-col'>
									<label className='font-bold text-main'>
										Wrist Lengths
									</label>
									<Select
										mode='multiple'
										className='w-[100%] md:w-[40%]'
										placeholder='Select lengths'
										{...field}>
										{LengthOptions.map((length) => (
											<Select.Option key={length} value={length}>
												{length}
											</Select.Option>
										))}
									</Select>
								</div>
							)}
						/>
					</>
				)}

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
					name='photos'
					control={control}
					rules={{ required: 'At least one photo is required' }}
					render={({ field, fieldState: { error } }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Upload Photos</label>
							<Upload
								listType='picture'
								accept='image/*'
								beforeUpload={() => false}
								multiple
								fileList={field.value || []}
								onChange={({ fileList }) => {
									field.onChange(fileList);

									if (fileList.length > 0) {
										const file = fileList[fileList.length - 1]?.originFileObj;
										if (file) {
											const reader = new FileReader();
											reader.onload = (e) =>
												setPreview(e?.target?.result as string);
											reader.readAsDataURL(file);
										}
									} else {
										setPreview(null);
									}
								}}
								onRemove={(file) => {
									const newList = (field.value || []).filter(
										(f) => f.uid !== file.uid
									);
									field.onChange(newList);
									if (newList.length === 0) setPreview(null);
								}}>
								<Button icon={<UploadOutlined />}>Select Photos</Button>
							</Upload>

							{preview && (
								<Image
									src={preview}
									alt='Preview'
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
