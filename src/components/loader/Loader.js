import { motion } from "framer-motion";
import React from "react";
import ReactDOM from "react-dom";

import { Oval } from "react-loader-spinner";


function Loader() {
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 right-0 left-0 bottom-0 z-[1000] bg-gray-100/70 cursor-none"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10000]">
        <Oval
          height={80}
          width={80}
          color="#4F46E5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4338CA"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    </motion.div>,
    document.getElementById("loader")
  );
}

export default Loader;
