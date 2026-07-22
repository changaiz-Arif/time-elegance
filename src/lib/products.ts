import w1 from "@/assets/watch-01.jpg";
import w2 from "@/assets/watch-02.jpg";
import w3 from "@/assets/watch-03.jpg";
import w4 from "@/assets/watch-04.jpg";
import w5 from "@/assets/watch-05.jpg";
import w6 from "@/assets/watch-06.jpg";
import w7 from "@/assets/watch-07.jpg";
import w8 from "@/assets/watch-08.jpg";
import w9 from "@/assets/watch-09.jpg";
import w10 from "@/assets/watch-10.jpg";
import w11 from "@/assets/watch-11.jpg";
import w12 from "@/assets/watch-12.jpg";
import w13 from "@/assets/watch-13.jpg";
import w14 from "@/assets/watch-14.jpg";
import w15 from "@/assets/watch-15.jpg";
import w16 from "@/assets/watch-16.jpg";

export type Category = "Dress" | "Sport" | "Diver" | "Chronograph" | "Smart" | "Classic";

export interface Product {
  id: number;
  slug: string;
  title: string;
  brand: string;
  category: Category;
  images: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  warranty: string;
  color: string;
  strap: string;
  movement: string;
  waterResistance: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  createdAt: string;
}

// 16 placeholder watches. Replace images/brands/prices to customize.
// To add more watches later: append entries with unique id + slug.
export const products: Product[] = [
  { id: 1, slug: "aurelia-classic-rose", title: "Aurelia Classic", brand: "Chronova", category: "Dress",
    images: [w1], description: "Minimalist rose-gold dress watch with genuine leather strap. Timeless silhouette designed for everyday elegance.",
    features: ["Sapphire crystal", "Genuine leather", "38mm case", "Swiss quartz"],
    specifications: { "Case Diameter": "38mm", "Case Thickness": "8mm", "Crystal": "Sapphire", "Movement": "Swiss Quartz" },
    price: 249, oldPrice: 329, discount: 24, rating: 4.7, reviewsCount: 128, stock: 12, warranty: "2 years",
    color: "Rose Gold / White", strap: "Genuine Leather", movement: "Quartz", waterResistance: "3 ATM",
    isBestSeller: true, createdAt: "2026-01-10" },
  { id: 2, slug: "vortex-chrono-orange", title: "Vortex Chrono", brand: "Meridian", category: "Chronograph",
    images: [w2], description: "Bold chronograph with matte black case and racing orange accents. Built for the driven.",
    features: ["Chronograph", "Tachymeter", "Rubber strap", "44mm case"],
    specifications: { "Case Diameter": "44mm", "Case Thickness": "13mm", "Crystal": "Mineral", "Movement": "Quartz Chronograph" },
    price: 379, oldPrice: 449, discount: 16, rating: 4.5, reviewsCount: 89, stock: 8, warranty: "2 years",
    color: "Matte Black / Orange", strap: "Rubber", movement: "Quartz Chronograph", waterResistance: "10 ATM",
    isNew: true, createdAt: "2026-03-01" },
  { id: 3, slug: "skeleton-heritage", title: "Skeleton Heritage", brand: "Argent", category: "Classic",
    images: [w3], description: "Open-heart automatic watch revealing every gear in motion. Crafted for connoisseurs.",
    features: ["Automatic movement", "Skeleton dial", "Alligator strap", "42mm case"],
    specifications: { "Case Diameter": "42mm", "Case Thickness": "12mm", "Crystal": "Sapphire", "Movement": "Automatic" },
    price: 899, rating: 4.9, reviewsCount: 214, stock: 5, warranty: "3 years",
    color: "Silver / Transparent", strap: "Alligator Leather", movement: "Automatic", waterResistance: "5 ATM",
    isBestSeller: true, createdAt: "2025-11-15" },
  { id: 4, slug: "abyss-diver-navy", title: "Abyss Diver", brand: "Nautilus", category: "Diver",
    images: [w4], description: "Professional dive watch tested to 300m. Luminous markers guide you through the depths.",
    features: ["300m water resistance", "Unidirectional bezel", "Steel bracelet", "SuperLuminova"],
    specifications: { "Case Diameter": "42mm", "Case Thickness": "14mm", "Crystal": "Sapphire", "Movement": "Automatic" },
    price: 599, oldPrice: 749, discount: 20, rating: 4.8, reviewsCount: 342, stock: 15, warranty: "5 years",
    color: "Navy / Steel", strap: "Stainless Steel", movement: "Automatic", waterResistance: "30 ATM",
    isBestSeller: true, createdAt: "2025-09-20" },
  { id: 5, slug: "regent-roman-gold", title: "Regent Roman", brand: "Chronova", category: "Dress",
    images: [w5], description: "Classic gold dress watch with Roman numerals — an heirloom-quality piece for formal moments.",
    features: ["18k gold-plated case", "Roman numerals", "Alligator strap", "Small seconds sub-dial"],
    specifications: { "Case Diameter": "40mm", "Case Thickness": "9mm", "Crystal": "Sapphire", "Movement": "Automatic" },
    price: 1290, rating: 4.6, reviewsCount: 76, stock: 4, warranty: "3 years",
    color: "Gold / Cream", strap: "Alligator Leather", movement: "Automatic", waterResistance: "3 ATM",
    createdAt: "2025-08-01" },
  { id: 6, slug: "titan-hybrid-smart", title: "Titan Hybrid", brand: "Circuit", category: "Smart",
    images: [w6], description: "Hybrid smartwatch pairing classic analog design with modern activity tracking and notifications.",
    features: ["Heart rate", "Activity tracking", "6-month battery", "Bluetooth 5.0"],
    specifications: { "Case Diameter": "44mm", "Case Thickness": "12mm", "Battery": "6 months", "Connectivity": "Bluetooth" },
    price: 329, oldPrice: 399, discount: 18, rating: 4.4, reviewsCount: 512, stock: 24, warranty: "2 years",
    color: "Titanium / Black", strap: "Silicone", movement: "Hybrid Smart", waterResistance: "5 ATM",
    isNew: true, createdAt: "2026-04-01" },
  { id: 7, slug: "ceramica-pure-white", title: "Ceramica Pure", brand: "Argent", category: "Classic",
    images: [w7], description: "Scratch-resistant white ceramic case with a slim profile — refined minimalism.",
    features: ["Ceramic case", "Sapphire crystal", "Ceramic bracelet", "Ultra-thin"],
    specifications: { "Case Diameter": "38mm", "Case Thickness": "7mm", "Crystal": "Sapphire", "Movement": "Swiss Quartz" },
    price: 449, rating: 4.6, reviewsCount: 98, stock: 10, warranty: "2 years",
    color: "White Ceramic", strap: "Ceramic", movement: "Swiss Quartz", waterResistance: "5 ATM",
    createdAt: "2025-12-05" },
  { id: 8, slug: "aviator-pilot-black", title: "Aviator Pilot", brand: "Squadron", category: "Sport",
    images: [w8], description: "Vintage aviator inspired by 1940s cockpits. Oversized crown for gloved pilots.",
    features: ["Oversized crown", "Vintage lume", "Leather strap", "42mm case"],
    specifications: { "Case Diameter": "42mm", "Case Thickness": "11mm", "Crystal": "Sapphire", "Movement": "Automatic" },
    price: 419, rating: 4.7, reviewsCount: 156, stock: 9, warranty: "3 years",
    color: "Bronze / Black", strap: "Vintage Leather", movement: "Automatic", waterResistance: "5 ATM",
    createdAt: "2025-10-11" },
  { id: 9, slug: "lumiere-crystal", title: "Lumière Crystal", brand: "Étoile", category: "Dress",
    images: [w9], description: "Feminine dress watch with a mother-of-pearl dial and crystal-set bezel.",
    features: ["Crystal-set bezel", "Mother-of-pearl dial", "36mm case", "Rose gold bracelet"],
    specifications: { "Case Diameter": "36mm", "Case Thickness": "8mm", "Crystal": "Mineral", "Movement": "Quartz" },
    price: 289, oldPrice: 359, discount: 19, rating: 4.5, reviewsCount: 203, stock: 18, warranty: "2 years",
    color: "Rose Gold / Pearl", strap: "Rose Gold Steel", movement: "Quartz", waterResistance: "3 ATM",
    isBestSeller: true, createdAt: "2025-11-01" },
  { id: 10, slug: "expedition-gmt-emerald", title: "Expedition GMT", brand: "Nautilus", category: "Sport",
    images: [w10], description: "GMT complication for the world traveler. Track two time zones at a glance.",
    features: ["GMT function", "Ceramic bezel", "Steel bracelet", "Screw-down crown"],
    specifications: { "Case Diameter": "40mm", "Case Thickness": "12mm", "Crystal": "Sapphire", "Movement": "Automatic GMT" },
    price: 799, rating: 4.8, reviewsCount: 141, stock: 6, warranty: "5 years",
    color: "Emerald / Steel", strap: "Stainless Steel", movement: "Automatic GMT", waterResistance: "20 ATM",
    isNew: true, createdAt: "2026-02-14" },
  { id: 11, slug: "slim-mesh-silver", title: "Slim Mesh", brand: "Nordic", category: "Classic",
    images: [w11], description: "Ultra-thin Scandinavian minimalism with a Milanese mesh bracelet.",
    features: ["6mm thin case", "Milanese mesh", "Sapphire crystal", "Sweep seconds"],
    specifications: { "Case Diameter": "40mm", "Case Thickness": "6mm", "Crystal": "Sapphire", "Movement": "Swiss Quartz" },
    price: 199, oldPrice: 259, discount: 23, rating: 4.4, reviewsCount: 421, stock: 32, warranty: "2 years",
    color: "Silver / White", strap: "Milanese Mesh", movement: "Swiss Quartz", waterResistance: "3 ATM",
    createdAt: "2025-07-22" },
  { id: 12, slug: "field-bronze-olive", title: "Field Bronze", brand: "Squadron", category: "Sport",
    images: [w12], description: "Military-inspired bronze field watch with a rugged canvas NATO strap.",
    features: ["Bronze case", "NATO strap", "Vintage patina", "38mm case"],
    specifications: { "Case Diameter": "38mm", "Case Thickness": "11mm", "Crystal": "Sapphire", "Movement": "Automatic" },
    price: 349, rating: 4.6, reviewsCount: 87, stock: 11, warranty: "3 years",
    color: "Bronze / Olive", strap: "Canvas NATO", movement: "Automatic", waterResistance: "10 ATM",
    createdAt: "2025-06-30" },
  { id: 13, slug: "moonphase-nocturne", title: "Moonphase Nocturne", brand: "Meridian", category: "Classic",
    images: [w13], description: "Enamel-blue dial with lunar complication — poetry on the wrist.",
    features: ["Moonphase complication", "Enamel dial", "Alligator strap", "Small seconds"],
    specifications: { "Case Diameter": "40mm", "Case Thickness": "10mm", "Crystal": "Sapphire", "Movement": "Automatic" },
    price: 1590, rating: 4.9, reviewsCount: 64, stock: 3, warranty: "5 years",
    color: "Steel / Deep Blue", strap: "Alligator Leather", movement: "Automatic", waterResistance: "3 ATM",
    createdAt: "2025-05-05" },
  { id: 14, slug: "duo-champagne", title: "Duo Champagne", brand: "Regalia", category: "Dress",
    images: [w14], description: "Two-tone steel and gold with a champagne dial — status without excess.",
    features: ["Two-tone finish", "Fluted bezel", "Jubilee bracelet", "Date window"],
    specifications: { "Case Diameter": "41mm", "Case Thickness": "11mm", "Crystal": "Sapphire", "Movement": "Automatic" },
    price: 1149, oldPrice: 1290, discount: 11, rating: 4.7, reviewsCount: 112, stock: 7, warranty: "5 years",
    color: "Two-Tone / Champagne", strap: "Two-Tone Jubilee", movement: "Automatic", waterResistance: "10 ATM",
    createdAt: "2025-09-01" },
  { id: 15, slug: "circuit-panda-race", title: "Circuit Panda", brand: "Meridian", category: "Chronograph",
    images: [w15], description: "Panda-dial racing chronograph with perforated rally strap.",
    features: ["Panda dial", "Chronograph", "Perforated strap", "Tachymeter"],
    specifications: { "Case Diameter": "42mm", "Case Thickness": "12mm", "Crystal": "Sapphire", "Movement": "Quartz Chronograph" },
    price: 489, rating: 4.6, reviewsCount: 74, stock: 13, warranty: "2 years",
    color: "White / Black", strap: "Perforated Leather", movement: "Quartz Chronograph", waterResistance: "10 ATM",
    createdAt: "2026-01-25" },
  { id: 16, slug: "titanium-diver-teal", title: "Titanium Diver", brand: "Nautilus", category: "Diver",
    images: [w16], description: "Ultra-light titanium diver with a striking teal dial and rubber strap.",
    features: ["Titanium case", "300m WR", "Rubber strap", "Ceramic bezel"],
    specifications: { "Case Diameter": "43mm", "Case Thickness": "13mm", "Crystal": "Sapphire", "Movement": "Automatic" },
    price: 899, oldPrice: 1049, discount: 14, rating: 4.8, reviewsCount: 189, stock: 6, warranty: "5 years",
    color: "Titanium / Teal", strap: "Rubber", movement: "Automatic", waterResistance: "30 ATM",
    isNew: true, createdAt: "2026-03-15" },
];

export const brands = Array.from(new Set(products.map((p) => p.brand))).sort();
export const categories: Category[] = ["Dress", "Sport", "Diver", "Chronograph", "Smart", "Classic"];

export const heroImage = "/src/assets/watch-hero.jpg";

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelated(slug: string, limit = 4) {
  const current = getProduct(slug);
  if (!current) return [];
  return products
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}