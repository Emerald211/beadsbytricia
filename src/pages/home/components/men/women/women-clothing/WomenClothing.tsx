import { useContext } from "react";
import { AdminDashboardContext } from "../../../../../../utils/context/admin-state-context/AdminContext";
import { AdminDashboardProps } from "../../../../../../utils/context/admin-state-context/types/AdminTypes";
import ProductCard from "../../../product-card/ProductCard";

const WomenClothing = () => {
    const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;
	const sortedProducts = products?.filter((product) => {
		return product.gender === "FEMALE"
	});
  return (
    <div className=' flex flex-col justify-center items-center px-12 mt-12 text-main'>
    <h1 className=' font-serrat text-2xl font-bold'>WOMEN ACCEESORIES</h1>

    <div className=' flex justify-center items-center flex-wrap gap-2 py-12 '>
        {sortedProducts?.map((product) => {
            const { id, name, price, category, photoURLs, size, quantity } = product;
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
  )
}

export default WomenClothing;