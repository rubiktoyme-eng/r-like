import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = { params: { id: string } };

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductById(params.id);
  if (!product) return notFound();

  const finalPrice = product.discount_rate
    ? Math.round(product.price * (1 - product.discount_rate))
    : product.price;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link href="/products" className="text-xs text-brand-text-sub hover:underline">
        ← 商品一覧へ戻る
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        {/* 商品画像 */}
        <div className="aspect-square bg-gradient-to-br from-brand-pink-pale to-brand-pink-light rounded-xl flex items-center justify-center">
          <div className="w-32 h-48 bg-white rounded-lg shadow-lg flex items-center justify-center text-sm text-brand-pink font-bold">
            {product.brand}
          </div>
        </div>

        {/* 商品情報 */}
        <div>
          <div className="text-sm text-brand-text-sub">{product.brand}</div>
          <h1 className="text-2xl font-bold mt-2">{product.name}</h1>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-brand-yellow text-lg">★★★★★</span>
            <span className="font-semibold">{product.rating}</span>
            <span className="text-xs text-brand-text-sub">
              ({product.review_count}件のクチコミ)
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            {product.discount_rate && (
              <span className="text-sm text-gray-400 line-through">
                ¥{product.price.toLocaleString()}
              </span>
            )}
            <span className="text-3xl font-bold">
              ¥{finalPrice.toLocaleString()}
            </span>
            {product.discount_rate && (
              <span className="text-sm text-white bg-brand-orange px-2 py-1 rounded font-semibold">
                {Math.round(product.discount_rate * 100)}%OFF
              </span>
            )}
          </div>

          <div className="mt-2 text-xs text-brand-text-sub">税込 / 送料別</div>

          <p className="mt-6 text-sm leading-relaxed">{product.description}</p>

          <div className="mt-6 p-4 bg-brand-teal-light rounded-lg">
            <div className="text-xs font-semibold text-brand-teal-dark mb-1">
              📍 受取・配送について
            </div>
            <div className="text-xs text-brand-text-sub">
              店舗受取（Rubik&apos;s全21店舗）または ゆうパックでの配送が選べます。
              <br />
              在庫: {product.stock}個
            </div>
          </div>

          <button className="mt-6 w-full bg-brand-text text-white py-4 rounded-lg font-bold hover:opacity-90 transition">
            カートに入れる
          </button>
        </div>
      </div>
    </div>
  );
}
