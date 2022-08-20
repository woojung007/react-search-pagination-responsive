import styled from "@emotion/styled";

export const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.div`
  width: 15%;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.05em;
  color: #000;
  padding-right: 24px;
  word-break: keep-all;

  @media (min-width: 360px) and (max-width: 1023px) {
    width: 20%;
  }
`;

export const Filters = styled.div`
  width: 100%;
  display: flex;

  @media (min-width: 360px) and (max-width: 1023px) {
    width: 70%;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
`;

interface IPropsBoardStyle {
  isClickFilter: boolean;
}

export const Filter = styled.div`
  box-sizing: border-box;
  height: 28px;
  line-height: 20px;
  border-radius: 20px;
  text-align: center;
  font-size: 14px;
  margin-right: 24px;
  padding: 4px 12px;

  font-weight: ${(props: IPropsBoardStyle) =>
    props.isClickFilter ? 700 : 500};

  background-color: ${(props: IPropsBoardStyle) =>
    props.isClickFilter ? "black" : "#fff"};

  color: ${(props: IPropsBoardStyle) =>
    props.isClickFilter ? "#fff" : "#999"};

  cursor: pointer;
  :hover {
    color: ${(props: IPropsBoardStyle) =>
      props.isClickFilter ? "#fff" : "black"};
  }

  @media (min-width: 360px) and (max-width: 1023px) {
    margin-right: 12px;
  }
`;
