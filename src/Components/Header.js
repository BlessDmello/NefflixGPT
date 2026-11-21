import { useState } from "react";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../Utils/firebase";
import { getAuthErrorMessage } from "../Utils/authErrors";
import userProfile from "../assets/user-profile.jpg";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch (error) {
      navigate("/error", {
        state: {
          title: "Unable to sign out",
          message: getAuthErrorMessage(error.code),
        },
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 bg-gradient-to-b from-black/80 to-transparent px-6 py-6 text-white sm:px-12">
      <img
        className="h-auto w-32 sm:w-44"
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAT4DsJqpLaLn4NdWj0hMqiS44NBBHsef6fJbMCXfInwFPyWRZWORRKIX6OoMypwFbV-skx1kkO0bw5qyPw4TGYECuHYwI_zw-n7CzjzEILCnaUNLQfmgkh-p1HzjExVEw9zDBrZd_di2.svg"
        alt="Netflix"
      />
      {user && (
        <div className="relative flex items-center gap-3 sm:gap-4">
          <img
            className="h-10 w-10 rounded object-cover"
            src={user.photoURL || userProfile}
            alt="User profile"
            title={user.displayName || "User profile"}
          />
          <button
            className="whitespace-nowrap rounded py-2 text-sm font-semibold hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-wait disabled:opacity-60 sm:text-base"
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            {isSigningOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
