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

(async () => {
  for await (ami of [deleteAmis[0]]) {
    console.log(`Deleting AMI ${ami.id}...`);
    const imageCommand = new DeregisterImageCommand(
      deregisterImageRequestParams(ami.id)
    );

    // result は空データしか返ってこない
    await ec2Client.send(imageCommand);
  }
})();


// EBS Snapshot
// csv から削除対象を取得
const snapshotData = fs.readFileSync(DELETE_SNAPSHOT_LIST_FILE);
const deleteSnapshots = parse(snapshotData, {
  columns: true,
});

(async () => {
  for await (snapshot of [deleteSnapshots[0]]) {
    console.log(`Deleting Snapshot ${snapshot.id}...`);
    const snapshotCommand = new DeleteSnapshotCommand(
      deleteSnapshotRequestParams(snapshot.id)
    );

    // result は空データしか返ってこない
    await ec2Client.send(snapshotCommand);
  }
})();

