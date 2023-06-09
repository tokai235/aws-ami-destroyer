import {
  DeleteSnapshotCommand,
} from "@aws-sdk/client-ec2";
import {
  ec2Client,
  deleteSnapshotRequestParams,
  DELETE_SNAPSHOT_LIST_FILE,
} from "./config.js";
import fs from "fs";
import { parse } from "csv-parse/sync";

// EBS Snapshot
export default async function () {
  // csv から削除対象を取得
  const snapshotData = fs.readFileSync(DELETE_SNAPSHOT_LIST_FILE);
  const deleteSnapshots = parse(snapshotData, {
    columns: true,
  });

  const results = await Promise.allSettled(
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
}
