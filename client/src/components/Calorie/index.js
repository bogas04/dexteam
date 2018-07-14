import React from 'react';
import Card from '../Card';
import Donut from 'react-svg-donut-chart';
import styled, { css } from 'react-emotion';
import colors from '../../design/colors';

export default ({ burnt, consumed }) => (
  <Card>
    <Donut
      data={[
        { value: Number(burnt), stroke: colors.red },
        { value: Number(consumed), stroke: colors.green },
      ]}
    />
    <h3
      className={css`
        color: ${colors.red};
      `}
    >
      Total Calorie Burnt: {burnt}
    </h3>
    <h3
      className={css`
        color: ${colors.green};
      `}
    >
      Total Calorie Consumed: {consumed}
    </h3>
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
