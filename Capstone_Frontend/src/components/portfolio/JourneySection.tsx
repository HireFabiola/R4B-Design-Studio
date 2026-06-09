// src/components/portfolio/JourneySection.tsx

import { phases, skillCards } from "./portfolioData";

export default function JourneySection() {
  return (
    <section id="journey" className="journey-section">
      <div className="section-heading">
        <h2>My Journey. My Growth. My Projects.</h2>

        <p>
          A step-by-step evolution of skills, knowledge, and real-world
          application.
        </p>
      </div>

      <div className="journey-grid">
        {/* LEFT SIDE - PHASES */}
        <aside className="journey-phases">
          {phases.map((phase) => (
            <article className="phase-card" key={phase.phase}>
              <div className="phase-marker">
                <span className="phase-dot" />
              </div>

              <div className="phase-content">
                <span className="phase-label">{phase.phase}</span>

                <h3>{phase.title}</h3>

                <p>{phase.description}</p>
              </div>
            </article>
          ))}
        </aside>

        {/* RIGHT SIDE - MILESTONE CARDS */}
        <div className="journey-skills">
          {skillCards.map((skill) => (
            <article className="skill-card" key={skill.title}>
              <div className="skill-thumbnail">
                <img src={skill.image} alt="" />
              </div>

              <div className="skill-card-content">
                <h3>{skill.title}</h3>

                <p className="skill-description">
                  {skill.description}
                </p>

                <div className="skill-tags">
                  {skill.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <span className="skill-link">
                {skill.linkLabel} →
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}