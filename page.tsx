 "use client";

import { useEffect, useRef, useState } from "react";
import { Manrope } from "next/font/google";


const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// PARALLAX HAZE CONTROL
// 1 = previous/full haze, lower = clearer image, higher = stronger haze.
const PARALLAX_HAZE = 0.7;

const services = [
  {
    number: "01",
    eyebrow: "Diagnostic Sprint (One-Off Project)",
    title: "Systems Architecture & Operational Audits",
    text: "A comprehensive diagnosis of your current workflows, software stack, and handovers—pinpointing bottlenecks, duplicated effort, and exactly where delivery is slowing down.",
    items: [
      "End-to-end workflow, tool, and operational systems audit",
      "Documented Standard Operating Procedures (SOPs) & process maps",
      "Client onboarding and CRM pipeline overhaul",
      "Prioritised, step-by-step implementation roadmap",
    ],
    action: "Book an Audit",
  },
  {
    number: "02",
    eyebrow: "Operational Partner (Monthly Retainer)",
    title: "Ongoing Operational Retainers",
    text: "Hands-on operational support that keeps delivery moving, protects your client experience, and removes the day-to-day administrative coordination from the founder’s plate.",
    items: [
      "CRM maintenance, pipeline triage, and client care management",
      "Dedicated inbox, calendar, and stakeholder communication",
      "Project coordination and delivery follow-through",
      "Proactive systems maintenance and workflow hygiene",
    ],
    action: "Enquire About Retainers",
  },
  {
    number: "03",
    eyebrow: "Fractional Operations Director",
    title: "Fractional Operations Leadership",
    text: "High-level strategic operations and governance for established businesses needing senior guidance, structured accountability, and scalable delivery without a full-time hire.",
    items: [
      "High-level operational roadmap and quarterly planning",
      "Team, freelancer, and subcontractor orchestration",
      "Accountability frameworks, KPIs, and delivery governance",
      "Ongoing tech stack optimisation and cost reduction",
    ],
    action: "Discuss Fractional Support",
  },
];


const finalServiceShadow =
  "shadow-[8px_8px_0_#C8C0D2,16px_16px_0_#7B6C88] group-hover:shadow-[10px_10px_0_#C8C0D2,20px_20px_0_#7B6C88]";


const principles = [
  ["01", "Diagnose first", "We start by understanding how the business actually runs — not how it is supposed to run."],
  ["02", "Build what is useful", "Systems are designed around the work, the people and the client journey rather than unnecessary software."],
  ["03", "Embed the structure", "The goal is straightforward: fewer operational bottlenecks, clearer ownership and less founder dependency."],
];


const approachCards = [
  {
    number: "01",
    title: "Diagnose first",
    text:
      "We start by understanding how the business actually runs — not how it is supposed to run. That means reviewing the real workflows, handovers, systems, communication points and founder dependencies that shape day-to-day delivery before deciding what needs to change.",
  },
  {
    number: "02",
    title: "Build what is useful",
    text:
      "We design systems around the work, the people and the client journey rather than adding unnecessary software. Every process has to earn its place by making delivery clearer, reducing duplication and giving the team a more reliable way to work.",
  },
  {
    number: "03",
    title: "Embed the structure",
    text:
      "The goal is fewer operational bottlenecks, clearer ownership and less founder dependency. When the structure is right, the business becomes easier to manage, easier to delegate and more consistent for both the team and the client.",
  },
];

function CountUp({
  start,
  target,
  suffix = "",
  duration = 1450,
}: {
  start: number;
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(start);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setValue(target);
      return;
    }

    let animationFrame: number | null = null;

    const runAnimation = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      setValue(start);
      const startedAt = performance.now();
      const range = target - start;

      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        setValue(Math.round(start + range * eased));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          animationFrame = null;
        }
      };

      animationFrame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation();
        } else {
          if (animationFrame !== null) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
          }
          setValue(start);
        }
      },
      {
        threshold: 0,
        rootMargin: "24% 0px 0px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    };
  }, [duration, start, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}


function usePremiumRevealSystem(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const root = document.querySelector<HTMLElement>("[data-premium-page]");
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const reveal = (
      element: Element | null,
      type: "up" | "left" | "right" | "image" = "up",
      delay = 0
    ) => {
      if (!(element instanceof HTMLElement)) return;
      if (element.dataset.reveal) return;

      element.dataset.reveal = type;
      element.dataset.revealState = reducedMotion ? "visible" : "hidden";
      element.style.transitionDelay = `${delay}ms`;
    };

    // Mobile uses one non-nested reveal sequence per section. Every item is
    // prepared while the loader still covers the page, then revealed once.
    if (window.matchMedia("(max-width: 767px)").matches) {
      const mobileGroups: Array<[string, string]> = [
        ["services", "h2, span[role='img'][aria-label='Proper Ops'], article h3, article p, article li, article a"],
        ["stats", ".premium-stat-item"],
        ["approach", ".premium-approach-label, h2, .approach-principle"],
        ["about-maya", "h2, .premium-maya-copy > p, .premium-maya-signature, .premium-maya-cta, .premium-maya-portrait"],
        ["quote", "blockquote, .premium-quote-attribution"],
        ["reviews", ".reviews-heading h2, .reviews-heading .intro, .review-grid, .review-pagination"],
        ["working", "h2, .premium-working-point"],
        ["contact", ".premium-contact-copy h2, .premium-contact-copy > p, .premium-contact-links > a, form h3, form > .grid label, form > .block, form button, .premium-calendar-prompt"],
        ["book", "h2, .premium-book-cta"],
        ["footer", ".premium-footer-group > a, .premium-footer-group > p, .premium-footer-group h3, .premium-footer-group nav a, .premium-footer-group > div > p, .premium-footer-group > div a, .premium-footer-legal"],
      ];

      mobileGroups.forEach(([name, selector]) => {
        root.querySelectorAll<HTMLElement>(`[data-reveal-section="${name}"]`).forEach((section) => {
          section.querySelectorAll<HTMLElement>(selector).forEach((element) => {
            reveal(element, "up", 0);
          });
        });
      });

      const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal][data-reveal-state="hidden"]'));
      if (reducedMotion || typeof IntersectionObserver === "undefined") {
        targets.forEach((target) => { target.dataset.revealState = "visible"; });
        return;
      }
      const revealTimers: Array<ReturnType<typeof setTimeout>> = [];
      const nextRevealTime = new Map<Element, number>();
      const observer = new IntersectionObserver((entries) => {
        const entering = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) => {
            const aRect = a.getBoundingClientRect();
            const bRect = b.getBoundingClientRect();
            if (Math.abs(aRect.top - bRect.top) > 6) return aRect.top - bRect.top;
            return aRect.left - bRect.left;
          });

        const now = performance.now();
        entering.forEach((target) => {
          observer.unobserve(target);
          const section = target.closest("[data-reveal-section]") || root;
          const next = Math.max(now, nextRevealTime.get(section) || now);
          nextRevealTime.set(section, next + 105);
          const timer = setTimeout(() => {
            target.dataset.revealState = "visible";
          }, Math.max(0, next - now));
          revealTimers.push(timer);
        });
      }, { threshold: 0, rootMargin: "0px 0px -4% 0px" });
      targets.forEach((target) => observer.observe(target));
      return () => {
        observer.disconnect();
        revealTimers.forEach((timer) => clearTimeout(timer));
        // A viewport or route transition must never strand hidden content.
        targets.forEach((target) => { target.dataset.revealState = "visible"; });
      };
    }

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="services"]')
      .forEach((section) => {
        reveal(section.querySelector("h2"), "up", 0);
        reveal(section.querySelector('img[alt="Proper Ops"]'), "image", 90);

        section.querySelectorAll("article").forEach((card, index) => {
          reveal(card, "up", 120 + index * 90);
        });
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="stats"]')
      .forEach((section) => {
        const statItems = section.querySelectorAll(
          ".premium-stat-item"
        );
        statItems.forEach((item, index) => {
          reveal(item, "up", index * 100);
        });
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="approach"]')
      .forEach((section) => {
        reveal(section.querySelector(".premium-approach-label"), "up", 0);

        section.querySelectorAll("h2").forEach((heading, index) => {
          reveal(heading, index % 2 === 0 ? "left" : "up", 60);
        });

        section.querySelectorAll("p").forEach((paragraph, index) => {
          reveal(paragraph, "up", 140 + Math.min(index, 3) * 70);
        });

        section.querySelectorAll(".approach-principle").forEach((item, index) => {
          reveal(item, "up", 180 + index * 75);
        });
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="about-maya"]')
      .forEach((section) => {
        reveal(section.querySelector("h2"), "left", 0);

        section.querySelectorAll(".premium-maya-copy > p").forEach((paragraph, index) => {
          reveal(paragraph, "up", Math.min(index, 4) * 55);
        });

        reveal(section.querySelector(".premium-maya-signature"), "up", 80);
        reveal(section.querySelector(".premium-maya-cta"), "up", 150);
        reveal(section.querySelector(".premium-maya-portrait"), "image", 80);
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="quote"]')
      .forEach((section) => {
        reveal(section.querySelector("blockquote"), "up", 0);
        reveal(section.querySelector(".premium-quote-attribution"), "up", 130);
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="reviews"]')
      .forEach((section) => {
        reveal(section.querySelector(".reviews-heading h2"), "up", 0);
        reveal(section.querySelector(".reviews-heading .intro"), "up", 90);

        if (window.matchMedia("(max-width: 767px)").matches) {
          reveal(section.querySelector(".review-grid"), "up", 140);
          reveal(section.querySelector(".review-pagination"), "up", 210);
        } else {
          section.querySelectorAll(".review-original").forEach((card, index) => {
            reveal(card, "up", 140 + index * 100);
          });
        }
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="working"]')
      .forEach((section) => {
        reveal(section.querySelector("h2"), "up", 0);

        section.querySelectorAll(".premium-working-point").forEach((point, index) => {
          reveal(point, "up", 120 + index * 100);
        });
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="contact"]')
      .forEach((section) => {
        reveal(section.querySelector(".premium-contact-copy"), "left", 0);
        reveal(section.querySelector("form"), "right", 110);
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="book"]')
      .forEach((section) => {
        reveal(section.querySelector("h2"), "left", 0);
        reveal(section.querySelector(".premium-book-cta"), "right", 110);
      });

    root
      .querySelectorAll<HTMLElement>('[data-reveal-section="footer"]')
      .forEach((footer) => {
        footer
          .querySelectorAll(".premium-footer-group")
          .forEach((group, index) => {
            reveal(group, "up", index * 80);
          });

        reveal(footer.querySelector(".premium-footer-legal"), "up", 180);
      });

    // Mobile-only finer-grained reveals. Desktop selectors and pacing remain unchanged.
    if (window.matchMedia("(max-width: 767px)").matches) {
      const groups: Array<[string, string, number]> = [
        ['[data-reveal-section="services"] article h3', "up", 75],
        ['[data-reveal-section="services"] article p:not(.service-tagline)', "up", 130],
        ['[data-reveal-section="services"] article li', "up", 180],
        ['[data-reveal-section="services"] article a', "up", 220],
        ['[data-reveal-section="approach"] .approach-principle h3', "up", 80],
        ['[data-reveal-section="approach"] .approach-principle img', "image", 50],
        ['[data-reveal-section="contact"] .premium-contact-copy h2', "up", 0],
        ['[data-reveal-section="contact"] .premium-contact-copy p', "up", 90],
        ['[data-reveal-section="contact"] form input', "up", 90],
        ['[data-reveal-section="contact"] form textarea', "up", 110],
        ['[data-reveal-section="contact"] form button', "up", 150],
        ['[data-reveal-section="footer"] .premium-footer-group a', "up", 90],
      ];
      groups.forEach(([selector, type, base]) => {
        root.querySelectorAll(selector).forEach((element, index) => {
          reveal(element, type as "up" | "image", base + Math.min(index, 5) * 35);
        });
      });
      // Prevent nested reveal transforms in the service cards from hiding whole sections.
      root.querySelectorAll<HTMLElement>('[data-reveal-section="services"] article').forEach((card) => {
        delete card.dataset.reveal;
        delete card.dataset.revealState;
        card.style.removeProperty("transition-delay");
      });
    }

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>('[data-reveal][data-reveal-state="hidden"]')
    );

    if (
      reducedMotion ||
      typeof IntersectionObserver === "undefined"
    ) {
      targets.forEach((target) => {
        target.dataset.revealState = "visible";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;
          target.dataset.revealState = "visible";
          observer.unobserve(target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [enabled]);
}

function ReviewsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeReview, setActiveReview] = useState(1);
  const slideWidthRef = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);
  const wrapFrameRef = useRef<number | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const draggingRef = useRef(false);

  const centerCard = (index: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2, behavior });
  };

  const selectReview = (index: number) => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      centerCard(3 + index);
    }
    setActiveReview(index);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const query = window.matchMedia("(max-width: 767px)");
    const initialise = () => {
      if (!query.matches) return;
      const card = track.children[4] as HTMLElement | undefined;
      if (!card) return;
      slideWidthRef.current = (track.children[4] as HTMLElement).offsetLeft - (track.children[3] as HTMLElement).offsetLeft;
      centerCard(4, "instant");
      updateCards();
    };
    const frame = requestAnimationFrame(initialise);
    window.addEventListener("resize", initialise);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", initialise); if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current); if (wrapFrameRef.current) cancelAnimationFrame(wrapFrameRef.current); if (settleTimerRef.current) clearTimeout(settleTimerRef.current); };
  }, []);

  const normaliseWheel = () => {
    const track = trackRef.current;
    if (!track || draggingRef.current || !window.matchMedia("(max-width: 767px)").matches) return;
    const step = slideWidthRef.current || ((track.children[4] as HTMLElement).offsetLeft - (track.children[3] as HTMLElement).offsetLeft);
    if (step <= 0) return;
    const middle = track.scrollLeft + track.clientWidth / 2;
    const firstCenter = (track.children[0] as HTMLElement).offsetLeft + (track.children[0] as HTMLElement).offsetWidth / 2;
    const index = Math.round((middle - firstCenter) / step);
    if (index < 3 || index > 5) {
      // Equivalent card in the middle cycle, after momentum has stopped.
      const middleIndex = 3 + ((index % 3) + 3) % 3;
      const target = track.scrollLeft + (middleIndex - index) * step;
      if (wrapFrameRef.current !== null) cancelAnimationFrame(wrapFrameRef.current);
      track.style.scrollSnapType = "none";
      track.style.scrollBehavior = "auto";
      track.scrollLeft = target;
      wrapFrameRef.current = requestAnimationFrame(() => {
        track.style.scrollSnapType = "";
        track.style.scrollBehavior = "";
        wrapFrameRef.current = null;
      });
    }
    updateCards();
  };

  const updateCards = () => {
    const track = trackRef.current;
    if (!track || !window.matchMedia("(max-width: 767px)").matches) return;
    const step = slideWidthRef.current || ((track.children[4] as HTMLElement).offsetLeft - (track.children[3] as HTMLElement).offsetLeft);
    if (step <= 0) return;
    const firstCenter = (track.children[0] as HTMLElement).offsetLeft + (track.children[0] as HTMLElement).offsetWidth / 2;
    const adjustedMiddle = track.scrollLeft + track.clientWidth / 2;
    const nearest = Math.max(0, Math.min(8, Math.round((adjustedMiddle - firstCenter) / step)));
    setActiveReview(nearest % 3);
    Array.from(track.children).forEach((element) => {
      const card = element as HTMLElement;
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - adjustedMiddle) / step;
      const scale = 1 - Math.min(distance, 1) * 0.14;
      card.style.setProperty("--wheel-scale", String(scale));
      card.style.setProperty("--wheel-opacity", String(1 - Math.min(distance, 1) * 0.25));
    });
  };

  const updateReview = () => {
    if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      updateCards();
    });
    if (settleTimerRef.current !== null) clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(() => {
      settleTimerRef.current = null;
      normaliseWheel();
    }, 180);
  };

  const finishReviewDrag = () => {
    draggingRef.current = false;
    if (settleTimerRef.current !== null) clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(() => {
      settleTimerRef.current = null;
      normaliseWheel();
    }, 180);
  };

  return (
    <section className="reviews-section" data-reveal-section="reviews">
      <div className="reviews-inner">
        <div className="reviews-heading">
          <h2 className="font-serif text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[54px]">
            What our clients have to say
          </h2>

          <p className="intro">
            Feedback from clients on the clarity, structure and operational support they have
            <br className="desktop-break" />
            gained through working together.
          </p>
        </div>

        <div ref={trackRef} onScroll={updateReview} onTouchStart={() => { draggingRef.current = true; }} onTouchEnd={finishReviewDrag} onTouchCancel={finishReviewDrag} onPointerDown={() => { draggingRef.current = true; }} onPointerUp={finishReviewDrag} onPointerCancel={finishReviewDrag} className="review-grid" role="region" aria-label="Client testimonials" tabIndex={0}>
          <article key="review-0" className="review-card review-clone">

            <div className="rating-mark" aria-hidden="true">
              <span className="quote-mark">“</span>
              <span className="stars">★★★★★</span>
            </div>

            <p className="review-copy">
              "Maya has an unfailing ability to solve any operational problem, and as a result we now have backend systems we can truly rely on. Her support has transformed my time completely—I can step away from the day-to-day noise and focus entirely on high-level goals and creative work. Seamless, proactive, and invaluable."
            </p>

            <div className="review-person">
              <strong>Arts &amp; Cultural Organisation</strong>
              <span>Founder &amp; Director</span>
            </div>
          </article>
          <article key="review-1" className="review-card review-clone">

            <div className="rating-mark" aria-hidden="true">
              <span className="quote-mark">“</span>
              <span className="stars">★★★★★</span>
            </div>

            <p className="review-copy">
              "Maya quickly identified the operational bottlenecks that were creating needless complexity across our client delivery. The new systems are clear, intuitive, and have taken an enormous weight off my plate. She just gets it."
            </p>

            <div className="review-person">
              <strong>Digital Agency</strong>
              <span>Managing Director</span>
            </div>
          </article>
          <article key="review-2" className="review-card review-clone">

            <div className="rating-mark" aria-hidden="true">
              <span className="quote-mark">“</span>
              <span className="stars">★★★★★</span>
            </div>

            <p className="review-copy">
              "Proper Ops brought true structure to how we operate. Maya built processes that reflected how we actually work rather than forcing a rigid template. Onboarding and handovers are now effortless."
            </p>

            <div className="review-person">
              <strong>Design Studio</strong>
              <span>Founder &amp; Creative Director</span>
            </div>
          </article>
          <article key="review-3" className="review-card review-original">

            <div className="rating-mark" aria-hidden="true">
              <span className="quote-mark">“</span>
              <span className="stars">★★★★★</span>
            </div>

            <p className="review-copy">
              "Maya has an unfailing ability to solve any operational problem, and as a result we now have backend systems we can truly rely on. Her support has transformed my time completely—I can step away from the day-to-day noise and focus entirely on high-level goals and creative work. Seamless, proactive, and invaluable."
            </p>

            <div className="review-person">
              <strong>Arts &amp; Cultural Organisation</strong>
              <span>Founder &amp; Director</span>
            </div>
          </article>
          <article key="review-4" className="review-card review-original">

            <div className="rating-mark" aria-hidden="true">
              <span className="quote-mark">“</span>
              <span className="stars">★★★★★</span>
            </div>

            <p className="review-copy">
              "Maya quickly identified the operational bottlenecks that were creating needless complexity across our client delivery. The new systems are clear, intuitive, and have taken an enormous weight off my plate. She just gets it."
            </p>

            <div className="review-person">
              <strong>Digital Agency</strong>
              <span>Managing Director</span>
            </div>
          </article>
          <article key="review-5" className="review-card review-original">

            <div className="rating-mark" aria-hidden="true">
              <span className="quote-mark">“</span>
              <span className="stars">★★★★★</span>
            </div>

            <p className="review-copy">
              "Proper Ops brought true structure to how we operate. Maya built processes that reflected how we actually work rather than forcing a rigid template. Onboarding and handovers are now effortless."
            </p>

            <div className="review-person">
              <strong>Design Studio</strong>
              <span>Founder &amp; Creative Director</span>
            </div>
          </article>
          <article key="review-6" className="review-card review-clone">

            <div className="rating-mark" aria-hidden="true">
              <span className="quote-mark">“</span>
              <span className="stars">★★★★★</span>
            </div>

            <p className="review-copy">
              "Maya has an unfailing ability to solve any operational problem, and as a result we now have backend systems we can truly rely on. Her support has transformed my time completely—I can step away from the day-to-day noise and focus entirely on high-level goals and creative work. Seamless, proactive, and invaluable."
            </p>

            <div className="review-person">
              <strong>Arts &amp; Cultural Organisation</strong>
              <span>Founder &amp; Director</span>
            </div>
          </article>
          <article key="review-7" className="review-card review-clone">

            <div className="rating-mark" aria-hidden="true">
              <span className="quote-mark">“</span>
              <span className="stars">★★★★★</span>
            </div>

            <p className="review-copy">
              "Maya quickly identified the operational bottlenecks that were creating needless complexity across our client delivery. The new systems are clear, intuitive, and have taken an enormous weight off my plate. She just gets it."
            </p>

            <div className="review-person">
              <strong>Digital Agency</strong>
              <span>Managing Director</span>
            </div>
          </article>
          <article key="review-8" className="review-card review-clone">

            <div className="rating-mark" aria-hidden="true">
              <span className="quote-mark">“</span>
              <span className="stars">★★★★★</span>
            </div>

            <p className="review-copy">
              "Proper Ops brought true structure to how we operate. Maya built processes that reflected how we actually work rather than forcing a rigid template. Onboarding and handovers are now effortless."
            </p>

            <div className="review-person">
              <strong>Design Studio</strong>
              <span>Founder &amp; Creative Director</span>
            </div>
          </article>
        </div>
        <div className="review-pagination" aria-label="Choose a testimonial">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              type="button"
              onClick={() => selectReview(index)}
              aria-label={`Show review ${index + 1}`}
              aria-current={activeReview === index ? "true" : undefined}
              className={`review-page-dot ${activeReview === index ? "is-active" : ""}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .reviews-section {
          width: 100%;
          background: #F4E9D1;
          color: #36322F;
          border-top: 9px solid #A96B52;
          padding: 50px 0 56px;
          box-sizing: border-box;
        }

        .reviews-inner {
          width: calc(100% - 250px);
          max-width: 1665px;
          margin: 0 auto;
        }

        .reviews-heading {
          text-align: center;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: #d6a428;
          font-size: 16px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.2px;
          margin-bottom: 24px;
        }

        .eyebrow-line {
          width: 22px;
          height: 4px;
          border-radius: 999px;
          background: #d6a428;
          display: inline-block;
        }

        .reviews-heading h2 {
          margin: 0;
        }

        .intro {
          margin: 22px 0 0;
          font-size: 20px;
          line-height: 1.35;
          letter-spacing: -0.35px;
          font-weight: 400;
        }

        .review-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          margin-top: 40px;
        }

        .review-card {
          min-height: 318px;
          background: #FBF8F3;
          padding: 40px 42px 36px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .review-clone { display: none; }

        .rating-mark {
          position: relative;
          width: 118px;
          height: 46px;
          margin-bottom: 6px;
        }

        .quote-mark {
          position: absolute;
          left: -3px;
          top: -23px;
          display: block;
          color: #E8D9CD;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 84px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -14px;
          transform: scaleX(1.15);
          transform-origin: left center;
        }

        .stars {
          position: absolute;
          left: 8px;
          bottom: 3px;
          color: #A96B52;
          font-size: 17px;
          line-height: 1;
          letter-spacing: 0px;
          white-space: nowrap;
        }

        .review-copy {
          margin: 0;
          font-size: 17px;
          line-height: 1.4;
          letter-spacing: -0.35px;
          font-weight: 400;
        }

        .review-person {
          margin-top: auto;
          padding-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .review-person strong {
          font-family: "Century Gothic", "CenturyGothic", "AppleGothic", sans-serif;
          font-size: 17px;
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: 0;
          font-synthesis: none;
        }

        .review-person span {
          margin-top: 1px;
          font-family: "Century Gothic", "CenturyGothic", "AppleGothic", sans-serif;
          font-size: 13px;
          line-height: 1.2;
          font-weight: 400;
          letter-spacing: 0;
          font-synthesis: none;
        }

        @media (max-width: 1400px) {
          .reviews-inner {
            width: calc(100% - 120px);
          }

          .review-card {
            padding-left: 34px;
            padding-right: 34px;
          }

          .review-copy {
            font-size: 18px;
          }
        }

        .review-pagination { display: none; }
        @media (max-width: 767px) {
          .reviews-section { padding: 42px 0 48px; }
          .reviews-inner { width: 100%; }
          .reviews-heading { padding-inline: 22px; }
          .review-grid {
            position: relative;
            display: flex;
            grid-template-columns: none;
            gap: 14px;
            margin-top: 28px;
            padding: 0 max(0px, calc((100% - min(75vw, 350px)) / 2)) 8px;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            scroll-padding-inline: max(0px, calc((100% - min(75vw, 350px)) / 2));
            overscroll-behavior-x: contain;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .review-grid::-webkit-scrollbar { display: none; }
          .review-clone { display: flex; }
          .review-card {
            transform: scale(var(--wheel-scale, .86));
            opacity: var(--wheel-opacity, .75);
            transition: transform 170ms ease-out, opacity 170ms ease-out;
            transform-origin: center center;
            border-radius: 12px;
          }
          .review-card {
            flex: 0 0 min(75vw, 350px);
            width: min(75vw, 350px);
            min-width: 0;
            min-height: 0;
            aspect-ratio: 1 / 1;
            padding: 21px 20px 19px;
            scroll-snap-align: center;
          }
          .review-copy {
            font-size: clamp(13.5px, 3.8vw, 15px);
            line-height: 1.4;
            letter-spacing: -0.18px;
          }
          .review-person { padding-top: 10px; }
          .review-person strong { font-size: 14px; }
          .review-person span { font-size: 12px; }
          .rating-mark { height: 30px; margin-bottom: 6px; }
          .quote-mark { top: -18px; font-size: 65px; }
          .stars { bottom: 0; font-size: 13px; }
          .review-pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            margin-top: 15px;
          }
          .review-page-dot {
            width: 8px;
            height: 6px;
            border: 0;
            border-radius: 999px;
            background: #CBBDB2;
            transition: width 280ms ease, background-color 280ms ease;
          }
          .review-page-dot.is-active { width: 28px; background: #A96B52; }
          .desktop-break { display: none; }
        }
        @media (max-width: 640px) {
          .reviews-heading h2 { font-size: 34px; letter-spacing: -1.2px; }
          .intro { font-size: 15px; }
        }
        @media (max-width: 370px) {
          .review-card { padding: 16px 15px; }
          .review-copy { font-size: 13px; line-height: 1.35; }
          .review-person { padding-top: 7px; }
        }
      `}</style>
    </section>
  );
}

export default function ProperOpsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeApproach, setActiveApproach] = useState(0);
  const approachRef = useRef<HTMLElement | null>(null);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderLeaving, setLoaderLeaving] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [overviewFileName, setOverviewFileName] = useState("");

  usePremiumRevealSystem(!loaderVisible);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (media.matches) setMobileMenuOpen(false); };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setHeroReady(true);
      setLoaderLeaving(true);
      const reducedTimer = window.setTimeout(() => setLoaderVisible(false), 180);
      return () => window.clearTimeout(reducedTimer);
    }

    const exitTimer = window.setTimeout(() => {
      setLoaderLeaving(true);
      setHeroReady(true);
    }, 620);

    const removeTimer = window.setTimeout(() => {
      setLoaderVisible(false);
    }, 1080);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;
    const html = document.documentElement;

    html.style.overflowY = "scroll";
    html.style.scrollbarGutter = "stable";

    if (loaderVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
    } else {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    };
  }, [loaderVisible]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setScrollY(window.scrollY);

      const section = approachRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const scrollableDistance = Math.max(rect.height - window.innerHeight, 1);
        const progress = Math.min(
          Math.max(-rect.top / scrollableDistance, 0),
          1
        );

        if (progress < 1 / 3) {
          setActiveApproach(0);
        } else if (progress < 2 / 3) {
          setActiveApproach(1);
        } else {
          setActiveApproach(2);
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Mobile Safari/Chrome do not reliably support fixed background images.
  // Animate a dedicated oversized image layer without rerendering React on scroll.
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const layers = Array.from(
      document.querySelectorAll<HTMLElement>(".premium-mobile-parallax")
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!media.matches || reducedMotion.matches) {
        layers.forEach((layer) => { layer.style.transform = "translate3d(0, 0, 0)"; });
        return;
      }

      const viewportHeight = window.innerHeight;
      for (const layer of layers) {
        const section = layer.parentElement;
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > viewportHeight + 100) continue;
        // Stronger mobile parallax: -115px to +115px over the section's viewport journey.
        const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        const offset = Math.max(-115, Math.min(115, (progress - 0.5) * 230));
        layer.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    reducedMotion.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
      reducedMotion.removeEventListener("change", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main
      data-premium-page
      data-hero-ready={heroReady ? "true" : "false"}
      className={`${manrope.className} min-h-screen bg-[#F4E9D1] text-[#36322F] selection:bg-[#A96B52] selection:text-white`}
    >
      {loaderVisible && (
        <div
          aria-hidden="true"
          className={`premium-loader fixed inset-0 z-[9999] grid place-items-center bg-[#36322F] transition-opacity duration-[440ms] ease-out ${
            loaderLeaving ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <img
            src="/media/proper_ops/img_13.png"
            alt=""
            className="premium-loader-logo h-auto w-[210px] object-contain sm:w-[250px] md:w-[285px]"
          />
        </div>
      )}

      {/* Mobile navigation: a separate full-screen page sliding in from the right. */}
      <aside
        id="proper-ops-mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
        className={`fixed inset-0 z-[70] flex h-[100dvh] flex-col overflow-y-auto overscroll-contain bg-[#36322F] text-[#F4E9D1] md:hidden motion-reduce:transition-none transition-transform duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${mobileMenuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"}`}
      >
        <div className="mx-auto flex h-[70px] w-full items-center justify-between px-5 sm:px-6">
          <img src="/media/proper_ops/img_13.png" alt="Proper Ops" className="h-[90px] w-auto max-w-[230px] object-contain" />
          <button type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Close navigation" className="flex h-11 w-11 shrink-0 items-center justify-center text-white transition-opacity hover:opacity-70">
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
        </div>
        <nav className="mx-auto flex w-full max-w-[560px] flex-1 flex-col items-center justify-center px-7 py-8 text-center sm:px-10">

          {[
            ["Home", "#top"],
            ["About", "#about"],
            ["Services", "#services"],
            ["Approach", "#approach"],
            ["Contact", "#contact"],
          ].map(([label, href], index) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className={`group flex w-full min-h-[72px] items-center justify-center text-center font-serif text-[clamp(36px,10vw,56px)] leading-none tracking-[-0.035em] transition-[color,opacity,transform] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none hover:text-[#C9A28D] ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
              style={{ transitionDelay: mobileMenuOpen ? `${270 + index * 95}ms` : "0ms" }}
            >
              <span>{label}</span>
            </a>
          ))}
          <a href="https://calendar.app.google/ZdAJB4QW6VobEp7L9" target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)} className={`mt-8 flex min-h-[54px] w-auto items-center justify-center rounded-full bg-[#A96B52] px-7 text-[13px] font-semibold text-white transition-[background-color,opacity,transform] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none hover:bg-[#BB7C62] ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`} style={{ transitionDelay: mobileMenuOpen ? "745ms" : "0ms" }}>
            Book a Discovery Call
          </a>
        </nav>
      </aside>

      {/* HEADER */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,box-shadow,backdrop-filter] duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)] md:!transform-none ${mobileMenuOpen ? "-translate-x-full" : "translate-x-0"} ${
          scrolled
            ? "border-white/10 bg-[#36322F]/94 shadow-[0_8px_32px_rgba(54,50,47,0.08)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between px-5 sm:px-6 md:h-[84px] md:px-10 lg:px-14">
          <a
            href="#top"
            className="inline-flex items-center"
            aria-label="Proper Ops home"
            data-hero-item
            style={{ transitionDelay: "20ms" }}
          >
            <img
              src="/media/proper_ops/img_13.png"
              alt="Proper Ops"
              className="h-[90px] w-auto max-w-[230px] object-contain md:h-[118px] md:max-w-none"
            />
          </a>

          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={mobileMenuOpen}
            aria-controls="proper-ops-mobile-nav"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="relative z-[60] flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[6px] text-white md:hidden"
          >
            <span className="block h-[1.5px] w-[22px] bg-current" />
            <span className="block h-[1.5px] w-[22px] bg-current" />
            <span className="block h-[1.5px] w-[22px] bg-current" />
          </button>

          <nav
            className="hidden items-center gap-9 text-[16px] font-normal tracking-[-0.02em] text-white/82 md:flex"

          >
            <a className="transition hover:text-white" href="#top" data-hero-item style={{ transitionDelay: "60ms" }}>
              Home
            </a>
            <a className="transition hover:text-white" href="#about" data-hero-item style={{ transitionDelay: "110ms" }}>
              About
            </a>
            <a className="transition hover:text-white" href="#services" data-hero-item style={{ transitionDelay: "160ms" }}>
              Services
            </a>
            <a className="transition hover:text-white" href="#approach" data-hero-item style={{ transitionDelay: "210ms" }}>
              Approach
            </a>
            <a className="transition hover:text-white" href="#contact" data-hero-item style={{ transitionDelay: "260ms" }}>
              Contact
            </a>
          </nav>

          <a
            href="https://calendar.app.google/ZdAJB4QW6VobEp7L9"
            target="_blank"
            rel="noreferrer"
            className="group hidden items-center gap-2.5 border border-white/55 bg-[rgba(54,50,47,0.24)] px-4 py-[10px] text-[14px] font-normal tracking-[-0.015em] text-white hover:bg-[#F4E9D1] hover:text-[#36322F] md:inline-flex"
            data-hero-item
            style={{
              transitionDelay: "320ms",
            }}
          >
            Book a discovery call
            <span
              className="text-[17px] font-light leading-none"

            >
              ›
            </span>
          </a>
        </div>
      </header>


      <div
        className={`relative min-h-screen bg-[#F4E9D1] motion-reduce:transition-none transition-transform duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)] md:!transform-none ${mobileMenuOpen ? "-translate-x-full" : "translate-x-0"}`}
      >
      {/* HERO */}
      <section id="top" className="relative min-h-[670px] h-[100svh] max-h-[950px] overflow-hidden bg-[#36322F] max-[380px]:min-h-[630px] md:min-h-0 md:max-h-none">
        <picture>
          <source media="(max-width: 767px)" srcSet="/media/proper_ops/img_23.png" />
          <img
            src="/media/proper_ops/img_19.png"
            alt=""
            className="premium-hero-image absolute -top-12 left-0 h-[calc(100%+96px)] w-full object-cover object-[80%_center] saturate-[0.9] contrast-[0.97] md:object-[28%_center] will-change-transform"
            style={{
              transform: `translate3d(0, ${Math.min(scrollY * 0.14, 44)}px, 0)`,
              transformOrigin: "center center",
            }}
          />
        </picture>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,33,31,0.84)_0%,rgba(37,33,31,0.64)_100%)] md:bg-[linear-gradient(90deg,rgba(37,33,31,0.82)_0%,rgba(37,33,31,0.62)_42%,rgba(37,33,31,0.22)_74%,rgba(37,33,31,0.06)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(54,50,47,0.22)_0%,rgba(54,50,47,0)_44%)]" />
        <div className="absolute inset-x-0 top-0 h-[34%] bg-[linear-gradient(180deg,rgba(37,33,31,0.34)_0%,rgba(37,33,31,0.11)_55%,rgba(37,33,31,0)_100%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-5 pb-12 pt-[92px] sm:px-6 md:px-10 md:pb-0 md:pt-[84px] lg:px-14">
          <div className="max-w-[860px]">
            <h1 data-hero-item className="max-w-[850px] font-serif text-[clamp(40px,10.3vw,53px)] font-normal leading-[1.04] tracking-[-0.042em] text-white sm:text-[58px] md:text-[70px] md:leading-[0.98] lg:text-[82px]" style={{ transitionDelay: "180ms" }}>
              Operational Clarity for Scaling Service Businesses
            </h1>

            <p data-hero-item className="mt-6 max-w-[660px] text-[15px] font-normal leading-[1.75] text-white/85 sm:text-[16px] md:text-[17px] md:leading-8" style={{ transitionDelay: "300ms" }}>
              Strategic backend architecture and hands-on operational leadership for founders ready to step out of the daily churn and build systems that run smoothly without them.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 min-[430px]:flex-row min-[430px]:items-center md:flex-wrap">
              <a
                href="https://calendar.app.google/ZdAJB4QW6VobEp7L9"
                target="_blank"
                rel="noreferrer"
                data-hero-item
                style={{ transitionDelay: "420ms" }}
                className="inline-flex min-h-[49px] items-center justify-center rounded-full bg-[#A96B52] px-6 py-[15px] text-[13px] font-semibold text-white transition-colors hover:bg-white hover:text-[#36322F]"
              >
                Book a Discovery Call
              </a>

              <a
                href="#services"
                data-hero-item
                style={{ transitionDelay: "500ms" }}
                className="inline-flex min-h-[49px] items-center justify-center rounded-full bg-[#A96B52] px-6 py-[15px] text-[13px] font-semibold text-white transition-colors hover:bg-white hover:text-[#36322F]"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION TWO — OUR SERVICES */}
      <section
        id="services"
        data-reveal-section="services"
        className="bg-[#F4E9D1]"
      >
        <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-11 sm:px-6 md:px-10 md:pt-12 lg:px-14 lg:pb-32 lg:pt-14">
          {/* Exact centreline header */}
          <div className="mb-14 hidden grid-cols-[1fr_auto_1fr] items-center gap-8 sm:grid">
            <h2 className="justify-self-end font-serif text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#36322F] md:text-[54px]">
              Our Services
            </h2>

            <div
              aria-hidden="true"
              className="h-[82px] w-px bg-[#36322F]/20"
            />

            {/* Original service logo, recoloured to match the title exactly */}
            <span className="relative block h-[82px] w-fit justify-self-start md:h-[108px]">
              <img
                src="/media/proper_ops/img_18.png"
                alt=""
                aria-hidden="true"
                className="h-full w-auto object-contain opacity-0"
              />
              <span
                role="img"
                aria-label="Proper Ops"
                className="absolute inset-0 block bg-[#36322F]"
                style={{
                  WebkitMaskImage: "url('/media/proper_ops/img_18.png')",
                  maskImage: "url('/media/proper_ops/img_18.png')",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
            </span>
          </div>

          <div className="mb-7 flex flex-col items-center gap-3 sm:hidden">
            <h2 className="font-serif text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#36322F]">
              Our Services
            </h2>



            {/* Original service logo, recoloured to match the title exactly */}
            <span className="relative block h-[56px] w-fit">
              <img
                src="/media/proper_ops/img_18.png"
                alt=""
                aria-hidden="true"
                className="h-full w-auto object-contain opacity-0"
              />
              <span
                role="img"
                aria-label="Proper Ops"
                className="absolute inset-0 block bg-[#36322F]"
                style={{
                  WebkitMaskImage: "url('/media/proper_ops/img_18.png')",
                  maskImage: "url('/media/proper_ops/img_18.png')",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-3 lg:gap-8">
            {services.map((service) => (
              <article
                key={service.title}
                className="group relative h-full"
              >
                <div
                  className={`absolute inset-0 hidden rounded-[26px] transition-shadow duration-300 lg:block ${finalServiceShadow}`}
                />

                <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-[18px] border border-[#36322F]/10 bg-white lg:min-h-[585px] lg:rounded-[26px]">
                  <div className="flex flex-1 flex-col p-5 pb-2 sm:p-8 sm:pb-5 md:p-9 md:pb-5">
                    <h3 className="max-w-[330px] font-serif text-[26px] leading-[1.12] tracking-[-0.025em] text-[#36322F] sm:text-[31px]">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-[14px] leading-[1.6] text-[#36322F]/72 sm:mt-5 sm:text-[15px] sm:leading-7">
                      {service.text}
                    </p>

                    <ul className="mt-5 space-y-2.5 sm:mt-7 sm:space-y-4">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-[12.5px] leading-[1.6] text-[#36322F]/72 sm:gap-3 sm:text-[13px] sm:leading-6"
                        >
                          <span className="mt-[9px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#A96B52]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto flex flex-col items-stretch gap-2 px-5 pb-4 pt-2 sm:flex-row sm:items-center sm:justify-between sm:px-8 md:min-h-[116px] md:px-9 md:pb-9">
                    <p className="service-tagline text-center whitespace-nowrap text-[clamp(8px,2.55vw,10px)] font-semibold uppercase leading-[1.4] tracking-[0.07em] text-[#A96B52]/80 sm:max-w-[190px] sm:whitespace-normal sm:text-[10px] sm:tracking-[0.17em]">
                      {service.eyebrow}
                    </p>

                    <a
                      href="#contact"
                      className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#36322F] px-5 py-[13px] text-center text-[12px] font-semibold text-white transition duration-300 hover:opacity-85"
                    >
                      {service.action}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* STATS PARALLAX */}
      <section
        data-reveal-section="stats"
        className="relative min-h-[390px] overflow-hidden bg-[#36322F] md:min-h-[430px]"
        style={{
          backgroundImage: "url('/media/proper_ops/img_1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="premium-mobile-parallax"
          aria-hidden="true"
          style={{ backgroundImage: "url('/media/proper_ops/img_1.png')" }}
        />
        <div className="absolute inset-0" style={{ opacity: PARALLAX_HAZE }}>
          <div className="absolute inset-0 bg-[#36322F]/62" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(54,50,47,0.70)_0%,rgba(54,50,47,0.48)_50%,rgba(54,50,47,0.70)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[390px] max-w-[1180px] items-center px-5 py-16 sm:px-6 md:min-h-[430px] md:px-10 md:py-16">
          <div className="premium-stats-grid mx-auto grid w-full max-w-[980px] gap-11 md:grid-cols-3 md:gap-6">
            <div className="premium-stat-item text-center text-white">
              <div className={`${manrope.className} text-[52px] font-medium leading-none tracking-[-0.045em] md:text-[64px]`}>
                <CountUp start={3} target={10} suffix="+" />
              </div>
              <h3 className="mx-auto mt-4 max-w-[280px] text-[18px] font-semibold leading-6 text-white">
                <span className="md:hidden">Years<br />Experience</span><span className="hidden md:inline">Years Experience</span>
              </h3>
              <p className="mx-auto mt-2 max-w-[255px] text-[15px] leading-7 text-white/74">
                Supporting business owners through operational transitions, systems design, and sustainable growth.
              </p>
            </div>

            <div className="premium-stat-item text-center text-white">
              <div className={`${manrope.className} text-[52px] font-medium leading-none tracking-[-0.045em] md:text-[64px]`}>
                <CountUp start={185} target={200} suffix="+" />
              </div>
              <h3 className="mx-auto mt-4 max-w-[280px] text-[18px] font-semibold leading-6 text-white">
                <span className="md:hidden">Systems<br />Transformed</span><span className="hidden md:inline">Systems Transformed</span>
              </h3>
              <p className="mx-auto mt-2 max-w-[255px] text-[15px] leading-7 text-white/74">
                Workflows, SOPs, and delivery pipelines audited, streamlined, and embedded.
              </p>
            </div>

            <div className="premium-stat-item text-center text-white">
              <div className={`${manrope.className} text-[52px] font-medium leading-none tracking-[-0.045em] md:text-[64px]`}>
                <CountUp start={90} target={100} suffix="%" />
              </div>
              <h3 className="mx-auto mt-4 max-w-[280px] text-[18px] font-semibold leading-6 text-white">
                <span className="md:hidden">Dedicated<br />Execution</span><span className="hidden md:inline">Dedicated Execution</span>
              </h3>
              <p className="mx-auto mt-2 max-w-[255px] text-[15px] leading-7 text-white/74">
                Hands-on delivery focused on calm communication, practical systems, and zero fluff.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* OUR BUSINESS APPROACH */}
      <section
        id="about"
        data-reveal-section="approach"
        className="relative overflow-hidden border-b border-[rgba(54,50,47,0.035)] bg-[#F4E9D1]"
      >
        <span id="approach" className="absolute -top-24" aria-hidden="true" />

        {/* restrained architectural grid background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(54,50,47,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(54,50,47,0.035)_1px,transparent_1px)] bg-[size:92px_92px]" />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-5 pb-[70px] pt-16 sm:px-6 md:px-10 md:pb-[92px] md:pt-14 lg:px-14 lg:pb-[92px] lg:pt-16">
          {/* centered title + introduction */}
          <div className="mx-auto max-w-[980px] text-center">
            <h2 className="font-serif text-[34px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#36322F] sm:whitespace-nowrap sm:text-[42px] md:text-[54px]">
              Our Business Approach
            </h2>

            <p className="mx-auto mt-7 max-w-[830px] text-[15px] leading-7 text-[#36322F]/74 md:text-[16px]">
              Proper Ops starts by mapping how your business actually runs—where delivery stalls, where handovers break down, and where too much still rests on your shoulders. From there, we build straightforward, durable operational structure shaped around how your team and clients actually work.
            </p>
          </div>

          {/* three-step circular process */}
          <div className="relative mx-auto mt-11 max-w-[1160px] lg:mt-14">
            <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
              {/* STEP 01 */}
              <article className="approach-principle relative flex flex-col items-center text-center">
                <div className="relative">
                  <div className="relative h-[210px] w-[210px] overflow-hidden rounded-full border-[7px] border-white shadow-[0_18px_48px_rgba(54,50,47,0.12)] md:h-[220px] md:w-[220px] lg:h-[238px] lg:w-[238px]">
                    <img
                      src="/media/proper_ops/img_20.png"
                      alt="Business workflow analysis"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <span className="absolute -left-2 top-5 flex h-12 w-12 items-center justify-center rounded-full border-[4px] border-[#F4E9D1] bg-[#A96B52] font-serif text-[17px] text-white shadow-[0_8px_20px_rgba(54,50,47,0.16)]">
                    01
                  </span>
                </div>

                <h3 className="mt-8 font-serif text-[28px] leading-tight tracking-[-0.025em] text-[#36322F]">
                  Diagnose First
                </h3>

                <p className="mt-4 max-w-[315px] text-[14px] leading-6 text-[#36322F]/72">
                  We inspect the live workflows, tool dependencies, and founder pinch-points before recommending changes. We fix the root cause of friction, not just the surface symptoms.
                </p>
              </article>

              {/* STEP 02 */}
              <article className="approach-principle relative flex flex-col items-center text-center">
                <div className="relative">
                  <div className="relative h-[210px] w-[210px] overflow-hidden rounded-full border-[7px] border-white shadow-[0_18px_48px_rgba(54,50,47,0.12)] md:h-[220px] md:w-[220px] lg:h-[238px] lg:w-[238px]">
                    <img
                      src="/media/proper_ops/exec-0b9c3f88-4f83-49ae-b88e-ae6ebb2dfedc.png"
                      alt="Building useful operational systems"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <span className="absolute -left-2 top-5 flex h-12 w-12 items-center justify-center rounded-full border-[4px] border-[#F4E9D1] bg-[#A96B52] font-serif text-[17px] text-white shadow-[0_8px_20px_rgba(54,50,47,0.16)]">
                    02
                  </span>
                </div>

                <h3 className="mt-8 font-serif text-[28px] leading-tight tracking-[-0.025em] text-[#36322F]">
                  Build What Is Useful
                </h3>

                <p className="mt-4 max-w-[315px] text-[14px] leading-6 text-[#36322F]/72">
                  We turn audit findings into clear ownership, concise SOPs, and refined pipelines. We don’t add software for the sake of it—only the tools and steps your business genuinely needs.
                </p>
              </article>

              {/* STEP 03 */}
              <article className="approach-principle relative flex flex-col items-center text-center">
                <div className="relative">
                  <div className="relative h-[210px] w-[210px] overflow-hidden rounded-full border-[7px] border-white shadow-[0_18px_48px_rgba(54,50,47,0.12)] md:h-[220px] md:w-[220px] lg:h-[238px] lg:w-[238px]">
                    <img
                      src="/media/proper_ops/img_21.png"
                      alt="Organised and reliable business operations"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <span className="absolute -left-2 top-5 flex h-12 w-12 items-center justify-center rounded-full border-[4px] border-[#F4E9D1] bg-[#A96B52] font-serif text-[17px] text-white shadow-[0_8px_20px_rgba(54,50,47,0.16)]">
                    03
                  </span>
                </div>

                <h3 className="mt-8 font-serif text-[28px] leading-tight tracking-[-0.025em] text-[#36322F]">
                  Embed &amp; Protect
                </h3>

                <p className="mt-4 max-w-[315px] text-[14px] leading-6 text-[#36322F]/72">
                  We integrate new structures directly into daily practice, eliminating chasing and bottlenecks so the business runs consistently and calmly in the background.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>



      {/* ABOUT MAYA */}
      <section id="about-maya" data-reveal-section="about-maya" className="bg-[#F4E9D1] text-[#36322F]">
        <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-7 sm:px-6 md:px-10 md:pb-24 md:pt-5 lg:px-14 lg:pb-28 lg:pt-6">
          <div className="grid gap-10 lg:grid-cols-[1.55fr_0.85fr] lg:gap-20">
            <div>
              <div className="relative max-w-[820px]">
                <h2 className="font-serif text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[50px] lg:text-[56px]">
                  About Maya.
                </h2>

              </div>

              <div className="premium-maya-copy mt-7 max-w-[860px] space-y-5 text-[15px] leading-[1.75] sm:text-[16px] md:mt-9 md:space-y-6 text-[#4C4641] md:text-[17px]">
                <p>
                  I’m Maya, founder of Proper Ops. I work with founders and growing service businesses that have reached an inflection point: the work is moving faster than the systems behind it.
                </p>
                <p>
                  Usually, that looks like critical information trapped in your head, tools that only do half their job, and a constant stream of minor operational decisions finding their way back to your desk.
                </p>
                <p className="font-semibold italic text-[#36322F]">
                  My role is to remove that operational noise and replace it with structure that actually works.
                </p>
                <p>
                  I look closely at how work travels across your business: how an enquiry turns into a project, where files live, who owns the next step, and where you are acting as the human glue holding everything together. From there, I build systems that are lean enough to be followed consistently, strong enough to handle growth, and clear enough that your business never depends on one person remembering everything.
                </p>
                <p className="font-semibold italic text-[#36322F]">
                  “The best operations work is often invisible—because everything simply happens when and how it should.”
                </p>
                <div className="premium-maya-mobile-portrait md:hidden">
                  <img
                    src="/media/proper_ops/Headshot.jpg"
                    alt="Maya Leftwick, founder of Proper Ops"
                    className="block h-full w-full object-cover object-center"
                  />
                </div>
                <p>
                  That is the most rewarding part of what I do: taking an operation that feels reactive or fragmented and quietly turning it into an engine you can trust. Seeing founders get their headspace back to focus on high-level strategy, while the backend runs reliably behind the scenes.
                </p>
                <p className="font-semibold italic text-[#36322F]">
                  Less firefighting. Fewer loose ends. Proper systems behind the work you do.
                </p>

                <div className="premium-maya-signature-row relative mt-12 max-w-[560px]">
                  <img
                    src="/media/proper_ops/img_4.png"
                    alt="Maya Leftwick signature"
                    className="premium-maya-signature relative z-10 ml-4 h-auto w-[235px] object-contain md:ml-8 md:w-[280px]"
                  />

                  <a
                    href="#contact"
                    className="premium-maya-cta relative z-20 mt-6 inline-flex shrink-0 items-center justify-center rounded-full bg-[#36322F] px-6 py-[13px] text-[12px] font-semibold text-white transition duration-300 hover:bg-[#36322F] sm:absolute sm:right-0 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2"
                  >
                    Enquire now
                  </a>
                </div>
              </div>
            </div>

            <div className="relative hidden self-stretch md:block lg:-mt-1">
              <div className="lg:sticky lg:top-[108px]">
                <div className="premium-maya-portrait relative mx-auto w-full max-w-[430px] overflow-hidden rounded-[30px] bg-[#DDD4CA] sm:rounded-[45px] lg:ml-auto lg:rounded-[58px]">
                  <img
                    src="/media/proper_ops/Headshot.jpg"
                    alt="Maya Leftwick, founder of Proper Ops"
                    className="aspect-[0.78] h-auto w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX QUOTE */}
      <section
        data-reveal-section="quote"
        className="relative min-h-[390px] overflow-hidden bg-[#36322F] md:min-h-[430px]"
        style={{
          backgroundImage: "url('/media/proper_ops/image2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="premium-mobile-parallax"
          aria-hidden="true"
          style={{ backgroundImage: "url('/media/proper_ops/image2.jpg')" }}
        />
        <div className="absolute inset-0" style={{ opacity: PARALLAX_HAZE }}>
          <div className="absolute inset-0 bg-[#36322F]/60" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(54,50,47,0.60)_0%,rgba(54,50,47,0.44)_50%,rgba(54,50,47,0.60)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[390px] max-w-[1440px] items-center justify-center px-6 py-14 text-center md:min-h-[430px] md:px-10 md:py-16 lg:px-14">
          <div className="mx-auto max-w-[1040px]">
            <blockquote className="font-serif text-[29px] font-normal leading-[1.18] tracking-[-0.03em] text-white sm:text-[34px] md:text-[40px] lg:text-[46px]">
              “Good operations aren’t about adding more tools or more processes.
              They’re about creating the right structure so the business works more
              clearly, consistently and calmly.”
            </blockquote>

            <div className="premium-quote-attribution mt-8 flex flex-col items-center justify-center">
              <p className="text-[13px] font-medium tracking-[0.035em] text-white/82 md:text-[14px]">
                Maya Leftwick
              </p>
              <p className="mt-1 text-[11px] font-normal tracking-[0.06em] text-white/52 md:text-[12px]">
                Founder, Proper Ops
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* REVIEWS */}
      <ReviewsSection />

      {/* WORKING WITH PROPER OPS PARALLAX */}
      <section
        data-reveal-section="working"
        className="relative min-h-[390px] overflow-hidden border-t-[9px] border-[#A96B52] bg-[#36322F] md:min-h-[430px]"
        style={{
          backgroundImage: "url('/media/proper_ops/img_10.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="premium-mobile-parallax"
          aria-hidden="true"
          style={{ backgroundImage: "url('/media/proper_ops/img_10.png')" }}
        />
        <div className="absolute inset-0" style={{ opacity: PARALLAX_HAZE }}>
          <div className="absolute inset-0 bg-[#36322F]/64" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(54,50,47,0.72)_0%,rgba(54,50,47,0.48)_50%,rgba(54,50,47,0.72)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[390px] max-w-[1280px] items-center px-6 py-16 text-center md:min-h-[430px] md:px-10 md:py-16 lg:px-14">
          <div className="w-full">
            <div className="mx-auto mb-12 max-w-[850px] text-center md:mb-14">
              <h2 className="font-serif text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] text-white md:text-[54px]">
                What it&apos;s like to work with us
              </h2>
            </div>

            <div className="mx-auto grid w-full max-w-[1080px] place-items-center justify-items-center gap-10 text-center md:grid-cols-3 md:gap-10">
              <div className="premium-working-point mx-auto flex w-full max-w-[335px] flex-col items-center text-center text-white">
                <h3 className="font-serif text-[25px] font-medium leading-[1.08] tracking-[-0.025em] md:text-[28px]">
                  Transparent from Day One
                </h3>
                <p className="mx-auto mt-4 max-w-[285px] text-[14px] leading-7 text-white/74">
                  No assumptions or generic templates. We diagnose how your business operates in reality before recommending or building a single thing.
                </p>
              </div>

              <div className="premium-working-point mx-auto flex w-full max-w-[335px] flex-col items-center text-center text-white">
                <h3 className="font-serif text-[25px] font-medium leading-[1.08] tracking-[-0.025em] md:text-[28px]">
                  Built Around Your Reality
                </h3>
                <p className="mx-auto mt-4 max-w-[285px] text-[14px] leading-7 text-white/74">
                  Your systems and SOPs are tailored to your client journey, team capacity, and working style—keeping workflows as lean and practical as possible.
                </p>
              </div>

              <div className="premium-working-point mx-auto flex w-full max-w-[335px] flex-col items-center text-center text-white">
                <h3 className="font-serif text-[25px] font-medium leading-[1.08] tracking-[-0.025em] md:text-[28px]">
                  Calm, Hands-On Delivery
                </h3>
                <p className="mx-auto mt-4 max-w-[285px] text-[14px] leading-7 text-white/74">
                  Whether running a focused audit sprint or providing ongoing fractional oversight, we step in, take ownership, and ensure the work actually gets done.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" data-reveal-section="contact" className={`${manrope.className} bg-[#FBF8F3] text-[#36322F] md:min-h-[640px]`}>
        <div className="premium-contact-layout mx-auto grid min-h-[610px] w-full max-w-[1400px] content-center gap-10 px-5 py-[70px] sm:px-6 md:min-h-[640px] md:px-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-[64px] lg:px-[6%] lg:py-[62px]">
          <div className="premium-contact-copy flex flex-col">
            <h2
              className="m-0 max-w-[390px] font-serif text-[37px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#36322F] md:text-[47px]"
            >
              Let’s discuss
              <br />
              your operations.
            </h2>

            <p
              className="mt-6 max-w-[470px] text-[15px] font-normal leading-[1.7] text-[#504b48] md:text-[14px]"
            >
              A straightforward conversation about where your business is experiencing friction and how Proper Ops can help. No pressure and no sales pitch—just practical clarity on the right next step.
            </p>

            <div className="premium-contact-links mt-[28px] space-y-[14px] text-[12px] font-medium text-[#393431]">
              <a
                href="#"
                aria-label="WhatsApp Proper Ops"
                className="flex items-center gap-5 transition-opacity hover:opacity-65"
              >
                <img
                  src="/media/proper_ops/img_5.png"
                  alt=""
                  className="h-[40px] w-[40px] shrink-0 object-contain"
                />
                <span>WhatsApp us</span>
              </a>

              <a
                href="https://calendar.app.google/ZdAJB4QW6VobEp7L9"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-5 transition-opacity hover:opacity-65"
              >
                <img
                  src="/media/proper_ops/img_6.png"
                  alt=""
                  className="h-[40px] w-[40px] shrink-0 object-contain"
                />
                <span className="md:hidden">Book a call</span><span className="hidden md:inline">Book a discovery call</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-5 transition-opacity hover:opacity-65"
              >
                <img
                  src="/media/proper_ops/img_7.png"
                  alt=""
                  className="h-[40px] w-[40px] shrink-0 object-contain"
                />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <form
            className="premium-contact-form grid min-w-0 content-start gap-y-[18px]"
            onSubmit={(event) => event.preventDefault()}
          >
            <h3 className="font-serif text-[24px] font-semibold text-[#36322F]">Tell us about your business</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-[#393431]">Name</span>
                <input type="text" name="name" autoComplete="name" className="h-[50px] w-full border border-[#69635f] bg-white px-4 text-[14px] outline-none transition focus:border-[#36322F]" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-[#393431]">Target Date</span>
                <input type="date" name="targetDate" className="h-[50px] w-full border border-[#69635f] bg-white px-4 text-[14px] outline-none transition focus:border-[#36322F]" />
              </label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-[#393431]">Email address</span>
                <input type="email" name="email" autoComplete="email" className="h-[50px] w-full border border-[#69635f] bg-white px-4 text-[14px] outline-none transition focus:border-[#36322F]" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-[#393431]">Primary Location</span>
                <input type="text" name="primaryLocation" autoComplete="address-level2" className="h-[50px] w-full border border-[#69635f] bg-white px-4 text-[14px] outline-none transition focus:border-[#36322F]" />
              </label>
            </div>
            <div className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-[#393431]">Current Operational Overview</span>
              <input
                id="operational-overview-file"
                type="file"
                name="operationalOverview"
                className="sr-only"
                onChange={(event) => setOverviewFileName(event.target.files?.[0]?.name ?? "")}
              />
              <div className="premium-upload-field flex h-[50px] w-full items-stretch border border-[#69635f] bg-white">
                <div className="flex min-w-0 flex-1 items-center truncate px-4 text-[13px] text-[#393431]" title={overviewFileName || "No file chosen"}>
                  <span className="truncate">{overviewFileName || "No file chosen"}</span>
                </div>
                <label
                  htmlFor="operational-overview-file"
                  className="flex shrink-0 cursor-pointer items-center justify-center border-l border-[#69635f] bg-[#F4E9D1] px-5 text-[12px] font-medium text-[#36322F] transition hover:bg-[#e9d8b8] focus-within:outline focus-within:outline-2 focus-within:outline-[#A96B52]"
                >
                  Upload File
                </label>
              </div>
            </div>
            <div className="premium-contact-actions flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
              <button type="submit" className="mt-2 inline-flex h-[48px] w-full items-center justify-center bg-[#36322F] text-[10px] font-semibold uppercase tracking-[0.02em] text-white transition hover:bg-[#36322F] sm:w-[170px] md:mt-0 md:shrink-0">
                Send Message
              </button>
              <p className="premium-calendar-prompt text-[12px] leading-5 text-[#504b48] md:leading-6 md:text-right">
                <span className="block">Prefer to book directly into the calendar?</span>
                <a className="mt-1 inline-block underline underline-offset-2" href="https://calendar.app.google/ZdAJB4QW6VobEp7L9" target="_blank" rel="noreferrer">Schedule a discovery call</a>
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* BOOK A CALL PARALLAX */}
      <section
        data-reveal-section="book"
        className="relative min-h-[180px] overflow-hidden bg-[#36322F] md:min-h-[200px]"
        style={{
          backgroundImage: "url('/media/proper_ops/img_2.png')",
          backgroundSize: "100% auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="premium-mobile-parallax"
          aria-hidden="true"
          style={{ backgroundImage: "url('/media/proper_ops/img_2.png')" }}
        />
        <div className="absolute inset-0" style={{ opacity: PARALLAX_HAZE }}>
          <div className="absolute inset-0 bg-black/34" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.46)_0%,rgba(0,0,0,0.24)_62%,rgba(0,0,0,0.28)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-[240px] max-w-[1370px] items-center gap-6 px-5 py-12 sm:px-6 md:min-h-[200px] md:px-10 lg:grid-cols-[1fr_auto] lg:px-14">
          <h2 className="premium-book-heading max-w-[900px] font-serif text-[32px] font-semibold leading-[1.06] tracking-[-0.03em] text-white sm:text-[35px] md:text-[38px] lg:text-[40px]">
            <span>Ready to make your</span>{" "}<span>business easier to run?</span>
          </h2>

          <div className="premium-book-cta lg:-translate-x-8">
            <a
              href="https://calendar.app.google/ZdAJB4QW6VobEp7L9"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#A96B52] px-7 py-[14px] sm:w-auto text-[12px] font-semibold text-white transition duration-300 hover:bg-[#36322F]"
            >
              Book a call
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer data-reveal-section="footer" className="bg-[#36322F] text-white">
        <div className="mx-auto w-full max-w-[1510px] px-5 pb-8 pt-12 sm:px-6 md:px-12 md:pt-12 lg:px-[70px]">
          {/* Main footer content */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-7 pb-8 text-center md:grid-cols-2 md:text-left lg:grid-cols-[1.35fr_0.78fr_0.78fr_0.9fr] lg:gap-x-16 lg:pb-11">
            {/* Brand */}
            <div className="premium-footer-brand premium-footer-group col-span-2 relative flex flex-col items-center md:col-span-1 md:items-start lg:-mt-4 lg:pr-6">
              <a
                href="#top"
                className="inline-flex items-center"
                aria-label="Proper Ops home"
              >
                <img
                  src="/media/proper_ops/img_13.png"
                  alt="Proper Ops"
                  className="relative z-0 h-[98px] w-auto object-contain md:h-[152px] lg:translate-x-4"
                />
              </a>

              <p className="relative z-20 -mt-3 max-w-[410px] text-[14px] leading-[1.5] text-white/92 md:-mt-5">
                <span className="block">Strategic backend architecture and operational leadership for founders</span>
                <span className="block">and scaling service businesses — leaner workflows,</span>
                <span className="block">stronger delivery and systems built to last.</span>
              </p>
            </div>

            {/* Services */}
            <div className="premium-footer-group pt-1 lg:pt-11">
              <h3 className="text-[13px] font-bold uppercase text-white md:text-[15px]">
                OUR SERVICES
              </h3>

              <nav className="mt-4 flex flex-col gap-3 text-[12px] leading-[1.4] text-white sm:text-[14px] md:mt-5 md:gap-[14px] md:text-[15px]">
                <a href="#services" className="transition-opacity hover:opacity-70">
                  Systems Audits
                </a>
                <a href="#services" className="transition-opacity hover:opacity-70">
                  Operational Retainers
                </a>
                <a href="#services" className="transition-opacity hover:opacity-70">
                  Fractional Operations
                </a>
              </nav>
            </div>

            {/* About */}
            <div className="premium-footer-group pt-1 lg:pt-11">
              <h3 className="text-[13px] font-bold uppercase text-white md:text-[15px]">
                ABOUT
              </h3>

              <nav className="mt-4 flex flex-col gap-3 text-[12px] leading-[1.4] text-white sm:text-[14px] md:mt-5 md:gap-[14px] md:text-[15px] md:leading-none">
                <a href="#about" className="transition-opacity hover:opacity-70">
                  About Proper Ops
                </a>
                <a href="#about-maya" className="transition-opacity hover:opacity-70">
                  About Maya
                </a>
                <a href="#approach" className="transition-opacity hover:opacity-70">
                  Our Approach
                </a>
                <a href="#contact" className="hidden transition-opacity hover:opacity-70 md:block">
                  Contact
                </a>
              </nav>
            </div>

            {/* Contact */}
            <div className="premium-footer-group col-span-2 pt-2 md:col-span-1 lg:pt-11">
              <h3 className="text-[13px] font-bold uppercase text-white md:text-[15px]">
                CONTACT
              </h3>

              <div className="mt-3 flex items-center justify-center gap-3 md:mt-5 md:justify-start">
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/45 text-[15px] font-bold transition hover:bg-[#36322F] hover:text-white"
                >
                  in
                </a>

                <a
                  href="#contact"
                  aria-label="Email"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/45 text-[18px] transition hover:bg-[#36322F] hover:text-white"
                >
                  ✉
                </a>
                <a
                  href="tel:01273000000"
                  aria-label="Call Proper Ops"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/45 transition hover:bg-[#36322F] hover:text-white"
                >
                  <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.7 19.7 0 0 1 11.2 18a19.4 19.4 0 0 1-6-6A19.7 19.7 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8L7.1 10a16 16 0 0 0 6.9 6.9l1.5-1.9a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 1.7 2Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Legal row aligned to the SAME footer grid */}
          <div className="premium-footer-legal border-t border-white/20 pb-2 pt-6">
            <div className="grid min-h-[42px] items-center gap-5 text-center text-[13px] text-white/88 md:grid-cols-2 md:text-left lg:grid-cols-[1.35fr_0.78fr_0.78fr_0.9fr] lg:gap-x-16">
              <div className="flex justify-center md:justify-start lg:translate-x-4">
                <p>© 2026 Proper Ops. All rights reserved.</p>
              </div>

              <div className="hidden lg:block" />
              <div className="hidden lg:block" />

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-start lg:-translate-x-6 lg:justify-start">
                <a href="#" className="transition-opacity hover:opacity-70">Privacy Policy</a>

                <a href="#" className="transition-opacity hover:opacity-70">Terms</a>

                <a href="#" className="transition-opacity hover:opacity-70">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      </div>

      <style>{`
        .premium-contact-form input:not([type="file"]),
        .premium-contact-form .premium-upload-field {
          border: 2px solid #69635f;
          border-radius: 8px;
        }
        .premium-contact-form .premium-upload-field { overflow: hidden; }
        .premium-contact-form .premium-upload-field label { border-left-width: 2px; }

        html {
          overflow-y: scroll;
          scrollbar-gutter: stable;
        }

        .premium-loader {
          will-change: opacity;
        }

        .premium-loader-logo {
          opacity: 0;
          transform: translate3d(0, 8px, 0) scale(.992);
          animation: premiumLoaderBrandIn 700ms cubic-bezier(.16, 1, .3, 1) 100ms forwards;
          will-change: transform, opacity;
        }

        @keyframes premiumLoaderBrandIn {
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        [data-hero-item] {
          opacity: 0;
          transform: translate3d(0, 18px, 0) scale(.992);
          transition:
            opacity 720ms cubic-bezier(.16, 1, .3, 1),
            transform 820ms cubic-bezier(.16, 1, .3, 1);
          will-change: transform, opacity;
        }

        [data-hero-ready="true"] [data-hero-item] {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }

        [data-reveal] {
          opacity: 0;
          transition:
            opacity 680ms cubic-bezier(.16, 1, .3, 1),
            transform 820ms cubic-bezier(.16, 1, .3, 1);
          will-change: transform, opacity;
        }

        [data-reveal="up"] {
          transform: translate3d(0, 18px, 0);
        }

        [data-reveal="left"] {
          transform: translate3d(-18px, 8px, 0);
        }

        [data-reveal="right"] {
          transform: translate3d(18px, 8px, 0);
        }

        [data-reveal="image"] {
          transform: translate3d(0, 14px, 0) scale(.992);
        }

        [data-reveal][data-reveal-state="visible"] {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }


        .premium-mobile-parallax { display: none; }
        @media (max-width: 767px) {
          [data-reveal] {
            transition-duration: 650ms, 720ms;
            transition-timing-function: cubic-bezier(.22, 1, .36, 1);
          }
          [data-reveal="up"] { transform: translate3d(0, 13px, 0); }
          .premium-mobile-parallax {
            display: block;
            position: absolute;
            inset: -145px 0;
            z-index: 0;
            pointer-events: none;
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
            transform: translate3d(0, 0, 0);
            will-change: transform;
          }

          .premium-hero-image {
            transform: none !important;
            will-change: auto;
            object-position: left center !important;
          }
          html { scrollbar-gutter: auto; }
          [data-premium-page] { overflow-x: clip; }
          [data-premium-page] section[id] { scroll-margin-top: 76px; }
          [data-reveal-section="stats"],
          [data-reveal-section="quote"],
          [data-reveal-section="working"],
          [data-reveal-section="book"] {
            background-image: none !important;
          }
          [data-reveal-section="stats"] { background-position: center 50% !important; }
          [data-reveal-section="quote"] { background-position: center !important; }
          [data-reveal-section="working"] { background-position: center !important; }
          [data-reveal-section="book"] { background-position: center !important; }
          .premium-footer-group p span { display: inline; }
          .premium-footer-group p span + span::before { content: " "; }
          .premium-footer-group { min-width: 0; }
          .premium-footer-brand > a { min-height: 112px; display: flex; align-items: center; justify-content: center; }
          .premium-footer-brand > p { margin-top: 0; }
          .premium-maya-signature { max-width: 65%; }
          .premium-maya-copy { display: flow-root; }
          .premium-maya-mobile-portrait {
            float: right;
            width: 50%;
            max-width: 205px;
            aspect-ratio: .78;
            margin: 58px 0 0 17px;
            overflow: hidden;
            border-radius: 20px;
            background: #DDD4CA;
          }
          .premium-maya-signature-row { clear: both; }
          .premium-maya-signature-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
          .premium-maya-signature-row .premium-maya-signature { max-width: 54%; width: 54%; margin-left: 0; }
          .premium-maya-signature-row .premium-maya-cta { position: relative; top: auto; right: auto; left: -14px; transform: none; margin-top: 0; padding: 12px 15px; font-size: 11px; }
          .premium-contact-layout { min-height: 0; gap: 20px; padding-block: 52px; }
          .premium-contact-form { row-gap: 12px; }
          .premium-contact-form > .grid { gap: 12px; }
          .premium-contact-form input:not([type="file"]) { height: 44px; }
          .premium-contact-form .premium-upload-field { height: 44px; }
          .premium-contact-form button[type="submit"] { height: 44px; margin-top: 2px; }
          .premium-footer-legal { border-top: 0; padding-top: 8px; }
          [data-reveal-section="footer"] > div { padding-bottom: 12px; }
          [data-reveal-section="footer"] .premium-footer-group:last-child { padding-bottom: 0; }
          .premium-stats-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 9px;
          }
          .premium-stats-grid .premium-stat-item { min-width: 0; }
          .premium-stats-grid .premium-stat-item > div { font-size: 33px; }
          .premium-stats-grid .premium-stat-item h3 { margin-top: 9px; font-size: 11px; line-height: 1.3; }
          .premium-stats-grid .premium-stat-item p { margin-top: 7px; font-size: 10px; line-height: 1.5; }
          [data-reveal-section="stats"] { min-height: 250px; }
          [data-reveal-section="stats"] > .relative.z-10 { min-height: 250px; padding-block: 28px; }
          .premium-contact-links {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 8px;
            width: 100%;
          }
          .premium-contact-links > a {
            min-width: 0;
            flex-direction: column;
            justify-content: flex-start;
            gap: 6px;
            text-align: center;
            font-size: 12px;
          }
          .premium-contact-links > a + a { margin-top: 0; }
          .premium-contact-links > a img { width: 34px; height: 34px; }
          .premium-calendar-prompt { text-align: center; }
          .premium-book-heading { text-align: center; font-size: 27px; }
          .premium-book-heading span { display: block; }
          .premium-book-cta { display: flex; justify-content: center; }
          .premium-book-cta a { width: auto; min-width: 0; padding-inline: 23px; }
        }
        @media (max-width: 380px) {
          .premium-maya-signature-row .premium-maya-signature { max-width: 52%; }
          .premium-footer-legal { font-size: 12px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .premium-mobile-parallax {
            transform: none !important;
            will-change: auto;
          }
          .premium-loader-logo {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }

          [data-hero-item],
          [data-reveal] {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}
