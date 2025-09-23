import { useContext } from 'react';
import { AdminDashboardContext } from '../../../../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../../../../utils/context/admin-state-context/types/AdminTypes';
import ProductCard from '../../product-card/ProductCard';


const MenAccesories = () => {
	const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;
    const filteredProducts = products?.filter(product => 
        product.gender === 'MALE' && 
        ['Wrist watch', 'Perfumes', 'Bags'].includes(product.category)
    );
    
	return (
		<div className=' px-12 mt-12  text-main flex flex-col items-center justify-center'>
			<h1 className=' font-serrat text-2xl font-bold flex items-start justify-start'>
				Men Accessories
			</h1>

			<div className=' flex flex-wrap gap-4 p-10 m-10 items-center justify-center'>
				{filteredProducts?.map((product) => {
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

export default MenAccesories;
