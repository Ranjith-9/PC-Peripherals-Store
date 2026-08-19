const chairSeed = [
  {
    name: "Razer Iskur V2",
    price: 54999,
    stock: 12,
    description:
      "A premium ergonomic gaming chair designed with adjustable lumbar support, a high-back design, and dense cushioning for long gaming sessions.",
    filters: {
      type: "Gaming",
      material: "Leather",
      adjustable: "Yes",
      armrest: "4D",
      headrest: "Yes",
    },
    attributes: {
      frameMaterial: "Steel",
      upholstery: "Synthetic Leather",
      recline: "152°",
      armrestType: "4D",
      lumbarSupport: "Adjustable",
      headrest: "Memory Foam",
      baseMaterial: "Aluminum",
      wheelSize: "60 mm",
      weightCapacity: "150 kg",
      warranty: "3 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/13871156/pexels-photo-13871156.jpeg",
  },

  {
    name: "Secretlab TITAN Evo",
    price: 49999,
    stock: 15,
    description:
      "A premium gaming chair combining a sculpted ergonomic backrest, magnetic memory foam head pillow, and adjustable lumbar support.",
    filters: {
      type: "Gaming",
      material: "Leather",
      adjustable: "Yes",
      armrest: "4D",
      headrest: "Yes",
    },
    attributes: {
      frameMaterial: "Steel",
      upholstery: "Neo Hybrid Leatherette",
      recline: "165°",
      armrestType: "4D",
      lumbarSupport: "4-Way Adjustable",
      headrest: "Memory Foam",
      baseMaterial: "Aluminum",
      wheelSize: "65 mm",
      weightCapacity: "180 kg",
      warranty: "5 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/13871186/pexels-photo-13871186.jpeg",
  },

  {
    name: "Corsair TC100 Relaxed",
    price: 29999,
    stock: 18,
    description:
      "A wide gaming chair with a relaxed seating position, adjustable armrests, thick padding, and a reclining backrest for comfortable gaming.",
    filters: {
      type: "Gaming",
      material: "Fabric",
      adjustable: "Yes",
      armrest: "2D",
      headrest: "Yes",
    },
    attributes: {
      frameMaterial: "Steel",
      upholstery: "Soft Fabric",
      recline: "160°",
      armrestType: "2D",
      lumbarSupport: "Adjustable Cushion",
      headrest: "Memory Foam",
      baseMaterial: "Steel",
      wheelSize: "65 mm",
      weightCapacity: "120 kg",
      warranty: "2 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/13871154/pexels-photo-13871154.jpeg",
  },

  {
    name: "ASUS ROG Destrier Ergo",
    price: 64999,
    stock: 10,
    description:
      "A high-end ergonomic gaming chair featuring extensive adjustability, integrated lumbar support, and a distinctive acoustic panel for immersive gaming.",
    filters: {
      type: "Gaming",
      material: "Fabric",
      adjustable: "Yes",
      armrest: "3D",
      headrest: "Yes",
    },
    attributes: {
      frameMaterial: "Steel",
      upholstery: "Fabric",
      recline: "135°",
      armrestType: "3D",
      lumbarSupport: "4-Way Adjustable",
      headrest: "Adjustable",
      baseMaterial: "Aluminum",
      wheelSize: "60 mm",
      weightCapacity: "150 kg",
      warranty: "2 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/13871187/pexels-photo-13871187.jpeg",
  },

  {
    name: "Logitech G x Herman Miller Embody",
    price: 159999,
    stock: 7,
    description:
      "A premium ergonomic chair designed for extended computer use, combining dynamic back support with a highly adjustable seating system.",
    filters: {
      type: "Ergonomic",
      material: "Fabric",
      adjustable: "Yes",
      armrest: "4D",
      headrest: "No",
    },
    attributes: {
      frameMaterial: "Polymer",
      upholstery: "Sync Fabric",
      recline: "Tilt Limiter",
      armrestType: "4D",
      lumbarSupport: "PostureFit",
      headrest: "None",
      baseMaterial: "Aluminum",
      wheelSize: "60 mm",
      weightCapacity: "136 kg",
      warranty: "12 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/12725827/pexels-photo-12725827.jpeg",
  },

  {
    name: "Sihoo M57 Ergonomic Office Chair",
    price: 24999,
    stock: 20,
    description:
      "An ergonomic mesh office chair designed for long work sessions with adjustable lumbar support, breathable material, and multiple adjustment points.",
    filters: {
      type: "Ergonomic",
      material: "Mesh",
      adjustable: "Yes",
      armrest: "3D",
      headrest: "Yes",
    },
    attributes: {
      frameMaterial: "Steel",
      upholstery: "Breathable Mesh",
      recline: "135°",
      armrestType: "3D",
      lumbarSupport: "Adjustable",
      headrest: "Adjustable Mesh",
      baseMaterial: "Nylon",
      wheelSize: "60 mm",
      weightCapacity: "150 kg",
      warranty: "1 Year",
    },
    imageUrl:
      "https://images.pexels.com/photos/12269763/pexels-photo-12269763.jpeg",
  },

  {
    name: "Hbada Ergonomic Office Chair",
    price: 14999,
    stock: 25,
    description:
      "A compact ergonomic office chair featuring breathable mesh, adjustable height, lumbar support, and a reclining backrest for everyday work.",
    filters: {
      type: "Ergonomic",
      material: "Mesh",
      adjustable: "Yes",
      armrest: "2D",
      headrest: "Yes",
    },
    attributes: {
      frameMaterial: "Steel",
      upholstery: "Mesh",
      recline: "120°",
      armrestType: "2D",
      lumbarSupport: "Fixed",
      headrest: "Adjustable",
      baseMaterial: "Nylon",
      wheelSize: "50 mm",
      weightCapacity: "120 kg",
      warranty: "1 Year",
    },
    imageUrl:
      "https://images.pexels.com/photos/8583732/pexels-photo-8583732.jpeg",
  },

  {
    name: "Steelcase Series 1",
    price: 69999,
    stock: 11,
    description:
      "A versatile ergonomic office chair designed for all-day productivity with adjustable lumbar support, flexible back support, and a breathable seat.",
    filters: {
      type: "Ergonomic",
      material: "Fabric",
      adjustable: "Yes",
      armrest: "4D",
      headrest: "No",
    },
    attributes: {
      frameMaterial: "Reinforced Polymer",
      upholstery: "Fabric",
      recline: "120°",
      armrestType: "4D",
      lumbarSupport: "Adjustable",
      headrest: "None",
      baseMaterial: "Aluminum",
      wheelSize: "65 mm",
      weightCapacity: "136 kg",
      warranty: "12 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/6446321/pexels-photo-6446321.jpeg",
  },

  {
    name: "Herman Miller Aeron",
    price: 139999,
    stock: 8,
    description:
      "A premium ergonomic office chair featuring a breathable suspension mesh, adjustable posture support, and a highly durable professional design.",
    filters: {
      type: "Ergonomic",
      material: "Mesh",
      adjustable: "Yes",
      armrest: "4D",
      headrest: "No",
    },
    attributes: {
      frameMaterial: "Aluminum",
      upholstery: "8Z Pellicle Mesh",
      recline: "Tilt Limiter",
      armrestType: "4D",
      lumbarSupport: "PostureFit SL",
      headrest: "None",
      baseMaterial: "Aluminum",
      wheelSize: "65 mm",
      weightCapacity: "159 kg",
      warranty: "12 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/31236089/pexels-photo-31236089.jpeg",
  },

  {
    name: "DXRacer Air Series",
    price: 39999,
    stock: 14,
    description:
      "A breathable gaming chair featuring a high-back racing design, mesh upholstery, adjustable armrests, and ergonomic support for extended gaming.",
    filters: {
      type: "Gaming",
      material: "Mesh",
      adjustable: "Yes",
      armrest: "3D",
      headrest: "Yes",
    },
    attributes: {
      frameMaterial: "Steel",
      upholstery: "Breathable Mesh",
      recline: "135°",
      armrestType: "3D",
      lumbarSupport: "Adjustable",
      headrest: "Adjustable",
      baseMaterial: "Aluminum",
      wheelSize: "60 mm",
      weightCapacity: "120 kg",
      warranty: "2 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/13871187/pexels-photo-13871187.jpeg",
  },
];

export default chairSeed;
