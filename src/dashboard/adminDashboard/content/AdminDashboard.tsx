import { Outlet } from "react-router-dom";
import { Navbar } from "../../../components/navabr/Navbar";
import { AdminDrawer } from "../aside/AdminDrawer";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <div>
      <Navbar />

      {/* Top Header */}
      <div className="flex px-4 py-4 bg-pink-800 items-center shadow-md">
        <button
          className="mr-4 text-white text-2xl lg:hidden"
          onClick={handleDrawerToggle}
        >
          {drawerOpen ? <IoMdClose /> : <FaBars />}
        </button>
        <span className="text-white text-lg font-semibold">
          Welcome to your Admin Dashboard
        </span>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 z-40 w-64 bg-pink-100 border-r border-pink-200 shadow-lg ${
            drawerOpen ? "" : "hidden"
          } lg:static lg:block lg:w-64`}
          style={{ minHeight: "100vh" }}
        >
          <div>
            <button
              className="absolute top-4 right-4 text-pink-800 text-4xl lg:hidden"
              onClick={handleDrawerToggle}
            >
              <IoMdClose />
            </button>
            <AdminDrawer />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
