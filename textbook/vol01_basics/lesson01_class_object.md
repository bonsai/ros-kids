# 第1課：クラスとオブジェクト

## 学習目標

- クラスとオブジェクトの違いを説明できる
- 自分のクラスを定義できる
- クラスからオブジェクト（インスタンス）を作れる
- メソッドを呼び出せる

## 1. ストーリー：研究所にロボット犬が届いた

きみはロボット研究所の新人エンジニア。
今日、段ボール箱が届いた。中には **ロボット犬「Aibo-X」** が入っている。

「よし、このロボット犬を動かしてみよう！」
でも…何から始めればいい？

ロボット犬を動かすには、**設計図（クラス）** が必要だ。

## 2. クラスってなに？

**クラス** は **設計図** です。
オブジェクト（実際のモノ）を作るための型紙のようなもの。

```
クラス＝設計図
オブジェクト＝設計図から作った実際のモノ（インスタンス）
```

```java
// これは設計図（クラス）
public class RobotDog {

    // プロパティ（状態）
    String name;
    int battery;

    // メソッド（動作）
    void bark() {
        System.out.println(name + "：ワンワン！");
    }

    void walk() {
        if (battery >= 10) {
            System.out.println(name + "：歩いている…");
            battery -= 10;
        } else {
            System.out.println(name + "：バッテリー切れ！");
        }
    }
}
```

## 3. オブジェクトを作る

設計図ができたら、実際に **オブジェクト（インスタンス）** を作ります。

```java
public class Main {
    public static void main(String[] args) {

        // オブジェクトを作る（インスタンス化）
        RobotDog myDog = new RobotDog();

        // プロパティに値を設定
        myDog.name = "Aibo-X";
        myDog.battery = 100;

        // メソッドを呼び出す
        myDog.bark();  // Aibo-X：ワンワン！
        myDog.walk();  // Aibo-X：歩いている…
        myDog.walk();  // Aibo-X：歩いている…
        myDog.walk();  // Aibo-X：歩いている…
        myDog.walk();  // Aibo-X：歩いている…
        myDog.walk();  // Aibo-X：歩いている…
        myDog.walk();  // Aibo-X：歩いている…
        myDog.walk();  // Aibo-X：歩いている…
        myDog.walk();  // Aibo-X：歩いている…
        myDog.walk();  // Aibo-X：歩いている…
        myDog.walk();  // Aibo-X：バッテリー切れ！
    }
}
```

### インスタンス化のしくみ

```java
RobotDog myDog = new RobotDog();
```

| 部分 | 意味 |
|------|------|
| `RobotDog` | 型（クラス名） |
| `myDog` | 変数名 |
| `new RobotDog()` | 新しいオブジェクトを作る |

## 4. 同じクラスから複数のオブジェクトを作れる

設計図が1枚あれば、何体でもロボット犬を作れます。

```java
public class Main {
    public static void main(String[] args) {

        RobotDog dog1 = new RobotDog();
        dog1.name = "Aibo-X";
        dog1.battery = 100;

        RobotDog dog2 = new RobotDog();
        dog2.name = "ポチ";
        dog2.battery = 80;

        dog1.bark();  // Aibo-X：ワンワン！
        dog2.bark();  // ポチ：ワンワン！
    }
}
```

`dog1` と `dog2` は **別々のオブジェクト** です。
名前もバッテリーも独立しています。

## まとめ

- クラスは設計図、オブジェクトは実際のモノ
- `new クラス名()` でオブジェクトを作る
- 同じクラスからたくさんのオブジェクトを作れる
- オブジェクトはそれぞれ独立した状態を持つ

## キーワード

`クラス` `オブジェクト` `インスタンス` `インスタンス化` `new` `プロパティ` `メソッド`

## 演習問題

1. ロボット犬に `charge()` メソッドを追加してください（バッテリーを満タンにする）。
2. `bark()` を呼ぶたびにバッテリーが 5 減るように変更してください。
3. 3 体のロボット犬を作り、それぞれ別の名前をつけて吠えさせてください。
