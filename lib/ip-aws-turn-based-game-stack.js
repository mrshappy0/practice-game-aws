"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpAwsTurnBasedGameStack = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const apigw = require("@aws-cdk/aws-apigateway");
const heapgame_1 = require("./heapgame");
const cdk_dynamo_table_viewer_1 = require("cdk-dynamo-table-viewer");
class IpAwsTurnBasedGameStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const hello = new lambda.Function(this, "HelloHandler", {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset("lambda"),
            handler: "hello.handler",
        });
        const helloWithHeapGame = new heapgame_1.HeapGame(this, "HeapGame", {
            downstream: hello,
        });
        // defines an API Gateway REST API resource backed by our "hello" function.
        new apigw.LambdaRestApi(this, "Endpoint", {
            handler: helloWithHeapGame.handler,
        });
        new cdk_dynamo_table_viewer_1.TableViewer(this, "ViewHeapGameTable", {
            title: "Nim Game Status - DynamoDB Table Viewer",
            // sortBy: "-hits",
            table: helloWithHeapGame.table,
        });
    }
}
exports.IpAwsTurnBasedGameStack = IpAwsTurnBasedGameStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXAtYXdzLXR1cm4tYmFzZWQtZ2FtZS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlwLWF3cy10dXJuLWJhc2VkLWdhbWUtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLDhDQUE4QztBQUM5QyxpREFBaUQ7QUFDakQseUNBQXNDO0FBQ3RDLHFFQUFzRDtBQUV0RCxNQUFhLHVCQUF3QixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3BELFlBQVksS0FBYyxFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM1RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN0RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsT0FBTyxFQUFFLGVBQWU7U0FDekIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLG1CQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUN2RCxVQUFVLEVBQUUsS0FBSztTQUNsQixDQUFDLENBQUM7UUFFSCwyRUFBMkU7UUFDM0UsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDeEMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLE9BQU87U0FDbkMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxxQ0FBVyxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUN6QyxLQUFLLEVBQ0gseUNBQXlDO1lBQzNDLG1CQUFtQjtZQUNuQixLQUFLLEVBQUUsaUJBQWlCLENBQUMsS0FBSztTQUMvQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUExQkQsMERBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIGFwaWd3IGZyb20gXCJAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheVwiO1xuaW1wb3J0IHsgSGVhcEdhbWUgfSBmcm9tIFwiLi9oZWFwZ2FtZVwiO1xuaW1wb3J0IHsgVGFibGVWaWV3ZXIgfSBmcm9tIFwiY2RrLWR5bmFtby10YWJsZS12aWV3ZXJcIjtcblxuZXhwb3J0IGNsYXNzIElwQXdzVHVybkJhc2VkR2FtZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5BcHAsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGhlbGxvID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcIkhlbGxvSGFuZGxlclwiLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCwgLy8gZXhlY3V0aW9uIGVudmlyb25tZW50XG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoXCJsYW1iZGFcIiksIC8vIGNvZGUgbG9hZGVkIGZyb20gXCJsYW1iZGFcIiBkaXJlY3RvcnlcbiAgICAgIGhhbmRsZXI6IFwiaGVsbG8uaGFuZGxlclwiLCAvLyBmaWxlIGlzIFwiaGVsbG9cIiwgZnVuY3Rpb24gaXMgXCJoYW5kbGVyXCJcbiAgICB9KTtcblxuICAgIGNvbnN0IGhlbGxvV2l0aEhlYXBHYW1lID0gbmV3IEhlYXBHYW1lKHRoaXMsIFwiSGVhcEdhbWVcIiwge1xuICAgICAgZG93bnN0cmVhbTogaGVsbG8sXG4gICAgfSk7XG5cbiAgICAvLyBkZWZpbmVzIGFuIEFQSSBHYXRld2F5IFJFU1QgQVBJIHJlc291cmNlIGJhY2tlZCBieSBvdXIgXCJoZWxsb1wiIGZ1bmN0aW9uLlxuICAgIG5ldyBhcGlndy5MYW1iZGFSZXN0QXBpKHRoaXMsIFwiRW5kcG9pbnRcIiwge1xuICAgICAgaGFuZGxlcjogaGVsbG9XaXRoSGVhcEdhbWUuaGFuZGxlcixcbiAgICB9KTtcblxuICAgIG5ldyBUYWJsZVZpZXdlcih0aGlzLCBcIlZpZXdIZWFwR2FtZVRhYmxlXCIsIHtcbiAgICAgIHRpdGxlOlxuICAgICAgICBcIk5pbSBHYW1lIFN0YXR1cyAtIER5bmFtb0RCIFRhYmxlIFZpZXdlclwiLFxuICAgICAgLy8gc29ydEJ5OiBcIi1oaXRzXCIsXG4gICAgICB0YWJsZTogaGVsbG9XaXRoSGVhcEdhbWUudGFibGUsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==