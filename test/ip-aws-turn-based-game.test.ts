import { expect as expectCDK, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
// import * as IpAwsTurnBasedGame from '../lib/ip-aws-turn-based-game-stack';

import { HeapGame } from "../lib/heapgame";

test("DynamoDB Table Created", () => {
  const stack = new cdk.Stack();
  // WHEN
  new HeapGame(stack, "MyTestConstruct", {
    downstream: new lambda.Function(stack, "TestFunction", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "lambda.handler",
      code: lambda.Code.fromInline("test"),
    }),
  });
  // THEN
  expectCDK(stack).to(haveResource("AWS::DynamoDB::Table"));
});

test("Lambda Has Environment Variables", () => {
  const stack = new cdk.Stack();
  // WHEN
  new HeapGame(stack, "MyTestConstruct", {
    downstream: new lambda.Function(stack, "TestFunction", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "lambda.handler",
      code: lambda.Code.inline("test"),
    }),
  });
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::Lambda::Function", {
      Environment: {
        Variables: {
          DOWNSTREAM_FUNCTION_NAME: {
            Ref: "TestFunction22AD90FC",
          },
          HITS_TABLE_NAME: {
            Ref: "MyTestConstructHits24A357F0",
          },
        },
      },
    })
  );
});

test("DynamoDB Table Created With Encryption", () => {
  const stack = new cdk.Stack();
  // WHEN
  new HeapGame(stack, "MyTestConstruct", {
    downstream: new lambda.Function(stack, "TestFunction", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "lambda.handler",
      code: lambda.Code.inline("test"),
    }),
  });
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::DynamoDB::Table", {
      SSESpecification: {
        SSEEnabled: true,
      },
    })
  );
});
