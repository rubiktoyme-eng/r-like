import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="bg-brand-text text-white text-xs text-center py-2 px-4">
        ＼Rubik&apos;s全21店舗で受け取り／
        <span className="text-brand-yellow font-bold ml-2">＋会員様5%OFF★</span>
      </div>
      <header className="bg-white border-b border-gray-100 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold tracking-widest">
            R-LIKE
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/products">カテゴリ</Link>
            <Link href="/products?type=brand">ブランド</Link>
            <Link href="/products?sort=ranking">ランキング</Link>
            <span className="text-brand-orange font-bold">SALE</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative text-brand-text hover:text-brand-pink transition"
            aria-label="カート"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h18l-2 11a2 2 0 01-2 2H7a2 2 0 01-2-2L3 6z" />
              <circle cx="9" cy="22" r="1.5" fill="currentColor" />
              <circle cx="17" cy="22" r="1.5" fill="currentColor" />
            </svg>
          </Link>
        </div>
      </header>
    </>
  );
}
