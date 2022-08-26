import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useState } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

import { createUserWithEmailAndPassword } from "firebase/auth";
import ClipLoader from "react-spinners/ClipLoader";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase/config";

function CreateAccount({ setRegisterModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const ref = useRef();

  useOnClickOutside(ref, () => setRegisterModal(false));

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setTimeout(() => {
        toast.error("Passwords do not match.");
      }, 1000);

      return;
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;

        setTimeout(() => {
          setLoading(false);
          setRegisterModal(false);
          toast.success("User successfully created.\n Please login.");
        }, 3000);
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
      <motion.div
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-100/70"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed  inset-x-0 top-36  m-auto w-5/6 h-3/6  sm:w-[500px] min-h-[228px] sm:h-3/6  bg-white shadow-md rounded-md "
          ref={ref}
        >
          <div className="mt-8 mx-6">
            <h1 className="mb-4 flex items-center justify-center mx-auto w-full text-2xl font-extrabold tracking-tight text-gray-900">
              Create an Account
            </h1>
            <form className="space-y-6" onSubmit={registerUser}>
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

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm"
                  />
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
                    "Create Account"
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default CreateAccount;
