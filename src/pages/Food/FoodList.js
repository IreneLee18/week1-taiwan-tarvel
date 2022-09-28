import Pagination from "../components/PaginationNum";
import Loading from "../components/Loading";
import { allCity } from "../Data/HomeData";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
function FoodList() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState("NewTaipei");
  const [allData, setAllData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const perPage = 18;
  const getData=useCallback((api)=>{
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAllData(res);
        setIsLoading(false);
      });
      window.localStorage.setItem('currentCityFood',currentCity)
  },[currentCity])

  //點擊時切換
  const handleChange=(e)=>{
    const api = `https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/${currentCity}?%24filter=contains%28Picture%2FPictureUrl1%2C%27http%27%29&%24top=100&%24format=JSON`;
    setCurrentCity(e.target.value)
    getData(api)
  }

  //初始化
  useEffect(() => {
    const api = `https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/${currentCity}?%24filter=contains%28Picture%2FPictureUrl1%2C%27http%27%29&%24top=100&%24format=JSON`;
    getData(api)
  }, []);
  return (
    <>
      <main className="container">
        <section className="food-search-text">
          <p className="food-text text-gray-600">
            民以食為天的臺灣，幾乎是三步一小吃店，五步一大餐廳，可說是應有盡有。近年來由於工商業的發展快速，臺灣吃的文化除了傳統的中式飲食方式外，也發展到中式速食連鎖店的經營方式，使得臺灣吃的藝術變得更加繁複。
            <br />
            <br />
            因臺灣地處世界文化交流的總匯，世界各國的飲食也紛紛在臺灣出現，美國的漢堡、義大利的披薩、日本的生魚片、德國的豬腳、瑞士的乳酪等等，包羅萬象，讓臺灣著實成為饕家的天堂。而臺灣獨有的本土料理，風靡全球，嚐味一次，必將永生難忘。
          </p>
          <div className="food-logo food-sm-logo"></div>
          <div className="food-search">
            <label htmlFor="food">
              <span className="whereCityFood">您想找哪個地方的美食呢？</span>
              <select
                id="food"
                value={currentCity}
                onChange={handleChange}
              >
                {allCity.map((item) => (
                  <option key={item.id} id={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined arrow">
                arrow_drop_down
              </span>
            </label>
          </div>
        </section>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <section className="container">
              <ul className="foodGroup">
                {pageData.map((item) => (
                  <li key={item.RestaurantID}>
                    <Link to={item.RestaurantID}>
                      <img
                        src={item.Picture.PictureUrl1}
                        alt={item.RestaurantName}
                      />
                      <span>{item.RestaurantName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <Pagination
              allData={allData}
              setPageData={setPageData}
              perPageData={perPage}
            />
          </>
        )}
      </main>
    </>
  );
}
export default FoodList;
