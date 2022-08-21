import { MouseEvent } from "react";
import * as S from "./Pagination.styles";

interface IPropsPagination {
  onClickPage: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickPrevPage: (event: any) => void;
  onClickNextPage: (event: any) => void;
  startpage: number;
  lastpage: number;
  current: number;
}

export default function PaginationPresenter(props: IPropsPagination) {
  return (
    <S.PagesWrapper>
      <S.PrevButton
        disabled={props.startpage === 1}
        onClick={props.onClickPrevPage}
        startpage={props.startpage}
      />

      {new Array(3).fill(1).map(
        (_, index) =>
          index + props.startpage <= props.lastpage && (
            <S.Pages
              style={{
                color:
                  props.current === index + props.startpage ? "black" : "#999",
                fontWeight:
                  props.current === index + props.startpage ? 700 : 500,
              }}
              key={index + props.startpage}
              id={String(index + props.startpage)}
              onClick={props.onClickPage}
            >
              {index + props.startpage}
            </S.Pages>
          )
      )}

      <S.NextButton
        disabled={!(props.startpage + 3 <= props.lastpage)}
        onClick={props.onClickNextPage}
        startpage={props.startpage}
        lastpage={props.lastpage}
      />
    </S.PagesWrapper>
  );
}
