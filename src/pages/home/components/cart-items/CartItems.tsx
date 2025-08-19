import { useContext, useState } from 'react'
import { StoreContext } from '../../../../utils/context/store/StoreContext'
import { StoreProps } from '../../../../utils/context/store/StoreProps'
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { UserContext } from '../../../../utils/context/user/UserContext'
import { UserProps } from '../../../../utils/context/user/types/UserType'
import { useNavigate } from 'react-router-dom'

const CartItems = () => {
	const navigate = useNavigate()
	const { cartItems, setOpenCart, setCartItems } = useContext(StoreContext) as StoreProps
	const { user } = useContext(UserContext) as UserProps
	const [selectedItems, setSelectedItems] = useState<string[]>([])

	const totalPrice = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0)

	const handleDeleteItem = (id: string) => {
		const updatedCartItems = cartItems?.filter((item) => item.id !== id) || []
		setCartItems(updatedCartItems)
		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
		setSelectedItems((prev) => prev.filter((itemId) => itemId !== id))
	}

	const handleIncreaseQuantity = (id: string) => {
		const updatedCartItems = cartItems?.map((item) => {
			if (item.id === id) return { ...item, quantity: item.quantity + 1 }
			return item
		}) || []
		setCartItems(updatedCartItems)
		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
	}

	const handleDecreaseQuantity = (id: string) => {
		const updatedCartItems = cartItems?.map((item) => {
			if (item.id === id && item.quantity > 1) return { ...item, quantity: item.quantity - 1 }
			return item
		}) || []
		setCartItems(updatedCartItems)
		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
	}

	const handleSelectAll = () => {
		if (selectedItems.length === cartItems?.length) {
			setSelectedItems([])
		} else {
			setSelectedItems(cartItems?.map((item) => item.id) || [])
		}
	}

	const handleItemSelect = (id: string) => {
		if (selectedItems.includes(id)) {
			setSelectedItems((prev) => prev.filter((itemId) => itemId !== id))
		} else {
			setSelectedItems((prev) => [...prev, id])
		}
	}

	const handleDeleteSelected = () => {
		const updatedCartItems = cartItems?.filter((item) => !selectedItems.includes(item.id)) || []
		setCartItems(updatedCartItems)
		localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
		setSelectedItems([])
	}

	const checkOut = () => {
		if (user) {
			navigate('/checkout')
		} else {
			navigate('/login')
		}
		setOpenCart(false)
	}

	return (
		<div className='z-40 fixed w-screen top-0 left-0 h-screen flex'>
			<div className='w-[10%] md:w-[40%] lg:w-[60%] h-full bg-black/50' onClick={() => setOpenCart(false)}></div>
			<div className='w-[90%] md:w-[60%] lg:w-[40%] bg-gray-50 h-full ml-auto flex flex-col'>
				<div className='bg-white px-6 py-4 border-b border-gray-200'>
					<div className='flex items-center justify-between'>
						<h1 className='text-lg font-medium text-gray-900'>Your cart</h1>
						<div className='flex items-center gap-4'>
							<label className='flex items-center gap-2 text-sm text-gray-600 cursor-pointer'>
								<input
									type='checkbox'
									checked={selectedItems.length === cartItems?.length}
									onChange={handleSelectAll}
									className='w-4 h-4 accent-red-600'
								/>
								Select All
							</label>
							<button
								onClick={handleDeleteSelected}
								className='bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-800 transition-colors'
							>
								Delete
							</button>
							<CloseOutlined
								onClick={() => setOpenCart(false)}
								className='text-gray-500 hover:text-gray-700 cursor-pointer'
							/>
						</div>
					</div>
				</div>
				<div className='flex-1 overflow-y-auto px-6 py-4'>
					<div className='space-y-4'>
						{cartItems?.map((eachItem) => {
							const { name, size, price, quantity, id, photoURL } = eachItem
							const isSelected = selectedItems.includes(id)
							return (
								<div key={id} className='bg-white rounded-lg p-4 shadow-sm border border-gray-200'>
									<div className='flex items-center gap-4'>
										<input
											type='checkbox'
											className='w-4 h-4 accent-red-600'
											checked={isSelected}
											onChange={() => handleItemSelect(id)}
										/>
										<div className='relative'>
											<div
												style={{ backgroundImage: `url(${photoURL})` }}
												className='w-16 h-16 bg-gray-200 bg-cover bg-center rounded-lg'
											></div>
											<button
												onClick={() => handleDeleteItem(id)}
												className='absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors'
											>
												×
											</button>
										</div>
										<div className='flex-1'>
											<h3 className='font-medium text-gray-900 text-sm'>{name}</h3>
											<div className='text-xs text-gray-500 mt-1'>
												<span>Size: {size}</span>
												<span className='mx-2'>•</span>
												
											</div>
											<div className='text-lg font-bold text-gray-900 mt-2'>
												₦{(price * quantity).toLocaleString('en-NG')}
											</div>
										</div>
										<div className='flex items-center border border-gray-300 rounded-md'>
											<button
												onClick={() => handleDecreaseQuantity(id)}
												className='p-2 hover:bg-gray-100 transition-colors'
												disabled={quantity <= 1}
											>
												<MinusOutlined className='text-xs text-gray-600' />
											</button>
											<span className='px-4 py-2 text-sm font-medium min-w-[3rem] text-center'>
												{quantity}
											</span>
											<button
												onClick={() => handleIncreaseQuantity(id)}
												className='p-2 hover:bg-gray-100 transition-colors'
											>
												<PlusOutlined className='text-xs text-gray-600' />
											</button>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
				<div className='bg-white font-poppins border-t border-gray-200 px-6 py-4'>
					<div className='flex items-center justify-between mb-4'>
						<div>
							<div className='text-sm font-poppins text-gray-600'>SubTotal</div>
							<div className='text-lg font-bold text-gray-900'>
								₦{totalPrice?.toLocaleString('en-NG')}
							</div>
						</div>
						<div className='text-right'>
							<div className='text-sm text-gray-600'>Total Amount</div>
							<div className='text-lg font-bold text-gray-900'>
								₦{totalPrice?.toLocaleString('en-NG')}
							</div>
						</div>
					</div>
					<div className='text-xs text-gray-500 mb-4'>Taxes and Shipping are calculated at Checkout</div>
					<button
						onClick={checkOut}
						className='w-full bg-gray-900 text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-colors'
					>
						Checkout
					</button>
				</div>
			</div>
		</div>
	)
}

export default CartItems
