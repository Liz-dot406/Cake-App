import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { About } from "./components/about/About";
import Landingpage from "./components/pages/Landingpage";
import { Cakes} from "./components/cakes/Cakes";
import {Login} from "./components/login/Login";
import { Register } from "./components/register/Register";
import { Contact } from "./components/contact/Contact";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landingpage />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/cakes",
      element: <Cakes/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
     {
      path: "/contact",
      element: <Contact/>,
    },
   
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
