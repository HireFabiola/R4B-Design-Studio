// Import necessary hooks and services
import type { Inquiry } from "../types/Inquiry";

import {
  getInquiries,
  updateInquiry,
  deleteInquiry,
} from "../services/inquiryService";

import { createProject } from "../services/projectService";

import { useCrud } from "../hooks/useCrud";

// InquiriesPage component to display and manage client inquiries
const InquiriesPage = () => {
  // Use the reusable CRUD hook to manage inquiries
  const {
    items: inquiries,
    isLoading,
    error,
    setError,
    editItem,
    removeItem,
  } = useCrud<Inquiry>({
    getItems: getInquiries,
    updateItem: updateInquiry,
    deleteItem: deleteInquiry,
  });

  // Function to create a project from a qualified inquiry
  const handleCreateProject = async (
    inquiry: Inquiry
  ) => {
    try {
      await createProject({
        title: `${
          inquiry.businessName || inquiry.clientName
        } Project`,
        description: inquiry.message,
        clientName: inquiry.clientName,
        clientEmail: inquiry.email,
        stage: "planning",
        inquiryId: inquiry._id,
      });

      alert("Project created successfully.");
    } catch {
      setError("Unable to create project.");
    }
  };

  // Function to update inquiry status
  const handleStatusChange = async (
    id: string,
    status: Inquiry["status"]
  ) => {
    try {
      await editItem(id, { status });
    } catch {
      setError("Unable to update inquiry status.");
    }
  };

  // Function to delete an inquiry
  const handleDeleteInquiry = async (
    id: string
  ) => {
    try {
      await removeItem(id);
    } catch {
      setError("Unable to delete inquiry.");
    }
  };

  // Display loading message while inquiries are being fetched
  if (isLoading) return <p>Loading inquiries...</p>;

  // Display error message if something went wrong
  if (error) return <p>{error}</p>;

  // Render inquiries list
  return (
    <section>
      <h1>Client Inquiries</h1>

      {inquiries.length === 0 ? (
        <p>No inquiries yet.</p>
      ) : (
        <ul>
          <div className="grid gap-5">
  {inquiries.map((inquiry) => (
    <article
      key={inquiry._id}
      className="rounded-2xl border border-[#D8C6B5] bg-[#FFF9F4] p-5 shadow-sm"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-[#122321]">
              {inquiry.clientName}
            </h2>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                inquiry.status === "new"
                  ? "bg-blue-100 text-blue-700"
                  : inquiry.status === "discussion"
                  ? "bg-yellow-100 text-yellow-700"
                  : inquiry.status === "qualified"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {inquiry.status.toUpperCase()}
            </span>
          </div>

          <p className="font-medium text-[#D69A2D]">
            {inquiry.businessName}
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-stone-600">
            <span>{inquiry.projectType}</span>
            <span>•</span>
            <span>{inquiry.budgetRange}</span>
          </div>

          <p className="max-w-3xl text-stone-700">
            {inquiry.message}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <select
            value={inquiry.status}
            onChange={(event) =>
              handleStatusChange(
                inquiry._id,
                event.target.value as Inquiry["status"]
              )
            }
            className="rounded-xl border border-[#D8C6B5] bg-white px-4 py-2"
          >
            <option value="new">New</option>
            <option value="discussion">Discussion</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
          </select>

          {inquiry.status === "qualified" && (
            <button
              type="button"
              onClick={() => handleCreateProject(inquiry)}
              className="rounded-xl bg-[#D69A2D] px-4 py-2 font-medium text-white transition hover:bg-[#B8862B]"
            >
              Create Project
            </button>
          )}
        </div>
      </div>
    </article>
  ))}
</div>
        </ul>
      )}
    </section>
  );
};

// Export component
export default InquiriesPage;