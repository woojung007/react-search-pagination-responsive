import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import BoardPresenter from "./Board.presenter";
import _ from "lodash";
import { useRecoilState } from "recoil";
import { totalState, currentPage, countState } from "../../store/recoil";
import axios from "axios";

interface word {
  word: string;
  count: number;
}

export default function BoardContainer() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  // const [id, setId] = useState();
  const [word, setWord] = useState();
  const [total, setTotal] = useRecoilState(totalState);
  const [current] = useRecoilState(currentPage);
  const [count, setCount] = useRecoilState(countState);
  let id: number;

  // const URL =
  //   "https://raw.githubusercontent.com/jejodo-dev-team/open-api/main/frontend.json";

  const URL = "http://localhost:9000";

  const getAllData = async () => {
    try {
      const res = await fetch(`${URL}/data`);
      const data = await res.json();
      setAllData(data);
      setTotal(data.length);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const res = await fetch(`${URL}/data?_page=1`);
      const data = await res.json();
      getAllData();
      setData(data);
      setTotal(allData.length);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPage = async (page: number) => {
    let URL: any;
    if (count === 6) {
      URL = `http://localhost:9000/data?_page=${page}`;
    } else if (count === 5) {
      URL = `http://localhost:9000/data?_page=${page}?building_count_gte=5`;
    } else {
      URL = `http://localhost:9000/data?_page=${page}?building_count=${count}`;
    }

    try {
      const res = await fetch(URL);
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getAllData();
    getPage(current);
  }, [current]);

  const getFilterData = async (filterCount: number) => {
    let URL;
    if (filterCount === 6) {
      return getData();
    }
    if (filterCount === 5) {
      URL = `http://localhost:9000/data?&building_count_gte=5`;
      // URL = `http://localhost:9000/data?_page=${page}&_limit=10&building_count_gte=5`;
    } else {
      URL = `http://localhost:9000/data?building_count=${filterCount}`;
    }
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setData(data);
      setTotal(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchData = async (keyword?: undefined | string) => {
    try {
      const res = await fetch(`${URL}/data?q=${keyword}`);
      const data = await res.json();
      setData(data);
      setTotal(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getWord = async (word?: string) => {
    const URL = `http://localhost:9000/search?_sort=count&q=${word}`;
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setWord(data.sort((a: word, b: word) => b.count - a.count));
    } catch (error) {
      console.log(error);
    }
  };

  const getDebounce = _.debounce((data) => {
    getSearchData(data);
    getWord(data);
  }, 200);

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    if (keyword === "") {
      setCount(6);
    }
    getDebounce(event.target.value);
    setKeyword(event.target.value);
    setIsSearch(true);
  };

  const postData = async (event: any) => {
    event.preventDefault();
    // setId((prev: any) => prev + 1);
    try {
      const res = await axios.post("http://localhost:9000/search", {
        id: id,
        word: keyword,
        count: 1,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      // const keywordData = {
      //   id: id,
      //   word: keyword,
      //   count: 1,
      // };
      // const postData = async () => {
      //   const URL = "http://localhost:9000/search";
      //   try {
      //     const response = await fetch(URL, {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json; charset=UTF-8" },
      //       body: JSON.stringify(keywordData),
      //     });
      //     await response.json();
      //     getWord((event.target as HTMLInputElement).value);
      //     setIsSearch((prev) => !prev);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };
      // postData();
    }
  };

  const onClickWord = (event: any) => {
    getSearchData(event.target.id);
    setKeyword(event.target.id);
    getWord(event.target.id);
    setIsSearch(false);
    // setKeywordCount((prev: any) => prev + 1);

    // const putData = async (id: any) => {
    //   const updateData = {
    //     id: id,
    //     word: event.target.id,
    //     count: keywordCount,
    //   };
    //   try {
    //     const response = await fetch(`http://localhost:9000/search?id=${id}`, {
    //       method: "PUT",
    //       body: JSON.stringify(updateData),
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //     });
    //     await response.json();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // putData(event.target.tabIndex);
  };

  const onClickFilterIcon = () => {
    setIsFilter((prev) => !prev);
    getData();
  };

  return (
    <BoardPresenter
      data={data}
      allData={allData}
      setAllData={setAllData}
      getData={getData}
      onChangeKeyword={onChangeKeyword}
      keyword={keyword}
      onClickFilterIcon={onClickFilterIcon}
      isFilter={isFilter}
      onKeyUp={onKeyUp}
      isSearch={isSearch}
      getFilterData={getFilterData}
      word={word}
      onClickWord={onClickWord}
      setData={setData}
      getAllData={getAllData}
      getPage={getPage}
      total={total}
      postData={postData}
    />
  );
}
