import Link from "next/link";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-brand-pink rounded" />
        <h1 className="text-xl font-bold">商品一覧</h1>
        <span className="text-xs text-brand-text-sub">全{products.length}件</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="block bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition"
          >
            <div className="aspect-square bg-gradient-to-br from-brand-pink-pale to-brand-pink-light flex items-center justify-center">
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
    </div>
  );
}
