/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./*.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0891b2',
          600: '#0e7490',
          700: '#0c5f6b',
          800: '#155e75',
          900: '#164e63',
        },
        coral: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#dc2626',
          600: '#b91c1c',
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#6f1a1a',
        },
        mint: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#059669',
          600: '#047857',
          700: '#065f46',
          800: '#064e3b',
          900: '#052e16',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'serif': ['Playfair Display', 'ui-serif', 'Georgia'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(8, 145, 178, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(8, 145, 178, 0.8)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        'aurora': 'linear-gradient(45deg, #00c9ff 0%, #92fe9d 100%)'
      },
      backdropBlur: {
        xs: '2px'
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    function({ addUtilities }) {
      const newUtilities = {
        '.transform-style-3d': {
          'transform-style': 'preserve-3d'
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden'
        },
        '.perspective-1000': {
          'perspective': '1000px'
        },
        '.perspective-1500': {
          'perspective': '1500px'
        },
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.25)',
          'backdrop-filter': 'blur(20px) saturate(180%)',
          'border': '1px solid rgba(255, 255, 255, 0.18)',
          'border-radius': '20px'
        },
        '.glass-dark': {
          'background': 'rgba(0, 0, 0, 0.25)',
          'backdrop-filter': 'blur(20px) saturate(180%)',
          'border': '1px solid rgba(255, 255, 255, 0.18)',
          'border-radius': '20px'
        }
      }
      addUtilities(newUtilities)
    }
  ],
}
