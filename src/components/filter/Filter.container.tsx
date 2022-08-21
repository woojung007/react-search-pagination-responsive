import { MouseEvent, useState } from "react";
import FilterPresenter from "./Filter.presenter";
import { useRecoilState } from "recoil";
import { countState, currentPage } from "../../store/recoil";

interface IPropsFilterContainer {
  data?: any;
  getCount: (count: number) => void;
  setCount: any;
  count?: number;
  allData: any;
}

export default function FilterContainer(props: IPropsFilterContainer) {
  const [filterId, setFilterId] = useState("");
  const [, setCount] = useRecoilState(countState);
  const [, setCurrent] = useRecoilState(currentPage);

  const onClickFilter = (event: MouseEvent<HTMLDivElement>) => {
    const target = (event.target as HTMLDivElement).id;
    setFilterId(target);
    props.getCount(Number(target));
    setCount(Number(target));
    setCurrent(1);
  };

  return <FilterPresenter onClickFilter={onClickFilter} filterId={filterId} />;
}
