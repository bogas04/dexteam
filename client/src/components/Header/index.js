import React from "react";
import styled from "react-emotion";
import colors from "../../design/colors";

const Header = styled.h1`
  margin: 0;
  padding: 20px;
  width: 100vw;
  background: linear-gradient(45deg, #7f9a99, #1a67f3);
  color: ${colors.white};
  box-sizing: border-box;
  font-weight: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.div`
  cursor: pointer;
  color: ${props => (props.disabled ? colors.grey : "inherit")};
  pointer-events: ${props => (props.disabled ? "none" : "")};
`;

export default ({ date, onPrevious, onNext, hasNext }) => (
  <Header>
    <Button onClick={onPrevious}>&lt;</Button>
    <div>{date}</div>
    <Button disabled={hasNext === false} onClick={hasNext ? onNext : null}>
      &gt;
    </Button>
  </Header>
);
