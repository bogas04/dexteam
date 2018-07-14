import React from 'react';
import { css } from 'react-emotion';
import Header from '../../components/Header';
import Tabs, { TabPills } from '../../components/Tabs';
import Calorie from '../../components/Calorie';
import Content from '../../components/Content';
import Card from '../../components/Card';
import colors from '../../design/colors';
import { HOUR, DAY, MINUTE } from '../../util/date';
import {
  getActivityCalorieByDate,
  getTotalCalorieByDate,
} from '../../api/fitness';
import Loader from '../../components/Loader';

const now = Date.now();
const nowDate = new Date(now);
const today = now - nowDate.getHours() * HOUR - nowDate.getMinutes() * MINUTE;
export default class Home extends React.PureComponent {
  state = {
    customerId: null,
    date: today,
    loading: true,
    consumed: parseInt(Math.random() * 1000 + 1000),
    food: [
      { time: Date.now() - HOUR * 5, title: 'Veg Biryani', calories: 530 },
      { time: Date.now() - HOUR * 12, title: 'Rajma Chawal', calories: 343 },
    ],
  };

  render() {
    const {
      loading,
      activities = [],
      food,
      burnt,
      consumed,
      date,
    } = this.state;

    const timeline = [
      {
        title: '💪 Workout',
        items: activities,
      },
      {
        title: '🌯 Diet',
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
          {loading ? (
            <Loader />
          ) : (
            <React.Fragment>
              <Calorie burnt={burnt} consumed={consumed} />
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
                                color: ${calories < 0
                                  ? colors.green
                                  : colors.red};
                              `}
                            >
                              {Math.abs(calories)}kCal
                            </div>
                            {/*<div>
                                {new Date(date).toLocaleString('en-US', {
                                  hour: 'numeric',
                                  minute: 'numeric',
                                  hour12: true,
                                })}
                              </div>*/}
                          </div>
                        </Card>
                      )
                    )}
                  </React.Fragment>
                )}
              </Tabs>
            </React.Fragment>
          )}
        </Content>
      </React.Fragment>
    );
  }

  hasNextDate = date => date + DAY < Date.now();

  handleNextDate = () => {
    if (this.hasNextDate(this.state.date)) {
      this.setState(
        state => ({
          date: state.date + DAY,
          loading: true,
        }),
        this.fetchData
      );
    }
  };

  handlePreviousDate = () =>
    this.setState(
      state => ({
        date: state.date - DAY,
        loading: true,
      }),
      this.fetchData
    );

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { date } = this.state;
    const [activities, burnt] = await Promise.all([
      getActivityCalorieByDate(date),
      getTotalCalorieByDate(date),
    ]);

    activities.sort((a, b) => b.calories - a.calories);

    this.setState({ loading: false, burnt, activities });
  };
}
