import { Timestamp } from "firebase/firestore";

export type Product = {
    name: string;
    description: string;
    price: number;
    category: string;
    status: string;
    photoURL?: string;
    id: string,
    gender: string,
    size: string,
    quantity: number,
    createdAt: Timestamp
};