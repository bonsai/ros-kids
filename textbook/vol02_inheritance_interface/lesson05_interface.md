# 第5課：インターフェースによる抽象化

## 学習目標

- インターフェースの概念を説明できる
- `interface` を定義できる
- `implements` でインターフェースを実装できる
- 継承とインターフェースの違いを説明できる

## 1. ストーリー：リアル犬とロボット犬を同じに扱いたい

研究所には「Aibo-X（ロボット犬）」と「ポチ（本物の犬）」がいる。

2匹はまったく違う——
- ポチは生物で、Aibo-X は機械
- ポチはご飯を食べ、Aibo-X は充電する
- ポチは散歩が必要、Aibo-X はプログラムで歩く

でも、どちらも「犬」として **同じ操作で扱いたい**。

ここで **インターフェース** が役立つ。

## 2. インターフェースとは

**インターフェース** は「こんなメソッドを持っていること」を約束するものです。
メソッドの「名前と引数と戻り値」だけを定義し、中身は書きません。

```java
// インターフェース：犬としての約束事
public interface Dog {
    void bark();
    void walk();
    void play();
}
```

インターフェースの中のメソッドは、すべて **抽象メソッド**（中身のないメソッド）です。

## 3. implements で実装する

インターフェースの「約束」を守るには `implements` を使います。

```java
public class RealDog implements Dog {

    private String name;

    public RealDog(String name) {
        this.name = name;
    }

    @Override
    public void bark() {
        System.out.println(name + "：ワンワン！（本物の吠え声）");
    }

    @Override
    public void walk() {
        System.out.println(name + "：とことこ散歩している…");
    }

    @Override
    public void play() {
        System.out.println(name + "：ボールを追いかけている！");
    }
}
```

```java
public class RobotDog implements Dog {

    private String name;

    public RobotDog(String name) {
        this.name = name;
    }

    @Override
    public void bark() {
        System.out.println(name + "：ピコーン！吠え音声再生");
    }

    @Override
    public void walk() {
        System.out.println(name + "：モーター駆動で歩行中…");
    }

    @Override
    public void play() {
        System.out.println(name + "：プログラムされた遊び動作を実行");
    }
}
```

## 4. 多態性（ポリモーフィズム）への準備

インターフェースを使うと、異なるクラスを **同じ型** として扱えます。

```java
public class Main {
    public static void main(String[] args) {

        Dog[] dogs = {
            new RealDog("ポチ"),
            new RobotDog("Aibo-X")
        };

        for (Dog d : dogs) {
            d.bark();  // 同じ bark() でも中身が違う！
            d.walk();
            d.play();
            System.out.println("---");
        }
    }
}
```

これが **多態性** への第一歩です。
（多態性は第6課で詳しく学びます）

## 5. 複数のインターフェースを実装する

Java のクラスは **1つのクラスしか継承できない** が、
**インターフェースは複数実装できる**。

```java
public interface Charger {
    void charge();
}

public interface GPS {
    double[] getLocation();
}

public class SuperRobotDog implements Dog, Charger, GPS {
    // Dog のメソッド + charge() + getLocation() をすべて実装する
}
```

## 6. 継承 vs インターフェース

| | 継承（extends） | インターフェース（implements） |
|---|---|---|
| 意味 | 「is-a」関係 | 「〜できる」能力 |
| 中身 | 実装を持てる | 抽象メソッドのみ |
| 複数 | 1つだけ | 複数可能 |
| 例 | RobotDog → SuperRobotDog | Dog, Charger, GPS |

### 使い分けの指針

- **継承**：機能の再利用が目的。親子関係が明確なとき。
- **インターフェース**：共通の操作を定義するのが目的。全く違うクラスを同じように扱いたいとき。

## まとめ

- インターフェースは「メソッドの約束事」を定義する
- `implements` でインターフェースを実装する
- 異なるクラスも同じインターフェース型として扱える
- 複数のインターフェースを同時に実装できる
- 継承は「is-a」、インターフェースは「〜できる」

## キーワード

`インターフェース` `implements` `抽象メソッド` `多態性` `複数実装` `能力`

## 演習問題

1. `Swimmable` インターフェースを作成し（`swim()` メソッド）、RobotDog に実装してください。
2. `Sensor` インターフェースを作成し（`double readDistance()`）、RobotDog に実装して距離を返すようにしてください。
3. RealDog と RobotDog に、共通のインターフェースを通して「お手」をさせるプログラムを書いてください。
