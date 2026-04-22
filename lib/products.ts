import { supabase } from "./supabase";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  discount_rate?: number; // 例: 0.15 (=15%OFF)
  rating?: number;
  review_count?: number;
  image_url?: string;
  description?: string;
  stock?: number;
  is_new?: boolean;
};

// モックデータ（Phase 1動作確認用。Supabase接続後はDBから取得）
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "クエンチ シャンプー モイスト 1kg",
    brand: "Aujua",
    category: "shampoo",
    price: 5891,
    discount_rate: 0.15,
    rating: 5.4,
    review_count: 123,
    description: "うるおいケアに特化したヘアケアの定番。1Lボトルで詰め替え可能。",
    stock: 25,
  },
  {
    id: "2",
    name: "ポリッシュオイル 150ml",
    brand: "N.",
    category: "oil",
    price: 3179,
    discount_rate: 0.15,
    rating: 5.2,
    review_count: 98,
    description: "天然由来成分でしっとり艶やかな仕上がり。スタイリングからスキンケアまで使える万能オイル。",
    stock: 40,
  },
  {
    id: "3",
    name: "CURL BLOW IRON 黒",
    brand: "ReFa",
    category: "iron",
    price: 25300,
    rating: 5.0,
    review_count: 67,
    description: "リファ独自のキャレクトイオン搭載カールアイロン。ダメージレスで美しいカールを実現。",
    stock: 8,
  },
  {
    id: "4",
    name: "フェリアージュ ハンドクリーム ハピネスムード 30g",
    brand: "Aujua",
    category: "handcream",
    price: 2200,
    rating: 4.8,
    review_count: 42,
    is_new: true,
    description: "オージュアから新登場のハンドクリーム。やさしい香りで気分を上げる新作。",
    stock: 60,
  },
  {
    id: "5",
    name: "アルティール トリートメント 1kg",
    brand: "Aujua",
    category: "treatment",
    price: 14300,
    rating: 4.7,
    review_count: 35,
    description: "オージュアの高級トリートメントライン。集中補修で芯から潤う髪へ。",
    stock: 15,
  },
  {
    id: "6",
    name: "STRAIGHT BLOW IRON 白",
    brand: "ReFa",
    category: "iron",
    price: 23100,
    rating: 4.9,
    review_count: 28,
    is_new: true,
    description: "リファの最新ストレートアイロン。プロ仕様の仕上がり、ご家庭で。",
    stock: 6,
  },
];

export async function getProducts(): Promise<Product[]> {
  if (!supabase) {
    // Supabase未設定時はモックデータを返す
    return mockProducts;
  }
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || mockProducts;
  } catch (err) {
    console.error("Failed to fetch products, using mock data:", err);
    return mockProducts;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!supabase) {
    return mockProducts.find((p) => p.id === id) || null;
  }
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  } catch {
    return mockProducts.find((p) => p.id === id) || null;
  }
}
