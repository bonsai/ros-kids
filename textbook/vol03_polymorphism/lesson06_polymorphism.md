# 第6課：多態性（ポリモーフィズム）

## 学習目標

- 多態性の概念を説明できる
- アップキャストとダウンキャストを理解する
- 動的ディスパッチのしくみを説明できる
- 多態性がコードをどうシンプルにするかを説明できる

## 1. ストーリー：同じリモコンで全部の犬を操作したい

研究所の机の上に、たくさんのリモコンが散らばっている。

「ポチ用リモコン」
「Aibo-X 用リモコン」
「スーパーロボット犬用リモコン」

「めんどくさい！どれも『犬』なんだから、1つのリモコンで全部操作したい！」

これこそが **多態性** が解決する問題。

## 2. 多態性とは

**多態性（ポリモーフィズム / polymorphism）** は、
「同じ操作でも、相手のクラスによって振る舞いが変わる」仕組みです。

```
polymorphism = poly（多くの） + morph（形） = 多くの形
```

### アナロジー：「再生ボタン」

| アプリ | ボタンを押す | 結果 |
|--------|-------------|------|
| 音楽アプリ | 再生ボタン | 音楽が流れる |
| 動画アプリ | 再生ボタン | 動画が再生される |
| 録音アプリ | 再生ボタン | 録音が再生される |

**ボタンは同じ「再生」なのに、中身の動きはアプリによって違う。**
これが多態性。

## 3. コードで見る多態性

```java
public interface Dog {
    void bark();
    void walk();
    void play();
}

public class RealDog implements Dog {
    public void bark() { System.out.println("ワンワン！"); }
    public void walk() { System.out.println("とことこ歩く"); }
    public void play() { System.out.println("ボールで遊ぶ"); }
}

public class RobotDog implements Dog {
    public void bark() { System.out.println("ピコーン！吠え音再生"); }
    public void walk() { System.out.println("モーター駆動で歩行"); }
    public void play() { System.out.println("プログラムされた遊び動作"); }
}
```

### 多態性の力

```java
public class Main {
    public static void main(String[] args) {

        Dog[] dogs = {
            new RealDog(),
            new RobotDog()
        };

        // 呼び出す側は「何の犬か」を気にしていない！
        for (Dog d : dogs) {
            d.bark();  // 勝手に正しい吠え方になる
            d.walk();  // 勝手に正しい歩き方になる
        }
    }
}
```

**呼び出す側（for 文）は Dog 型としか向き合っていない。**
それなのに、実際のオブジェクトに応じて正しい動作が選ばれる。

## 4. アップキャストと動的ディスパッチ

### アップキャスト

**アップキャスト** は、子クラスのオブジェクトを親クラス（またはインターフェース）型の変数に代入すること。

```java
Dog dog = new RealDog();  // アップキャスト（RealDog → Dog）
```

「具体的な型を、より抽象的な型として扱う」こと。

### 動的ディスパッチ

**動的ディスパッチ（dynamic dispatch）** は、
**実行時に** どのメソッドを呼ぶかが決まる仕組み。

```java
Dog dog;

if (isRealDog) {
    dog = new RealDog();
} else {
    dog = new RobotDog();
}

dog.bark(); // 実行時に isRealDog の値によって呼ばれる bark() が変わる
```

コンパイル時には決まらず、**実行時のオブジェクトの中身** で動作が決まる。

## 5. 多態性がなかった世界（比較）

### 多態性がない場合（if 文地獄）

```java
void makeSound(Object animal) {
    if (animal instanceof RealDog) {
        ((RealDog) animal).bark();
    } else if (animal instanceof RobotDog) {
        ((RobotDog) animal).bark();
    } else if (animal instanceof SuperRobotDog) {
        ((SuperRobotDog) animal).bark();
    }
    // 新しい犬の種類が増えるたびにここを書き換える
}
```

### 多態性がある場合

```java
void makeSound(Dog dog) {
    dog.bark();  // 新しい犬が増えても修正不要！
}
```

## 6. 多態性の3つの条件

1. **継承またはインターフェース実装** があること
2. **メソッドがオーバーライド** されていること
3. **親クラス（インターフェース）型の変数** で参照すること

この3つがそろうと、多態性が発動します。

## まとめ

- 多態性 ＝ 同じ操作でも相手によって動きが変わる
- アップキャスト：具体的な型 → 抽象的な型
- 動的ディスパッチ：実行時にメソッドが決まる
- 多態性で条件分岐が減り、コードがシンプルになる
- 多態性の3条件：継承/実装 + オーバーライド + 親クラス型

## キーワード

`多態性` `ポリモーフィズム` `アップキャスト` `動的ディスパッチ` `instanceof` `オーバーライド`

## 演習問題

1. `Dog` インターフェースに `eat()` メソッドを追加し、RealDog と RobotDog で異なる実装をしてください。
2. 多態性を使わずに if-else で動物の種類を判別するコードを書き、その問題点を説明してください。
3. `List<Dog>` を使って 3 種類以上の犬を追加し、それぞれの `bark()` を一度のループで呼び出すコードを書いてください。
