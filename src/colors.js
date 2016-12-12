const colors = {};
export default (prop) => {
  if (!colors[prop]) {
    colors[prop] = `hsl(${(70 * Object.keys(colors).length) % 360}, 100%, 35%)`;
  }
  return colors[prop];
};
