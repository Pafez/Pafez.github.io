gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   EDIT PROJECTS HERE
   Add/remove objects. The page builds the project list for you.
   ========================================================= */
const projects = [
  {
    number: "01",
    title: "Evo",
    description: "A Life-like simulation where individual cells evolve through randomized behavior and natural selection, using reward and punishment to explore how cooperative multicellular behavior can emerge from simple agents.",
    tags: ["C", "raylib", "Simulation", "Evolution"],
    github: "#",
    demo: "#"
  },

  {
    number: "02",
    title: "FlashNote",
    description: "An Android study application that turns photographed notes into searchable, editable text and organizes them into decks of Flashcards using OCR and local storage.",
    tags: ["Java", "Android", "ML Kit", "Room"],
    github: "https://github.com/Pafez/FlashNote",
    demo: "#"
  },

  {
    number: "03",
    title: "PressStart",
    description: "A 2D platformer created for a 30-hour game jam where the player becomes a sword-wielding cursor, using dashes, sword jabs, and embedded movement to chase the Start button.",
    tags: ["Godot", "GDScript", "Game Dev", "Physics"],
    github: "https://github.com/Pafez/ict-game-jam",
    demo: "#"
  },

  {
    number: "04",
    title: "Melodia",
    description: "An Osu!mania / Piano Tiles style rhythm game that lets players transform MIDI of their favorite songs into a playable beatmap.",
    tags: ["Java", "libGDX", "MIDI", "Game Dev"],
    github: "https://github.com/Pafez/Melodia",
    demo: "#"
  }
];

const projectList = document.querySelector("#project-list");

projectList.innerHTML = projects.map(p => `
  <article class="project-card">
    <div class="project-number">${p.number}</div>
    <div class="project-info">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="project-tags">${p.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
    </div>
    <div class="project-links">
      <a href="${p.github}" target="_blank" rel="noopener">GITHUB ↗</a>
      <a href="${p.demo}" target="_blank" rel="noopener">LIVE DEMO ↗</a>
    </div>
  </article>
`).join("");

/* Header */
const header = document.querySelector(".site-header");
ScrollTrigger.create({
  start: "top -80",
  onUpdate: self => header.classList.toggle("scrolled", self.scroll() > 80)
});

/* Mouse glow — desktop only */
if (window.matchMedia("(pointer:fine)").matches) {
  const glow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", e => {
    gsap.to(glow, { x: e.clientX, y: e.clientY, duration: .45, ease: "power3.out" });
  });
}

/* Hero entrance */
const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
heroTl
  .from(".hero-eyebrow", { y: 30, opacity: 0, duration: .8 })
  .from(".hero-title .line", { yPercent: 110, duration: 1.15, stagger: .12 }, "-=.35")
  .from(".hero-subtitle", { y: 20, opacity: 0, duration: .7 }, "-=.5")
  .from(".scroll-cue", { y: 15, opacity: 0, duration: .5 }, "-=.25")
  .from(".hero-orbit", { scale: .7, opacity: 0, duration: 1.6, stagger: .15 }, "-=1");

/* Hero scroll transformation */
gsap.to(".hero-title", {
  yPercent: -22,
  opacity: .12,
  scale: .92,
  scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
});
gsap.to(".hero-grid", {
  backgroundPosition: "0 160px",
  scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
});
gsap.to(".orbit-a", {
  rotation: 35, scale: 1.2,
  scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
});

/* Generic section label reveal */
gsap.utils.toArray(".section-label").forEach(label => {
  gsap.from(label, {
    x: -30, opacity: 0, duration: .8,
    scrollTrigger: { trigger: label, start: "top 82%" }
  });
});

/* About: split-like reveal */
gsap.from(".about-heading h2", {
  y: 80, opacity: 0, duration: 1.1, ease: "power3.out",
  scrollTrigger: { trigger: ".about-layout", start: "top 75%" }
});
gsap.from(".about-copy > *", {
  y: 35, opacity: 0, duration: .7, stagger: .12,
  scrollTrigger: { trigger: ".about-copy", start: "top 75%" }
});

/* Projects: cards slide in + hover inversion */
/* Projects: cards slide in + hover inversion */
gsap.utils.toArray(".project-card").forEach((card, i) => {
  gsap.from(card, {
    y: 70,
    opacity: 0,
    duration: .8,
    delay: i * .04,
    scrollTrigger: {
      trigger: card,
      start: "top 88%"
    }
  });

  const textElements = card.querySelectorAll(
    "h3, p, .project-number, .project-tags span, .project-links a"
  );

  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      x: 10,
      duration: .35,
      ease: "power2.out"
    });

    gsap.to(textElements, {
      color: "#08090b",
      borderColor: "rgba(8,9,11,.25)",
      duration: .25,
      ease: "power2.out"
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      x: 0,
      duration: .35,
      ease: "power2.out"
    });

    gsap.to(textElements, {
      color: "",
      borderColor: "",
      duration: .25,
      ease: "power2.out"
    });
  });
});

/* Project progress */
gsap.to(".project-progress span", {
  height: "100%",
  ease: "none",
  scrollTrigger: { trigger: ".projects", start: "top top", end: "bottom bottom", scrub: true }
});

/* Skills: groups reveal and skill pills stagger */
gsap.utils.toArray(".skill-group").forEach((group, i) => {
  gsap.from(group, {
    x: i % 2 ? 50 : -50, opacity: 0, duration: .8,
    scrollTrigger: { trigger: group, start: "top 82%" }
  });
  gsap.from(group.querySelectorAll(".skill-cloud span"), {
    y: 20,
    duration: .4,
    ease: "power3.out",
    scrollTrigger: {
      trigger: group,
      start: "top 78%"
    }
  });
});

/* Experience: timeline draws downward */
gsap.from(".timeline", {
  "--lineScale": 0, duration: 1.5,
  scrollTrigger: { trigger: ".timeline", start: "top 75%" }
});
gsap.utils.toArray(".timeline-item").forEach((item, i) => {
  gsap.from(item, {
    x: 70, opacity: 0, duration: .8,
    scrollTrigger: { trigger: item, start: "top 82%" }
  });
});

/* Contact: final simplification */
gsap.from(".contact-content > *", {
  y: 45, opacity: 0, duration: .8, stagger: .1,
  scrollTrigger: { trigger: ".contact", start: "top 60%" }
});
gsap.to(".contact-grid", {
  backgroundPosition: "80px 80px",
  scrollTrigger: { trigger: ".contact", start: "top bottom", end: "bottom top", scrub: 1 }
});

/* Keep anchor links native but account for fixed header */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 20, behavior: "smooth" });
  });
});
