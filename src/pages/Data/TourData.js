export const categoryData = [
  { id: "all", value: "全部", checked: false },
  { id: "natural-scenery", value: "自然風景", checked: false },
  { id: "history", value: "歷史文化", checked: false },
  { id: "sightseeing", value: "觀光遊憩", checked: false },
  { id: "religion", value: "宗教巡禮", checked: false },
  { id: "night-market", value: "夜市商圈", checked: false },
  { id: "literary", value: "文藝之旅", checked: false },
];

export const getAllAPI = () => {
  const api =
    "https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?%24select=ScenicSpotID%2C%20ScenicSpotName%2C%20Description%2C%20OpenTime%2C%20Address%2C%20Picture&%24top=30&%24format=JSON";
  fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
