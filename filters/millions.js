/*
  million-ify
*/
module.exports = function (number) {
  return `${(number / 1e6).toFixed(2).toString()}m`;
}
