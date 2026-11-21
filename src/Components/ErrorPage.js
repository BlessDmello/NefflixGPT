import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";

const ErrorPage = () => {
  const user = useSelector((store) => store.user);
  const { state } = useLocation();

  return (
    <div className="relative min-h-screen bg-[#141414] text-white">
      <Header />
      <main className="flex min-h-screen items-center justify-center px-6 pb-12 pt-32">
        <div className="w-full max-w-lg text-center" role="alert">
          <h1 className="text-3xl font-bold sm:text-4xl">
            {state?.title || "Something went wrong"}
          </h1>
          <p className="mt-4 leading-relaxed text-neutral-300">
            {state?.message ||
              "We couldn't complete your request. Please try again."}
          </p>
          <Link
            className="mt-8 inline-block rounded bg-[#e50914] px-6 py-3 font-semibold hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            to={user ? "/browse" : "/"}
          >
            {user ? "Back to Browse" : "Back to Sign In"}
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
