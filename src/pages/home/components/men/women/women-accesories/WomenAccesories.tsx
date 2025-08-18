import { useContext } from 'react';
import { AdminDashboardContext } from '../../../../../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../../../../../utils/context/admin-state-context/types/AdminTypes';
import ProductCard from '../../../product-card/ProductCard';

const WomenAccesories = () => {
	const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;
	const sortedProducts = products?.filter(
		(product) =>
			product.gender === 'MALE' &&
			['Wrist watch', 'Perfumes', 'Bags'].includes(product.category)
	);
	return (
		<div className=' mt-12 text-main'>
			<h1 className=' font-serrat text-3xl font-bold flex items-center justify-center'>
				WOMEN ACCESORIES
			</h1>

			<div className=' flex flex-wrap gap-2 py-12 items-center justify-center'>
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

export default WomenAccesories;
