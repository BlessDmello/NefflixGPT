import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { auth } from "../Utils/firebase";
import { addUser, removeUser } from "../Utils/userSlice";
import Login from "./Login";
import Browser from "./Browser";
import ErrorPage from "./ErrorPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browser />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
]);

const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        dispatch(removeUser());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
