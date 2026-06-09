import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <main className="public-layout-main">
      <Outlet />
    </main>
  );
};

export default PublicLayout;