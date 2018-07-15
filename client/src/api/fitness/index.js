import { DAY } from '../../util/date';
import { callAPI } from '../../util/api';
import { reduceSum, mapReduce } from '../../util';

const API_URL = `https://www.googleapis.com/fitness/v1/users/me`;
const DATA_SOURCES = `${API_URL}/dataSources`;
const DATA_SET_URL = `${API_URL}/dataset:aggregate`;

export const getTotalCalorieByDate = date =>
  callAPI(DATA_SET_URL, {
    method: 'POST',
    body: {
      startTimeMillis: date,
      endTimeMillis: date + DAY,
      aggregateBy: [
        {
          dataTypeName: 'com.google.calories.expended',
        },
      ],
    },
  }).then(data => {
    const {
      bucket: [{ dataset }],
    } = data;

    return aggregateDataset(dataset);
  });

export const getActivityCalorieByDate = date =>
  callAPI(DATA_SET_URL, {
    method: 'POST',
    body: {
      startTimeMillis: date,
      endTimeMillis: date + DAY,
      aggregateBy: [
        {
          dataTypeName: 'com.google.calories.expended',
        },
      ],
      bucketByActivityType: {
        minDurationMillis: 1000,
      },
    },
  }).then(data => {
    return data.bucket.map(({ activity, dataset }) => ({
      title: ACTIVITIES[Number(activity)] || 'Unknown Activity',
      time: getActivityStartTime(dataset),
      calories: -aggregateDataset(dataset),
    }));
  });

export const ACTIVITIES = {
  0: '🚙 In vehicle',
  3: '🙋‍ Being Alive',
  4: '🤔 Unknown',
  7: '🚶‍ Walking',
};

const aggregateDataset = dataset => {
  const [{ point: points = [] }] = dataset;

  return Number(
    points
      .map(({ value: values }) => values.map(v => v.fpVal).reduce(reduceSum, 0))
      .reduce(reduceSum, 0)
      .toFixed(2)
  );
};

const getActivityStartTime = dataset =>
  parseInt(dataset[0].point[0].startTimeNanos / 1000000);
