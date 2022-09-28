import { Link } from "react-router-dom";
import { useRef, useState, useLayoutEffect } from "react";
function Navbar() {
  const currentStatus = useRef(false);
  const [smNavBar, setSmNavBar] = useState(currentStatus.current);
  const handleClick = (e) => {
    const { id } = e.target;
    if (id === "openBar") {
      currentStatus.current = true;
    } else {
      currentStatus.current = false;
    }
    setSmNavBar(currentStatus.current);
  };
  useLayoutEffect(() => {
    setSmNavBar(currentStatus.current);
  }, [smNavBar]);
  return (
    <>
      <nav>
        <div className="container">
          <ul className="navbar">
            <li>
              <Link className="font-garamond" to="/">
                TAIWAN TRAVEL
              </Link>
            </li>
            <li>
              <ul className="navbar-item">
                <li>
                  <Link to="/">旅遊情報</Link>
                </li>
                <li>
                  <Link to="/tour">景點查詢</Link>
                </li>
                <li>
                  <Link to="/food">美食推薦</Link>
                </li>
                <li>
                  <Link to="/room">旅宿資訊</Link>
                </li>
                <li>
                  <Link to="/">節慶活動</Link>
                </li>
              </ul>
              <button
                className="material-symbols-outlined menuBar"
                onClick={handleClick}
                id="openBar"
              >
                menu
              </button>
            </li>
          </ul>
        </div>
        <div className={!smNavBar ? `sm-navbar` : `sm-navbar show-sm-navbar`}>
          <button onClick={handleClick} id="closeBar">
            ✕
          </button>
          <div className="sm-navbar-title">
            <p className="font-garamond">TAIWAN TRAVEL</p>
          </div>
          <ul>
            <li>
              <Link to="/">旅遊情報</Link>
            </li>
            <li>
              <Link to="/tour">景點查詢</Link>
            </li>
            <li>
              <Link to="/food">美食推薦</Link>
            </li>
            <li>
              <Link to="/room">旅宿資訊</Link>
            </li>
            <li>
              <Link to="/">節慶活動</Link>
            </li>
          </ul>
          <div className="share-btn-group">
            <img
              src="https://raw.githubusercontent.com/wingfailam/taiwantravel/a129221346a00d1f241f0b9d2ea8077be1c0860c/src/assets/images/icons/facebook.svg"
              alt="facebook"
            />
            <img
              src="https://raw.githubusercontent.com/wingfailam/taiwantravel/a129221346a00d1f241f0b9d2ea8077be1c0860c/src/assets/images/icons/share.svg"
              alt="share"
            />
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
