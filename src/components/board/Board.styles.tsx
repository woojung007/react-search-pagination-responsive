import styled from "@emotion/styled";

export const Wrapper = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Banner = styled.div`
  width: 100vw;
  height: 300px;
  background: url("/images/banner_pattern.png") no-repeat center center;
  background-size: cover;
  position: fixed;
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  @media (min-width: 360px) and (max-width: 1023px) {
    width: 100vw;
    height: 240px;
  }
`;

export const Characters = styled.img`
  width: 560px;
  height: 300px;

  @media (min-width: 360px) and (max-width: 1023px) {
    width: 360px;
    height: 193px;
  }
`;

export const TopDiv = styled.div`
  padding-top: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 360px) and (max-width: 1023px) {
    padding-top: 288px;
  }
`;

export const H1 = styled.h1`
  font-weight: 700;
  font-size: 40px;
  line-height: 56px;
  text-align: center;
  letter-spacing: -0.05em;

  @media (min-width: 360px) and (max-width: 1023px) {
    font-size: 28px;
    line-height: 36px;
  }
`;

export const Content = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.05em;
  padding: 20px 0 48px 0;
`;

export const SearchWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (min-width: 360px) and (max-width: 1023px) {
    width: 320px;
  }
`;

export const SearchDiv = styled.div`
  width: 100%;
  height: 32px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 20px;
  padding: 0 12px 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 56px;
  z-index: 10;
  box-sizing: border-box;
`;

export const SearchInput = styled.input`
  width: 90%;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.05em;
  border: none;
  outline: none;
`;

export const Dropdown = styled.div`
  width: 100%;
  height: auto;
  max-height: 172px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.05em;
  color: #000;
  background: #fff;
  border: 1px solid #000;
  border-radius: 0px 0px 15px 15px;
  padding: 16px 4px;
  position: absolute;
  top: 16px;
  box-sizing: border-box;
`;

export const Word = styled.div`
  padding: 8px 24px;
  background-color: #fff;
  cursor: pointer;
  :hover {
    background-color: #eee;
  }
`;

interface IPropsKeyword {
  isMatched: boolean;
}

export const Keyword = styled.span`
  width: 100%;
  background-color: ${(props: IPropsKeyword) =>
    props.isMatched ? "rgb(68, 152, 242, 0.5)" : "none"};
`;

export const FilterDiv = styled.div`
  width: 560px;
  display: flex;
  flex-direction: column;

  @media (min-width: 360px) and (max-width: 1023px) {
    width: 320px;
  }
`;

export const FilterTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
  margin-bottom: 24px;
`;

export const Total = styled.div`
  width: 110px;
  height: 32px;
  background-color: black;
  border-radius: 10px 10px 0 0;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.05em;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const FilterIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const FilterItem = styled.div`
  width: 100%;
  height: 94px;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #000;
  border-radius: 10px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Profile = styled.img`
  width: 60px;
  height: 60px;
  padding: 0 20px 0 24px;
`;

export const ProfileContent = styled.div`
  width: 100%;
  height: 100%;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.05em;
  color: #000;
  padding: 23px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ContentTop = styled.div`
  width: 85%;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.05em;
  color: #000;
  align-items: center;
`;

export const BuildingCount = styled.span`
  color: #4498f2;
  font-size: 14px;
  line-height: 20px;
  padding-bottom: 8px;
`;

export const ContentBottom = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.05em;
  color: #999;
  display: flex;
`;

export const CircleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Circle = styled.div`
  width: 16px;
  height: 16px;
  border: 0.7px solid #000;
  border-radius: 10px;
  font-weight: 700;
  font-size: 8px;
  line-height: 10px;
  text-align: center;
  letter-spacing: -0.05em;
  color: #000;
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
