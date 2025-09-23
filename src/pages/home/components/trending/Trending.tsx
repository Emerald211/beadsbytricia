import { useContext } from 'react';
import { AdminDashboardProps } from '../../../../utils/context/admin-state-context/types/AdminTypes';
import { AdminDashboardContext } from '../../../../utils/context/admin-state-context/AdminContext';
import ProductCard from '../product-card/ProductCard';

const Trending = () => {
	const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;
    const sortedByPrice = products?.sort((a, b) => b.price - a.price);
    const trendingProducts = sortedByPrice?.slice(0, 5);


	return (
		<div className=' px-12 mt-12 mb-24 text-main flex flex-col items-center justify-center'>
			<h1 className=' font-serrat text-2xl font-bold flex items-start justify-start'>
				Trending 🔥
			</h1>

			<div className=' flex flex-wrap gap-4 mt-12 items-center justify-center'>
				{trendingProducts?.map((product) => {
					const { id, name, price, category, photoURLs, size, quantity } =
						product;
					return (
						<ProductCard
							key={id}
							name={name}
							price={price}
							category={category}
							photoURLs={photoURLs}
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

export default Trending;
