import { ChangeEvent, useEffect, useState } from "react";
import BoardPresenter from "./Board.presenter";
import _ from "lodash";

export default function BoardContainer() {
  const [data, setData] = useState();
  const [keyword, setKeyword] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

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

  const getSearch = async (data: undefined | string) => {
    const URL = `http://localhost:9000/data?nickname=${data}`;
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
  }, []);

  const getDebounce = _.debounce((data) => {
    getSearch(data);
    setKeyword(data);
  }, 200);

  const onKeyUp = (event: any) => {
    if (event.keyCode === 13) {
      setIsSearch(false);
    }
  };

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
    setIsSearch(true);
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
    />
  );
}
