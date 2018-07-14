import React from "react";
import styled, { css } from "../../../../node_modules/react-emotion";
import colors from "../../design/colors";

export default class Tabs extends React.PureComponent {
  state = {
    currentTabIndex: 0
  };

  render() {
    return this.props.children({
      currentTabIndex: this.state.currentTabIndex,
      setTabIndex: this.setTabIndex
    });
  }

  setTabIndex = currentTabIndex => this.setState({ currentTabIndex });
}

export const TabPills = ({ tabTitles, activeIndex, onTabClick }) => (
  <ul
    className={css`
      list-style: none;
      display: flex;
      align-items: center;
      padding: 0;
      justify-content: space-around;
    `}
  >
    {tabTitles.map((title, index) => (
      <TabPill
        key={index}
        active={activeIndex === index}
        onClick={() => onTabClick(index)}
      >
        {title}
      </TabPill>
    ))}
  </ul>
);

export const TabPill = styled.li`
  padding: 15px;
  color: ${colors.subtleWhite};
  background-color: ${colors.grey};
  transition: border-color 0.25s;
  border-bottom: ${props =>
    props.active ? `5px solid ${colors.pink}` : `5px solid transparent`};
  text-align: center;
  flex: auto;
`;
