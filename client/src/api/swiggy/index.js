import { HOUR, toYYYYMMDD } from '../../util/date';

export const getTotalFoodCalorieByDate = ({ customerId, date }) =>
  //  Promise.resolve(parseInt(Math.random() * 1000 + 1000));
  fetch(`/api/users/${customerId}/calories_history/${toYYYYMMDD(date)}`)
    .then(r => r.json())
    .then(d => d.calories_intake);

export const getFoodCalorieByDate = ({ customerId, date }) =>
  fetch(`/api/users/${customerId}/diet/${toYYYYMMDD(date)}`)
    .then(r => r.json())
    .then(data => {
      const [{ items = '' } = {}] = data;

      if (items !== '') {
        return fetch(`/api/items/selected?items=${items}`)
          .then(r => r.json())
          .then(data =>
            data.map(d => ({
              title: d.dish_family,
              calories: d.calories,
              time: Date.now(),
            }))
          );
      } else {
        return [
          { time: Date.now() - HOUR * 5, title: 'Veg Biryani', calories: 530 },
          {
            time: Date.now() - HOUR * 12,
            title: 'Rajma Chawal',
            calories: 343,
          },
        ];
      }
    });

export const getUserSummary = ({ customerId }) =>
  /* Promise.resolve({
    total_order: 44,
    top_5_restaurants: [123, 456, 789],
    top_5_items: [123, 456, 789],
    total_money_spent: 13904,
    average_gmv: 316,
  });
  */
  fetch(`/api/users/${customerId}/summary`).then(r => r.json());
