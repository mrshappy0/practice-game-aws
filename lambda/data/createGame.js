const { DynamoDB } = require("aws-sdk");
const { uuid } = require("uuidv4");
const sendMessage = require('./sendMessage')

const documentClient = new DynamoDB.DocumentClient();

const createGame = async ({ creator, opponent }) => {
  const params = {
    TableName: process.env.HITS_TABLE_NAME,
    Item: {
      gameId: uuid().split("-")[0],
      user1: creator,
      user2: opponent.username,
      heap1: 5,
      heap2: 4,
      heap3: 5,
      lastMoveBy: creator,
    },
  };

  try {
    await documentClient.put(params).promise();
  } catch (error) {
    console.log("Error creating game: ", error.message);
    throw new Error("Could not create game");
  }

  const message = `Hi ${opponent.username}. Your friend ${creator} has invited you to a new game! Your game ID is ${params.Item.gameId}`;
  try {
    await sendMessage({ phoneNumber: opponent.phoneNumber, message });
  } catch (error) {
    console.log("Error sending message: ", error.message);
    throw new Error("Could not send message to user");
  }

  return params.Item;
};

module.exports = createGame;
