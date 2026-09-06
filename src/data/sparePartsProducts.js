/**
 * BOO Automotive Spare Parts Catalog Dataset
 * Structured to map 1:1 with REST API responses:
 * GET /api/products
 * GET /api/products/:id
 */

export const SPARE_PARTS_CATEGORIES = [
  { id: 'all', name: 'All Categories', count: 18 },
  { id: 'engine', name: 'Engine Parts', count: 4, icon: 'Cpu' },
  { id: 'brake', name: 'Brake Parts', count: 4, icon: 'Disc' },
  { id: 'suspension', name: 'Suspension', count: 3, icon: 'Sliders' },
  { id: 'electrical', name: 'Electrical', count: 3, icon: 'Zap' },
  { id: 'filters', name: 'Filters', count: 2, icon: 'Filter' },
  { id: 'accessories', name: 'Accessories', count: 2, icon: 'Sparkles' }
];

export const SPARE_PARTS_CATALOG = [
  {
    id: 'sp-1',
    sku: 'BP-TC-001',
    name: 'Front Ceramic Brake Pad Set',
    category: 'brake',
    categoryName: 'Brake Parts',
    brand: 'Toyota Genuine / OEM',
    model: 'Corolla / Camry',
    price: 1500,
    formattedPrice: '1,500 EGP',
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    stockCount: 14,
    shortDescription: 'Original OEM ceramic front brake pads engineered for quiet stopping, low dust, and exceptional braking distance.',
    description: 'Manufactured to strict OEM tolerances, these front ceramic brake pads provide superior heat dissipation and immediate pedal response under extreme Egyptian summer temperatures. Backed by BOO quality warranty.',
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=900&q=80'
    ],
    specs: [
      { key: 'Brand', value: 'Toyota OEM' },
      { key: 'Position', value: 'Front Axle' },
      { key: 'Material', value: 'Low-Metallic Ceramic' },
      { key: 'SKU / Part No', value: 'BP-TC-001' },
      { key: 'Weight', value: '1.65 kg' },
      { key: 'Country of Origin', value: 'Japan' },
      { key: 'Warranty', value: '12 Months / 20,000 km' }
    ],
    compatibility: [
      'Toyota Corolla (2018–2024)',
      'Toyota Camry 2.5L (2019–2023)',
      'Toyota Yaris Sedan (2020–2023)'
    ]
  },
  {
    id: 'sp-2',
    sku: 'TB-MB-002',
    name: 'Turbocharger Core & Actuator Assembly',
    category: 'engine',
    categoryName: 'Engine Parts',
    brand: 'Garrett / Mercedes-Benz OEM',
    model: 'C-Class / E-Class 2.0L',
    price: 28500,
    formattedPrice: '28,500 EGP',
    rating: 5.0,
    reviewsCount: 19,
    inStock: true,
    stockCount: 5,
    shortDescription: 'High-precision OEM turbocharger cartridge with electronic wastegate actuator for M274 / M264 engines.',
    description: 'Original Garrett high-performance turbocharger core assembly. Direct bolt-on replacement restoring peak boost pressure, responsiveness, and fuel efficiency with zero boost lag.',
    images: [
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=900&q=80'
    ],
    specs: [
      { key: 'Manufacturer', value: 'Garrett OEM' },
      { key: 'Engine Code', value: 'M274 / M264 2.0L Turbo' },
      { key: 'Actuator', value: 'Electronic VNT' },
      { key: 'SKU / Part No', value: 'TB-MB-002' },
      { key: 'Country of Origin', value: 'Germany' },
      { key: 'Warranty', value: '12 Months BOO Warranty' }
    ],
    compatibility: [
      'Mercedes-Benz C200 / C300 W205 (2015–2021)',
      'Mercedes-Benz E200 / E300 W213 (2017–2023)',
      'Mercedes-Benz GLC 300 X253 (2016–2022)'
    ]
  },
  {
    id: 'sp-3',
    sku: 'SUS-BMW-003',
    name: 'Adaptive Front Air Suspension Strut',
    category: 'suspension',
    categoryName: 'Suspension',
    brand: 'Bilstein B4 / BMW OEM',
    model: 'BMW 5 Series / 7 Series',
    price: 19800,
    formattedPrice: '19,800 EGP',
    rating: 4.8,
    reviewsCount: 14,
    inStock: true,
    stockCount: 8,
    shortDescription: 'Electromagnetically dampened pneumatic strut providing factory ride comfort and dynamic agility.',
    description: 'Engineered in Germany to match BMW EDC (Electronic Damper Control) specifications. Restores original ride leveling, absorbs harsh road impacts, and enhances high-speed stability.',
    images: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=900&q=80'
    ],
    specs: [
      { key: 'Brand', value: 'Bilstein OEM' },
      { key: 'Position', value: 'Front Left / Right' },
      { key: 'Type', value: 'Air Spring + Active Damper' },
      { key: 'SKU / Part No', value: 'SUS-BMW-003' },
      { key: 'Country of Origin', value: 'Germany' }
    ],
    compatibility: [
      'BMW 5 Series G30 / G31 (2017–2023)',
      'BMW 7 Series G11 / G12 (2016–2022)',
      'BMW 6 Series GT G32 (2018–2023)'
    ]
  },
  {
    id: 'sp-4',
    sku: 'EL-BOSCH-004',
    name: 'Intelligent High-Output Alternator 180A',
    category: 'electrical',
    categoryName: 'Electrical',
    brand: 'Bosch Original',
    model: 'VAG Group (Audi / VW / Skoda)',
    price: 11300,
    formattedPrice: '11,300 EGP',
    rating: 4.9,
    reviewsCount: 22,
    inStock: true,
    stockCount: 9,
    shortDescription: 'Bosch genuine 14V 180A intelligent alternator with LIN-bus digital regulator for modern start-stop systems.',
    description: 'Guarantees reliable high-current charging across all electronic modules, climate control compressors, and infotainment screens. Built with heavy-duty copper windings and premium bearings.',
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=900&q=80'
    ],
    specs: [
      { key: 'Manufacturer', value: 'Bosch Genuine' },
      { key: 'Voltage / Amperage', value: '14V / 180A' },
      { key: 'Pulley Type', value: 'Free-wheel OAP' },
      { key: 'SKU / Part No', value: 'EL-BOSCH-004' },
      { key: 'Warranty', value: '12 Months Replacement' }
    ],
    compatibility: [
      'Audi A4 / A5 / A6 2.0 TFSI (2016–2023)',
      'Volkswagen Passat / Tiguan 2.0 TSI (2017–2024)',
      'Skoda Superb / Kodiaq 2.0 TSI (2018–2024)'
    ]
  },
  {
    id: 'sp-5',
    sku: 'FL-MANN-005',
    name: 'FreciousPlus Biofunctional Cabin Air Filter Kit',
    category: 'filters',
    categoryName: 'Filters',
    brand: 'Mann-Filter Original',
    model: 'Universal German & Asian Models',
    price: 950,
    formattedPrice: '950 EGP',
    rating: 4.9,
    reviewsCount: 65,
    inStock: true,
    stockCount: 42,
    shortDescription: 'Multi-layer activated carbon and bio-functional filtration capturing PM2.5 particles, allergens, and odors.',
    description: 'Provides hospital-grade clean air inside your vehicle cabin. Traps almost 100% of fine dust, nitrogen oxides, and harmful bacteria.',
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=900&q=80'
    ],
    specs: [
      { key: 'Brand', value: 'Mann-Filter' },
      { key: 'Filter Type', value: 'Activated Carbon + Biofunctional' },
      { key: 'SKU / Part No', value: 'FL-MANN-005' },
      { key: 'Recommended Change', value: 'Every 15,000 km / 1 Year' }
    ],
    compatibility: [
      'Mercedes C-Class W205 (2015–2021)',
      'BMW 3 Series G20 (2019–2024)',
      'Audi A4 B9 (2016–2023)',
      'Volkswagen Golf 7 / 8 (2014–2023)'
    ]
  },
  {
    id: 'sp-6',
    sku: 'AC-MPERF-006',
    name: 'Carbon Fiber Mirror Caps & Aerodynamic Trim Set',
    category: 'accessories',
    categoryName: 'Accessories',
    brand: 'M Performance OEM Style',
    model: 'BMW 3 / 4 / 5 Series',
    price: 3600,
    formattedPrice: '3,600 EGP',
    rating: 4.7,
    reviewsCount: 18,
    inStock: true,
    stockCount: 11,
    shortDescription: 'Dry carbon fiber replacement mirror covers with UV-resistant high-gloss clear coat finish.',
    description: 'Ultra-lightweight real 3K weave carbon fiber mirror covers. Precise clip-on replacement designed to withstand high-speed winds and harsh sunlight.',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80'
    ],
    specs: [
      { key: 'Material', value: 'Real 3K Carbon Fiber' },
      { key: 'Finish', value: 'High Gloss Clear Coat' },
      { key: 'Installation', value: 'Direct Clip-on Replacement' },
      { key: 'SKU / Part No', value: 'AC-MPERF-006' }
    ],
    compatibility: [
      'BMW 3 Series G20 / G21 (2019–2024)',
      'BMW 4 Series G22 / G23 / G26 (2020–2024)',
      'BMW 5 Series G30 LCI (2020–2023)'
    ]
  },
  {
    id: 'sp-7',
    sku: 'BP-BRM-007',
    name: 'Brembo Two-Piece Drilled Front Brake Rotors (Pair)',
    category: 'brake',
    categoryName: 'Brake Parts',
    brand: 'Brembo High Performance',
    model: 'Mercedes-AMG / Audi RS / BMW M',
    price: 14200,
    formattedPrice: '14,200 EGP',
    rating: 5.0,
    reviewsCount: 29,
    inStock: true,
    stockCount: 6,
    shortDescription: 'Cross-drilled lightweight high-carbon front brake discs engineered for extreme thermal endurance.',
    description: 'Directional cooling vanes and precision cross-drilling expel brake gas, moisture, and debris instantly. Eliminates brake fade during aggressive high-speed highway driving.',
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80'
    ],
    specs: [
      { key: 'Brand', value: 'Brembo Italy' },
      { key: 'Diameter', value: '360 mm' },
      { key: 'Design', value: 'Floating Drilled High-Carbon' },
      { key: 'SKU / Part No', value: 'BP-BRM-007' },
      { key: 'Quantity', value: 'Pair (Left + Right)' }
    ],
    compatibility: [
      'Mercedes-AMG C43 / C63 W205 (2016–2022)',
      'BMW M340i / M440i xDrive (2020–2024)',
      'Audi S4 / S5 B9 (2018–2023)'
    ]
  },
  {
    id: 'sp-8',
    sku: 'ENG-NGK-008',
    name: 'Laser Iridium High-Ignition Spark Plugs (Set of 4)',
    category: 'engine',
    categoryName: 'Engine Parts',
    brand: 'NGK Laser Iridium OEM',
    model: 'Universal Direct-Injection Turbo',
    price: 1850,
    formattedPrice: '1,850 EGP',
    rating: 4.9,
    reviewsCount: 52,
    inStock: true,
    stockCount: 30,
    shortDescription: 'Ultra-fine 0.6mm iridium center electrode and platinum ground disc for maximum spark energy.',
    description: 'Original factory spark plugs engineered for turbocharged petrol engines. Delivers superior cold starts, smoother idle, and complete fuel combustion.',
    images: [
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=900&q=80'
    ],
    specs: [
      { key: 'Manufacturer', value: 'NGK Japan' },
      { key: 'Electrode Tip', value: 'Laser Welded Iridium' },
      { key: 'Heat Range', value: '7 (Turbo Spec)' },
      { key: 'SKU / Part No', value: 'ENG-NGK-008' },
      { key: 'Pack Size', value: '4 Spark Plugs' }
    ],
    compatibility: [
      'Volkswagen 1.4 TSI / 2.0 TSI (EA888 Gen 3)',
      'Audi 2.0 TFSI (2015–2024)',
      'Hyundai / Kia 1.6 T-GDI (2016–2023)',
      'Mercedes M270 / M274 1.6L & 2.0L'
    ]
  }
];

export const EGYPTIAN_GOVERNORATES = [
  'Cairo (القاهرة)',
  'Giza (الجيزة)',
  'Menoufia (المنوفية - شبين الكوم)',
  'Alexandria (الإسكندرية)',
  'Qalyubia (القليوبية)',
  'Sharqia (الشرقية)',
  'Dakahlia (الدقهلية)',
  'Gharbia (الغربية - طنطا)',
  'Kafr El Sheikh (كفر الشيخ)',
  'Damietta (دمياط)',
  'Port Said (بورسعيد)',
  'Ismailia (الإسماعيلية)',
  'Suez (السويس)',
  'Beheira (البحيرة)',
  'Fayoum (الفيوم)',
  'Beni Suef (بني سويف)',
  'Minya (المنيا)',
  'Asyut (أسيوط)',
  'Sohag (سوهاج)',
  'Qena (قنا)',
  'Luxor (الأقصر)',
  'Aswan (أسوان)',
  'Red Sea (البحر الأحمر - الغردقة)',
  'South Sinai (جنوب سيناء - شرم الشيخ)',
  'North Sinai (شمال سيناء)',
  'Matrouh (مطروح - الساحل الشمالي)',
  'New Valley (الوادي الجديد)'
];
