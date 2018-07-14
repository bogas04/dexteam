import styled, { keyframes } from 'react-emotion';
import colors from '../../design/colors';

const CoolContent = styled.div`
  color: ${colors.white};
  width: 100vw;
  height: 100vh;
  padding: 10vh 10vw;
  box-sizing: border-box;
  background: linear-gradient(45deg, ${colors.blue}, ${colors.subtleBlue});
  animation: ${keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `} ease-in-out 0.5s;
`;

export default CoolContent;
