import {
  DescribeImagesCommand
} from "@aws-sdk/client-ec2";
import { ec2Client, describeImagesRequestParams, DELETE_AMI_LIST_FILE, DELETE_SNAPSHOT_LIST_FILE } from "./config.js";
import fs from "fs";
import { stringify } from "csv-stringify/sync";

let token = null;
const command = new DescribeImagesCommand(
  describeImagesRequestParams(token)
);

const response = await ec2Client.send(command);
console.log({ response });

// 名前と作成日を抽出
const deleteAmis = response.Images.map(
  (image) => ({
    imageName: image.Name,
    createdAt: image.CreationDate,
  })
);

// ファイルに書き出し
fs.writeFileSync(
  DELETE_AMI_LIST_FILE,
  stringify(
    deleteAmis,
    {
      header: true,
    }
  )
);

token = response.NextToken;
