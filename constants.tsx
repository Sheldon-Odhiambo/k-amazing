
import { Product } from './types';

export const PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: "Ignite Heavy Hoodie", 
    price: 2500, 
    category: "Street", 
    image: "/assets/hd3.jpeg", 
    hoverImage: "/assets/hoodiec.jpeg",
    color: "#FFD8BE", 
    description: "Heavyweight 450GSM cotton. Performance oriented.", 
    features: ["450GSM Cotton", "Boxy Fit", "Embroidered Mantra"] 
  },
  { 
    id: 2, 
    name: "Retro '92 Official Tee", 
    price: 1500, 
    category: "Retro", 
    image: "/assets/lk55.jpeg", 
    hoverImage: "/assets/14.png",
    color: "#D1F2EB", 
    description: "Retro Official series celebrating heritage courts." 
  },
  { 
    id: 3, 
    name: "Performance Casual Tech Tee", 
    price: 1000, 
    category: "Gym", 
    image: "/assets/24.png", 
    hoverImage: "/assets/soul.jpeg",
    color: "#E2D1F9", 
    description: "Gym performance gear. Sweat-wicking brilliance." 
  },
  
  { 
    id: 4, 
    name: "Barrier Breaker Cap", 
    price: 800, 
    category: "Accessories", 
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800", 
    hoverImage: "https://picsum.photos/seed/cap1-alt/800/1000",
    color: "#AED9E0", 
    description: "Structured crown with signature branding." 
  },
  { 
    id: 5, 
    name: "Official Court Hoodie", 
    price: 2500, 
    category: "Official",  
    image: "/assets/lkk4.jpeg",
    hoverImage: "/assets/officialc.png",
    color: "#FFF4E0" 
  },
  { 
    id: 6, 
    name: "Turtle Tee", 
    price: 1500, 
    category: "Street", 
    image: "./assets/look6.jpeg", 
    hoverImage: "./assets/13.png",
    color: "#FADADD" 
  },
  
];

export const LOOKBOOK_IMAGES = [
 "/assets/hd3.jpeg",
"./assets/look6.jpeg",
"./assets/looouk.jpeg",
"./assets/mocha.jpeg",
"./assets/42.png",
"./assets/31.png",
"./assets/lkk1.jpeg",
"./assets/bocaboca.jpg",
"./assets/hoodiec.jpeg",
"./assets/crophoodie.jpeg",
"./assets/dy2.jpeg",
"./assets/look3.jpeg",
"./assets/4.jpeg",
"./assets/img_0878.jpg",
"./assets/bv.jpeg",
"./assets/16.jpg",
"./assets/look4.jpeg",
"./assets/37.png",
"./assets/dy3.jpeg",
"./assets/lk22.jpeg",
"./assets/lk33.jpeg",
"./assets/42.png",
"./assets/lk44.jpeg",
"./assets/lkk4.jpeg",
"./assets/ogajis.png",
"./assets/lkk8.jpeg",
"./assets/23.png",
"./assets/AWESOME1.jpeg",
"./assets/hd1.jpeg",
"./assets/croakish.png",
"./assets/mockup 2 (1).png",
"./assets/lkk5.jpeg",
"./assets/maus.png",
"./assets/lkk7.jpeg",
"/assets/vyk.jpeg",
"./assets/lk3.jpeg",
"./assets/dy5.jpeg",
"./assets/lkk6.jpeg",
"./assets/lkk3.jpeg",
"./assets/lk55.jpeg",
"/assets/LEFTYK.jpeg",
"/assets/kurdit.jpeg",
"./assets/lk1.jpeg",
"./assets/39.png",
"./assets/soul.jpeg",
"/assets/dy1.jpeg",
"/assets/KA1.jpeg",
"/assets/KA4.jpeg",
"/assets/KA3.jpeg",
"/assets/KA2.jpeg",
""
];


// Custom Lab Constants
export const CUSTOM_BASES = [
  { id: 'hoodie', name: 'Legacy Tee', img: './assets/looouk.jpeg' },
  { id: 'tee', name: 'Heavy Hoodie', img: './public/assets/hoodie.jpeg' },
  { id: 'cap', name: 'Vision Cap', img: 'https://picsum.photos/seed/custom-cap/800/1000' },
];

export const CUSTOM_COLORS = [
  { id: 'bone', name: 'Bone White', hex: '#F9F6EE' },
  { id: 'slate', name: 'Deep Slate', hex: '#1E293B' },
  { id: 'peach', name: 'Nax Peach', hex: '#FFD8BE' },
  { id: 'mint', name: 'Mint Protocol', hex: '#D1F2EB' },
];

export const CUSTOM_DETAILS = [
  { id: 'minimal', name: 'Minimal Grit' },
  { id: 'bold', name: 'Maximum Vision' },
  { id: 'distressed', name: 'Street Worn' },
];
