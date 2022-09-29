import { useState, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom";
function PaginationNum({ allData, setPageData, perPageData }) {
  // page
  const perPage = perPageData ? perPageData : 10;
  const [pageNum, setPageNum] = useState([]);
  const [total, setTotal] = useState(0);
  const [hasPage, setHasPage] = useState({
    per: false,
    next: false,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTotal(Math.ceil(allData.length / perPage));
    const pageNumber = [...Array(total).keys()].map((item) => item + 1);
    setPageNum(pageNumber);
  }, [allData.length, perPage, total]);

  // changePageData
  const handleOnChange = useCallback(
    (current) => {
      const max = current * perPage;
      const min = max - perPage + 1;
      setPageData(
        allData.filter((data, index) => index + 1 >= min && index + 1 <= max)
      );
    },
    [allData, perPage, setPageData]
  );

  useEffect(() => {
    handleOnChange(currentPage);
    setHasPage((state) => ({ ...state, per: true }));
    setHasPage((state) => ({ ...state, next: true }));
    if (Number(currentPage) === 1)
      setHasPage((state) => ({ ...state, per: false }));
    if (Number(currentPage) === Number(total))
      setHasPage((state) => ({ ...state, next: false }));
  }, [currentPage, handleOnChange, total]);

  const handlePrev = () => {
    // TODO: go prev page
    const prevCurrent = currentPage - 1 < 1 ? 1 : currentPage - 1;
    setCurrentPage(prevCurrent);
  };

  const handleChangePage = (e) => {
    const { id } = e.target;
    setCurrentPage(Number(id));
  };

  const handleNext = () => {
    // TODO: go next page
    const nextCurrent = currentPage + 1 > total ? total : currentPage + 1;
    setCurrentPage(nextCurrent);
  };
  // 監聽目前頁碼，若有變化就呼叫 pagination 並帶入現在的頁碼 ＆ 將現在頁碼的資料放入到pageData中，使畫面可以做變化
  useEffect(() => {
    // pagination(page.currentPage);
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="container">
        <ul className="paginationNum">
          <li className={hasPage.per ? "" : "disabled"} onClick={handlePrev}>
            &#8249;
          </li>
          {pageNum.map((item) => (
            <li
              className={
                Number(currentPage) === Number(item) ? "pagination-active" : ""
              }
              key={item}
              id={item}
              onClick={handleChangePage}
            >
              {item}
            </li>
          ))}
          <li className={hasPage.next ? "" : "disabled"} onClick={handleNext}>
            &#8250;
          </li>
        </ul>
      </div>
    </>
  );
}
export default PaginationNum;
