import './App.css';
import { Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/admin/login/login';
import React, { Suspense, useContext, useEffect } from 'react';
import {
	createAdminUserDocumentFromAuth,
	createUserDocumentFromAuth,
	customOnAuthStateChange,
	isAdminUser,
} from './utils/firebase/auth/firebaseAuth';
import { User } from 'firebase/auth';
import { Flex, Spin } from 'antd';
import { AdminDashboardContext } from './utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from './utils/context/admin-state-context/types/AdminTypes';
import DashboardIndex from './pages/admin/dashboard/dashboardIndex';
import Products from './pages/admin/products/products';
import AddNewProduct from './pages/admin/components/add-new-product/addNewProduct';
import {
	fetchOrders,
	fetchProducts,
	fetchUsers,
} from './utils/firebase/products/productConfig';
import ProductIndex from './pages/admin/products/productIndex';
import EditProduct from './pages/admin/products/editProduct';
import Home from './pages/home/Home';
import HomeIndexPage from './pages/home/HomeIndexPage';
import { StoreContext } from './utils/context/store/StoreContext';
import { StoreProps } from './utils/context/store/StoreProps';
import NewArrival from './pages/home/components/new-arrival/NewArrival';
import MenClothing from './pages/home/components/men/men-Clothing/MenClothing';
import WomenClothing from './pages/home/components/men/women/women-clothing/WomenClothing';
import Shop from './pages/home/shop/Shop';
import Clothing from './pages/home/components/clothing/Clothing ';
import Shoes from './pages/home/components/shoes/Shoes';
import UserLogin from './pages/home/login/Userlogin';
import { UserContext } from './utils/context/user/UserContext';
import { UserProps } from './utils/context/user/types/UserType';
import PersonalInformation from './pages/home/components/personal-information/PersonalInformation';
import Checkout from './pages/home/checkout/Checkout';
import UsersTable from './pages/admin/users/Userindex';
import Inventory from './pages/admin/inventory/inventory';
import OrderHistory from './pages/home/order-history/Orderhistory';
import Trending from './pages/home/components/trending/Trending';
import PopuarItems from './pages/home/components/popular-items/PopularItems';
import MenAccesories from './pages/home/components/men/men-accesories/MenAccesories';
import WomenAccesories from './pages/home/components/men/women/women-accesories/WomenAccesories';
import Contact from './pages/home/contact/Contact';
import Profile from './pages/home/components/profile/Profile';
import Bracelet from './pages/home/components/Bracelet-stacks/Bracelet';
import NeckCandies from './pages/home/components/Neck-candles/NeckCandies';
import Groom from './pages/home/components/groom/Groom';
import WalkingStick from './pages/home/components/walking-sticks/WalkingStick';
import Earring from './pages/home/components/statement-earring/Earring';
import BeadedBag from './pages/home/components/BeadedBag/BeadedBag';
import Bridal from './pages/home/components/Bridal/Bridal';
import ThrowOn from './pages/home/components/Statement-throwon/ThrowOn';
import Gemstone from './pages/home/components/Gemstone/Gemstone';
const AdminDashboard = React.lazy(
	() => import('./pages/admin/dashboard/dashboard')
);

function App() {
	const { AdminUser, setAdminUser, setProducts, setUserDocs, setOrderDocs } =
		useContext(AdminDashboardContext) as AdminDashboardProps;

	const { user, setUser, products } = useContext(UserContext) as UserProps;

	const { setCartItems } = useContext(StoreContext) as StoreProps;
	useEffect(() => {
		const unsubscribe = customOnAuthStateChange(async (user: User | null) => {
			if (user) {
				const isAdmin = await isAdminUser(user.uid);

				if (isAdmin) {
					console.log('Admin user signed in:', user);

					await createAdminUserDocumentFromAuth(user, {
						uid: user.uid,
					});

					setAdminUser(user);

					const fetchedProducts = await fetchProducts();
					setProducts(fetchedProducts);

					const fetchedUsers = await fetchUsers(user.uid);
					const fetchedOrders = await fetchOrders(user.uid);

					setUserDocs(fetchedUsers);
					setOrderDocs(fetchedOrders);
				} else {
					console.log('User is not an admin; skipping admin-specific actions.');
				}
			} else {
				console.log('No user is signed in.');
			}
		});

		return unsubscribe;
	}, [AdminUser]);

	useEffect(() => {
		const unsubscribe = customOnAuthStateChange(async (user: User | null) => {
			if (user) {
				console.log(user);

				const isAdmin = await isAdminUser(user.uid);

				if (!isAdmin) {
					await createUserDocumentFromAuth(user, {
						uid: user.uid,
					});
					setUser(user);
					const fetchedUsers = await fetchUsers(user.uid);
					setUserDocs(fetchedUsers);
				}
			} else {
				console.log('No user is signed in.');
			}

			const fetchedProducts = await fetchProducts();
			setProducts(fetchedProducts);

			const storedCartItems = localStorage.getItem('cartItems');
			if (storedCartItems) {
				const cartItems = JSON.parse(storedCartItems);
				setCartItems(cartItems);
			}
		});

		return unsubscribe;
	}, [user]);

	useEffect(() => {
		const getProducts = async () => {
			const fetchedProducts = await fetchProducts();
			setProducts(fetchedProducts);

			const storedCartItems = localStorage.getItem('cartItems');
			if (storedCartItems) {
				const cartItems = JSON.parse(storedCartItems);
				setCartItems(cartItems);
			}
		};

		getProducts();
	}, [products]);

	return (
		<Routes>
			
			<Route
				path='/'
				element={
					<Suspense
						fallback={
							<section className=' flex justify-center items-center w-full h-screen'>
								<Flex align='center' gap='middle'>
									<Spin size='large' />
								</Flex>
							</section>
						}>
						<Home />
					</Suspense>
				}>
				<Route index element={<HomeIndexPage />} />
				<Route path='login' element={<UserLogin />} />
				<Route path='personal-information' element={<PersonalInformation />} />
				<Route path='shop' element={<Shop />} />
				<Route path='checkout' element={<Checkout />} />
				<Route path='clothing' element={<Clothing />} />
				<Route path='bracelet-stacks' element={<Bracelet />} />
				<Route path='beaded-bags' element={<BeadedBag />} />
				<Route path='bridal' element={<Bridal />} />
				<Route path='gemstone-pendant' element={<Gemstone />} />
				<Route path='statement-throwon' element={<ThrowOn />} />
				<Route path='neck-candies' element={<NeckCandies />} />
				<Route path='grooms-owanbe-sets' element={<Groom />} />
				<Route path='walking-sticks' element={<WalkingStick />} />
				<Route path='statement-earrings' element={<Earring />} />
				<Route path='shoes' element={<Shoes />} />
				<Route path='new-arrival' element={<NewArrival />} />
				<Route path='trending' element={<Trending />} />
				<Route path='popular-items' element={<PopuarItems />} />
				<Route path='men-clothing' element={<MenClothing />} />
				<Route path='men-accesories' element={<MenAccesories />} />
				<Route path='women-clothing' element={<WomenClothing />} />
				<Route path='women-acccesories' element={<WomenAccesories />} />
				<Route path='order-history' element={<OrderHistory />} />
				<Route path='contact' element={<Contact />} />
				<Route path='profile' element={<Profile />} />
			</Route>
			<Route path='/admin-login' element={<AdminLogin />}></Route>
			<Route
				path='/admin-dashboard'
				element={
					<Suspense
						fallback={
							<section className=' flex justify-center items-center w-full h-screen'>
								<Flex align='center' gap='middle'>
									<Spin size='large' />
								</Flex>
							</section>
						}>
						<AdminDashboard />
					</Suspense>
				}>
				<Route index element={<DashboardIndex />}></Route>
				<Route path='product' element={<Products />}>
					<Route index element={<ProductIndex />}></Route>
					<Route path='add-new-product' element={<AddNewProduct />}></Route>
					<Route path='edit-product/:id' element={<EditProduct />}></Route>
				</Route>

				<Route path='users' element={<UsersTable />} />
				<Route path='inventory' element={<Inventory />} />
			</Route>
		</Routes>
	);
}

export default App;
