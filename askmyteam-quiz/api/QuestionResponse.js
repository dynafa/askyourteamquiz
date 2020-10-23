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
  createResponse(userInfo(question_ID, name, given_answer, quiz_ID))
  .then(res => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Sucessfully submitted answer ${given_answer} for ${name} on question number ${question_ID}`,
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

const createResponse = response => {
  console.log('Submitting Response');
  const responseInfo = {
    TableName: process.env.DYNAMODB_RESPONSE,
    Item: response,
  };
  return dynamoDb.create(userInfo).promise()
    .then(res=>response);
}

const responseInfo = (question_ID, name, quiz_ID, given_answer) => {
  return {
    name: name,
    question_ID: question_ID,
    quiz_ID: quiz_ID,
    given_answer,
  };
};

// get all responses by quiz_ID
module.exports.list = (event, context, callback) => {
  var params ={
    TableName: process.env.DYNAMODB_RESPONSE_TABLE,
    Key: {
        quiz_ID: event.pathParameters.quiz_ID,
    },
    ProjectionExpression: "Question_ID, Quiz_ID, Given_answer, Question_correct_answer, Question_choice_type, Answer_correct"
  };

  console.log("Scanning User Table");
  const onScan = (err, data) => {
    if (err) {
      console.log('Scan failed on data loading. Error JSON', JSON.stringify(err, null, 2));
      callback(err);
    } else {
      console.log("Successful scan");
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(result.Items),
      });
    }
  };
  dynamoDb.scan(params, onScan);
};

//delete a response by question_ID
module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: process.env.USERTABLE,
    Key: {
      question_ID: event.pathParameters.question_ID,
    },
  };

dynamoDb.delete(params, (error) => {
  //handle errors
  if (error) {
    console.error(error);
    callback(null, {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t remove the question.',
    });
    return;
}
// the response
const response = {
  statusCode: 200,
  body: JSON.stringify({}),
};
callback(null, response);
});
};