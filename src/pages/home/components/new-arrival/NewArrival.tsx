import { useContext } from 'react';
import { AdminDashboardProps } from '../../../../utils/context/admin-state-context/types/AdminTypes';
import { AdminDashboardContext } from '../../../../utils/context/admin-state-context/AdminContext';
import ProductCard from '../product-card/ProductCard';

const NewArrival = () => {
	const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;
	const sortedProducts = products?.sort((a, b) => {
		if (a.createdAt && b.createdAt) {
			return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
		}
		return 0;
	});
	return (
		<div className=' px-12 mt-12 mb-24  text-main flex flex-col items-center justify-center'>
			<h1 className=' font-serrat text-2xl font-bold flex items-start justify-start'>
				New Arrivals
			</h1>

			<div className=' flex mt-12 flex-wrap gap-4  items-center justify-center'>
				{sortedProducts?.map((product) => {
					const { id, name, price, category, photoURL, size, quantity } =
						product;
					return (
						<ProductCard
							key={id}
							name={name}
							price={price}
							category={category}
							photoURL={photoURL}
							id={id}
							size={size}
							quantity={quantity}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default NewArrival;
