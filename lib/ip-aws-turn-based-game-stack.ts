import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import { HeapGame } from "./heapgame";
import { TableViewer } from "cdk-dynamo-table-viewer";

export class IpAwsTurnBasedGameStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hello = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_14_X, // execution environment
      code: lambda.Code.fromAsset("lambda"), // code loaded from "lambda" directory
      handler: "hello.handler", // file is "hello", function is "handler"
    });

    const helloWithHeapGame = new HeapGame(this, "HeapGame", {
      downstream: hello,
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, "Endpoint", {
      handler: helloWithHeapGame.handler,
    });

    new TableViewer(this, "ViewHeapGameTable", {
      title:
        "URL Tracker at https://vgxccirlr1.execute-api.us-east-1.amazonaws.com/prod/",
      sortBy: "-hits",
      table: helloWithHeapGame.table,
    });
  }
}
