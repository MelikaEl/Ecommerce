import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Login from "../pages/Login";
import Signup from "../pages/Signup"
import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
    {
      path: "/dashboard",
      element: <Dashboard/>,
    },
    {
      path: "/categories/:id",
      element: <Categories/>,
    },
  ]);

  export default router;