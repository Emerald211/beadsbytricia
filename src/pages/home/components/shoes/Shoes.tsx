import { useContext } from "react";
import { AdminDashboardContext } from "../../../../utils/context/admin-state-context/AdminContext";
import { AdminDashboardProps } from "../../../../utils/context/admin-state-context/types/AdminTypes";
import ProductCard from "../product-card/ProductCard";

const Shoes = () => {
  const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;

  const filterProduct = products?.filter(
    (product) => product.category === "Shoes"
  );
  return (
    <div className=" px-12 mt-12  text-main flex flex-col items-center justify-center">
      <h1 className=" mt-12 font-bold text-3xl">Shoes</h1>

      <div className=" flex flex-wrap gap-3 p-10 m-10 items-center justify-center">
        {filterProduct?.map((product) => (
          <ProductCard
            key={product.id}
            size={product.size}
            id={product.id}
            photoURL={product.photoURL}
            name={product.name}
            quantity={product.quantity}
            price={product.price}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Shoes;
