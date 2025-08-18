import React, { createContext, useState } from 'react';
import { User } from 'firebase/auth';
import { UserProps } from './types/UserType';
import { Product } from '../admin-state-context/types/ProductTypes';

export const UserContext = createContext<UserProps | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [products, setProducts] = useState<Product[] | null>(null)

	const contextValues = {
		user,
        setUser,
        products,
        setProducts
	};

	return (
		<UserContext.Provider value={contextValues}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
