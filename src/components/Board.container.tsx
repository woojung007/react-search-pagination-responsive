import { useEffect, useState } from "react";
import BoardPresenter from "./Board.presenter";
export default function BoardContainer() {
  const [data, setData] = useState();

  // const URL =
  //   "https://raw.githubusercontent.com/jejodo-dev-team/open-api/main/frontend.json";
  const URL = "http://localhost:9000/data";

  useEffect(() => {
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
    getData();
  }, []);

  console.log(data);

  return <BoardPresenter data={data} />;
}
