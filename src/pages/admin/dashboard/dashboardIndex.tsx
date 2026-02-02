import { Row, Col } from 'antd';
import {
	UsergroupAddOutlined,
	PieChartFilled,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import { useContext } from 'react';
import { AdminDashboardContext } from '../../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../../utils/context/admin-state-context/types/AdminTypes';
import Inventory from '../inventory/inventory';

const DashboardIndex = () => {
	const { orderDocs, userDocs } = useContext(
		AdminDashboardContext
	) as AdminDashboardProps;

	const totalRevenue = orderDocs?.reduce((sum, item) => {
		return sum + item.amount;
	}, 0);
	return (
		<div>
			<Row className='w-full font-bison flex gap-6 flex-col md:flex-row md:flex-wrap'>
				<Col className='w-[100%] md:w-[20%] bg-[#000] rounded-2xl gap-1 h-[100px] flex flex-col justify-center items-center'>
					<h5 className=' text-white font-bison text-xs font-bold'>
						Total Customers
					</h5>
					<UsergroupAddOutlined className=' text-4xl text-white' />

					<h1 className=' text-white font-bison font-bold'>
						{userDocs?.length}
					</h1>
				</Col>
				<Col className='w-[100%] md:w-[50%] gap-2 bg-[#000] rounded-2xl h-[120px] flex flex-col justify-center items-center'>
					<h5 className=' text-white text-xs font-bison font-bold'>
						Annual Revenue
					</h5>
					<PieChartFilled className=' text-2xl text-white' />
					<h1 className=' text-white font-bison font-bold text-xl'>
						₦{totalRevenue}
					</h1>
				</Col>
				<Col className='w-[100%] md:w-[20%] bg-[#000] rounded-2xl h-[100px] flex flex-col justify-center items-center'>
					<h5 className=' text-white font-bison text-xl font-bold'>Orders</h5>
					<ShoppingCartOutlined className=' text-2xl text-white' />

					<h1 className=' text-white font-bison text-xl font-bold'>
						{orderDocs?.length}
					</h1>
				</Col>
			</Row>

			<section className=' mt-24 font-bison flex flex-col gap-4'>
				<h1 className=' font-bold text-main'>Recent Orders from Store</h1>

				<Inventory />
			</section>
		</div>
	);
};

export default DashboardIndex;
