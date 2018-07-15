import React from 'react';
import Card from '../Card';
import Donut from 'react-svg-donut-chart';
import styled, { css } from 'react-emotion';
import colors from '../../design/colors';
import { getFoodByCalorie } from '../../api/swiggy';

export default class Calorie extends React.PureComponent {
  state = {
    suggestions: [],
  };
  render() {
    const { suggestions } = this.state;
    const { burnt, consumed } = this.props;
    const isDeficit = burnt > consumed;

    return (
      <Card>
        <Donut
          data={[
            { value: Number(burnt), stroke: colors.green },
            { value: Number(consumed), stroke: colors.red },
          ]}
        />
        <h3
          className={css`
            color: ${colors.green};
          `}
        >
          Total Calories Burnt: {burnt}
        </h3>
        <h3
          className={css`
            color: ${colors.red};
          `}
        >
          Total Calories Consumed: {consumed}
        </h3>
        Calorie{' '}
        <strong
          className={css`
            color: ${isDeficit ? colors.green : colors.red};
          `}
        >
          {isDeficit ? 'deficit' : 'surplus'}
        </strong>. Continue this lifestyle to{' '}
        {burnt > consumed ? 'lose' : 'gain'} weight.{' '}
        {suggestions.length !== 0 && (
          <p>
            We recommend following food items as per your calorie requirement.
            (2000kCal per day).
          </p>
        )}
        {suggestions.map(({ title, calories }, index) => (
          <div
            className={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <div
              className={css`
                text-transform: capitalize;
              `}
            >
              {title}
            </div>
            <div
              className={css`
                color: ${calories < 0 ? colors.green : colors.red};
              `}
            >
              {Math.abs(calories)}kCal
            </div>
          </div>
        ))}
        {/*<p>
      You consumed{" "}
      <strong
        className={css`
          color: ${percentChange < 0 ? colors.green : colors.red};
        `}
      >
        {percentChange > 0 ? `+${percentChange}` : percentChange}%
      </strong>{" "}
      calories today from your average.
    </p>*/}
      </Card>
    );
  }

  async componentDidMount() {
    const { consumed, burnt } = this.props;
    const calorie = 2000 - consumed;
    const suggestions = await getFoodByCalorie({ calorie });
    this.setState({ suggestions });
  }
}
