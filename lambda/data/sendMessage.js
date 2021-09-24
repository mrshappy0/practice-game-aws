const { SNS } = require("aws-sdk");

const sendMessage = async ({ phoneNumber, message }) => {
  const snsClient = new SNS(process.env.REGION);
  return await snsClient
    .publish({
      Message: message,
      PhoneNumber: phoneNumber,
    })
    .promise();
};

module.exports = sendMessage