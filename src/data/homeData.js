/**
 * Centralized BOO Automotive Data Structure (API-Ready Architecture)
 * In production, these data objects can be fetched via endpoints:
 * GET /api/settings
 * GET /api/slides
 * GET /api/services
 * GET /api/cars
 * GET /api/parts
 * GET /api/maintenance
 */

export const BRAND_CONFIG = {
  name: "BOO",
  fullName: "BOO Automotive",
  tagline: "Integrated Automotive Solutions",
  logoUrl: "https://i.ibb.co/JjhvXRfD/IMG-20260906-WA0161.jpg",
  contact: {
    address: "19 El-Galaa El-Bahary Street, Shebin El-Kom, Menoufia",
    addressUrl: "https://maps.google.com/?q=19+El-Galaa+El-Bahary+Street,+Shebin+El-Kom,+Menoufia",
    phones: [
      { display: "01122559066", raw: "01122559066" },
      { display: "01141801505", raw: "01141801505" },
      { display: "01102624105", raw: "01102624105" }
    ],
    primaryPhone: "01122559066",
    emailPlaceholder: "info@booautomotive.com",
    workingHours: "Saturday - Thursday: 9:00 AM - 10:00 PM | Friday: 1:00 PM - 10:00 PM",
    socials: {
      whatsapp: "https://wa.me/201122559066",
      facebook: "#",
      instagram: "#",
      email: "mailto:info@booautomotive.com"
    }
  }
};

export const HERO_SLIDES = [
  {
    id: 1,
    title: "Import Your Dream Car",
    description: "Reliable vehicle sourcing and professional car import services tailored to your exact specifications and budget.",
    ctaText: "Explore Cars",
    ctaLink: "/cars",
    secondaryCtaText: "Import Consultation",
    secondaryCtaLink: "/contact?type=import",
    badge: "Global Sourcing & Import",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=85"
  },
  {
    id: 2,
    title: "Find Your Next Car",
    description: "Quality vehicles selected to match your needs and budget, thoroughly inspected with certified guarantee.",
    ctaText: "View Cars",
    ctaLink: "/cars",
    secondaryCtaText: "Check Inventory",
    secondaryCtaLink: "/cars",
    badge: "Certified Vehicle Sales",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85"
  },
  {
    id: 3,
    title: "Genuine Spare Parts",
    description: "Reliable automotive parts and OEM accessories engineered for maximum performance, safety and durability.",
    ctaText: "Explore Parts",
    ctaLink: "/spare-parts",
    secondaryCtaText: "Order by Part Number",
    secondaryCtaLink: "/spare-parts#inquiry",
    badge: "Original OEM & Aftermarket",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=2000&q=85"
  },
  {
    id: 4,
    title: "Professional Car Maintenance",
    description: "Keep your vehicle performing at its best with our professional maintenance services, certified technicians and advanced diagnostic tools.",
    ctaText: "Book a Service",
    ctaLink: "/maintenance",
    secondaryCtaText: "Our Services",
    secondaryCtaLink: "/maintenance",
    badge: "Expert Service Center",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=2000&q=85"
  }
];

export const SERVICES_LIST = [
  {
    id: "car-import",
    title: "Car Import",
    description: "Professional vehicle sourcing and seamless direct import from global markets with full customs handling and doorstep delivery.",
    icon: "Ship",
    link: "/cars?filter=import",
    features: ["Custom order specifications", "Complete customs clearance", "Thorough pre-purchase inspection"]
  },
  {
    id: "car-sales",
    title: "Car Sales",
    description: "Quality vehicles for different needs and budgets, meticulously inspected with multi-point technical assessment.",
    icon: "Car",
    link: "/cars",
    features: ["Certified pre-owned & new", "Transparent history reports", "Trade-in & financing support"]
  },
  {
    id: "spare-parts",
    title: "Spare Parts",
    description: "Reliable automotive parts and accessories with guaranteed compatibility and fast delivery across Egypt.",
    icon: "Cog",
    link: "/spare-parts",
    features: ["100% Genuine OEM parts", "High-grade performance parts", "VIN code matching service"]
  },
  {
    id: "maintenance",
    title: "Maintenance",
    description: "Professional maintenance and repair backed by state-of-the-art diagnostic equipment and experienced engineers.",
    icon: "Wrench",
    link: "/maintenance",
    features: ["Computer diagnostics", "Scheduled warranty service", "Engine & transmission overhaul"]
  }
];

export const ABOUT_DATA = {
  label: "ABOUT BOO",
  heading: "Your Trusted Automotive Partner",
  description: "BOO provides integrated automotive solutions including car import, vehicle sales, spare parts and professional maintenance. Founded on principles of precision, transparency, and technical excellence, we serve drivers and fleet owners across Egypt with comprehensive automotive care under one roof.",
  secondaryText: "From selecting your dream vehicle from international auctions to providing genuine components and maintaining peak road performance, BOO is your single reliable destination for all motoring requirements.",
  trustIndicators: [
    {
      id: "quality",
      title: "Quality",
      description: "Rigorous standards for every vehicle and spare part we supply."
    },
    {
      id: "reliability",
      title: "Reliability",
      description: "Proven track record with transparent guarantees and dependable delivery."
    },
    {
      id: "service",
      title: "Professional Service",
      description: "Certified automotive engineers and dedicated customer support advisors."
    }
  ],
  stats: [
    { value: "100%", label: "Inspection Guarantee" },
    { value: "5,000+", label: "Genuine Parts Catalog" },
    { value: "10+", label: "Years Automotive Experience" },
    { value: "24/7", label: "Customer Assistance" }
  ],
  image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80"
};

export const FEATURED_CARS = [
  {
    id: "car-1",
    brand: "Mercedes-Benz",
    model: "C-Class C200 AMG Line",
    year: 2024,
    mileage: "Zero km",
    price: "EGP 3,850,000",
    rawPrice: 3850000,
    bodyType: "Sedan",
    fuel: "Mild Hybrid",
    transmission: "Automatic 9G-Tronic",
    engine: "1.5L Turbo 204 HP",
    status: "Available",
    featured: true,
    image: "/images/cars/mercedes-c200.jpg",
    tags: ["Import Ready", "Brand New", "Full Option"]
  },
  {
    id: "car-2",
    brand: "BMW",
    model: "420i Gran Coupé M Sport",
    year: 2023,
    mileage: "14,500 km",
    price: "EGP 3,450,000",
    rawPrice: 3450000,
    bodyType: "Coupé",
    fuel: "Petrol",
    transmission: "Steptronic 8-Speed",
    engine: "2.0L TwinPower 184 HP",
    status: "Available",
    featured: true,
    image: "/images/cars/bmw-420i.jpg",
    tags: ["Certified Pre-Owned", "M Sport Package"]
  },
  {
    id: "car-3",
    brand: "Porsche",
    model: "Macan GTS",
    year: 2024,
    mileage: "Zero km",
    price: "EGP 6,200,000",
    rawPrice: 6200000,
    bodyType: "SUV",
    fuel: "Petrol",
    transmission: "PDK 7-Speed",
    engine: "2.9L V6 Twin-Turbo 440 HP",
    status: "Available",
    featured: true,
    image: "/images/cars/porsche-macan-gts.jpg",
    tags: ["Custom Order", "Brand New", "GTS Spec"]
  },
  {
    id: "car-4",
    brand: "Audi",
    model: "A6 S-Line Quattro",
    year: 2023,
    mileage: "18,000 km",
    price: "EGP 3,100,000",
    rawPrice: 3100000,
    bodyType: "Sedan",
    fuel: "Mild Hybrid",
    transmission: "S tronic 7-Speed",
    engine: "2.0L TFSI 245 HP",
    status: "Available",
    featured: true,
    image: "/images/cars/audi-a6-sline.jpg",
    tags: ["Quattro AWD", "Agency Maintained"]
  },
  {
    id: "car-5",
    brand: "Volkswagen",
    model: "Tiguan R-Line",
    year: 2024,
    mileage: "Zero km",
    price: "EGP 2,750,000",
    rawPrice: 2750000,
    bodyType: "SUV",
    fuel: "Petrol",
    transmission: "DSG 7-Speed",
    engine: "1.4L TSI 150 HP",
    status: "Available",
    featured: true,
    image: "/images/cars/vw-tiguan-rline.jpg",
    tags: ["Brand New", "Panoramic Roof"]
  },
  {
    id: "car-6",
    brand: "Range Rover",
    model: "Velar R-Dynamic SE",
    year: 2023,
    mileage: "22,000 km",
    price: "EGP 4,600,000",
    rawPrice: 4600000,
    bodyType: "SUV",
    fuel: "Petrol",
    transmission: "Automatic 8-Speed",
    engine: "2.0L Turbocharged 250 HP",
    status: "Available",
    featured: true,
    image: "/images/cars/range-rover-velar.jpg",
    tags: ["Luxury Spec", "Full Warranty"]
  }
];

export const SPARE_PARTS_CATEGORIES = [
  { id: "all", name: "All Categories", count: "5000+" },
  { id: "engine", name: "Engine Parts", count: "1250+", icon: "Cpu" },
  { id: "brake", name: "Brake Parts", count: "820+", icon: "Disc" },
  { id: "suspension", name: "Suspension", count: "640+", icon: "Sliders" },
  { id: "electrical", name: "Electrical", count: "950+", icon: "Zap" },
  { id: "filters", name: "Filters", count: "480+", icon: "Filter" },
  { id: "accessories", name: "Accessories", count: "890+", icon: "Sparkles" }
];

export const SAMPLE_PARTS = [
  {
    id: "part-1",
    name: "Ceramic High-Performance Brake Pad Set",
    category: "brake",
    brand: "Brembo / OEM",
    compatibility: "Mercedes, BMW, Audi",
    code: "BP-99824",
    price: "EGP 4,200",
    inStock: true,
    image: "/images/products/brembo-ceramic-pads.jpg"
  },
  {
    id: "part-2",
    name: "Turbocharger Core Assembly & Actuator",
    category: "engine",
    brand: "Garrett / BorgWarner",
    compatibility: "BMW TwinPower 2.0L / VAG 2.0 TFSI",
    code: "TB-44102",
    price: "EGP 28,500",
    inStock: true,
    image: "/images/products/garrett-turbocharger.jpg"
  },
  {
    id: "part-3",
    name: "Adaptive Air Suspension Strut Assembly",
    category: "suspension",
    brand: "Bilstein B4 / OEM",
    compatibility: "Porsche Macan, Audi Q5",
    code: "SUS-88210",
    price: "EGP 19,800",
    inStock: true,
    image: "/images/products/bilstein-suspension.jpg"
  },
  {
    id: "part-4",
    name: "Intelligent Alternator & Voltage Regulator",
    category: "electrical",
    brand: "Bosch Original",
    compatibility: "Mercedes C-Class, E-Class",
    code: "EL-55420",
    price: "EGP 11,300",
    inStock: true,
    image: "/images/products/bosch-alternator.jpg"
  },
  {
    id: "part-5",
    name: "Carbon Cabin & Engine Air Filter Kit",
    category: "filters",
    brand: "Mann-Filter",
    compatibility: "Universal German Models",
    code: "FL-12009",
    price: "EGP 1,850",
    inStock: true,
    image: "/images/products/mann-filter-air.jpg"
  },
  {
    id: "part-6",
    name: "Aerodynamic Mirror Caps & Styling Trim",
    category: "accessories",
    brand: "M Performance Style",
    compatibility: "BMW G20 / G22 / G30",
    code: "AC-33019",
    price: "EGP 3,600",
    inStock: true,
    image: "/images/products/bmw-m-carbon-mirror.jpg"
  }
];

export const MAINTENANCE_SERVICES = [
  {
    id: "periodic",
    title: "Periodic Maintenance",
    description: "Scheduled servicing including engine oil, certified multi-point safety inspection, filter replacement, and fluid checks according to manufacturer guidelines.",
    icon: "CalendarCheck",
    duration: "1 - 2 Hours",
    checklist: ["Synthetic oil & OEM filter", "Brake & tyre depth assessment", "Battery health & charging test", "Suspension & undercarriage inspection"]
  },
  {
    id: "engine",
    title: "Engine Service",
    description: "Comprehensive engine diagnostics, spark plug replacement, fuel injection cleaning, timing belt/chain adjustment, and performance optimization.",
    icon: "Gauge",
    duration: "2 - 4 Hours",
    checklist: ["Compression & cylinder test", "Fuel delivery & injector service", "Spark ignition tuning", "Cooling system pressure test"]
  },
  {
    id: "brake",
    title: "Brake Service",
    description: "Disc rotor inspection, pad replacement, hydraulic brake fluid flushing, ABS sensor calibration, and electronic parking brake reset.",
    icon: "ShieldAlert",
    duration: "1 - 2 Hours",
    checklist: ["Brake pad & rotor resurfacing/replacement", "DOT 4 / 5.1 fluid bleeding", "Caliper guide pin lubrication", "ABS system electronic test"]
  },
  {
    id: "electrical",
    title: "Electrical Diagnostics",
    description: "OEM-level computer diagnostic scan, ECU programming, sensor fault resolution, wire harness inspection, and electronic module calibration.",
    icon: "Zap",
    duration: "1 - 3 Hours",
    checklist: ["Full OBD-II computerized scan", "Module fault code clearing", "Battery & alternator load testing", "CAN-bus electrical troubleshooting"]
  },
  {
    id: "ac",
    title: "AC Service",
    description: "Automotive climate control system recharge with certified R134a/R1234yf refrigerant, leak testing, cabin disinfection, and evaporator cleansing.",
    icon: "Wind",
    duration: "1 - 2 Hours",
    checklist: ["Refrigerant evacuation & refill", "UV dye leak inspection", "Cabin pollen filter replacement", "Antibacterial duct sterilization"]
  },
  {
    id: "general",
    title: "General Repair",
    description: "Transmission overhaul, steering and suspension rebuilding, exhaust system repair, and advanced mechanical troubleshooting.",
    icon: "Wrench",
    duration: "Varies by scope",
    checklist: ["Transmission fluid & filter service", "Shock absorber & bushing replacement", "Wheel alignment & balancing", "Pre-travel full road inspection"]
  }
];

export const WHY_CHOOSE_BOO = [
  {
    id: "trusted-quality",
    title: "Trusted Quality",
    description: "Reliable automotive products and services backed by thorough technical verification and genuine parts guarantee.",
    icon: "Award"
  },
  {
    id: "professional-team",
    title: "Professional Team",
    description: "Experienced automotive engineers and certified technicians with extensive modern vehicle expertise.",
    icon: "Users"
  },
  {
    id: "complete-solutions",
    title: "Complete Automotive Solutions",
    description: "Cars, spare parts and maintenance under one company, ensuring a unified and effortless ownership experience.",
    icon: "Layers"
  },
  {
    id: "customer-first",
    title: "Customer First",
    description: "Focused on customer satisfaction, transparent pricing, and long-term relationships founded on trust.",
    icon: "HeartHandshake"
  }
];

export const CTA_CONTENT = {
  heading: "Looking for the Right Automotive Solution?",
  description: "Whether you need a car, spare parts or professional maintenance, BOO is ready to help.",
  buttons: {
    primary: { text: "Contact Us", link: "/contact" },
    secondary: { text: "Explore Services", link: "/#services" }
  }
};
