/* Static site generator for JJ Cleaning Services.
   Run: node src/build.js  (writes .html files to project root) */
"use strict";

const fs = require("fs");
const path = require("path");
const D = require("./data.js");

const ROOT = path.join(__dirname, "..");
const ICONS = path.join(ROOT, "assets", "icons");

/* ----------------------------------------------------------------- icons */

const iconCache = {};
function icon(name, cls) {
  if (!iconCache[name]) {
    let svg = fs.readFileSync(path.join(ICONS, name + ".svg"), "utf8");
    svg = svg
      .replace(/<title>.*?<\/title>/s, "")
      .replace(/\s(width|height|class)="[^"]*"/g, "")
      .replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="currentColor"')
      .replace(/\s+/g, " ")
      .replace(/> </g, "><")
      .trim();
    iconCache[name] = svg;
  }
  let svg = iconCache[name];
  if (cls) svg = svg.replace("<svg", `<svg class="${cls}"`);
  return svg.replace("<svg", '<svg aria-hidden="true" focusable="false"');
}

const tick = () => icon("check");
const arrow = () => icon("arrow-right", "arrow");

/* ------------------------------------------------------------ navigation */

const NAV = [
  { label: "Home", href: "index.html" },
  {
    label: "Our Services", key: "services", wide: true,
    items: [
      { label: "All Services", href: "our-services.html" },
      ...D.services.map((s) => ({ label: s.name, href: s.slug + ".html" })),
    ],
  },
  {
    label: "Pricing", key: "pricing",
    items: [
      { label: "Our Prices", href: "our-prices.html" },
      { label: "Vehicle Valeting Pricing", href: "vehicle-valeting-pricing.html" },
      { label: "Packages", href: "packages.html" },
      { label: "Coupons & Offers", href: "coupons.html" },
    ],
  },
  {
    label: "About Us", key: "about",
    items: [
      { label: "About Us", href: "about-us.html" },
      { label: "Reviews", href: "reviews.html" },
      { label: "Accreditations", href: "accreditations.html" },
      { label: "QHSE", href: "qhse.html" },
      { label: "Gallery", href: "gallery.html" },
      { label: "FAQs", href: "faqs.html" },
      { label: "Careers", href: "careers.html" },
      { label: "Community Support", href: "community-support.html" },
    ],
  },
  {
    label: "Contact", key: "contact",
    items: [
      { label: "Contact Us", href: "contact-us.html" },
      { label: "Our Locations", href: "our-locations.html" },
      { label: "Recommend Us", href: "recommend-us.html" },
      { label: "Customer Portal", href: D.contact.portalUrl, ext: true },
    ],
  },
];

function navHtml(active) {
  const items = NAV.map((item) => {
    if (!item.items) {
      const cls = active === item.href ? ' class="active"' : "";
      return `<li><a href="${item.href}"${cls}>${item.label}</a></li>`;
    }
    const links = item.items
      .map((l) => l.ext
        ? `<a href="${l.href}" target="_blank" rel="noopener">${l.label} ${icon("external-link")}</a>`
        : `<a href="${l.href}">${l.label}</a>`)
      .join("");
    return `<li>
      <button type="button" aria-haspopup="true">${item.label} ${icon("chevron-down", "chev")}</button>
      <div class="dropdown${item.wide ? " dd-wide" : ""}">${links}</div>
    </li>`;
  }).join("");
  return items + `<li class="nav-mobile-cta"><a class="btn btn-primary btn-lg" href="get-a-quote.html">Get a Free Quote ${arrow()}</a></li>`;
}

/* -------------------------------------------------------------- layout */

function topbar() {
  const c = D.contact;
  return `<div class="topbar">
    <div class="container topbar-inner">
      <div class="topbar-group">
        <a href="${c.phone1Href}">${icon("phone")} ${c.phone1}</a>
        <a href="mailto:${c.emailInfo}">${icon("mail")} ${c.emailInfo}</a>
        <span class="hours">${icon("clock")} ${c.hoursShort}</span>
      </div>
      <div class="topbar-group">
        <a class="topbar-portal" href="${c.portalUrl}" target="_blank" rel="noopener">Customer Portal</a>
        <a class="topbar-portal" href="get-a-quote.html">Book Online</a>
        ${c.socials.slice(0, 4).map((s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}">${icon("social-" + s.icon)}</a>`).join("")}
      </div>
    </div>
  </div>`;
}

function header(active) {
  return `<header class="header">
    <nav class="container nav" aria-label="Main navigation">
      <a class="brand" href="index.html" aria-label="JJ Cleaning Services home">
        <img src="assets/img/logo-crop.png" alt="JJ Cleaning Services. Local, friendly and safe." width="183" height="46">
      </a>
      <ul class="nav-links">${navHtml(active)}</ul>
      <div class="nav-cta">
        <a class="btn btn-primary btn-quote" href="get-a-quote.html">Get a Free Quote</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-label="Open menu"><span></span><span></span><span></span></button>
      </div>
    </nav>
  </header>`;
}

function footer() {
  const c = D.contact;
  const svcLinks = D.services.map((s) => `<li><a href="${s.slug}.html">${s.name}</a></li>`).join("");
  return `<footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <img src="assets/img/logo-crop.png" alt="JJ Cleaning Services logo">
          <p>Your local cleaning service since 2017. We pay attention to detail and always strive to use the best tools and products to achieve the best possible results.</p>
          <div class="footer-social">
            ${c.socials.map((s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}">${icon("social-" + s.icon)}</a>`).join("")}
          </div>
          <div class="footer-newsletter">
            <h4>Hear about offers first</h4>
            <form data-newsletter>
              <input type="email" placeholder="Enter your email address" aria-label="Email address" required>
              <button class="btn btn-primary" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div>
          <h4>Our Services</h4>
          <ul>${svcLinks}<li><a href="our-prices.html">Our Prices</a></li></ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="about-us.html">About Us</a></li>
            <li><a href="reviews.html">Reviews</a></li>
            <li><a href="accreditations.html">Accreditations</a></li>
            <li><a href="qhse.html">QHSE</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="faqs.html">FAQs</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="our-locations.html">Our Locations</a></li>
            <li><a href="coupons.html">Coupons & Offers</a></li>
            <li><a href="recommend-us.html">Recommend Us</a></li>
            <li><a href="${c.portalUrl}" target="_blank" rel="noopener">Customer Portal</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <ul class="footer-contact">
            <li>${icon("map-pin")}<span>${c.address.join("<br>")}<br><em>(${c.addressNote})</em></span></li>
            <li>${icon("phone")}<span><a href="${c.phone1Href}">${c.phone1}</a><br><a href="${c.phone2Href}">${c.phone2}</a></span></li>
            <li>${icon("mail")}<span><a href="mailto:${c.emailInfo}">${c.emailInfo}</a><br><a href="mailto:${c.emailCustomer}">${c.emailCustomer}</a></span></li>
            <li>${icon("clock")}<span>${c.hours}</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-group">
        <span>Our Group</span>
        ${D.group.map((g) => `<a href="${g.url}" target="_blank" rel="noopener"><img src="assets/img/${g.img}" alt="${g.name} logo">${g.name}</a>`).join("")}
      </div>
      <div class="footer-bottom">
        <div class="legal-links">
          <a href="https://www.jjcleaningservices.uk/company-policies-and-notices" target="_blank" rel="noopener">Company Policies & Notices</a>
          <a href="https://www.jjcleaningservices.uk/terms-of-service" target="_blank" rel="noopener">Terms & Conditions</a>
          <a href="https://www.jjcleaningservices.uk/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>
          <a href="https://www.jjcleaningservices.uk/acceptable-use-policy" target="_blank" rel="noopener">Acceptable Use Policy</a>
        </div>
        <p>Copyright &copy; ${new Date().getFullYear()} JJ Cleaning Services, a trading name of JJ Group (UK) LTD. All rights reserved. ${c.legal}</p>
      </div>
    </div>
  </footer>`;
}

function layout({ file, title, desc, active, body }) {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="icon" type="image/png" href="assets/img/logo.png">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:image" content="assets/img/house-exterior.png">
<link rel="stylesheet" href="assets/css/main.css">
<script>document.documentElement.classList.add("js");</script>
</head>
<body>
${topbar()}
${header(active)}
<main id="main">
${body}
</main>
${footer()}
<button class="to-top" type="button" aria-label="Back to top">${icon("arrow-up")}</button>
<div class="lightbox" role="dialog" aria-label="Image preview"><img src="" alt=""></div>
<script src="assets/js/main.js" defer></script>
</body>
</html>`;
}

/* ------------------------------------------------------ shared components */

function pageHero({ crumb, title, lead, img, imgAlt, badges, ctas }) {
  const crumbs = `<div class="crumbs"><a href="index.html">Home</a> ${icon("chevron-right")} ${crumb}</div>`;
  const badgeHtml = badges
    ? `<div class="hero-badges">${badges.map((b) => `<span class="hero-badge">${icon(b[0])} ${b[1]}</span>`).join("")}</div>`
    : "";
  const ctaHtml = ctas
    ? `<div class="ph-ctas">${ctas.join("")}</div>`
    : "";
  const media = img
    ? `<div class="ph-img" data-reveal style="--i:2"><img src="assets/img/${img}" alt="${imgAlt || ""}" loading="eager"></div>`
    : "";
  return `<section class="page-hero">
    <div class="container">
      <div class="${img ? "ph-grid" : ""}">
        <div>
          ${crumbs}
          <h1 data-reveal>${title}</h1>
          <p class="lead" data-reveal style="--i:1">${lead}</p>
          ${badgeHtml}
          ${ctaHtml}
        </div>
        ${media}
      </div>
    </div>
  </section>`;
}

function ctaBand({ heading, text, email, subject } = {}) {
  const c = D.contact;
  const mail = email || c.emailInfo;
  return `<section class="section-tight">
    <div class="container">
      <div class="cta-band" data-reveal>
        <div class="cta-bubbles"><span></span><span></span><span></span><span></span></div>
        <h2 class="h2">${heading || "Get a free, no-obligation quotation today"}</h2>
        <p>${text || "We're here to help, so don't hesitate to get in touch. Tell us what needs cleaning and we'll come back with a quote, fast."}</p>
        <div class="cta-actions">
          <a class="btn btn-light btn-lg" href="get-a-quote.html">Get a Free Quote ${arrow()}</a>
          <a class="cta-phone" href="${c.phone1Href}">${icon("phone")} ${c.phone1}</a>
        </div>
      </div>
    </div>
  </section>`;
}

function trustline() {
  const items = [
    ["shield-check", "£10m Public Liability cover"],
    ["user-check", "DBS checked staff"],
    ["award", "SafeContractor approved"],
    ["certificate", "IPAF & IOSH accredited"],
    ["thumb-up", "100% satisfaction guarantee"],
    ["clock", "24-hour callback system"],
    ["leaf", "Eco-friendly options"],
    ["credit-card", "Cash, card or direct debit"],
  ];
  const seq = items.map((i) => `<span class="marquee-item">${icon(i[0])} ${i[1]}</span>`).join("");
  return `<div class="trustline" aria-hidden="true">
    <div class="marquee"><div class="marquee-track">${seq}${seq}</div></div>
  </div>`;
}

function servicesGrid(list, { compact } = {}) {
  return `<div class="services-grid">
    ${list.map((s, i) => `
    <article class="svc-card" data-reveal style="--i:${i % 6}">
      ${compact ? "" : `<a class="svc-img" href="${s.slug}.html" tabindex="-1" aria-hidden="true"><img src="assets/img/${s.img}" alt="" loading="lazy"></a>`}
      <div class="svc-body">
        <h3>${icon(s.icon)} ${s.name}</h3>
        <p>${s.short}</p>
        <a class="text-link" href="${s.slug}.html">Learn more ${icon("arrow-right")}</a>
      </div>
    </article>`).join("")}
  </div>`;
}

const AVATAR_COLORS = ["#0a5dff", "#0c9d61", "#9a4bd6", "#e0731d", "#d6336c", "#0a8f9d"];
function reviewCard(r, i) {
  const initials = r.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return `<figure class="review-card" data-reveal style="--i:${i % 4}">
    <div class="stars" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
    <blockquote>&ldquo;${r.text}&rdquo;</blockquote>
    <figcaption><span class="avatar" style="background:${AVATAR_COLORS[i % AVATAR_COLORS.length]}">${initials}</span> ${r.name}</figcaption>
  </figure>`;
}

function reviewsRail() {
  return `<div data-rail>
    <div class="reviews-rail">${D.reviews.map(reviewCard).join("")}</div>
    <div class="rail-nav">
      <button class="rail-btn" type="button" data-rail-prev aria-label="Previous reviews">${icon("arrow-left")}</button>
      <button class="rail-btn" type="button" data-rail-next aria-label="Next reviews">${icon("arrow-right")}</button>
    </div>
  </div>`;
}

function featureList(features) {
  return `<div class="feature-list">
    ${features.map((f, i) => `
    <div class="feature" data-reveal style="--i:${i % 4}">
      <div class="f-icon">${icon(f.icon)}</div>
      <div><h3>${f.title}</h3><p>${f.text}</p></div>
    </div>`).join("")}
  </div>`;
}

function beforeAfter(img1, img2, alt) {
  return `<div class="ba" data-reveal>
    <img src="assets/img/${img1}" alt="${alt} before and after comparison" loading="lazy">
    <img class="ba-after" src="assets/img/${img2}" alt="" loading="lazy">
    <div class="ba-handle"></div>
    <span class="ba-tag left">Before</span>
    <span class="ba-tag right">After</span>
  </div>`;
}

function accordion(faqs) {
  return `<div class="accordion">
    ${faqs.map((f, i) => `
    <div class="acc-item" data-reveal style="--i:${i % 5}">
      <button class="acc-q" type="button">${f.q}<span class="acc-icon">${icon("plus")}</span></button>
      <div class="acc-a"><div><p>${f.a}</p></div></div>
    </div>`).join("")}
  </div>`;
}

function priceCards(packages) {
  return `<div class="price-cards">
    ${packages.map((p, i) => `
    <div class="price-card${p.featured ? " featured" : ""}" data-reveal style="--i:${i}">
      ${p.tag ? `<span class="pc-tag">${p.tag}</span>` : ""}
      <h3>${p.name}</h3>
      <div class="pc-price">${p.price}${p.note ? ` <small>${p.note}</small>` : ""}</div>
      <ul>${p.items.map((it) => `<li>${tick()} ${it}</li>`).join("")}</ul>
      <a class="btn btn-primary" href="get-a-quote.html">Get a Free Quote</a>
    </div>`).join("")}
  </div>`;
}

function field({ label, name, type = "text", required, placeholder, options, hint, textarea, full }) {
  const req = required ? ' required' : "";
  const reqMark = required ? ' <span class="req">*</span>' : "";
  let control;
  if (options) {
    control = `<select name="${name}"${req}><option value="">Please select</option>${options.map((o) => `<option>${o}</option>`).join("")}</select>`;
  } else if (textarea) {
    control = `<textarea name="${name}" placeholder="${placeholder || ""}"${req}></textarea>`;
  } else {
    control = `<input type="${type}" name="${name}" placeholder="${placeholder || ""}"${req}>`;
  }
  return `<div class="field${full ? " full" : ""}">
    <label>${label}${reqMark}</label>
    ${control}
    ${hint ? `<span class="hint">${hint}</span>` : ""}
  </div>`;
}

/* ================================================================= pages */

const pages = [];
function page(file, title, desc, active, body) {
  pages.push({ file, title, desc, active, body });
}

/* --------------------------------------------------------------- home */

const c = D.contact;

const homeHero = `<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <span class="hero-pill" data-hero="1">${icon("map-pin")} Birmingham's trusted local cleaning experts</span>
      <h1 class="display" data-hero="2">The home of <span class="accent">happy</span> customers</h1>
      <p class="lead" data-hero="3">Residential and commercial cleaning across Birmingham. 37 services, one friendly local team, and a 100% satisfaction guarantee.</p>
      <div class="hero-ctas" data-hero="4">
        <a class="btn btn-primary btn-lg" href="get-a-quote.html">Get a Free Quote ${arrow()}</a>
        <a class="btn btn-ghost btn-lg" href="our-services.html">Browse Our Services</a>
      </div>
    </div>
    <div class="hero-media" data-hero="3">
      <div class="hero-blob"></div>
      <img class="hero-img" src="assets/img/house-exterior.png" alt="A large detached home in Birmingham cleaned by JJ Cleaning Services" fetchpriority="high">
      <div class="float-card fc-a">
        <div class="fc-icon">${icon("sparkles")}</div>
        <div><strong>8+ years</strong><span>of cleaning experience</span></div>
      </div>
      <div class="float-card fc-b">
        <div class="fc-icon">${icon("thumb-up")}</div>
        <div><strong>99% returning</strong><span class="fc-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div>
      </div>
    </div>
  </div>
</section>`;

const homeStats = `<section class="section-tight bg-white">
  <div class="container stats-band">
    <div class="stat" data-reveal style="--i:0"><b data-count="37">0</b><span>Different services</span></div>
    <div class="stat" data-reveal style="--i:1"><b data-count="8" data-suffix="+">0</b><span>Years of experience</span></div>
    <div class="stat" data-reveal style="--i:2"><b data-count="99" data-suffix="%">0</b><span>Returning customers</span></div>
    <div class="stat" data-reveal style="--i:3"><b data-count="100" data-suffix="%">0</b><span>Satisfaction guarantee</span></div>
  </div>
</section>`;

const homeServices = `<section class="section">
  <div class="container">
    <div class="section-head" data-reveal>
      <h2 class="h2">Residential &amp; commercial cleaning services</h2>
      <p class="lead">Here at JJ Cleaning Services we take all customer needs into account. We always try our best to be of little or no inconvenience to you, and to do the best job we possibly can.</p>
    </div>
    ${servicesGrid(D.services.slice(0, 6))}
    <div style="text-align:center; margin-top:2.5rem" data-reveal>
      <a class="btn btn-ghost btn-lg" href="our-services.html">View all 37 services ${arrow()}</a>
    </div>
  </div>
</section>`;

const homeBA = `<section class="section bg-white">
  <div class="container">
    <div class="section-head center" data-reveal>
      <h2 class="h2">See the JJ difference</h2>
      <p class="lead">Real results from real jobs around Birmingham. Drag the slider to compare.</p>
    </div>
    <div class="ba-wrap">
      ${beforeAfter("ba-driveway-before.jpg", "ba-driveway-after.jpg", "Driveway and garden path pressure washing")}
      ${beforeAfter("ba-roof-before.jpg", "ba-roof-after.jpg", "Roof cleaning")}
    </div>
  </div>
</section>`;

const homeProcess = `<section class="section bg-navy">
  <div class="container">
    <div class="section-head" data-reveal>
      <h2 class="h2">How we work</h2>
      <p class="muted lead">From first click to sparkling finish, our process keeps things simple.</p>
    </div>
    <div class="process">
      ${D.processSteps.map((s, i) => `
      <div class="step" data-reveal style="--i:${i}">
        <div class="step-n">${s.n}</div>
        <h3>${s.title}</h3>
        <p>${s.text}</p>
      </div>`).join("")}
    </div>
  </div>
</section>`;

const homeWhy = `<section class="section">
  <div class="container split">
    <div class="split-img" data-reveal><img src="assets/img/window-cleaning.jpg" alt="JJ Cleaning Services operative cleaning high windows with a water fed pole"></div>
    <div class="split-copy" data-reveal style="--i:1">
      <h2 class="h2">We have the know-how you need</h2>
      <p class="muted">Your local cleaning service. We pay attention to detail, always striving to use the best tools and products to achieve the best possible results, and we're always there to clean something you can't reach. You can depend on us to clean it safely and at minimal inconvenience to you.</p>
      <ul class="ticks">
        <li>${tick()} Fully insured with £10m Public and Employers Liability cover</li>
        <li>${tick()} Uniformed, DBS-checked and fully trained staff</li>
        <li>${tick()} SMS reminders the night before every scheduled clean</li>
        <li>${tick()} Pay by cash, contactless, bank transfer or direct debit</li>
        <li>${tick()} Not happy? Tell us within 24 hours and we'll re-clean for free</li>
      </ul>
      <div style="margin-top:1.8rem"><a class="btn btn-primary" href="accreditations.html">See our accreditations ${arrow()}</a></div>
    </div>
  </div>
</section>`;

const homeReviews = `<section class="section bg-white">
  <div class="container">
    <div class="section-head" data-reveal>
      <h2 class="h2">Real stories, real satisfaction</h2>
      <p class="lead">From improved hygiene to enhanced productivity, here's what our customers say.</p>
    </div>
    ${reviewsRail()}
    <div data-reveal><a class="text-link" href="reviews.html">Read all reviews ${icon("arrow-right")}</a></div>
  </div>
</section>`;

const homeAreas = `<section class="section">
  <div class="container split">
    <div class="split-copy" data-reveal>
      <h2 class="h2">Covering Birmingham and beyond</h2>
      <p class="muted">Based in Tyseley, we cover Birmingham and the surrounding areas, with locations opening across the Midlands and the North West. We can also recommend vetted, insured contractors nationwide through our approved contractor network.</p>
      <div style="margin-top:1.8rem"><a class="btn btn-primary" href="our-locations.html">View our locations ${arrow()}</a></div>
    </div>
    <div data-reveal style="--i:1">
      <div class="chips">${D.areas.map((a) => `<span class="chip">${a}</span>`).join("")}</div>
    </div>
  </div>
</section>`;

const homeClients = `<section class="section bg-white">
  <div class="container">
    <div class="section-head" data-reveal>
      <h2 class="h2">Take a look at some of our clients</h2>
      <p class="lead">From NHS trusts, schools and charities to household names like KFC, McDonald's and Tesco Express, organisations across Birmingham trust us with their premises.</p>
    </div>
    <div class="clients-grid">
      ${Array.from({ length: 20 }, (_, i) => `<div class="client-tile" data-reveal style="--i:${i % 5}"><img src="assets/img/clients/client-${String(i + 1).padStart(2, "0")}.png" alt="" loading="lazy"></div>`).join("")}
    </div>
  </div>
</section>`;

const homeGroup = `<section class="section">
  <div class="container">
    <div class="section-head" data-reveal>
      <h2 class="h2">Our group</h2>
      <p class="lead">JJ Cleaning Services is part of JJ Group (UK) LTD, alongside our sister brands.</p>
    </div>
    <div class="grid-3">
      ${D.group.map((g, i) => `
      <a class="info-card" href="${g.url}" target="_blank" rel="noopener" data-reveal style="--i:${i}">
        <img src="assets/img/${g.img}" alt="${g.name} logo" style="height:64px;width:auto;margin-bottom:1rem">
        <h3>${g.name}</h3>
        <p>${g.desc}</p>
      </a>`).join("")}
    </div>
  </div>
</section>`;

page("index.html",
  "JJ Cleaning Services Birmingham | Your Trusted Local Cleaning Experts",
  "Welcome to JJ Cleaning Services, the home of happy customers. Residential and commercial cleaning across Birmingham with a 100% satisfaction guarantee. Get a free quote today.",
  "index.html",
  homeHero + trustline() + homeStats + homeServices + homeBA + homeProcess + homeWhy + homeReviews + homeAreas + homeClients + homeGroup + ctaBand());

/* ------------------------------------------------------- our services */

page("our-services.html",
  "Our Services | JJ Cleaning Services Birmingham",
  "Explore all 37 cleaning services from JJ Cleaning Services Birmingham: window cleaning, valeting, pressure washing, carpet cleaning, commercial services and more.",
  null,
  pageHero({
    crumb: "Our Services",
    title: "One team for every cleaning job",
    lead: "All of our services are fully insured and carried out by our full-time cleaners, who have been through police checks and our strict vetting procedure.",
    badges: [["shield-check", "Fully insured"], ["user-check", "Vetted staff"], ["thumb-up", "Satisfaction guarantee"]],
  }) +
  `<section class="section">
    <div class="container">
      ${servicesGrid(D.services)}
    </div>
  </section>
  <section class="section bg-white">
    <div class="container">
      <div class="section-head" data-reveal>
        <h2 class="h2">And plenty more</h2>
        <p class="lead">If a service you'd like isn't listed, feel free to contact us. Most likely, we'll have the tools to clean it.</p>
      </div>
      <div class="chips" data-reveal>${D.otherServices.map((s) => `<a class="chip" href="get-a-quote.html">${s}</a>`).join("")}</div>
      <div class="notice" style="margin-top:2.2rem" data-reveal>
        ${icon("info-circle")}
        <span>Our guarantee: if for any reason you are not completely satisfied with the work carried out, we will return to the property and do it again free of charge.</span>
      </div>
    </div>
  </section>` +
  ctaBand());

/* ------------------------------------------------- individual services */

function servicePage(slug, opts) {
  const svc = D.services.find((s) => s.slug === slug);
  page(slug + ".html", opts.title, opts.desc, null,
    pageHero({
      crumb: `<a href="our-services.html">Our Services</a> ${icon("chevron-right")} ${svc.name}`,
      title: opts.heroTitle || svc.name,
      lead: opts.heroLead,
      img: opts.heroImg || svc.img,
      imgAlt: opts.heroImgAlt || svc.name,
      badges: opts.badges || [["shield-check", "Fully insured"], ["user-check", "DBS checked staff"], ["thumb-up", "Satisfaction guarantee"]],
      ctas: [`<a class="btn btn-primary btn-lg" href="get-a-quote.html">Get a Free Quote ${arrow()}</a>`,
             `<a class="cta-phone" style="border-color:rgba(255,255,255,0.3)" href="${c.phone1Href}">${icon("phone")} ${c.phone1}</a>`],
    }) + opts.body + (opts.noCta ? "" : ctaBand(opts.cta || {})));
}

/* Window cleaning */
servicePage("window-cleaning", {
  title: "Window Cleaning Birmingham | JJ Cleaning Services",
  desc: "Residential and commercial window cleaning in Birmingham. Frames and sills washed on every visit, 4-weekly or 8-weekly rounds, satisfaction guaranteed.",
  heroLead: "Attention to detail is important to us. Whether it's a traditional approach or our sophisticated pure water system, this service always includes washing down the frames and the sills, making sure the whole window is kept clean.",
  body: `
  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal>
        <h2 class="h2">Why customers stay with us</h2>
      </div>
      ${featureList([
        { icon: "thumb-up", title: "Satisfaction guarantee", text: "If you're not entirely pleased with your window clean, notify us within 24 hours and we will re-clean your windows at no extra cost." },
        { icon: "users", title: "Professional staff", text: "Our uniformed window cleaners are highly professional, courteous and customer-focused." },
        { icon: "key", title: "Your property secured", text: "Our fully trained window cleaners make sure your property's gates are closed securely as they leave." },
        { icon: "credit-card", title: "Hassle-free payment", text: "Easy online payments, direct debit or cash, whatever suits you best." },
        { icon: "message-circle", title: "SMS reminders", text: "We send SMS notifications at 7pm the night before your scheduled cleaning." },
        { icon: "shield-check", title: "Fully insured", text: "Rest easy knowing we are fully insured, providing an extra layer of protection for your property." },
      ])}
    </div>
  </section>
  <section class="section bg-white">
    <div class="container">
      <div class="section-head" data-reveal>
        <h2 class="h2">Window cleaning price guide</h2>
        <p class="lead">First clean costs 25% extra. Large properties from £32, and properties in rural locations may be slightly more. Prices are a guide and may change upon visual inspection.</p>
      </div>
      <div class="price-table-wrap" data-reveal>
        <table class="price-table">
          <thead><tr><th>Property</th><th>4 weekly</th><th>8 weekly</th><th>Conservatory</th><th>Extension</th><th>Large porch</th></tr></thead>
          <tbody>${D.windowPrices.map((r) => `<tr>${r.map((v, i) => i === 0 ? `<td>${v}</td>` : `<td>${v}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>
    </div>
  </section>`,
});

/* Vehicle valeting */
servicePage("vehicle-valeting", {
  title: "Vehicle Valeting Birmingham | JJ Cleaning Services",
  desc: "Mobile vehicle valeting in Birmingham. Exterior, interior, full and deep clean valets from £15, plus monthly maintenance plans. We come to you.",
  heroLead: "Full vehicle restoration to showroom condition: interior shampooing, door shuts, vacuuming, hand-washed wheels, exterior waxing, boot and engine bay cleaning, and crystal clear glass.",
  badges: [["car", "We come to you"], ["sparkles", "Showroom finish"], ["credit-card", "From £15"]],
  body: `
  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal>
        <h2 class="h2">Valeting packages</h2>
        <p class="lead">Every package can be tailored to suit you. For an accurate quote, email us photos of your car in its current condition.</p>
      </div>
      ${priceCards(D.valetPackages)}
    </div>
  </section>
  <section class="section bg-white">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">Make it yours with add-ons</h2></div>
      <div class="grid-2">
        ${D.valetAddons.map((g, gi) => `
        <div class="info-card" data-reveal style="--i:${gi}">
          <h3>${icon(gi === 0 ? "spray" : "armchair")} ${g.group}</h3>
          <ul style="display:grid;gap:0.55rem;margin-top:0.6rem">
            ${g.items.map((it) => `<li style="display:flex;justify-content:space-between;gap:1rem"><span>${it[0]}</span><strong>${it[1]}</strong></li>`).join("")}
          </ul>
        </div>`).join("")}
      </div>
      <div class="notice" style="margin-top:1.6rem" data-reveal>
        ${icon("info-circle")}
        <span>We need access to a mains water tap and a mains electrical socket. Travel is charged at £1 per mile extra outside our local area.</span>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal>
        <h2 class="h2">Monthly maintenance plans</h2>
        <p class="lead">Keep your car looking its best all year round. Subscriptions auto-renew monthly until cancelled.</p>
      </div>
      ${priceCards(D.valetSubscriptions)}
    </div>
  </section>`,
});

/* Fleet cleaning */
servicePage("fleet-cleaning", {
  title: "Fleet Cleaning Birmingham | JJ Cleaning Services",
  desc: "Mobile fleet washing across Birmingham: trucks, trailers and interiors. Proven results, trained workforce and food hygiene standards. Free site survey.",
  heroLead: "Effective mobile fleet wash solutions with a proven track record of delivering high quality, consistent results for fleets of every size.",
  badges: [["truck", "Mobile service"], ["shield-check", "Health & Safety certified"], ["award", "Best value pricing"]],
  body: `
  <section class="section">
    <div class="container split">
      <div class="split-copy" data-reveal>
        <h2 class="h2">What you can expect</h2>
        <ul class="ticks" style="margin-top:1.2rem">
          <li>${tick()} Effective mobile fleet wash solutions with a proven track record of high quality, consistent results</li>
          <li>${tick()} A fully trained, reliable and well-equipped workforce. We only use the best</li>
          <li>${tick()} Full recognition of food hygiene standards and Health &amp; Safety procedures</li>
          <li>${tick()} Value for money: our range of mobile fleet wash price options ensures best value</li>
        </ul>
      </div>
      <div class="split-img" data-reveal style="--i:1"><img src="assets/img/fleet-cleaning.webp" alt="A row of clean white fleet trucks"></div>
    </div>
  </section>
  <section class="section bg-white" id="fleet-quote">
    <div class="container-narrow">
      <div class="section-head" data-reveal>
        <h2 class="h2">Get a free fleet cleaning quotation</h2>
        <p class="lead">After you have submitted this form, we will contact you to arrange an in-person site survey and meeting.</p>
      </div>
      <form class="form-card form-grid" data-reveal data-mailto="${c.emailCommercial}" data-subject="Fleet Cleaning Quotation Request">
        ${field({ label: "Company name", name: "Company", required: true })}
        ${field({ label: "Customer account number", name: "Account Number", hint: "Optional, for existing customers" })}
        ${field({ label: "Point of contact", name: "Contact Name", required: true })}
        ${field({ label: "Phone", name: "Phone", type: "tel", required: true })}
        ${field({ label: "Email", name: "Email", type: "email", required: true })}
        ${field({ label: "Type of cleaning", name: "Cleaning Type", required: true, options: ["Mobile Truck & Fleet Washing", "Trailer & Bed Washout", "Truck & Fleet Interior Valeting", "Other"] })}
        ${field({ label: "Fleet size", name: "Fleet Size", required: true, options: ["1-10", "11-25", "26-40", "40-60", "60+"] })}
        ${field({ label: "Site address including postcode", name: "Site Address", required: true, full: true })}
        ${field({ label: "Do you have a wash bay or specific cleaning area?", name: "Wash Bay", options: ["Yes", "No", "Not sure"] })}
        ${field({ label: "Mains water and electric available?", name: "Water and Electric", options: ["Both", "Water only", "Electric only", "Neither"] })}
        ${field({ label: "Additional information", name: "Additional Info", textarea: true, full: true, placeholder: "Anything else we should know about your fleet or site" })}
        <div class="full"><button class="btn btn-primary btn-lg" type="submit">Contact Us Today ${arrow()}</button></div>
        <p class="form-success full">Thank you! Your email is ready to send. We will contact you to arrange a site survey.</p>
      </form>
    </div>
  </section>`,
  noCta: true,
});

/* Pressure washing */
servicePage("pressure-washing", {
  title: "Pressure Washing Birmingham | JJ Cleaning Services",
  desc: "Pressure washing across Birmingham for homes and businesses: block paving, concrete, tarmac, natural stone, cladding and steam cleaning. From £25.",
  heroLead: "Providing pressure washing across Birmingham to both commercial and residential customers. We clean block paving, concrete, tarmac and natural stone, with cladding and steam cleaning for commercial property management.",
  body: `
  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal>
        <h2 class="h2">Our 5-step driveway process</h2>
      </div>
      ${featureList([
        { icon: "brush", title: "Pre-cleaning", text: "Removing loose debris from the surface prevents it from hindering the cleaning process." },
        { icon: "spray", title: "Pressure washing", text: "Using our high powered pressure washer, we remove all the dirt from the face of the surface and between the blocks." },
        { icon: "leaf", title: "Clean up", text: "We make sure all of the moss and dead weeds are cleared up and the blocks are moss and weed free." },
        { icon: "droplet", title: "Treat the driveway", text: "We use an industry-standard cleaning chemical, sodium hydroxide, to achieve the best clean possible." },
        { icon: "calendar", title: "Retreatment service", text: "We can return every 3 months as part of our retreatment programme, keeping your driveway low maintenance." },
        { icon: "shield-check", title: "Surface-safe methods", text: "Decking, patios, driveways, walkways, concrete and brick are all suitable. We'll advise honestly if a surface isn't." },
      ])}
    </div>
  </section>
  <section class="section bg-white">
    <div class="container split">
      <div class="split-img" data-reveal><img src="assets/img/pressure-washing.jpg" alt="Freshly pressure washed block paving path"></div>
      <div class="split-copy" data-reveal style="--i:1">
        <h2 class="h2">Keep it clean with retreatment</h2>
        <p class="muted">Professional weed and algae killer application every 3 months, so your driveway stays looking its best between cleans.</p>
        <div class="pc-price" style="margin:1.2rem 0">£50 <small>every 3 months</small></div>
        <ul class="ticks">
          <li>${tick()} Block pavement from £1.50 per metre</li>
          <li>${tick()} Tarmac and slabs from £0.80 per metre</li>
          <li>${tick()} £25.00 minimum service charge</li>
          <li>${tick()} Only an outdoor tap required</li>
        </ul>
      </div>
    </div>
  </section>`,
});

/* Carpet cleaning */
servicePage("carpet-cleaning", {
  title: "Carpet Cleaning Birmingham | JJ Cleaning Services",
  desc: "Professional carpet steam cleaning in Birmingham. Deep extraction removes dirt, bacteria and allergens. Fast-drying with Dri Pods. Safe for kids and pets.",
  heroLead: "More than a quick vacuum: a deep, professional carpet clean that removes the dirt, bacteria and allergens trapped within the fibres that standard cleaning can't reach.",
  badges: [["sparkles", "Steam cleaning"], ["heart-handshake", "Safe for kids & pets"], ["clock", "Fast-drying"]],
  body: `
  <section class="section">
    <div class="container split">
      <div class="split-copy" data-reveal>
        <h2 class="h2">Restore, refresh, protect</h2>
        <p class="muted">Over time, carpets collect dust, stains and spills, leaving them looking tired and worn. Our professional carpet cleaning restores their appearance, removes hidden pollutants and extends their life, keeping your space fresh and healthy.</p>
        <p class="muted">Our thorough process uses advanced carpet steam cleaning techniques and powerful extraction methods to make sure every fibre is properly cleaned and refreshed.</p>
      </div>
      <div class="split-img" data-reveal style="--i:1"><img src="assets/img/carpet-cleaning.jpg" alt="Freshly deep-cleaned carpet in a Birmingham home"></div>
    </div>
  </section>
  <section class="section bg-navy">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">Our 4-step carpet cleaning process</h2></div>
      <div class="process">
        <div class="step" data-reveal style="--i:0"><div class="step-n">01</div><h3>Thorough vacuuming</h3><p>We thoroughly vacuum the area to remove all surface dirt, making pre-treatment easier. This removes 80% of dry soil and dirt.</p></div>
        <div class="step" data-reveal style="--i:1"><div class="step-n">02</div><h3>Pre-treatment &amp; stains</h3><p>We pre-treat carpets for 5 to 15 minutes to break down deep-seated dirt, applying specialist products to heavily soiled areas.</p></div>
        <div class="step" data-reveal style="--i:2"><div class="step-n">03</div><h3>Carpet extraction</h3><p>We rinse and extract your carpets to remove all dirt and cleaning agents, leaving no sticky residue behind.</p></div>
        <div class="step" data-reveal style="--i:3"><div class="step-n">04</div><h3>Fast-drying finish</h3><p>Dri Pods speed up the drying process, so your carpets can be used again as quickly as possible with minimal disruption.</p></div>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">Carpet cleaning prices</h2></div>
      <div class="grid-3">
        <div class="info-card" data-reveal style="--i:0"><h3>${icon("home")} Small room</h3><p>Up to 4m x 4m</p><div class="pc-price" style="margin-top:0.8rem">£35.00</div></div>
        <div class="info-card" data-reveal style="--i:1"><h3>${icon("home")} Stairs &amp; landing</h3><p>Full flight, brushed and extracted</p><div class="pc-price" style="margin-top:0.8rem">£20.00</div></div>
        <div class="info-card" data-reveal style="--i:2"><h3>${icon("building")} Commercial</h3><p>Hotels, nursing homes, offices</p><div class="pc-price" style="margin-top:0.8rem">£4.00 <small>per m&sup2;</small></div></div>
      </div>
    </div>
  </section>`,
});

/* Upholstery cleaning */
servicePage("upholstery-cleaning", {
  title: "Upholstery Cleaning Birmingham | JJ Cleaning Services",
  desc: "Upholstery cleaning across Birmingham and Solihull: sofas, mattresses, rugs and furniture restoration, plus pet accident and odour removal.",
  heroLead: "Providing lots of different upholstery cleaning services across Birmingham: rug cleaning, furniture upholstery cleaning and restoration, and sanitising services.",
  body: `
  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">Specialist treatments</h2></div>
      ${featureList([
        { icon: "armchair", title: "Furniture restoration", text: "Sofas, armchairs and dining chairs deep cleaned and restored to their best." },
        { icon: "sparkles", title: "Mattress cleaning", text: "Deep cleaning including dust mite elimination for a healthier night's sleep." },
        { icon: "heart-handshake", title: "Pet accidents", text: "Milk, urine and odour removal that deals with the cause, not just the smell." },
        { icon: "building", title: "Commercial upholstery", text: "Serving hotels, nursing homes, offices and business premises in Birmingham and Solihull." },
      ])}
    </div>
  </section>
  <section class="section bg-white">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">Upholstery prices</h2></div>
      <div class="price-cards">
        <div class="price-card" data-reveal style="--i:0"><h3>Dining chair</h3><div class="pc-price">£20.00</div><ul><li>${tick()} Deep clean &amp; sanitise</li></ul><a class="btn btn-primary" href="get-a-quote.html">Get a Free Quote</a></div>
        <div class="price-card" data-reveal style="--i:1"><h3>Armchair</h3><div class="pc-price">£30.00</div><ul><li>${tick()} Deep clean &amp; sanitise</li></ul><a class="btn btn-primary" href="get-a-quote.html">Get a Free Quote</a></div>
        <div class="price-card" data-reveal style="--i:2"><h3>2-seater sofa</h3><div class="pc-price">£45.00</div><ul><li>${tick()} Deep clean &amp; sanitise</li></ul><a class="btn btn-primary" href="get-a-quote.html">Get a Free Quote</a></div>
        <div class="price-card" data-reveal style="--i:3"><h3>3-seater sofa</h3><div class="pc-price">£55.00</div><ul><li>${tick()} Deep clean &amp; sanitise</li></ul><a class="btn btn-primary" href="get-a-quote.html">Get a Free Quote</a></div>
      </div>
    </div>
  </section>`,
});

/* General cleaning */
servicePage("general-cleaning", {
  title: "General Cleaning Services Birmingham | JJ Cleaning Services",
  desc: "Flexible house, office and commercial cleaning across Birmingham. Tailored cleaning plans from £15 per hour with a professional, reliable team.",
  heroLead: "Flexible cleaning that fits into your business or home life, operating across Birmingham. Our professional team adapts to your schedule with tailored cleaning plans built around your needs.",
  body: `
  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">Three ways we can help</h2></div>
      <div class="grid-3">
        <div class="info-card" data-reveal style="--i:0">
          <h3>${icon("home")} House cleaning</h3>
          <p>Embark on a journey to a pristine home. Our dedicated team specialises in transforming homes across Birmingham into havens of cleanliness and tranquillity.</p>
          <div class="pc-price" style="margin-top:1rem">£15 <small>per hour</small></div>
        </div>
        <div class="info-card" data-reveal style="--i:1">
          <h3>${icon("briefcase")} Office cleaning</h3>
          <p>We elevate your workspace with meticulous office cleaning, keeping a spotless, productive environment for businesses throughout Birmingham.</p>
          <div class="pc-price" style="margin-top:1rem">£18 <small>per hour</small></div>
        </div>
        <div class="info-card" data-reveal style="--i:2">
          <h3>${icon("building-store")} Commercial cleaning</h3>
          <p>Unparalleled commercial cleaning that keeps your business spaces in Birmingham not just clean, but truly welcoming.</p>
          <div class="pc-price" style="margin-top:1rem">£18 <small>per hour</small></div>
        </div>
      </div>
      <div class="notice" style="margin-top:2rem" data-reveal>
        ${icon("info-circle")}
        <span>After building and end of tenancy cleans are charged at £22.00 per hour residential and £28.00 per hour commercial.</span>
      </div>
    </div>
  </section>`,
});

/* Commercial services */
servicePage("commercial-services", {
  title: "Commercial Cleaning Services Birmingham | JJ Cleaning Services",
  desc: "High-quality commercial cleaning in Birmingham: windows, pressure and steam cleaning, MEWP access, carpets, machine sweeping, cladding and litter picking.",
  heroLead: "From massive exterior cladding to high level internal vacuuming, we bring the same level of care. Big or small, we have you covered.",
  badges: [["shield-check", "£10m liability cover"], ["award", "SafeContractor members"], ["certificate", "IOSH & IPAF accredited"]],
  body: `
  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal>
        <h2 class="h2">Commercial services we provide</h2>
        <p class="lead">Are you seeking a high-quality commercial cleaning company in Birmingham? Here's how we keep your premises at their best.</p>
      </div>
      ${featureList([
        { icon: "sparkles", title: "Commercial window cleaning", text: "Sparkling windows will only enhance your good reputation. Regular rounds for offices, retail and managed buildings." },
        { icon: "spray", title: "Pressure & steam cleaning", text: "High-temperature steam and pressure to remove dirt, grime, grease and stains from any commercial surface." },
        { icon: "ladder", title: "MEWP & access support", text: "Safer, more efficient access solutions for work at height, with IPAF approved operators." },
        { icon: "armchair", title: "Carpet & upholstery cleaning", text: "Professional, deep-cleansing results that maintain a pristine environment for staff and visitors." },
        { icon: "truck", title: "Machine sweeping", text: "Suitable for retail stores, car parks, industrial facilities and more." },
        { icon: "building", title: "Cladding cleaning", text: "Restoring the beauty and integrity of your building's exterior." },
        { icon: "leaf", title: "Litter picking", text: "Professional solutions for maintaining clean and presentable premises." },
        { icon: "users", title: "Sub-contract cleaning", text: "A vetted, insured team ready to support your facilities contracts nationwide." },
      ])}
    </div>
  </section>
  <section class="section bg-navy">
    <div class="container split">
      <div class="split-copy" data-reveal>
        <h2 class="h2">Peace of mind, built in</h2>
        <ul class="ticks" style="margin-top:1.2rem">
          <li>${tick()} £10m Public Liability cover and £10m Employers Liability Insurance</li>
          <li>${tick()} Health &amp; Safety certified, SafeContractor members</li>
          <li>${tick()} Accredited by IOSH and IPAF</li>
          <li>${tick()} Many years' experience in all types of exterior cleaning</li>
        </ul>
        <div style="margin-top:1.8rem"><a class="btn btn-primary" href="mailto:${c.emailCommercial}">Email our commercial team ${arrow()}</a></div>
      </div>
      <div class="split-img" data-reveal style="--i:1"><img src="assets/img/high-level.jpg" alt="Cherry picker providing high level access for commercial cleaning"></div>
    </div>
  </section>`,
  cta: { email: c.emailCommercial },
});

/* Emergency cleaning */
servicePage("emergency-cleaning", {
  title: "Emergency Cleaning Services Birmingham | JJ Cleaning Services",
  desc: "24/7 rapid-response emergency cleaning in Birmingham: flood clean-up, steam cleaning, deep cleaning and more. Flat £55 call-out fee plus service cost.",
  heroLead: "Rapid-response cleaning call-outs to manage unexpected, hazardous or damaging situations that need immediate professional attention, handled promptly, safely, discreetly and in a legally compliant manner.",
  badges: [["alert-triangle", "Rapid response"], ["shield-check", "£10m liability cover"], ["clock", "Out-of-hours available"]],
  body: `
  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal>
        <h2 class="h2">Emergency services we offer</h2>
        <p class="lead">We charge a flat fee of £55.00 for all emergency call-outs, plus the cost of your required service.</p>
      </div>
      ${featureList([
        { icon: "droplet", title: "Flood cleaning", text: "An urgent, professional response to water ingress, focusing on rapid removal and thorough decontamination." },
        { icon: "spray", title: "Pressure & steam cleaning", text: "High-temperature steam and pressure to remove dirt, grime, grease and stains, fast." },
        { icon: "sparkles", title: "Deep cleaning", text: "A thorough process that goes beyond regular cleaning, eliminating dirt and allergens." },
        { icon: "truck", title: "Fleet & vehicle valeting", text: "Comprehensive emergency cleaning and detailing for company vehicles." },
        { icon: "ladder", title: "MEWP & access support", text: "A range of solutions for working at height at short notice." },
        { icon: "leaf", title: "Litter picking", text: "Professional solutions to get premises clean and presentable quickly." },
      ])}
      <div class="notice" style="margin-top:2rem" data-reveal>
        ${icon("alert-triangle")}
        <span><strong>Need us urgently?</strong> Email <a href="mailto:${c.emailEmergency}"><strong>${c.emailEmergency}</strong></a> or call <a href="${c.phone1Href}"><strong>${c.phone1}</strong></a> and our emergency call-out team will respond as fast as possible.</span>
      </div>
    </div>
  </section>`,
  cta: { heading: "Contact our emergency call-out team today", email: c.emailEmergency },
});

/* Street cleaning */
servicePage("street-cleaning", {
  title: "Street Cleaning Birmingham | JJ Cleaning Services",
  desc: "Street cleaning in partnership with Birmingham City Council and Cleaner Greener Streets: manual and machine sweeping for streets, communities and council housing.",
  heroLead: "Making Birmingham streets and communities cleaner. We work in partnership with Birmingham City Council and Cleaner Greener Streets, providing cleaning services to streets, communities and council houses.",
  badges: [["road", "Council partnership"], ["shield-check", "£10m liability cover"], ["leaf", "Community focused"]],
  body: `
  <section class="section">
    <div class="container split">
      <div class="split-copy" data-reveal>
        <h2 class="h2">What street cleaning involves</h2>
        <p class="muted">Street sweeping is the process of cleaning streets, public areas and roads to remove dirt, litter and debris. It can be done manually with brooms and shovels, or with specialised modern machinery like truck-mounted sweepers that use brushes, water and vacuums to pick up waste.</p>
        <ul class="ticks" style="margin-top:1.4rem">
          <li>${tick()} Fully insured with £10m Public Liability and £10m Employers Liability cover</li>
          <li>${tick()} Health &amp; Safety certified, SafeContractor members, IOSH and IPAF accredited</li>
          <li>${tick()} Many years' experience in all types of exterior cleaning</li>
        </ul>
        <div style="margin-top:1.8rem"><a class="btn btn-primary" href="mailto:${c.emailStreet}">Request street cleaning ${arrow()}</a></div>
      </div>
      <div class="split-img" data-reveal style="--i:1"><img src="assets/img/before-after-roof.jpg" alt="Before and after of an exterior cleaning job"></div>
    </div>
  </section>`,
  cta: { email: c.emailStreet },
});

/* IPAF hire */
servicePage("ipaf-hire", {
  title: "IPAF Operative Hire Birmingham | JJ Cleaning Services",
  desc: "Hire IPAF approved MEWP operators in Birmingham. Cherry picker (3B) and scissor lift (3A) hire with fully trained operators from £30 per hour.",
  heroLead: "Hire an IPAF approved operator. Our operators are trained to prepare and safely operate various types of MEWPs, also referred to as cherry pickers, aerial lifts or scissor lifts.",
  badges: [["ladder", "IPAF approved"], ["shield-check", "Full working-at-height PPE"], ["map-pin", "Covering all of Birmingham"]],
  body: `
  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">Operators and machinery</h2>
        <p class="lead">Please note this is a price guide only and does not include transport of machinery. All prices plus VAT.</p>
      </div>
      <div class="grid-2">
        <div class="price-card" data-reveal style="--i:0">
          <h3>Cherry Picker Lift (Category 3B)</h3>
          <div class="pc-price">£30 <small>per hour operator fee</small></div>
          <ul>
            <li>${tick()} 1 day rental: £230.00 plus VAT</li>
            <li>${tick()} 2 day rental: £460.00 plus VAT</li>
            <li>${tick()} 3 day rental: £920.00 plus VAT</li>
            <li>${tick()} PPE: helmet &amp; harness fall arrester</li>
          </ul>
          <a class="btn btn-primary" href="mailto:${c.emailHire}">Book an operator</a>
        </div>
        <div class="price-card" data-reveal style="--i:1">
          <h3>Scissor Lift (Category 3A)</h3>
          <div class="pc-price">£30 <small>per hour operator fee</small></div>
          <ul>
            <li>${tick()} 1 day rental: £215.00 plus VAT</li>
            <li>${tick()} 2 day rental: £430.00 plus VAT</li>
            <li>${tick()} 3 day rental: £860.00 plus VAT</li>
            <li>${tick()} PPE: helmet &amp; harness fall arrester</li>
          </ul>
          <a class="btn btn-primary" href="mailto:${c.emailHire}">Book an operator</a>
        </div>
      </div>
    </div>
  </section>`,
  cta: { email: c.emailHire },
});

/* Facility services */
servicePage("facility-services", {
  title: "JJ Facility Services | JJ Cleaning Services",
  desc: "JJ Facility Services: our dedicated facilities arm offering window cleaning, fleet cleaning, office cleaning, pressure washing and sub-contract cleaning.",
  heroLead: "Our dedicated facilities sub-company, offering complete facility cleaning for offices, sites and managed buildings across the region.",
  badges: [["building", "Facilities specialists"], ["shield-check", "Fully insured"], ["users", "Sub-contract ready"]],
  body: `
  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">What JJ Facility Services covers</h2></div>
      <div class="chips" data-reveal>
        ${["Window Cleaning", "Fleet Cleaning", "Office Cleaning", "Pressure Washing", "Gutter Cleaning", "High Level Cleaning", "Upholstery & Carpet Cleaning", "Litter Picking", "Sub-Contract Cleaning"].map((s) => `<span class="chip">${s}</span>`).join("")}
      </div>
      <div class="notice" style="margin-top:2rem" data-reveal>
        ${icon("mail")}
        <span>Talk to the facilities team directly: <a href="mailto:${c.emailFacilities}"><strong>${c.emailFacilities}</strong></a></span>
      </div>
    </div>
  </section>`,
  cta: { email: c.emailFacilities },
});

/* --------------------------------------------------- community support */

page("community-support.html",
  "Community Support | JJ Cleaning Services",
  "The JJ Cleaning Services Community Support Team works to make a meaningful difference across Birmingham's communities.",
  null,
  pageHero({
    crumb: "Community Support",
    title: "Community Support Team",
    lead: "We believe in giving back. Our Community Support Team works alongside local organisations to make a meaningful difference in the communities we serve across Birmingham.",
    badges: [["heart-handshake", "Volunteer friendly"], ["road", "Cleaner Greener Streets"], ["users", "Local team"]],
  }) +
  `<section class="section">
    <div class="container">
      <div class="grid-2">
        <div class="info-card" data-reveal style="--i:0">
          <h3>${icon("heart-handshake")} Get in touch with the team</h3>
          <p>Whether you have a community project in mind or need support in your area, the team would love to hear from you.</p>
          <p style="margin-top:0.8rem"><a class="text-link" href="mailto:${c.emailCommunity}">${c.emailCommunity} ${icon("arrow-right")}</a></p>
        </div>
        <div class="info-card" data-reveal style="--i:1">
          <h3>${icon("users")} Volunteer with us</h3>
          <p>Become a valued volunteer with JJ Cleaning Services and make a meaningful difference in your community, gaining valuable experience and a profound sense of fulfilment.</p>
          <p style="margin-top:0.8rem"><a class="text-link" href="careers.html">See volunteer opportunities ${icon("arrow-right")}</a></p>
        </div>
      </div>
    </div>
  </section>` + ctaBand({ heading: "Want to support your community with us?", text: "Reach out to the Community Support Team and let's make Birmingham cleaner and greener together." }));

/* -------------------------------------------------------------- about */

page("about-us.html",
  "About Us | JJ Cleaning Services Birmingham",
  "JJ Cleaning Services is a professional, reliable cleaning company established in 2017, providing 37 services across Birmingham with a 100% satisfaction guarantee.",
  null,
  pageHero({
    crumb: "About Us",
    title: "Local, friendly and safe since 2017",
    lead: "JJ Cleaning Services is a professional and reliable cleaning company. We provide 37 different services covering all aspects of your home or place of work.",
    img: "house-exterior.png",
    imgAlt: "A pristine detached home cared for by JJ Cleaning Services",
  }) +
  `<section class="section-tight bg-white">
    <div class="container stats-band">
      <div class="stat" data-reveal style="--i:0"><b data-count="2017">0</b><span>Established</span></div>
      <div class="stat" data-reveal style="--i:1"><b data-count="37">0</b><span>Different services</span></div>
      <div class="stat" data-reveal style="--i:2"><b data-count="99" data-suffix="%">0</b><span>Returning customers</span></div>
      <div class="stat" data-reveal style="--i:3"><b data-count="24" data-suffix="hr">0</b><span>Callback guarantee</span></div>
    </div>
  </section>
  <section class="section">
    <div class="container split">
      <div class="split-copy" data-reveal>
        <h2 class="h2">A word from our CEO</h2>
        <p class="muted" style="font-size:1.15rem">&ldquo;Having an obsession for cleaning and helping people is why JJ Cleaning Services was created. We want every customer to receive a good quality service at an affordable price.&rdquo;</p>
        <p style="margin-top:1rem"><strong>Jake Ali</strong><br><span class="muted">Chief Executive Officer</span></p>
      </div>
      <div data-reveal style="--i:1">
        <div class="grid-3" style="grid-template-columns:1fr 1fr 1fr">
          <div class="info-card" style="text-align:center"><div class="f-icon" style="margin:0 auto 0.8rem;width:46px;height:46px;border-radius:13px;background:var(--blue-tint);color:var(--blue);display:grid;place-items:center">${icon("map-pin")}</div><h3 style="justify-content:center">Local</h3><p>A genuinely local team that knows Birmingham.</p></div>
          <div class="info-card" style="text-align:center"><div class="f-icon" style="margin:0 auto 0.8rem;width:46px;height:46px;border-radius:13px;background:var(--blue-tint);color:var(--blue);display:grid;place-items:center">${icon("heart-handshake")}</div><h3 style="justify-content:center">Friendly</h3><p>Courteous, uniformed staff who care about your home.</p></div>
          <div class="info-card" style="text-align:center"><div class="f-icon" style="margin:0 auto 0.8rem;width:46px;height:46px;border-radius:13px;background:var(--blue-tint);color:var(--blue);display:grid;place-items:center">${icon("shield-check")}</div><h3 style="justify-content:center">Safe</h3><p>DBS checked, fully insured and safety accredited.</p></div>
        </div>
      </div>
    </div>
  </section>
  <section class="section bg-white">
    <div class="container">
      <div class="section-head" data-reveal>
        <h2 class="h2">The 100% satisfaction guarantee</h2>
        <p class="lead">We are happy to say we have a 100% customer satisfaction guarantee. We achieve this by offering a 24-hour callback system: if anything isn't right, tell us within 24 hours and we'll put it right, free of charge.</p>
      </div>
      ${reviewsRail()}
    </div>
  </section>` +
  ctaBand());

/* ------------------------------------------------------------- reviews */

page("reviews.html",
  "Reviews | JJ Cleaning Services Birmingham",
  "Real stories, real satisfaction. Read reviews from JJ Cleaning Services customers across Birmingham.",
  null,
  pageHero({
    crumb: "Reviews",
    title: "Our reviews",
    lead: "Real stories, real satisfaction. From improved hygiene to enhanced productivity, here's what our customers across Birmingham have to say.",
    badges: [["star", "5-star rated"], ["thumb-up", "99% returning customers"]],
  }) +
  `<section class="section">
    <div class="container">
      <div class="grid-3">
        ${D.reviews.map((r, i) => reviewCard(r, i)).join("")}
      </div>
      <div class="notice" style="margin-top:2.5rem" data-reveal>
        ${icon("message-circle")}
        <span>Had a clean recently? We'd love your feedback by phone, email, the comments card we leave after each visit, or on Trustpilot.</span>
      </div>
    </div>
  </section>` + ctaBand({ heading: "Ready to join our happy customers?" }));

/* ------------------------------------------------------ accreditations */

page("accreditations.html",
  "Accreditations & Licences | JJ Cleaning Services",
  "JJ Cleaning Services holds a large range of accreditations and licences including IPAF, CHAS, SafeContractor, IOSH, ISO 9001 and ISO 45001.",
  null,
  pageHero({
    crumb: "Accreditations",
    title: "Accreditations &amp; licences",
    lead: "We hold a large range of accreditations and licences to give you peace of mind that we know what we are doing, every time.",
    badges: [["certificate", "Independently audited"], ["shield-check", "£10m insurance cover"]],
  }) +
  `<section class="section">
    <div class="container">
      <div class="grid-3">
        ${D.accreditations.map((a, i) => `
        <div class="info-card" data-reveal style="--i:${i % 6}">
          ${a.img ? `<img src="assets/img/${a.img}" alt="${a.name} badge" style="height:56px;width:auto;max-width:170px;object-fit:contain;margin-bottom:1rem">` : `<div class="cert-fallback">${icon("file-certificate")}</div>`}
          <h3>${a.name}</h3>
          <p>${a.desc}</p>
        </div>`).join("")}
      </div>
      <div class="notice" style="margin-top:2.5rem" data-reveal>
        ${icon("clipboard-check")}
        <span>Certificates are available to view on request. Risk assessments and method statements can be provided for any job: just ask.</span>
      </div>
    </div>
  </section>` + ctaBand());

/* ---------------------------------------------------------------- QHSE */

page("qhse.html",
  "QHSE | Quality, Health, Safety & Environment | JJ Cleaning Services",
  "How JJ Cleaning Services manages Quality, Health, Safety and Environment: training, risk management, accreditations and safety reporting.",
  null,
  pageHero({
    crumb: "QHSE",
    title: "Quality, Health, Safety &amp; Environment",
    lead: "QHSE is the framework we use to manage our performance across four connected areas, with one daily goal above all: for everyone to return home safely.",
    badges: [["shield-check", "SafeContractor"], ["certificate", "ISO 9001 & 45001"], ["leaf", "Environment Agency registered"]],
  }) +
  `<section class="section">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">The four pillars</h2></div>
      ${featureList([
        { icon: "award", title: "Quality", text: "How we deliver our services, every visit, to the standard our customers expect." },
        { icon: "heart-handshake", title: "Health", text: "The wellbeing of our colleagues and customers comes before everything else." },
        { icon: "shield-check", title: "Safety", text: "Protection for everyone affected by our work, on every site, every day." },
        { icon: "leaf", title: "Environment", text: "Managing the impact of our business on natural systems, from chemicals to waste." },
      ])}
    </div>
  </section>
  <section class="section bg-navy">
    <div class="container split">
      <div class="split-copy" data-reveal>
        <h2 class="h2">How we keep everyone safe</h2>
        <ul class="ticks" style="margin-top:1.2rem">
          <li>${tick()} Comprehensive training so work is carried out safely across all sites</li>
          <li>${tick()} Proactive risk identification and management systems</li>
          <li>${tick()} Rapid hazard reporting that protects colleagues and customers</li>
          <li>${tick()} Continuous improvement of safety practices</li>
        </ul>
      </div>
      <div class="split-copy" data-reveal style="--i:1">
        <h2 class="h2">Report a safety concern</h2>
        <p class="muted">General enquiries: <a href="mailto:${c.emailSafety}" style="color:#6f9aff">${c.emailSafety}</a></p>
        <p class="muted" style="margin-top:0.6rem">Emergency out-of-hours: <a href="mailto:Emergency-Out.of.hours@JJCleaningServices.uk" style="color:#6f9aff">Emergency-Out.of.hours@JJCleaningServices.uk</a> or call <a href="${c.phone1Href}" style="color:#6f9aff">${c.phone1}</a></p>
        <p class="muted" style="margin-top:0.6rem">Our QHSE policy is available in the <a href="https://www.jjcleaningservices.uk/company-policies-and-notices" target="_blank" rel="noopener" style="color:#6f9aff">Company Policies &amp; Notices</a> section.</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">Memberships &amp; registrations</h2></div>
      <div class="chips" data-reveal>
        ${["SafeContractor", "British Window Cleaning Academy", "CHAS approved", "IPAF approved", "SSIP approved", "City & Guilds", "BESCA approved", "Environment Agency registered", "IOSH approved", "DBS police vetted"].map((m) => `<span class="chip">${m}</span>`).join("")}
      </div>
    </div>
  </section>` + ctaBand());

/* -------------------------------------------------------------- gallery */

page("gallery.html",
  "Gallery | JJ Cleaning Services Birmingham",
  "See our work: window cleaning, pressure washing, valeting, carpet cleaning and commercial jobs across Birmingham, including before and after comparisons.",
  null,
  pageHero({
    crumb: "Gallery",
    title: "Our work, up close",
    lead: "A look at recent jobs around Birmingham. For more, follow us on Instagram and TikTok where we post regularly.",
  }) +
  `<section class="section">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">Before &amp; after</h2><p class="lead">Drag the sliders to compare.</p></div>
      <div class="ba-wrap">
        ${beforeAfter("ba-driveway-before.jpg", "ba-driveway-after.jpg", "Driveway pressure washing")}
        ${beforeAfter("ba-roof-before.jpg", "ba-roof-after.jpg", "Roof cleaning")}
        ${beforeAfter("ba-oven-before.jpg", "ba-oven-after.jpg", "Oven deep cleaning")}
        ${beforeAfter("ba-hood-before.jpg", "ba-hood-after.jpg", "Cooker hood degreasing")}
      </div>
    </div>
  </section>
  <section class="section bg-white">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">On the job</h2></div>
      <div class="gallery-grid">
        ${[
          ["house-exterior.png", "Detached home exterior after a full clean"],
          ["window-cleaning.jpg", "Water fed pole window cleaning on a commercial building"],
          ["vehicle-valeting.jpg", "4x4 vehicle mid-valet"],
          ["fleet-cleaning.webp", "Clean fleet of company trucks"],
          ["pressure-washing.jpg", "Block paving path after pressure washing"],
          ["carpet-cleaning.jpg", "Freshly cleaned carpet"],
          ["upholstery-cleaning.jpg", "Sofa after professional upholstery cleaning"],
          ["commercial-office.jpg", "Spotless office space after commercial cleaning"],
          ["high-level.jpg", "Cherry picker high level access work"],
          ["work-roof-progress.jpg", "Roof clean in progress, half done"],
          ["work-hob.jpg", "Gas hob before and after degreasing"],
          ["work-equipment.jpg", "Professional cleaning equipment on site"],
        ].map(([img, alt], i) => `<div class="gallery-item" data-reveal style="--i:${i % 4}"><img src="assets/img/${img}" alt="${alt}" loading="lazy"></div>`).join("")}
      </div>
      <div class="notice" style="margin-top:2.2rem" data-reveal>
        ${icon("send")}
        <span>Check out our videos on <a href="https://www.tiktok.com/@jjcleaningservices" target="_blank" rel="noopener"><strong>TikTok</strong></a> and <a href="https://www.instagram.com/jj_cleaning_services/" target="_blank" rel="noopener"><strong>Instagram @jj_cleaning_services</strong></a>.</span>
      </div>
    </div>
  </section>` + ctaBand({ heading: "Want results like these?" }));

/* ----------------------------------------------------------------- FAQs */

page("faqs.html",
  "FAQs | JJ Cleaning Services Birmingham",
  "Answers to frequently asked questions about JJ Cleaning Services: pricing, payment, keys, equipment, coverage areas and more.",
  null,
  pageHero({
    crumb: "FAQs",
    title: "Frequently asked questions",
    lead: "Everything customers usually want to know. Can't find your answer? Just get in touch and we'll be happy to help.",
  }) +
  `<section class="section">
    <div class="container-narrow">
      ${accordion(D.faqs)}
    </div>
  </section>` + ctaBand({ heading: "Still have a question?" }));

/* ----------------------------------------------------------- our prices */

page("our-prices.html",
  "Our Prices | JJ Cleaning Services Birmingham",
  "Transparent cleaning prices: window cleaning from £16, carpet cleaning from £20, pressure washing from £25 minimum, gutter cleaning, upholstery and more.",
  null,
  pageHero({
    crumb: "Our Prices",
    title: "Honest, transparent pricing",
    lead: "Prices are a guide and may change upon visual inspection. First window clean costs 25% extra, and commercial pricing may vary where licences or permits are required.",
    badges: [["credit-card", "Cash, card or transfer"], ["calendar", "Direct debit plans"], ["percentage", "Loyalty discounts"]],
  }) +
  `<section class="section">
    <div class="container">
      <div class="section-head" data-reveal>
        <h2 class="h2">Window cleaning</h2>
        <p class="lead">Large properties from £32, and properties in rural locations may be slightly more.</p>
      </div>
      <div class="price-table-wrap" data-reveal>
        <table class="price-table">
          <thead><tr><th>Property</th><th>4 weekly</th><th>8 weekly</th><th>Conservatory</th><th>Extension</th><th>Large porch</th></tr></thead>
          <tbody>${D.windowPrices.map((r) => `<tr>${r.map((v) => `<td>${v}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>
    </div>
  </section>
  <section class="section bg-white">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">All other services</h2></div>
      <div class="grid-3">
        ${D.servicePrices.map((s, i) => `
        <div class="info-card" data-reveal style="--i:${i % 6}">
          <h3>${icon("sparkles")} ${s.name}</h3>
          <ul style="display:grid;gap:0.5rem;margin-top:0.7rem">
            ${s.lines.map((l) => `<li style="display:flex;justify-content:space-between;gap:1rem"><span>${l[0]}</span><strong style="white-space:nowrap">${l[1]}</strong></li>`).join("")}
          </ul>
        </div>`).join("")}
      </div>
      <div class="notice" style="margin-top:2.2rem" data-reveal>
        ${icon("info-circle")}
        <span>Looking for vehicle valeting? See the dedicated <a href="vehicle-valeting-pricing.html"><strong>vehicle valeting price list</strong></a>, or browse our discounted <a href="packages.html"><strong>packages</strong></a>.</span>
      </div>
    </div>
  </section>` + ctaBand());

/* --------------------------------------------- vehicle valeting pricing */

page("vehicle-valeting-pricing.html",
  "Vehicle Valeting Pricing | JJ Cleaning Services",
  "Vehicle valeting prices: exterior valet from £15, interior from £25, full valet from £60, deep clean from £110, plus add-ons and monthly maintenance plans.",
  null,
  pageHero({
    crumb: `<a href="our-prices.html">Pricing</a> ${icon("chevron-right")} Vehicle Valeting`,
    title: "Vehicle valeting pricing",
    lead: "Pick a package, tailor it with add-ons, or join a monthly maintenance plan. For an accurate quote, email us photos of your car in its current condition.",
    badges: [["car", "We come to you"], ["credit-card", "From £15"]],
  }) +
  `<section class="section">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">One-off valet packages</h2></div>
      ${priceCards(D.valetPackages)}
    </div>
  </section>
  <section class="section bg-white">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">Add-ons</h2></div>
      <div class="grid-2">
        ${D.valetAddons.map((g, gi) => `
        <div class="info-card" data-reveal style="--i:${gi}">
          <h3>${icon(gi === 0 ? "spray" : "armchair")} ${g.group}</h3>
          <ul style="display:grid;gap:0.55rem;margin-top:0.6rem">
            ${g.items.map((it) => `<li style="display:flex;justify-content:space-between;gap:1rem"><span>${it[0]}</span><strong>${it[1]}</strong></li>`).join("")}
          </ul>
        </div>`).join("")}
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">Monthly maintenance plans</h2><p class="lead">Subscriptions auto-renew once per month until cancelled.</p></div>
      ${priceCards(D.valetSubscriptions)}
      <div class="notice" style="margin-top:2rem" data-reveal>
        ${icon("info-circle")}
        <span>We need a mains water tap and mains electrical socket on site. Travel is charged at £1 per mile outside our local area. We're happy to tailor packages to suit you.</span>
      </div>
    </div>
  </section>` + ctaBand());

/* -------------------------------------------------------------- packages */

page("packages.html",
  "Cleaning Packages | JJ Cleaning Services",
  "Discounted cleaning packages: internal, external, commercial, the works, weed and property maintenance plans and the full pressure washing pack.",
  null,
  pageHero({
    crumb: `<a href="our-prices.html">Pricing</a> ${icon("chevron-right")} Packages`,
    title: "Bundled packages, better prices",
    lead: "Combine services and save. All package prices include VAT. Book through our online system or get in touch and we'll set it up for you.",
    badges: [["gift", "Bundle savings"], ["percentage", "VAT included"]],
  }) +
  `<section class="section">
    <div class="container">
      <div class="price-cards">
        ${D.shopPackages.map((p, i) => `
        <div class="price-card" data-reveal style="--i:${i % 4}">
          <h3>${p.name}</h3>
          <div class="pc-price">${p.was ? `<span class="was">${p.was}</span>` : ""}${p.price}</div>
          <ul><li>${tick()} VAT included</li><li>${tick()} Tailored to your property</li></ul>
          <a class="btn btn-primary" href="get-a-quote.html">Book This Package</a>
        </div>`).join("")}
      </div>
      <div class="notice" style="margin-top:2.2rem" data-reveal>
        ${icon("gift")}
        <span>Don't forget: ordering online gets you <strong>10% off your total bill</strong>. See all current <a href="coupons.html"><strong>coupons &amp; offers</strong></a>.</span>
      </div>
    </div>
  </section>` + ctaBand());

/* ------------------------------------------------------------ get a quote */

page("get-a-quote.html",
  "Get a Free Quote | JJ Cleaning Services Birmingham",
  "Get a free, no-obligation cleaning quote from JJ Cleaning Services Birmingham. Tell us about your property and we'll respond by text and email.",
  null,
  pageHero({
    crumb: "Get a Quote",
    title: "Get a free quote",
    lead: "Tell us a little about your property and the services you need. We will send you a quote shortly by text and email using the contact information provided.",
    badges: [["clock", "Fast response"], ["credit-card", "No obligation"], ["shield-check", "No hidden fees"]],
  }) +
  `<section class="section">
    <div class="container-narrow">
      <form class="form-card form-grid" data-mailto="${c.emailInfo}" data-subject="Free Quote Request from Website">
        ${field({ label: "First name", name: "First Name", required: true })}
        ${field({ label: "Last name", name: "Last Name", required: true })}
        ${field({ label: "Email", name: "Email", type: "email", required: true })}
        ${field({ label: "Phone number", name: "Phone", type: "tel", required: true })}
        ${field({ label: "Property type", name: "Property Type", required: true, options: ["Semi-detached house", "Detached house", "Terraced house", "Bungalow", "Flat / apartment", "Commercial property", "Other"] })}
        ${field({ label: "Property size", name: "Property Size", required: true, options: ["2 bedrooms", "3 bedrooms", "4 bedrooms", "5+ bedrooms", "Not applicable"] })}
        ${field({ label: "Full address", name: "Address", required: true, full: true })}
        ${field({ label: "Extension or conservatory?", name: "Extension or Conservatory", options: ["Neither", "Extension", "Conservatory", "Both"] })}
        ${field({ label: "Are you a key worker?", name: "Key Worker", options: ["No", "Yes - NHS", "Yes - Emergency services", "Yes - Other"], hint: "Key workers may be eligible for our Blue Light discount" })}
        <div class="field full">
          <label>What services would you like? <span class="req">*</span></label>
          <div class="checks">
            ${["Window Cleaning", "Vehicle Valeting", "Fleet Cleaning", "Pressure Washing", "Upholstery Cleaning", "Carpet Cleaning", "Conservatory Cleaning", "Signage Cleaning", "General Cleaning", "Commercial Cleaning", "Office Cleaning", "Other Services"].map((s) => `<label class="check"><input type="checkbox" name="Service" value="${s}"> ${s}</label>`).join("")}
          </div>
        </div>
        ${field({ label: "Anything that may affect the clean?", name: "Property Notes", textarea: true, full: true, placeholder: "Large size, unusual layout, access restrictions, parking..." })}
        <div class="field full">
          <label class="check" style="max-width:none"><input type="checkbox" name="Consent" value="Agreed" required> I agree to the Terms and Conditions and Privacy Policy and give JJ Cleaning Services permission to collect my information.</label>
        </div>
        <div class="full"><button class="btn btn-primary btn-lg" type="submit">Send My Quote Request ${arrow()}</button></div>
        <p class="form-success full">Thank you! Your email is ready to send. We will send you a quote shortly by text and email.</p>
        <p class="form-note full">Please note: quotations are generated from the information provided, using set cleaning materials and equipment. A site survey may be required for larger or unusual properties.</p>
      </form>
    </div>
  </section>
  <section class="section bg-white">
    <div class="container">
      <div class="section-head" data-reveal>
        <h2 class="h2">Prefer to talk it through?</h2>
        <p class="lead">Request a callback or ring us directly. We're available ${c.hoursShort}.</p>
      </div>
      <div class="grid-3">
        <a class="info-card" href="${c.phone1Href}" data-reveal style="--i:0"><h3>${icon("phone")} Call the office</h3><p>${c.phone1}</p></a>
        <a class="info-card" href="${c.phone2Href}" data-reveal style="--i:1"><h3>${icon("phone")} Call mobile</h3><p>${c.phone2}</p></a>
        <a class="info-card" href="mailto:${c.emailInfo}" data-reveal style="--i:2"><h3>${icon("mail")} Email us</h3><p>${c.emailInfo}</p></a>
      </div>
      <div style="margin-top:2.5rem" data-reveal>
        <h3 class="h3" style="margin-bottom:1rem">Areas we cover</h3>
        <div class="chips">${D.areas.map((a) => `<span class="chip">${a}</span>`).join("")}</div>
      </div>
    </div>
  </section>`);

/* ------------------------------------------------------------ contact us */

page("contact-us.html",
  "Contact Us | JJ Cleaning Services Birmingham",
  "Contact JJ Cleaning Services: call 0121 751 8515, email Info@JJCleaningServices.uk or visit our Birmingham head office by appointment.",
  null,
  pageHero({
    crumb: "Contact Us",
    title: "How can we help?",
    lead: "New enquiry, existing customer or supplier: whichever it is, we'd love to hear from you. We aim to respond to every message the same working day.",
    badges: [["clock", c.hoursShort], ["map-pin", "Tyseley, Birmingham"]],
  }) +
  `<section class="section">
    <div class="container">
      <div class="grid-3">
        <div class="info-card" data-reveal style="--i:0">
          <h3>${icon("phone")} Call us</h3>
          <p><a href="${c.phone1Href}"><strong>${c.phone1}</strong></a><br><a href="${c.phone2Href}"><strong>${c.phone2}</strong></a></p>
          <p style="margin-top:0.6rem">${c.hours}</p>
        </div>
        <div class="info-card" data-reveal style="--i:1">
          <h3>${icon("mail")} Email us</h3>
          <p>General enquiries:<br><a href="mailto:${c.emailInfo}"><strong>${c.emailInfo}</strong></a></p>
          <p style="margin-top:0.6rem">Customer service:<br><a href="mailto:${c.emailCustomer}"><strong>${c.emailCustomer}</strong></a></p>
        </div>
        <div class="info-card" data-reveal style="--i:2">
          <h3>${icon("map-pin")} Head office</h3>
          <address>${c.address.join("<br>")}<br><em>(${c.addressNote})</em></address>
        </div>
      </div>
    </div>
  </section>
  <section class="section bg-white">
    <div class="container-narrow">
      <div class="section-head" data-reveal><h2 class="h2">Send us a message</h2></div>
      <form class="form-card form-grid" data-reveal data-mailto="${c.emailInfo}" data-subject="Website Contact Form">
        ${field({ label: "First name", name: "First Name", required: true })}
        ${field({ label: "Last name", name: "Last Name", required: true })}
        ${field({ label: "Email", name: "Email", type: "email", required: true })}
        ${field({ label: "Phone number", name: "Phone", type: "tel" })}
        ${field({ label: "I am contacting you as a...", name: "Enquiry Type", options: ["New customer", "Existing customer", "Supplier", "Other"], full: true })}
        ${field({ label: "Message", name: "Message", textarea: true, required: true, full: true })}
        <div class="full"><button class="btn btn-primary btn-lg" type="submit">Send Message ${arrow()}</button></div>
        <p class="form-success full">Thank you! Your email is ready to send in your mail app.</p>
      </form>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="section-head" data-reveal><h2 class="h2">More ways to reach the right team</h2></div>
      <div class="grid-3">
        <a class="info-card" href="mailto:${c.emailCommercial}" data-reveal style="--i:0"><h3>${icon("building")} Commercial enquiries</h3><p>${c.emailCommercial}</p></a>
        <a class="info-card" href="mailto:${c.emailEmergency}" data-reveal style="--i:1"><h3>${icon("alert-triangle")} Emergency call-outs</h3><p>${c.emailEmergency}</p></a>
        <a class="info-card" href="mailto:${c.emailCareers}" data-reveal style="--i:2"><h3>${icon("briefcase")} Careers</h3><p>${c.emailCareers}</p></a>
        <a class="info-card" href="mailto:${c.emailSafety}" data-reveal style="--i:3"><h3>${icon("shield-check")} Site safety</h3><p>${c.emailSafety}</p></a>
        <a class="info-card" href="mailto:${c.emailCommunity}" data-reveal style="--i:4"><h3>${icon("heart-handshake")} Community support</h3><p>${c.emailCommunity}</p></a>
        <a class="info-card" href="${c.portalUrl}" target="_blank" rel="noopener" data-reveal style="--i:5"><h3>${icon("users")} Customer portal</h3><p>Manage bookings, invoices and payments online.</p></a>
      </div>
    </div>
  </section>` + ctaBand());

/* ---------------------------------------------------------- our locations */

page("our-locations.html",
  "Our Locations | JJ Cleaning Services",
  "JJ Cleaning Services locations: Birmingham head office and Manchester open now, with Coventry, Wolverhampton and Dudley coming soon.",
  null,
  pageHero({
    crumb: "Our Locations",
    title: "Professional cleaning across the UK",
    lead: "From our Birmingham head office outwards, we're growing across the Midlands and the North West, and we can recommend vetted approved contractors nationwide.",
    badges: [["map-pin", "5 locations"], ["users", "Approved contractor network"]],
  }) +
  `<section class="section">
    <div class="container">
      <div class="grid-3">
        ${D.locations.map((l, i) => `
        <div class="info-card" data-reveal style="--i:${i % 3}">
          <span class="status ${l.status === "Coming soon" ? "soon" : "open"}">${l.status}</span>
          <h3>${icon("map-pin")} ${l.city}</h3>
          <address>${l.lines.join("<br>")}</address>
          <p style="margin-top:0.8rem"><a href="mailto:${l.email}">${l.email}</a><br>${l.phone}</p>
          ${l.note ? `<p style="margin-top:0.5rem"><em>${l.note}</em></p>` : ""}
        </div>`).join("")}
        <div class="info-card" data-reveal style="--i:2" style="display:flex;flex-direction:column;justify-content:center">
          <h3>${icon("users")} Approved contractors nationwide</h3>
          <p>We can recommend contractors from our network of approved professionals. Every one has been vetted by us for insurance and the correct licences for their industry, so you know your property is in safe hands.</p>
          <p style="margin-top:0.8rem"><a class="text-link" href="contact-us.html">Ask about our partner network ${icon("arrow-right")}</a></p>
        </div>
      </div>
    </div>
  </section>` + ctaBand());

/* -------------------------------------------------------------- careers */

page("careers.html",
  "Careers | JJ Cleaning Services",
  "Find your place at JJ Cleaning Services: jobs, franchise opportunities and volunteering across Birmingham. Search and apply through our careers portal.",
  null,
  pageHero({
    crumb: "Careers",
    title: "Find your place",
    lead: "JJ Cleaning Services is a professional and reliable cleaning company, established in 2017 and growing across Birmingham. Come and grow with us.",
    badges: [["briefcase", "Jobs"], ["building-store", "Franchise"], ["heart-handshake", "Volunteering"]],
  }) +
  `<section class="section">
    <div class="container">
      <div class="grid-3">
        <div class="info-card" data-reveal style="--i:0">
          <h3>${icon("briefcase")} Join the team</h3>
          <p>Search live vacancies and apply online through our careers portal. We're always interested in friendly, reliable people who take pride in their work.</p>
          <p style="margin-top:1rem"><a class="btn btn-primary" href="${c.careersPortal}" target="_blank" rel="noopener">Search &amp; Apply ${arrow()}</a></p>
        </div>
        <div class="info-card" data-reveal style="--i:1">
          <h3>${icon("building-store")} Franchise with us</h3>
          <p>Interested in running your own JJ Cleaning Services territory? Get in touch with the team to talk about franchise opportunities.</p>
          <p style="margin-top:1rem"><a class="text-link" href="mailto:${c.emailCareers}">Enquire about franchising ${icon("arrow-right")}</a></p>
        </div>
        <div class="info-card" data-reveal style="--i:2">
          <h3>${icon("heart-handshake")} Volunteer</h3>
          <p>Become a valued volunteer and make a meaningful difference in your community, gaining valuable experience and a profound sense of fulfilment.</p>
          <p style="margin-top:1rem"><a class="text-link" href="community-support.html">Meet the Community Support Team ${icon("arrow-right")}</a></p>
        </div>
      </div>
    </div>
  </section>
  <section class="section bg-white">
    <div class="container-narrow">
      <div class="section-head" data-reveal>
        <h2 class="h2">Ask us anything about working here</h2>
        <p class="lead">Email <a href="mailto:${c.emailCareers}"><strong>${c.emailCareers}</strong></a> or send a message below.</p>
      </div>
      <form class="form-card form-grid" data-reveal data-mailto="${c.emailCareers}" data-subject="Careers Enquiry">
        ${field({ label: "First name", name: "First Name", required: true })}
        ${field({ label: "Last name", name: "Last Name", required: true })}
        ${field({ label: "Email", name: "Email", type: "email", required: true, full: true })}
        ${field({ label: "Message", name: "Message", textarea: true, required: true, full: true })}
        <div class="full"><button class="btn btn-primary btn-lg" type="submit">Send ${arrow()}</button></div>
        <p class="form-success full">Thanks! Your email is ready to send.</p>
      </form>
    </div>
  </section>` + ctaBand({ heading: "Rather book a clean than join the team?" }));

/* --------------------------------------------------------------- coupons */

page("coupons.html",
  "Coupons & Offers | JJ Cleaning Services",
  "Current JJ Cleaning Services discounts: 10% off online orders, 10% referral rewards, 15% off maid services and the Blue Light emergency discount.",
  null,
  pageHero({
    crumb: `<a href="our-prices.html">Pricing</a> ${icon("chevron-right")} Coupons & Offers`,
    title: "Coupons &amp; offers",
    lead: "Ways to save on your next clean. Join our mailing list in the footer to hear about new offers first.",
    badges: [["gift", "4 live offers"], ["percentage", "Up to 15% off"]],
  }) +
  `<section class="section">
    <div class="container">
      <div class="grid-2">
        ${D.coupons.map((cp, i) => `
        <div class="info-card" data-reveal style="--i:${i % 2}">
          <div class="pc-price" style="margin-bottom:0.5rem">${cp.value}</div>
          <h3>${icon("gift")} ${cp.title}</h3>
          <p>${cp.desc}</p>
          <p style="margin-top:0.8rem"><strong>How to redeem:</strong> ${cp.code}</p>
        </div>`).join("")}
      </div>
      <div class="notice" style="margin-top:2.2rem" data-reveal>
        ${icon("info-circle")}
        <span>To redeem any offer, email <a href="mailto:${c.emailInfo}"><strong>${c.emailInfo}</strong></a> or book through our online system and the discount will be applied.</span>
      </div>
    </div>
  </section>` + ctaBand({ heading: "Grab an offer and book your clean" }));

/* ----------------------------------------------------------- recommend us */

page("recommend-us.html",
  "Recommend Us | JJ Cleaning Services",
  "Refer a friend to JJ Cleaning Services and earn 10% off your next clean for every referral that becomes a customer. No limit on referrals.",
  null,
  pageHero({
    crumb: "Recommend Us",
    title: "Earn 10% off your next clean",
    lead: "Running since early 2020 and an outstanding success: refer a friend, family member or business, and you'll earn 10% off your next clean for every referral that becomes a new customer.",
    badges: [["gift", "10% per referral"], ["users", "No referral limit"]],
  }) +
  `<section class="section">
    <div class="container-narrow">
      <div class="section-head" data-reveal>
        <h2 class="h2">Refer someone today</h2>
        <p class="lead">There is no limit to the number of times you can refer us. It works for friends, family and any business that might benefit from our services.</p>
      </div>
      <form class="form-card form-grid" data-reveal data-mailto="${c.emailInfo}" data-subject="Referral from Website">
        ${field({ label: "Your name", name: "Your Name", required: true })}
        ${field({ label: "Your phone number", name: "Your Phone", type: "tel", required: true })}
        ${field({ label: "Your email address", name: "Your Email", type: "email", required: true, full: true })}
        ${field({ label: "Referral's company or personal name", name: "Referral Name", required: true })}
        ${field({ label: "Referral's phone number", name: "Referral Phone", type: "tel", required: true })}
        ${field({ label: "Referral's email address", name: "Referral Email", type: "email", required: true, full: true })}
        <div class="full"><button class="btn btn-primary btn-lg" type="submit">Send Referral ${arrow()}</button></div>
        <p class="form-success full">Thank you! Your referral email is ready to send.</p>
        <p class="form-note full">Personal data submitted through this form is handled in line with our Privacy Policy. Problems? Email ${c.emailInfo} or call ${c.phone1}.</p>
      </form>
    </div>
  </section>` + ctaBand({ heading: "New here? Get your own quote first" }));

/* ================================================================== build */

let count = 0;
for (const p of pages) {
  const html = layout({ file: p.file, title: p.title, desc: p.desc, active: p.active, body: p.body });
  if (/[—–]/.test(html)) {
    const m = html.match(/.{0,60}[—–].{0,60}/);
    throw new Error("Em/en dash found in " + p.file + ": ..." + m[0] + "...");
  }
  fs.writeFileSync(path.join(ROOT, p.file), html);
  count++;
}
console.log("Built " + count + " pages.");
