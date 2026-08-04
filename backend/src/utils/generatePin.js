export const generatePin = () => {
  const randomNumbers = Math.floor(100000 + Math.random() * 900000);
  return randomNumbers;
};
