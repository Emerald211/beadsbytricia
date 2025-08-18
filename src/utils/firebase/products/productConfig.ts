import { Timestamp, addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { Product } from "../../context/admin-state-context/types/ProductTypes";
import { firestore } from "../firebaseConfig";
import { UserDataType } from "../../../pages/admin/users/Userindex";
import { db, isAdminUser } from "../auth/firebaseAuth";
import { InventoryDataType } from "../../../pages/admin/inventory/inventory";
import { Cart } from "../../context/store/types/CartTypes";



export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const querySnapshot = await getDocs(collection(firestore, 'products'));
        const products: Product[] = [];
        querySnapshot.forEach((doc) => {
            products.push({ ...doc.data(), id: doc.id } as Product);
        });
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const fetchUsers = async (uid: string): Promise<UserDataType[]> => {
    const admin = await isAdminUser(uid);

    console.log(admin);
    
    
    if (!admin) {
        throw new Error('User does not have permission to fetch users.');
    }

    try {
        const querySnapshot = await getDocs(collection(getFirestore(), 'users'));
        const users: UserDataType[] = [];
        querySnapshot.forEach((doc) => {
            users.push({ ...doc.data(), uid: doc.id } as UserDataType);
        });
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const addOrderToFirestore = async (orderData: object) => {
	try {
		await addDoc(collection(db, 'orders'), {
			...orderData,
			createdAt: Timestamp.now(), 
		});
		console.log('Order added successfully!');
	} catch (error) {
		console.error('Error adding order to Firestore:', error);
	}
};

export const fetchOrders = async (uid: string): Promise<InventoryDataType[]> => {
    const admin = await isAdminUser(uid);
    
    if (!admin) {
        throw new Error('User does not have permission to fetch users.');
    }

    try {
        const querySnapshot = await getDocs(collection(getFirestore(), 'orders'));
        const orders: InventoryDataType[] = [];
        querySnapshot.forEach((doc) => {
            orders.push({ ...doc.data(), uid: doc.id } as InventoryDataType);
        });
        return orders;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};




export const addOrderToUserFirestore = async (userId: string, orderData: { orderNumber: string; amount: number; cartItems: Cart[] }) => {
    try {
        const userDocRef = doc(firestore, "users", userId);

        // Fetch the existing user document to check current orders
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const existingOrders = userData.orders || [];

            // Check if the order already exists based on `orderNumber`
            const orderExists = existingOrders.some((order: { orderNumber: string }) => order.orderNumber === orderData.orderNumber);

            if (!orderExists) {
                // If the order does not exist, add it to the orders array
                await updateDoc(userDocRef, {
                    orders: arrayUnion(orderData),
                });
                console.log("Order successfully added to user's Firestore document.");
            } else {
                console.log("Order already exists, not adding.");
            }
        } else {
            console.error("User document does not exist.");
        }
    } catch (error) {
        console.error("Error adding order to Firestore:", error);
    }
};

