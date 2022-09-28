import { useState, useEffect, useCallback, useRef } from "react";
// import { Link } from "react-router-dom";
function PaginationNum({ allData,setPageData,perPageData }) {
  const perPage = perPageData?perPageData:10;
  const [page, setPage] = useState({
    totalPage: 0,
    currentPage: 1,
    hasPer: false,
    hasNext: false,
  });
  const pageNum = [];
  const currentPageData = useRef([]);
  for (let i = 1; i <= page.totalPage; i++) {
    pageNum.push(i);
  }

  useEffect(() => {
    setPage((state) => ({
      ...state,
      totalPage: Math.ceil(allData.length / perPage),
    }));
  }, [allData.length, perPage]);

  const pagination = useCallback((nowPage) => {
    setPage((state) => ({ ...state, currentPage: nowPage }));
    //每次都要清空一次
    setPageData([]);
    // 如果目前頁數>總頁數，就將目前頁數設定為總頁數
    if (page.currentPage > page.totalPage) {
      setPage((state) => ({ ...state, currentPage: page.totalPage }));
    }
    // 如果目前頁數<1，就將目前頁數設定為1
    if (page.currentPage < 1) {
      setPage((state) => ({ ...state, currentPage: 1 }));
    }
    // 如果目前頁數>1，就設定有上一頁。
    page.currentPage > 1
      ? setPage((state) => ({ ...state, hasPer: true }))
      : setPage((state) => ({ ...state, hasPer: false }));
    // 如果目前頁數<總頁數，就設定有下一頁。
    page.currentPage < page.totalPage
      ? setPage((state) => ({ ...state, hasNext: true }))
      : setPage((state) => ({ ...state, hasNext: false }));

    const minData = page.currentPage * perPage - perPage + 1;
    const maxData = page.currentPage * perPage;
    const currentPageAllData = [];
    allData.forEach((item, index) => {
      const num = index + 1;
      if (num >= minData && num <= maxData) {
        currentPageAllData.push(item)
        currentPageData.current = currentPageAllData;
      }
      setPageData(currentPageData.current)
    });
  }, [allData, page.currentPage, page.totalPage, perPage, setPageData]);

    // 監聽目前頁碼，若有變化就呼叫 pagination 並帶入現在的頁碼 ＆ 將現在頁碼的資料放入到pageData中，使畫面可以做變化
  useEffect(() => {
    pagination(page.currentPage);
    window.scrollTo(0,0)
  }, [page.currentPage, pagination]);
  return (
    <>
      <div className="container">
        <ul className="paginationNum">
          <li
            className={page.hasPer ? "" : "disabled"}
            onClick={() =>
              setPage((state) => ({
                ...state,
                currentPage: page.currentPage - 1,
              }))
            }
          >
            &#8249;
          </li>
          {pageNum.map((item) => (
            <li
              key={item}
              id={item}
              className={
                Number(page.currentPage) === Number(item)
                  ? "pagination-active"
                  : ""
              }
              onClick={(e) =>
                setPage((state) => ({
                  ...state,
                  currentPage: e.target.id,
                }))
              }
            >
              {item}
            </li>
          ))}
          <li
            className={page.hasNext ? "" : "disabled"}
            onClick={() =>
              setPage((state) => ({
                ...state,
                currentPage: page.currentPage + 1,
              }))
            }
          >
            &#8250;
          </li>
        </ul>
      </div>
    </>
  );
}
export default PaginationNum;
