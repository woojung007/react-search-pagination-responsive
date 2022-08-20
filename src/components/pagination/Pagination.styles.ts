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
  cursor: pointer;
  padding: 10px;
`;

// export const PrevButton = styled(LeftCircleOutlined)`
//   cursor: pointer;
//   padding: 15px;
// `;

// export const NextButton = styled(RightCircleOutlined)`
//   cursor: pointer;
//   padding: 15px;
// `;

export const PrevButton = styled(LeftCircleOutlined)`
  cursor: pointer;
  padding: 15px;
`;

export const NextButton = styled(RightCircleOutlined)`
  cursor: pointer;
  padding: 15px;
`;
