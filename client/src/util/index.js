export const reduceSum = (sum, value) => sum + value;
export const mapReduce = (value, mapFn, ...reduceFn) =>
  value.map(mapFn).reduce(...reduceFn);
