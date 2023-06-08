import {
  DescribeSnapshotsCommand,
} from "@aws-sdk/client-ec2";
import {
  ec2Client,
  describeImagesRequestParams,
  DELETE_SNAPSHOT_LIST_FILE,
  DELETE_TARGET_DATE,
} from "./config.js";
import fs from "fs";
import { stringify } from "csv-stringify/sync";
import dayjs from "dayjs";

let token = null;
let deleteSnapshots = [];
while (true) {
  const command = new DescribeSnapshotsCommand(
    describeImagesRequestParams(token)
  );

  const response = await ec2Client.send(command);
  console.log(response.SnapShots[0].Name);

  // 削除対象のものを 名前と作成日 のみ抽出
  const responseImages = response.SnapShots.filter(
    (snapshot) => dayjs(snapshot.CreationDate) < DELETE_TARGET_DATE
  ).map((snapshot) => ({
    createdAt: snapshot.CreationDate,
    snapshotName: snapshot.Name,
  }));

  deleteSnapshots.push(...responseImages);
  token = response.NextToken;

  if (response.NextToken == null) {
    // NextToken が null なら抜ける
    break;
  }
}

// 日付順にソート
deleteSnapshots = deleteSnapshots.sort((a, b) => dayjs(a.createdAt) - dayjs(b.createdAt));

// ファイルに書き出し
fs.writeFileSync(
  DELETE_SNAPSHOT_LIST_FILE,
  stringify(deleteSnapshots, {
    header: true,
  })
);
