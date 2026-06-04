import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/r4b-logo.png";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-amber-700 text-white"
        : "text-slate-200 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-stone-50 lg:flex">
      <header className="flex items-center justify-between border-b bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 ring-1 ring-slate-700">
            <img src={logo} alt="R4B Design Studio" className="h-8 w-8 object-contain" />
          </div>
          <span className="font-bold text-slate-900">R4B Admin</span>
        </div>

        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium"
        >
          Menu
        </button>
      </header>

      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } bg-slate-950 p-5 text-white lg:flex lg:min-h-screen lg:w-72 lg:flex-col`}
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 ring-1 ring-slate-700">
            <img src={logo} alt="R4B Design Studio" className="h-10 w-10 object-contain" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">R4B</h1>
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400">
              Design Studio
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          <NavLink to="/admin/dashboard" className={navLinkClass}>Dashboard</NavLink>
          <NavLink to="/admin/inquiries" className={navLinkClass}>Inquiries</NavLink>
          <NavLink to="/admin/projects" className={navLinkClass}>Projects</NavLink>
          <NavLink to="/admin/tasks" className={navLinkClass}>Tasks</NavLink>
        </nav>

        <div className="mt-8 rounded-2xl border border-slate-700 p-4 lg:mt-auto">
          <p className="font-semibold">Fabiola Aurelien</p>
          <p className="text-sm text-slate-400">Studio Administrator</p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 text-sm text-slate-300 transition hover:text-white"
          >
            Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;