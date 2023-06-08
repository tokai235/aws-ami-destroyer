import {
  DeregisterImageCommand,
  DeleteSnapshotCommand,
} from "@aws-sdk/client-ec2";
import {
  ec2Client,
  deregisterImageRequestParams,
  deleteSnapshotRequestParams,
  DELETE_AMI_LIST_FILE,
  DELETE_SNAPSHOT_LIST_FILE,
} from "./config.js";
import fs from "fs";
import { parse } from "csv-parse/sync";

// csv から削除対象を取得
const amiData = fs.readFileSync(DELETE_AMI_LIST_FILE);
const deleteAmis = parse(amiData, {
  columns: true,
});

  const imageId = deleteAmis[0].id

  const imageCommand = new DeregisterImageCommand(
    deregisterImageRequestParams(imageId)
  );

await ec2Client.send(imageCommand);


// csv から削除対象を取得
const snapshotData = fs.readFileSync(DELETE_SNAPSHOT_LIST_FILE);
const deleteSnapshots = parse(snapshotData, {
  columns: true,
});

const snapshotId = deleteSnapshots[0].id;

const snapshotCommand = new DeleteSnapshotCommand(
  deleteSnapshotRequestParams(snapshotId)
);

await ec2Client.send(snapshotCommand);



