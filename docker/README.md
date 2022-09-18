# dockerコンテナ構築メモ

## mysql

### データ作成
テストデータとして郵便番号データ(csv)を投入する。
テーブルのカラムとcsvファイルのカラムが一致していないが、
loadコマンドを利用して取り込みする。

#### コンテナにcsvファイルを配置
```
COPY csv/KEN_ALL.CSV /tmp/KEN_ALL.CSV
```

#### データ投入

コンテナにログイン
```
% docker-compose exec -it load-test-mysql bash
bash-4.4#
```

ファイルの確認
```
bash-4.4# ls -l /tmp/
total 12048
-rw-rw-r-- 1 root root 12336811 Aug 25 17:54 KEN_ALL.CSV
```

loadコマンドで登録
```
bash-4.4# mysql -u root -p load_test --local-infile=1
Enter password: 

mysql> SET GLOBAL local_infile=on;
Query OK, 0 rows affected (0.00 sec)

LOAD DATA LOCAL INFILE "KEN_ALL_UTF8.CSV" \
INTO TABLE postal_code \
FIELDS TERMINATED BY ',' \
OPTIONALLY ENCLOSED BY '"' \
LINES TERMINATED BY '\n' \
(@1,@2,@3,@4,@5,@6,@7,@8,@9,@10,@11,@12,@13,@14,@15) \
SET postal_code=@3, address_kana_1=@4, address_kana_2=@5, address_kana_3=@6, address_1=@7, address_2=@8, address_3=@9;
```


### エラー対応
#### 権限ない
```
ERROR 3948 (42000): Loading local data is disabled; this must be enabled on both the client and server sides
```
クライアント、サーバ共にload local dataを有効にしないとコマンドが使えない。
- クライアント `# mysql -u root -p load_test --local-infile=1`
- サーバ `mysql> SET GLOBAL local_infile=on;`

#### 文字コードが違う
```
ERROR 1300 (HY000): Invalid utf8mb4 character string: '"ί'
```
CSVファイルをUTF8に変換して取り込み。