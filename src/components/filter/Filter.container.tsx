import { MouseEvent } from "react";
import FilterPresenter from "./Filter.presenter";
import { useRecoilState } from "recoil";
import { countState, currentPage, filterIdState } from "../../store/recoil";

interface IPropsFilterContainer {
  data?: any;
  getFilterData: (filterCount: number) => void;
  allData: any;
  getPage: any;
}

export default function FilterContainer(props: IPropsFilterContainer) {
  // const [filterId, setFilterId] = useRecoilState(filterIdState);
  const [count, setCount] = useRecoilState(countState);
  const [current, setCurrent] = useRecoilState(currentPage);

  const onClickFilter = (event: MouseEvent<HTMLDivElement>) => {
    const target = Number((event.target as HTMLDivElement).id);
    // setFilterId(target);
    setCount(target);
    props.getFilterData(target);
    setCurrent(1);
  };

  return <FilterPresenter count={count} onClickFilter={onClickFilter} />;
}
