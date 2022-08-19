import React from "react";
import { FiSearch } from "react-icons/fi";
import * as S from "./Board.styles";

export default function BoardPresenter() {
  return (
    <S.Wrapper>
      <S.Banner>
        <S.Characters></S.Characters>
      </S.Banner>

      <S.TopDiv>
        <S.H1>화섬 아파트 지구家 입주민들</S.H1>
        <S.Content>
          화섬 아파트에 입주한 입주민들입니다. <br />
          같이 화성에 가는날을 기다리며 화목하게 지내봐요!{" "}
        </S.Content>
        <S.SearchDiv>
          <S.SearchInput placeholder="검색" />
          <FiSearch style={{ fontSize: 14 }} />
          {/* <SearchIcon src="/images/search.png" /> */}
        </S.SearchDiv>
      </S.TopDiv>
      <S.FilterDiv>
        <S.FilterTop>
          <S.Total>
            입주민들
            <span style={{ color: "#4498F2" }}>472</span>
          </S.Total>
          <S.FilterIcon src="/images/filter.svg" />
        </S.FilterTop>
        <S.FilterItem>
          <S.Profile src="/images/profile.png" />
          <S.ProfileContent>
            <S.ContentTop>
              차차{" "}
              <span
                style={{
                  color: "#4498F2",
                  fontSize: "14px",
                  lineHeight: "20px",
                  paddingLeft: "12px",
                }}
              >
                지구家 아파트 15개{" "}
              </span>
            </S.ContentTop>
            <S.ContentBottom>
              <S.CircleWrapper style={{ marginRight: 12 }}>
                <S.Circle style={{ background: "#FFDC3C" }}>제</S.Circle>
                <span>hhh</span>
              </S.CircleWrapper>

              <S.CircleWrapper>
                <S.Circle style={{ background: "#4498F2" }}>오</S.Circle>
                <span>hhh</span>
              </S.CircleWrapper>
            </S.ContentBottom>
          </S.ProfileContent>
        </S.FilterItem>
      </S.FilterDiv>
    </S.Wrapper>
  );
}
