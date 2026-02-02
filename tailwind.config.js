/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				main: '#000',
				gold: '#D4AF37',
				'gold-light': '#F5E6C8',
				'gold-dark': '#B8860B',
				cream: '#FFFEF9',
				charcoal: '#1a1a1a',
			},
			fontFamily: {
				main: 'Roboto',
				serrat: 'Montserrat',
				poppins: 'Poppins',
				bison: ['Oswald', 'Bebas Neue', 'sans-serif'],
			},
			backgroundImage: {
				hero: 'url("/src/assets/SaveClip.App_481994610_18385190431136625_1014949194919151044_n.jpg")',
				hero2:
					'url("/src/assets/SaveClip.App_481994610_18385190431136625_1014949194919151044_n.jpg")',
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-out',
				'fade-in-up': 'fadeInUp 0.6s ease-out',
				'fade-in-down': 'fadeInDown 0.6s ease-out',
				'slide-in-left': 'slideInLeft 0.5s ease-out',
				'slide-in-right': 'slideInRight 0.5s ease-out',
				'scale-in': 'scaleIn 0.3s ease-out',
				float: 'float 3s ease-in-out infinite',
				shimmer: 'shimmer 2s linear infinite',
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				fadeInDown: {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slideInLeft: {
					'0%': { opacity: '0', transform: 'translateX(-30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				slideInRight: {
					'0%': { opacity: '0', transform: 'translateX(30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
			},
			transitionTimingFunction: {
				luxury: 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
		},
	},
	plugins: [
		function ({ addUtilities, theme }) {
			const newUtilities = {
				'.underline-custom': {
					position: 'relative',
					display: 'inline-block',
				},
				'.underline-custom::after': {
					content: '""',
					position: 'absolute',
					left: 0,
					bottom: '-2px',
					width: '0%',
					height: '1px',
					backgroundColor: theme('colors.main'),
					transition: 'width 0.3s ease',
				},
				'.underline-custom:hover::after': {
					width: '100%',
				},
				// Luxury utilities
				'.luxury-shadow': {
					boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
				},
				'.luxury-shadow-lg': {
					boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
				},
				'.luxury-border': {
					border: '1px solid rgba(0, 0, 0, 0.08)',
				},
				'.gold-gradient': {
					background:
						'linear-gradient(135deg, #D4AF37 0%, #F5E6C8 50%, #D4AF37 100%)',
				},
				'.text-gradient-gold': {
					background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
					'-webkit-background-clip': 'text',
					'-webkit-text-fill-color': 'transparent',
					'background-clip': 'text',
				},
			};

			addUtilities(newUtilities, ['responsive', 'hover']);
		},
	],
};
