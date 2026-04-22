# R-LIKE EC サイト (Phase 1)

美容室Rubik's運営の美容専売品EC「R-LIKE」の再開発プロジェクト。
makeshopから自社運用への移行を目指しています。

## 構成

- **フレームワーク**: Next.js 14 (App Router) + TypeScript
- **スタイリング**: Tailwind CSS
- **DB・認証・画像**: Supabase
- **ホスティング**: Netlify
- **決済**: GMOイプシロン（Phase 2で実装）
- **配送**: ゆうパック（Phase 2で実装）

## Phase 1 でできること

- ✅ トップページ（ヒーロー、人気ランキング、店舗受取訴求）
- ✅ 商品一覧
- ✅ 商品詳細
- ✅ 共通ヘッダー・フッター
- ⏸️ カート機能（Phase 2予定）
- ⏸️ 決済（Phase 2予定）
- ⏸️ 会員機能（Phase 2予定）
- ⏸️ クチコミ（Phase 3予定）

**Supabase未設定でも動きます**（モックデータで動作）。実DBに繋ぎたい場合は下記の手順を参照してください。

---

## セットアップ手順

### ステップ 1: 開発環境を準備

#### Node.jsのインストール
```bash
# Node.js 18以上が必要
# 確認
node -v
# 18未満ならインストール: https://nodejs.org/
```

### ステップ 2: プロジェクトを起動

このフォルダ（`r-like-app`）で以下を実行：

```bash
# 依存関係をインストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで http://localhost:3000 を開くと、モックデータで動くサイトが表示されます。

この時点で確認できること：
- トップページが表示される
- 「商品をみる」をクリックすると商品一覧へ
- 商品をクリックすると商品詳細へ
- 「カートに入れる」ボタン（まだ動きませんが表示はOK）

---

### ステップ 3: Supabaseと連携（任意・推奨）

実DBに繋ぐ場合の手順です。

#### 3-1. Supabaseアカウント作成

1. https://supabase.com にアクセスし、GitHubアカウント等で登録
2. 新規プロジェクトを作成
   - Name: `r-like`（任意）
   - Database Password: 強固なパスワードを設定（控えておく）
   - Region: `Northeast Asia (Tokyo)`を選択
3. プロジェクト作成完了まで2〜3分待つ

#### 3-2. テーブル作成

1. Supabaseダッシュボードの左メニューから「SQL Editor」を開く
2. 「New query」をクリック
3. このプロジェクトの `supabase/schema.sql` の内容を全てコピーして貼り付け
4. 「Run」をクリック

→ 商品・店舗・注文・クチコミの全テーブルが作成され、店舗マスタの初期データも投入されます。

#### 3-3. 商品データの投入

「Table Editor」から `products` テーブルを開き、商品データを手動で追加するか、CSVインポート機能を使ってください。

または、SQL Editorで以下を実行（`lib/products.ts` のモックデータをDBに反映）：

```sql
INSERT INTO products (name, brand, category, price, discount_rate, rating, review_count, description, stock, is_new) VALUES
('クエンチ シャンプー モイスト 1kg', 'Aujua', 'shampoo', 5891, 0.15, 5.4, 123, 'うるおいケアに特化したヘアケアの定番。', 25, false),
('ポリッシュオイル 150ml', 'N.', 'oil', 3179, 0.15, 5.2, 98, '天然由来成分でしっとり艶やかな仕上がり。', 40, false),
('CURL BLOW IRON 黒', 'ReFa', 'iron', 25300, 0, 5.0, 67, 'リファ独自のキャレクトイオン搭載カールアイロン。', 8, false),
('フェリアージュ ハンドクリーム ハピネスムード 30g', 'Aujua', 'handcream', 2200, 0, 4.8, 42, 'オージュアから新登場のハンドクリーム。', 60, true);
```

#### 3-4. 環境変数を設定

1. Supabaseダッシュボードの「Settings」→「API」を開く
2. 以下の2つの値をコピー：
   - **Project URL**（`NEXT_PUBLIC_SUPABASE_URL`）
   - **anon public** キー（`NEXT_PUBLIC_SUPABASE_ANON_KEY`）

3. プロジェクトルートに `.env.local` ファイルを作成（`.env.local.example` をコピー）：

```bash
cp .env.local.example .env.local
```

4. `.env.local` を編集して上記の値を貼り付け：

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...（長い文字列）
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. 開発サーバーを再起動（Ctrl+Cで止めて再度 `npm run dev`）

→ これで商品データがSupabaseから取得されます。

---

### ステップ 4: Netlifyにデプロイ

#### 4-1. GitHubにコードをプッシュ

```bash
git init
git add .
git commit -m "Initial commit: R-LIKE Phase 1"
# GitHubで新規リポジトリを作成し、URLを取得してから:
git remote add origin <あなたのGitHubリポジトリURL>
git branch -M main
git push -u origin main
```

#### 4-2. Netlifyに連携

1. https://www.netlify.com にアクセス、GitHub連携でログイン
2. 「Add new site」→「Import an existing project」
3. GitHubリポジトリを選択
4. ビルド設定はデフォルトのままでOK（Next.js自動検出）
5. 環境変数を設定:
   - 「Site settings」→「Environment variables」
   - `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` を追加
6. 「Deploy site」をクリック

→ 数分でサイトが公開されます（`xxxxxxxx.netlify.app` のURL）

#### 4-3. 独自ドメインの設定（任意）

「Domain settings」から `r-like.com` を追加できます。
現在makeshopで使っているドメインを移管するタイミングは Phase 4 のmakeshop切り替え時がおすすめです。

---

## ファイル構成

```
r-like-app/
├── app/
│   ├── layout.tsx          # 共通レイアウト
│   ├── page.tsx            # トップページ
│   ├── globals.css         # 共通CSS
│   ├── products/
│   │   ├── page.tsx        # 商品一覧
│   │   └── [id]/
│   │       └── page.tsx    # 商品詳細
│   └── cart/
│       └── page.tsx        # カート（Phase 2予告）
├── components/
│   ├── Header.tsx          # 共通ヘッダー
│   └── Footer.tsx          # 共通フッター
├── lib/
│   ├── supabase.ts         # Supabaseクライアント
│   └── products.ts         # 商品データ取得ロジック
├── supabase/
│   └── schema.sql          # DBスキーマ定義
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── .env.local.example
└── README.md
```

---

## Phase 2 でやること

- カート機能（追加・削除・数量変更）
- 会員登録・ログイン（Supabase Auth）
- チェックアウトフロー（受取方法選択 → 配送先入力 → 決済）
- GMOイプシロン決済連携
- ゆうパック送り状API連携
- 注文確認メール（SendGrid）
- 管理画面（商品登録・注文確認）

---

## Phase 3 でやること

- クチコミ・レビュー機能
- ランキング自動集計
- 特集記事・コラムCMS
- 新商品カレンダー

---

## Phase 4: makeshopから移行

- 既存顧客データのCSVエクスポート → Supabaseインポート
- 商品マスタ669件の移行
- DNS切り替え（r-like.com を新サイトへ）
- makeshop解約

---

## 困ったとき

- **`npm install` でエラー**: Node.jsのバージョンが18以上か確認
- **画面が真っ白**: ブラウザのコンソール（F12）でエラーを確認
- **Supabaseに繋がらない**: `.env.local` の値が正しいか、開発サーバーを再起動したか確認

---

© 2026 R-LIKE | Rubik's Hair Salon Group
