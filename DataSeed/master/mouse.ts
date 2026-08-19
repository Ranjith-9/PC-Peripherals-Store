const mouseSeed = [
  {
    name: "Logitech G Pro X Superlight 2",
    price: 13995,
    stock: 14,
    description:
      "Built for competitive esports players, the G Pro X Superlight 2 combines exceptional precision with an ultra-lightweight design. Its responsive wireless performance and long battery life make it ideal for marathon gaming sessions.",
    filters: {
      pollingRate: "2000 Hz",
      connectivity: "Wireless",
      rgb: "No",
      mouseWeight: "50-70g",
    },
    attributes: {
      sensor: "Hero 2",
      maxDpi: "32000",
      buttons: "5",
      batteryLife: "95 hours",
      switchType: "Hybrid Optical-Mechanical",
      warranty: "2 Years",
    },
    imageUrl: "https://source.unsplash.com/800x800/?gaming-mouse,black",
  },
  {
    name: "Razer Viper V3 Pro",
    price: 15999,
    stock: 10,
    description:
      "The Viper V3 Pro delivers flagship wireless performance with an ergonomic shape trusted by professional players. Its cutting-edge optical sensor ensures outstanding tracking accuracy acrossall play styles.",
    filters: {
      pollingRate: "8000 Hz",
      connectivity: "Wireless",
      rgb: "No",
      mouseWeight: "<50g",
    },
    attributes: {
      sensor: "Focus Pro 35K",
      maxDpi: "35000",
      buttons: "6",
      batteryLife: "95 hours",
      switchType: "Optical Gen-3",
      warranty: "2 Years",
    },
    imageUrl: "https://source.unsplash.com/800x800/?gaming-mouse,green",
  },
  {
    name: "SteelSeries Aerox 5 Wireless",
    price: 11999,
    stock: 17,
    description:
      "Designed with a lightweight honeycomb shell, the Aerox 5 Wireless offers versatile connectivity and excellent comfort. Its customizable controls make it suitable for both FPS and MMO gaming.",
    filters: {
      pollingRate: "1000 Hz",
      connectivity: "Wireless",
      rgb: "Yes",
      mouseWeight: "70-90g",
    },
    attributes: {
      sensor: "TrueMove Air",
      maxDpi: "18000",
      buttons: "9",
      batteryLife: "80 hours",
      switchType: "Golden Micro IP54",
      warranty: "2 Years",
    },
    imageUrl: "https://source.unsplash.com/800x800/?rgb-gaming-mouse",
  },
  {
    name: "ASUS ROG Harpe Ace Extreme",
    price: 17499,
    stock: 8,
    description:
      "The ROG Harpe Ace Extreme is engineered for competitive gaming with a premium lightweight construction. It delivers ultra-fast wireless responsiveness and exceptional sensor performance.",
    filters: {
      pollingRate: "4000 Hz",
      connectivity: "Wireless",
      rgb: "No",
      mouseWeight: "<50g",
    },
    attributes: {
      sensor: "ROG AimPoint Pro",
      maxDpi: "42000",
      buttons: "5",
      batteryLife: "90 hours",
      switchType: "ROG Optical",
      warranty: "2 Years",
    },
    imageUrl: "https://source.unsplash.com/800x800/?white-gaming-mouse",
  },
  {
    name: "Corsair M75 Air Wireless",
    price: 9999,
    stock: 19,
    description:
      "The Corsair M75 Air focuses on speed, precision, and comfort for competitive gameplay. Its lightweight chassis and reliable wireless connection provide a smooth gaming experience.",
    filters: {
      pollingRate: "2000 Hz",
      connectivity: "Wireless",
      rgb: "No",
      mouseWeight: "50-70g",
    },
    attributes: {
      sensor: "Marksman 26K",
      maxDpi: "26000",
      buttons: "5",
      batteryLife: "100 hours",
      switchType: "Optical",
      warranty: "2 Years",
    },
    imageUrl: "https://source.unsplash.com/800x800/?wireless-gaming-mouse",
  },
  {
    name: "HyperX Pulsefire Haste 2 Wireless",
    price: 7999,
    stock: 26,
    description:
      "The Pulsefire Haste 2 Wireless combines lightweight comfort with responsive wireless performance. It is built for gamers who value speed without sacrificing battery life.",
    filters: {
      pollingRate: "1000 Hz",
      connectivity: "Wireless",
      rgb: "Yes",
      mouseWeight: "50-70g",
    },
    attributes: {
      sensor: "HyperX 26K",
      maxDpi: "26000",
      buttons: "6",
      batteryLife: "100 hours",
      switchType: "TTC Golden",
      warranty: "2 Years",
    },
    imageUrl: "https://source.unsplash.com/800x800/?lightweight-gaming-mouse",
  },
  {
    name: "Glorious Model O 2 Wired",
    price: 5299,
    stock: 22,
    description:
      "The Model O 2 Wired delivers low-latency performance with a lightweight symmetrical design. It is an excellent choice for fast-paced competitive games.",
    filters: {
      pollingRate: "1000 Hz",
      connectivity: "Wired",
      rgb: "Yes",
      mouseWeight: "50-70g",
    },
    attributes: {
      sensor: "BAMF 2.0",
      maxDpi: "26000",
      buttons: "6",
      batteryLife: "N/A",
      switchType: "Glorious Optical",
      warranty: "2 Years",
    },
    imageUrl: "https://source.unsplash.com/800x800/?honeycomb-gaming-mouse",
  },
  {
    name: "Pulsar X2H Mini",
    price: 9499,
    stock: 18,
    description:
      "Designed for claw grip enthusiasts, the X2H Mini offers excellent control and premium wireless performance. Its compact shape is ideal for competitive FPS players.",
    filters: {
      pollingRate: "4000 Hz",
      connectivity: "Wireless",
      rgb: "No",
      mouseWeight: "<50g",
    },
    attributes: {
      sensor: "PAW3395",
      maxDpi: "26000",
      buttons: "5",
      batteryLife: "70 hours",
      switchType: "Optical",
      warranty: "2 Years",
    },
    imageUrl: "https://source.unsplash.com/800x800/?esports-mouse",
  },
  {
    name: "Lamzu Atlantis OG V2 4K",
    price: 9299,
    stock: 13,
    description:
      "The Atlantis OG V2 is known for its premium build quality and smooth wireless tracking. It delivers outstanding precision while remaining exceptionally lightweight.",
    filters: {
      pollingRate: "4000 Hz",
      connectivity: "Wireless",
      rgb: "No",
      mouseWeight: "50-70g",
    },
    attributes: {
      sensor: "PAW3395",
      maxDpi: "26000",
      buttons: "5",
      batteryLife: "80 hours",
      switchType: "Huano Blue Shell Pink Dot",
      warranty: "2 Years",
    },
    imageUrl: "https://source.unsplash.com/800x800/?gaming-peripheral,mouse",
  },
  {
    name: "Endgame Gear OP1 8K",
    price: 7499,
    stock: 20,
    description:
      "The OP1 8K is a wired gaming mouse built for players who demand ultra-low latency. Its precise sensor and responsive switches deliver exceptional consistency.",
    filters: {
      pollingRate: "8000 Hz",
      connectivity: "Wired",
      rgb: "No",
      mouseWeight: "50-70g",
    },
    attributes: {
      sensor: "PixArt PAW3395",
      maxDpi: "26000",
      buttons: "5",
      batteryLife: "N/A",
      switchType: "Kailh GX",
      warranty: "2 Years",
    },
    imageUrl: "https://source.unsplash.com/800x800/?wired-gaming-mouse",
  },
];

export default mouseSeed;
