module.exports = {

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['30px', '43px'],
    },
    screens:{
      sm:'480px',
      md:'768px',
      lg:'976px',
      xl:'1440px'
    },
    extend: {
      colors:{
        "primary":"#A500DE",
        "secondary":"#4A0263",
        "secondary-2":"#2D2D2D",
        "sec-primary":"#3E3E3E",
        "white":"#FFFFFF"
      },
      fontFamily:{
        'poppins': ['Poppins','sans-serif']
      },
    },
  },
  plugins: [],
}
