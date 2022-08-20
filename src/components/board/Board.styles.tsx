import styled from "@emotion/styled";

export const Wrapper = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Banner = styled.div`
  width: 100%;
  height: 300px;
  background: url("/images/P_banner_pattern.png") no-repeat center center;
  position: fixed;
  z-index: 30;
`;

export const Characters = styled.div`
  width: 560px;
  height: 300px;
  position: absolute;
  left: 30%;
  background: url("/images/banner_char.png") no-repeat center center;
`;

export const TopDiv = styled.div`
  padding-top: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const H1 = styled.h1`
  font-weight: 700;
  font-size: 40px;
  line-height: 56px;
  text-align: center;
  letter-spacing: -0.05em;
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
`;

export const SearchDiv = styled.div`
  width: 400px;
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
  width: 400px;
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

export const Keyword = styled.div`
  padding: 8px 24px;
  background-color: #fff;
  :hover {
    background-color: #eee;
  }
`;

export const FilterDiv = styled.div`
  width: 560px;
  display: flex;
  flex-direction: column;
`;

export const FilterTop = styled.div`
  width: 560px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
  margin-bottom: 24px;
`;

export const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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
  background: #fff;
  border: 1px solid #000;
  border-radius: 10px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

export const Profile = styled.img`
  width: 60px;
  height: 60px;
  padding: 0 20px 0 24px;
`;

export const ProfileContent = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.05em;
  color: #000;
`;

export const ContentTop = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.05em;
  color: #000;
  padding-bottom: 12px;
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
