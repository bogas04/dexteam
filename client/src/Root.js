import React from "react";
import styled, { injectGlobal, css } from "react-emotion";
import Header from "./components/Header";
import Tabs, { TabPills } from "./components/Tabs";
import Calorie from "./components/Calorie";
import Content from "./components/Content";
import Card from "./components/Card";
import colors from "./design/colors";

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
  }
`;

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default class Root extends React.PureComponent {
  state = {
    date: Date.now(),
    burnt: parseInt(Math.random() * 1000 + 1000),
    consumed: parseInt(Math.random() * 1000 + 1000),
    percentChange: parseInt(Math.random() * 100),
    activities: [
      { time: Date.now() - HOUR * 2, title: "🚶‍️ Walking", calories: -123 },
      { time: Date.now() - HOUR * 3, title: "🏃‍ Running", calories: -253 },
      { time: Date.now() - HOUR * 1, title: "🚴‍️ Cycling", calories: -83 },
    ],
    food: [
      { time: Date.now() - HOUR * 5, title: "Veg Biryani", calories: 530 },
      { time: Date.now() - HOUR * 12, title: "Rajma Chawal", calories: 343 },
    ],
  };
  render() {
    const {
      activities,
      food,
      burnt,
      consumed,
      percentChange,
      date,
    } = this.state;

    const timeline = [
      {
        title: "💪 Workout",
        items: activities,
      },
      {
        title: "🌯 Diet",
        items: food,
      },
    ];

    return (
      <React.Fragment>
        <Header
          date={new Date(date).toDateString()}
          hasNext={this.hasNextDate(date)}
          onPrevious={this.handlePreviousDate}
          onNext={this.handleNextDate}
        />
        <Content>
          <Calorie
            burnt={burnt}
            consumed={consumed}
            percentChange={percentChange}
          />
          <Tabs>
            {({ currentTabIndex, setTabIndex }) => (
              <React.Fragment>
                <TabPills
                  activeIndex={currentTabIndex}
                  tabTitles={timeline.map(t => t.title)}
                  onTabClick={setTabIndex}
                />
                {timeline[currentTabIndex].items.map(
                  ({ calories, title, time }) => (
                    <Card key={title}>
                      <div
                        className={css`
                          display: flex;
                          justify-content: space-between;
                        `}
                      >
                        <div>{title}</div>
                        <div
                          className={css`
                            color: ${calories < 0 ? colors.green : colors.red};
                          `}
                        >
                          {Math.abs(calories)}kCal
                        </div>
                        <div>{new Date(time).toDateString()}</div>
                      </div>
                    </Card>
                  )
                )}
              </React.Fragment>
            )}
          </Tabs>
          Add diet, weight, etc
        </Content>
      </React.Fragment>
    );
  }

  hasNextDate = date => date + DAY < Date.now();

  handleNextDate = () => {
    if (this.hasNextDate(this.state.date)) {
      this.setState(state => ({
        date: state.date + DAY,
        burnt: parseInt(Math.random() * 1000 + 1000),
        consumed: parseInt(Math.random() * 1000 + 1000),
        percentChange: parseInt(Math.random() * 100),
      }));
    }
  };

  handlePreviousDate = () =>
    this.setState(state => ({
      date: state.date - DAY,
      burnt: parseInt(Math.random() * 1000 + 1000),
      consumed: parseInt(Math.random() * 1000 + 1000),
      percentChange: parseInt(Math.random() * 100),
    }));
}
