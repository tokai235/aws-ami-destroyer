import delete_ami from "./delete_ami.js";
import delete_snapshot from "./delete_snapshot.js";

await delete_ami()

setTimeout(async () => {
  // AMI が削除されないと EBS Snapshot は削除できないので、少し待って実行する
  await delete_snapshot()
}, 1000)
