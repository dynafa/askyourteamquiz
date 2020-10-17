const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const question_ID = requestBody.question_ID;
  const given_answer = requestBody.given_answer;
  

  if (typeof question_ID !== 'number' || typeof name !== 'string' || typeof given_answer !== 'string'  ) {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create new response because of validation errors.'));
    return;

  }

  // need to redo this as an update question api call, this will not work as we don't wish to create a new user
  createResponse(userInfo(userID, name, organisationName, password))
  .then(res => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Sucessfully submitted candidate with user name ${name}`,
        userId: res.id
      })
    });
  })
  .catch(err => {
    console.log(err);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: `Unable to submit candidate with user name ${name}`
      })
    })
  });
};

const createUser = user => {
  console.log('Submitting User');
  const userInfo = {
    TableName: process.env.USERTABLE,
    Item: user,
  };
  return dynamoDb.create(userInfo).promise()
    .then(res=>user);
}

const userInfo = (name, organisationName, password) => {
  return {
    userID: uuid.v1(),
    name: name,
    organisationName: organisationName,
    password: password,
  };
};