const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const ID = requestBody.question_ID;
  const user = requestBody.user_ID;
  const question_body = requestBody.question_body;
  const question_choice_type = requestBody.question_choice_type;
  const question_choices = requestBody.question_choices;
  const question_correct_answer = requestBody.question_correct_answer;

  if (typeof userID !== 'number' || typeof name !== 'string' || typeof organisationName !== 'string' || typeof password !== 'string' ) {
    console.error('Validation Failed');
    callback(new Error('Admin user check error, please log out and log back in again'));
    return;

  }

  createQuestion(questionInfo(ID, user, question_body, question_choice_type, question_choices, question_correct_answer))
  .then(res => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `Sucessfully submitted question ${ID}`,
        userId: res.id
      })
    });
  })
  .catch(err => {
    console.log(err);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: `Unable to submit question ${ID}`
      })
    })
  });
};

const createQuestion = question => {
  console.log('Submitting Question');
  const userInfo = {
    TableName: process.env.QUESTION,
    Item: question,
  };
  return dynamoDb.create(questionInfo).promise()
    .then(res=>question);
}

const questionInfo = (name, organisationName, password) => {
  return {
    question_ID: question_ID,
    quiz_ID: quiz_ID,
    question_body: question_body,
    question_choice_type: question_choice_type,
    question_choices: question_choices,
    question_correct_answer: question_correct_answer,
  };
};

module.exports.list = (event, context, callback) => {
  var params = {
      TableName: process.env.QUESTION,
      ProjectionExpression: "question_ID, quiz_ID, question_body, question_choice_type, question_choices, question_correct_answer"
  };

  console.log("Scanning DynamoDB table for questions.");
  const onScan = (err, data) => {

      if (err) {
          console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
          callback(err);
      } else {
          console.log("Scan succeeded.");
          return callback(null, {
              statusCode: 200,
              body: JSON.stringify({
                  question: data.Items
              })
          });
      }

  };

  dynamoDb.scan(params, onScan);

};

// get question by question_id
module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.QUESTION,
    Key: {
      question_ID: event.pathParameters.question_ID,
    },
  };

  dynamoDb.get(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(new Error('Couldn\'t fetch question.'));
      return;
    });
};

// get all questions by quiz_ID
module.exports.list = (event, context, callback) => {
    var params ={
      TableName: process.env.QUESTION,
      Key: {
          quiz_ID: event.pathParameters.quiz_ID,
      },
      ProjectionExpression: "question_ID, question_body, question_choice_type, question_choices, question_correct_answer"
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

  //delete a question by question_ID
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

// need to place update question here