import React, { ChangeEvent } from "react";
import { FiExternalLink, FiSearch } from "react-icons/fi";
import * as S from "./Board.styles";
import PaginationPage from "../pagination/Pagination.container";
import FilterPage from "../filter";

interface IPropsBoardPresenter {
  data: any;
  getData: () => void;
  onChangeKeyword: (event: ChangeEvent<HTMLInputElement>) => void;
  keyword: string;
  onClickFilterIcon: () => void;
  isFilter: boolean;
  // onClickFilter: () => void;
  // isClickFilter: boolean;
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
          <S.SearchDiv>
            <S.SearchInput
              placeholder="검색"
              onChange={props.onChangeKeyword}
            />
            <FiSearch style={{ fontSize: 14 }} />
            {/* <SearchIcon src="/images/search.png" /> */}
          </S.SearchDiv>
          {props.keyword && (
            <S.Dropdown>
              <S.Keyword>111</S.Keyword>
              <S.Keyword>111</S.Keyword>
              <S.Keyword>111</S.Keyword>
              <S.Keyword>111</S.Keyword>
            </S.Dropdown>
          )}
        </S.SearchWrapper>
      </S.TopDiv>
      <S.FilterDiv>
        <S.FilterTop>
          <S.Total>
            입주민들
            <span style={{ color: "#4498F2" }}>{props.data?.length}</span>
          </S.Total>
          <S.FilterIcon
            src="/images/filter.svg"
            onClick={props.onClickFilterIcon}
          />
        </S.FilterTop>
        {props.isFilter && (
          <S.FilterWrapper>
            <span
              style={{
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "-0.05em",
                color: "#000",
                paddingRight: "24px",
              }}
            >
              보유아파트
            </span>

            <FilterPage />
          </S.FilterWrapper>
        )}

        {props.data?.map((el: any, idx: string) => (
          <S.FilterItem
            key={idx}
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
                  {el.nickname}
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

      <PaginationPage data={props.data} getData={props.getData} />
    </S.Wrapper>
  );
}
