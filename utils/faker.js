import { Faker } from "@faker-js/faker";

faker.locale = "es";

export const generateUser = () =>{
    const numOfProducts = parseInt(faker.random.numeric(1,{bannedDigits:["0"]}));
    const products = [];

    for(let i = 0; i < numOfProducts; 1++) {
        products.push(generateProduct());

    }

    return {
        name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        id: faker.database.mongodbOnjectId()
    };
};

export const generateProduct = () => {
    return {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      category: faker.commerce.category(),
      stock: faker.random.numeric(1),
      id: faker.database.mongodbObjectId(),
      image: faker.image.image(),
    };
  };