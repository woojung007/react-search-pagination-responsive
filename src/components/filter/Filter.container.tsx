import { MouseEvent } from "react";
import FilterPresenter from "./Filter.presenter";
import { useRecoilState } from "recoil";
import { countState, currentPage } from "../../store/recoil";

interface IPropsFilterContainer {
  getFilterData: (filterCount: number) => void;
  getPage: any;
}

export default function FilterContainer(props: IPropsFilterContainer) {
  const [count, setCount] = useRecoilState(countState);
  const [, setCurrent] = useRecoilState(currentPage);

  const onClickFilter = (event: MouseEvent<HTMLDivElement>) => {
    const target = Number((event.target as HTMLDivElement).id);
    setCount(target);
    props.getFilterData(target);
    setCurrent(1);
  };

  return <FilterPresenter count={count} onClickFilter={onClickFilter} />;
}
