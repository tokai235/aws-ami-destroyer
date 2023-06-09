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

// AMI
// csv から削除対象を取得
const amiData = fs.readFileSync(DELETE_AMI_LIST_FILE);
const deleteAmis = parse(amiData, {
  columns: true,
});

let results = await Promise.allSettled(
  deleteAmis.map((ami) => {
    console.log(`Deleting AMI ${ami.id}...`);
    const imageCommand = new DeregisterImageCommand(
      deregisterImageRequestParams(ami.id)
    );

    // result は空データしか返ってこない
    ec2Client.send(imageCommand);
  })
)
console.log(results);


// EBS Snapshot
// csv から削除対象を取得
const snapshotData = fs.readFileSync(DELETE_SNAPSHOT_LIST_FILE);
const deleteSnapshots = parse(snapshotData, {
  columns: true,
});

results = await Promise.allSettled(
  deleteSnapshots.map((snapshot) => {
    console.log(`Deleting Snapshot ${snapshot.id}...`);
    const snapshotCommand = new DeleteSnapshotCommand(
      deleteSnapshotRequestParams(snapshot.id)
    );

    // result は空データしか返ってこない
    ec2Client.send(snapshotCommand);
  })
)
console.log(results);

