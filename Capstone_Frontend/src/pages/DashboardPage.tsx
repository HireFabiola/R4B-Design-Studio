// Import necessary hooks and services for fetching data from the API
import { useEffect, useState } from "react";
import { getInquiries } from "../services/inquiryService";
import { getProjects } from "../services/projectService";
import { getTasks } from "../services/taskService";

// DashboardPage component to display an overview of key metrics such as the number of client inquiries, projects, and tasks in the admin dashboard
const DashboardPage = () => {
  const [inquiryCount, setInquiryCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect hook to fetch data for inquiries, projects, and tasks from the API when the component mounts. It uses Promise.all to make concurrent API calls and updates the state with the retrieved counts. It also handles any errors that may occur during the fetch process and manages the loading state.
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Use Promise.all to make concurrent API calls to fetch inquiries, projects, and tasks data
        const [inquiries, projects, tasks] = await Promise.all([
          getInquiries(),
          getProjects(),
          getTasks(),
        ]);

        // Update the state with the counts of inquiries, projects, and tasks retrieved from the API
        setInquiryCount(inquiries.length);
        setProjectCount(projects.length);
        setTaskCount(tasks.length);
      } catch {
        setError("Unable to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    //  
    fetchDashboardData();
  }, []);

  //  
  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1>Dashboard</h1>

      <div>
        <article>
          <h2>Client Inquiries</h2>
          <p>{inquiryCount}</p>
        </article>

        <article>
          <h2>Projects</h2>
          <p>{projectCount}</p>
        </article>

        <article>
          <h2>Tasks</h2>
          <p>{taskCount}</p>
        </article>
      </div>
    </section>
  );
};

// Export the DashboardPage component as the default export of this module
export default DashboardPage;