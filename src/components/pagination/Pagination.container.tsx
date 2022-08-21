import { useState, MouseEvent, useEffect } from "react";
import PaginationPresenter from "./Pagination.presenter";

interface IPropsPagination {
  setData: any;
}

export default function PaginationPage(props: IPropsPagination) {
  const [data, setData] = useState([]);
  const [startpage, setStartpage] = useState(1);
  const [current, setCurrent] = useState(1);
  const lastpage = Math.ceil(data?.length / 10);

  const getAllData = async () => {
    try {
      const URL = "http://localhost:9000/data";
      const res = await fetch(URL);
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPage = async (page: number) => {
    const URL = `http://localhost:9000/data?_page=${page}`;
    try {
      const res = await fetch(URL);
      const data = await res.json();
      props.setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, [current]);

  const onClickPage = (event: MouseEvent<HTMLButtonElement>) => {
    const target = Number((event.target as HTMLDivElement).id);
    setCurrent(target);
    getPage(target);
  };

  const onClickPrevPage = (event: any) => {
    if (startpage === 1) return;
    setStartpage((prev) => prev - 3);
    getPage(Number((event.target as HTMLDivElement).id));
    setCurrent(startpage - 3);
  };

  const onClickNextPage = (event: any) => {
    if (!(startpage + 3 <= lastpage)) return;
    setStartpage((prev) => prev + 3);
    getPage(Number((event.target as HTMLDivElement).id));
    setCurrent(startpage + 3);
  };

  return (
    <PaginationPresenter
      onClickPage={onClickPage}
      onClickPrevPage={onClickPrevPage}
      onClickNextPage={onClickNextPage}
      startpage={startpage}
      lastpage={lastpage}
      current={current}
    />
  );
}
