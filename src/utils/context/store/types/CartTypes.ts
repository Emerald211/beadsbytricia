export type Cart = {
    name: string;
    description: string;
    price: number;
    size: string;
    quantity: number;
    category: string;
    status: string;
    photoURLs?: string[];
    id: string
    orderNumber?: string;
    color: string | null,
    length: string | null,
   
};
