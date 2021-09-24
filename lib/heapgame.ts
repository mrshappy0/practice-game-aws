import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as iam from "@aws-cdk/aws-iam";
import * as cognito from "@aws-cdk/aws-cognito";
const path = require("path");

export interface HeapGameProps {
  /** the function for which we want to count url hits **/
  // downstream: lambda.IFunction;
}

export class HeapGame extends cdk.Construct {
  /** allows accessing the counter function **/
  public readonly handler: lambda.Function;

  /** the hit counter table */
  public readonly table: dynamodb.Table;

  constructor(scope: cdk.Construct, id: string, props: HeapGameProps) {
    super(scope, id);

    const table = new dynamodb.Table(this, "HeapGameTable", {
      partitionKey: { name: "gameId", type: dynamodb.AttributeType.STRING },
      serverSideEncryption: true,
    });
    this.table = table;

    // 👇 User Pool
    const userPool = new cognito.UserPool(this, "userpool", {
      userPoolName: "IP-turn-based-users",
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: false,
        requireSymbols: false,
      },
      standardAttributes: {
        phoneNumber: {
          required: true,
        },
      },
      selfSignUpEnabled: true,
    });

    // User Pool Client
    const clientReadWriteAttributes =
      new cognito.ClientAttributes().withStandardAttributes({
        phoneNumber: true,
        email: true,
      });

    const userPoolClient = new cognito.UserPoolClient(this, "userpool-client", {
      userPool,
      authFlows: {
        adminUserPassword: true,
      },
      writeAttributes: clientReadWriteAttributes,
      readAttributes: clientReadWriteAttributes,
    });

    const lambdaToSNS = iam.Role.fromRoleArn(
      this,
      "TVR-TurnBasedGame-Ifx-IamRoleA750FF82-1WG3PZX4OFZJO",
      "arn:aws:iam::881385135648:role/TurnBasedGameLambdaToSNS"
    );

    this.handler = new lambda.Function(this, "HeapHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "heapcounter.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../lambda")),
      environment: {
        HITS_TABLE_NAME: table.tableName,
        COGNITO_CLIENT_ID: userPoolClient.userPoolClientId,
        USER_POOL_ID: userPool.userPoolId,
        REGION: "us-east-1",
      },
      role: lambdaToSNS,
    });

    // grant the lambda role read/write permissions to our table
    table.grantReadWriteData(this.handler);
  }
}
