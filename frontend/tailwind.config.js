export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        earth: {
          50:  '#faf8f5',
          100: '#f0ebe2',
          200: '#ddd0bb',
          300: '#c8b49a',
          400: '#b09070',
          500: '#8B6914',
          600: '#6b4f10',
          700: '#4a360a',
        },
        forest: {
          50:  '#f0f7f0',
          100: '#dceddc',
          200: '#b8dbb8',
          300: '#7dbc7d',
          400: '#4a9e4a',
          500: '#2d7a2d',
          600: '#1e5c1e',
          700: '#143d14',
          800: '#0d280d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}