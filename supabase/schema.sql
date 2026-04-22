-- =========================================
-- R-LIKE データベーススキーマ (Phase 1)
-- 17店舗の実データ込み / Supabase SQL Editor で実行
-- =========================================

-- 商品マスタ
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  discount_rate REAL DEFAULT 0,
  rating REAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  image_url TEXT,
  description TEXT,
  stock INTEGER DEFAULT 0,
  is_new BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 店舗マスタ（Rubik's全17店舗）
CREATE TABLE IF NOT EXISTS stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  area TEXT NOT NULL,
  zip TEXT,
  prefecture TEXT,
  city TEXT,
  address_line TEXT,
  building TEXT,
  phone TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 会員
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT,
  phone TEXT,
  default_store_id UUID REFERENCES stores(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 注文
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  delivery_method TEXT NOT NULL,
  pickup_store_id UUID REFERENCES stores(id),
  shipping_address JSONB,
  total_amount INTEGER NOT NULL,
  shipping_fee INTEGER DEFAULT 0,
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  order_status TEXT DEFAULT 'received',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  user_id UUID NOT NULL REFERENCES profiles(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  image_urls TEXT[],
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published products" ON products
  FOR SELECT USING (is_published = true);

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active stores" ON stores
  FOR SELECT USING (is_active = true);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view approved reviews" ON reviews
  FOR SELECT USING (is_approved = true OR auth.uid() = user_id);
CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Rubik's全17店舗（CUBE実データ）
INSERT INTO stores (name, area, zip, prefecture, city, address_line, building, phone, display_order) VALUES
  ('梅田茶屋町店', 'OSAKA', '530-0013', '大阪府', '大阪市北区茶屋町', '1-52', 'コモドビル9F', '06-6485-3122', 1),
  ('Grand Link', 'OSAKA', '530-0012', '大阪府', '大阪市北区芝田', '1-10-10', '芝田グランドビル1F', '06-4300-6649', 2),
  ('難波', 'OSAKA', '556-0011', '大阪府', '大阪市浪速区', '難波3-4-42', '', '06-6643-6200', 3),
  ('御堂筋店', 'OSAKA', '542-0071', '大阪府', '大阪市中央区', '道頓堀2-1-1', '9階', '06-6211-6200', 4),
  ('心斎橋店', 'OSAKA', '542-0085', '大阪府', '大阪市心斎橋筋', '1-5-3', 'THE ATRIUM 2F', '06-6484-5886', 5),
  ('京橋店', 'OSAKA', '534-0024', '大阪府', '大阪市都島区東野田2丁目', '9-23-506', '晃進ビル5F', '06-4800-3400', 6),
  ('阿倍野店', 'OSAKA', '545-0053', '大阪府', '大阪市阿倍野区', '松崎町2-4-15', '阿倍野イトウビル2F', '06-6622-5588', 7),
  ('ルービック×バランス 天王寺', 'OSAKA', '545-0052', '大阪府', '大阪市阿倍野区阿倍野筋', '1-3-15', '阿倍野共同ビル6F', '06-6654-6998', 8),
  ('BALANCE 天王寺店', 'OSAKA', '545-0052', '大阪府', '大阪市阿倍野筋', '1-3-15', '阿倍野共同ビル6F', '06-6654-6998', 9),
  ('イケパラ', 'OSAKA', '545-0052', '大阪府', '大阪市阿倍野区阿倍野筋', '1-5-36', '阿倍野センタービルB2F', '06-6630-7277', 10),
  ('江坂店', 'OSAKA', '564-0063', '大阪府', '吹田市江坂町', '1-4-21', 'セレニテ江坂ミラク101号室', '06-4798-5131', 11),
  ('豊中店', 'OSAKA', '560-0021', '大阪府', '豊中市本町', '1-10-10', '杉山ビル1F', '06-4865-9090', 12),
  ('枚方店', 'OSAKA', '573-0031', '大阪府', '枚方市岡本町', '4-10', '井川ビル二階', '072-846-1000', 13),
  ('ルービック高槻', 'OSAKA', '569-0802', '大阪府', '高槻市北園町', '13-18', '', '072-686-1155', 14),
  ('なかもず店', 'OSAKA', '591-8023', '大阪府', '堺市北区中百舌鳥町', '2-299-3', 'プラスビル2F', '072-275-8015', 15),
  ('和歌山', 'WAKAYAMA', '640-8323', '和歌山県', '和歌山市太田', '1-5-30', '', '073-475-6770', 16),
  ('Rubik''s和歌山2nd', 'WAKAYAMA', '591-8329', '和歌山県', '和歌山市田中町', '5-3-3', '東新ビル2F', '073-499-1311', 17);

-- 商品サンプル6件
INSERT INTO products (name, brand, category, price, discount_rate, rating, review_count, description, stock, is_new) VALUES
  ('クエンチ シャンプー モイスト 1kg', 'Aujua', 'shampoo', 5891, 0.15, 5.4, 123, 'うるおいケアに特化したヘアケアの定番。1Lボトルで詰め替え可能。', 25, false),
  ('ポリッシュオイル 150ml', 'N.', 'oil', 3179, 0.15, 5.2, 98, '天然由来成分でしっとり艶やかな仕上がり。スタイリングからスキンケアまで使える万能オイル。', 40, false),
  ('CURL BLOW IRON 黒', 'ReFa', 'iron', 25300, 0, 5.0, 67, 'リファ独自のキャレクトイオン搭載カールアイロン。ダメージレスで美しいカールを実現。', 8, false),
  ('フェリアージュ ハンドクリーム ハピネスムード 30g', 'Aujua', 'handcream', 2200, 0, 4.8, 42, 'オージュアから新登場のハンドクリーム。やさしい香りで気分を上げる新作。', 60, true),
  ('アルティール トリートメント 1kg', 'Aujua', 'treatment', 14300, 0, 4.7, 35, 'オージュアの高級トリートメントライン。集中補修で芯から潤う髪へ。', 15, false),
  ('STRAIGHT BLOW IRON 白', 'ReFa', 'iron', 23100, 0, 4.9, 28, 'リファの最新ストレートアイロン。プロ仕様の仕上がり、ご家庭で。', 6, true);
