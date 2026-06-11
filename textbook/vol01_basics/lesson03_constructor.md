# 第3課：コンストラクタと初期化

## 学習目標

- コンストラクタを定義できる
- `this` キーワードの役割を説明できる
- コンストラクタのオーバーロードができる
- 初期化のベストプラクティスを理解する

## 1. ストーリー：ロボット犬を組み立てよう

研究所に新しいロボット犬のキットが届いた。
組み立てるときに、最初から名前とバッテリーを設定したい。

前回までは、オブジェクトを作ってからプロパティを設定していた。

```java
RobotDog dog = new RobotDog();
dog.name = "Aibo-X";   // あとから設定
dog.battery = 100;     // あとから設定
```

「オブジェクトを作るときに、いっしょに初期設定できないかな？」

## 2. コンストラクタ

**コンストラクタ** は、オブジェクトが作られるときに自動的に呼ばれる特殊なメソッドです。

```java
public class RobotDog {
    private String name;
    private int battery;

    // コンストラクタ（クラス名と同じ名前）
    public RobotDog(String name, int battery) {
        this.name = name;
        this.battery = battery;
    }

    public RobotDog(String name) {
        this.name = name;
        this.battery = 100; // デフォルト値
    }
}
```

### 使い方

```java
public class Main {
    public static void main(String[] args) {

        RobotDog dog1 = new RobotDog("Aibo-X", 80);   // 名前とバッテリーを指定
        RobotDog dog2 = new RobotDog("ポチ");         // 名前だけ指定（バッテリーはデフォルト100）
    }
}
```

## 3. this キーワード

`this` は「自分自身のオブジェクト」を指します。

```java
public RobotDog(String name, int battery) {
    this.name = name;    // this.name = プロパティ, name = 引数
    this.battery = battery;
}
```

これがないと、プロパティと引数が同じ名前のとき区別がつきません。

## 4. コンストラクタのオーバーロード

同じ名前でも、引数の種類や数が違うコンストラクタを複数定義できます。
これを **オーバーロード（overload）** といいます。

```java
public class RobotDog {

    private String name;
    private int battery;
    private String model;

    // ① 全部指定
    public RobotDog(String name, int battery, String model) {
        this.name = name;
        this.battery = battery;
        this.model = model;
    }

    // ② 名前とモデルだけ（バッテリーはデフォルト）
    public RobotDog(String name, String model) {
        this(name, 100, model); // ①を呼び出す
    }

    // ③ 名前だけ（モデルは"Standard"）
    public RobotDog(String name) {
        this(name, 100, "Standard"); // ①を呼び出す
    }

    // ④ 引数なし（すべてデフォルト）
    public RobotDog() {
        this("名無しロボット", 100, "Standard"); // ①を呼び出す
    }
}
```

### 使い方

```java
public class Main {
    public static void main(String[] args) {

        RobotDog d1 = new RobotDog("Aibo-X", 80, "RX-1000");
        RobotDog d2 = new RobotDog("ポチ", "RX-500");
        RobotDog d3 = new RobotDog("タロウ");
        RobotDog d4 = new RobotDog();
    }
}
```

## 5. デフォルトコンストラクタ

コンストラクタを1つも書かないと、Java が自動的に **デフォルトコンストラクタ** を用意します。

```java
public RobotDog() {
    // 何もしない（プロパティはデフォルト値）
}
```

ただし、自分でコンストラクタを書くと、デフォルトコンストラクタは自動生成されなくなります。

## まとめ

- コンストラクタはオブジェクト生成時に自動実行される
- `this` は自分自身を指す
- オーバーロードで複数の初期化パターンを提供できる
- `this(...)` で別のコンストラクタを呼べる

## キーワード

`コンストラクタ` `this` `オーバーロード` `デフォルトコンストラクタ` `初期化`

## 演習問題

1. ロボット犬に `color`（色）プロパティを追加し、コンストラクタで設定できるようにしてください。
2. デフォルトコンストラクタで「名無しロボット・白・バッテリー50」をデフォルト値にするコードを書いてください。
3. コンストラクタ内でバッテリーの値が 0〜100 の範囲であることをチェックし、範囲外なら例外を投げる処理を追加してください。
