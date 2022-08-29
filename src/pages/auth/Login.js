import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import CreateAccount from "./CreateAccount";
import Reset from "./Reset";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";

import ClipLoader from "react-spinners/ClipLoader";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

function Login() {
  const [registerModal, setRegisterModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const navigator = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(`user`, user);

        setTimeout(() => {
          setLoading(false);
          navigator("/");
        }, 3000);
        // ...
      })
      .catch((error) => {
        setTimeout(() => {
          setLoading(false);
          toast.error(error.message);
        }, 1000);
      });
  };

  const provider = new GoogleAuthProvider();

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(`user`, user);
        toast.success("Logged in successfully.");
        navigator("/");
        // ...
      })
      .catch((error) => {
        setTimeout(() => {
          setLoading(false);
          toast.error(error.message);
        }, 1000);
      });
  };

  return (
    <>
      <div className="h-screen w-full">
        <AnimatePresence>
          {registerModal && (
            <CreateAccount setRegisterModal={setRegisterModal} />
          )}
          {resetModal && <Reset setResetModal={setResetModal} />}
        </AnimatePresence>
        <div className="grid grid-cols-1 sm:grid-cols-12">
          <div className="h-screen bg-white col-span-6 flex flex-col justify-center align-center">
            <div className="mt-8 mx-4 md:mx-28">
              <div>
                <div>
                  <p className="text-lg font-medium text-primaryText flex justify-center pb-6">
                    Sign in with
                  </p>

                  <div className="mt-1 grid grid-cols-3 gap-3">
                    <div>
                      <div className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-[#3B5998] hover:bg-gray-50 cursor-pointer duration-200">
                        <BsFacebook className="w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <div className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-[#00ACEE] hover:bg-gray-50">
                        <BsTwitter className="w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <div
                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer duration-200"
                        onClick={googleSignIn}
                      >
                        <img
                          src={require("../../assets/google-color.svg").default}
                          alt=""
                          className="w-5 h-5"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <form className="space-y-6" onSubmit={handleLogin}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                    <div className="flex items-center text-sm">
                      <p>
                        Don't have an account?{" "}
                        <span
                          className="text-primaryPurple hover:text-primaryPurpleHover cursor-pointer hover:underline"
                          onClick={() => setRegisterModal(true)}
                        >
                          Sign up!
                        </span>
                      </p>
                    </div>

                    <div className="text-sm">
                      <p
                        className=" text-primaryPurple hover:text-primaryPurpleHover hover:underline cursor-pointer"
                        onClick={() => setResetModal(true)}
                      >
                        Forgot your password?
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {loading ? (
                        <ClipLoader color="#fff" loading={loading} size={20} />
                      ) : (
                        "Sign in"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="h-screen w-screen col-span-6 object-cover">
            <img
              src="https://images.unsplash.com/photo-1618031312993-f93038f30365?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
