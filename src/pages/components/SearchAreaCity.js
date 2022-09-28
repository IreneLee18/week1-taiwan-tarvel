import { area, north, west, south, east, sea } from "../Data/HomeData";
import { useState } from "react";
function SearchAreaCity({currentCity,setCurrentCity}) {
  const [currentArea, setCurrentArea] = useState("請選擇地區");
  const [currentAreaCity, setCurrentAreaCity] = useState([]);
  const handleChange = (e) => {
    const { value } = e.target;
    setCurrentArea(value);
    switch (value) {
      case "北部地區":
        setCurrentAreaCity(north);
        setCurrentCity('Taipei');
        break;
      case "中部地區":
        setCurrentAreaCity(west);
        setCurrentCity('Taichung');
        break;
      case "南部地區":
        setCurrentAreaCity(south);
        setCurrentCity('Tainan');
        break;
      case "東部地區":
        setCurrentAreaCity(east);
        setCurrentCity('HualienCounty');
        break;
      case "離島地區":
        setCurrentAreaCity(sea);
        setCurrentCity('PenghuCounty');
        break;
      default:
        setCurrentArea("請選擇地區");
        setCurrentAreaCity([]);
        new Error("error");
    }
  };
  return (
    <>
      <div className="select">
        <select
          name="area"
          id="area"
          value={currentArea}
          onChange={handleChange}
        >
          <option value="請選擇地區" disabled>
            請選擇地區
          </option>
          {area.map((item) => (
            <option key={item} id={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined">arrow_drop_down</span>
      </div>
      <div className="select">
        <select
          name="city"
          id="city"
          disabled={currentAreaCity.length === 0}
          value={currentCity}
          onChange={(e) => setCurrentCity(e.target.value)}
        >
          {currentAreaCity.map((item) => (
            <option key={item.id} id={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined">arrow_drop_down</span>
      </div>
    </>
  );
}
export default SearchAreaCity;
