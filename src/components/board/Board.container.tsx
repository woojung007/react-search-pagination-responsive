import { ChangeEvent, useEffect, useState } from "react";
import BoardPresenter from "./Board.presenter";
import _ from "lodash";
import { useRecoilState } from "recoil";
import { allDataState, dataState } from "../../store/recoil";
import {
  totalState,
  currentPage,
  countState,
  filterIdState,
} from "../../store/recoil";

interface word {
  word: string;
  count: number;
}

export default function BoardContainer() {
  // const [data, setData] = useState([]);
  // const [allData, setAllData] = useState([]);
  const [data, setData] = useRecoilState(dataState);
  const [allData, setAllData] = useRecoilState(allDataState);
  const [keyword, setKeyword] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  // const [count, setCount] = useState(0);
  const [word, setWord] = useState();
  const [total, setTotal] = useRecoilState(totalState);
  const [current] = useRecoilState(currentPage);
  const [count, setCount] = useRecoilState(countState);
  // const [filterId, setFilterId] = useRecoilState(filterIdState);

  // const URL =
  //   "https://raw.githubusercontent.com/jejodo-dev-team/open-api/main/frontend.json";

  // @ 1. total이 안나옴 (allData로 set해주고 total을 set 해줘야 함) => 함수 호출이 너무 많이 됌
  // 2. 5개 이상 필터를 눌렀을 때 한페이지에 모든 데이터가(14개) 나옴
  // => 2페이지 내용에 전체 2페이지가 나옴
  // => 검색하고나서도 모든 데이터가 한페이지에 나옴

  // @ 3. 전체에서 페이지네이션 작동이 이상함 /// 어떤 페이지든 두 번 클릭하면 데이터가 변경됌
  // @ 4. 필터 켰을 때 전체에 isActive 되어있게 설정하기
  // @ 5. 전체 "필터" 눌렀을 때 2페이지가 안불러와짐

  // 페이지네이션 ? 전체페이지 & 필터된 페이지
  // 전체페이지 ? => current === 6 이거나 isFilter가 일어나지 않을 때

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
    // const URL = "http://localhost:9000/data?_page=1";
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
      // return getData();
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
    // getFilterData(count);
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
    // const URL = `${URL}/data?q=${data}`;
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
    // const URL = `http://localhost:9000/search?q=${word}`;
    try {
      const res = await fetch(`${URL}/search?_sort=count&q=${word}`);
      const data = await res.json();
      setWord(data.sort((a: word, b: word) => b.count - a.count));
      // setWord(data);
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
    // getSearchData(event.target.value);
    setIsSearch(true);
  };

  // 1. 엔터쳤을 때 키워드를 추가
  // 2. 원래 있던 키워드라면 count up!
  // axios({
  //   url: 'http://localhost:4000/posts',
  //   method: 'POST',
  //   data: form,
  // }).then(({ data }) => setPosts((prev) => [...prev, data]));

  const onKeyUp = async (event: any) => {
    if (event.keyCode === 13) {
      getWord(event.target.value);
      setIsSearch((prev) => !prev);
    }

    const data = { word: keyword, count: 1 };
    try {
      const response = await fetch("http://localhost:9000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log("response", response);
      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickWord = (event: any) => {
    getSearchData(event.target.id);
    setKeyword(event.target.id);
    getWord(event.target.value);
    setIsSearch(false);
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
    />
  );
}
