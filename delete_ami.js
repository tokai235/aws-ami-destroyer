import {
  DeregisterImageCommand,
} from "@aws-sdk/client-ec2";
import {
  ec2Client,
  deregisterImageRequestParams,
  DELETE_AMI_LIST_FILE,
} from "./config.js";
import fs from "fs";
import { parse } from "csv-parse/sync";

// AMI
export default async function () {
  // csv から削除対象を取得
  const amiData = fs.readFileSync(DELETE_AMI_LIST_FILE);
  const deleteAmis = parse(amiData, {
    columns: true,
  });

  const results = await Promise.allSettled(
    deleteAmis.map((ami) => {
      console.log(`Deleting AMI ${ami.id}...`);
      const imageCommand = new DeregisterImageCommand(
        deregisterImageRequestParams(ami.id)
      );

      // result は空データしか返ってこない
      ec2Client.send(imageCommand);
    })
  );
  console.log(results);
}
