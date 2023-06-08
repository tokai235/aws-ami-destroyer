import { EC2Client } from "@aws-sdk/client-ec2";
import dayjs from "dayjs";
import * as dotenv from 'dotenv'
dotenv.config()

// 実行日より5年以上前のものを削除対象とする
export const DELETE_TARGET_DATE = dayjs().subtract(5, "year");

export const ec2Client = new EC2Client({region: "ap-northeast-1"});

export const describeImagesRequestParams = (token) => ({
  Owners: [process.env.ACCOUNT_ID], // 対象のアカウントID
  DryRun: false,
  MaxResults: 25, // 25件ずつ取得
  NextToken: token,
});

export const describeSnapshotsRequestParams = (token) => ({
  OwnerIds: [process.env.ACCOUNT_ID], // 対象のアカウントID
  DryRun: false,
  MaxResults: 25, // 25件ずつ取得
  NextToken: token,
});

export const DELETE_AMI_LIST_FILE = "delete_ami_list.csv";
export const DELETE_SNAPSHOT_LIST_FILE = "delete_snapshot_list.csv";
