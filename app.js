/* ==========================================================================
   STASH SPOT CO. — app.js
   Vanilla. Loaded with `defer`. Routes on <body data-page="...">.
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------- DATA --------------------------------- */
  const SIZES_TOP = ["XS", "S", "M", "L", "XL"];
  const SIZES_BOTTOM = ["28", "30", "32", "34", "36"];
  const SIZE_ONE = ["One Size"];
  const COLORS = [
    { name: "Black", hex: "#101012" },
    { name: "Bone", hex: "#e7e3da" },
    { name: "Grey", hex: "#8c8c93" }
  ];

  const CATS = [
    { slug: "all", label: "All" },
    { slug: "hoodies", label: "Hoodies" },
    { slug: "tees", label: "Tees" },
    { slug: "outerwear", label: "Outerwear" },
    { slug: "pants", label: "Pants" },
    { slug: "accessories", label: "Accessories" }
  ];

  const RAW = [
    { id: 1, name: "Heavyweight Hoodie", cat: "Hoodies", slug: "hoodies", price: 89, tags: ["bestseller", "featured"], sizes: SIZES_TOP, desc: "A 480gsm loopback cotton hoodie with a boxy fit, dropped shoulders and a clean premium finish." },
    { id: 2, name: "Boxy Logo Tee", cat: "Tees", slug: "tees", price: 39, tags: ["new", "bestseller"], sizes: SIZES_TOP, desc: "Mid-weight organic cotton tee with a relaxed, dropped-shoulder cut and understated branding." },
    { id: 3, name: "Tech Cargo Pant", cat: "Pants", slug: "pants", price: 99, tags: ["new"], sizes: SIZES_BOTTOM, desc: "Water-repellent ripstop cargos with articulated knees and a tapered, adjustable leg." },
    { id: 4, name: "Shell Jacket", cat: "Outerwear", slug: "outerwear", price: 149, tags: ["featured"], sizes: SIZES_TOP, desc: "A minimal 3-layer shell. Fully taped seams, storm hood and a clean utility silhouette." },
    { id: 5, name: "Ribbed Beanie", cat: "Accessories", slug: "accessories", price: 29, tags: ["bestseller"], sizes: SIZE_ONE, desc: "Fine-gauge merino-blend beanie. Warm, lightweight and built to layer effortlessly." },
    { id: 6, name: "Oversized Crewneck", cat: "Hoodies", slug: "hoodies", price: 79, tags: ["new"], sizes: SIZES_TOP, desc: "Heavy brushed-back fleece crew with ribbed cuffs and a generous, modern cut." },
    { id: 7, name: "Washed Graphic Tee", cat: "Tees", slug: "tees", price: 42, tags: [], sizes: SIZES_TOP, desc: "Garment-dyed tee with a soft vintage wash and a screen-printed back graphic." },
    { id: 8, name: "Puffer Vest", cat: "Outerwear", slug: "outerwear", price: 119, tags: ["new", "featured"], sizes: SIZES_TOP, desc: "Recycled-fill puffer vest with a matte ripstop face and a high-utility front zip." },
    { id: 9, name: "5-Panel Cap", cat: "Accessories", slug: "accessories", price: 34, tags: ["bestseller"], sizes: SIZE_ONE, desc: "Structured 5-panel cap in washed cotton twill with an adjustable back tab." },
    { id: 10, name: "Relaxed Denim", cat: "Pants", slug: "pants", price: 109, tags: [], sizes: SIZES_BOTTOM, desc: "Rigid 13oz selvedge-style denim with a relaxed straight leg that breaks in over time." },
    { id: 11, name: "Knit Scarf", cat: "Accessories", slug: "accessories", price: 38, tags: ["new"], sizes: SIZE_ONE, desc: "Chunky lambswool-blend scarf in a tight rib. Soft, dense and properly warm." },
    { id: 12, name: "Full-Zip Hoodie", cat: "Hoodies", slug: "hoodies", price: 95, tags: ["featured", "bestseller"], sizes: SIZES_TOP, desc: "Heavyweight full-zip with a YKK puller, split kangaroo pocket and refined hardware." }
  ];

  const PHOTOS = {
    1: ["assets/products/hoodie.svg"],
    2: ["assets/products/tee.svg"],
    3: ["assets/products/cargo.svg"],
    4: ["assets/products/jacket.svg"],
    5: ["assets/products/beanie.svg"],
    6: ["assets/products/crewneck.svg"],
    7: ["assets/products/graphic-tee.svg"],
    8: ["assets/products/puffer.svg"],
    9: ["assets/products/cap.svg"],
    10: ["assets/products/jeans.svg"],
    11: ["assets/products/scarf.svg"],
    12: ["assets/products/zip-hoodie.svg"]
  };

  const PHOTO_KW = { 1: "hoodie", 2: "tshirt", 3: "cargo", 4: "jacket", 5: "beanie", 6: "crewneck", 7: "tshirt", 8: "puffer", 9: "cap", 10: "jeans", 11: "scarf", 12: "hoodie" };

  const PRODUCTS = RAW.map(p => ({
    ...p,
    colors: COLORS,
    images: p.images || PHOTOS[p.id] || ["assets/products/placeholder.svg"],
    material: "Composition: 100% cotton (where applicable). Designed in Switzerland, ethically made in Portugal.",
    shipping: "Free carbon-neutral shipping over CHF 80. Delivered in 2–5 working days. 30-day free returns."
  }));

  const COLLECTIONS = [
    { label: "Hoodies & Knits", slug: "hoodies", eyebrow: "Warm layers", img: "assets/products/hoodie.svg" },
    { label: "Outerwear", slug: "outerwear", eyebrow: "Built for weather", img: "assets/products/jacket.svg" },
    { label: "Accessories", slug: "accessories", eyebrow: "Finish the fit", img: "assets/products/beanie.svg" }
  ];

  const REVIEWS = [
    { name: "Luca M.", where: "Zürich", rating: 5, text: "The heavyweight hoodie is the best I own. The fabric is dense and the fit is exactly as pictured." },
    { name: "Sara K.", where: "Berlin", rating: 5, text: "Fast delivery, beautiful packaging. Everything feels considered, from the website to the product." },
    { name: "David R.", where: "Vienna", rating: 4, text: "Quality is genuinely premium for the price. Sizing runs a touch large, which I prefer." },
    { name: "Amira S.", where: "Geneva", rating: 5, text: "Minimal, clean, and it lasts. I’ve washed the tee a dozen times and it still looks new." },
    { name: "Noah T.", where: "Milan", rating: 5, text: "Finally a streetwear brand that isn’t loud. The monochrome pieces go with everything." },
    { name: "Elin B.", where: "Stockholm", rating: 4, text: "Smooth checkout, easy returns. Customer support actually replied within the hour." }
  ];

  /* ----------------------------- HELPERS ------------------------------ */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const money = n => "CHF " + Number(n).toFixed(2);
  const byId = id => PRODUCTS.find(p => p.id === Number(id));
  const esc = s => String(s).replace(/[&<>\"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const param = k => new URLSearchParams(location.search).get(k);
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const store = {
    get(k, f) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? f : v; } catch { return f; } },
    set(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
  };

  let cart = store.get("ssc_cart", []);
  let wishlist = store.get("ssc_wishlist", []);
  const getUser = () => store.get("ssc_user", null);
  const setUser = u => store.set("ssc_user", u);
  const saveCart = () => { store.set("ssc_cart", cart); updateCartCount(); };
  const saveWish = () => { store.set("ssc_wishlist", wishlist); };

  const SHIP_FREE = 80, SHIP_FEE = 8.9, TAX = 0.077;
  function totals(items) {
    const sub = items.reduce((s, i) => s + (byId(i.id) ? byId(i.id).price * i.qty : 0), 0);
    const disc = +(sub * (store.get("ssc_promo", 0) / 100)).toFixed(2);
    const ship = (sub >= SHIP_FREE || items.length === 0) ? 0 : SHIP_FEE;
    const tax = +((sub - disc) * TAX).toFixed(2);
    return { sub, disc, ship, tax, total: (sub - disc) + ship + tax };
  }

  const cartCount = () => cart.reduce((s, i) => s + i.qty, 0);
  function deliveryRange() {
    const fmt = d => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
    return fmt(new Date(Date.now() + 2 * 864e5)) + " – " + fmt(new Date(Date.now() + 5 * 864e5));
  }

  function addToCart(id, size, color, qty = 1, fromEl) {
    const ex = cart.find(i => i.id === Number(id) && i.size === size && i.color === color);
    if (ex) ex.qty += qty; else cart.push({ id: Number(id), size, color, qty });
    saveCart();
    if (fromEl) flyToCart(fromEl);
    renderCartDrawer();
    openCart();
  }

  function setQty(idx, q) { if (!cart[idx]) return; cart[idx].qty = q; if (cart[idx].qty <= 0) cart.splice(idx, 1); saveCart(); }
  function removeLine(idx) { cart.splice(idx, 1); saveCart(); }

  function toggleWish(id, btn) {
    if (!getUser()) { toast("Sign in to save favourites"); return false; }
    id = Number(id);
    const i = wishlist.indexOf(id);
    if (i > -1) wishlist.splice(i, 1); else wishlist.push(id);
    saveWish();
    if (btn) btn.classList.toggle("is-active", wishlist.includes(id));
    toast(wishlist.includes(id) ? "Saved to favourites" : "Removed from favourites");
    return true;
  }

  function toast(msg) {
    let wrap = $(".toast-wrap");
    if (!wrap) { wrap = document.createElement("div"); wrap.className = "toast-wrap"; document.body.appendChild(wrap); }
    const t = document.createElement("div");
    t.className = "toast"; t.textContent = msg; wrap.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 260); }, 2200);
  }

  function flyToCart(imgEl) {
    const cartBtn = $(".cart-button");
    if (!imgEl || !cartBtn || reduceMotion()) return;
    const r = imgEl.getBoundingClientRect(), c = cartBtn.getBoundingClientRect();
    const fly = imgEl.cloneNode(true);
    fly.className = "fly";
    Object.assign(fly.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" });
    document.body.appendChild(fly);
    requestAnimationFrame(() => {
      Object.assign(fly.style, { left: c.left + c.width / 2 + "px", top: c.top + "px", width: "26px", height: "32px", opacity: "0.15" });
    });
    setTimeout(() => fly.remove(), 900);
  }

  /* ===================================================================
     CHROME — header / footer / drawers (reusable components)
     =================================================================== */
  const NAV = [
    { label: "Shop", href: "shop.html", key: "shop" },
    { label: "New", href: "shop.html?tag=new", key: "new" },
    { label: "Best Sellers", href: "shop.html?tag=bestseller", key: "best" },
    { label: "About", href: "about.html", key: "about" },
    { label: "Contact", href: "contact.html", key: "contact" }
  ];
  function activeKey() {
    const p = document.body.dataset.page;
    if (p === "shop") { const t = param("tag"); return t === "new" ? "new" : t === "bestseller" ? "best" : "shop"; }
    return p;
  }

  function buildBackground() {
    if (document.getElementById("bg-fx")) return;
    const fx = document.createElement("div");
    fx.id = "bg-fx";
    fx.setAttribute("aria-hidden", "true");
    fx.innerHTML = '<div class="w w1"></div><div class="w w2"></div><div class="w w3"></div><div class="w wm"></div>';
    document.body.prepend(fx);
  }

  const LOGO = '<svg class="logo-mono" viewBox="0 40 280 120" role="img" aria-label="Stash Spot CO.">'
    + '<g fill="currentColor" font-weight="500" font-family="\'Playfair Display\',\'Didot\',\'Bodoni MT\',\'Hoefler Text\',\'Times New Roman\',serif">'
    + '<text x="86" y="152" font-size="150" text-anchor="middle">S</text>'
    + '<text x="134" y="152" font-size="150" text-anchor="middle">S</text>'
    + '<text x="190" y="152" font-size="150" text-anchor="middle">C</text>'
    + '</g></svg>';

  function buildHeader() {
    const host = $("#site-header"); if (!host) return;
    const ak = activeKey();
    const links = NAV.map(n => `<a href="${n.href}" class="${n.key === ak ? "active" : ""}">${n.label}</a>`).join("");
    const brand = LOGO + '<span class="brand-wm">Stash Spot Co.</span>';
    host.className = "site-header";
    host.innerHTML = `
      <div class="nav-wrap">
        <button class="menu-toggle" aria-label="Open menu" data-open-nav>☰</button>
        <a class="brand brand-logo brand-lockup" href="index.html" aria-label="Stash Spot CO.">${brand}</a>
        <nav class="nav" aria-label="Primary">${links}</nav>
        <div class="header-actions">
          <button class="icon-link" data-open-search aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
          </button>
          <a class="icon-link" href="account.html" aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/></svg>
          </a>
          <button class="cart-button" data-open-cart aria-label="Open cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>
            <span class="count" data-cart-count>0</span>
          </button>
        </div>
      </div>`;
  }

  function buildFooter() {
    const host = $("#site-footer"); if (!host) return;
    const shopLinks = CATS.filter(c => c.slug !== "all")
      .map(c => `<a href="shop.html?cat=${c.slug}">${c.label}</a>`).join("");
    host.className = "site-footer";
    host.innerHTML = `
      <div class="wrap">
        <div class="foot-top">
          <div class="foot-brand">
            <div class="brand brand-logo brand-lockup">${LOGO}<span class="brand-wm">Stash Spot Co.</span></div>
            <p>Considered streetwear in black, white and grey. Built heavy, finished clean, made to outlast the season.</p>
            <div class="foot-socials">
              <a href="https://www.instagram.com/stash_spotco/" target="_blank" rel="noopener" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg></a>
              <a href="#" aria-label="TikTok"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.3 2 1.6 3.5 3.5 3.8V10c-1.4 0-2.7-.4-3.8-1.1V15a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1V15A3.8 3.8 0 1 0 17.4 15V7.2c1 .3 1.8.8 2.6 1.6v2.3A6 6 0 0 1 16 3Z"/></svg></a>
              <a href="#" aria-label="X"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4l4 5.5L16 4h4l-6.3 8L20 20h-4l-4.3-5.8L7 20H4l6.7-8.4L4 4Z"/></svg></a>
            </div>
          </div>
          <div class="foot-col"><h4>Shop</h4>${shopLinks}<a href="shop.html?tag=new">New Arrivals</a></div>
          <div class="foot-col"><h4>Customer Care</h4><a href="contact.html">Contact</a><a href="shipping.html">Shipping</a><a href="returns.html">Returns &amp; Refunds</a></div>
          <div class="foot-col"><h4>Legal</h4><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms &amp; Conditions</a><a href="cookies.html">Cookie Policy</a></div>
        </div>
        <div class="foot-bottom">
          <span>© ${new Date().getFullYear()} Stash Spot CO. All rights reserved.</span>
          <span><a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a> · <a href="cookies.html">Cookies</a> · <a href="#" data-cookie-settings>Cookie settings</a></span>
        </div>
      </div>`;
  }

  function buildDrawers() {
    if ($(".scrim")) return;
    const scrim = document.createElement("div"); scrim.className = "scrim"; document.body.appendChild(scrim);

    const nav = document.createElement("aside");
    nav.className = "drawer drawer--nav"; nav.setAttribute("aria-label", "Menu");
    nav.innerHTML = `
      <div class="drawer-head" style="padding:0 0 16px;border:0">
        <span class="brand">Menu</span>
        <button class="drawer-close" data-close aria-label="Close menu">✕</button>
      </div>
      <nav class="drawer-nav-links">${NAV.map(n => `<a href="${n.href}">${n.label}</a>`).join("")}</nav>
      <div class="drawer-nav-foot"><a href="account.html">Account</a><a href="contact.html">Contact</a></div>`;
    document.body.appendChild(nav);

    const cartD = document.createElement("aside");
    cartD.className = "drawer drawer--cart"; cartD.setAttribute("aria-label", "Cart");
    cartD.innerHTML = `
      <div class="drawer-head"><h3>Your Bag</h3><button class="drawer-close" data-close aria-label="Close cart">✕</button></div>
      <div class="cart-items" data-cart-items></div>
      <div class="cart-foot" data-cart-foot></div>`;
    document.body.appendChild(cartD);

    scrim.addEventListener("click", closeDrawers);
    $$("[data-close]").forEach(b => b.addEventListener("click", closeDrawers));
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawers(); });
  }

  function openCart() { renderCartDrawer(); $(".drawer--cart")?.classList.add("open"); $(".scrim")?.classList.add("show"); }
  function openNav() { $(".drawer--nav")?.classList.add("open"); $(".scrim")?.classList.add("show"); }
  function closeDrawers() { $$(".drawer").forEach(d => d.classList.remove("open")); $(".scrim")?.classList.remove("show"); }
  function updateCartCount() { $$("[data-cart-count]").forEach(e => e.textContent = cartCount()); }

  function renderCartDrawer() {
    const box = $("[data-cart-items]"), foot = $("[data-cart-foot]");
    if (!box || !foot) return;
    const head = $(".drawer--cart .drawer-head h3");
    if (head) head.textContent = cart.length ? `Your Bag (${cartCount()})` : "Your Bag";
    if (!cart.length) {
      box.innerHTML = `<div class="cart-empty"><p>Your bag is empty.</p><a class="btn btn--block" href="shop.html">Start shopping</a></div>`;
      foot.innerHTML = ""; return;
    }
    box.innerHTML = cart.map((line, idx) => {
      const p = byId(line.id); if (!p) return "";
      return `<div class="cart-row">
        <a class="media" href="product.html?id=${p.id}"><img src="${p.images[0]}" alt="${esc(p.name)}" loading="lazy"></a>
        <div>
          <div class="ci-name">${esc(p.name)}</div>
          <div class="ci-meta">Size ${esc(line.size)} · ${esc(line.color)}</div>
          <div class="ci-meta">${money(p.price)} each</div>
          <div class="ci-price">${money(p.price * line.qty)}</div>
        </div>
        <div class="ci-right">
          <button class="link-remove" data-rm="${idx}">Remove</button>
          <div class="stepper"><button data-dec="${idx}" aria-label="Decrease">−</button><span class="q">${line.qty}</span><button data-inc="${idx}" aria-label="Increase">+</button></div>
        </div>
      </div>`;
    }).join("");

    const t = totals(cart);
    const remain = Math.max(0, SHIP_FREE - t.sub);
    const n = cartCount();
    foot.innerHTML = `
      <p class="ship-hint">${remain > 0 ? `You're ${money(remain)} away from free shipping` : "✓ You’ve unlocked free shipping"}</p>
      <div class="ship-bar"><i style="width:${Math.min(100, (t.sub / SHIP_FREE) * 100)}%"></i></div>
      <div class="row"><span>Subtotal (${n} ${n === 1 ? "item" : "items"})</span><span>${money(t.sub)}</span></div>
      ${t.disc ? `<div class="row" style="color:var(--ok)"><span>Discount</span><span>−${money(t.disc)}</span></div>` : ""}
      <div class="row"><span>Shipping</span><span>${t.ship ? money(t.ship) : "Free"}</span></div>
      <div class="row"><span>VAT (incl.)</span><span>${money(t.tax)}</span></div>
      <div class="row total"><span>Total</span><span>${money(t.total)}</span></div>
      <a class="btn btn--block" href="checkout.html">Checkout</a>
      <a class="btn btn--ghost btn--block" href="cart.html" style="margin-top:10px">View bag</a>`;
    box.querySelectorAll("[data-inc]").forEach(b => b.onclick = () => { setQty(+b.dataset.inc, cart[+b.dataset.inc].qty + 1); renderCartDrawer(); });
    box.querySelectorAll("[data-dec]").forEach(b => b.onclick = () => { setQty(+b.dataset.dec, cart[+b.dataset.dec].qty - 1); renderCartDrawer(); });
    box.querySelectorAll("[data-rm]").forEach(b => b.onclick = () => { removeLine(+b.dataset.rm); renderCartDrawer(); });
  }

  function badgeHTML(p) {
    const b = [];
    if (p.tags.includes("new")) b.push(`<span class="badge">New</span>`);
    if (p.tags.includes("bestseller")) b.push(`<span class="badge badge--soft">Best seller</span>`);
    return b.length ? `<div class="badges">${b.join("")}</div>` : "";
  }

  function cardHTML(p) {
    const wished = wishlist.includes(p.id) && getUser();
    return `<article class="card reveal">
      <div class="media">
        <a class="media-link" href="product.html?id=${p.id}" aria-label="${esc(p.name)}"></a>
        ${badgeHTML(p)}
        <button class="wish-toggle ${wished ? "is-active" : ""}" data-wish="${p.id}" aria-label="Save ${esc(p.name)}">♥</button>
        <img src="${p.images[0]}" alt="${esc(p.name)}" loading="lazy">
        <button class="quick-add" data-add="${p.id}">Quick add</button>
      </div>
      <div class="card-body">
        <a class="cn" href="product.html?id=${p.id}">
          <span class="cat">${esc(p.cat)}</span>
          <span class="name">${esc(p.name)}</span>
        </a>
        <span class="price">${money(p.price)}</span>
      </div>
    </article>`;
  }

  function renderGrid(host, list) {
    host.innerHTML = list.map(cardHTML).join("");
    wireCards(host);
    observeReveals(host);
  }

  function wireCards(root) {
    root.querySelectorAll("[data-add]").forEach(b => b.addEventListener("click", e => {
      e.preventDefault();
      const p = byId(b.dataset.add); if (!p) return;
      const size = p.sizes.includes("M") ? "M" : p.sizes[0];
      const img = b.closest(".media")?.querySelector("img");
      addToCart(p.id, size, p.colors[0].name, 1, img);
      toast(`${p.name} added to bag`);
    }));
    root.querySelectorAll("[data-wish]").forEach(b => b.addEventListener("click", e => {
      e.preventDefault(); toggleWish(b.dataset.wish, b);
    }));
  }

  function renderHome() {
    const col = $("#collections");
    if (col) col.innerHTML = COLLECTIONS.map(c => `
      <a class="collection reveal" href="shop.html?cat=${c.slug}">
        <img src="${c.img}" alt="${esc(c.label)}" loading="lazy">
        <div class="c-body">
          <span class="c-eyebrow">${esc(c.eyebrow)}</span>
          <h3>${esc(c.label)}</h3>
          <span class="c-go">Shop now <i>→</i></span>
        </div>
      </a>`).join("");

    const nw = $("#new-arrivals");
    if (nw) renderGrid(nw, PRODUCTS.filter(p => p.tags.includes("new")).slice(0, 4));

    const best = $("#best-sellers");
    if (best) renderGrid(best, PRODUCTS.filter(p => p.tags.includes("bestseller")).slice(0, 4));

    const rev = $("#reviews");
    if (rev) rev.innerHTML = REVIEWS.slice(0, 3).map(reviewHTML).join("");

    observeReveals();
  }

  function reviewHTML(r) {
    return `<figure class="review reveal">
      <div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
      <p>“${esc(r.text)}”</p>
      <figcaption class="who"><span class="ava">${esc(r.name[0])}</span><div><b>${esc(r.name)}</b><span>${esc(r.where)}</span></div></figcaption>
    </figure>`;
  }

  let shopState = { cat: "all", tag: null, sort: "featured", q: "" };
  function renderShop() {
    const grid = $("#shop-grid"); if (!grid) return;
    shopState.cat = param("cat") || "all";
    shopState.tag = param("tag") || null;
    shopState.q = (param("q") || "").trim();

    const bar = $("#shop-filters");
    if (bar) {
      bar.innerHTML = CATS.map(c => `<button class="chip ${c.slug === shopState.cat ? "active" : ""}" data-cat="${c.slug}">${c.label}</button>`).join("");
      bar.querySelectorAll("[data-cat]").forEach(b => b.addEventListener("click", () => {
        shopState.cat = b.dataset.cat; shopState.tag = null;
        bar.querySelectorAll(".chip").forEach(x => x.classList.toggle("active", x === b));
        drawShop();
      }));
    }
    const sort = $("#shop-sort");
    if (sort) sort.addEventListener("change", () => { shopState.sort = sort.value; drawShop(); });

    const title = $("#shop-title");
    if (title && shopState.q) title.textContent = `Search: “${shopState.q}”`;
    else if (title && shopState.tag) title.textContent = shopState.tag === "new" ? "New Arrivals" : "Best Sellers";

    drawShop();
  }

  function drawShop() {
    const grid = $("#shop-grid"); if (!grid) return;
    let list = PRODUCTS.slice();
    if (shopState.q) { const q = shopState.q.toLowerCase(); list = list.filter(p => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q))); }
    if (shopState.tag) list = list.filter(p => p.tags.includes(shopState.tag));
    if (shopState.cat !== "all") list = list.filter(p => p.slug === shopState.cat);
    if (shopState.sort === "low") list.sort((a, b) => a.price - b.price);
    else if (shopState.sort === "high") list.sort((a, b) => b.price - a.price);
    else if (shopState.sort === "new") list.sort((a, b) => b.id - a.id);
    else if (shopState.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

    const count = $("#shop-count"); if (count) count.textContent = `${list.length} ${list.length === 1 ? "item" : "items"}`;
    if (!list.length) { grid.innerHTML = `<div class="empty-state">No items match these filters.</div>`; return; }
    renderGrid(grid, list);
  }

  function renderProduct() {
    const root = $("#product-root"); if (!root) return;
    const p = byId(param("id")) || PRODUCTS[0];
    document.title = `${p.name} — Stash Spot CO.`;
    const oneSize = p.sizes.length === 1;
    const wished = wishlist.includes(p.id) && getUser();

    root.innerHTML = `
      <nav class="breadcrumbs"><a href="index.html">Home</a> / <a href="shop.html?cat=${p.slug}">${esc(p.cat)}</a> / ${esc(p.name)}</nav>
      <div class="pd">
        <div class="gallery">
          <div class="thumbs">
            ${p.images.map((src, i) => `<button class="thumb ${i === 0 ? "active" : ""}" data-thumb="${i}"><img src="${src}" alt="" loading="lazy"></button>`).join("")}
          </div>
          <div class="gallery-main"><img id="pd-main" src="${p.images[0]}" alt="${esc(p.name)}"></div>
        </div>
        <div class="pd-info">
          <span class="cat">${esc(p.cat)}</span>
          <h1>${esc(p.name)}</h1>
          <div class="pd-rate"><span class="stars">★★★★★</span> 4.8 · 126 reviews</div>
          <div class="pd-price">${money(p.price)}</div>
          <p class="pd-desc">${esc(p.desc)}</p>

          <div class="opt">
            <div class="opt-label"><span>Colour — <em id="pd-color" style="font-style:normal;color:var(--muted);text-transform:none;letter-spacing:0">${esc(p.colors[0].name)}</em></span></div>
            <div class="swatches">${p.colors.map((c, i) => `<button class="swatch" data-color="${esc(c.name)}" aria-pressed="${i === 0}" style="background:${c.hex}" aria-label="${esc(c.name)}"></button>`).join("")}</div>
          </div>

          <div class="opt">
            <div class="opt-label"><span>Size</span><a href="#" data-no-transition id="size-guide">Size guide</a></div>
            <div class="sizes">${p.sizes.map((s, i) => `<button class="size" data-size="${esc(s)}" aria-pressed="${oneSize ? "true" : "false"}">${esc(s)}</button>`).join("")}</div>
          </div>

          <div class="pd-buy">
            <div class="stepper"><button id="pd-dec" aria-label="Decrease">−</button><span class="q" id="pd-qty">1</span><button id="pd-inc" aria-label="Increase">+</button></div>
            <button class="btn" id="pd-add">Add to bag</button>
            <button class="pd-wish ${wished ? "is-active" : ""}" id="pd-wish" aria-label="Save">♥</button>
          </div>

          <div class="pd-trust">
            <span>◇ Free shipping over CHF 80</span><span>↺ 30-day returns</span><span>✓ Secure checkout</span>
          </div>

          <div class="accordion">
            ${accItem("Details", p.desc + " Tonal hardware and a pre-shrunk, washed finish.")}
            ${accItem("Material & care", p.material)}
            ${accItem("Shipping & returns", p.shipping)}
          </div>
        </div>
      </div>
      <section class="section" style="padding-top:0">
        <div class="section-head"><div><span class="eyebrow">You may also like</span><h2 class="section-title">Related</h2></div></div>
        <div class="grid" id="related"></div>
      </section>
      <section class="section" id="recent-sec" style="padding-top:0">
        <div class="section-head"><div><span class="eyebrow">Pick up where you left off</span><h2 class="section-title">Recently viewed</h2></div></div>
        <div class="grid" id="recent-grid"></div>
      </section>`;

    let qty = 1, size = oneSize ? p.sizes[0] : null, color = p.colors[0].name;
    const main = $("#pd-main", root);
    root.querySelectorAll("[data-thumb]").forEach(b => b.addEventListener("click", () => {
      root.querySelectorAll(".thumb").forEach(t => t.classList.remove("active")); b.classList.add("active");
      main.style.opacity = "0";
      setTimeout(() => { main.src = p.images[+b.dataset.thumb]; main.style.opacity = "1"; }, 160);
    }));
    root.querySelectorAll("[data-color]").forEach(b => b.addEventListener("click", () => {
      root.querySelectorAll("[data-color]").forEach(x => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true"); color = b.dataset.color; $("#pd-color", root).textContent = color;
    }));
    root.querySelectorAll("[data-size]").forEach(b => b.addEventListener("click", () => {
      root.querySelectorAll("[data-size]").forEach(x => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true"); size = b.dataset.size;
    }));
    $("#pd-inc", root).onclick = () => { qty++; $("#pd-qty", root).textContent = qty; };
    $("#pd-dec", root).onclick = () => { qty = Math.max(1, qty - 1); $("#pd-qty", root).textContent = qty; };
    $("#pd-add", root).onclick = () => {
      if (!size) { toast("Please select a size"); $(".sizes", root)?.animate?.([{ transform: "translateX(-4px)" }, { transform: "translateX(4px)" }, { transform: "none" }], { duration: 220 }); return; }
      addToCart(p.id, size, color, qty, main);
      toast(`${p.name} added to bag`);
    };
    $("#pd-wish", root).onclick = () => toggleWish(p.id, $("#pd-wish", root));
    $("#size-guide", root).onclick = e => { e.preventDefault(); openSizeGuide(/^\d/.test(p.sizes[0]) ? "bottom" : "top"); };
    wireAccordion(root);

    let rel = PRODUCTS.filter(x => x.slug === p.slug && x.id !== p.id);
    if (rel.length < 4) rel = rel.concat(PRODUCTS.filter(x => x.id !== p.id && !rel.includes(x)));
    renderGrid($("#related", root), rel.slice(0, 4));

    renderRecent(root, p.id);
    pushRecent(p.id);
    observeReveals(root);
  }

  function accItem(title, body) {
    return `<div class="acc-item"><button class="acc-head">${esc(title)}<span class="pm">+</span></button><div class="acc-panel"><p>${esc(body)}</p></div></div>`;
  }

  function wireAccordion(root) {
    root.querySelectorAll(".acc-head").forEach(h => h.addEventListener("click", () => {
      const item = h.closest(".acc-item");
      const open = item.classList.contains("open");
      root.querySelectorAll(".acc-item").forEach(i => i.classList.remove("open"));
      if (!open) item.classList.add("open");
    }));
  }

  function renderCartPage() {
    const root = $("#cart-page"); if (!root) return;
    if (!cart.length) {
      root.innerHTML = `<div class="empty-state"><h2 style="font-size:28px">Your bag is empty</h2><p style="margin:10px 0 22px">Nothing here yet — let’s fix that.</p><a class="btn" href="shop.html">Continue shopping</a></div>`;
      return;
    }
    const t = totals(cart);
    const n = cartCount();
    root.innerHTML = `
      <p class="cart-subtitle">${n} ${n === 1 ? "item" : "items"} in your bag</p>
      <div class="cart-layout">
        <div class="cart-lines" id="cart-lines"></div>
        <aside class="summary">
          <h3>Order summary</h3>
          <div class="promo"><input id="promo" placeholder="Promo code"><button class="btn btn--sm btn--ghost" id="promo-apply">Apply</button></div>
          <div class="form-msg" id="promo-msg"></div>
          <div class="row"><span>Subtotal (${n} ${n === 1 ? "item" : "items"})</span><span>${money(t.sub)}</span></div>
          ${t.disc ? `<div class="row" style="color:var(--ok)"><span>You save</span><span>−${money(t.disc)}</span></div>` : ""}
          <div class="row"><span>Shipping</span><span>${t.ship ? money(t.ship) : "Free"}</span></div>
          <div class="row"><span>VAT (incl. 7.7%)</span><span>${money(t.tax)}</span></div>
          <hr>
          <div class="row total"><span>Total</span><span>${money(t.total)}</span></div>
          <div class="summary-eta">Estimated delivery <b>${deliveryRange()}</b></div>
          <a class="btn btn--block" href="checkout.html" style="margin-top:16px">Checkout</a>
          <a class="btn btn--ghost btn--block" href="shop.html" style="margin-top:10px">Continue shopping</a>
          <ul class="summary-trust">
            <li>◇ Free shipping over CHF 80</li>
            <li>↺ 30-day free returns</li>
            <li>✓ Secure, encrypted checkout</li>
          </ul>
        </aside>
      </div>`;

    const lines = $("#cart-lines", root);
    lines.innerHTML = cart.map((line, idx) => {
      const p = byId(line.id); if (!p) return "";
      return `<div class="line">
        <a class="media" href="product.html?id=${p.id}"><img src="${p.images[0]}" alt="${esc(p.name)}" loading="lazy"></a>
        <div>
          <h4><a href="product.html?id=${p.id}">${esc(p.name)}</a></h4>
          <div class="l-meta">${esc(p.cat)} · Size ${esc(line.size)} · ${esc(line.color)}</div>
          <div class="l-stock">In stock · ships in 1–2 days</div>
          <div class="l-price">${money(p.price)} <span>each</span></div>
        </div>
        <div class="l-right">
          <div class="stepper"><button data-dec="${idx}" aria-label="Decrease quantity">−</button><span class="q">${line.qty}</span><button data-inc="${idx}" aria-label="Increase quantity">+</button></div>
          <div class="l-total">${money(p.price * line.qty)}</div>
          <button class="link-remove" data-rm="${idx}">Remove</button>
        </div>
      </div>`;
    }).join("");

    lines.querySelectorAll("[data-inc]").forEach(b => b.onclick = () => { setQty(+b.dataset.inc, cart[+b.dataset.inc].qty + 1); renderCartPage(); });
    lines.querySelectorAll("[data-dec]").forEach(b => b.onclick = () => { setQty(+b.dataset.dec, cart[+b.dataset.dec].qty - 1); renderCartPage(); });
    lines.querySelectorAll("[data-rm]").forEach(b => b.onclick = () => { removeLine(+b.dataset.rm); renderCartPage(); });

    const apply = $("#promo-apply", root), input = $("#promo", root), msg = $("#promo-msg", root);
    apply.onclick = () => {
      const code = (input.value || "").trim().toUpperCase();
      const map = { SAVE10: 10, STASH10: 10, STASH20: 20 };
      if (map[code]) { store.set("ssc_promo", map[code]); msg.className = "form-msg ok"; msg.textContent = `${map[code]}% off applied`; renderCartPage(); }
      else { store.set("ssc_promo", 0); msg.className = "form-msg err"; msg.textContent = "Invalid promo code"; }
    };
    observeReveals(root);
  }

  function renderCheckout() {
    const sum = $("#order-summary"); if (!sum) return;
    if (!cart.length) { sum.closest("main")?.classList.add("ssc-empty"); }
    const t = totals(cart);
    sum.innerHTML = `
      <div class="panel osum">
        <h2>Order summary</h2>
        ${cart.map(line => { const p = byId(line.id); if (!p) return ""; return `
          <div class="o-line">
            <div class="media"><img src="${p.images[0]}" alt="${esc(p.name)}"></div>
            <div><div class="on">${esc(p.name)} ×${line.qty}</div><div class="om">${esc(line.size)} · ${esc(line.color)}</div></div>
            <div class="op">${money(p.price * line.qty)}</div>
          </div>`; }).join("") || `<p class="muted" style="padding:14px 0">Your bag is empty. <a href="shop.html" style="border-bottom:1px solid">Shop now</a></p>`}
        <div class="row" style="display:flex;justify-content:space-between;margin:14px 0 6px;font-size:14px;color:var(--muted)"><span>Subtotal</span><span>${money(t.sub)}</span></div>
        ${t.disc ? `<div style="display:flex;justify-content:space-between;font-size:14px;color:var(--muted);margin:6px 0"><span>Discount</span><span>−${money(t.disc)}</span></div>` : ""}
        <div style="display:flex;justify-content:space-between;font-size:14px;color:var(--muted);margin:6px 0"><span>Shipping</span><span>${t.ship ? money(t.ship) : "Free"}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:14px;color:var(--muted);margin:6px 0"><span>VAT (incl.)</span><span>${money(t.tax)}</span></div>
        <div style="display:flex;justify-content:space-between;font-weight:800;font-size:18px;border-top:1px solid var(--line);padding-top:14px;margin-top:8px"><span>Total</span><span style="font-family:var(--font-display)">${money(t.total)}</span></div>
      </div>`;

    const form = $("#checkout-form");
    if (form) form.addEventListener("submit", e => {
      e.preventDefault();
      if (!cart.length) { toast("Your bag is empty"); return; }
      cart = []; store.set("ssc_cart", cart); store.set("ssc_promo", 0); updateCartCount();
      const main = $("main");
      main.innerHTML = `<div class="wrap"><div class="empty-state" style="padding:120px 0"><span class="eyebrow">Thank you</span><h1 style="font-size:clamp(34px,5vw,56px);margin:12px 0">Order confirmed</h1><p style="color:var(--muted);max-width:44ch;margin:0 auto 22px">Your items are now being packed and will be on the way soon.</p><a class="btn" href="shop.html">Continue shopping</a></div></div>`;
    });
    observeReveals();
  }

  function renderAccount() {
    const root = $("#account-root"); if (!root) return;
    getUser() ? renderDashboard(root) : renderAuth(root);
  }

  function renderAuth(root) {
    root.innerHTML = `
      <div class="auth reveal">
        <h1>Account</h1>
        <p class="sub">Sign in to track orders and save favourites.</p>
        <div class="tabs"><button class="active" data-tab="login">Sign in</button><button data-tab="register">Create account</button></div>
        <form id="auth-form"></form>
        <div class="form-msg" id="auth-msg"></div>
      </div>`;
    let mode = "login";
    const form = $("#auth-form", root), msg = $("#auth-msg", root);
    const draw = () => {
      form.innerHTML = (mode === "register" ? `<div class="field"><label>Full name</label><input id="a-name" required></div>` : "") +
        `<div class="field"><label>Email</label><input type="email" id="a-email" required></div>
         <div class="field"><label>Password</label><input type="password" id="a-pass" required></div>
         <button class="btn btn--block" type="submit">${mode === "register" ? "Create account" : "Sign in"}</button>`;
    };
    draw();
    root.querySelectorAll("[data-tab]").forEach(b => b.addEventListener("click", () => {
      mode = b.dataset.tab; root.querySelectorAll("[data-tab]").forEach(x => x.classList.toggle("active", x === b)); msg.textContent = ""; draw();
    }));
    form.addEventListener("submit", e => {
      e.preventDefault();
      const email = $("#a-email", root).value.trim().toLowerCase();
      const pass = $("#a-pass", root).value.trim();
      const users = store.get("ssc_users", []);
      if (mode === "register") {
        const name = $("#a-name", root).value.trim();
        if (pass.length < 4) { msg.className = "form-msg err"; msg.textContent = "Password must be at least 4 characters."; return; }
        if (users.some(u => u.email === email)) { msg.className = "form-msg err"; msg.textContent = "An account with that email exists."; return; }
        const u = { name, email, pass }; users.push(u); store.set("ssc_users", users); setUser({ name, email });
      } else {
        const found = users.find(u => u.email === email && u.pass === pass);
        if (!found) { msg.className = "form-msg err"; msg.textContent = "Email or password is incorrect."; return; }
        setUser({ name: found.name, email: found.email });
      }
      renderDashboard(root);
    });
    observeReveals(root);
  }

  function renderDashboard(root) {
    const u = getUser();
    const wished = PRODUCTS.filter(p => wishlist.includes(p.id));
    root.innerHTML = `
      <div class="account">
        <aside class="acct-side">
          <div class="acct-user"><span class="ava">${esc((u.name || u.email)[0].toUpperCase())}</span><div><b>${esc((u.name || "").split(" ")[0] || "You")}</b><span>${esc(u.email)}</span></div></div>
          <nav class="acct-nav">
            <button class="active" data-view="overview">Overview</button>
            <button data-view="orders">Orders</button>
            <button data-view="wishlist">Favourites</button>
            <button data-view="settings">Settings</button>
            <button class="danger" id="logout">Sign out</button>
          </nav>
        </aside>
        <section class="acct-panel" id="acct-view"></section>
      </div>`;
    const view = $("#acct-view", root);
    const views = {
      overview: () => `<h2>Welcome back${u.name ? ", " + esc(u.name.split(" ")[0]) : ""}</h2><p class="muted">Here’s a quick look at your account.</p>
        <div class="tiles"><div class="tile"><div class="cat" style="color:var(--muted-2);font-size:11px;letter-spacing:.12em;text-transform:uppercase">Orders</div><div style="font-family:var(--font-display);font-size:28px;font-weight:700;margin-top:8px">03</div></div>
        <div class="tile"><div style="color:var(--muted-2);font-size:11px;letter-spacing:.12em;text-transform:uppercase">Favourites</div><div style="font-family:var(--font-display);font-size:28px;font-weight:700;margin-top:8px">${wished.length}</div></div></div>`,
      orders: () => `<h2>Orders</h2><p class="muted">Your recent orders.</p>
        <div class="order"><div><b>#SSC-2048</b><div class="l-meta" style="color:var(--muted);font-size:13px">2 items · ${money(168)}</div></div><span class="status">Delivered</span></div>
        <div class="order"><div><b>#SSC-2031</b><div class="l-meta" style="color:var(--muted);font-size:13px">1 item · ${money(95)}</div></div><span class="status">In transit</span></div>`,
      wishlist: () => `<h2>Favourites</h2><p class="muted">${wished.length ? "Pieces you’ve saved." : "You haven’t saved anything yet."}</p>` +
        (wished.map(p => `<div class="wish-mini"><a class="media" href="product.html?id=${p.id}"><img src="${p.images[0]}" alt="${esc(p.name)}"></a><div style="flex:1"><b>${esc(p.name)}</b><div class="l-meta">${esc(p.cat)}</div></div></div>`).join("") || ""),
      settings: () => `<h2>Settings</h2><p class="muted">Update your details.</p>
        <div class="field"><label>Full name</label><input value="${esc(u.name || "")}" id="set-name"></div>
        <div class="field"><label>Email</label><input value="${esc(u.email)}" id="set-email"></div>
        <button class="btn" id="save-set">Save changes</button>`
    };
    const show = key => {
      view.innerHTML = views[key]();
      if (key === "settings") $("#save-set", view).onclick = () => {
        setUser({ name: $("#set-name", view).value.trim(), email: $("#set-email", view).value.trim() }); toast("Saved");
      };
    };
    show("overview");
    root.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => {
      root.querySelectorAll("[data-view]").forEach(x => x.classList.toggle("active", x === b)); show(b.dataset.view);
    }));
    $("#logout", root).onclick = () => { localStorage.removeItem("ssc_user"); renderAuth(root); toast("Signed out"); };
  }

  function wireForms() {
    const valid = e => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);
    $$("[data-newsletter]").forEach(form => form.addEventListener("submit", e => {
      e.preventDefault();
      const input = form.querySelector("input");
      if (!valid(input.value.trim())) { toast("Enter a valid email"); return; }
      input.value = ""; toast("You’re in — welcome to the list");
    }));
    const contact = $("#contact-form");
    if (contact) contact.addEventListener("submit", e => {
      e.preventDefault();
      const msg = $("#contact-msg");
      const email = $("#c-email")?.value.trim();
      if (!valid(email)) { msg.className = "form-msg err"; msg.textContent = "Please enter a valid email."; return; }
      contact.reset(); msg.className = "form-msg ok"; msg.textContent = "Thanks — we’ll reply within one business day.";
    });
  }

  let io;
  function observeReveals(root = document) {
    if (reduceMotion()) { $$(".reveal", root).forEach(el => el.classList.add("in")); return; }
    if (!io) io = new IntersectionObserver((ents) => {
      ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    $$(".reveal", root).forEach(el => io.observe(el));
  }

  function headerBehaviour() {
    const header = $(".site-header"); if (!header) return;
    let last = 0;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      const drawerOpen = $(".drawer.open");
      if (!drawerOpen && y > 140 && y > last + 4) header.classList.add("hide");
      else header.classList.remove("hide");
      last = y;
    }, { passive: true });
  }

  function pageTransitions() {
    if ("startViewTransition" in document) return;
    document.body.classList.add("tfb");
    requestAnimationFrame(() => document.body.classList.add("tin"));
    document.addEventListener("click", e => {
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto") || a.target === "_blank" || a.hasAttribute("data-no-transition") || e.metaKey || e.ctrlKey || e.shiftKey) return;
      if (reduceMotion()) return;
      e.preventDefault();
      document.body.classList.remove("tin");
      document.body.classList.add("tout");
      setTimeout(() => { location.href = href; }, 240);
    });
  }

  function setFavicon() {
    if (document.querySelector('link[rel="icon"][data-mono]')) return;
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
      + '<rect width="64" height="64" rx="14" fill="#0A0A0A"/>'
      + '<g fill="#C5A572" font-family="Georgia,\'Times New Roman\',serif" font-weight="500" font-size="40" text-anchor="middle">'
      + '<text x="19" y="45">S</text><text x="31" y="45">S</text><text x="45" y="45">C</text>'
      + '</g></svg>';
    const l = document.createElement("link");
    l.rel = "icon"; l.type = "image/svg+xml"; l.setAttribute("data-mono", "1");
    l.href = "data:image/svg+xml," + encodeURIComponent(svg);
    document.head.appendChild(l);
  }

  function buildSearch() {
    if ($("#search-overlay")) return;
    const el = document.createElement("div");
    el.id = "search-overlay";
    el.className = "search-overlay";
    el.innerHTML = `
      <div class="search-panel">
        <div class="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
          <input id="search-input" type="search" placeholder="Search products…" autocomplete="off" aria-label="Search products">
          <button class="search-close" data-close-search aria-label="Close search">✕</button>
        </div>
        <div class="search-hint" id="search-hint"></div>
        <div class="search-results grid" id="search-results"></div>
      </div>`;
    document.body.appendChild(el);
    const input = $("#search-input", el);
    input.addEventListener("input", () => runSearch(input.value));
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") { const q = input.value.trim(); if (q) location.href = "shop.html?q=" + encodeURIComponent(q); }
    });
    el.addEventListener("click", e => { if (e.target === el || e.target.closest("[data-close-search]")) closeSearch(); });
  }

  function runSearch(q) {
    const res = $("#search-results"), hint = $("#search-hint");
    if (!res) return;
    q = q.trim().toLowerCase();
    if (!q) { res.innerHTML = ""; hint.textContent = `Type to search ${PRODUCTS.length} products.`; return; }
    const list = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
    hint.textContent = list.length ? `${list.length} result${list.length === 1 ? "" : "s"} for “${q}”` : `No products match “${q}”.`;
    res.innerHTML = list.map(cardHTML).join("");
    wireCards(res);
    res.querySelectorAll("[data-add], .media-link, .cn").forEach(n => n.addEventListener("click", closeSearch));
  }

  function openSearch() {
    buildSearch();
    const el = $("#search-overlay"); el.classList.add("open");
    document.body.style.overflow = "hidden";
    const hint = $("#search-hint"); if (hint && !$("#search-input").value) hint.textContent = `Type to search ${PRODUCTS.length} products.`;
    setTimeout(() => $("#search-input")?.focus(), 40);
  }

  function closeSearch() { $("#search-overlay")?.classList.remove("open"); document.body.style.overflow = ""; }

  const SIZE_GUIDE = {
    top: {
      title: "Tops",
      note: "Garment measured flat, in centimetres. Chest is half-chest (pit to pit).",
      head: ["Size", "Chest", "Length", "Sleeve"],
      rows: [["XS","52","68","61"],["S","54","70","62"],["M","56","72","63"],["L","58","74","64"],["XL","60","76","65"]]
    },
    bottom: {
      title: "Bottoms",
      note: "Waist label is in inches; measurements in centimetres.",
      head: ["Size", "Waist", "Inseam", "Hip"],
      rows: [["28","71","76","94"],["30","76","77","99"],["32","81","78","104"],["34","86","79","109"],["36","91","80","114"]]
    }
  };

  function openSizeGuide(kind) {
    closeSizeGuide();
    const g = kind === "bottom" ? SIZE_GUIDE.bottom : SIZE_GUIDE.top;
    const table = `
      <table class="sg-table"><thead><tr>${g.head.map(h => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>${g.rows.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="sg-size"' : ''}>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>
      <p class="sg-note">${g.note}</p>`;
    const el = document.createElement("div");
    el.id = "sizeguide-modal"; el.className = "modal-overlay";
    el.innerHTML = `
      <div class="modal-card" role="dialog" aria-modal="true" aria-label="Size guide">
        <div class="modal-head"><h3>Size guide — ${g.title}</h3><button class="modal-close" data-close-sg aria-label="Close">✕</button></div>
        <div class="modal-body">
          ${table}
          <p class="sg-tip">Fits true to size. Between sizes? Size up for a relaxed, boxy fit.</p>
          <details class="sg-more"><summary>How to measure</summary>
            <p>Chest: measure under the arms across the fullest part. Waist: around the narrowest point. Inseam: from crotch to hem along the inside leg.</p>
          </details>
        </div>
      </div>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("open"));
    document.body.style.overflow = "hidden";
    el.addEventListener("click", e => { if (e.target === el || e.target.closest("[data-close-sg]")) closeSizeGuide(); });
  }

  function closeSizeGuide() { const el = $("#sizeguide-modal"); if (!el) return; el.classList.remove("open"); document.body.style.overflow = ""; setTimeout(() => el.remove(), 200); }

  function pushRecent(id) {
    id = Number(id);
    let r = store.get("ssc_recent", []);
    if (!Array.isArray(r)) r = [];
    r = r.filter(x => x !== id); r.unshift(id); r = r.slice(0, 12);
    store.set("ssc_recent", r);
  }

  function renderRecent(root, excludeId) {
    const sec = $("#recent-sec", root), host = $("#recent-grid", root);
    if (!sec || !host) return;
    const list = (store.get("ssc_recent", []) || []).filter(x => x !== Number(excludeId)).map(byId).filter(Boolean).slice(0, 4);
    if (!list.length) { sec.style.display = "none"; return; }
    renderGrid(host, list);
  }

  function init() {
    document.addEventListener("error", e => {
      const t = e.target;
      if (t && t.tagName === "IMG" && !t.dataset.fb) {
        t.dataset.fb = "1";
        t.src = "assets/products/placeholder.svg";
      }
    }, true);

    setFavicon();
    buildBackground();
    buildHeader();
    buildFooter();
    buildDrawers();
    buildCookieBanner();
    updateCartCount();
    headerBehaviour();
    pageTransitions();
    wireForms();

    document.addEventListener("click", e => {
      if (e.target.closest("[data-open-cart]")) openCart();
      if (e.target.closest("[data-open-nav]")) openNav();
      if (e.target.closest("[data-open-search]")) openSearch();
      if (e.target.closest("[data-cookie-settings]")) { e.preventDefault(); localStorage.removeItem("ssc_cookie_consent"); buildCookieBanner(true); }
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") { closeSearch(); closeSizeGuide(); } });

    const page = document.body.dataset.page;
    if (page === "home") renderHome();
    else if (page === "shop") renderShop();
    else if (page === "product") renderProduct();
    else if (page === "cart") renderCartPage();
    else if (page === "checkout") renderCheckout();
    else if (page === "account") renderAccount();

    observeReveals();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

