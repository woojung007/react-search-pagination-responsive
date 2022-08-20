import { MouseEvent } from "react";
import * as S from "./Pagination.styles";

interface IPropsPagination {
  onClickPage: (vent: MouseEvent<HTMLButtonElement>) => void;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
  startPage: number;
  lastPage: number;
  current: number;
}

export default function PaginationPresenter(props: IPropsPagination) {
  return (
    <S.PagesWrapper>
      <S.PrevButton
        disabled={props.startPage === 1}
        onClick={props.onClickPrevPage}
        startPage={props.startPage}
      />

      {new Array(3).fill(1).map(
        (_, index) =>
          index + props.startPage <= props.lastPage && (
            <S.Pages
              style={{
                color:
                  props.current === index + props.startPage ? "black" : "#999",
                fontWeight:
                  props.current === index + props.startPage ? 700 : 500,
              }}
              key={index + props.startPage}
              id={String(index + props.startPage)}
              onClick={props.onClickPage}
            >
              {index + props.startPage}
            </S.Pages>
          )
      )}
      <S.NextButton
        disabled={!(props.startPage + 3 <= props.lastPage)}
        onClick={props.onClickNextPage}
        startPage={props.startPage}
        lastPage={props.lastPage}
      />
    </S.PagesWrapper>
  );
}
