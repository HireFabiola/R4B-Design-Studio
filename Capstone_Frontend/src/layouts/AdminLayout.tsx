import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-shell">

      {/* Sidebar */}

      <aside className="admin-sidebar">
        <h2>Admin Portal</h2>

        <nav>
          <ul>
            <li>
              <NavLink to="/admin/dashboard">
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/inquiries">
                Inquiries
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/projects">
                Projects
              </NavLink>
            </li>

            <li>
              <NavLink to="/admin/tasks">
                Tasks
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}

      <div className="admin-main">

        {/* Topbar */}

        <header className="admin-topbar">
          <h1>CRM Dashboard</h1>
        </header>

        {/* Routed Content */}

        <main className="admin-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;