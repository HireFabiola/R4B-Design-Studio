// src/components/portfolio/PortfolioHero.tsx

export default function PortfolioHero() {
    return (
        <section className="portfolio-hero">
            <div className="portfolio-hero-content">
                <p className="hero-eyebrow">MY SOFTWARE ENGINEERING JOURNEY</p>

                <h1 className="portfolio-hero-title">
                    From Systems Programmer
                    <br />
                    to AI-Native
                    <br />
                    <span className="hero-accent">Full-Stack Developer</span>
                </h1>

                <p className="hero-description">
                    I build practical digital solutions that solve real problems, improve
                    client experiences, and help businesses grow.
                </p>

                <div className="portfolio-hero-buttons">
                    <a href="#projects" className="btn-primary">
                        VIEW MY WORK
                    </a>

                    <a
                        href="https://github.com/HireFabiola"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary"
                    >
                        GITHUB
                    </a>

                    <a
                        href="https://www.linkedin.com/in/fabiola-aurelien"
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary"
                    >
                        LINKEDIN
                    </a>
                </div>
            </div>

            <div className="hero-image-container">
                <img
                    src="/images/portfolio-headshot.png"
                    alt="Fabiola Aurelien"
                    className="hero-image"
                />
            </div>

            <div className="hero-quote">
                <p>
                    <span className="quote-mark">“</span>
                   <p/> A lifelong love of <br/>problem-solving <br/>and teaching<br/> shaped the way <br/>I build today.
                </p>

                <span className="hero-quote-author">Fabiola</span>
            </div>
        </section>
    );
}