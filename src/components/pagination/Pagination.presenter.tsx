import * as S from "./Pagination.styles";

export default function PaginationUI(props: any) {
  return (
    <S.PagesWrapper>
      <S.PrevButton
        disabled={props.startPage === 1}
        onClick={props.onClickPrevPage}
      />

      {new Array(3).fill(1).map(
        (_, index) =>
          index + props.startPage <= props.lastPage && (
            <S.Pages
              style={{
                color:
                  props.current === index + props.startPage ? "black" : "#666",
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
      />
    </S.PagesWrapper>
  );
}
