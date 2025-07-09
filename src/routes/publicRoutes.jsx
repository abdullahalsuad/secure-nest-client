import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";

const publicRoutes = {
  path: "/",
  element: <App />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "about",
      element: <About />,
    },
  ],
};

export default publicRoutes;
