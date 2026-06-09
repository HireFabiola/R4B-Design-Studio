// src/components/portfolio/TimelineSummary.tsx

export default function TimelineSummary() {
  return (
    <section className="timeline-summary">
      <article className="timeline-card">
        <span className="timeline-year">1999 - 2001</span>

        <h3>Systems Programmer</h3>

        <p>
          Built communication systems and enterprise applications at Worldspan.
        </p>
      </article>

      <article className="timeline-card">
        <span className="timeline-year">20+ YEARS</span>

        <h3>Mathematics Educator</h3>

        <p>
          Developed analytical thinkers while leading classrooms and academic
          initiatives.
        </p>
      </article>

      <article className="timeline-card">
        <span className="timeline-year">2026 & BEYOND</span>

        <h3>AI-Native Full-Stack Developer</h3>

        <p>
          Building modern software solutions with React, TypeScript, Node.js,
          and AI-assisted development.
        </p>
      </article>
    </section>
  );
}