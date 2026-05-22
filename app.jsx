/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakToggle */

const { useState, useEffect, useMemo, useCallback } = React;

// =============================================================
// DATA — todos os produtos seguem o padrão: images[0] = costas, images[1] = frente
// =============================================================

const FRENTE = "assets/products/tee-frente.jpg";

const PRODUCTS = [
{
  id: "p-coelhos-neon",
  name: "Camiseta Coelhos Neon",
  sku: "DB.TS.06",
  images: ["assets/products/tee-coelhos-neon.jpg", FRENTE],
  price: 239,
  oldPrice: null,
  badge: "DROP 02",
  badgeStyle: "red",
  sizes: ["P", "M", "G", "GG"],
  sold: [],
  category: "Camisetas",
  color: "Preto",
  description: "Estampa coelhos sob luz térmica nas costas, monograma DB embaixo. Algodão pesado 230g, modelagem oversized. Tiragem de 80 peças."
},
{
  id: "p-sintetizador",
  name: "Camiseta Sintetizador",
  sku: "DB.TS.07",
  images: ["assets/products/tee-sintetizador.jpg", FRENTE],
  price: 249,
  oldPrice: null,
  badge: "NOVO",
  badgeStyle: "white",
  sizes: ["P", "M", "G", "GG"],
  sold: ["P"],
  category: "Camisetas",
  color: "Preto",
  description: "Colagem de sintetizador, olho e retrato em halftone. Costura reforçada na gola, gramatura 230g, oversized. Edição numerada."
},
{
  id: "p-cinema",
  name: "Camiseta Cinema",
  sku: "DB.TS.08",
  images: ["assets/products/tee-cinema.jpg", FRENTE],
  price: 239,
  oldPrice: null,
  badge: "NOVO",
  badgeStyle: "white",
  sizes: ["P", "M", "G", "GG"],
  sold: [],
  category: "Camisetas",
  color: "Preto",
  description: "Duas figuras cinematográficas nas costas, monograma centralizado. Algodão pesado, caimento oversized, gola dupla."
},
{
  id: "p-spray",
  name: "Camiseta Spray Floral",
  sku: "DB.TS.03",
  images: ["assets/products/tee-flores.jpg", FRENTE],
  price: 229,
  oldPrice: null,
  badge: null,
  sizes: ["P", "M", "G", "GG"],
  sold: ["GG"],
  category: "Camisetas",
  color: "Preto",
  description: "Spray floral em vermelho e azul, círculo encapsulado nas costas. Tecido pesado, lavagem stone, oversized."
},
{
  id: "p-imagem",
  name: "Camiseta Vermelho",
  sku: "DB.TS.02",
  images: ["assets/products/tee-imagem.jpg", FRENTE],
  price: 239,
  oldPrice: null,
  badge: null,
  sizes: ["P", "M", "G", "GG"],
  sold: [],
  category: "Camisetas",
  color: "Preto",
  description: "Cena em câmera térmica nas costas, sobreposição em vermelho. Gola reforçada, modelagem oversized, gramatura 230g."
},
{
  id: "p-coelhos-pb",
  name: "Camiseta Coelhos Preto e Branco",
  sku: "DB.TS.05",
  images: ["assets/products/tee-coelhos-pb.jpg", FRENTE],
  price: 229,
  oldPrice: null,
  badge: null,
  sizes: ["P", "M", "G", "GG"],
  sold: [],
  category: "Camisetas",
  color: "Preto",
  description: "Versão preto e branco da estampa coelhos. Mesma modelagem oversized da Drop 02. Algodão pesado 230g."
},
{
  id: "p-lirio",
  name: "Camiseta Lírio",
  sku: "DB.TS.01",
  images: ["assets/products/tee-lirio.png", FRENTE],
  price: 219,
  oldPrice: 269,
  badge: "OUTLET",
  badgeStyle: "outline",
  sizes: ["P", "M", "G", "GG"],
  sold: ["P", "M"],
  category: "Camisetas",
  color: "Preto",
  description: "Lírio esfumaçado em escala de cinza. Última cápsula da Drop 01, restoque limitado."
},
{
  id: "p-essential",
  name: "Camiseta Essencial Monograma",
  sku: "DB.TS.09",
  images: ["assets/products/tee-essential.jpg", FRENTE],
  price: 189,
  oldPrice: null,
  badge: "ESSENCIAL",
  badgeStyle: "white",
  sizes: ["P", "M", "G", "GG"],
  sold: [],
  category: "Essenciais",
  color: "Preto",
  description: "Peça base da marca, monograma DB no peito e nas costas. Algodão pesado, fica em rotação permanente."
}];


const CATEGORIES = [
{ id: "all", label: "Tudo", count: PRODUCTS.length },
{ id: "Camisetas", label: "Camisetas", count: PRODUCTS.filter((p) => p.category === "Camisetas").length },
{ id: "Essenciais", label: "Essenciais", count: PRODUCTS.filter((p) => p.category === "Essenciais").length },
{ id: "moletons", label: "Moletons", count: 0 },
{ id: "calcas", label: "Calças", count: 0 },
{ id: "acessorios", label: "Acessórios", count: 0 }];


const NAV_ITEMS = [
{ id: "loja", label: "Loja", href: "#loja" },
{ id: "drop", label: "Drop 02", href: "#drop" },
{ id: "lookbook", label: "Lookbook", href: "#lookbook" },
{ id: "manifesto", label: "Manifesto", href: "#manifesto" },
{ id: "contato", label: "Contato", href: "#contato" }];


const LOOKBOOK_TILES = [
{ img: "assets/products/tee-coelhos-neon.jpg", num: "01 / 04", title: "Térmico", productId: "p-coelhos-neon" },
{ img: "assets/products/tee-sintetizador.jpg", num: "02 / 04", title: "Sintetizador", productId: "p-sintetizador" },
{ img: "assets/products/tee-flores.jpg", num: "03 / 04", title: "Spray", productId: "p-spray" },
{ img: "assets/products/tee-cinema.jpg", num: "04 / 04", title: "Cinema", productId: "p-cinema" }];


const IG_TILES = [
"assets/products/tee-coelhos-neon.jpg",
"assets/products/tee-sintetizador.jpg",
"assets/products/tee-imagem.jpg",
"assets/products/tee-cinema.jpg",
"assets/products/tee-coelhos-pb.jpg",
"assets/products/tee-flores.jpg"];


// =============================================================
// TWEAK DEFAULTS
// =============================================================

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#e1251b",
  "showMarquee": true,
  "gridDensity": "4",
  "heroImage": "neon"
} /*EDITMODE-END*/;

// =============================================================
// UTILS
// =============================================================

const fmtBRL = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useLockBody(locked) {
  useEffect(() => {
    if (locked) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {document.body.style.overflow = prev;};
    }
  }, [locked]);
}

// =============================================================
// ICONS
// =============================================================

const Icon = {
  Search: () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>,

  Bag: () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <path d="M5 7h14l-1.2 13.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 7z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>,

  Arrow: () =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>,

  ArrowUp: () =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>,

  ArrowLeft: () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>,

  ArrowRight: () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>,

  Close: () =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>,

  Plus: () =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>,

  Minus: () =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /></svg>

};

// =============================================================
// MARQUEE
// =============================================================

function Marquee() {
  const items = [
  <>FRETE GRÁTIS PARA TODO BRASIL ACIMA DE <b>R$ 350</b></>,
  <><b>DROP 02</b> DISPONÍVEL AGORA</>,
  <>PARCELE EM ATÉ <b>6X</b> SEM JUROS</>,
  <>FEITO EM <b>NOVA FRIBURGO</b> RJ</>,
  <>EDIÇÃO LIMITADA <b>NUMERADA</b></>];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items, ...items, ...items].map((it, i) =>
        <span key={i}>{it}</span>
        )}
      </div>
    </div>);

}

// =============================================================
// NAV
// =============================================================

function Nav({ onCart, cartCount, onMenu }) {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <div className="nav-side left">
          <button className="burger" onClick={onMenu} aria-label="Abrir menu">
            <span></span><span></span><span></span>
          </button>
        </div>
        <a href="#top" className="nav-logo" aria-label="DOBÊ">
          <span className="nav-logo-img">
            <img src="assets/logo.png" alt="" />
          </span>
          <span className="nav-logo-text">DOBÊ</span>
        </a>
        <div className="nav-side right">
          <button className="nav-icon nav-cart" onClick={onCart} aria-label={`Sacola (${cartCount})`}>
            <Icon.Bag />
            <span className={`nav-cart-count${cartCount > 0 ? " on" : ""}`}>{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>);

}

function MobileMenu({ open, onClose }) {
  useLockBody(open);
  return (
    <div className={`mobile-menu${open ? " open" : ""}`}>
      <div className="mobile-menu-head">
        <a href="#top" className="nav-logo" onClick={onClose}>
          <img src="assets/logo.png" alt="DOBÊ" />
          DOBÊ
        </a>
        <button className="nav-icon" onClick={onClose} aria-label="Fechar"><Icon.Close /></button>
      </div>
      <div className="mobile-menu-list">
        {NAV_ITEMS.map((n, i) =>
        <a key={n.id} href={n.href} className="mobile-menu-item" onClick={onClose}>
            <span>{n.label}</span>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
          </a>
        )}
      </div>
      <div className="mobile-menu-foot">
        <div className="row"><a href="#">Instagram</a><a href="#">TikTok</a></div>
        <div className="row" style={{ color: "var(--fg-dimmer)" }}>Nova Friburgo · RJ</div>
      </div>
    </div>);

}

// =============================================================
// HERO
// =============================================================

function Hero({ heroImage }) {
  const images = {
    neon: { src: "assets/products/tee-coelhos-neon.jpg", caption: "Coelhos Neon" },
    sintetizador: { src: "assets/products/tee-sintetizador.jpg", caption: "Sintetizador" },
    cinema: { src: "assets/products/tee-cinema.jpg", caption: "Cinema" },
    spray: { src: "assets/products/tee-flores.jpg", caption: "Spray Floral" }
  };
  const cur = images[heroImage] || images.neon;
  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <span className="dot"></span>
              <span>DROP 02 · NOVA FRIBURGO · RJ</span>
            </div>
            <div className="hero-logo-large">
              <img src="assets/logo.png" alt="DOBÊ" />
            </div>
            <div className="hero-sub">
              <p>
                <b>DOBÊ</b> vem da serra do Rio. Camisetas pesadas,
                modelagem oversized, cápsulas curtas e numeradas.
                Cada peça tem código próprio. Acabou, acabou.
              </p>
            </div>
            <div className="hero-cta">
              <a href="#loja" className="btn btn-primary">
                Ver o drop
                <span className="arrow"><Icon.Arrow /></span>
              </a>
              <a href="#manifesto" className="btn btn-ghost">
                Manifesto
              </a>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-image">
              <img src={cur.src} alt="DOBÊ Drop 02" />
              <div className="hero-image-meta">
                <span className="tag"><b>NEW</b> · {cur.caption}</span>
                <span className="tag">FRIBURGO · RJ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>);

}

// =============================================================
// DROP BANNER
// =============================================================

function DropBanner() {
  const items = [
  "DROP 02",
  "OUTONO 26",
  "EDIÇÃO LIMITADA",
  "NUMERADA",
  "FRIBURGO RJ"];

  const tape =
  <>
      {items.map((t, i) =>
    <span key={i}>
          {t === "EDIÇÃO LIMITADA" || t === "FRIBURGO RJ" ?
      <em>{t}</em> :
      t}
        </span>
    )}
    </>;

  return (
    <section className="drop-banner" id="drop">
      <div className="drop-banner-track">
        {Array.from({ length: 6 }).map((_, i) => <React.Fragment key={i}>{tape}</React.Fragment>)}
      </div>
    </section>);

}

// =============================================================
// PRODUCT CARD
// =============================================================

function Product({ p, onOpen, onAdd }) {
  const [size, setSize] = useState(p.sizes.find((s) => !p.sold.includes(s)));
  return (
    <article className="product reveal" onClick={() => onOpen(p)}>
      <div className="product-media">
        <img src={p.images[0]} alt={`${p.name} costas`} loading="lazy" />
        {p.images[1] &&
        <img className="alt-img-cover" src={p.images[1]} alt={`${p.name} frente`} loading="lazy" />
        }
        {p.badge &&
        <span className={`product-badge ${p.badgeStyle === "red" ? "red" : p.badgeStyle === "outline" ? "outline" : ""}`}>
            {p.badge}
          </span>
        }
        <div className="product-quick">
          <button onClick={(e) => {e.stopPropagation();onAdd(p, size);}}>
            + Sacola · {size}
          </button>
        </div>
        <div className="product-flip">
          <span>01 / 02</span>
        </div>
      </div>
      <div className="product-body">
        <div className="product-meta">
          <span>{p.sku}</span>
          <span>{p.color}</span>
        </div>
        <div className="product-name">{p.name}</div>
        <div className="product-foot">
          <div className="product-price">
            {p.oldPrice && <s>{fmtBRL(p.oldPrice)}</s>}
            {fmtBRL(p.price)}
          </div>
          <div className="product-sizes">
            {p.sizes.map((s) =>
            <button
              key={s}
              className={`product-size${p.sold.includes(s) ? " sold" : ""}`}
              style={size === s && !p.sold.includes(s) ? { color: "var(--fg)", borderColor: "var(--fg)" } : {}}
              onClick={(e) => {e.stopPropagation();if (!p.sold.includes(s)) setSize(s);}}
              disabled={p.sold.includes(s)}>
              
                {s}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>);

}

// =============================================================
// PRODUCT MODAL — gallery + details
// =============================================================

function ProductModal({ product, onClose, onAdd }) {
  const [idx, setIdx] = useState(0);
  const [size, setSize] = useState(product ? product.sizes.find((s) => !product.sold.includes(s)) : null);

  useEffect(() => {
    if (product) {
      setIdx(0);
      setSize(product.sizes.find((s) => !product.sold.includes(s)));
    }
  }, [product]);

  useLockBody(!!product);

  useEffect(() => {
    if (!product) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => Math.min(product.images.length - 1, i + 1));
      if (e.key === "ArrowLeft") setIdx((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  if (!product) return null;
  const total = product.images.length;
  const labels = ["Costas", "Frente"];

  return (
    <div className="pdp-back" onClick={onClose}>
      <div className="pdp" onClick={(e) => e.stopPropagation()}>
        <button className="pdp-close" onClick={onClose} aria-label="Fechar"><Icon.Close /></button>

        <div className="pdp-gallery">
          <div className="pdp-thumbs">
            {product.images.map((src, i) =>
            <button
              key={i}
              className={`pdp-thumb${i === idx ? " on" : ""}`}
              onClick={() => setIdx(i)}>
              
                <img src={src} alt="" />
                <span>{labels[i] || `0${i + 1}`}</span>
              </button>
            )}
          </div>
          <div className="pdp-main">
            <img src={product.images[idx]} alt={product.name} />
            <div className="pdp-main-meta">
              <span className="mono">{labels[idx]} · {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            </div>
            <button
              className="pdp-arrow left"
              onClick={() => setIdx((i) => (i - 1 + total) % total)}
              aria-label="Anterior">
              <Icon.ArrowLeft /></button>
            <button
              className="pdp-arrow right"
              onClick={() => setIdx((i) => (i + 1) % total)}
              aria-label="Próxima">
              <Icon.ArrowRight /></button>
          </div>
        </div>

        <div className="pdp-info">
          <div className="pdp-meta">
            <span>{product.sku}</span>
            <span>{product.color}</span>
          </div>
          <h2 className="pdp-name">{product.name}</h2>
          <div className="pdp-price">
            {product.oldPrice && <s>{fmtBRL(product.oldPrice)}</s>}
            {fmtBRL(product.price)}
          </div>
          <p className="pdp-desc">{product.description}</p>

          <div className="pdp-section">
            <div className="label">Tamanho</div>
            <div className="pdp-sizes">
              {product.sizes.map((s) =>
              <button
                key={s}
                className={`pdp-size${size === s ? " on" : ""}${product.sold.includes(s) ? " sold" : ""}`}
                disabled={product.sold.includes(s)}
                onClick={() => !product.sold.includes(s) && setSize(s)}>
                
                  {s}
                </button>
              )}
            </div>
            <a href="#" className="mono pdp-link">Guia de tamanhos</a>
          </div>

          <div className="pdp-actions">
            <button
              className="btn btn-primary"
              style={{ justifyContent: "center", flex: 1 }}
              onClick={() => {onAdd(product, size);onClose();}}
              disabled={!size}>
              
              Adicionar à sacola · {fmtBRL(product.price)}
            </button>
          </div>

          <ul className="pdp-feats">
            <li><span className="mono">01</span>Algodão pesado 230g</li>
            <li><span className="mono">02</span>Modelagem oversized</li>
            <li><span className="mono">03</span>Estampa em silk de alta densidade</li>
            <li><span className="mono">04</span>Produzido em Nova Friburgo RJ</li>
          </ul>
        </div>
      </div>
    </div>);

}

// =============================================================
// FEATURED + CATALOG
// =============================================================

function FeaturedSection({ onAdd, onOpen, density }) {
  return (
    <section className="wrap" id="loja">
      <div className="section-head">
        <div className="left">
          <span className="mono">01 / Drop 02</span>
          <h2>Em <em>destaque</em></h2>
        </div>
        <div className="right">
          <a href="#catalogo" className="btn btn-ghost">Ver catálogo <Icon.Arrow /></a>
        </div>
      </div>
      <div className={`product-grid${density === "3" ? " three" : ""}`}>
        {PRODUCTS.slice(0, density === "3" ? 3 : 4).map((p) =>
        <Product key={p.id} p={p} onAdd={onAdd} onOpen={onOpen} />
        )}
      </div>
    </section>);

}

function Catalog({ onAdd, onOpen }) {
  const [cat, setCat] = useState("all");
  const filtered = useMemo(
    () => cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat),
    [cat]
  );
  return (
    <section className="wrap" id="catalogo" style={{ marginTop: 80 }}>
      <div className="section-head">
        <div className="left">
          <span className="mono">02 / Catálogo</span>
          <h2>Toda a <em>coleção</em></h2>
        </div>
        <div className="right">
          <span className="mono" style={{ color: "var(--fg-dim)" }}>{filtered.length} peças</span>
        </div>
      </div>
      <div className="filters">
        {CATEGORIES.map((c) =>
        <button
          key={c.id}
          className={`filter${cat === c.id ? " active" : ""}`}
          onClick={() => c.count > 0 && setCat(c.id)}
          disabled={c.count === 0}
          style={c.count === 0 ? { opacity: 0.4, cursor: "not-allowed" } : {}}>
          
            {c.label}<span className="count">[{String(c.count).padStart(2, "0")}]</span>
          </button>
        )}
      </div>
      <div className="product-grid">
        {filtered.map((p) => <Product key={p.id} p={p} onAdd={onAdd} onOpen={onOpen} />)}
        {filtered.length === 0 &&
        <div style={{ padding: 60, gridColumn: "1 / -1", textAlign: "center", color: "var(--fg-dim)" }}>
            Em breve.
          </div>
        }
      </div>
    </section>);

}

// =============================================================
// LOOKBOOK
// =============================================================

function Lookbook({ onOpen }) {
  const findP = (id) => PRODUCTS.find((p) => p.id === id);
  return (
    <section className="wrap" id="lookbook">
      <div className="section-head">
        <div className="left">
          <span className="mono">03 / Lookbook</span>
          <h2>Drop <em>02</em></h2>
        </div>
        <div className="right">
          <span className="mono" style={{ color: "var(--fg-dim)" }}>Friburgo · Outono 26</span>
        </div>
      </div>
      <div className="lookbook">
        {LOOKBOOK_TILES.map((l, i) =>
        <div key={i} className="look-tile reveal" onClick={() => l.productId && onOpen(findP(l.productId))}>
            <img src={l.img} alt={l.title} loading="lazy" />
            <div className="look-tile-meta">
              <span className="num">{l.num}</span>
              <h3>{l.title}</h3>
            </div>
          </div>
        )}
      </div>
    </section>);

}

// =============================================================
// MANIFESTO
// =============================================================

function Manifesto() {
  return (
    <section className="wrap" id="manifesto">
      <div className="manifesto">
        <div className="manifesto-left">
          <span className="mono">04 / Manifesto</span>
          <h2>Da serra <em>pra rua.</em></h2>
          <div className="indicator" style={{ width: "44px", height: "6px" }}>
            <i className="on"></i><i className="on"></i><i className="on"></i><i></i><i></i>
          </div>
        </div>
        <div className="manifesto-right">
          <p>
            <b>DOBÊ</b> nasceu em Nova Friburgo, no meio da serra do Rio. Começou em 2016 como um projeto entre amigos, cansados de
            ver as mesmas peças genéricas em todo mundo.
          </p>
          <p>
            Cada drop é curto, numerado e nunca repete. A modelagem
            é pesada, a estampa é nossa, e a peça sai do galpão pronta
            para aguentar pista, ônibus, chuva e o que mais vier.
          </p>
          <div className="pull">
            "Não é estilo. É <em style={{ fontStyle: "normal", color: "var(--accent)" }}>PRESENÇA</em>."
          </div>
          <p>
            Trabalhamos com confecções da região, em produção curta. Cada
            peça tem código próprio. Acabou, acabou.
          </p>
        </div>
      </div>
    </section>);

}

// =============================================================
// NEWSLETTER
// =============================================================

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="newsletter" id="contato">
      <div className="wrap newsletter-inner">
        <div>
          <span className="mono" style={{ color: "var(--fg-dim)" }}>05 / Lista</span>
          <h2 style={{ marginTop: 12 }}>Entre na <em>lista.</em></h2>
          <p>
            Quem está na lista recebe os drops antes. Sem spam, só o aviso
            quando algo novo cai.
          </p>
        </div>
        <div>
          {!sent ?
          <>
              <form
              onSubmit={(e) => {e.preventDefault();if (email.includes("@")) setSent(true);}}>
              
                <input
                type="email"
                required
                placeholder="seu@email.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              
                <button type="submit">Entrar</button>
              </form>
              <div className="agree">
                <input type="checkbox" id="agree" defaultChecked />
                <label htmlFor="agree">Aceito receber emails da DOBÊ</label>
              </div>
            </> :

          <div className="ok-state">
              Pronto. Você está dentro.
            </div>
          }
        </div>
      </div>
    </section>);

}

// =============================================================
// INSTAGRAM
// =============================================================

function Instagram() {
  return (
    <section className="wrap ig">
      <div className="section-head">
        <div className="left">
          <span className="mono">06 / Social</span>
          <h2><em>@dobê</em>.studio</h2>
        </div>
        <div className="right">
          <a href="#" className="btn btn-ghost">Seguir <Icon.ArrowUp /></a>
        </div>
      </div>
      <div className="ig-grid">
        {IG_TILES.map((src, i) =>
        <a key={i} href="#" className="ig-tile">
            <img src={src} alt={`Post ${i + 1}`} loading="lazy" />
            <div className="ig-tile-overlay"><span>Abrir</span></div>
          </a>
        )}
      </div>
    </section>);

}

// =============================================================
// FOOTER — minimalista
// =============================================================

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-mega" aria-hidden="true">DOBÊ</div>
      <div className="wrap">
        <div className="footer-row">
          <div className="footer-brand">
            <img src="assets/logo.png" alt="DOBÊ" />
            <span>DOBÊ</span>
          </div>
          <nav className="footer-links">
            <a href="#loja">Loja</a>
            <a href="#manifesto">Manifesto</a>
            <a href="#">Instagram</a>
            <a href="mailto:ola@dobe.com.br">Contato</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DOBÊ</span>
          <span>Nova Friburgo · RJ</span>
        </div>
      </div>
    </footer>);

}

// =============================================================
// CART DRAWER
// =============================================================

function CartDrawer({ open, items, onClose, onChange, onRemove }) {
  useLockBody(open);
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  return (
    <>
      <div className={`drawer-back${open ? " open" : ""}`} onClick={onClose}></div>
      <aside className={`drawer${open ? " open" : ""}`}>
        <div className="drawer-head">
          <div className="title">Sacola</div>
          <button className="nav-icon" onClick={onClose} aria-label="Fechar"><Icon.Close /></button>
        </div>
        <div className="drawer-body">
          {items.length === 0 ?
          <div className="drawer-empty">
              <span className="label">Sacola vazia</span>
              <h3>Nada por aqui <em style={{ color: "var(--accent)", fontStyle: "normal" }}>ainda.</em></h3>
              <p style={{ color: "var(--fg-dim)" }}>Adiciona uma peça do drop pra continuar.</p>
              <button className="btn btn-primary" onClick={onClose}>Voltar pra loja</button>
            </div> :
          items.map((it) =>
          <div key={it.key} className="cart-item">
              <div className="cart-item-img">
                <img src={it.img} alt={it.name} />
              </div>
              <div className="cart-item-info">
                <span className="nm">{it.name}</span>
                <span className="meta">{it.sku} · {it.size} · {it.color}</span>
                <div className="cart-qty">
                  <button onClick={() => onChange(it.key, -1)}><Icon.Minus /></button>
                  <span>{it.qty}</span>
                  <button onClick={() => onChange(it.key, 1)}><Icon.Plus /></button>
                </div>
              </div>
              <div className="cart-item-side">
                <span className="pr">{fmtBRL(it.price * it.qty)}</span>
                <button onClick={() => onRemove(it.key)}>Remover</button>
              </div>
            </div>
          )}
        </div>
        {items.length > 0 &&
        <div className="drawer-foot">
            <div className="row">
              <span>Subtotal</span><span>{fmtBRL(subtotal)}</span>
            </div>
            <div className="row">
              <span>Frete</span><span style={{ color: subtotal >= 350 ? "var(--ok)" : "var(--fg-dim)" }}>
                {subtotal >= 350 ? "Grátis" : "Calculado no checkout"}
              </span>
            </div>
            <div className="row total">
              <span>Total</span><span>{fmtBRL(subtotal)}</span>
            </div>
            <button className="btn btn-primary" style={{ justifyContent: "center" }}>
              Finalizar compra <Icon.Arrow />
            </button>
            <span className="mono" style={{ color: "var(--fg-dimmer)", textAlign: "center" }}>
              Em até 6x sem juros · entrega para todo Brasil
            </span>
          </div>
        }
      </aside>
    </>);

}

// =============================================================
// APP
// =============================================================

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pdp, setPdp] = useState(null);
  const [items, setItems] = useState([]);

  useScrollReveal();

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  const addToCart = useCallback((p, size) => {
    const key = `${p.id}-${size}`;
    setItems((prev) => {
      const existing = prev.find((it) => it.key === key);
      if (existing) return prev.map((it) => it.key === key ? { ...it, qty: it.qty + 1 } : it);
      return [...prev, {
        key, id: p.id, name: p.name, sku: p.sku, price: p.price,
        size, color: p.color, img: p.images[0], qty: 1
      }];
    });
    setCartOpen(true);
  }, []);
  const changeQty = (key, delta) => {
    setItems((prev) => prev.map((it) => it.key === key ? { ...it, qty: Math.max(1, it.qty + delta) } : it));
  };
  const removeItem = (key) => setItems((prev) => prev.filter((it) => it.key !== key));
  const cartCount = items.reduce((s, it) => s + it.qty, 0);

  return (
    <>
      {t.showMarquee && <Marquee />}
      <Nav cartCount={cartCount} onCart={() => setCartOpen(true)} onMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <Hero heroImage={t.heroImage} />
      <FeaturedSection onAdd={addToCart} onOpen={setPdp} density={t.gridDensity} />
      <Lookbook onOpen={setPdp} />
      <Catalog onAdd={addToCart} onOpen={setPdp} />
      <Manifesto />
      <Newsletter />
      <Instagram />
      <Footer />

      <CartDrawer
        open={cartOpen}
        items={items}
        onClose={() => setCartOpen(false)}
        onChange={changeQty}
        onRemove={removeItem} />
      

      <ProductModal
        product={pdp}
        onClose={() => setPdp(null)}
        onAdd={addToCart} />
      

      <TweaksPanel title="Tweaks">
        <TweakSection label="Cor de destaque" />
        <TweakColor
          label="Accent"
          value={t.accent}
          onChange={(v) => setTweak("accent", v)}
          options={["#e1251b", "#cfcfd1", "#f5f5f5", "#ff5e1f", "#2a2a2a"]} />
        
        <TweakSection label="Layout" />
        <TweakRadio
          label="Grid"
          value={t.gridDensity}
          onChange={(v) => setTweak("gridDensity", v)}
          options={[
          { value: "3", label: "3 col" },
          { value: "4", label: "4 col" }]
          } />
        
        <TweakToggle
          label="Marquee"
          value={t.showMarquee}
          onChange={(v) => setTweak("showMarquee", v)} />
        
        <TweakSection label="Hero" />
        <TweakRadio
          label="Imagem"
          value={t.heroImage}
          onChange={(v) => setTweak("heroImage", v)}
          options={[
          { value: "neon", label: "Neon" },
          { value: "sintetizador", label: "Synth" },
          { value: "cinema", label: "Cinema" },
          { value: "spray", label: "Spray" }]
          } />
        
      </TweaksPanel>
    </>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);