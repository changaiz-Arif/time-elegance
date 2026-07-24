import w01 from "@/assets/w01.jpg";
import w02 from "@/assets/w02.jpg";
import w03 from "@/assets/w03.jpg";
import w04 from "@/assets/w04.jpg";
import w05 from "@/assets/w05.jpg";
import w06 from "@/assets/w06.jpg";
import w07 from "@/assets/w07.jpg";
import w08 from "@/assets/w08.jpg";
import w09 from "@/assets/w09.jpg";
import w10 from "@/assets/w10.jpg";
import w11 from "@/assets/w11.jpg";
import w12 from "@/assets/w12.jpg";
import w13 from "@/assets/w13.jpg";
import w14 from "@/assets/w14.jpg";
import w15 from "@/assets/w15.jpg";
import w16 from "@/assets/w16.jpg";

export type Category =
  | "luxury"
  | "dress"
  | "sport"
  | "chronograph"
  | "pilot"
  | "digital"
  | "smart";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  image: string;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  limited?: boolean;
  description: string;
  features: string[];
  specs: {
    caseMaterial: string;
    caseDiameter: string;
    dialColor: string;
    strap: string;
    movement: string;
    waterResistance: string;
    warranty: string;
  };
}

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  { id: "luxury", label: "Luxury", blurb: "Signature pieces for the discerning collector." },
  { id: "dress", label: "Dress", blurb: "Refined silhouettes for formal moments." },
  { id: "sport", label: "Sport & Dive", blurb: "Built to perform on land and underwater." },
  { id: "chronograph", label: "Chronograph", blurb: "Precision timing with multi-dial complications." },
  { id: "pilot", label: "Pilot & Field", blurb: "Rugged tool watches, cockpit-ready." },
  { id: "digital", label: "Digital", blurb: "Modern digital timepieces with heritage design." },
  { id: "smart", label: "Smart", blurb: "Connected watches for the everyday." },
];

export const BRANDS = ["Meridian", "Aurora", "Vanguard", "Chrono Labs", "Nomad", "Pulse"] as const;

export const products: Product[] = [
  { id: "maw-001", slug: "vanguard-abyss-diver", name: "Abyss Diver 300", brand: "Vanguard", category: "sport", price: 42999, oldPrice: 54999, rating: 4.8, reviewsCount: 128, stock: 12, image: w01, featured: true, bestSeller: true, description: "Engineered for the deep. The Abyss Diver 300 combines a scratch-resistant ceramic bezel with a luminous dial for 300m of confident performance.", features: ["Unidirectional ceramic bezel", "Screw-down crown", "Super-LumiNova indexes", "Sapphire crystal"], specs: { caseMaterial: "316L Stainless Steel", caseDiameter: "42mm", dialColor: "Black", strap: "Steel oyster bracelet", movement: "Automatic (MAW-08)", waterResistance: "300m / 30 ATM", warranty: "2 years international" } },
  { id: "maw-002", slug: "chrono-labs-heritage-rose", name: "Heritage Chrono Rose", brand: "Chrono Labs", category: "chronograph", price: 68999, oldPrice: 84999, rating: 4.7, reviewsCount: 96, stock: 7, image: w02, featured: true, newArrival: true, description: "A vintage-inspired chronograph in rose gold with three subdials and a hand-stitched crocodile strap.", features: ["3-register chronograph", "Tachymeter scale", "Domed sapphire", "Genuine crocodile strap"], specs: { caseMaterial: "Rose Gold PVD Stainless", caseDiameter: "41mm", dialColor: "Silver Sunburst", strap: "Brown crocodile leather", movement: "Quartz Chronograph", waterResistance: "50m / 5 ATM", warranty: "2 years international" } },
  { id: "maw-003", slug: "aurora-classique-gold", name: "Classique Gold", brand: "Aurora", category: "dress", price: 129999, oldPrice: 149999, rating: 4.9, reviewsCount: 54, stock: 4, image: w03, featured: true, limited: true, description: "The slimmest silhouette in our collection. A hand-finished yellow gold case and manual-wind movement, made for a lifetime.", features: ["Slim 7mm profile", "Hand-finished case", "Manual-wind", "Sapphire crystal"], specs: { caseMaterial: "18k Yellow Gold Plated", caseDiameter: "38mm", dialColor: "Ivory White", strap: "Black alligator leather", movement: "Manual mechanical", waterResistance: "30m / 3 ATM", warranty: "5 years international" } },
  { id: "maw-004", slug: "meridian-octagon-royal", name: "Octagon Royal Blue", brand: "Meridian", category: "luxury", price: 189999, oldPrice: 219999, rating: 4.9, reviewsCount: 41, stock: 3, image: w04, featured: true, bestSeller: true, limited: true, description: "A statement of horological engineering. Integrated steel bracelet and tapisserie dial in royal blue.", features: ["Integrated steel bracelet", "Tapisserie dial", "Screw-fixed bezel", "Anti-reflective sapphire"], specs: { caseMaterial: "Brushed Stainless Steel", caseDiameter: "41mm", dialColor: "Royal Blue Tapisserie", strap: "Integrated steel", movement: "Automatic (MAW-12)", waterResistance: "100m / 10 ATM", warranty: "3 years international" } },
  { id: "maw-005", slug: "aurora-tank-royal", name: "Tank Royale", brand: "Aurora", category: "dress", price: 74999, rating: 4.6, reviewsCount: 62, stock: 9, image: w05, newArrival: true, description: "A rectangular tank case with blued steel hands — a timeless silhouette for suit and cuff.", features: ["Rectangular case", "Blued steel hands", "Sapphire crystal", "Quick-release strap"], specs: { caseMaterial: "Polished Stainless Steel", caseDiameter: "32mm × 40mm", dialColor: "Silver White", strap: "Black leather", movement: "Swiss Quartz", waterResistance: "30m / 3 ATM", warranty: "2 years international" } },
  { id: "maw-006", slug: "pulse-g-force-tactical", name: "G-Force Tactical", brand: "Pulse", category: "digital", price: 12999, oldPrice: 15999, rating: 4.5, reviewsCount: 214, stock: 32, image: w06, bestSeller: true, description: "Shock-resistant resin case, digital dual-time, stopwatch, and alarm. Built for the outdoors.", features: ["Shock resistant", "Dual time", "Stopwatch", "Alarm", "LED backlight"], specs: { caseMaterial: "Reinforced Resin", caseDiameter: "45mm", dialColor: "Digital LCD", strap: "Black resin", movement: "Digital Quartz", waterResistance: "200m / 20 ATM", warranty: "1 year international" } },
  { id: "maw-007", slug: "pulse-retro-lcd-gold", name: "Retro LCD Gold", brand: "Pulse", category: "digital", price: 8499, oldPrice: 10999, rating: 4.4, reviewsCount: 178, stock: 28, image: w07, description: "A vintage-inspired digital watch with a two-tone stainless bracelet and amber LCD.", features: ["Amber LCD", "Two-tone bracelet", "Chronograph mode", "Alarm"], specs: { caseMaterial: "Two-tone Stainless", caseDiameter: "36mm", dialColor: "Amber LCD", strap: "Two-tone steel bracelet", movement: "Digital Quartz", waterResistance: "50m / 5 ATM", warranty: "1 year international" } },
  { id: "maw-008", slug: "vanguard-marine-blue", name: "Marine Blue Pro", brand: "Vanguard", category: "sport", price: 34999, rating: 4.7, reviewsCount: 156, stock: 18, image: w08, featured: true, description: "A saturated blue dial paired with a rotating dive bezel and steel oyster bracelet.", features: ["120-click bezel", "Applied indexes", "Screw-down crown", "Cyclops magnifier"], specs: { caseMaterial: "316L Stainless Steel", caseDiameter: "40mm", dialColor: "Sunburst Blue", strap: "Steel oyster bracelet", movement: "Automatic", waterResistance: "200m / 20 ATM", warranty: "2 years international" } },
  { id: "maw-009", slug: "nomad-eco-forest", name: "Eco Forest Titanium", brand: "Nomad", category: "sport", price: 44999, rating: 4.6, reviewsCount: 84, stock: 11, image: w09, newArrival: true, description: "Titanium case, solar-powered movement, and a deep green sunburst dial. Lightweight for daily wear.", features: ["Solar-powered", "Lightweight titanium", "10-month reserve", "Anti-reflective sapphire"], specs: { caseMaterial: "Grade 2 Titanium", caseDiameter: "42mm", dialColor: "Forest Green", strap: "Titanium bracelet", movement: "Solar Quartz", waterResistance: "100m / 10 ATM", warranty: "3 years international" } },
  { id: "maw-010", slug: "aurora-minima-tan", name: "Minima Tan", brand: "Aurora", category: "dress", price: 18999, oldPrice: 22999, rating: 4.4, reviewsCount: 92, stock: 22, image: w10, description: "Scandinavian minimalism — thin case, unmarked dial, and a hand-cut tan Italian leather strap.", features: ["Slim 8mm case", "Unmarked dial", "Italian leather", "Quick-release pins"], specs: { caseMaterial: "Polished Stainless Steel", caseDiameter: "40mm", dialColor: "Pure White", strap: "Tan Italian leather", movement: "Japanese Quartz", waterResistance: "30m / 3 ATM", warranty: "2 years international" } },
  { id: "maw-011", slug: "aurora-mesh-noir", name: "Mesh Noir Rose", brand: "Aurora", category: "dress", price: 21999, rating: 4.5, reviewsCount: 68, stock: 15, image: w11, newArrival: true, description: "Rose gold case with a milanese mesh bracelet and a jet black minimalist dial.", features: ["Milanese mesh", "Sapphire crystal", "Slim profile", "Magnetic closure"], specs: { caseMaterial: "Rose Gold PVD", caseDiameter: "38mm", dialColor: "Black Matte", strap: "Rose gold milanese mesh", movement: "Japanese Quartz", waterResistance: "50m / 5 ATM", warranty: "2 years international" } },
  { id: "maw-012", slug: "chrono-labs-orbit-orange", name: "Orbit Chrono Orange", brand: "Chrono Labs", category: "chronograph", price: 29999, oldPrice: 36999, rating: 4.6, reviewsCount: 141, stock: 14, image: w12, bestSeller: true, description: "Aggressive sports chronograph with contrast orange accents and a comfortable rubber strap.", features: ["3-register chronograph", "Tachymeter bezel", "60-min stopwatch", "Rubber strap"], specs: { caseMaterial: "Stainless Steel", caseDiameter: "44mm", dialColor: "Matte Black", strap: "Black rubber", movement: "Quartz Chronograph", waterResistance: "100m / 10 ATM", warranty: "2 years international" } },
  { id: "maw-013", slug: "meridian-classique-silver", name: "Classique Silver", brand: "Meridian", category: "dress", price: 32999, rating: 4.5, reviewsCount: 47, stock: 10, image: w13, description: "Silver sunburst dial, sharp applied markers, and a supple black leather strap.", features: ["Slim case", "Sunburst dial", "Applied markers", "Sapphire crystal"], specs: { caseMaterial: "Polished Stainless Steel", caseDiameter: "40mm", dialColor: "Silver Sunburst", strap: "Black smooth leather", movement: "Swiss Quartz", waterResistance: "50m / 5 ATM", warranty: "2 years international" } },
  { id: "maw-014", slug: "nomad-aviator-cream", name: "Aviator Cream Field", brand: "Nomad", category: "pilot", price: 26999, oldPrice: 32999, rating: 4.7, reviewsCount: 103, stock: 16, image: w14, featured: true, description: "A cockpit-ready field watch with large arabic numerals and a rugged leather aviator strap.", features: ["Highly legible dial", "Vintage cream lume", "Brushed steel case", "Leather aviator strap"], specs: { caseMaterial: "Brushed Stainless Steel", caseDiameter: "42mm", dialColor: "Vintage Cream", strap: "Brown leather aviator", movement: "Automatic", waterResistance: "100m / 10 ATM", warranty: "3 years international" } },
  { id: "maw-015", slug: "pulse-smart-active", name: "Smart Active", brand: "Pulse", category: "smart", price: 19999, oldPrice: 24999, rating: 4.3, reviewsCount: 187, stock: 25, image: w15, newArrival: true, description: "Track your workouts, heart rate, and notifications with a bright always-on display.", features: ["Heart-rate monitor", "Sleep tracking", "GPS routes", "10-day battery"], specs: { caseMaterial: "Aluminium Alloy", caseDiameter: "44mm", dialColor: "AMOLED", strap: "Silicone sport band", movement: "Digital (Rechargeable)", waterResistance: "50m / 5 ATM", warranty: "1 year international" } },
  { id: "maw-016", slug: "meridian-skeleton-royal", name: "Skeleton Royal", brand: "Meridian", category: "luxury", price: 92999, oldPrice: 109999, rating: 4.8, reviewsCount: 39, stock: 5, image: w16, featured: true, limited: true, description: "An open-heart automatic showcasing its mechanical soul, paired with a rich royal blue strap.", features: ["Open-heart automatic", "Exhibition caseback", "42-hour reserve", "Anti-reflective sapphire"], specs: { caseMaterial: "Polished Stainless Steel", caseDiameter: "41mm", dialColor: "Silver Skeleton", strap: "Royal blue crocodile", movement: "Automatic (MAW-21)", waterResistance: "50m / 5 ATM", warranty: "3 years international" } },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  return products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, limit);
}
