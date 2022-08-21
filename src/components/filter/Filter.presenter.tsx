import { Fragment, MouseEvent } from "react";
import * as S from "./Filter.styles";

interface IPropsFilterPresenter {
  onClickFilter: (event: MouseEvent<HTMLDivElement>) => void;
  filterId: string;
}

export default function FilterPresenter(props: IPropsFilterPresenter) {
  const FILTER = ["1개", "2개", "3개", "4개", "5개 이상", "전체"];

  return (
    <S.FilterWrapper>
      <S.Title>보유 아파트</S.Title>
      <S.Filters>
        {FILTER.map((el, idx) => (
          <Fragment key={idx}>
            <S.Filter
              onClick={props.onClickFilter}
              isActive={props.filterId === String(idx + 1)}
              id={String(idx + 1)}
            >
              {el}
            </S.Filter>
          </Fragment>
        ))}
      </S.Filters>
    </S.FilterWrapper>
  );
}
