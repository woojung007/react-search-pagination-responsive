import { ChangeEvent, useEffect, useState } from "react";
import BoardPresenter from "./Board.presenter";
export default function BoardContainer() {
  const [data, setData] = useState();
  const [keyword, setKeyword] = useState("");
  const [isFilter, setIsFilter] = useState(false);

  // const URL =
  //   "https://raw.githubusercontent.com/jejodo-dev-team/open-api/main/frontend.json";
  const URL = "http://localhost:9000/data";
  const getData = async () => {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      // const response = data.splice(0, data.length);
      // console.log("data", data);
      setData(data);
      // console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
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
    />
  );
}
