export default function generateMongoDBId() {
  const hex = "0123456789abcdef";

  let mongoDB = "";

  for (let i = 0; i < 24; i++) {
    mongoDB += hex[Math.floor(Math.random() * hex.length)];
  }

  return mongoDB;
}
