const AWS = require("aws-sdk");

const getResources = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb
      .scan({
        TableName: process.env.TABLE_NAME,
      })
      .promise();

    const resources = result.Items;

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Listing successfully!",
          items: resources,
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Something went wrong",
          error: error,
        },
        null,
        2
      ),
    };
  }
};

module.exports = {
  getResources,
};
