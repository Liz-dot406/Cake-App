import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";

// Pages
import Landingpage from "./components/pages/Landingpage";
import { About } from "./components/about/About";
import { Contact } from "./components/contact/Contact";
import { Cakes } from "./components/cakes/Cakes";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { Verification } from "./components/login/verification";

// Dashboards
import AdminDashboard from "./dashboard/adminDashboard/content/AdminDashboard";
import CustomerDashboard from "./dashboard/customerDashboard/content/customerDashboard";

// Admin pages
import UsersPage from "./dashboard/adminDashboard/content/users/users";
import CakesPage from "./dashboard/adminDashboard/content/cakes/cakespage";
import OrdersPage from "./dashboard/adminDashboard/content/orders/orderspage";
import DesignsPage from "./dashboard/adminDashboard/content/designs/designspage";
import AnalyticsPage from "./dashboard/adminDashboard/content/analytics/Analyticspage";
import BrowseCakes from "./dashboard/customerDashboard/content/cakes/browsecakes";
import BrowseDesigns from "./dashboard/customerDashboard/content/designs/browsedesign";
import PlaceOrder from "./dashboard/customerDashboard/content/orders/placeorders";
import { Users } from "./dashboard/customerDashboard/content/users/Customer";




function App() {
  const isadmin = useSelector((state: RootState) => state.user.user?.role === "admin");
  const iscustomer = useSelector((state: RootState) => state.user.user?.role === "customer");

  const router = createBrowserRouter([
    // Public routes
    { path: "/", element: <Landingpage /> },
    { path: "/about", element: <About /> },
    { path: "/cakes", element: <Cakes /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/contact", element: <Contact /> },
    { path: "/verification", element: <Verification /> },

    // Admin Dashboard
    {
      path: "/admin/dashboard",
      element: isadmin ? <AdminDashboard /> : <Login />,
      children: [
         {
      index: true,
      element: <UsersPage />,
    },
        {
          path: "users",
          element: <UsersPage />, 
        },
        {
          path: "cakes",
          element: <CakesPage />, 
        },
       {
          path: "orders",
          element: <OrdersPage/>, 
        },
        {
          path: "designs",
          element: <DesignsPage/> 
        },
         {
          path: "analytics",
          element: <AnalyticsPage/> 
        },
      ],
    },

    // Customer Dashboard
    {
      path: "/customer/dashboard",
      element: iscustomer ? <CustomerDashboard /> : <Login />,
      children: [
        {
      index: true,
      element: <BrowseCakes />,
    },
        {
          path: "cakes",
          element: <BrowseCakes/>, 
        },
         {
          path: "design",
          element: <BrowseDesigns/>, 
        },
         {
          path: "orders",
          element: <PlaceOrder/>,
        },
        {
         path: "users",
          element: <Users/>
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            error: "bg-red-500 text-white",
            success: "bg-green-500 text-white",
          },
        }}
      />
    </>
  );
}

export default App;
