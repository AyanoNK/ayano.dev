/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ["class", "class"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
  		},
  		colors: {
  			darkpurple: '#28305f',
  			lightpurple: '#17244a',
  			marine: '#eeb674',
  			lightblue: '#ffe6d6',
  			whiter: '#e1e1ea',
  			main: {
  				DEFAULT: 'var(--main)',
  				foreground: 'var(--main-foreground)'
  			},
  			'secondary-background': 'var(--secondary-background)',
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			card: {
  				DEFAULT: 'var(--card)',
  				foreground: 'var(--card-foreground)'
  			},
  			popover: {
  				DEFAULT: 'var(--popover)',
  				foreground: 'var(--popover-foreground)'
  			},
  			primary: {
  				DEFAULT: 'var(--primary)',
  				foreground: 'var(--primary-foreground)'
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)'
  			},
  			muted: {
  				DEFAULT: 'var(--muted)',
  				foreground: 'var(--muted-foreground)'
  			},
  			accent: {
  				DEFAULT: 'var(--accent)',
  				foreground: 'var(--accent-foreground)'
  			},
  			destructive: {
  				DEFAULT: 'var(--destructive)',
  				foreground: 'var(--destructive-foreground)'
  			},
  			border: 'var(--border)',
  			input: 'var(--input)',
  			ring: 'var(--ring)',
  			chart: {
  				'1': 'var(--chart-1)',
  				'2': 'var(--chart-2)',
  				'3': 'var(--chart-3)',
  				'4': 'var(--chart-4)',
  				'5': 'var(--chart-5)'
  			}
  		},
  		keyframes: {
  			rainbow: {
  				'12.5%': {
  					backgroundColor: '#FF0000'
  				},
  				'25%': {
  					backgroundColor: '#FFA500'
  				},
  				'37.5%': {
  					backgroundColor: '#FFFF00'
  				},
  				'50%': {
  					backgroundColor: '#7FFF00'
  				},
  				'62.5%': {
  					backgroundColor: '#00FFFF'
  				},
  				'75%': {
  					backgroundColor: '#0000FF'
  				},
  				'87.5%': {
  					backgroundColor: '#9932CC'
  				},
  				'100%': {
  					backgroundColor: '#FF1493'
  				}
  			}
  		},
  		animation: {
  			rainbow: 'rainbow 20s ease-in-out infinite'
  		},
  		borderRadius: {
  			base: '8px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontWeight: {
  			base: '500',
  			heading: '700'
  		},
  		boxShadow: {
  			shadow: '4px 4px 0px 0px rgba(0,0,0,1)'
  		},
  		translate: {
  			boxShadowX: '4px',
  			boxShadowY: '4px',
  			reverseBoxShadowX: '-4px',
  			reverseBoxShadowY: '-4px'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
