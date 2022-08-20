import { MouseEvent, useState } from "react";
import FilterPresenter from "./Filter.presenter";

interface IPropsFilterContainer {
  data?: any;
  getCount: (count?: number) => void;
  setCount: any;
  count?: number;
}

export default function FilterContainer(props: IPropsFilterContainer) {
  const [isClickFilter, setIsClickFilter] = useState(false);
  const [filterId, setFilterId] = useState("0");

  const onClickFilter = (event: MouseEvent<HTMLDivElement>) => {
    setIsClickFilter((prev) => !prev);
    setFilterId((event.target as HTMLDivElement).id);

    props.setCount(Number(filterId));
    props.getCount(props.count);

    console.log(
      "filterId",
      filterId,
      "event.target.id",
      (event.target as HTMLDivElement).id,
      "count",
      props.count
    );
  };

  return <FilterPresenter onClickFilter={onClickFilter} filterId={filterId} />;
}
