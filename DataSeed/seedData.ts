const gamingProducts = [
  {
    name: "Keychron K2 V2",
    description:
      "Wireless mechanical keyboard with RGB backlighting and hot-swappable switches.",
    price: 99.99,
    imageUrl:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1200&auto=format&fit=crop",
    category: "Keyboards",
    stock: 15,
    attributes: {
      brand: "Keychron",
      switchType: "Brown",
      wireless: true,
      rgb: true,
      layout: "75%",
    },
  },
  {
    name: "Logitech MX Master 3S",
    description:
      "Premium ergonomic wireless mouse for productivity and creative workflows.",
    price: 109.99,
    imageUrl:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop",
    category: "Mouse",
    stock: 22,
    attributes: {
      brand: "Logitech",
      wireless: true,
      bluetooth: true,
      dpi: 8000,
      color: "Black",
    },
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading wireless noise cancelling headphones.",
    price: 349.99,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
    category: "Headphones",
    stock: 10,
    attributes: {
      brand: "Sony",
      wireless: true,
      anc: true,
      batteryLife: "30 hours",
      color: "Black",
    },
  },
  {
    name: "Apple Watch Series 9",
    description: "Advanced smartwatch with health and fitness tracking.",
    price: 429.99,
    imageUrl:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1200&auto=format&fit=crop",
    category: "Smartwatch",
    stock: 18,
    attributes: {
      brand: "Apple",
      gps: true,
      waterproof: true,
      color: "Midnight",
      connectivity: "Bluetooth",
    },
  },
  {
    name: "Samsung Odyssey G5",
    description: "32-inch curved gaming monitor with 144Hz refresh rate.",
    price: 299.99,
    imageUrl:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop",
    category: "Monitor",
    stock: 7,
    attributes: {
      brand: "Samsung",
      size: "32 inch",
      refreshRate: "144Hz",
      resolution: "1440p",
      curved: true,
    },
  },
  {
    name: "Razer Huntsman Mini",
    description: "Compact 60% gaming keyboard with optical switches.",
    price: 119.99,
    imageUrl:
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=1200&auto=format&fit=crop",
    category: "Keyboards",
    stock: 20,
    attributes: {
      brand: "Razer",
      layout: "60%",
      rgb: true,
      switchType: "Optical",
      gaming: true,
    },
  },
  {
    name: "Dell XPS 15",
    description: "Premium high-performance laptop for developers and creators.",
    price: 1799.99,
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop",
    category: "Laptops",
    stock: 5,
    attributes: {
      brand: "Dell",
      ram: "32GB",
      storage: "1TB SSD",
      processor: "Intel i7",
      display: "15 inch",
    },
  },
  {
    name: "Canon EOS R50",
    description:
      "Mirrorless camera designed for content creators and photography enthusiasts.",
    price: 899.99,
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    category: "Cameras",
    stock: 8,
    attributes: {
      brand: "Canon",
      mirrorless: true,
      resolution: "24.2MP",
      video: "4K",
      lensIncluded: true,
    },
  },
  {
    name: "Nintendo Switch OLED",
    description: "Hybrid gaming console with vibrant OLED display.",
    price: 349.99,
    imageUrl:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1200&auto=format&fit=crop",
    category: "Gaming",
    stock: 12,
    attributes: {
      brand: "Nintendo",
      oled: true,
      handheld: true,
      multiplayer: true,
      storage: "64GB",
    },
  },
  {
    name: "Anker MagGo Power Bank",
    description: "Portable magnetic wireless power bank for smartphones.",
    price: 69.99,
    imageUrl:
      "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?q=80&w=1200&auto=format&fit=crop",
    category: "Accessories",
    stock: 30,
    attributes: {
      brand: "Anker",
      wirelessCharging: true,
      batteryCapacity: "10000mAh",
      magsafeCompatible: true,
      color: "White",
    },
  },
  {
    name: "SteelSeries Arctis Nova Pro",
    description:
      "Premium gaming headset with immersive spatial audio and active noise cancellation.",
    price: 329.99,
    imageUrl:
      "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?q=80&w=1200&auto=format&fit=crop",
    category: "Headphones",
    stock: 9,
    attributes: {
      brand: "SteelSeries",
      wireless: true,
      anc: true,
      gaming: true,
      batterySystem: "Hot-swappable",
    },
  },

  {
    name: "ASUS ROG Zephyrus G14",
    description: "Compact high-performance gaming laptop with RTX graphics.",
    price: 1899.99,
    imageUrl:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1200&auto=format&fit=crop",
    category: "Laptops",
    stock: 6,
    attributes: {
      brand: "ASUS",
      gpu: "RTX 4070",
      ram: "32GB",
      display: "14 inch",
      refreshRate: "165Hz",
    },
  },

  {
    name: "LG UltraGear 27GP850",
    description:
      "27-inch Nano IPS gaming monitor with ultra-fast refresh rate.",
    price: 449.99,
    imageUrl:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop",
    category: "Monitor",
    stock: 11,
    attributes: {
      brand: "LG",
      resolution: "1440p",
      refreshRate: "180Hz",
      panel: "IPS",
      hdr: true,
    },
  },

  {
    name: "HyperX QuadCast S",
    description:
      "RGB USB condenser microphone for streaming and content creation.",
    price: 159.99,
    imageUrl:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop",
    category: "Microphones",
    stock: 14,
    attributes: {
      brand: "HyperX",
      rgb: true,
      usb: true,
      streaming: true,
      pickupPatterns: 4,
    },
  },

  {
    name: "GoPro HERO12 Black",
    description: "Rugged action camera with 5.3K video recording support.",
    price: 399.99,
    imageUrl:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1200&auto=format&fit=crop",
    category: "Cameras",
    stock: 13,
    attributes: {
      brand: "GoPro",
      waterproof: true,
      video: "5.3K",
      stabilization: true,
      batteryType: "Rechargeable",
    },
  },

  {
    name: "Secretlab Titan Evo",
    description:
      "Ergonomic premium gaming chair with adjustable lumbar support.",
    price: 549.99,
    imageUrl:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1200&auto=format&fit=crop",
    category: "Furniture",
    stock: 4,
    attributes: {
      brand: "Secretlab",
      material: "Hybrid Leatherette",
      lumbarSupport: true,
      recline: "165 degrees",
      size: "Regular",
    },
  },

  {
    name: "Apple iPad Air M2",
    description:
      "Powerful lightweight tablet designed for productivity and creativity.",
    price: 699.99,
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1200&auto=format&fit=crop",
    category: "Tablets",
    stock: 16,
    attributes: {
      brand: "Apple",
      processor: "M2",
      storage: "256GB",
      display: "Liquid Retina",
      applePencilSupport: true,
    },
  },

  {
    name: "Corsair Vengeance RGB DDR5",
    description:
      "High-speed DDR5 RAM kit optimized for gaming and multitasking.",
    price: 219.99,
    imageUrl:
      "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1200&auto=format&fit=crop",
    category: "PC Components",
    stock: 25,
    attributes: {
      brand: "Corsair",
      memoryType: "DDR5",
      capacity: "32GB",
      speed: "6000MHz",
      rgb: true,
    },
  },

  {
    name: "Elgato Stream Deck MK.2",
    description:
      "Customizable control pad for streamers and productivity workflows.",
    price: 149.99,
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    category: "Streaming",
    stock: 19,
    attributes: {
      brand: "Elgato",
      programmableKeys: 15,
      usb: true,
      streaming: true,
      customization: true,
    },
  },

  {
    name: "DJI Mini 4 Pro",
    description: "Compact intelligent drone with 4K HDR video capabilities.",
    price: 999.99,
    imageUrl:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop",
    category: "Drones",
    stock: 5,
    attributes: {
      brand: "DJI",
      video: "4K HDR",
      obstacleAvoidance: true,
      flightTime: "34 minutes",
      weight: "Under 249g",
    },
  },
  {
    name: "Razer DeathAdder V3 Pro",
    description:
      "Ultra-lightweight esports gaming mouse with Focus Pro optical sensor.",
    price: 149.99,
    imageUrl:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop",
    category: "Mouse",
    stock: 18,
    attributes: {
      brand: "Razer",
      connectivity: "Wireless",
      dpi: "30000 DPI",
      weight: "63g",
      rgb: true,
    },
  },

  {
    name: "SteelSeries Apex Pro",
    description:
      "Mechanical gaming keyboard with adjustable OmniPoint switches.",
    price: 229.99,
    imageUrl:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1200&auto=format&fit=crop",
    category: "Keyboard",
    stock: 10,
    attributes: {
      brand: "SteelSeries",
      switchType: "OmniPoint",
      connectivity: "Wired",
      rgb: true,
      size: "TKL",
    },
  },

  {
    name: "HyperX Cloud III",
    description:
      "Comfortable gaming headset with immersive DTS surround sound.",
    price: 119.99,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
    category: "Headset",
    stock: 24,
    attributes: {
      brand: "HyperX",
      connectivity: "Wired",
      surroundSound: true,
      microphone: true,
      color: "Black",
    },
  },

  {
    name: "ASUS ROG Swift PG32UQ",
    description: "32-inch 4K gaming monitor with ultra-fast refresh rate.",
    price: 899.99,
    imageUrl:
      "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop",
    category: "Monitor",
    stock: 7,
    attributes: {
      brand: "ASUS",
      resolution: "4K",
      refreshRate: "144Hz",
      panel: "IPS",
      hdr: true,
    },
  },

  {
    name: "Logitech G Pro X Superlight",
    description:
      "Professional-grade wireless gaming mouse designed for esports.",
    price: 159.99,
    imageUrl:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e?q=80&w=1200&auto=format&fit=crop",
    category: "Mouse",
    stock: 16,
    attributes: {
      brand: "Logitech",
      connectivity: "Wireless",
      dpi: "25600 DPI",
      weight: "60g",
      rgb: false,
    },
  },

  {
    name: "Corsair K70 RGB Pro",
    description: "Premium mechanical keyboard with Cherry MX switches.",
    price: 189.99,
    imageUrl:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=1200&auto=format&fit=crop",
    category: "Keyboard",
    stock: 13,
    attributes: {
      brand: "Corsair",
      switchType: "Cherry MX Red",
      connectivity: "Wired",
      rgb: true,
      wristRest: true,
    },
  },

  {
    name: "BenQ ZOWIE XL2566K",
    description: "Esports-focused monitor with ultra-smooth motion clarity.",
    price: 599.99,
    imageUrl:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop",
    category: "Monitor",
    stock: 9,
    attributes: {
      brand: "BenQ",
      resolution: "1080p",
      refreshRate: "360Hz",
      panel: "TN",
      hdr: false,
    },
  },

  {
    name: "Elgato Stream Deck MK2",
    description: "Customizable control deck for streamers and gamers.",
    price: 149.99,
    imageUrl:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1200&auto=format&fit=crop",
    category: "Streaming",
    stock: 14,
    attributes: {
      brand: "Elgato",
      keys: "15 LCD Keys",
      connectivity: "USB-C",
      customizable: true,
      rgb: false,
    },
  },

  {
    name: "Secretlab Titan Evo",
    description: "Ergonomic gaming chair with premium lumbar support.",
    price: 549.99,
    imageUrl:
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1200&auto=format&fit=crop",
    category: "Chair",
    stock: 6,
    attributes: {
      brand: "Secretlab",
      material: "Hybrid Leatherette",
      recline: "165 Degrees",
      lumbarSupport: true,
      pillowsIncluded: true,
    },
  },

  {
    name: "Sony INZONE H9",
    description: "Wireless gaming headset with active noise cancellation.",
    price: 299.99,
    imageUrl:
      "https://images.unsplash.com/photo-1612444530582-fc66183b16f0?q=80&w=1200&auto=format&fit=crop",
    category: "Headset",
    stock: 11,
    attributes: {
      brand: "Sony",
      connectivity: "Wireless",
      batteryLife: "32 Hours",
      anc: true,
      microphone: true,
    },
  },

  {
    name: "NZXT H9 Flow",
    description: "Dual-chamber gaming PC case with high airflow design.",
    price: 189.99,
    imageUrl:
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=1200&auto=format&fit=crop",
    category: "PC Case",
    stock: 12,
    attributes: {
      brand: "NZXT",
      motherboardSupport: "ATX",
      temperedGlass: true,
      rgbIncluded: false,
      airflowOptimized: true,
    },
  },

  {
    name: "Samsung Odyssey G7",
    description: "Curved QHD gaming monitor with ultra-fast response time.",
    price: 699.99,
    imageUrl:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    category: "Monitor",
    stock: 8,
    attributes: {
      brand: "Samsung",
      resolution: "1440p",
      refreshRate: "240Hz",
      panel: "VA",
      curved: true,
    },
  },

  {
    name: "Blue Yeti X",
    description: "Professional USB microphone for gaming and streaming.",
    price: 169.99,
    imageUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
    category: "Microphone",
    stock: 20,
    attributes: {
      brand: "Blue",
      connectivity: "USB",
      polarPatterns: 4,
      muteButton: true,
      rgb: true,
    },
  },

  {
    name: "Glorious Model O",
    description: "Honeycomb lightweight gaming mouse with RGB lighting.",
    price: 79.99,
    imageUrl:
      "https://images.unsplash.com/photo-1613141412501-9012977f1969?q=80&w=1200&auto=format&fit=crop",
    category: "Mouse",
    stock: 22,
    attributes: {
      brand: "Glorious",
      connectivity: "Wired",
      dpi: "19000 DPI",
      weight: "67g",
      rgb: true,
    },
  },

  {
    name: "AOC AGON PRO AG274QG",
    description: "High-performance gaming monitor with NVIDIA G-SYNC support.",
    price: 799.99,
    imageUrl:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1200&auto=format&fit=crop",
    category: "Monitor",
    stock: 5,
    attributes: {
      brand: "AOC",
      resolution: "1440p",
      refreshRate: "240Hz",
      panel: "IPS",
      gsync: true,
    },
  },

  {
    name: "Xbox Elite Series 2 Controller",
    description: "Premium customizable controller for competitive gaming.",
    price: 179.99,
    imageUrl:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1200&auto=format&fit=crop",
    category: "Controller",
    stock: 15,
    attributes: {
      brand: "Microsoft",
      connectivity: "Wireless",
      triggerLocks: true,
      paddlesIncluded: true,
      batteryLife: "40 Hours",
    },
  },

  {
    name: "Razer Iskur V2",
    description: "Ergonomic gaming chair with adaptive lumbar system.",
    price: 649.99,
    imageUrl:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop",
    category: "Chair",
    stock: 4,
    attributes: {
      brand: "Razer",
      material: "EPU Leather",
      lumbarSupport: true,
      recline: "152 Degrees",
      rgb: false,
    },
  },

  {
    name: "WD Black SN850X",
    description: "High-speed NVMe SSD optimized for gaming performance.",
    price: 199.99,
    imageUrl:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1200&auto=format&fit=crop",
    category: "Storage",
    stock: 19,
    attributes: {
      brand: "Western Digital",
      capacity: "2TB",
      interface: "NVMe Gen4",
      readSpeed: "7300MB/s",
      heatsink: true,
    },
  },

  {
    name: "Cooler Master MM711",
    description: "Ultra-light gaming mouse with honeycomb shell design.",
    price: 59.99,
    imageUrl:
      "https://images.unsplash.com/photo-1563297007-0686b7003af7?q=80&w=1200&auto=format&fit=crop",
    category: "Mouse",
    stock: 17,
    attributes: {
      brand: "Cooler Master",
      connectivity: "Wired",
      dpi: "16000 DPI",
      weight: "60g",
      rgb: true,
    },
  },

  {
    name: "Alienware AW3423DWF",
    description:
      "OLED ultrawide gaming monitor with exceptional color accuracy.",
    price: 1099.99,
    imageUrl:
      "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=1200&auto=format&fit=crop",
    category: "Monitor",
    stock: 3,
    attributes: {
      brand: "Alienware",
      resolution: "3440x1440",
      refreshRate: "165Hz",
      panel: "QD-OLED",
      hdr: true,
    },
  },
];

export default gamingProducts;
