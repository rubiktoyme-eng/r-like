import Link from "next/link";
import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts();
  const ranking = products.slice(0, 4);

  return (
    <div>
      {/* ヒーロー */}
      <section className="bg-gradient-to-br from-brand-pink-light via-brand-yellow-light to-brand-teal-light py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block bg-brand-text text-brand-yellow px-4 py-1 rounded text-xs font-bold tracking-widest mb-4">
              FEATURE / 2026 SPRING
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              髪も、肌も。
              <br />
              整う、春の<span className="text-brand-pink">ご褒美</span>。
            </h1>
            <p className="mt-4 text-base font-medium">
              オージュア フェリアージュ 新発売
            </p>
            <Link
              href="/products"
              className="inline-block mt-6 bg-brand-text text-white px-7 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              商品をみる ▶
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="relative h-72">
              <div className="absolute right-20 top-0 w-32 h-64 rounded-xl bg-gradient-to-b from-brand-pink-light to-brand-pink shadow-xl flex items-center justify-center">
                <span className="text-white text-xs tracking-widest">FELIAGE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ランキング */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-brand-pink rounded" />
          <h2 className="text-xl font-bold">ヘアケア人気ランキング</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ranking.map((p, idx) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="block bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition"
            >
              <div className="relative aspect-square bg-gradient-to-br from-brand-pink-pale to-brand-pink-light flex items-center justify-center">
                <span className="absolute top-2 left-2 bg-brand-yellow text-brand-text w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <div className="w-16 h-24 bg-white rounded shadow flex items-center justify-center text-xs text-brand-pink font-bold">
                  {p.brand}
                </div>
              </div>
              <div className="p-3">
                <div className="text-xs text-brand-text-sub">{p.brand}</div>
                <div className="text-sm font-semibold mt-1 line-clamp-2 h-10">
                  {p.name}
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs">
                  <span className="text-brand-yellow">★</span>
                  <span className="font-semibold">{p.rating}</span>
                  <span className="text-brand-text-sub">({p.review_count})</span>
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-bold">¥{p.price.toLocaleString()}</span>
                  {p.discount_rate && (
                    <span className="text-xs text-white bg-brand-orange px-2 py-0.5 rounded font-semibold">
                      {Math.round(p.discount_rate * 100)}%OFF
                    </span>
                  )}
                  {p.is_new && (
                    <span className="text-xs text-white bg-brand-teal px-2 py-0.5 rounded font-semibold">
                      NEW
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 店舗受取バナー */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <div className="bg-gradient-to-br from-brand-teal-light to-white border border-brand-teal rounded-2xl p-6 flex items-center gap-5">
          <div className="text-3xl">📍</div>
          <div className="flex-1">
            <div className="font-bold text-brand-teal-dark">最寄りのRubik&apos;sで受け取り</div>
            <div className="text-xs text-brand-text-sub mt-1">
              大阪・和歌山・奈良 全21店舗から受取店舗が選べます。配送ご希望の方はゆうパックでお届けします。
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
