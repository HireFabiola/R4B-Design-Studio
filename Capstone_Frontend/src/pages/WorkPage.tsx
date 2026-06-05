import "../App.css";

export default function ViewWorkPage() {
  const projects = [
    {
      title: "WanderLust",
      category: "Travel Application",
      image: "/images/wanderlust-preview.png",
      description:
        "Interactive travel application built with TypeScript and REST APIs featuring visited-country tracking, journaling, and world map visualization.",
      tech: ["TypeScript", "Bootstrap", "REST API"],
      link: "https://hirefabiola.github.io/REST_Countries_API/",
    },
    {
  title: "GenAI Study Flashcards",
  category: "AI-Assisted Learning Tool",
  image: "/images/genai-flashcards-preview.png",
  description:
    "Animated study flashcard application built with AI-assisted development workflows, focused on reusable logic, smooth card transitions, and interactive learning support.",
  tech: ["JavaScript", "HTML", "CSS", "GenAI"],
  link: "https://hirefabiola.github.io/Mod8_GenAI/",
},
    {
      title: "TaskFlow Dashboard",
      category: "Productivity Platform",
      image: "/images/taskflow-preview.png",
      description:
        "Task management dashboard featuring filtering, analytics, progress tracking, and responsive user experience design.",
      tech: ["React", "TypeScript", "Chart.js"],
      link: "https://hirefabiola.github.io/react-task-dashboard/",
    },
    {
      title: "Digital Bookshelf",
      category: "Backend Application",
      image: "/images/bookshelf-preview.png",
      description:
        "CRUD-based digital library allowing users to track books, organize collections, and manage reading progress.",
      tech: ["Node.js", "Express", "EJS", "MongoDB"],
      link: "https://booklistapp-q5sm.onrender.com/",
    },
    {
      title: "FuelWise Health",
      category: "Fitness Platform",
      image: "/images/fuelwise-preview.png",
      description:
        "Strava-integrated dashboard focused on athlete performance insights and training load analysis.",
      tech: ["React", "TypeScript", "OAuth"],
      link: "https://robb-designs.github.io/fuelwise/",
    },
  ];

  return (
    <main className="portfolio-page">
      <section className="portfolio-hero">
        <p className="portfolio-eyebrow">OUR WORK</p>

        <h1>
          Building thoughtful
          <br />
          digital experiences.
        </h1>

        <p>
          A collection of projects focused on usability,
          business value, and clean technical execution.
        </p>
      </section>

      <section className="portfolio-grid">
        {projects.map((project) => (
          <article
            className="portfolio-card"
            key={project.title}
          >
            <img
              src={project.image}
              alt={project.title}
            />

            <div className="portfolio-content">
              <span>{project.category}</span>

              <h2>{project.title}</h2>

              <p>{project.description}</p>

              <div className="portfolio-tags">
                {project.tech.map((item) => (
                  <div
                    className="portfolio-tag"
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <a
                href={project.link}
                className="portfolio-link"
              >
                View Project →
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}