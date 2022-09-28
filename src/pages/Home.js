import Navbar from "./components/Navbar";
import SearchAreaCity from "./components/SearchAreaCity";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  let navigate = useNavigate();
  const [currentCity, setCurrentCity] = useState("Taipei");
  const handleClick = () => {
    window.localStorage.setItem("currentCity", currentCity);
    navigate("/tour");
  };
  return (
    <div className="home">
      <Navbar />
      <div className="logo"></div>
      <div className="area-search-group">
        <SearchAreaCity
          currentCity={currentCity}
          setCurrentCity={setCurrentCity}
        />
        <button className="font-garamond search-btn" onClick={handleClick}>
          SEARCH
        </button>
      </div>
    </div>
  );
}
export default Home;
