'use strict';
// all this is wrong and needs to be redone as all functions are now in a single file user.js and in the api directory
const createUser = require('./UserCRUD/CreateUser.js');
const readUser = require('./UserCRUD/ReadUser.js');
const readUsers = require('./UserCRUD/ReadUsers.js');
const updateUser = require('./UserCRUD/UpdateUser.js');
const deleteUser = require('./UserCRUD/DeleteUser.js');


  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };

