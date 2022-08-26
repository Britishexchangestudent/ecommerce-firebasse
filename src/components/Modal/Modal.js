import { motion } from "framer-motion";
import React from "react";

function Modal({ children, title }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-100/70"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed  inset-x-0 mt-[25vh]  m-auto w-5/6   sm:w-[500px] p-6  bg-white shadow-md rounded-md "
      >
        <h1 className="text-2xl font-extrabold flex items-center justify-center mx-auto w-full mt-1">
           {title}
          </h1>
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Modal;
