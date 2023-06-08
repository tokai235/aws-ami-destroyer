import {
  DescribeImagesCommand
} from "@aws-sdk/client-ec2";
import {
  ec2Client,
  describeImagesRequestParams,
  DELETE_AMI_LIST_FILE,
  DELETE_SNAPSHOT_LIST_FILE,
  DELETE_TARGET_DATE,
} from "./config.js";
import fs from "fs";
import { stringify } from "csv-stringify/sync";
import dayjs from "dayjs";

let token = null;
let deleteAmis = [];
while (true) {
  const command = new DescribeImagesCommand(describeImagesRequestParams(token));

  const response = await ec2Client.send(command);
  console.log(response.Images[0].Name);

  // 削除対象のものを 名前と作成日 のみ抽出
  const responseImages = response.Images.filter(
    (image) => dayjs(image.CreationDate) < DELETE_TARGET_DATE
  ).map((image) => ({
    createdAt: image.CreationDate,
    imageName: image.Name,
  }));

  deleteAmis.push(...responseImages);
  token = response.NextToken;

  if (response.NextToken == null) {
    // NextToken が null なら抜ける
    break;
  }
}

// 日付順にソート
deleteAmis = deleteAmis.sort((a, b) => dayjs(a.createdAt) - dayjs(b.createdAt));

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
