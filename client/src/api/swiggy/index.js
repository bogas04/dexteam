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
        return getItemDetails(items);
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

// items = [1,2,3]
export const getItemDetails = items =>
  fetch(`/api/items/selected?items=${items}`)
    .then(r => r.json())
    .then(data =>
      data.map(d => ({
        title: d.dish_family,
        calories: d.calories,
        time: Date.now(),
      }))
    );

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

export const getFoodByCalorie = ({ calorie }) =>
  fetch(`/api/items/calories_item_map?calorie=${calorie / 10}`)
    .then(r => r.text())
    .then(d => (d === '' ? [] : JSON.parse(d)))
    .then(d => d.slice(0, 3))
    .then(itemIds => getItemDetails(JSON.stringify(itemIds)));
