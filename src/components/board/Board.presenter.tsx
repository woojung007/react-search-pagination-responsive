import React, { ChangeEvent, KeyboardEvent } from "react";
import { FiSearch } from "react-icons/fi";
import * as S from "./Board.styles";
import PaginationPage from "../pagination/Pagination.container";
import FilterPage from "../filter/Filter.container";
import { v4 as uuidv4 } from "uuid";

interface IPropsBoardPresenter {
  data?: any;
  allData?: any;
  setAllData: any;
  getData: () => void;
  onChangeKeyword: (event: ChangeEvent<HTMLInputElement>) => void;
  keyword: string;
  onClickFilterIcon: () => void;
  isFilter: boolean;
  onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => void;
  isSearch: boolean;
  getFilterData: (filterCount: number) => void;
  word?: [
    {
      word: string;
      count: number;
      id: string;
    }
  ];
  onClickWord: (event: any) => void;
  setData: any;
  getAllData: () => void;
  getPage: (page: number) => void;
  total: number;
  updateData: any;
  inputRef: any;
}

export default function BoardPresenter(props: IPropsBoardPresenter) {
  return (
    <S.Wrapper>
      <S.Banner>
        <S.Characters src="/images/banner_char.png" />
      </S.Banner>

      <S.TopDiv>
        <S.H1>화섬 아파트 지구家 입주민들</S.H1>
        <S.Content>
          화섬 아파트에 입주한 입주민들입니다. <br />
          같이 화성에 가는날을 기다리며 화목하게 지내봐요!{" "}
        </S.Content>
        <S.SearchWrapper>
          <S.SearchForm
          // onSubmit={props.onClickSearch}
          // method="POST"
          // autoComplete="off"
          >
            <S.SearchInput
              placeholder="검색"
              type="text"
              onChange={props.onChangeKeyword}
              onKeyUp={props.onKeyUp}
              value={props.keyword || ""}
              ref={props.inputRef}
            />
            <S.SearchBtn
              type="button"
              // FiSearch
              // style={{ fontSize: 14, cursor: "pointer" }}
            >
              Search
            </S.SearchBtn>
          </S.SearchForm>
          {props.isSearch && props.keyword && (
            <S.Dropdown>
              {props.word?.map((el, idx) => (
                <div key={uuidv4()}>
                  <S.Word
                    onClick={props.onClickWord}
                    id={el.word}
                    tabIndex={idx + 1}
                  >
                    {el.word}
                  </S.Word>
                </div>
              ))}
            </S.Dropdown>
          )}
        </S.SearchWrapper>
      </S.TopDiv>
      <S.FilterDiv>
        <S.FilterTop>
          <S.Total>
            입주민들
            <span style={{ color: "#4498F2" }}>{props.total}</span>
          </S.Total>
          <S.FilterIcon
            src={
              props.isFilter ? "images/filter-active.png" : "/images/filter.svg"
            }
            onClick={props.onClickFilterIcon}
          />
        </S.FilterTop>
        {props.isFilter && (
          <FilterPage
            getFilterData={props.getFilterData}
            getPage={props.getPage}
          />
        )}

        {props.data?.map((el: any) => (
          <S.FilterItem
            key={uuidv4()}
            style={{ height: el.nickname.length >= 8 ? "118px" : "94px" }}
          >
            <S.Profile src="/images/profile.png" />
            <S.ProfileContent>
              <S.ContentTop>
                <span
                  style={{
                    paddingRight: el.nickname.length >= 8 ? 0 : "12px",
                    display: el.nickname.length >= 8 ? "block" : "inline",
                  }}
                >
                  {el.nickname
                    .replaceAll(props.keyword, `#$%${props.keyword}#$%`)
                    .split("#$%")
                    .map((search: string) => (
                      <S.Keyword
                        key={uuidv4()}
                        isMatched={props.keyword === search}
                      >
                        {search}
                      </S.Keyword>
                    ))}
                </span>

                <S.BuildingCount>
                  지구家 아파트 {el.building_count}개
                </S.BuildingCount>
              </S.ContentTop>
              <S.ContentBottom>
                <S.CircleWrapper style={{ marginRight: 12 }}>
                  <S.Circle style={{ background: "#FFDC3C" }}>제</S.Circle>
                  <span>{el.nickname}</span>
                </S.CircleWrapper>

                <S.CircleWrapper>
                  <S.Circle style={{ background: "#4498F2" }}>오</S.Circle>
                  <span>{el.oname}</span>
                </S.CircleWrapper>
              </S.ContentBottom>
            </S.ProfileContent>
          </S.FilterItem>
        ))}
      </S.FilterDiv>

      <PaginationPage
        setData={props.setData}
        data={props.data}
        allData={props.allData}
        getAllData={props.getAllData}
        getPage={props.getPage}
        getFilterData={props.getFilterData}
      />
    </S.Wrapper>
  );
}
