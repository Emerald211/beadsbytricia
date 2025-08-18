import { useContext } from "react";
import { AdminDashboardContext } from "../../../../../utils/context/admin-state-context/AdminContext";
import { AdminDashboardProps } from "../../../../../utils/context/admin-state-context/types/AdminTypes";
import ProductCard from "../../product-card/ProductCard";

const MenClothing = () => {
  const { products } = useContext(AdminDashboardContext) as AdminDashboardProps;
  const sortedProducts = products?.filter((product) => {
    return product.gender === "MALE";
  });
  return (
    <div className=" mt-24 text-main">
      <h1 className=" font-serrat text-3xl font-bold flex items-center justify-center">
        MEN CLOTHING
      </h1>

      <div className=" flex flex-wrap gap-2 py-12 items-center justify-center">
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

export default MenClothing;
