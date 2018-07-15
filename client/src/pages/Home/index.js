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
import { LoadingView } from '../../components/Loader';
import {
  getFoodCalorieByDate,
  getTotalFoodCalorieByDate,
} from '../../api/swiggy';
import Button from '../../components/Button';

const now = Date.now();
const nowDate = new Date(now);
const today = now - nowDate.getHours() * HOUR - nowDate.getMinutes() * MINUTE;
export default class Home extends React.PureComponent {
  state = {
    customerId: null,
    date: today,
    loading: true,
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
        <Content key={loading}>
          {loading ? (
            LoadingView
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

              <Button onClick={this.props.onSummary}>View Summary</Button>
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
    const { customerId } = this.props;

    const [activities, burnt, consumed, food] = await Promise.all([
      getActivityCalorieByDate(date),
      getTotalCalorieByDate(date),
      getTotalFoodCalorieByDate({ customerId, date }),
      getFoodCalorieByDate({ customerId, date }),
    ]);

    activities.sort((a, b) => b.calories - a.calories);
    food.sort((a, b) => b.calories - a.calories);

    this.setState({ loading: false, burnt, consumed, activities, food });
  };
}
