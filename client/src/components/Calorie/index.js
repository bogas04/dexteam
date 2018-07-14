import React from 'react';
import Card from '../Card';
import Donut from 'react-svg-donut-chart';
import styled, { css } from 'react-emotion';
import colors from '../../design/colors';

export default ({ burnt, consumed }) => (
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
        color: ${burnt > consumed ? colors.green : colors.red};
      `}
    >
      {burnt > consumed ? 'deficit' : 'surplus'}
    </strong>. Continue this lifestyle to {burnt > consumed ? 'lose' : 'gain'}{' '}
    weight.
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
