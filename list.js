import {
  DescribeImagesCommand
} from "@aws-sdk/client-ec2";
import fs from "fs";
import { ec2Client, describeImagesRequestParams } from "./config.js";

let token = null;
const command = new DescribeImagesCommand(
  describeImagesRequestParams(token)
);

try {
  const response = await ec2Client.send(command);
  console.log({ response });

  response.Images.map((image) => {
    console.log(`${image.Name}, ${image.CreationDate}`);
  });

  token = response.NextToken;
} catch (err) {
  console.error(err);
}
