import { useContext } from "react";
import { AdminDashboardContext } from "../../../../utils/context/admin-state-context/AdminContext";
import { AdminDashboardProps } from "../../../../utils/context/admin-state-context/types/AdminTypes";
import ProductCard from "../product-card/ProductCard";

const Groom = () => {
  const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;

  const filterProduct = products?.filter(
    (product) => product.category === "Groom’s/Owambe sets"
  );
  return (
    <div className=" px-12 font-poppins pb-12 flex items-center justify-center flex-col">
      <h1 className=" mt-12 font-bold text-3xl">Groom’s/Owambe sets</h1>

      <div className=" flex flex-wrap gap-4 p-10 m-10 items-center justify-center">
        {filterProduct?.map((product) => (
          <ProductCard
            key={product.id}
            size={product.size}
            id={product.id}
            photoURLs={product.photoURLs}
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

export default Groom;
