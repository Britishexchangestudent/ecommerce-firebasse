import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Contact, Home, Login } from "./pages";

function App() {
  return (
    <div className="bg-white w-full overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
