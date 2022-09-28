import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function Room() {
  return (
    <>
      <header className="room">
        <Navbar />
        <div className="food-logo"></div>
        <div className="scrollDown"></div>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}
export default Room;
