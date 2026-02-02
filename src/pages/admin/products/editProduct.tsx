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
import { useEffect, useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebase/auth/firebaseAuth';
import { storage } from '../../../utils/firebase/firebaseConfig';

interface AddNewProductProps {
	name: string;
	description: string;
	price: number;
	category: string;
	gender: string;
	status: string;
	photoURLs: string[]; // array of photos
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

const EditProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { control, handleSubmit, setValue } = useForm<AddNewProductProps>();
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [previews, setPreviews] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [product, setProduct] = useState<AddNewProductProps | null>(null);
	const [colors, setColors] = useState<string[]>([]);
	const [lengths, setLengths] = useState<string[]>([]);

	const ColorOptions = [
		{ name: 'Black', value: 'black' },
		{ name: 'White', value: 'white' },
		{ name: 'Gray', value: 'gray' },
		{ name: 'Silver', value: 'silver' },
		{ name: 'Gold', value: 'gold' },
		{ name: 'Rose Gold', value: 'rose-gold' },
		{ name: 'Platinum', value: 'platinum' },
		{ name: 'Brown', value: 'brown' },
		{ name: 'Beige', value: 'beige' },
		{ name: 'Tan', value: 'tan' },
		{ name: 'Khaki', value: 'khaki' },
		{ name: 'Olive', value: 'olive' },
		{ name: 'Red', value: 'red' },
		{ name: 'Burgundy', value: 'burgundy' },
		{ name: 'Maroon', value: 'maroon' },
		{ name: 'Pink', value: 'pink' },
		{ name: 'Rose Pink', value: 'rose-pink' },
		{ name: 'Purple', value: 'purple' },
		{ name: 'Violet', value: 'violet' },
		{ name: 'Lavender', value: 'lavender' },
		{ name: 'Blue', value: 'blue' },
		{ name: 'Navy', value: 'navy' },
		{ name: 'Sky Blue', value: 'sky-blue' },
		{ name: 'Turquoise', value: 'turquoise' },
		{ name: 'Teal', value: 'teal' },
		{ name: 'Green', value: 'green' },
		{ name: 'Emerald Green', value: 'emerald-green' },
		{ name: 'Mint Green', value: 'mint-green' },
		{ name: 'Lime', value: 'lime' },
		{ name: 'Yellow', value: 'yellow' },
		{ name: 'Mustard', value: 'mustard' },
		{ name: 'Orange', value: 'orange' },
		{ name: 'Coral', value: 'coral' },
		{ name: 'Ivory', value: 'ivory' },
		{ name: 'Cream', value: 'cream' },
		{ name: 'Champagne', value: 'champagne' },
	];

	const LengthOptions = ['10cm (Baby size)', '16cm', '18cm', '20cm'];

	useEffect(() => {
		const fetchProduct = async () => {
			if (!id) return;
			setLoading(true);

			const productRef = doc(db, 'products', id as string);
			const productDoc = await getDoc(productRef);

			if (productDoc.exists()) {
				const data = productDoc.data() as any;

				// Handle migration: convert old photoURL -> photoURLs array
				let photos: string[] = [];
				if (Array.isArray(data.photoURLs)) {
					photos = data.photoURLs;
				} else if (typeof data.photoURL === 'string') {
					photos = [data.photoURL];
				}

				const productData: AddNewProductProps = {
					name: data.name,
					description: data.description,
					price: data.price,
					category: data.category,
					gender: data.gender,
					status: data.status,
					photoURLs: photos,
					colors: data.colors || [],
					lengths: data.lengths || [],
				};

				setProduct(productData);
				setValue('name', productData.name);
				setValue('description', productData.description);
				setValue('price', productData.price);
				setValue('category', productData.category);
				setValue('status', productData.status);
				setColors(productData.colors || []);
				setLengths(productData.lengths || []);
				setPreviews(productData.photoURLs || []);
			} else {
				toast.error('Product not found');
				setProduct(null);
			}

			setLoading(false);
		};

		fetchProduct();
	}, [id, setValue]);

	const onSubmit: SubmitHandler<AddNewProductProps> = async (data) => {
		setLoading(true);
		try {
			const productRef = doc(db, 'products', id as string);

			let photoURLs: string[] = previews;

			// Upload new files
			if (fileList.length > 0) {
				const uploaded: string[] = [];
				for (const file of fileList) {
					if (file.originFileObj) {
						const f = file.originFileObj as File;
						const storageRef = ref(storage, `products/${id}/${f.name}`);
						const uploadTask = await uploadBytes(storageRef, f);
						const url = await getDownloadURL(uploadTask.ref);
						uploaded.push(url);
					} else if (file.url) {
						uploaded.push(file.url);
					}
				}
				photoURLs = uploaded;
			}

			const updatedProduct = {
				name: data.name || product?.name,
				description: data.description || product?.description,
				price: data.price || product?.price,
				category: data.category || product?.category,
				gender: data.gender,
				status: data.status || product?.status,
				photoURLs,
				colors,
				lengths,
			};

			await updateDoc(productRef, updatedProduct);

			toast.success('Product updated successfully!');
			navigate('/admin-dashboard/product');
		} catch (error) {
			console.error('Error updating product:', error);
			toast.error('Failed to update product.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<ToastContainer transition={Bounce} />
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full flex font-bison flex-col gap-5 mt-12'
			>
				<Controller
					name='name'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Name of Product</label>
							<Input
								className='w-[100%] md:w-[40%] font-bison'
								size='large'
								placeholder='Enter product name'
								{...field}
							/>
						</div>
					)}
				/>

				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Description</label>
							<Input.TextArea
								rows={4}
								className='w-[100%] md:w-[60%] font-bison'
								size='large'
								placeholder='Enter product description'
								{...field}
							/>
						</div>
					)}
				/>

				<Controller
					name='category'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Category</label>
							<Select
								className='w-[100%] font-bison md:w-[20%]'
								size='large'
								placeholder='Select a category'
								{...field}
							>
								{ProductCategory.map((cat) => (
									<Select.Option key={cat} value={cat}>
										{cat}
									</Select.Option>
								))}
							</Select>
						</div>
					)}
				/>

				{product?.category === 'Bracelet stacks' && (
					<>
						{/* Colors */}
						<div className='flex flex-col mt-4'>
							<label className='font-bold text-main'>Available Colors</label>
							<Select
								mode='multiple'
								className='w-[100%] md:w-[40%]'
								placeholder='Select colors'
								value={colors}
								onChange={setColors}
							>
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

						{/* Lengths */}
						<div className='flex flex-col mt-4'>
							<label className='font-bold text-main'>Wrist Lengths</label>
							<Select
								mode='multiple'
								className='w-[100%] md:w-[40%]'
								placeholder='Select lengths'
								value={lengths}
								onChange={setLengths}
							>
								{LengthOptions.map((length) => (
									<Select.Option key={length} value={length}>
										{length}
									</Select.Option>
								))}
							</Select>
						</div>
					</>
				)}

				<Controller
					name='gender'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Product for</label>
							<Select
								className='w-[100%] font-bison md:w-[20%]'
								size='large'
								placeholder='SELECT GENDER'
								{...field}
							>
								{Gender.map((status) => (
									<Select.Option key={status} value={status}>
										{status}
									</Select.Option>
								))}
							</Select>
						</div>
					)}
				/>

				<Controller
					name='price'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Price</label>
							<InputNumber
								className='w-[100%] font-bison md:w-[40%]'
								size='large'
								placeholder='Enter product price'
								{...field}
							/>
						</div>
					)}
				/>

				<Controller
					name='status'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Status</label>
							<Select
								className='w-[100%] font-bison md:w-[20%]'
								size='large'
								placeholder='Select status'
								{...field}
							>
								{ProductStatus.map((status) => (
									<Select.Option key={status} value={status}>
										{status}
									</Select.Option>
								))}
							</Select>
						</div>
					)}
				/>

				<Controller
					name='photoURLs'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Upload Photos</label>
							<Upload
								listType='picture-card'
								accept='image/*'
								beforeUpload={() => false}
								fileList={fileList}
								onChange={({ fileList }) => {
									setFileList(fileList);
									field.onChange(fileList);

									const newPreviews = fileList.map((file) =>
										file.originFileObj
											? URL.createObjectURL(file.originFileObj as File)
											: file.url || ''
									);
									setPreviews(newPreviews);
								}}
								onRemove={(file) => {
									const newFileList = fileList.filter(
										(item) => item.uid !== file.uid
									);
									setFileList(newFileList);
									field.onChange(newFileList);

									const newPreviews = newFileList.map((f) =>
										f.originFileObj
											? URL.createObjectURL(f.originFileObj as File)
											: f.url || ''
									);
									setPreviews(newPreviews);
								}}
								multiple
							>
								<Button icon={<UploadOutlined />}>Select Photos</Button>
							</Upload>

							{/* Display previews */}
							<div className='flex flex-wrap gap-3 mt-3'>
								{previews.map((src, idx) => (
									<Image
										key={idx}
										src={src}
										alt={`Preview ${idx}`}
										width={120}
										height={120}
										preview={false}
									/>
								))}
							</div>
						</div>
					)}
				/>

				<Button
					className='bg-main'
					type='primary'
					htmlType='submit'
					loading={loading}
				>
					Update Product
				</Button>
			</form>
		</div>
	);
};

export default EditProduct;
