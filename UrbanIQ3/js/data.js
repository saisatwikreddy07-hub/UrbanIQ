// CITY_DATA — exact data object extracted from your sample file
const CITY_DATA = {
  'Mumbai': {
    state:'Maharashtra', tagline:'Financial Capital',
    img:'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=180&q=80',
    hdi:0.77, aqi:110, aqiLabel:'Moderate', rent:'₹25,000–45,000/mo', income:'₹62,000/mo',
    housing:'Low Affordability', livability:7.2, transit:8.8, jobs:9.3, education:9.2, healthcare:8.7,
    housingUrl:'https://housing.com/in/buy/mumbai', eduUrl:'https://www.shiksha.com/b-tech/colleges/b-tech-colleges-mumbai',
    profile:{ student:[/*...*/], professional:[/*...*/], family:[/*...*/] },
    cat:{ housing:[/*...*/], education:[/*...*/], aqi:[/*...*/], employment:[/*...*/] }
  },
  'Bengaluru': {
    state:'Karnataka', tagline:'Silicon Valley of India',
    img:'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=180&q=80',
    hdi:0.82, aqi:78, aqiLabel:'Satisfactory', rent:'₹18,000–35,000/mo', income:'₹68,000/mo',
    housing:'Mid Affordability', livability:7.8, transit:7.2, jobs:9.5, education:8.5, healthcare:8.0,
    housingUrl:'https://housing.com/in/buy/bengaluru', eduUrl:'https://www.shiksha.com/b-tech/colleges/b-tech-colleges-bangalore',
    profile:{ student:[/*...*/], professional:[/*...*/], family:[/*...*/] },
    cat:{ housing:[/*...*/], education:[/*...*/], aqi:[/*...*/], employment:[/*...*/] }
  },
  // add the rest (Delhi NCR, Hyderabad, Chennai, Kolkata, Pune) — use exact entries from your sample file
  // For brevity here: copy remaining city objects from your uploaded sample into this file.
};