function generateRandomNumber() {
  return Math.floor(Math.random() * 100 )+ 1;
}

const ageCalculator = (birthYear) => {
  const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
}
module.exports = {generateRandomNumber, ageCalculator};