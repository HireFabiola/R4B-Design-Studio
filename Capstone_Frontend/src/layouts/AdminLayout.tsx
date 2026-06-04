// Import necessary modules and components from React, React Router, and the authentication context
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// AdminLayout component to provide a consistent layout for all admin pages, including a sidebar for navigation and a top bar for the header    
const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Render the layout with a sidebar containing navigation links to different admin pages and a main content area where the child components (the specific admin pages) will be rendered using the Outlet component from React Router. The sidebar also includes a logout button that triggers the logout function from the authentication context and redirects the user to the admin login page.
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <h2>R4B Admin</h2>

        <nav>
          <ul>
            <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/admin/inquiries">Inquiries</NavLink></li>
            <li><NavLink to="/admin/projects">Projects</NavLink></li>
            <li><NavLink to="/admin/tasks">Tasks</NavLink></li>
          </ul>
        </nav>

        <button onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <h1>CRM Dashboard</h1>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Export the AdminLayout component as the default export of this module
export default AdminLayout;