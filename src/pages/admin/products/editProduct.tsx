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
	photoURL: UploadFile<unknown> | string | null; // Accept string for URLs
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
	const [preview, setPreview] = useState<string | null>(null);
	const [fileList, setFileList] = useState<UploadFile[]>([]); // Store the file list for the upload component
	const [loading, setLoading] = useState(false);
	const [product, setProduct] = useState<AddNewProductProps | null>(null);

	useEffect(() => {
		const fetchProduct = async () => {
			if (!id) return;

			setLoading(true); // Start loading state
			const productRef = doc(db, 'products', id as string);
			const productDoc = await getDoc(productRef);

			if (productDoc.exists()) {
				const productData = productDoc.data() as AddNewProductProps;
				setProduct(productData);

				// Pre-fill form fields
				setValue('name', productData.name);
				setValue('description', productData.description);
				setValue('price', productData.price);
				setValue('category', productData.category);
				setValue('status', productData.status);

				// Set preview image if it exists
				if (typeof productData.photoURL === 'string') {
					setPreview(productData.photoURL); // This is just for the preview
				}
			} else {
				toast.error('Product not found');
				setProduct(null); // Reset product state if not found
			}

			setLoading(false); // End loading state
		};

		fetchProduct();
	}, [id, setValue]); // Re-run when the product ID changes

	const onSubmit: SubmitHandler<AddNewProductProps> = async (data) => {
		setLoading(true);
		try {
			const productRef = doc(db, 'products', id as string);

			// Initialize photoURL with the existing photo URL
			let photoURL = preview; // Retain the current photo URL if no new image is uploaded

			// If a new file is uploaded, upload it to Firebase Storage
			if (fileList.length > 0 && fileList[0].originFileObj) {
				const file = fileList[0].originFileObj as File;
				const storageRef = ref(storage, `products/${id}/${file.name}`);
				const uploadTask = await uploadBytes(storageRef, file);
				photoURL = await getDownloadURL(uploadTask.ref); // Get the new photo URL
			}

			// Prepare the updated product data
			const updatedProduct = {
				name: data.name || product?.name,
				description: data.description || product?.description,
				price: data.price || product?.price,
				category: data.category || product?.category,
				gender: data.gender,
				status: data.status || product?.status,
				photo: photoURL, // Keep the original photo unless a new one is uploaded
			};

			// Update the Firestore document with the new product data
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
				className='w-full flex font-poppins flex-col gap-5 mt-12'>
				<Controller
					name='name'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Name of Product</label>
							<Input
								className='w-[100%] md:w-[40%] font-poppins'
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
								className='w-[100%] md:w-[60%] font-poppins'
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
								className='w-[100%] font-poppins md:w-[20%]'
								size='large'
								placeholder='Select a category'
								{...field}>
								{ProductCategory.map((cat) => (
									<Select.Option key={cat} value={cat}>
										{cat}
									</Select.Option>
								))}
							</Select>
						</div>
					)}
				/>

				<Controller
					name='gender'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Product for</label>
							<Select
								className='w-[100%] font-poppins md:w-[20%]'
								size='large'
								placeholder='SELECT GENDER'
								{...field}>
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
								className='w-[100%] font-poppins md:w-[40%]'
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
								className='w-[100%] font-poppins md:w-[20%]'
								size='large'
								placeholder='Select status'
								{...field}>
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
					name='photoURL'
					control={control}
					render={({ field }) => (
						<div className='flex flex-col'>
							<label className='font-bold text-main'>Upload Photo</label>
							<Upload
								listType='picture'
								accept='image/*'
								beforeUpload={() => false} // Prevent automatic upload
								fileList={fileList} // Show uploaded file
								onChange={({ fileList }) => {
									setFileList(fileList); // Update the file list
									field.onChange(fileList); // Sync with form

									// Handle preview for new files
									if (fileList.length > 0 && fileList[0].originFileObj) {
										const file = fileList[0].originFileObj as File;
										const previewURL = URL.createObjectURL(file);
										setPreview(previewURL); // Show the new file's preview
									} else {
										// Fall back to original product photo
										setPreview((product?.photoURL as string) || null);
									}
								}}
								onRemove={(file) => {
									const newFileList = fileList.filter(
										(item) => item.uid !== file.uid
									);
									setFileList(newFileList); // Clear file list on removal
									if (newFileList.length === 0) {
										// Reset to the original product photo if no files left
										setPreview((product?.photoURL as string) || null);
									} else {
										// Handle the preview of the remaining file if any
										const remainingFile = newFileList[0].originFileObj as File;
										const previewURL = URL.createObjectURL(remainingFile);
										setPreview(previewURL);
									}
									field.onChange(newFileList); // Update form field
								}}>
								<Button icon={<UploadOutlined />}>Select Photo</Button>
							</Upload>

							{/* Display preview */}
							{preview && (
								<Image
									src={preview}
									alt='Uploaded Preview'
									style={{ marginTop: '10px', width: '200px' }}
									preview={false}
								/>
							)}
						</div>
					)}
				/>

				<Button className=' bg-main' type='primary' htmlType='submit' loading={loading}>
					Update Product
				</Button>
			</form>
		</div>
	);
};

export default EditProduct;
