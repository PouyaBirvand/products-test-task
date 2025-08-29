export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export const PRODUCTS: Product[] = [
  { id: 1, name: "Aurora Mug", price: 19, category: "kitchen" },
  { id: 2, name: "Nebula Lamp", price: 39, category: "home" },
  { id: 3, name: "Pixel Tee", price: 25, category: "apparel" },
  { id: 4, name: "Orbit Notebook", price: 12, category: "stationery" },
  { id: 5, name: "Comet Bottle", price: 29, category: "outdoor" },
  { id: 6, name: "Lunar Pen", price: 9, category: "stationery" },
  { id: 7, name: "Solar Hoodie", price: 59, category: "apparel" },
  { id: 8, name: "Galaxy Poster", price: 14, category: "decor" },
  { id: 9, name: "Quasar Bag", price: 49, category: "apparel" },
  { id: 10, name: "Meteor Socks", price: 8, category: "apparel" },
  { id: 11, name: "Eclipse Pillow", price: 22, category: "home" },
  { id: 12, name: "Nova Candle", price: 16, category: "home" },
];
