const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app");
const server = awsServerlessExpress.createServer(app);

exports.handler = function (event, context) {
  console.log("Game Handler Lambda:", JSON.stringify(event, undefined, 2));
  awsServerlessExpress.proxy(server, event, context);
};
