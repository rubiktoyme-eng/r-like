import Link from "next/link";

export default function CartPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">カート</h1>

      <div className="bg-brand-yellow-light border border-brand-yellow rounded-lg p-6 text-center">
        <div className="text-4xl mb-3">🛒</div>
        <div className="font-bold mb-2">
          カート機能はPhase 2で実装予定です
        </div>
        <div className="text-sm text-brand-text-sub mb-4">
          現在Phase 1（商品閲覧機能）の段階です。
          <br />
          カート追加・購入フロー・店舗受取選択・GMOイプシロン決済はPhase 2で実装します。
        </div>
        <Link
          href="/products"
          className="inline-block bg-brand-text text-white px-6 py-2 rounded font-semibold hover:opacity-90"
        >
          商品一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
