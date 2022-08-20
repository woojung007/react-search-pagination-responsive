import { MouseEvent } from "react";
import * as S from "./Filter.styles";

interface IPropsFilterPresenter {
  onClickFilter: (event: MouseEvent<HTMLDivElement>) => void;
  filterId: string;
}

export default function FilterPresenter(props: IPropsFilterPresenter) {
  const FILTER = ["전체", "5개 이상", "4개", "3개", "2개", "1개"];

  return (
    <S.FilterWrapper>
      <S.Title>보유 아파트</S.Title>
      <S.Filters>
        {FILTER.map((el, idx) => (
          <S.Filter
            key={idx}
            onClick={props.onClickFilter}
            isClickFilter={props.filterId === String(idx)}
            id={String(idx)}
          >
            {el}
          </S.Filter>
        ))}
      </S.Filters>
    </S.FilterWrapper>
  );
}
