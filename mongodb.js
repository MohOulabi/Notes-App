//CRUD

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');
const connectionURL = 'mongodb://127.0.0.1:27017';
const database = 'notes-app';


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log(error);
    }

    const db = client.db(database);
    db.collection('users').findOne({ age: 26 },(error, result) => {
        if(error){
            return console.log(error);
        }
        console.log(result);
    });

    client.close();
});