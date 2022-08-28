import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
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
  const [word, setWord] = useState();
  const [total, setTotal] = useRecoilState(totalState);
  const [current] = useRecoilState(currentPage);
  const [count, setCount] = useRecoilState(countState);
  let id: number;
  const inputRef = useRef<any>(null);

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
    const URL = `http://localhost:9000/search?_sort=count&_order=desc&q=${word}`;
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setWord(data);
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

  const updateData = async (keyword: string) => {
    try {
      const getRes = await axios.get("http://localhost:9000/search");
      const data = getRes.data.filter((el: any) => el.word === keyword);

      if (data.length === 0) {
        await axios.post(`http://localhost:9000/search`, {
          id,
          word: keyword,
          count: 1,
        });
      } else {
        await axios.put(`http://localhost:9000/search/${data[0].id}`, {
          word: keyword,
          count: data[0].count + 1,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickWord = (event: any) => {
    setKeyword(event.target.id);
    updateData(event.target.id);
    getSearchData(event.target.id);
    setIsSearch(false);
  };

  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateData(keyword);
    }
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
      updateData={updateData}
      inputRef={inputRef}
    />
  );
}
