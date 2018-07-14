import styled, { keyframes } from 'react-emotion';

export default styled.div`
  padding: 20px;
  animation: ${keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `} ease-in-out 0.5s;
`;
