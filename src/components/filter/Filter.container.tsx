import { MouseEvent, useState } from "react";
import FilterPresenter from "./Filter.presenter";

interface IPropsFilterContainer {
  data?: any;
  getCount: (count?: number) => void;
  setCount: any;
  count?: number;
}

export default function FilterContainer(props: IPropsFilterContainer) {
  const [filterId, setFilterId] = useState("");

  const onClickFilter = (event: MouseEvent<HTMLDivElement>) => {
    setFilterId((event.target as HTMLDivElement).id);
    props.getCount(Number((event.target as HTMLDivElement).id));
  };

  return <FilterPresenter onClickFilter={onClickFilter} filterId={filterId} />;
}
