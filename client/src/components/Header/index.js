import React from 'react';
import styled from 'react-emotion';
import colors from '../../design/colors';

export const HeaderBar = styled.h1`
  margin: 0;
  padding: 20px;
  width: 100vw;
  background: linear-gradient(45deg, ${colors.blue}, ${colors.subtleBlue});
  color: ${colors.white};
  box-sizing: border-box;
  font-weight: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderButton = styled.div`
  cursor: pointer;
  color: ${props => (props.disabled ? colors.grey : 'inherit')};
  pointer-events: ${props => (props.disabled ? 'none' : '')};
`;

export default ({ date, onPrevious, onNext, hasNext }) => (
  <HeaderBar>
    <HeaderButton onClick={onPrevious}>&lt;</HeaderButton>
    <div>{date}</div>
    <HeaderButton
      disabled={hasNext === false}
      onClick={hasNext ? onNext : null}
    >
      &gt;
    </HeaderButton>
  </HeaderBar>
);
