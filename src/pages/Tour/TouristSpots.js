import SearchAreaCity from "../components/SearchAreaCity";
import PaginationNum from "../components/PaginationNum";
import { Link } from "react-router-dom";
import { categoryData } from "../Data/TourData";
import { useCallback, useEffect, useState } from "react";
function TouristSpots() {
  const homeStartSearch = window.localStorage.getItem("currentCity");
  const [category, setCategory] = useState(categoryData);
  const [currentCity, setCurrentCity] = useState(
    !homeStartSearch ? "Taipei" : homeStartSearch
  );
  const [allData, setAllData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const handleChangeCategory = (e) => {
    setCategory(
      categoryData.map((item) =>
        item.id === e.target.id ? { ...item, checked: true } : item
      )
    );
  };
  const getData = useCallback(() => {
    const api = `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/${currentCity}?%24top=30&%24format=JSON`;
    fetch(api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setAllData(res));
    setCategory(
      categoryData.map((item) =>
        item.id === "all" ? { ...item, checked: true } : item
      )
    );
  },[currentCity]);
  useEffect(() => {
    getData();
  }, [getData]);
  const handleClickGoDetail = () => {
    window.localStorage.setItem("currentCity", currentCity);
  };
  return (
    <>
      <div className="tour-header"></div>
      <main>
        <div className="container">
          <section>
            <ul className="d-flex">
              <li>
                <Link className="text-gray-500" to="/">
                  首頁
                </Link>
              </li>
              <li>
                <span className="material-icons-outlined text-gray-700">
                  navigate_next
                </span>
              </li>
              <li>
                <Link className="text-blue" to="/tour">
                  景點查詢
                </Link>
              </li>
            </ul>
          </section>
          <section className="main">
            <div className="side-tour-search">
              <div className="card box-shadow">
                <div className="search-title">
                  <p
                    className="text-gray-600"
                    style={{ fontSize: "18px", marginBottom: "16px" }}
                  >
                    篩選內容
                  </p>
                  <p className="text-blue">地區/縣市</p>
                </div>
                <div className="select-group">
                  <SearchAreaCity
                    currentCity={currentCity}
                    setCurrentCity={setCurrentCity}
                  />
                </div>
                <p className="category-title text-blue">類別</p>
                <div className="category">
                  {category.map((item) => (
                    <label className="d-flex" key={item.id} htmlFor={item.id}>
                      <div className={item.checked ? "checked" : ""}></div>
                      <input
                        id={item.id}
                        type="checkbox"
                        value="{item.value}"
                        checked={item.checked}
                        onChange={handleChangeCategory}
                      />
                      <span className="text-gray-600">{item.value}</span>
                    </label>
                  ))}
                </div>
                <div className="tour-search-btn">
                  <button
                    className="font-garamond search-btn"
                    onClick={getData}
                  >
                    SEARCH
                  </button>
                </div>
              </div>
            </div>
            <div className="main-tour-list">
              <p className="search-result-title">搜尋結果</p>
              <ul>
                {pageData.map((item) => (
                  <li className="card box-shadow" key={item.ScenicSpotID}>
                    <Link
                      className="card"
                      to={item.ScenicSpotID}
                      onClick={handleClickGoDetail}
                    >
                      <div className="card-image">
                        <img
                          src={item.Picture.PictureUrl1}
                          alt={item.ScenicSpotName}
                        />
                      </div>
                      <div className="card-body">
                        <div className="card-title">
                          <p className="name">{item.ScenicSpotName}</p>
                          <div className="classGroup">
                            {item.Class1 ? <p>{item.Class1}</p> : null}
                            {item.Class2 ? <p>{item.Class2}</p> : null}
                            {item.Class3 ? <p>{item.Class3}</p> : null}
                          </div>
                        </div>
                        <p className="card-text">{item.DescriptionDetail}</p>
                        <div className="card-info">
                          <div>
                            <img
                              src="https://raw.githubusercontent.com/wingfailam/taiwantravel/a129221346a00d1f241f0b9d2ea8077be1c0860c/src/assets/images/icons/site.svg"
                              alt="city"
                            />
                            <span>{item.City}</span>
                          </div>
                          {/* <div>
                          <img
                            src="https://raw.githubusercontent.com/wingfailam/taiwantravel/a129221346a00d1f241f0b9d2ea8077be1c0860c/src/assets/images/icons/time.svg"
                            alt="time"
                          />
                          <span>{item.OpenTime}</span>
                        </div> */}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
        <PaginationNum allData={allData} setPageData={setPageData} />
      </main>
    </>
  );
}
export default TouristSpots;
