//jshint esversion:6
//Install mongoose
const mongoose = require("mongoose");

// Run main function and catch error
main().catch((err) => console.log(err));

// async function
async function main() {
  //////(old info)localhost ain't working because in config it's binding to 127.0.0.1
  const url = 'mongodb://localhost:27017';
  const dbPath = "/fruitsDB";
  await mongoose.connect(url + dbPath);
  //  {useNewUrlParser: true}, //no longer necessary Mongoose 6
const fruitSchema = new mongoose.Schema ({      //String & Number = data types= a must have for Schema
  name: {
    type: String,
    required: [true, 'Please check your data entery, no name specified!']      //true = 1
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = new mongoose.model("Fruit", fruitSchema);

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = new mongoose.model("Person", personSchema);

const peach = new Fruit ({
  name: "Peach",
  rating: 10,
  review: "Got me feeling peachy."
});
const pineapple = new Fruit ({
  name: "Pineapple",
  rating: 9,
  review: "Great fruit!"

});

const strawberry = new Fruit ({
  name: "Strawberry",
  rating: 8,
  review: "Love the color."

});

// strawberry.save();


// const person = new Person ({
//   name: "Amy",
//   age: 12,
//   favoriteFruit: pineapple
// });

const person = new Person ({
  name: "Karelyn",
  age: 26,
  favoriteFruit: strawberry
});

// person.save();

// const cherry = new Fruit({
//   name: "Cherry",
//   rating: 3,
//   review: "One was not enough :( ."
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   rating: 5,
//   review: "Weird texture."
// });
//
// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 10,
//   review: "The best fruit!"
// });

// Fruit.insertMany([kiwi, cherry, banana], function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Succesfully saved all the fruits to fruitsDB");
//   }
// });


                                                //const fruits = ['apple', 'kiwi', 'cherry', 'banana'];
  //This code is better than  ---------->      //fruits.forEach(name => console.log(name));
  //^^^^^^^^^

Fruit.find(function(err, fruits){
  if (err) {
    console.log(err);
  } else {

    mongoose.connection.close(function () {
       process.exit(0);
    });

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});
   // await Person.deleteOne({_id: "62f1f6912879cf3f93e0a90f"}, {name: 'Karelyn'}, function(err){
   //   if (err){
   //     console.log(err);
   //   } else {
   //     console.log("Succesfully deleted all the documents.");
   //   }
   // });
// Fruit.updateOne({_id: "62f1e9181fb42664bcc542e2"}, {name: "Peach"}, function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("Succesfully updated the document.");
//   }
// });

}
