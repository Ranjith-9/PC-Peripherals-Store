const headphoneSeed = [
  {
    name: "Sony WH-1000XM5",
    price: 29990,
    stock: 15,
    description:
      "Premium wireless over-ear headphones with industry-leading noise cancellation, rich sound, and long battery life for music, gaming, and travel.",
    filters: {
      type: "Over-Ear",
      connectivity: "Wireless",
      noiseCancellation: "Yes",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "30 mm",
      batteryLife: "30 hours",
      frequencyResponse: "4 Hz–40 kHz",
      bluetoothVersion: "5.2",
      codec: "LDAC",
      charging: "USB-C",
      weight: "250 g",
      foldable: "Yes",
      app: "Sony Headphones Connect",
      warranty: "1 Year",
    },
    imageUrl:
      "https://images.pexels.com/photos/15840650/pexels-photo-15840650.jpeg",
  },

  {
    name: "Bose QuietComfort Ultra Headphones",
    price: 34900,
    stock: 12,
    description:
      "High-end wireless headphones featuring powerful noise cancellation, immersive spatial audio, and comfortable ear cushions designed for extended listening.",
    filters: {
      type: "Over-Ear",
      connectivity: "Wireless",
      noiseCancellation: "Yes",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "35 mm",
      batteryLife: "24 hours",
      frequencyResponse: "20 Hz–20 kHz",
      bluetoothVersion: "5.3",
      codec: "aptX Adaptive",
      charging: "USB-C",
      weight: "253 g",
      foldable: "Yes",
      app: "Bose Music",
      warranty: "1 Year",
    },
    imageUrl:
      "https://images.pexels.com/photos/3394653/pexels-photo-3394653.jpeg",
  },

  {
    name: "Apple AirPods Max",
    price: 59900,
    stock: 10,
    description:
      "Premium over-ear headphones combining high-fidelity audio, active noise cancellation, spatial audio, and seamless integration with Apple devices.",
    filters: {
      type: "Over-Ear",
      connectivity: "Wireless",
      noiseCancellation: "Yes",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "40 mm",
      batteryLife: "20 hours",
      frequencyResponse: "10 Hz–20 kHz",
      bluetoothVersion: "5.0",
      codec: "AAC",
      charging: "Lightning",
      weight: "384.8 g",
      foldable: "No",
      app: "Apple Settings",
      warranty: "1 Year",
    },
    imageUrl:
      "https://images.pexels.com/photos/8001055/pexels-photo-8001055.jpeg",
  },

  {
    name: "Sennheiser Momentum 4 Wireless",
    price: 34990,
    stock: 14,
    description:
      "Feature-rich wireless headphones delivering detailed sound, adaptive noise cancellation, and an exceptional battery life for everyday listening.",
    filters: {
      type: "Over-Ear",
      connectivity: "Wireless",
      noiseCancellation: "Yes",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "42 mm",
      batteryLife: "60 hours",
      frequencyResponse: "6 Hz–22 kHz",
      bluetoothVersion: "5.2",
      codec: "aptX Adaptive",
      charging: "USB-C",
      weight: "293 g",
      foldable: "Yes",
      app: "Sennheiser Smart Control",
      warranty: "2 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/747438/pexels-photo-747438.jpeg",
  },

  {
    name: "JBL Tour One M2",
    price: 24999,
    stock: 17,
    description:
      "Premium adaptive noise-cancelling headphones with powerful JBL sound, smart features, and a comfortable design for work and entertainment.",
    filters: {
      type: "Over-Ear",
      connectivity: "Wireless",
      noiseCancellation: "Yes",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "40 mm",
      batteryLife: "50 hours",
      frequencyResponse: "10 Hz–40 kHz",
      bluetoothVersion: "5.3",
      codec: "LDAC",
      charging: "USB-C",
      weight: "268 g",
      foldable: "Yes",
      app: "JBL Headphones",
      warranty: "1 Year",
    },
    imageUrl:
      "https://images.pexels.com/photos/11031586/pexels-photo-11031586.jpeg",
  },

  {
    name: "Audio-Technica ATH-M50x",
    price: 16990,
    stock: 20,
    description:
      "Professional studio monitor headphones known for their accurate sound reproduction, powerful bass response, and durable construction.",
    filters: {
      type: "Over-Ear",
      connectivity: "Wired",
      noiseCancellation: "No",
      microphone: "No",
      wireless: "No",
    },
    attributes: {
      driverSize: "45 mm",
      cableLength: "1.2–3.0 m",
      frequencyResponse: "15 Hz–28 kHz",
      impedance: "38 Ohms",
      connector: "3.5 mm / 6.35 mm",
      cableType: "Detachable",
      weight: "285 g",
      foldable: "Yes",
      driverType: "Dynamic",
      warranty: "2 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/2919003/pexels-photo-2919003.jpeg",
  },

  {
    name: "Beyerdynamic DT 770 Pro 80 Ohm",
    price: 13990,
    stock: 16,
    description:
      "Closed-back studio headphones designed for monitoring and mixing with detailed audio reproduction and excellent passive isolation.",
    filters: {
      type: "Over-Ear",
      connectivity: "Wired",
      noiseCancellation: "No",
      microphone: "No",
      wireless: "No",
    },
    attributes: {
      driverSize: "45 mm",
      cableLength: "3 m",
      frequencyResponse: "5 Hz–35 kHz",
      impedance: "80 Ohms",
      connector: "3.5 mm / 6.35 mm",
      cableType: "Fixed",
      weight: "270 g",
      foldable: "No",
      driverType: "Dynamic",
      warranty: "2 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/30428610/pexels-photo-30428610.jpeg",
  },

  {
    name: "Razer BlackShark V2 Pro",
    price: 17999,
    stock: 18,
    description:
      "Wireless gaming headset built for competitive gaming with low-latency connectivity, clear voice communication, and immersive positional audio.",
    filters: {
      type: "Gaming",
      connectivity: "Wireless",
      noiseCancellation: "No",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "50 mm",
      batteryLife: "70 hours",
      frequencyResponse: "12 Hz–28 kHz",
      bluetoothVersion: "5.2",
      connectivity: "2.4 GHz / Bluetooth",
      microphoneType: "Detachable",
      weight: "320 g",
      surroundSound: "7.1",
      software: "Razer Synapse",
      warranty: "2 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/16168353/pexels-photo-16168353.jpeg",
  },

  {
    name: "HyperX Cloud III Wireless",
    price: 16990,
    stock: 21,
    description:
      "Comfort-focused wireless gaming headset featuring angled 53 mm drivers, clear voice pickup, and an extended battery for long gaming sessions.",
    filters: {
      type: "Gaming",
      connectivity: "Wireless",
      noiseCancellation: "No",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "53 mm",
      batteryLife: "120 hours",
      frequencyResponse: "10 Hz–21 kHz",
      connectivity: "2.4 GHz",
      microphoneType: "Detachable",
      weight: "330 g",
      surroundSound: "DTS Headphone:X",
      software: "HyperX NGENUITY",
      earCupMaterial: "Memory Foam",
      warranty: "2 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/18441496/pexels-photo-18441496.jpeg",
  },

  {
    name: "SteelSeries Arctis Nova Pro Wireless",
    price: 34999,
    stock: 11,
    description:
      "Premium gaming headset with high-fidelity wireless audio, active noise cancellation, dual wireless connectivity, and a feature-rich base station.",
    filters: {
      type: "Gaming",
      connectivity: "Wireless",
      noiseCancellation: "Yes",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "40 mm",
      batteryLife: "44 hours",
      frequencyResponse: "10 Hz–22 kHz",
      connectivity: "2.4 GHz / Bluetooth",
      microphoneType: "Retractable",
      weight: "337 g",
      surroundSound: "360° Spatial Audio",
      software: "SteelSeries GG",
      hotSwappableBattery: "Yes",
      warranty: "1 Year",
    },
    imageUrl:
      "https://images.pexels.com/photos/16262111/pexels-photo-16262111.jpeg",
  },

  {
    name: "Logitech G733 Lightspeed",
    price: 13995,
    stock: 19,
    description:
      "Lightweight wireless gaming headset with customizable RGB lighting, comfortable memory foam cushions, and reliable Lightspeed performance.",
    filters: {
      type: "Gaming",
      connectivity: "Wireless",
      noiseCancellation: "No",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "40 mm",
      batteryLife: "29 hours",
      frequencyResponse: "20 Hz–20 kHz",
      connectivity: "Lightspeed Wireless",
      microphoneType: "Detachable",
      weight: "278 g",
      surroundSound: "DTS Headphone:X 2.0",
      software: "Logitech G Hub",
      rgb: "Yes",
      warranty: "2 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/18966448/pexels-photo-18966448.jpeg",
  },

  {
    name: "Corsair HS80 RGB Wireless",
    price: 14999,
    stock: 15,
    description:
      "Wireless gaming headset offering immersive Dolby Atmos audio, broadcast-quality voice pickup, and customizable RGB lighting.",
    filters: {
      type: "Gaming",
      connectivity: "Wireless",
      noiseCancellation: "No",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "50 mm",
      batteryLife: "20 hours",
      frequencyResponse: "20 Hz–40 kHz",
      connectivity: "2.4 GHz",
      microphoneType: "Flip-to-Mute",
      weight: "367 g",
      surroundSound: "Dolby Atmos",
      software: "Corsair iCUE",
      rgb: "Yes",
      warranty: "2 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/16168353/pexels-photo-16168353.jpeg",
  },

  {
    name: "Sony INZONE H9",
    price: 26990,
    stock: 13,
    description:
      "Premium gaming headset featuring 360 Spatial Sound, active noise cancellation, and low-latency wireless connectivity for immersive gameplay.",
    filters: {
      type: "Gaming",
      connectivity: "Wireless",
      noiseCancellation: "Yes",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "40 mm",
      batteryLife: "32 hours",
      frequencyResponse: "5 Hz–20 kHz",
      connectivity: "2.4 GHz / Bluetooth",
      microphoneType: "Boom",
      weight: "330 g",
      surroundSound: "360 Spatial Sound",
      software: "INZONE Hub",
      noiseCancellation: "Yes",
      warranty: "1 Year",
    },
    imageUrl:
      "https://images.pexels.com/photos/13728322/pexels-photo-13728322.jpeg",
  },

  {
    name: "Sennheiser HD 560S",
    price: 15990,
    stock: 14,
    description:
      "Open-back audiophile headphones designed for natural, detailed sound reproduction with an emphasis on accurate listening and mixing.",
    filters: {
      type: "Over-Ear",
      connectivity: "Wired",
      noiseCancellation: "No",
      microphone: "No",
      wireless: "No",
    },
    attributes: {
      driverSize: "38 mm",
      cableLength: "3 m",
      frequencyResponse: "6 Hz–38 kHz",
      impedance: "120 Ohms",
      connector: "6.35 mm",
      cableType: "Detachable",
      weight: "240 g",
      design: "Open-Back",
      driverType: "Dynamic",
      warranty: "2 Years",
    },
    imageUrl:
      "https://images.pexels.com/photos/10433472/pexels-photo-10433472.jpeg",
  },

  {
    name: "Philips Fidelio X2HR",
    price: 12990,
    stock: 17,
    description:
      "Open-back hi-fi headphones with large drivers, comfortable memory foam cushions, and an expansive soundstage for music enthusiasts.",
    filters: {
      type: "Over-Ear",
      connectivity: "Wired",
      noiseCancellation: "No",
      microphone: "No",
      wireless: "No",
    },
    attributes: {
      driverSize: "50 mm",
      cableLength: "3 m",
      frequencyResponse: "5 Hz–40 kHz",
      impedance: "30 Ohms",
      connector: "3.5 mm",
      cableType: "Detachable",
      weight: "380 g",
      design: "Open-Back",
      driverType: "Neodymium",
      warranty: "1 Year",
    },
    imageUrl:
      "https://images.pexels.com/photos/13354889/pexels-photo-13354889.jpeg",
  },

  {
    name: "Bose QuietComfort Headphones",
    price: 29900,
    stock: 16,
    description:
      "Comfortable wireless headphones with adjustable noise cancellation, balanced audio, and long battery life for everyday listening.",
    filters: {
      type: "Over-Ear",
      connectivity: "Wireless",
      noiseCancellation: "Yes",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "40 mm",
      batteryLife: "24 hours",
      frequencyResponse: "20 Hz–20 kHz",
      bluetoothVersion: "5.1",
      codec: "AAC / SBC",
      charging: "USB-C",
      weight: "240 g",
      foldable: "Yes",
      app: "Bose Music",
      warranty: "1 Year",
    },
    imageUrl:
      "https://images.pexels.com/photos/7772548/pexels-photo-7772548.jpeg",
  },

  {
    name: "Anker Soundcore Space Q45",
    price: 14999,
    stock: 22,
    description:
      "Long-lasting wireless headphones with adaptive noise cancellation, high-resolution audio support, and a comfortable travel-friendly design.",
    filters: {
      type: "Over-Ear",
      connectivity: "Wireless",
      noiseCancellation: "Yes",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "40 mm",
      batteryLife: "50 hours",
      frequencyResponse: "20 Hz–40 kHz",
      bluetoothVersion: "5.3",
      codec: "LDAC",
      charging: "USB-C",
      weight: "295 g",
      foldable: "Yes",
      app: "Soundcore",
      warranty: "18 Months",
    },
    imageUrl:
      "https://images.pexels.com/photos/3945668/pexels-photo-3945668.jpeg",
  },

  {
    name: "Marshall Major V",
    price: 14999,
    stock: 18,
    description:
      "Compact wireless on-ear headphones featuring Marshall's signature sound, a classic design, and an exceptionally long battery life.",
    filters: {
      type: "On-Ear",
      connectivity: "Wireless",
      noiseCancellation: "No",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "40 mm",
      batteryLife: "100+ hours",
      frequencyResponse: "20 Hz–20 kHz",
      bluetoothVersion: "5.3",
      codec: "SBC / LC3",
      charging: "USB-C",
      weight: "186 g",
      foldable: "Yes",
      app: "Marshall Bluetooth",
      warranty: "1 Year",
    },
    imageUrl:
      "https://images.pexels.com/photos/27858005/pexels-photo-27858005.jpeg",
  },

  {
    name: "JBL Live 770NC",
    price: 12999,
    stock: 20,
    description:
      "Wireless over-ear headphones with adaptive noise cancellation, immersive JBL sound, and smart ambient features for everyday use.",
    filters: {
      type: "Over-Ear",
      connectivity: "Wireless",
      noiseCancellation: "Yes",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "40 mm",
      batteryLife: "65 hours",
      frequencyResponse: "20 Hz–20 kHz",
      bluetoothVersion: "5.3",
      codec: "AAC",
      charging: "USB-C",
      weight: "256 g",
      foldable: "Yes",
      app: "JBL Headphones",
      warranty: "1 Year",
    },
    imageUrl:
      "https://images.pexels.com/photos/14212887/pexels-photo-14212887.jpeg",
  },

  {
    name: "Beats Studio Pro",
    price: 29900,
    stock: 15,
    description:
      "Stylish wireless over-ear headphones with active noise cancellation, personalized spatial audio, and strong battery life for everyday entertainment.",
    filters: {
      type: "Over-Ear",
      connectivity: "Wireless",
      noiseCancellation: "Yes",
      microphone: "Yes",
      wireless: "Yes",
    },
    attributes: {
      driverSize: "40 mm",
      batteryLife: "40 hours",
      frequencyResponse: "20 Hz–20 kHz",
      bluetoothVersion: "5.3",
      codec: "AAC / SBC",
      charging: "USB-C",
      weight: "260 g",
      foldable: "Yes",
      app: "Beats",
      spatialAudio: "Yes",
      warranty: "1 Year",
    },
    imageUrl:
      "https://images.pexels.com/photos/3394652/pexels-photo-3394652.jpeg",
  },
];

export default headphoneSeed;
