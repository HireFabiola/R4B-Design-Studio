// Import necessary hooks and services
import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import type { Project } from "../types/Project";

// ProjectsPage component to display a list of projects in the admin dashboard
const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect hook to fetch projects from the API when the component mounts. It calls the getProjects service function, updates the state with the retrieved projects, and handles any errors that may occur during the fetch process.
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch {
        setError("Unable to load projects.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) return <p>Loading projects...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1>Projects</h1>

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <h2>{project.title}</h2>
              <p>{project.clientName}</p>
              <p>{project.stage}</p>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

// Export the ProjectsPage component as the default export of this module
export default ProjectsPage;