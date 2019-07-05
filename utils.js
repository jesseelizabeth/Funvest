export const getColor = (open, latestPrice) => {
  if (open === latestPrice) {
    return 'grey-text';
  } else if (open < latestPrice) {
    return 'green-text';
  } else {
    return 'red-text';
  }
};
