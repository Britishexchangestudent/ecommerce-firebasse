import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Admin, Contact, Home, Login, ProductDetails, Products } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminRoute } from "./components/admin/AdminRoute/AdminRoute";
import { Navbar } from "./components";
import { selectIsLoggedIn } from "./redux/slice/authSlice";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log(`isLoggedIn`, isLoggedIn);
  return (
    <div className="bg-white w-full overflow-hidden">
      <BrowserRouter>
        <ToastContainer />

        <div className="flex justify-center items-center sm:px-16 px-6">
          <div className="xl:max-w-[1280px] w-full">
            <Navbar />
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
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
