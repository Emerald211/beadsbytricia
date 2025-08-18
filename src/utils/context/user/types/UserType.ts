import { User } from "firebase/auth"
import { Dispatch, SetStateAction } from "react"
import { Product } from "../../admin-state-context/types/ProductTypes";


export type UserProps = {
    user: User| null,
    setUser: Dispatch<SetStateAction<User | null>>,
    products: Product[] | null;
    setProducts: Dispatch<SetStateAction<Product[] | null>>
}