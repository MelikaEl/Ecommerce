import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Login from "../pages/Login";
import Signup from "../pages/Signup"


const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
    },
  ]);

  export default router;