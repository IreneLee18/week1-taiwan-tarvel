import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
function Tour() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Outlet />
      <Footer />
    </>
  );
}
export default Tour;
