// Import necessary dependencies and services for the ProjectsPage component, including React's useState hook, CRUD operations for projects, task creation service, and the Project type definition. It also imports a custom hook useCrud to manage CRUD operations for projects in a standardized way.
import { useState } from "react";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";

import { createTask } from "../services/taskService";
import type { Project } from "../types/Project";
import { useCrud } from "../hooks/useCrud";

// ProjectsPage component to display a list of projects in the admin dashboard
const ProjectsPage = () => {
  const {
    items: projects,
    isLoading,
    error,
    setError,
    addItem,
    editItem,
    removeItem,
  } = useCrud<Project>({
    getItems: getProjects,
    createItem: createProject,
    updateItem: updateProject,
    deleteItem: deleteProject,
  });

  // State variable to manage the form data for creating a new project, including title, client name, client email, description, and project stage
  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    clientEmail: "",
    description: "",
    stage: "planning" as Project["stage"],
  });

  // useEffect hook to fetch projects from the API when the component mounts. It calls the getProjects service function, updates the state with the retrieved projects, and handles any errors that may occur during the fetch process.
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // Destructure the name and value from the event target (input field) and update the formData state with the current values entered by the user in the input fields for creating a new project.
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle the creation of a new project when the form is submitted. It prevents the default form submission behavior, calls the addItem function from the useCrud hook to create a new project with the data from the form, and resets the form data after successful creation. It also handles any errors that may occur during the project creation process.
  const handleCreateProject = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      await addItem(formData);

      setFormData({
        title: "",
        clientName: "",
        clientEmail: "",
        description: "",
        stage: "planning",
      });
    } catch {
      setError("Unable to create project.");
    }
  };

  const handleStageChange = async (
    id: string,
    stage: Project["stage"]
  ) => {
    try {
      await editItem(id, { stage });
    } catch {
      setError("Unable to update project stage.");
    }
  };

  //  Function to handle the deletion of a project. It takes the project ID as an argument, calls the removeItem function from the useCrud hook to delete the project, and handles any errors that may occur during the deletion process.
  const handleDeleteProject = async (id: string) => {
    try {
      await removeItem(id);
    } catch {
      setError("Unable to delete project.");
    }
  };

  // Function to handle the creation of a new task associated with a project. It takes the project ID as an argument, calls the createTask service function to create a new task with predefined title, description, status, and the associated project ID, and handles any errors that may occur during the task creation process.
  const handleCreateTask = async (projectId: string) => {
    try {
      await createTask({
        title: "Initial project task",
        description: "First task created from project workflow.",
        status: "todo",
        projectId,
      });

      alert("Task created successfully.");
    } catch {
      setError("Unable to create task.");
    }
  };

  if (isLoading) return <p>Loading projects...</p>;
  if (error) return <p>{error}</p>;

  // Conditional rendering based on the loading state and error state. If the data is still loading, it displays a loading message. If there is an error, it displays the error message. Otherwise, it renders the form for creating a new project and the list of existing projects with options to change their stage, create a task for the project, or delete the project.
  return (
    <section>
      <h1>Projects</h1>

      <form onSubmit={handleCreateProject}>
        <h2>Create New Project</h2>

        <input
          name="title"
          placeholder="Project title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          name="clientName"
          placeholder="Client name"
          value={formData.clientName}
          onChange={handleChange}
          required
        />

        <input
          name="clientEmail"
          type="email"
          placeholder="Client email"
          value={formData.clientEmail}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Project description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <select
          name="stage"
          value={formData.stage}
          onChange={handleChange}
        >
          <option value="planning">Planning</option>
          <option value="development">Development</option>
          <option value="review">Review</option>
          <option value="complete">Complete</option>
        </select>

        <button type="submit">Create Project</button>
      </form>

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <h2>{project.title}</h2>
              <p>{project.clientName}</p>
              <p>{project.clientEmail}</p>
              <p>{project.description}</p>

              <select
                value={project.stage}
                onChange={(event) =>
                  handleStageChange(
                    project._id,
                    event.target.value as Project["stage"]
                  )
                }
              >
                <option value="planning">Planning</option>
                <option value="development">Development</option>
                <option value="review">Review</option>
                <option value="complete">Complete</option>
              </select>

              <button
                type="button"
                onClick={() => handleCreateTask(project._id)}
              >
                Create Task
              </button>

              <button
                type="button"
                onClick={() => handleDeleteProject(project._id)}
              >
                Delete Project
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProjectsPage;