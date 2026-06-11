# 第0課：Java にようこそ

## 学習目標

- Java とは何かを説明できる
- はじめての Java プログラムを書いて実行できる
- 変数とデータ型を理解する
- プレイグラウンドでコードを動かせる

## 1. Java ってどんな言語？

Java は **世界でもっとも使われているプログラミング言語のひとつ** です。

- 1995 年に Sun Microsystems が開発
- 「Write Once, Run Anywhere」（一度書けばどこでも動く）
- ロボット、スマホアプリ、Web サービス、銀行システムまで幅広く使われる

### なぜロボティクスに Java なのか？

- 大規模システムに向いている（ロボットは多くの部品が協調して動く）
- オブジェクト指向が言語レベルでしっかりしている
- Android のアプリは Java / Kotlin で書かれる

## 2. 最初のプログラム

Java のプログラムは **クラス** の中に書きます。
「クラス」はまだよくわからなくて大丈夫。今は「プログラムを入れる箱」だと思ってください。

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("こんにちは、ロボット犬の世界！");
    }
}
```

### 解説

| 部分 | 意味 |
|------|------|
| `public class Main` | クラス宣言。Main という名前の箱 |
| `public static void main(String[] args)` | プログラムの入口。ここから実行が始まる |
| `System.out.println(...)` | 画面に文字を表示する命令 |
| `//` | コメント。プログラムの説明を書く（実行はされない） |

## 3. プレイグラウンドで動かしてみよう

1. https://bonsai.github.io/ros-kids/playground/ を開く
2. 左のテキストエリアに上のコードを書く
3. 「実行」ボタンを押す
4. 右側に結果が表示される

## 4. 変数とデータ型

プログラムは **変数** を使ってデータを扱います。

```java
public class Main {
    public static void main(String[] args) {
        // 変数の宣言と代入
        String name = "ポチ";
        int age = 3;
        double weight = 12.5;
        boolean isRobot = false;

        System.out.println("名前: " + name);
        System.out.println("年齢: " + age);
        System.out.println("体重: " + weight);
        System.out.println("ロボット？: " + isRobot);
    }
}
```

### Java の主なデータ型

| 型 | 意味 | 例 |
|----|------|-----|
| `int` | 整数 | `42`, `-3`, `0` |
| `double` | 小数 | `3.14`, `-0.5` |
| `String` | 文字列 | `"こんにちは"` |
| `boolean` | 真偽値 | `true`, `false` |

## まとめ

- Java は「一度書けばどこでも動く」言語
- プログラムは `main` メソッドから始まる
- `System.out.println()` で画面に表示する
- 変数を使うとデータを名前で扱える

## キーワード

`クラス` `main メソッド` `変数` `データ型` `String` `int` `boolean`

## 演習問題

1. 自分の名前を表示するプログラムを書いてください。
2. ロボット犬の名前・バッテリー残量（%・整数）・稼働時間（時間・小数）を変数で宣言し、表示するプログラムを書いてください。
3. `println` と `print` の違いを調べてください（ヒント：改行の有無）。
