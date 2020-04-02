/*
  Add commas to numbers
*/
module.exports = function (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}