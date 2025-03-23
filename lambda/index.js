const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { httpMethod, body, pathParameters } = event;
  const tableName = 'AnimeCharacters';

  try {
    if (httpMethod === 'GET' && !pathParameters) {
      const data = await dynamodb.scan({ TableName: tableName }).promise();
      return { statusCode: 200, body: JSON.stringify(data.Items || []) };  // Ensure array
    } else if (httpMethod === 'GET' && pathParameters) {
      const data = await dynamodb.get({
        TableName: tableName,
        Key: { id: pathParameters.id }
      }).promise();
      return { statusCode: 200, body: JSON.stringify(data.Item || {}) };
    } else if (httpMethod === 'POST') {
      const item = JSON.parse(body);
      item.id = Date.now().toString();
      await dynamodb.put({ TableName: tableName, Item: item }).promise();
      return { statusCode: 201, body: JSON.stringify(item) };
    } else if (httpMethod === 'PATCH' && pathParameters) {
      const item = JSON.parse(body);
      await dynamodb.update({
        TableName: tableName,
        Key: { id: pathParameters.id },
        UpdateExpression: 'set #n = :n, anime = :a, powerLevel = :p',
        ExpressionAttributeNames: { '#n': 'name' },
        ExpressionAttributeValues: { ':n': item.name, ':a': item.anime, ':p': item.powerLevel }
      }).promise();
      return { statusCode: 200, body: JSON.stringify(item) };
    } else if (httpMethod === 'DELETE' && pathParameters) {
      await dynamodb.delete({ TableName: tableName, Key: { id: pathParameters.id } }).promise();
      return { statusCode: 204, body: '' };
    }
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error' }) };
  }
};