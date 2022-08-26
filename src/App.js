import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Admin, Contact, Home, Login } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminRoute } from "./components/admin/AdminRoute/AdminRoute";


function App() {
  return (
    <div className="bg-white w-full overflow-hidden">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
