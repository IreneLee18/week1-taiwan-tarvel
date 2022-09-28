import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Web from "../../Utils/Web";

function FoodDetail() {
  const currentCity = window.localStorage.getItem("currentCityFood");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sameCityTour, setSameCityTour] = useState([]);
  const [sameCityRoom, setSameCityRoom] = useState([]);
  const getData = (api) => {
    setIsLoading(true);
    return fetch(api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };
  useEffect(() => {
    const foodDetailAPI = `https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/${currentCity}?%24filter=contains%28RestaurantID%2C%27${id}%27%29&%24top=100&%24format=JSON`;
    const sameCityAPI = `https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/${currentCity}?%24filter=contains%28Picture%2FPictureUrl1%2C%27http%27%29&%24top=30&%24format=JSON`;
    const roomAPI = `https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel/${currentCity}?%24top=30&%24format=JSON`;
    getData(foodDetailAPI).then((res) => {
      setData(res[0]);
      console.log(res[0]);
    });
    getData(sameCityAPI).then((res) => {
      setSameCityTour(res);
    });
    getData(roomAPI).then((res) => {
      setSameCityRoom(res);
      setIsLoading(false);
    });
  }, [currentCity, id]);
  const handleClickWeb = () => {
    // 跳轉到外部連結
    Web(data.WebsiteUrl);
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main className="tourist-detail">
          <section className="container">
            <ul className="d-flex pageNavbar">
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
                <Link className="text-gray-500" to="/food">
                  美食查詢
                </Link>
              </li>
              <li>
                <span className="material-icons-outlined text-gray-700">
                  navigate_next
                </span>
              </li>
              <li>
                <p className="text-blue">{data.RestaurantName}</p>
              </li>
            </ul>
          </section>
          <section className="container">
            <div className="tourist-detail-main">
              <div className="tourist-detail-info">
                <h2 className="text-gray-600">美食資訊</h2>
                <ul>
                  <li className="d-flex">
                    <img
                      src="https://raw.githubusercontent.com/wingfailam/taiwantravel/a129221346a00d1f241f0b9d2ea8077be1c0860c/src/assets/images/icons/map.svg"
                      alt="map"
                    />
                    <span className="text-gray-600">{data.Address}</span>
                  </li>
                  <li className="d-flex">
                    <img
                      src="https://raw.githubusercontent.com/wingfailam/taiwantravel/a129221346a00d1f241f0b9d2ea8077be1c0860c/src/assets/images/icons/phone.svg"
                      alt="phone"
                    />
                    <span className="text-gray-600">{data.Phone}</span>
                  </li>
                  {data.OpenTime ? (
                    <li className="d-flex">
                      <img
                        src="https://raw.githubusercontent.com/wingfailam/taiwantravel/a129221346a00d1f241f0b9d2ea8077be1c0860c/src/assets/images/icons/time.svg"
                        alt="time"
                      />
                      <span className="text-gray-600">{data.OpenTime}</span>
                    </li>
                  ) : null}
                  {data.WebsiteUrl ? (
                    <li className="d-flex">
                      <img
                        src="https://raw.githubusercontent.com/wingfailam/taiwantravel/a129221346a00d1f241f0b9d2ea8077be1c0860c/src/assets/images/icons/information.svg"
                        alt="web"
                      />
                      <Link onClick={handleClickWeb} className="text-gray-600">
                        官方網站
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
              <div className="tourist-detail-image">
                <img src={data.Picture.PictureUrl1} alt="" />
              </div>
            </div>
            <div>
              <h2 className="text-gray-600 tourist-detail-introduce">
                美食介紹
              </h2>
              <p className="tourist-detail-text text-gray-600">
                {data.Description}
              </p>
            </div>
          </section>
          <section style={{ textAlign: "center" }}>
            <img
              src="https://raw.githubusercontent.com/wingfailam/taiwantravel/a129221346a00d1f241f0b9d2ea8077be1c0860c/src/assets/images/icons/scrollDown_default.svg"
              alt="scrollDown"
            />
          </section>
          <section className="container">
            <p className="tourist-detail-more-title">
              看更多{data.City}相關美食
            </p>
            {/* <SwitchCard allData={sameCityTour}/> */}
            <ul className="tourist-detail-more-card">
              {sameCityTour.map((item) => (
                <li className="box-shadow" key={item.RestaurantID}>
                  <Link to={`/food/${item.RestaurantID}`}>
                    <div className="tourist-detail-more-card-img">
                      <img
                        src={item.Picture.PictureUrl1}
                        alt={item.RestaurantName}
                      />
                    </div>
                    <div className="tourist-detail-more-card-body">
                      <h3>{item.RestaurantName}</h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          {sameCityRoom.length === 0 ? null : (
            <section className="container">
              <p className="tourist-detail-more-title">看更多附近推薦旅宿</p>
              <ul className="tourist-detail-more-card">
                {sameCityRoom.map((item) => (
                  <li className="box-shadow" key={item.HotelID}>
                    <Link to={`/room/${item.HotelID}`}>
                      <div className="tourist-detail-more-card-img">
                        <img
                          src={item.Picture.PictureUrl1}
                          alt={item.HotelName}
                        />
                      </div>
                      <div className="tourist-detail-more-card-body">
                        <h3>{item.HotelName}</h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      )}
    </>
  );
}
export default FoodDetail;
