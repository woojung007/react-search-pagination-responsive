import { ChangeEvent, useEffect, useState } from "react";
import BoardPresenter from "./Board.presenter";
import _ from "lodash";
import { useRecoilState } from "recoil";
import { totalState, currentPage, countState } from "../../store/recoil";

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
  // const [count, setCount] = useState(0);
  const [word, setWord] = useState();
  const [total, setTotal] = useRecoilState(totalState);
  const [current] = useRecoilState(currentPage);
  const [count, setCount] = useRecoilState(countState);

  // const URL =
  //   "https://raw.githubusercontent.com/jejodo-dev-team/open-api/main/frontend.json";

  const getAllData = async () => {
    try {
      const URL = "http://localhost:9000/data";
      const res = await fetch(URL);
      const data = await res.json();
      setAllData(data);
      setTotal(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    const URL = "http://localhost:9000/data?_page=1";
    setTotal(allData.length);
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setData(data);
      getAllData();
      setTotal(allData.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearch = async (data?: undefined | string) => {
    const URL = `http://localhost:9000/data?q=${data}`;
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setData(data);
      setTotal(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getCount = async (count: number) => {
    let URL;
    if (count === 6) {
      return getData();
    }
    if (count === 5) {
      URL = "http://localhost:9000/data?building_count_gte=5";
    } else {
      URL = `http://localhost:9000/data?building_count=${count}`;
    }

    try {
      const res = await fetch(URL);
      const data = await res.json();
      setData(data);
      setAllData(data);
      setTotal(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  // const getFilterPage = async (count: number) => {
  //   let URL: any;
  //   if (count === 6) {
  //     return getData();
  //   }
  //   if (allData?.length > 10 && count === 5) {
  //     URL = "http://localhost:9000/data?_page=1building_count_gte=5";
  //   } else {
  //     URL = `http://localhost:9000/data?_page=1?&building_count=${count}`;
  //   }

  //   try {
  //     const res = await fetch(URL);
  //     const data = await res.json();
  //     setAllData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getWord = async (word?: string) => {
    const URL = `http://localhost:9000/search?q=${word}`;
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setWord(data.sort((a: word, b: word) => b.count - a.count));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getAllData();
  }, []);

  useEffect(() => {
    getPage(current);
  }, [current]);

  const getPage = async (page: number) => {
    let URL;
    if (count === 6) {
      URL = `http://localhost:9000/data?_page=${page}`;
    }
    if (allData?.length > 10 && count === 5) {
      URL = `http://localhost:9000/data?_page=${page}?building_count_gte=5`;
    } else {
      URL = `http://localhost:9000/data?_page=${page}?building_count=${count}`;
      // URL = `http://localhost:9000/data?_page=${page}`;
    }

    try {
      const res = await fetch(URL);
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDebounce = _.debounce((data) => {
    getSearch(data);
    getWord(data);
  }, 200);

  const onKeyUp = (event: any) => {
    if (event.keyCode === 13) {
      setIsSearch(false);
    }
  };

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
    setKeyword(event.currentTarget.value);
    setIsSearch(true);
  };

  const onClickWord = (event: any) => {
    getSearch(event.target.id);
    setKeyword(event.target.id);
    setIsSearch(false);
  };

  const onClickFilterIcon = () => {
    setIsFilter((prev) => !prev);
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
      getCount={getCount}
      setCount={setCount}
      count={count}
      word={word}
      onClickWord={onClickWord}
      setData={setData}
      getAllData={getAllData}
      getPage={getPage}
      total={total}
    />
  );
}
