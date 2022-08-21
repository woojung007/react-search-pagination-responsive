import { ChangeEvent, useEffect, useState } from "react";
import BoardPresenter from "./Board.presenter";
import _ from "lodash";

interface word {
  word: string;
  count: number;
}

export default function BoardContainer() {
  const [data, setData] = useState();
  const [keyword, setKeyword] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [count, setCount] = useState(0);
  const [word, setWord] = useState();

  // const URL =
  //   "https://raw.githubusercontent.com/jejodo-dev-team/open-api/main/frontend.json";

  const getData = async () => {
    const URL = `http://localhost:9000/data`;
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setData(data);
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
    } catch (error) {
      console.log(error);
    }
  };

  const getCount = async (count?: number) => {
    let URL;
    if (count === 6) {
      return getData();
    }
    if (count === 5) {
      URL = "http://localhost:9000/data?&building_count_gte=5";
    } else {
      URL = `http://localhost:9000/data?building_count=${count}`;
    }

    try {
      const res = await fetch(URL);
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

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
  }, []);

  const getDebounce = _.debounce((data) => {
    getSearch(data);
    // setKeyword(data);
    getWord(data);
  }, 200);

  const onKeyUp = (event: any) => {
    if (event.keyCode === 13) {
      setIsSearch(false);
      // getSearch(event.target.value);
    }
  };

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
    setKeyword(event.currentTarget.value);
    setIsSearch(true);
    // getWord(event.target.value);
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
    />
  );
}
