import { db } from "@/lib/db";

const keyboardImages = [
  {
    name: "Logitech G Pro X 60 Lightspeed",
    imageUrl:
      "https://images.pexels.com/photos/27791751/pexels-photo-27791751.jpeg",
  },
  {
    name: "Razer Huntsman V3 Pro Mini",
    imageUrl:
      "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg",
  },
  {
    name: "SteelSeries Apex Pro TKL Wireless Gen 3",
    imageUrl:
      "https://images.pexels.com/photos/28842075/pexels-photo-28842075.jpeg",
  },
  {
    name: "Keychron Q1 Max",
    imageUrl:
      "https://images.pexels.com/photos/32755746/pexels-photo-32755746.jpeg",
  },
  {
    name: "Wooting 80HE",
    imageUrl:
      "https://images.pexels.com/photos/671629/pexels-photo-671629.jpeg",
  },
  {
    name: "Corsair K70 Max RGB",
    imageUrl:
      "https://images.pexels.com/photos/3722752/pexels-photo-3722752.jpeg",
  },
  {
    name: "ASUS ROG Azoth",
    imageUrl:
      "https://images.pexels.com/photos/37607989/pexels-photo-37607989.jpeg",
  },
  {
    name: "Glorious GMMK 2 65%",
    imageUrl:
      "https://images.pexels.com/photos/13094372/pexels-photo-13094372.jpeg",
  },
  {
    name: "NuPhy Halo75 V2",
    imageUrl:
      "https://images.pexels.com/photos/32755757/pexels-photo-32755757.jpeg",
  },
  {
    name: "Akko 5075B Plus",
    imageUrl:
      "https://images.pexels.com/photos/34140989/pexels-photo-34140989.jpeg",
  },
  {
    name: "MonsGeek M1W",
    imageUrl:
      "https://images.pexels.com/photos/35655036/pexels-photo-35655036.jpeg",
  },
  {
    name: "Ducky One 3 TKL",
    imageUrl:
      "https://images.pexels.com/photos/9020270/pexels-photo-9020270.jpeg",
  },
  {
    name: "HyperX Alloy Origins 65",
    imageUrl:
      "https://images.pexels.com/photos/841228/pexels-photo-841228.jpeg",
  },
  {
    name: "Razer BlackWidow V4 75%",
    imageUrl:
      "https://images.pexels.com/photos/37099672/pexels-photo-37099672.jpeg",
  },
  {
    name: "Logitech G915 TKL Lightspeed",
    imageUrl:
      "https://images.pexels.com/photos/31497027/pexels-photo-31497027.jpeg",
  },
  {
    name: "Keychron K8 Pro",
    imageUrl:
      "https://images.pexels.com/photos/24449067/pexels-photo-24449067.jpeg",
  },
  {
    name: "Corsair K100 RGB",
    imageUrl:
      "https://images.pexels.com/photos/37657435/pexels-photo-37657435.jpeg",
  },
  {
    name: "SteelSeries Apex 7 TKL",
    imageUrl:
      "https://images.pexels.com/photos/4317158/pexels-photo-4317158.jpeg",
  },
  {
    name: "Keychron Q6 Max",
    imageUrl:
      "https://images.pexels.com/photos/15372896/pexels-photo-15372896.jpeg",
  },
  {
    name: "ASUS ROG Strix Scope II 96 Wireless",
    imageUrl:
      "https://images.pexels.com/photos/7858744/pexels-photo-7858744.jpeg",
  },
];

async function updateKeyboardImages() {
  for (const product of keyboardImages) {
    await db.product.updateMany({
      where: {
        name: product.name,
      },
      data: {
        imageUrl: product.imageUrl,
      },
    });
  }
}

updateKeyboardImages()
  .catch((error) => {
    console.error("failed to update product keyboard images", error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
