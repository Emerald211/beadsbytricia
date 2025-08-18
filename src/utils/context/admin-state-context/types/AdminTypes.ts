import { User } from "firebase/auth"
import { Dispatch, SetStateAction } from "react"
import { Product } from "./ProductTypes"
import { UserDataType } from "../../../../pages/admin/users/Userindex"
import { InventoryDataType } from "../../../../pages/admin/inventory/inventory"

export type AdminDashboardProps = {
    AdminUser: User| null,
    setAdminUser: Dispatch<SetStateAction<User | null>>,
    products: Product[] | null,
    setProducts: Dispatch<SetStateAction<Product[] | null>>,
userDocs: UserDataType[] | null,
    setUserDocs: Dispatch<SetStateAction<UserDataType[] | null>>,
    orderDocs: InventoryDataType[] | null,
    setOrderDocs: Dispatch<SetStateAction<InventoryDataType[] | null>>
}