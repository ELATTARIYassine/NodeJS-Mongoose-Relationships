const mongoose = require("mongoose");

const Customer = require("./models/Customer").Customer;
const Identifier = require("./models/Identifier");

const createCustomer = function (name, age, gender) {
  const customer = new Customer({
    name,
    age,
    gender,
  });

  return customer.save();
};

const createIdentifier = function (cardCode, customer) {
  const identifier = new Identifier({
    cardCode,
    customer,
  });

  return identifier.save();
};

const test = () => {
  createCustomer("bezkoder", 29, "male")
    .then((customer) => {
      console.log("> Created new Customer\n", customer);

      return createIdentifier(
        customer._id.toString().substring(0, 10).toUpperCase(),
        customer
      );
    })
    .then((identifier) => {
      console.log("> Created new Identifier\n", identifier);
    })
    .catch((err) => console.log(err));
};

const showAllIdentifier = async function () {
  const identifiers = await Identifier.find().select(
    "-__v -customer.__v -customer._id"
  );

  console.log("> All Identifiers\n", identifiers);
};

mongoose
  .connect(
    "mongodb+srv://erwinRare:987654321@cluster0.yc88o.mongodb.net/onetoone-embedding?retryWrites=true&w=majority"
  )
  .then(() => {
    // run this for the first time to create the collections
    // test();
    showAllIdentifier();
  })
  .catch((err) => {
    console.log(err);
  });
