## 実行のための前提
1. `aws-sdk (ec2)`をインストールしておく
  - `yarn add @aws-sdk/client-ec2`
2. aws-cli を叩けるようにしておく

## 利用方法
### 削除する AMI とEBS Snapshot のリストを取得
`node list.js`