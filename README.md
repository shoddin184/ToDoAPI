# ToDoリスト

FastAPI + SQLModel で構築されたモダンなToDoリストアプリケーション

## 特徴

- ダークテーマのモダンなUI
- 完了したタスクを別セクションで管理
- スムーズなアニメーション効果
- レスポンシブデザイン
- RESTful API

## 技術スタック

### バックエンド
- **FastAPI** - 高速なPython Webフレームワーク
- **SQLModel** - SQLAlchemyとPydanticを統合したORM
- **SQLite** - データベース
- **Uvicorn** - ASGIサーバー

### フロントエンド
- **HTML5** - セマンティックマークアップ
- **CSS3** - CSS変数、Flexbox、アニメーション
- **Vanilla JavaScript** - フレームワークなしのシンプルな実装

## セットアップ

### 必要条件
- Python 3.8以上
- pip

### インストール

1. リポジトリをクローン
```bash
git clone <repository-url>
cd ToDoAPI
```

2. 依存関係をインストール
```bash
pip install fastapi sqlmodel uvicorn
```

3. サーバーを起動
```bash
python3 main.py
```

4. ブラウザでアクセス
```
http://localhost:8000
```

### 外部からアクセス可能にする

ローカルサーバーをインターネット経由で共有する場合:

```bash
# 別のターミナルで実行
ngrok http 8000
```

表示されたURLを共有すれば、誰でもアクセス可能になります。

## 使い方

### ToDoの追加
1. 上部の入力フィールドにタスクを入力
2. 「追加」ボタンをクリック、またはEnterキーを押下

### ToDoの完了
- 各タスクの左側にある丸いチェックボックスをクリック
- 完了したタスクは自動的に「完了」セクションに移動

### 完了タスクの表示
- 「完了 (○件)」をクリックして展開/折りたたみ

### ToDoの削除
- 各タスクの右側にある「Delete」ボタンをクリック

## API エンドポイント

### ToDo一覧取得
```
GET /todos/
```

### ToDo作成
```
POST /todos/
Content-Type: application/json

{
  "title": "タスク名",
  "done": false
}
```

### ToDo更新
```
PUT /todos/{todo_id}
Content-Type: application/json

{
  "id": 1,
  "title": "タスク名",
  "done": true
}
```

### ToDo削除
```
DELETE /todos/{todo_id}
```

### APIドキュメント
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## プロジェクト構造

```
ToDoAPI/
├── main.py              # FastAPIアプリケーションのエントリーポイント
├── database.py          # データベース設定
├── models.py            # SQLModelモデル定義
├── templates/
│   └── index.html       # フロントエンドHTML
├── static/
│   ├── style.css        # スタイルシート
│   └── app.js           # JavaScriptロジック
└── README.md            # このファイル
```

## デザイン仕様

### カラーパレット
- 背景色: `#1a1a1a` (薄暗い黒)
- セカンダリ背景: `#2a2a2a`
- ホバー背景: `#3a3a3a`
- テキスト: `#e0e0e0`
- ミュート: `#666`

### アニメーション
- フェードアウト: 0.3秒
- スライドイン: 0.3秒
- 展開/折りたたみ: 0.3秒

## ライセンス

MIT