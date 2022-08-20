import { MouseEvent, useState } from "react";
import styled from "@emotion/styled";

interface IPropsBoardStyle {
  isClickFilter: boolean;
}

export const Filter = styled.div`
  height: 28px;
  line-height: 28px;
  border-radius: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.05em;
  padding: 4px 12px;
  background-color: ${(props: IPropsBoardStyle) =>
    props.isClickFilter ? "black" : "#fff"};

  color: ${(props: IPropsBoardStyle) =>
    props.isClickFilter ? "#fff" : "#999"};

  margin-right: 24px;

  cursor: pointer;
  :hover {
    color: ${(props: IPropsBoardStyle) =>
      props.isClickFilter ? "#fff" : "black"};
  }
`;

export default function FilterPage() {
  const FILTER = ["전체", "5개 이상", "4개", "3개", "2개", "1개"];

  const [isClickFilter, setIsClickFilter] = useState(false);
  const [filterId, setFilterId] = useState("");

  const onClickFilter = (event: MouseEvent<HTMLDivElement>) => {
    setIsClickFilter((prev) => !prev);
    setFilterId((event.target as HTMLDivElement).id);
  };

  return (
    <div style={{ display: "flex" }}>
      {FILTER.map((el, idx) => (
        <Filter
          key={idx}
          onClick={onClickFilter}
          isClickFilter={filterId === String(idx) ? true : false}
          id={String(idx)}
        >
          {el}
        </Filter>
      ))}
    </div>
  );
}
