(function () {
  "use strict";

  const pad = (n) => String(n).padStart(2, "0");

  function formatSince(date) {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getElapsed(start) {
    const now = new Date();
    if (now < start) {
      return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    let hours = now.getHours() - start.getHours();
    let minutes = now.getMinutes() - start.getMinutes();
    let seconds = now.getSeconds() - start.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes -= 1;
    }
    if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    }
    if (hours < 0) {
      hours += 24;
      days -= 1;
    }
    if (days < 0) {
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    return { years, months, days, hours, minutes, seconds };
  }

  function pluralize(value, singular, plural) {
    return value === 1 ? singular : plural;
  }

  function updateCounter() {
    const elapsed = getElapsed(CONFIG.startDate);
    const units = [
      { id: "years", value: elapsed.years, pad: false, labelId: "label-years", singular: "ano", plural: "anos" },
      { id: "months", value: elapsed.months, pad: false, labelId: "label-months", singular: "mês", plural: "meses" },
      { id: "days", value: elapsed.days, pad: false, labelId: "label-days", singular: "dia", plural: "dias" },
      { id: "hours", value: elapsed.hours, pad: true, labelId: "label-hours", singular: "hora", plural: "horas" },
      { id: "minutes", value: elapsed.minutes, pad: true, labelId: "label-minutes", singular: "minuto", plural: "minutos" },
      { id: "seconds", value: elapsed.seconds, pad: true, labelId: "label-seconds", singular: "segundo", plural: "segundos" },
    ];

    units.forEach(({ id, value, pad: usePad, labelId, singular, plural }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const display = usePad ? pad(value) : String(value);
      if (el.textContent !== display) {
        el.textContent = display;
        el.classList.remove("tick");
        void el.offsetWidth;
        el.classList.add("tick");
      }

      if (labelId) {
        const labelEl = document.getElementById(labelId);
        if (labelEl) labelEl.textContent = pluralize(value, singular, plural);
      }
    });
  }

  function initHero() {
    const namesEl = document.getElementById("couple-names");
    const headlineEl = document.getElementById("headline");
    const subEl = document.getElementById("subheadline");
    const sinceEl = document.getElementById("since-date");

    if (namesEl) {
      namesEl.textContent = `${CONFIG.names.you} & ${CONFIG.names.partner}`;
    }
    if (headlineEl) headlineEl.textContent = CONFIG.headline;
    if (subEl) subEl.textContent = CONFIG.subheadline;
    if (sinceEl) {
      sinceEl.innerHTML = `desde <strong>${formatSince(CONFIG.startDate)}</strong>`;
    }

    document.title = `${CONFIG.names.you} ♥ ${CONFIG.names.partner}`;
  }

  function createImage(src, alt, className) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || "Nossa foto";
    img.loading = "lazy";
    if (className) img.className = className;

    img.onerror = function () {
      const ph = document.createElement("div");
      ph.className = `img-placeholder ${className || ""}`;
      ph.style.minHeight = "120px";
      ph.textContent = "Adicione a foto em assets/photos/";
      img.replaceWith(ph);
    };

    return img;
  }

  function initFloatingGallery() {
    const container = document.getElementById("floating-gallery");
    if (!container || !CONFIG.photos.length) return;

    CONFIG.photos.slice(0, 5).forEach((photo, i) => {
      const img = createImage(photo.src, photo.caption, "float-photo");
      img.style.animationDelay = `${i * -1.2}s`;
      container.appendChild(img);
    });
  }

  function initCarousel() {
    const ring = document.getElementById("carousel-ring");
    if (!ring || !CONFIG.photos.length) return;

    const count = CONFIG.photos.length;
    const angleStep = 360 / count;
    const w = window.innerWidth;
    const radius =
      w <= 600 ? Math.min(110, w * 0.26) : w <= 900 ? Math.min(200, w * 0.3) : Math.min(320, w * 0.35);

    CONFIG.photos.forEach((photo, i) => {
      const item = document.createElement("div");
      item.className = "carousel-item";
      item.style.transform = `rotateY(${i * angleStep}deg) translateZ(${radius}px)`;

      const img = createImage(photo.src, photo.caption);
      item.appendChild(img);

      if (photo.caption) {
        const cap = document.createElement("div");
        cap.className = "carousel-caption";
        cap.textContent = photo.caption;
        item.appendChild(cap);
      }

      ring.appendChild(item);
    });
  }

  function initPolaroids() {
    const grid = document.getElementById("polaroid-grid");
    if (!grid) return;

    const rotations = [-4, 3, -2, 5, -3, 2, -5, 4];

    CONFIG.photos.forEach((photo, i) => {
      const card = document.createElement("article");
      card.className = "polaroid";
      card.style.setProperty("--r", `${rotations[i % rotations.length]}deg`);

      const img = createImage(photo.src, photo.caption);
      const p = document.createElement("p");
      p.textContent = photo.caption || "♥";

      card.appendChild(img);
      card.appendChild(p);
      card.addEventListener("click", () => openLightbox(photo.src));
      grid.appendChild(card);
    });
  }

  function initVideos() {
    const section = document.getElementById("videos-section");
    const grid = document.getElementById("video-grid");
    if (!section || !grid || !CONFIG.videos?.length) {
      if (section) section.hidden = true;
      return;
    }

    CONFIG.videos.forEach((vid) => {
      const figure = document.createElement("figure");
      figure.className = "video-card";

      const video = document.createElement("video");
      video.src = vid.src;
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      if (vid.poster) video.poster = vid.poster;

      figure.appendChild(video);

      if (vid.caption) {
        const cap = document.createElement("figcaption");
        cap.textContent = vid.caption;
        figure.appendChild(cap);
      }

      grid.appendChild(figure);
    });
  }

  function initLoveLetter() {
    const sig = document.getElementById("signature");
    if (sig) sig.textContent = `Com amor, ${CONFIG.names.you} ♥`;
  }

  function openLightbox(src) {
    const lb = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    if (!lb || !img) return;
    img.src = src;
    lb.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    const lb = document.getElementById("lightbox");
    if (!lb) return;
    lb.classList.remove("active");
    document.body.style.overflow = "";
  }

  function initLightbox() {
    document.getElementById("lightbox-close")?.addEventListener("click", closeLightbox);
    document.getElementById("lightbox")?.addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  function initAudio() {
    const btn = document.getElementById("btn-music");
    if (!CONFIG.audio || !btn) {
      btn?.remove();
      return;
    }

    const audio = new Audio(CONFIG.audio);
    audio.loop = true;
    audio.volume = 0.4;
    let playing = false;

    btn.addEventListener("click", () => {
      if (playing) {
        audio.pause();
        btn.textContent = "♪";
        btn.title = "Tocar música";
      } else {
        audio.play().catch(() => {});
        btn.textContent = "♫";
        btn.title = "Pausar música";
      }
      playing = !playing;
    });
  }

  function initHearts() {
    const canvas = document.getElementById("hearts-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h;
    const hearts = [];
    const colors = ["#e8a4b8", "#c45c7a", "#d4a574", "#f9e4ec"];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function Heart() {
      this.reset = function () {
        this.x = Math.random() * w;
        this.y = h + 20;
        this.size = Math.random() * 14 + 6;
        this.speed = Math.random() * 1.2 + 0.4;
        this.drift = (Math.random() - 0.5) * 0.6;
        this.opacity = Math.random() * 0.4 + 0.15;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
      };
      this.reset();
      this.y = Math.random() * h;
    }

    function drawHeart(x, y, size, rot) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      const s = size / 2;
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(0, -s, -s * 1.2, -s, 0, s);
      ctx.bezierCurveTo(s * 1.2, -s, 0, -s, 0, s * 0.3);
      ctx.fill();
      ctx.restore();
    }

    for (let i = 0; i < 35; i++) hearts.push(new Heart());

    function animate() {
      ctx.clearRect(0, 0, w, h);
      hearts.forEach((heart) => {
        heart.y -= heart.speed;
        heart.x += heart.drift;
        heart.rotation += heart.rotSpeed;
        ctx.globalAlpha = heart.opacity;
        ctx.fillStyle = heart.color;
        drawHeart(heart.x, heart.y, heart.size, heart.rotation);
        if (heart.y < -30) heart.reset();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animate();
    }
  }

  function init() {
    initHero();
    updateCounter();
    setInterval(updateCounter, 1000);
    initFloatingGallery();
    initCarousel();
    initPolaroids();
    initVideos();
    initLoveLetter();
    initLightbox();
    initAudio();
    initHearts();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
