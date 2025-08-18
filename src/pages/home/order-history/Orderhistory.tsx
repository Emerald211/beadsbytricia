import React, { useContext, useState } from 'react';
import { Button, Modal, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../utils/firebase/auth/firebaseAuth';
import { AdminDashboardContext } from '../../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../../utils/context/admin-state-context/types/AdminTypes';
import { Cart } from '../../../utils/context/store/types/CartTypes';
import { UserContext } from '../../../utils/context/user/UserContext';
import { UserProps } from '../../../utils/context/user/types/UserType';
import { useNavigate } from 'react-router-dom';

export interface InventoryDataType {
	name: string;
	email: string;
	orderNumber: string;
	amount: number;
	uid: string;
	phoneNo: string;
	dob: string;
	orderItems: Cart[];
}

const OrderHistory: React.FC = () => {
	const { orderDocs } = useContext(
		AdminDashboardContext
	) as AdminDashboardProps;
	const { user } = useContext(UserContext) as UserProps;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<InventoryDataType | null>(
		null
	);
	const navigate = useNavigate()

	const filteredOrders = orderDocs?.filter(
		(eachitem) => eachitem.uid === user?.uid
	);

	const deleteOrders = async (id: string) => {
		try {
			const productRef = doc(db, 'orders', id);
			await deleteDoc(productRef);
			console.log('Order deleted successfully');
		} catch (error) {
			console.error('Error deleting product:', error);
		}
	};

	const showModal = (order: InventoryDataType) => {
		setSelectedOrder(order);
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		setSelectedOrder(null);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedOrder(null);
	};

	const columns: TableProps<InventoryDataType>['columns'] = [
		{
			title: 'Full Name',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Phone No',
			dataIndex: 'phoneNo',
			key: 'phoneNo',
			render: (text) => <a>{text}</a>,
		},
		{
			title: 'Amount Paid',
			dataIndex: 'amount',
			key: 'amount',
			render: (text) => <a>₦{text}</a>,
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					<Button type='primary' onClick={() => showModal(record)}>
						View Order Details
					</Button>
					<Button
						type='primary'
						danger
						onClick={() => deleteOrders(record.orderNumber)}>
						Cancel
					</Button>
				</Space>
			),
		},
	];

	return (
		<>
			<div className=' min-h-full mt-12 px-12'>
			<h1 className=' font-bold mb-12'>Order History</h1>
			<Table
				
				columns={columns}
				dataSource={filteredOrders || []}
				onRow={() => ({
					onClick: (event) => {
						event.stopPropagation();
					},
				})}
				/>
				
				<button onClick={() => navigate('/')} className=' bg-black px-3 py-4 text-center font-bold text-white flex justify-center items-center mb-12'>GO BACK TO HOME</button>
		</div>

			<Modal
				title='Order Details'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}>
				<section>
					{selectedOrder && selectedOrder.orderItems?.length > 0 ? (
						selectedOrder.orderItems.map((eachItem) => (
							<div
								key={eachItem.id}
								className='w-full flex mt-5 border-t-2 px-6 py-4'>
								<div
									style={{ backgroundImage: `url(${eachItem.photoURL})` }}
									className='image w-[150px] h-[150px] bg-slate-300 bg-cover bg-no-repeat relative group'></div>
								<div className='w-full px-5 relative'>
									<h6 className='font-bold absolute top-2 right-5'>
										₦{eachItem.price}
									</h6>
									<h1 className='font-bold'>{eachItem.name}</h1>
									<div className='text-sm flex gap-2 items-center text-slate-400'>
										<h6>Category: {eachItem.category}</h6>
										<h6>Size: {eachItem.size}</h6>
									</div>
								</div>
							</div>
						))
					) : (
						<p>No order items available</p>
					)}
				</section>
			</Modal>
		</>
	);
};

export default OrderHistory;
