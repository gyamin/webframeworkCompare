# 開発メモ

## expressプロジェクトの作成
#### nodeの準備
```
% nodenv install 16.17.0
% nodenv local 16.17.0
% node -v
v16.17.0
```

#### expressプロジェクト作成
```
% mkdir app
% cd app 
% npm init
% npm install express
```

#### アプリケーションの起動
```
 % node app.js 
Example app listening on port 3000
```

## mysql の接続
#### ライブラリ準備
```
% npm install --save mysql2
```

#### エラー対応
ER_NOT_SUPPORTED_AUTH_MODE
```
ib/router/layer.js:95:5) {
  code: 'ER_NOT_SUPPORTED_AUTH_MODE',
  errno: 1251,
  sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client',
  sqlState: '08004',
  fatal: true
```
nodeのmysqlがAUTH_MODEに対応していないため。はぁ...
サーバ側の認証設定を変更する。
```
mysql> ALTER USER 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'admin-pass';
Query OK, 0 rows affected (0.03 sec)

mysql> select USER,plugin from mysql.user;
+------------------+-----------------------+
| USER             | plugin                |
+------------------+-----------------------+
| admin            | mysql_native_password |
| root             | caching_sha2_password |
| mysql.infoschema | caching_sha2_password |
| mysql.session    | caching_sha2_password |
| mysql.sys        | caching_sha2_password |
| root             | caching_sha2_password |
+------------------+-----------------------+
6 rows in set (0.01 sec)
```
