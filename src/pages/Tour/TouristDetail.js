import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Web from "../../Utils/Web";
// import SwitchCard from "../components/SwitchCard";

function TouristDetail() {
  const currentCity = window.localStorage.getItem("currentCity");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sameCityTour, setSameCityTour] = useState([]);
  const [sameCityFood, setSameCityFood] = useState([]);
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
    const tourDetailAPI = `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/${currentCity}?%24filter=contains%28ScenicSpotID%2C%27${id}%27%29&%24top=30&%24format=JSON
  `;
    const sameCityAPI = `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/${currentCity}?%24top=30&%24format=JSON`;
    const foodAPI = `https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/${currentCity}?%24top=30&%24format=JSON`;
    const roomAPI = `https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel/${currentCity}?%24top=30&%24format=JSON`;
    getData(tourDetailAPI).then((res) => {
      const Class1 = Object.keys(res[0]).includes("Class1");
      const Class2 = Object.keys(res[0]).includes("Class2");
      const Class3 = Object.keys(res[0]).includes("Class3");
      if (Class1 || Class2 || Class3) res[0].ClassGroup = [];
      if (Class1) res[0].ClassGroup.push(res[0].Class1);
      if (Class2) res[0].ClassGroup.push(res[0].Class2);
      if (Class3) res[0].ClassGroup.push(res[0].Class3);
      setData(res[0]);
    });
    getData(sameCityAPI).then((res) => {
      setSameCityTour(res);
    });
    getData(foodAPI).then((res) => {
      setSameCityFood(res);
    });
    getData(roomAPI).then((res) => {
      setSameCityRoom(res);
      setIsLoading(false);
    });
  }, [
    currentCity,
    data.length,
    id,
    sameCityFood.length,
    sameCityRoom.length,
    sameCityTour.length,
  ]);
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
                <Link className="text-gray-500" to="/tour">
                  景點查詢
                </Link>
              </li>
              <li>
                <span className="material-icons-outlined text-gray-700">
                  navigate_next
                </span>
              </li>
              <li>
                <p className="text-blue">{data.ScenicSpotName}</p>
              </li>
            </ul>
          </section>
          <section className="container">
            <div className="tourist-detail-main">
              <div>
                {data.ClassGroup ? (
                  <div
                    className="tourist-detail-title"
                    style={
                      data.ClassGroup.length > 1
                        ? { display: "flex", flexDirection: "column" }
                        : {}
                    }
                  >
                    <h1 className="text-blue">{data.ScenicSpotName}</h1>
                    <div
                      className="tourist-detail-classGroup"
                      style={
                        data.ClassGroup.length > 1 ? { marginTop: "16px" } : {}
                      }
                    >
                      {data.Class1 ? <span>{data.Class1}</span> : null}
                      {data.Class2 ? <span>{data.Class2}</span> : null}
                      {data.Class3 ? <span>{data.Class3}</span> : null}
                    </div>
                  </div>
                ) : (
                  <div className="tourist-detail-title">
                    <h1 className="text-blue">{data.ScenicSpotName}</h1>
                  </div>
                )}
                <div className="tourist-detail-info">
                  <h2 className="text-gray-600">景點資訊</h2>
                  <ul>
                    <li className="d-flex">
                      <img
                        src="https://raw.githubusercontent.com/wingfailam/taiwantravel/a129221346a00d1f241f0b9d2ea8077be1c0860c/src/assets/images/icons/map.svg"
                        alt="map"
                      />
                      <span className="text-gray-600">
                        880 澎湖縣馬公市菜園里
                      </span>
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
                        <Link
                          onClick={handleClickWeb}
                          className="text-gray-600"
                        >
                          官方網站
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                </div>
              </div>
              <div className="tourist-detail-image">
                <img src={data.Picture.PictureUrl1} alt="" />
              </div>
            </div>
            <div>
              <h2 className="text-gray-600 tourist-detail-introduce">
                景點介紹
              </h2>
              <p className="tourist-detail-text text-gray-600">
                {data.DescriptionDetail}
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
              看更多{data.City}相關行程
            </p>
            {/* <SwitchCard allData={sameCityTour}/> */}
            <ul className="tourist-detail-more-card">
              {sameCityTour.map((item) => (
                <li className="box-shadow" key={item.ScenicSpotID}>
                  <Link to={`/tour/${item.ScenicSpotID}`}>
                    <div className="tourist-detail-more-card-img">
                      <img
                        src={item.Picture.PictureUrl1}
                        alt={item.ScenicSpotName}
                      />
                    </div>
                    <div className="tourist-detail-more-card-body">
                      <h3>{item.ScenicSpotName}</h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          {sameCityFood.length === 0 ? null : (
            <section className="container">
              <p className="tourist-detail-more-title">看更多附近推薦美食</p>
              <ul className="tourist-detail-more-card">
                {sameCityFood.map((item) => (
                  <li className="box-shadow" key={item.ScenicSpotID}>
                    <Link to={`/tour/${item.ScenicSpotID}`}>
                      <div className="tourist-detail-more-card-img">
                        <img
                          src={item.Picture.PictureUrl1}
                          alt={item.ScenicSpotName}
                        />
                      </div>
                      <div className="tourist-detail-more-card-body">
                        <h3>{item.ScenicSpotName}</h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
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
export default TouristDetail;
