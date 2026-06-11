# R 検定 データ帳

各章の理解度を確認するための検定問題を蓄積する。
後ほどクイズや試験に自動組み込み可能な形式で管理する。

---

## 書式

一つの問題は以下の YAML + body 形式で記述する。

```yaml
---
chapter: 1          # 該当章 (1-11)
type: multiple      # multiple | text | code
difficulty: basic   # basic | medium | advanced
tags: [クラス, オブジェクト]
---
問題文

- 選択肢A
- 選択肢B
- 選択肢C ← 正解は末尾に ← を付ける
- 選択肢D
```

---

## 問題一覧

<!--
  ここに R 検定の問題を追加していく。
  追記するときは chapter 番号順に並べること。
-->

### Chapter 1: 拾った

```yaml
---
chapter: 1
type: multiple
difficulty: basic
tags: [ストーリー, RS-01]
---
タクミがロボット犬を見つけた場所はどこ？
- 公園
- 粗大ゴミの集積所 ←
- 学校の教室
- 自動販売機の横
```

```yaml
---
chapter: 1
type: text
difficulty: basic
tags: [エラー, Main]
---
起動時に表示されたエラーメッセージは？
> Main class not found
```

### Chapter 2: 電源を入れた

```yaml
---
chapter: 2
type: multiple
difficulty: basic
tags: [mainメソッド]
---
Java プログラムの実行が始まるメソッドは？
- public static void main(String[] args) ←
- public void start()
- public static void run()
- void execute()
```

```yaml
---
chapter: 2
type: code
difficulty: basic
tags: [println]
---
画面に「起動します」と表示するコードを書け
> System.out.println("起動します");
```

### Chapter 3: 名前をつけた

```yaml
---
chapter: 3
type: multiple
difficulty: basic
tags: [クラス, オブジェクト]
---
クラスとは何の例えか？
- 料理のレシピ
- 設計図 ←
- 住所録
- 電話帳
```

```yaml
---
chapter: 3
type: text
difficulty: basic
tags: [インスタンス]
---
new RobotDog() で作られるものの名前は？
> オブジェクト
```

### Chapter 4: 蓋を開けた

```yaml
---
chapter: 4
type: multiple
difficulty: basic
tags: [カプセル化, private]
---
カプセル化で使うアクセス修飾子のうち、同じクラスからしかアクセスできないものは？
- public
- protected
- private ←
- static
```

### Chapter 5: 部品を交換した

```yaml
---
chapter: 5
type: multiple
difficulty: basic
tags: [継承, extends]
---
継承で使うキーワードは？
- implements
- extends ←
- inherits
- super
```

```yaml
---
chapter: 5
type: multiple
difficulty: medium
tags: [オーバーライド]
---
親クラスのメソッドを子クラスで上書きすることを何と呼ぶ？
- オーバーロード
- オーバーライド ←
- オーバーフロー
- オーバーキル
```

### Chapter 6: 新しい友達

```yaml
---
chapter: 6
type: multiple
difficulty: basic
tags: [インターフェース, implements]
---
インターフェースを実装するときに使うキーワードは？
- extends
- implements ←
- interface
- realize
```

### Chapter 7: 友達を増やした

```yaml
---
chapter: 7
type: multiple
difficulty: basic
tags: [多態性, ポリモーフィズム]
---
多態性（ポリモーフィズム）を一言で言うと？
- クラスを複数継承すること
- 同じメソッド呼び出しでもオブジェクトによって動きが変わること ←
- メソッド名を複数定義すること
- 変数を自由に変換すること
```

### Chapter 8: 頭脳を作り替えた

```yaml
---
chapter: 8
type: multiple
difficulty: medium
tags: [戦略パターン, DI]
---
外部から依存オブジェクトを受け取る設計を何と呼ぶか？
- ファクトリパターン
- 依存性注入（DI） ←
- シングルトン
- オブザーバーパターン
```

### Chapter 9: 考えられるようになった

```yaml
---
chapter: 9
type: multiple
difficulty: medium
tags: [世界モデル, predict]
---
世界モデルの predict メソッドの役割は？
- 状態を保存する
- 行動の結果を予測する ←
- ロボットを動かす
- エラーを検出する
```

### Chapter 10: 仲間と会話する

```yaml
---
chapter: 10
type: multiple
difficulty: medium
tags: [ROS, pub/sub]
---
ROS において publish と subscribe の正しい組み合わせは？
- publish=受信, subscribe=送信
- publish=送信, subscribe=受信 ←
- 両方とも送信
- 両方とも受信
```

### Chapter 11: チームで動く

```yaml
---
chapter: 11
type: multiple
difficulty: advanced
tags: [マルチエージェント]
---
マルチエージェントシステムの特徴として最も適切なものは？
- 1つのプログラムですべてを制御する
- 複数の独立したエージェントが協調して問題を解決する ←
- 人間がすべての操作を行う
- ロボットが1台だけ存在する
```

---

## 進捗

| 章 | 問題数 | 状態 |
|----|--------|------|
| 1  | 2      | ✅    |
| 2  | 2      | ✅    |
| 3  | 2      | ✅    |
| 4  | 1      | ✅    |
| 5  | 2      | ✅    |
| 6  | 1      | ✅    |
| 7  | 1      | ✅    |
| 8  | 1      | ✅    |
| 9  | 1      | ✅    |
| 10 | 1      | ✅    |
| 11 | 1      | ✅    |
| **計** | **15** | |

<!-- 追記ルール:
1. YAML front matter は --- で囲む
2. chapter 番号は 1-11
3. type: multiple | text | code
4. difficulty: basic | medium | advanced
5. 選択肢の正解には末尾に ← をつける
6. text/code タイプは > の後に模範解答を書く
-->
