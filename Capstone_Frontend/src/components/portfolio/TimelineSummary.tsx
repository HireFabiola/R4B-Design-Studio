// src/components/portfolio/TimelineSummary.tsx

import { useEffect, useRef } from "react";

export default function TimelineSummary() {
  const timelineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = timelineRef.current?.querySelectorAll<HTMLElement>(
      ".timeline-card",
    );

    if (!cards?.length) return;

    if (!("IntersectionObserver" in window)) {
      cards.forEach((card) => card.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -5% 0px",
        threshold: 0.08,
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="timeline-summary" ref={timelineRef}>
      <article className="timeline-card">
        <span className="timeline-year">1999 - 2001</span>

        <h3>Entering Technology</h3>

        <p>
          My first degree-related role in a rapidly evolving industry.
        </p>

        <div className="timeline-story">
          <h4>The Beginning</h4>

          <p>
            Fresh out of college, I landed exactly what I thought I was supposed to
            do—a technology role aligned with my degree.
          </p>

          <p>
            Working as a Systems Programmer taught me how quickly technology evolves
            and planted the seed that continuous learning would become a lifelong
            necessity.
          </p>
        </div>
      </article>

      <article className="timeline-card">
        <span className="timeline-year">20+ YEARS</span>

        <h3>The Discovery Years</h3>

        <p>
          Educator • Consultant • Analyst • Investor • Entrepreneur
        </p>

        <div className="timeline-story">
          <h4>The Unexpected Chapter</h4>

          <p>
            What began as a practical pivot became a period of unexpected growth.
          </p>

          <p>
            As an educator, consultant, analyst, entrepreneur, and investor, I
            developed the communication, leadership, and problem-solving skills that
            now shape the way I build software.
          </p>

          <p>
            These years were not a detour from technology. They were preparation.
          </p>
        </div>
      </article>

      <article className="timeline-card">
        <span className="timeline-year">2026 & BEYOND</span>

        <h3>The Return</h3>

        <p>
          Bringing modern engineering skills to decades of experience.
        </p>

        <div className="timeline-story">
          <h4>A Return, Not A Reinvention</h4>

          <p>
            Long before React and AI-assisted development, I was a dual-degree
            engineering student at Spelman College with plans connected to
            Georgia Tech.
          </p>

          <p>
            Life changed the route, but not the destination.
          </p>

          <p>
            Today I combine enterprise technology experience, education,
            entrepreneurship, and modern software engineering into a unique
            perspective on solving problems.
          </p>
        </div>
      </article>
    </section>
  );
}
