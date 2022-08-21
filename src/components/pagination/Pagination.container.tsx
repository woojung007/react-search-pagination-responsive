import { useState, MouseEvent } from "react";
import PaginationPresenter from "./Pagination.presenter";
import { totalState, currentPage, countState } from "../../store/recoil";
import { useRecoilState } from "recoil";

interface IPropsPagination {
  setData: any;
  data?: any;
  allData?: any;
  getAllData: () => void;
  getPage: (page: number) => void;
}

export default function PaginationPage(props: IPropsPagination) {
  const [total] = useRecoilState(totalState);
  const [current, setCurrent] = useRecoilState(currentPage);
  const [startpage, setStartpage] = useState(1);
  // const [current, setCurrent] = useState(1);
  const lastpage = Math.ceil(total / 10);

  // URL = "http://localhost:9000/data?&building_count_gte=5";

  const onClickPage = (event: MouseEvent<HTMLButtonElement>) => {
    const target = Number((event.target as HTMLDivElement).id);
    setCurrent(target);
    props.getPage(current);
  };

  const onClickPrevPage = (event: any) => {
    if (startpage === 1) return;
    setStartpage((prev) => prev - 3);
    props.getPage(Number((event.target as HTMLDivElement).id));
    setCurrent(startpage - 3);
  };

  const onClickNextPage = (event: any) => {
    if (!(startpage + 3 <= lastpage)) return;
    setStartpage((prev) => prev + 3);
    props.getPage(Number((event.target as HTMLDivElement).id));
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
