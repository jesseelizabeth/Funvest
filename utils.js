export const getColor = (open, latestPrice) => {
  if (open === latestPrice) {
    return 'grey-text';
  } else if (open < latestPrice) {
    return 'green-text text-accent-2';
  } else {
    return 'red-text text-accent-3';
  }
};
