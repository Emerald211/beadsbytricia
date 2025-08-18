import { Dispatch, SetStateAction } from "react"
import { Cart } from "./types/CartTypes";


export type StoreProps = {
    cartItems: Cart[] | null;
    setCartItems: Dispatch<SetStateAction<Cart[] | null>>,
    openCart: boolean;
    setOpenCart: Dispatch<SetStateAction<boolean>>,
    mobileNav: boolean,
    setMobileNav: Dispatch<SetStateAction<boolean>>
}