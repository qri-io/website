const {
  borderRadius,
  boxShadow,
  fontFamily,
  fontSize
} = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': { maxHeight: 0 },
          '99%': { maxHeight: 1000 },
          '100%': { maxHeight: 'none' }
        }
      },
      colors: {
        qripink: {
          100: '#FFD9E5',
          200: '#FBB8C9',
          300: '#F796AD',
          400: '#F47592',
          500: '#F05376',
          DEFAULT: '#F05376',
          600: '#EC325A',
          700: '#C72C4E',
          800: '#A32642',
          900: '#7E1F36',
          1000: '#59192A'
        },
        qriorange: {
          100: '#FFDABB',
          200: '#FBC799',
          300: '#F7B577',
          400: '#F4A254',
          500: '#F09032',
          DEFAULT: '#F09032',
          600: '#EC7D10',
          700: '#D27010',
          800: '#B86210',
          900: '#9E5510',
          1000: '#844710'
        },
        qrigreen: {
          100: '#F1FFC5',
          200: '#E2F4AF',
          300: '#D3E999',
          400: '#C5DF83',
          500: '#B6D46D',
          DEFAULT: '#B6D46D',
          600: '#A7C957',
          700: '#93B14C',
          800: '#7F9941',
          900: '#6B8035',
          1000: '#57682A'
        },
        qritile: {
          100: '#CAFFFB',
          200: '#A8ECE9',
          300: '#86D9D7',
          400: '#65C6C4',
          500: '#43B3B2',
          DEFAULT: '#43B3B2',
          600: '#21A0A0',
          700: '#1D8C8B',
          800: '#1A7877',
          900: '#166362',
          1000: '#124F4D'
        },
        qrinavy: {
          100: '#92C3EA',
          200: '#80ADD2',
          300: '#6E96BA',
          400: '#5C80A2',
          500: '#4A6A89',
          DEFAULT: '#4A6A89',
          600: '#385371',
          700: '#263D59',
          800: '#1D3045',
          900: '#142232',
          1000: '#0B151E'
        },
        qrigray: {
          100: '#EFF3F5',
          200: '#D5DADD',
          300: '#BBC2C5',
          400: '#A2A9AE',
          500: '#889096',
          DEFAULT: '#889096',
          600: '#6E787E',
          700: '#545F66',
          800: '#444D53',
          900: '#343C40',
          1000: '#242A2D'
        },
        qrisand: {
          100: '#FFFAE3',
          200: '#EDE8CF',
          300: '#DCD6BA',
          400: '#CAC3A6',
          500: '#B8B191',
          DEFAULT: '#B8B191',
          600: '#A79F7D',
          700: '#958D68',
          800: '#837A54',
          900: '#72683F',
          1000: '#60562B'
        },
        qridarkgreen: {
          100: '#82DBA6',
          200: '#72C393',
          300: '#62AC80',
          400: '#52946D',
          500: '#417D5A',
          DEFAULT: '#417D5A',
          600: '#316647',
          700: '#214E34',
          800: '#1A402A',
          900: '#13311F',
          1000: '#0C2315'
        },
        warningyellow: {
          500: '#F2D925',
          DEFAULT: '#F2D925',
          600: '#DAC325'
        },
        dangerred: {
          500: '#B91C1C',
          DEFAULT: '#B91C1C',
          600: '#991B1B'
        },
        black: {
          DEFAULT: '#000000'
        }
      },
      fontFamily: {
        ...fontFamily,
        mono: ['CourierPrime', 'monospace']
      },
      boxShadow: {
        ...boxShadow,
        even: '0px 0px 5px rgba(0, 0, 0, 0.1)'
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        appear: 'appear 0.8s ease-in-out',
        disappear: 'appear 0.8s ease-in-out reverse'
      },
      borderRadius: {
        ...borderRadius,
        md: '4.5px',
        lg: '6px',
        xl: '8px',
        '2xl': '10px'
      },
      fontSize: {
        ...fontSize,
        xs: '10px',
        sm: '12px',
        DEFAULT: '14px',
        base: '14px',
        lg: '16px',
        xl: '18px',
        '2xl': '20px',
        '3xl': '30px',
        '4xl': ['40px', {
          lineHeight: '2.75rem'
        }],
        '5xl': ['48px', {
          lineHeight: '2.9rem'
        }],
        '6xl': ['56px', {
          lineHeight: '3.9rem'
        }],
        '7xl': '64px',
        '8xl': '72px',
        '9xl': '80px'
      }
    }
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
      cursor: ['hover'],
      borderWidth: ['last'],
      margin: ['last'],
      padding: ['first', 'last']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp')
  ]
}
