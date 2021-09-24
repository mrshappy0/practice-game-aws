"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStack = void 0;
const cdk = require("@aws-cdk/core");
const codecommit = require("@aws-cdk/aws-codecommit");
class PipelineStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        new codecommit.Repository(this, "AWS-Turn-Based-Game", {
            repositoryName: "WorkshopRepo",
        });
    }
}
exports.PipelineStack = PipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsc0RBQXNEO0FBRXRELE1BQWEsYUFBYyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzFDLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDbEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRTtZQUNyRCxjQUFjLEVBQUUsY0FBYztTQUMvQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFSRCxzQ0FRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xyXG5pbXBvcnQgKiBhcyBjb2RlY29tbWl0IGZyb20gXCJAYXdzLWNkay9hd3MtY29kZWNvbW1pdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBpcGVsaW5lU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICBuZXcgY29kZWNvbW1pdC5SZXBvc2l0b3J5KHRoaXMsIFwiQVdTLVR1cm4tQmFzZWQtR2FtZVwiLCB7XHJcbiAgICAgIHJlcG9zaXRvcnlOYW1lOiBcIldvcmtzaG9wUmVwb1wiLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==