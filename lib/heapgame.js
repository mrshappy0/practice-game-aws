"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeapGame = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const dynamodb = require("@aws-cdk/aws-dynamodb");
const iam = require("@aws-cdk/aws-iam");
const cognito = require("@aws-cdk/aws-cognito");
const path = require("path");
class HeapGame extends cdk.Construct {
    constructor(scope, id, props) {
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
        const clientReadWriteAttributes = new cognito.ClientAttributes().withStandardAttributes({
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
        const lambdaToSNS = iam.Role.fromRoleArn(this, "TVR-TurnBasedGame-Ifx-IamRoleA750FF82-1WG3PZX4OFZJO", "arn:aws:iam::881385135648:role/TVR-TurnBasedGame-Ifx-IamRoleA750FF82-1WG3PZX4OFZJO");
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
exports.HeapGame = HeapGame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhcGdhbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZWFwZ2FtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCx3Q0FBd0M7QUFDeEMsZ0RBQWdEO0FBQ2hELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQU83QixNQUFhLFFBQVMsU0FBUSxHQUFHLENBQUMsU0FBUztJQU96QyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQW9CO1FBQ2hFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDdEQsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDckUsb0JBQW9CLEVBQUUsSUFBSTtTQUMzQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixlQUFlO1FBQ2YsTUFBTSxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDdEQsWUFBWSxFQUFFLHFCQUFxQjtZQUNuQyxjQUFjLEVBQUU7Z0JBQ2QsU0FBUyxFQUFFLENBQUM7Z0JBQ1osZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLGdCQUFnQixFQUFFLEtBQUs7Z0JBQ3ZCLGNBQWMsRUFBRSxLQUFLO2FBQ3RCO1lBQ0Qsa0JBQWtCLEVBQUU7Z0JBQ2xCLFdBQVcsRUFBRTtvQkFDWCxRQUFRLEVBQUUsSUFBSTtpQkFDZjthQUNGO1lBQ0QsaUJBQWlCLEVBQUUsSUFBSTtTQUN4QixDQUFDLENBQUM7UUFFSCxtQkFBbUI7UUFDbkIsTUFBTSx5QkFBeUIsR0FDN0IsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUNwRCxXQUFXLEVBQUUsSUFBSTtZQUNqQixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztRQUVMLE1BQU0sY0FBYyxHQUFHLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDekUsUUFBUTtZQUNSLFNBQVMsRUFBRTtnQkFDVCxpQkFBaUIsRUFBRSxJQUFJO2FBQ3hCO1lBQ0QsZUFBZSxFQUFFLHlCQUF5QjtZQUMxQyxjQUFjLEVBQUUseUJBQXlCO1NBQzFDLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUN0QyxJQUFJLEVBQ0oscURBQXFELEVBQ3JELG9GQUFvRixDQUNyRixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUN0RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxxQkFBcUI7WUFDOUIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzlELFdBQVcsRUFBRTtnQkFDWCxlQUFlLEVBQUUsS0FBSyxDQUFDLFNBQVM7Z0JBQ2hDLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxnQkFBZ0I7Z0JBQ2xELFlBQVksRUFBRSxRQUFRLENBQUMsVUFBVTtnQkFDakMsTUFBTSxFQUFFLFdBQVc7YUFDcEI7WUFDRCxJQUFJLEVBQUUsV0FBVztTQUNsQixDQUFDLENBQUM7UUFFSCw0REFBNEQ7UUFDNUQsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0Y7QUF4RUQsNEJBd0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiQGF3cy1jZGsvYXdzLWxhbWJkYVwiO1xyXG5pbXBvcnQgKiBhcyBkeW5hbW9kYiBmcm9tIFwiQGF3cy1jZGsvYXdzLWR5bmFtb2RiXCI7XHJcbmltcG9ydCAqIGFzIGlhbSBmcm9tIFwiQGF3cy1jZGsvYXdzLWlhbVwiO1xyXG5pbXBvcnQgKiBhcyBjb2duaXRvIGZyb20gXCJAYXdzLWNkay9hd3MtY29nbml0b1wiO1xyXG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEhlYXBHYW1lUHJvcHMge1xyXG4gIC8qKiB0aGUgZnVuY3Rpb24gZm9yIHdoaWNoIHdlIHdhbnQgdG8gY291bnQgdXJsIGhpdHMgKiovXHJcbiAgLy8gZG93bnN0cmVhbTogbGFtYmRhLklGdW5jdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhlYXBHYW1lIGV4dGVuZHMgY2RrLkNvbnN0cnVjdCB7XHJcbiAgLyoqIGFsbG93cyBhY2Nlc3NpbmcgdGhlIGNvdW50ZXIgZnVuY3Rpb24gKiovXHJcbiAgcHVibGljIHJlYWRvbmx5IGhhbmRsZXI6IGxhbWJkYS5GdW5jdGlvbjtcclxuXHJcbiAgLyoqIHRoZSBoaXQgY291bnRlciB0YWJsZSAqL1xyXG4gIHB1YmxpYyByZWFkb25seSB0YWJsZTogZHluYW1vZGIuVGFibGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogSGVhcEdhbWVQcm9wcykge1xyXG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcclxuXHJcbiAgICBjb25zdCB0YWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCBcIkhlYXBHYW1lVGFibGVcIiwge1xyXG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogXCJnYW1lSWRcIiwgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcclxuICAgICAgc2VydmVyU2lkZUVuY3J5cHRpb246IHRydWUsXHJcbiAgICB9KTtcclxuICAgIHRoaXMudGFibGUgPSB0YWJsZTtcclxuXHJcbiAgICAvLyDwn5GHIFVzZXIgUG9vbFxyXG4gICAgY29uc3QgdXNlclBvb2wgPSBuZXcgY29nbml0by5Vc2VyUG9vbCh0aGlzLCBcInVzZXJwb29sXCIsIHtcclxuICAgICAgdXNlclBvb2xOYW1lOiBcIklQLXR1cm4tYmFzZWQtdXNlcnNcIixcclxuICAgICAgcGFzc3dvcmRQb2xpY3k6IHtcclxuICAgICAgICBtaW5MZW5ndGg6IDgsXHJcbiAgICAgICAgcmVxdWlyZUxvd2VyY2FzZTogdHJ1ZSxcclxuICAgICAgICByZXF1aXJlRGlnaXRzOiB0cnVlLFxyXG4gICAgICAgIHJlcXVpcmVVcHBlcmNhc2U6IGZhbHNlLFxyXG4gICAgICAgIHJlcXVpcmVTeW1ib2xzOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgICAgc3RhbmRhcmRBdHRyaWJ1dGVzOiB7XHJcbiAgICAgICAgcGhvbmVOdW1iZXI6IHtcclxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHNlbGZTaWduVXBFbmFibGVkOiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gVXNlciBQb29sIENsaWVudFxyXG4gICAgY29uc3QgY2xpZW50UmVhZFdyaXRlQXR0cmlidXRlcyA9XHJcbiAgICAgIG5ldyBjb2duaXRvLkNsaWVudEF0dHJpYnV0ZXMoKS53aXRoU3RhbmRhcmRBdHRyaWJ1dGVzKHtcclxuICAgICAgICBwaG9uZU51bWJlcjogdHJ1ZSxcclxuICAgICAgICBlbWFpbDogdHJ1ZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgY29uc3QgdXNlclBvb2xDbGllbnQgPSBuZXcgY29nbml0by5Vc2VyUG9vbENsaWVudCh0aGlzLCBcInVzZXJwb29sLWNsaWVudFwiLCB7XHJcbiAgICAgIHVzZXJQb29sLFxyXG4gICAgICBhdXRoRmxvd3M6IHtcclxuICAgICAgICBhZG1pblVzZXJQYXNzd29yZDogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgICAgd3JpdGVBdHRyaWJ1dGVzOiBjbGllbnRSZWFkV3JpdGVBdHRyaWJ1dGVzLFxyXG4gICAgICByZWFkQXR0cmlidXRlczogY2xpZW50UmVhZFdyaXRlQXR0cmlidXRlcyxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGxhbWJkYVRvU05TID0gaWFtLlJvbGUuZnJvbVJvbGVBcm4oXHJcbiAgICAgIHRoaXMsXHJcbiAgICAgIFwiVFZSLVR1cm5CYXNlZEdhbWUtSWZ4LUlhbVJvbGVBNzUwRkY4Mi0xV0czUFpYNE9GWkpPXCIsXHJcbiAgICAgIFwiYXJuOmF3czppYW06Ojg4MTM4NTEzNTY0ODpyb2xlL1RWUi1UdXJuQmFzZWRHYW1lLUlmeC1JYW1Sb2xlQTc1MEZGODItMVdHM1BaWDRPRlpKT1wiXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuaGFuZGxlciA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgXCJIZWFwSGFuZGxlclwiLCB7XHJcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxyXG4gICAgICBoYW5kbGVyOiBcImhlYXBjb3VudGVyLmhhbmRsZXJcIixcclxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vbGFtYmRhXCIpKSxcclxuICAgICAgZW52aXJvbm1lbnQ6IHtcclxuICAgICAgICBISVRTX1RBQkxFX05BTUU6IHRhYmxlLnRhYmxlTmFtZSxcclxuICAgICAgICBDT0dOSVRPX0NMSUVOVF9JRDogdXNlclBvb2xDbGllbnQudXNlclBvb2xDbGllbnRJZCxcclxuICAgICAgICBVU0VSX1BPT0xfSUQ6IHVzZXJQb29sLnVzZXJQb29sSWQsXHJcbiAgICAgICAgUkVHSU9OOiBcInVzLWVhc3QtMVwiLFxyXG4gICAgICB9LFxyXG4gICAgICByb2xlOiBsYW1iZGFUb1NOUyxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGdyYW50IHRoZSBsYW1iZGEgcm9sZSByZWFkL3dyaXRlIHBlcm1pc3Npb25zIHRvIG91ciB0YWJsZVxyXG4gICAgdGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKHRoaXMuaGFuZGxlcik7XHJcbiAgfVxyXG59XHJcbiJdfQ==