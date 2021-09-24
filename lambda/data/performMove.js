const { DynamoDB } = require("aws-sdk");
const documentClient = new DynamoDB.DocumentClient();

const performMove = async ({ gameId, user, changedHeap, changedHeapValue }) => {
  if (changedHeapValue < 0) {
    throw new Error("Cannot set heap value below 0");
  }
  const params = {
    TableName: process.env.HITS_TABLE_NAME,
    Key: {
      gameId: gameId,
    },
    UpdateExpression: `SET lastMoveBy = :user, ${changedHeap} = :changedHeapValue`,
    ConditionExpression: `(user1 = :user OR user2 = :user) AND lastMoveBy <> :user AND ${changedHeap} > :changedHeapValue`,
    ExpressionAttributeValues: {
      ":user": user,
      ":changedHeapValue": changedHeapValue,
    },
    ReturnValues: "ALL_NEW",
  };
  try {
    const resp = await documentClient.update(params).promise();
    return resp.Attributes;
  } catch (error) {
    console.log("Error updating item: ", error.message);
    throw new Error("Could not perform move");
  }
};

module.exports = performMove;
