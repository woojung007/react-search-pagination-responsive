// export const getAllData = async () => {
//   try {
//     const URL = "http://localhost:9000/data";
//     const res = await fetch(URL);
//     const data = await res.json();
//     // setAllData(data);
//     // setTotal(data.length);
//     console.log("getAllData");
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getData = async () => {
//   const URL = "http://localhost:9000/data?_page=1";
//   try {
//     const res = await fetch(URL);
//     const data = await res.json();
//     //   setData(data);
//     getAllData();
//     //   setTotal(allData.length);
//     console.log("getData");
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getPage = async (page: number) => {
//   let URL: any;
//   if (count === 6) {
//     // return getData();
//     URL = `http://localhost:9000/data?_page=${page}`;
//   } else if (count === 5) {
//     URL = `http://localhost:9000/data?_page=${page}?building_count_gte=5`;
//   } else {
//     URL = `http://localhost:9000/data?_page=${page}?building_count=${count}`;
//   }

//   try {
//     const res = await fetch(URL);
//     const data = await res.json();
//     //   setData(data);
//     console.log("getPage!!!");
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
