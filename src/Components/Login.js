import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./Header";
import { checkValidData } from "../Utils/validate";
import { getAuthErrorMessage } from "../Utils/authErrors";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { addUser } from "../Utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const username = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(
      email.current.value,
      password.current.value,
      isSignInForm ? undefined : username.current.value,
    );

    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      //Sign Up Logic
      const name = username.current.value.trim();

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      ) //API to authenticate email and password
        .then(async (userCredential) => {
          await updateProfile(userCredential.user, {
            displayName: name,
            photoURL: "https://avatars.githubusercontent.com/u/89186319?v=4",
          });

          // The auth listener may have run before the profile was updated.
          const { uid, email, displayName, photoURL } = userCredential.user;
          dispatch(addUser({ uid, email, displayName, photoURL }));
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(getAuthErrorMessage(error.code));
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then(() => {
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(getAuthErrorMessage(error.code));
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm((isSignIn) => !isSignIn);
    setErrorMessage(null);
  };

  return (
    <div className="relative isolate min-h-screen bg-black font-sans text-white">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img
          className="h-full w-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/12cedf4e-d9cf-4a31-b80f-7e6fbe4ef998/web/IN-en-20261109-TRIFECTA-perspective_12c44b81-de29-4047-ae67-40a52ffa45ba_medium.jpg"
          alt=""
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Header />

      <main className="flex min-h-screen justify-center px-4 pb-12 pt-28 sm:pt-24">
        <form
          className="h-fit w-full max-w-[450px] rounded bg-black/75 px-8 py-12 sm:px-[60px] sm:py-[60px]"
          onSubmit={(event) => event.preventDefault()}
          noValidate
        >
          <h1 className="mb-6 text-3xl font-bold">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          <div className="space-y-4">
            {!isSignInForm && (
              <div>
                <label className="sr-only" htmlFor="full-name">
                  Full name
                </label>
                <input
                  className="w-full rounded bg-neutral-800 px-5 py-4 text-base placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
                  id="full-name"
                  ref={username}
                  name="name"
                  type="text"
                  placeholder="Full name"
                  autoComplete="name"
                />
              </div>
            )}

            <div>
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <input
                className="w-full rounded bg-neutral-800 px-5 py-4 text-base placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
                id="email"
                ref={email}
                name="email"
                type="email"
                placeholder="Email address"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                className="w-full rounded bg-neutral-800 px-5 py-4 text-base placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
                id="password"
                ref={password}
                name="password"
                type="password"
                placeholder="Password"
                autoComplete={
                  isSignInForm ? "current-password" : "new-password"
                }
              />
            </div>
          </div>

          {errorMessage && (
            <p
              className="mt-4 rounded border-l-4 border-red-500 bg-red-950/80 p-3 text-sm leading-relaxed text-red-100"
              role="alert"
            >
              {errorMessage}
            </p>
          )}

          <button
            className="mt-10 w-full rounded bg-[#e50914] py-3 font-semibold hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            type="submit"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="mt-12 text-neutral-400">
            {isSignInForm ? "New to Netflix? " : "Already have an account? "}
            <button
              className="text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              type="button"
              onClick={toggleSignInForm}
            >
              {isSignInForm ? "Sign up now" : "Sign in now"}
            </button>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;
