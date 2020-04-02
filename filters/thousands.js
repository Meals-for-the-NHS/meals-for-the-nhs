/*
  Add commas to numbers
*/
module.exports = function (number) {
  return Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
