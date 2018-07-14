import React from 'react';
import styled, { css, keyframes } from 'react-emotion';
import colors from '../../design/colors';

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 5px solid ${colors.blue};
  border-top: 5px solid ${colors.subtleBlue};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spinAnimation} 0.75s ease-in-out infinite;
`;

export const LoadingView = (
  <div
    className={css`
      height: 30vh;
      display: flex;
      justify-content: center;
      align-items: center;
    `}
  >
    <Loader />
  </div>
);

export default Loader;
