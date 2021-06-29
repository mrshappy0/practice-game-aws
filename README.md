# Welcome to Nim. A turn based game deployd via AWS CDK!

Import this [Public Link](https://www.getpostman.com/collections/5cb0a921ffc37954515e) via Postman to interact with this game.
When creating a user, provide a *user*, *password*, *phoneNumber*, and *email*. 

**Note:** *phoneNumber* is a required attribute for SNS text messages.

AWS Resources Utilized: SNS, DynamoDB, Cognito, Lambda, APIGateway

![AWS Architecture](./photo-assets/turn-based-game.png)


### Helpful CDK Information
You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`IpAwsTurnBasedGameStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

#### Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
