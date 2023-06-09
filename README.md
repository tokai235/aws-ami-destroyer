# AWS AMI Destroyer
増えすぎた AMI と EBS Snapshot を削除するコマンドです。

## やっていること
1. `.env` に設定した AWS アカウントにある AMI と Snapshot のうち、対象期間(5年)以前のものを抽出して csv にします。
  - 削除していいリソースかどうかはここでチェックしてください
2. csv にリストアップされたリソースを削除します
  - AMI の登録を解除します
  - Snapshot を削除します


## 実行のための前提
1. `yarn add @aws-sdk/client-ec2`
2. aws-cli を叩けるようにしておく
3. `.env.sample` をもとに `.env` を作成する
4. `config.js` の `DryRun` をすべて `false` にする
  - 誤実行を防ぐため、Git には `DryRun: true` の状態で commit している


## 利用方法
### 1. 削除する AMI とEBS Snapshot のリストを取得
`node list.js`

`delete_snapshot_list.csv` と`delete_ami_list.csv` に削除予定のリソースが書き込まれます

### 2. リスト化したリソースを削除
`node delete.js`

`delete_snapshot_list.csv` と`delete_ami_list.csv` に書き込まれたリソースを削除します