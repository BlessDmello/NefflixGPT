import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browser from "./Browser";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browser />,
  },
]);

const Body = () => {
  return <RouterProvider router={appRouter} />;
};

export default Body;
