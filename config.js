import { EC2Client } from "@aws-sdk/client-ec2";

export const ec2Client = new EC2Client();

export const describeImagesRequestParams = (token) => ({
  ExecutableUsers: ["self"],
  DryRun: false,
  MaxResults: 25,
  NextToken: token,
});
