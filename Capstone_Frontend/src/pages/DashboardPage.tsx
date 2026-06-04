import { useEffect, useState } from "react";
import MetricCard from "../components/admin/MetricCard";

import { getInquiries } from "../services/inquiryService";
import { getProjects } from "../services/projectService";
import { getTasks } from "../services/taskService";

import type { Inquiry } from "../types/Inquiry";
import type { Project } from "../types/Project";
import type { Task } from "../types/Task";

const DashboardPage = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [inquiryData, projectData, taskData] = await Promise.all([
          getInquiries(),
          getProjects(),
          getTasks(),
        ]);

        setInquiries(inquiryData);
        setProjects(projectData);
        setTasks(taskData);
      } catch {
        setError("Unable to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  const newInquiries = inquiries.filter((inquiry) => inquiry.status === "new").length;
  const activeProjects = projects.filter((project) => project.stage !== "complete").length;
  const openTasks = tasks.filter((task) => task.status !== "complete").length;
  const completedProjects = projects.filter((project) => project.stage === "complete").length;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">
          Welcome back, Fabiola.
        </h1>
        <p className="mt-1 text-slate-500">
          Here’s what’s happening in your studio today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="New Inquiries" value={newInquiries} subtitle="Awaiting review" />
        <MetricCard title="Active Projects" value={activeProjects} subtitle="Currently in progress" />
        <MetricCard title="Open Tasks" value={openTasks} subtitle="Still needing action" />
        <MetricCard title="Projects Completed" value={completedProjects} subtitle="Finished work" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="mb-4 text-xl font-bold text-slate-950">
            Recent Inquiries
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-3">Client</th>
                  <th className="py-3">Need</th>
                  <th className="py-3">Budget</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {inquiries.slice(0, 5).map((inquiry) => (
                  <tr key={inquiry._id} className="border-b last:border-0">
                    <td className="py-3 font-medium text-slate-900">{inquiry.clientName}</td>
                    <td className="py-3 text-slate-600">{inquiry.projectType}</td>
                    <td className="py-3 text-slate-600">{inquiry.budgetRange}</td>
                    <td className="py-3">
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                        {inquiry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-950">
            Open Tasks
          </h2>

          <div className="space-y-4">
            {tasks.filter((task) => task.status !== "complete").slice(0, 5).map((task) => (
              <div key={task._id} className="border-b pb-3 last:border-0">
                <p className="font-medium text-slate-900">{task.title}</p>
                <p className="text-sm text-slate-500">{task.status}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-950">
          Active Projects
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b text-xs uppercase text-slate-500">
              <tr>
                <th className="py-3">Project</th>
                <th className="py-3">Client</th>
                <th className="py-3">Stage</th>
              </tr>
            </thead>

            <tbody>
              {projects.slice(0, 5).map((project) => (
                <tr key={project._id} className="border-b last:border-0">
                  <td className="py-3 font-medium text-slate-900">{project.title}</td>
                  <td className="py-3 text-slate-600">{project.clientName}</td>
                  <td className="py-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {project.stage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
};

export default DashboardPage;