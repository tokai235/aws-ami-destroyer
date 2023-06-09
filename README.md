## 実行のための前提
1. `aws-sdk (ec2)`をインストールしておく
  - `yarn add @aws-sdk/client-ec2`
2. aws-cli を叩けるようにしておく
3. `.env.sample`をもとに`.env`を作成する

## 利用方法
### 1. 削除する AMI とEBS Snapshot のリストを取得
`node list.js`

### 2. リスト化したリソースを削除
`node delete.js`