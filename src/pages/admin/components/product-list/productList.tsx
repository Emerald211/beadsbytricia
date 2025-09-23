import React, { useContext, useEffect } from 'react';
import { Button, Modal, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import {
	ExclamationCircleOutlined,
	PlusCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AdminDashboardContext } from '../../../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../../../utils/context/admin-state-context/types/AdminTypes';
import { Product } from '../../../../utils/context/admin-state-context/types/ProductTypes';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../utils/firebase/auth/firebaseAuth';

interface DataType {
	id: string;
	name: string;
	price: number;
	photoURLs: string[] | undefined;
	category: string;
	status: string[];
}

const defaultImage = 'https://via.placeholder.com/150';

const mapProductsToDataType = (products: Product[]): DataType[] => {
	return products.map((product) => ({
		key: product.id,
		id: product.id,
		name: product.name,
		price: product.price,
		photoURLs: product.photoURLs,
		category: product.category,
		status: Array.isArray(product.status) ? product.status : [product.status],
	}));
};

const ProductList: React.FC = () => {
	const { products, setProducts } = useContext(
		AdminDashboardContext
	) as AdminDashboardProps;
	const navigate = useNavigate(); // Define useNavigate outside the render function
	const data: DataType[] = products ? mapProductsToDataType(products) : [];
	const { confirm } = Modal;

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
			const updatedProducts = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as Product[];
			setProducts(updatedProducts);
		});

	
		return () => unsubscribe();
	}, []);

	const deleteProduct = async (id: string) => {
		try {
			const productRef = doc(db, 'products', id);
			await deleteDoc(productRef);
			console.log('Product deleted successfully');
		} catch (error) {
			console.error('Error deleting product:', error);
		}
	};

	// Confirm delete modal
	const showDeleteConfirm = (id: string) => {
		confirm({
			title: 'Are you sure you want to delete this product?',
			icon: <ExclamationCircleOutlined />,
			content: 'This action cannot be undone',
			onOk() {
				deleteProduct(id);
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	};

	// Columns for the table, including the fixed Edit button
	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a className='font-poppins'>{text}</a>,
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'Image',
			dataIndex: 'image',
			key: 'image',
			render: (_, { photoURLs }) => (
				<img
					src={photoURLs && photoURLs[0]}
					alt='Product'
					style={{ width: '50px', height: '50px', objectFit: 'cover' }}
				/>
			),
		},
		{
			title: 'Category',
			dataIndex: 'category',
			key: 'category',
		},
		{
			title: 'Tags',
			key: 'tags',
			dataIndex: 'tags',
			render: (_, { status }) => (
				<>
					{status.map((tag) => {
						const color = tag === 'OUT-OF-STOCK' ? 'volcano' : 'green';
						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						);
					})}
				</>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					<Button
						className='font-poppins'
						type='primary'
						onClick={() =>
							navigate(`/admin-dashboard/product/edit-product/${record.id}`)
						}>
						Edit
					</Button>
					<Button
						className='font-poppins'
						type='primary'
						danger
						onClick={() => showDeleteConfirm(record.id)}>
						Delete
					</Button>
				</Space>
			),
		},
	];

	return (
		<>
			<div className='w-full flex mb-5 font-poppins'>
				<h1 className='text-main font-bold'>List of all Products</h1>
				<button
					onClick={() => navigate('/admin-dashboard/product/add-new-product')}
					className='ml-auto rounded-lg right-5 px-3 py-2 bg-main text-white'>
					<PlusCircleOutlined className='text-white' /> Add New Product
				</button>
			</div>
			<Table
				className=' font-poppins overflow-x-auto'
				columns={columns}
				dataSource={data}
        onRow={() => ({
					onClick: (event) => {
						event.stopPropagation(); // Prevent row click navigation
					},
				})}
			/>
		</>
	);
};

export default ProductList;
