import { ChangeEvent, useEffect, useRef, useState } from "react";
import BoardPresenter from "./Board.presenter";
import _, { rest } from "lodash";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { totalState, currentPage, countState } from "../../store/recoil";

interface word {
  word: string;
  count: number;
}

export default function BoardContainer() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  // const [data, setData] = useRecoilState(dataState);
  // const [allData, setAllData] = useRecoilState(allDataState);
  const [keyword, setKeyword] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [keywordCount, setKeywordCount] = useState(1);
  // const [id, setId] = useState(1);
  const [word, setWord] = useState();
  const [total, setTotal] = useRecoilState(totalState);
  const [current] = useRecoilState(currentPage);
  const [count, setCount] = useRecoilState(countState);

  // const [filterId, setFilterId] = useRecoilState(filterIdState);

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
    const URL = `http://localhost:9000/search?_sort=count&q=${word}`;
    try {
      const res = await fetch(URL);
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

  const keywordData = { id: uuidv4(), word: keyword, count: 1 };

  const onKeyUp = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const postData = async () => {
        const URL = "http://localhost:9000/search";
        try {
          const response = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify(keywordData),
          });
          await response.json();
        } catch (error) {
          console.log(error);
        }
      };

      postData();
      getWord(event.target.value);
      setIsSearch((prev) => !prev);
    }
  };

  const onClickWord = (event: any) => {
    getSearchData(event.target.id);
    setKeyword(event.target.id);
    getWord(event.target.id);
    setIsSearch(false);
    setKeywordCount((prev) => prev + 1);

    if (word) {
      const putData = async () => {
        try {
          const res = await fetch(
            `http://localhost:9000/search?word=${keyword}`,
            {
              method: "PUT",
              body: JSON.stringify({
                id: uuidv4(),
                word: keyword,
                count: keywordCount,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          await res.json();
        } catch (error) {
          console.log(error);
        }
      };

      putData();
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
    />
  );
}
