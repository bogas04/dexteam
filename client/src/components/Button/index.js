import styled from 'react-emotion';
import colors from '../../design/colors';

const Button = styled.button`
  background-color: ${props => (props.secondary ? colors.grey : colors.orange)};
  border: none;
  color: ${props => (props.secondary ? colors.subtleWhite : colors.white)};
  font-size: 25px;
  font-weight: 100;
  padding: 10px;
  margin: 10px;
`;

export default Button;
