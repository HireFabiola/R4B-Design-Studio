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
        <aside className="journey-phases">
          {phases.map((phase) => (
            <article className="phase-card" key={phase.phase}>
              <span>{phase.phase}</span>
              <h3>{phase.title}</h3>
              <p>{phase.description}</p>
            </article>
          ))}
        </aside>

        <div className="journey-skills">
          {skillCards.map((skill) => (
            <article className="skill-card" key={skill.title}>
              <div>
                <h3>{skill.title}</h3>

                <div className="skill-tags">
                  {skill.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <a href="#projects">View Project →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}