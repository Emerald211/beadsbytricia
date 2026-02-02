import React from 'react';
import { useNavigate } from 'react-router-dom';

const PromoBanner: React.FC = () => {
    const navigate = useNavigate()
	return (
		<div className='relative h-[60vh] font-bison overflow-hidden bg-main text-white  shadow-xl mx-16 mb-12 rounded-lg p-8 md:p-16 mt-16 flex items-center '>
			<div className='relative z-10 flex flex-col md:flex-row items-center justify-between   md:text-left'>
				<div className='mb-6 md:mb-0 md:mr-8'>
					<h2 className='text-3xl md:text-4xl font-extrabold leading-tight'>
						Unlock Your First Purchase Discount!
					</h2>
					<p className='mt-2 text-lg md:text-xl font-light opacity-90'>
						Get 5% OFF your entire order. Limited time offer!
                    </p>
                    
                  
					
					<button onClick={() => navigate('/login')} className='mt-5 bg-white text-main px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-gray-100 hover:text-main transition-all duration-300 transform hover:scale-105'>
						Shop now
					</button>
			
				</div>

				
			</div>
		</div>
	);
};

export default PromoBanner;
