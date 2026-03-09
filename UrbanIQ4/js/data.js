const CITY_DATA = {
  "Mumbai": {
    state: "Maharashtra",
    tagline: "Financial Capital of India",
    img: "https://images.unsplash.com/photo-1526481280691-906f6b0c4b8a?w=800&q=80",
    hdi: 0.77,
    aqi: 110,
    aqiLabel: "Moderate",
    income: "₹62,000",
    rent: "₹25,000–45,000",
    transport: "Mumbai Local Trains, Mumbai Metro, BEST buses",
    infrastructure: "Strong financial district, metro expansion, coastal road",
    itSector: "Fintech, startups, large corporate offices",
    futureGrowth: "Navi Mumbai Airport, metro extensions",
    culture: "Bollywood, multicultural neighborhoods, coastal lifestyle",
    housingUrl: "https://housing.com/in/buy/mumbai",
    eduUrl: "https://www.shiksha.com/b-tech/colleges/b-tech-colleges-mumbai",
    wiki: "https://en.wikipedia.org/wiki/Mumbai",
    profile: {
      student: ["Top colleges: IITB (nearby), SNDT, NMIMS (various streams)"],
      professional: ["Strong finance & startup jobs", "High earning potential"],
      family: ["Good healthcare & schooling options", "High cost of living"]
    },
    cat: {
      housing: ["High rent in South/central Mumbai", "Affordable outskirts (Navi Mumbai)"],
      education: ["Strong higher education & coaching centers"],
      aqi: ["Seasonal pollution spikes during winter"]
    }
  },

  "Bengaluru": {
    state: "Karnataka",
    tagline: "Silicon Valley of India",
    img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
    hdi: 0.82,
    aqi: 78,
    aqiLabel: "Satisfactory",
    income: "₹68,000",
    rent: "₹18,000–35,000",
    transport: "Namma Metro, BMTC buses, suburban rail (expanding)",
    infrastructure: "IT parks, international airport, metro expansion",
    itSector: "Major IT hub: Infosys, Wipro, many startups",
    futureGrowth: "Startup expansion, innovation clusters",
    culture: "Garden city, diverse tech workforce, café culture",
    housingUrl: "https://housing.com/in/buy/bengaluru",
    eduUrl: "https://www.shiksha.com/b-tech/colleges/b-tech-colleges-bangalore",
    wiki: "https://en.wikipedia.org/wiki/Bangalore",
    profile: {
      student: ["Great for IT courses & engineering colleges"],
      professional: ["Top jobs in IT & startups", "Strong salary bands"],
      family: ["Good lifestyle, schooling options in suburbs"]
    },
    cat: {
      housing: ["Expensive near IT corridors, cheaper further out"],
      education: ["Excellent engineering & research institutes"],
      aqi: ["Improves outside burning seasons"]
    }
  },

  "Delhi NCR": {
    state: "Delhi",
    tagline: "Political Capital",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    hdi: 0.80,
    aqi: 160,
    aqiLabel: "Poor",
    income: "₹65,000",
    rent: "₹20,000–40,000",
    transport: "Delhi Metro, DTC/cluster buses, Rapid Rail connectivity",
    infrastructure: "Extensive metro, national highways, business districts (Gurgaon/Noida)",
    itSector: "Large corporate offices, growing IT parks in Gurgaon/Noida",
    futureGrowth: "Jewar Airport (Noida), smart city projects",
    culture: "Historic monuments, rich culinary traditions",
    housingUrl: "https://housing.com/in/buy/delhi",
    eduUrl: "https://www.shiksha.com/b-tech/colleges/b-tech-colleges-delhi",
    wiki: "https://en.wikipedia.org/wiki/Delhi",
    profile: {
      student: ["Many central universities & colleges"],
      professional: ["Wide corporate opportunities", "Higher living costs in central areas"],
      family: ["Large healthcare network, schooling variety"]
    },
    cat: {
      housing: ["Wide range: luxury in South Delhi, affordable in outskirts"],
      education: ["Top universities & coaching centers"],
      aqi: ["High seasonal pollution; mitigation ongoing"]
    }
  },

  "Hyderabad": {
    state: "Telangana",
    tagline: "City of Pearls",
    img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
    hdi: 0.79,
    aqi: 90,
    aqiLabel: "Moderate",
    income: "₹60,000",
    rent: "₹15,000–30,000",
    transport: "Hyderabad Metro, TSRTC buses, strong road network",
    infrastructure: "HITEC City, ORR, modern airport",
    itSector: "Microsoft, Google, Amazon presence; pharma clusters",
    futureGrowth: "AI/pharma/biotech expansions",
    culture: "Historic monuments, Hyderabadi cuisine",
    housingUrl: "https://housing.com/in/buy/hyderabad",
    eduUrl: "https://www.shiksha.com/b-tech/colleges/b-tech-colleges-hyderabad",
    wiki: "https://en.wikipedia.org/wiki/Hyderabad,_India",
    profile: {
      student: ["Good engineering & medical colleges"],
      professional: ["Rapidly growing tech & pharma jobs"],
      family: ["Balanced cost of living & amenities"]
    },
    cat: {
      housing: ["Affordable compared to metro peers"],
      education: ["Growing number of quality institutes"],
      aqi: ["Moderate AQI most of the year"]
    }
  },

  "Chennai": {
    state: "Tamil Nadu",
    tagline: "Detroit of India",
    img: "https://images.unsplash.com/photo-1588412079929-790b9f593d8e?w=800&q=80",
    hdi: 0.78,
    aqi: 85,
    aqiLabel: "Moderate",
    income: "₹59,000",
    rent: "₹15,000–28,000",
    transport: "Chennai Metro, suburban rail, buses",
    infrastructure: "Large manufacturing & auto clusters, port",
    itSector: "IT corridor in OMR, rising tech presence",
    futureGrowth: "Industrial corridor & port expansions",
    culture: "Classical arts, Carnatic music, strong traditions",
    housingUrl: "https://housing.com/in/buy/chennai",
    eduUrl: "https://www.shiksha.com/b-tech/colleges/b-tech-colleges-chennai",
    wiki: "https://en.wikipedia.org/wiki/Chennai",
    profile: {
      student: ["Good technical & medical colleges"],
      professional: ["Strong manufacturing & IT roles"],
      family: ["Stable neighborhoods & cultural amenities"]
    },
    cat: {
      housing: ["Moderate rents; good suburban options"],
      education: ["High-quality professional colleges"],
      aqi: ["Generally moderate"]
    }
  },

  "Kolkata": {
    state: "West Bengal",
    tagline: "Cultural Capital of India",
    img: "https://images.unsplash.com/photo-1558431382-27e303142255?w=800&q=80",
    hdi: 0.76,
    aqi: 120,
    aqiLabel: "Moderate",
    income: "₹52,000",
    rent: "₹12,000–25,000",
    transport: "Kolkata Metro, trams, buses",
    infrastructure: "Historic layout with improving metros & IT areas",
    itSector: "Salt Lake & New Town emerging IT hubs",
    futureGrowth: "Smart city initiatives and metro expansion",
    culture: "Literary heritage, Durga Puja, strong arts scene",
    housingUrl: "https://housing.com/in/buy/kolkata",
    eduUrl: "https://www.shiksha.com/b-tech/colleges/b-tech-colleges-kolkata",
    wiki: "https://en.wikipedia.org/wiki/Kolkata",
    profile: {
      student: ["Excellent arts & science colleges"],
      professional: ["Growing service & IT sectors"],
      family: ["Cultural city with lower cost of living"]
    },
    cat: {
      housing: ["Affordable central zones and outskirts"],
      education: ["Long-standing universities & colleges"],
      aqi: ["Moderate with seasonal variations"]
    }
  },

  "Pune": {
    state: "Maharashtra",
    tagline: "Oxford of the East",
    img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80",
    hdi: 0.81,
    aqi: 75,
    aqiLabel: "Good",
    income: "₹61,000",
    rent: "₹16,000–30,000",
    transport: "Pune Metro (under implementation), PMPML buses",
    infrastructure: "Education hub, IT parks in Hinjewadi",
    itSector: "Strong startups & IT presence",
    futureGrowth: "Metro expansion, smart city projects",
    culture: "Student-centric city with Marathi heritage",
    housingUrl: "https://housing.com/in/buy/pune",
    eduUrl: "https://www.shiksha.com/b-tech/colleges/b-tech-colleges-pune",
    wiki: "https://en.wikipedia.org/wiki/Pune",
    profile: {
      student: ["Large student population & reputable colleges"],
      professional: ["Good IT jobs & moderate living costs"],
      family: ["Safe residential sectors & schooling options"]
    },
    cat: {
      housing: ["Affordable suburbs, expensive near IT hubs"],
      education: ["Many universities and colleges"],
      aqi: ["Generally good"]
    }
  }
};