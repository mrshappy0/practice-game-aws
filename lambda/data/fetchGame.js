const { DynamoDB } = require("aws-sdk");
const documentClient = new DynamoDB.DocumentClient();

const fetchGame = async (gameId) => {
  const params = {
    TableName: process.env.HITS_TABLE_NAME,
    Key: {
      gameId: gameId,
    },
  };

  try {
    const game = await documentClient.get(params).promise();
    return game.Item;
  } catch (error) {
    console.log("Error fetching game: ", error.message);
    throw new Error("Could not fetch game");
  }
};

module.exports = fetchGame
