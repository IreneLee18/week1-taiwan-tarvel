import Pagination from "../components/PaginationNum";
import Loading from "../components/Loading";
import { allCity } from "../Data/HomeData";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
function RoomList() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState("NewTaipei");
  const [allData, setAllData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const perPage = 4;
  const getData = useCallback(
    (api) => {
      fetch('api', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          setAllData(res);
          // setIsLoading(false);
        });
      window.localStorage.setItem("currentCityRoom", currentCity);
    },
    [currentCity]
  );

  //點擊時切換
  const handleChange = (e) => {
    setCurrentCity(e.target.value);
    // const api = ``;
    // getData(api)
  };
  // //初始化
  useEffect(() => {
    const api = `https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel/Taipei?%24top=30&%24format=JSON`;
    getData(api);
  }, []);
  return (
    <>
      <main className="container">
        <section className="search-room">
          <div className="search-room-image">
            <img
              src="https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
              alt=""
            />
          </div>
          <div className="search-room-group">
            <div className="search-room-title">
              <img
                src="https://raw.githubusercontent.com/wingfailam/taiwantravel/a129221346a00d1f241f0b9d2ea8077be1c0860c/src/assets/images/icons/hotel.svg"
                alt="room"
              />
              <span className="text-gray-600">快速找到您感興趣的住宿點</span>
            </div>
            <div className="search-room-input">
              <label htmlFor="roomCity">
                <select
                  id="roomCity"
                  value={currentCity}
                  onChange={handleChange}
                >
                  {allCity.map((item) => (
                    <option key={item.id} id={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined arrow roomCity">
                  arrow_drop_down
                </span>
              </label>
              <div className="date">
                <label htmlFor="date-s">
                  <input
                    type="text"
                    disabled
                    placeholder="請輸入開始日期"
                    id="date-s"
                  />
                </label>
                <label htmlFor="date-e">
                  <input
                    type="text"
                    disabled
                    placeholder="請輸入結束日期"
                    id="date-e"
                  />
                </label>
              </div>
              <div className="detail">
                <label htmlFor="roomNum">
                  <input
                    type="text"
                    disabled
                    placeholder="請輸入房間數量"
                    id="roomNum"
                  />
                </label>
                <label htmlFor="roomPerson">
                  <input
                    type="text"
                    disabled
                    placeholder="請輸入人數"
                    id="roomPerson"
                  />
                </label>
              </div>
              <label htmlFor="keyword">
                <input
                  type="text"
                  disabled
                  placeholder="請輸入關鍵字"
                  id="keyword"
                />
              </label>
              <button className="font-garamond search-btn">SEARCH</button>
            </div>
          </div>
        </section>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <section>
              <div className="popular-title">
                <p className="text-blue">熱門民宿</p>
              </div>
              <div className="container">
                <ul className="popular-card">
                  {pageData.map((item) => (
                    <li className="box-shadow">
                      <Link to={item.HotelID}>
                        <div className="popular-card-img">
                          <img
                            src={item.Picture.PictureUrl1}
                            alt={item.HotelName}
                          />
                        </div>
                        <div className="popular-card-body">
                          <h3 className="text-blue">{item.HotelName}</h3>
                          <p className="text-gray-700">
                            <img
                              src="https://raw.githubusercontent.com/wingfailam/taiwantravel/a129221346a00d1f241f0b9d2ea8077be1c0860c/src/assets/images/icons/site.svg"
                              alt="address"
                            />
                            {item.City}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Pagination
                  allData={allData}
                  setPageData={setPageData}
                  perPageData={perPage}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
export default RoomList;
