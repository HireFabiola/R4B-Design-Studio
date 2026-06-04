import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/r4b-logo-dark.png";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-xl px-4 py-3 text-center text-sm font-medium transition ${
    isActive
      ? "text-[#D69A2D]"
      : "text-white hover:text-[#D69A2D]"
  }`;

  return (
    <div className="min-h-screen bg-[#F5EADF] lg:flex">
      {/* Mobile Header */}
      <header className="flex items-center justify-between border-b border-[#D8C6B5] bg-[#F5EADF] px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="R4B Design Studio"
            className="h-14 w-14 object-contain brightness-0 invert"
          />

          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] font-bold text-[#D69A2D]">
              Design
            </p>
            <p className="text-[10px] uppercase tracking-[0.28em] font-bold text-white">
              Studio
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-lg border border-[#B8862B]/50 px-3 py-2 text-sm font-medium text-[#122321]"
        >
          Menu
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } bg-[#122321] p-5 text-white lg:flex lg:min-h-screen lg:w-72 lg:flex-col`}
      >
       {/* Branding */}
<div className="mb-8 flex flex-col items-center">
<img
  src={logo}
  alt="R4B Design Studio"
  className="h-60 w-60 object-contain brightness-0 invert -mb-10"
/>

  <div className="flex flex-col items-center text-center leading-[0.85]">
    <span className="text-sm uppercase tracking-[0.35em] font-semibold text-[#D69A2D]">
      Design
    </span>

    <span className="text-sm uppercase tracking-[0.35em] font-semibold text-white">
      Studio
    </span>
  </div>
</div>

        {/* Navigation */}
       <nav className="space-y-1 text-center">
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/inquiries" className={navLinkClass}>
            Inquiries
          </NavLink>

          <NavLink to="/admin/projects" className={navLinkClass}>
            Projects
          </NavLink>

          <NavLink to="/admin/tasks" className={navLinkClass}>
            Tasks
          </NavLink>
        </nav>

        {/* User Card */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 lg:mt-auto">
          <p className="font-semibold">Fabiola Aurelien</p>
          <p className="text-sm text-stone-300">
            Studio Administrator
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 text-sm text-stone-300 transition hover:text-[#D69A2D]"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;