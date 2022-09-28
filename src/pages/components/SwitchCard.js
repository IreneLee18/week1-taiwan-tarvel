// import {useState,useRef,useEffect,useCallback}from 'react'
// function SwitchCard(allData){
//   const perCard=5
//   const [card,setCard]=useState({
//     totalCard:0,
//     currentCard:1,
//     hasPer:false,
//     hasNext:false
//   })
//   const [cardData,setCardData]=useState([])
//   const currentCardData = useRef([])
//   useEffect(() => {
//     setCard((state) => ({
//       ...state,
//       totalPage: Math.ceil(allData.length / perCard),
//     }));
//     console.log(cardData)
//   }, [allData.length]);
//   // const pagination = useCallback((nowPage) => {
//   //   setCard((state) => ({ ...state, currentCard: nowPage }));
//   //   //每次都要清空一次
//   //   setCardData([]);
//   //   // 如果目前頁數>總頁數，就將目前頁數設定為總頁數
//   //   if (card.currentCard > card.totalCard) {
//   //     setCard((state) => ({ ...state, currentCard: card.totalCard }));
//   //   }
//   //   // 如果目前頁數<1，就將目前頁數設定為1
//   //   if (card.currentCard < 1) {
//   //     setCard((state) => ({ ...state, currentCard: 1 }));
//   //   }
//   //   // 如果目前頁數>1，就設定有上一頁。
//   //   card.currentCard > 1
//   //     ? setCard((state) => ({ ...state, hasPer: true }))
//   //     : setCard((state) => ({ ...state, hasPer: false }));
//   //   // 如果目前頁數<總頁數，就設定有下一頁。
//   //   card.currentCard < card.totalCard
//   //     ? setCard((state) => ({ ...state, hasNext: true }))
//   //     : setCard((state) => ({ ...state, hasNext: false }));

//   //   const minData = card.currentCard * perCard - perCard + 1;
//   //   const maxData = card.currentCard * perCard;
//   //   const currentCardAllData = [];
//   //   allData.forEach((item, index) => {
//   //     const num = index + 1;
//   //     if (num >= minData && num <= maxData) {
//   //       currentCardAllData.push(item)
//   //       currentCardData.current = currentCardAllData;
//   //     }
//   //     setCardData(currentCardData.current)
//   //   });
//   // }, [allData, card.currentCard, card.totalCard, setCardData]);

//   //   // 監聽目前頁碼，若有變化就呼叫 pagination 並帶入現在的頁碼 ＆ 將現在頁碼的資料放入到pageData中，使畫面可以做變化
//   // useEffect(() => {
//   //   pagination(card.currentCard);
//   //   window.scrollTo(0,0)
//   // }, [card.currentCard, pagination]);
// }
// export default SwitchCard