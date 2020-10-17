// To create the table type node UserTable.js at the command prompt

var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "ADMIN_USER",
    KeySchema: [       
        { AttributeName: "adminID", KeyType: "HASH"},  //Partition key
        { AttributeName: "name", KeyType: "RANGE" },
        { }
    ],
    AttributeDefinitions: [       
        { AttributeName: "adminID", AttributeType: "N" },
        { AttributeName: "name", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});