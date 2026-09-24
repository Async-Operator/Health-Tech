import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorListing from "./pages/DoctorListing";
import DoctorDetail from "./pages/DoctorDetail";
import Home from "./pages/Home.jsx"
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorListing />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
