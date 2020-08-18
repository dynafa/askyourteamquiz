// Import dotenv lib for env vars

const dotenv = require('dotenv');
dotenv.config();

// Load the AWS SDK for Node.js

var AWS = require('aws-sdk');

// Set the region

AWS.config.update({region: 'ap-southeast-2'});

// Create the DynamoDB service object

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Random generator functions

const getB = () => Math.random() >= 0.5;
const getR = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

// Init vars and objects for random data

let id1 = 0, id2 = 0, id3 = 0, id4 = 0, id5 = 0, id6 = 0, id7 = 0, id8 = 0, id9 = 0, id10 = 0;
let user1 = {}, user2 = {}, user3 = {}, user4 = {}, user5 = {}, user6 = {}, user7 = {}, user8 = {}, user9 = {}, user10 = {};
ids = [id1, id2, id3, id4, id5, id6, id7, id8, id9, id10];
users = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10];

// Create arrays of fixed values

let names = ["Dave", "Simon", "Hein", "Paul", "Dude", "Harry", "Sally", "Dolly", "Frank", "Jack"];
let answers = ["A", "B", "C", "D", "E"];


// Iterate for each user

for (let i = 0; i < ids.length; i++) {
    ids[i] = process.env[`id${i}`];
    users[i] = {
        TableName: 'bap-table-2',
        Item: {
            'user_id': {S: ids[i]},
            'user_name': {S: names[i]},
            'age': {N: getR(20, 50).toString()},
            'gender': {N: getR(0,2).toString()},
            'quiz_id': {N: getR(0, 50).toString()},
            'completed': {BOOL: getB()},
            'question1_res': {S: answers[getR(0,4)]},
            'question2_res': {S: answers[getR(0,4)]},
            'question3_res': {S: answers[getR(0,4)]},
            'question4_res': {S: answers[getR(0,4)]},
            'question5_res': {BOOL: getB()}
        }
    };
    // Call DynamoDB to add the item to the table

    ddb.putItem(users[i], function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}




