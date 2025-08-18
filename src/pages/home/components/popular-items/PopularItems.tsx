import { useContext } from 'react';
import { AdminDashboardProps } from '../../../../utils/context/admin-state-context/types/AdminTypes';
import { AdminDashboardContext } from '../../../../utils/context/admin-state-context/AdminContext';
import ProductCard from '../product-card/ProductCard';
import { Product } from '../../../../utils/context/admin-state-context/types/ProductTypes';

const PopuarItems = () => {
	const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;
	const sortedByPrice = products?.sort((a, b) => b.price - a.price);

	function getRandomTrendingProducts(
		products: Product[],
		count: number
	): Product[] {
		const shuffled = [...products].sort(() => 0.5 - Math.random());

		return shuffled.slice(0, count);
	}

	const trendingProducts = sortedByPrice
		? getRandomTrendingProducts(sortedByPrice, 5)
		: [];

	return (
		<div className=' px-12 mt-12 ml-12 text-main flex flex-col items-center justify-center'>
			<h1 className=' font-serrat text-2xl font-bold flex items-start justify-start'>
				Popular Items 🔥
			</h1>

			<div className=' flex flex-wrap gap-4 p-10 m-10 items-center justify-center'>
				{trendingProducts?.map((product) => {
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

export default PopuarItems;
