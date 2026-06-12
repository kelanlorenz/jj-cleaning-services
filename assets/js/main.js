/* JJ Cleaning Services - interactions
   All motion respects prefers-reduced-motion. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------- header scroll state */
  var header = document.querySelector(".header");
  var toTop = document.querySelector(".to-top");
  if ("IntersectionObserver" in window) {
    // sentinel at top of page; header gets .scrolled when it leaves view
    var sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:0;height:60px;width:1px;pointer-events:none;";
    document.body.prepend(sentinel);
    new IntersectionObserver(function (entries) {
      var out = !entries[0].isIntersecting;
      if (header) header.classList.toggle("scrolled", out);
      if (toTop) toTop.classList.toggle("show", out);
    }).observe(sentinel);
  }
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------- mobile nav */
  var toggle = document.querySelector(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* -------------------------------------------------------------- dropdowns */
  var navItems = document.querySelectorAll(".nav-links > li");
  var hoverable = window.matchMedia("(hover: hover) and (min-width: 1024px)").matches;
  navItems.forEach(function (li) {
    var btn = li.querySelector("button");
    var dd = li.querySelector(".dropdown");
    if (!btn || !dd) return;
    btn.setAttribute("aria-expanded", "false");
    function setOpen(open) {
      li.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    if (hoverable) {
      var t;
      li.addEventListener("mouseenter", function () { clearTimeout(t); setOpen(true); });
      li.addEventListener("mouseleave", function () { t = setTimeout(function () { setOpen(false); }, 120); });
    }
    btn.addEventListener("click", function () {
      var willOpen = !li.classList.contains("open");
      navItems.forEach(function (o) { if (o !== li) { o.classList.remove("open"); var b = o.querySelector("button"); if (b) b.setAttribute("aria-expanded", "false"); } });
      setOpen(willOpen);
    });
    li.addEventListener("focusout", function (e) {
      if (!li.contains(e.relatedTarget)) setOpen(false);
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-links")) {
      navItems.forEach(function (li) { li.classList.remove("open"); var b = li.querySelector("button"); if (b) b.setAttribute("aria-expanded", "false"); });
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      navItems.forEach(function (li) { li.classList.remove("open"); });
      if (document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  /* --------------------------------------------------------- scroll reveals */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("revealed"); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("revealed"); ro.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { ro.observe(el); });
    // safety sweep: if the observer misses anything (throttled frames),
    // reveal whatever sits in the viewport once a scroll gesture ends
    var sweep = function () {
      revealEls.forEach(function (el) {
        if (el.classList.contains("revealed")) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) { el.classList.add("revealed"); ro.unobserve(el); }
      });
    };
    if ("onscrollend" in window) document.addEventListener("scrollend", sweep, { passive: true });
    window.addEventListener("load", sweep);
  }

  /* --------------------------------------------------------------- counters */
  var counters = document.querySelectorAll("[data-count]");
  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var dur = 1600, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if (counters.length && "IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------------------------------------------------- before/after slider */
  document.querySelectorAll(".ba").forEach(function (ba) {
    function setCut(clientX) {
      var r = ba.getBoundingClientRect();
      var pct = Math.min(Math.max(((clientX - r.left) / r.width) * 100, 2), 98);
      ba.style.setProperty("--cut", pct + "%");
    }
    ba.addEventListener("pointerdown", function (e) {
      ba.setPointerCapture(e.pointerId);
      setCut(e.clientX);
    });
    ba.addEventListener("pointermove", function (e) {
      if (e.pressure > 0 || e.buttons === 1) setCut(e.clientX);
    });
    // keyboard support
    ba.setAttribute("tabindex", "0");
    ba.setAttribute("role", "slider");
    ba.setAttribute("aria-label", "Before and after comparison");
    ba.addEventListener("keydown", function (e) {
      var cur = parseFloat(getComputedStyle(ba).getPropertyValue("--cut")) || 50;
      if (e.key === "ArrowLeft") { ba.style.setProperty("--cut", Math.max(cur - 4, 2) + "%"); e.preventDefault(); }
      if (e.key === "ArrowRight") { ba.style.setProperty("--cut", Math.min(cur + 4, 98) + "%"); e.preventDefault(); }
    });
  });

  /* ---------------------------------------------------------------accordion */
  document.querySelectorAll(".acc-item").forEach(function (item) {
    var q = item.querySelector(".acc-q");
    if (!q) return;
    q.setAttribute("aria-expanded", "false");
    q.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ----------------------------------------------------------- reviews rail */
  document.querySelectorAll("[data-rail]").forEach(function (wrap) {
    var rail = wrap.querySelector(".reviews-rail");
    if (!rail) return;
    wrap.querySelectorAll("[data-rail-prev]").forEach(function (b) {
      b.addEventListener("click", function () { rail.scrollBy({ left: -400, behavior: reduceMotion ? "auto" : "smooth" }); });
    });
    wrap.querySelectorAll("[data-rail-next]").forEach(function (b) {
      b.addEventListener("click", function () { rail.scrollBy({ left: 400, behavior: reduceMotion ? "auto" : "smooth" }); });
    });
  });

  /* ----------------------------------------------------------------lightbox */
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    document.querySelectorAll(".gallery-item").forEach(function (g) {
      g.addEventListener("click", function () {
        var img = g.querySelector("img");
        lbImg.src = img.src;
        lbImg.alt = img.alt || "";
        lightbox.classList.add("open");
      });
    });
    lightbox.addEventListener("click", function () { lightbox.classList.remove("open"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") lightbox.classList.remove("open");
    });
  }

  /* -------------------------------------------------- forms (mailto bridge) */
  /* Static site: forms compose a prefilled email to the company inbox. */
  document.querySelectorAll("form[data-mailto]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var to = form.getAttribute("data-mailto");
      var subject = form.getAttribute("data-subject") || "Website enquiry";
      var lines = [];
      form.querySelectorAll("input, select, textarea").forEach(function (f) {
        if (!f.name) return;
        if ((f.type === "checkbox" || f.type === "radio") && !f.checked) return;
        if (f.value) lines.push(f.name + ": " + f.value);
      });
      var body = encodeURIComponent(lines.join("\n"));
      window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + body;
      var ok = form.querySelector(".form-success");
      if (ok) { ok.classList.add("show"); ok.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" }); }
    });
  });

  /* newsletter footer form: simple confirmation */
  document.querySelectorAll("form[data-newsletter]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input");
      var btn = form.querySelector("button");
      if (input && input.value) {
        btn.textContent = "Subscribed";
        btn.disabled = true;
        input.value = "";
        input.placeholder = "Thanks, you're on the list";
      }
    });
  });
})();
