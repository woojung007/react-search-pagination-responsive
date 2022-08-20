import styled from "@emotion/styled";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

export const BodyHTML = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const PagesWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
  font-size: 20px;
`;

export const Pages = styled.button`
  border: 0;
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.05em;
  cursor: pointer;
`;

interface IPropsPrevBtn {
  startPage: number;
}

export const PrevButton = styled(LeftCircleOutlined)`
  cursor: pointer;
  padding: 15px;
  color: ${(props: IPropsPrevBtn) =>
    props.startPage === 1 ? "#999" : "black"};
`;

interface IPropsNextBtn {
  startPage: number;
  lastPage: number;
}

export const NextButton = styled(RightCircleOutlined)`
  cursor: pointer;
  padding: 15px;
  color: ${(props: IPropsNextBtn) =>
    !(props.startPage + 3 <= props.lastPage) ? "#999" : "black"};
`;
