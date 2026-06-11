# 第2話：どの犬も同じボタンで動かしたい

研究所に届いたロボット犬「Aibo-X」と本物の犬「ポチ」。
2匹は見た目も中身も違うけど、どちらも「犬」として扱いたい。

そんなときに便利なのが **インターフェース**。

## インターフェースとは

「こんなメソッドを持っていること」を約束するもの。

```java
interface Dog {
    void bark();
    void walk();
    void play();
}
```

## 実装クラス

```java
class RealDog implements Dog {
    public void bark() { System.out.println("ワンワン！"); }
    public void walk() { System.out.println("とことこ歩く"); }
    public void play() { System.out.println("ボールで遊ぶ"); }
}

class RobotDog implements Dog {
    public void bark() { System.out.println("ピコーン！（吠え音再生）"); }
    public void walk() { System.out.println("モーター駆動で歩行"); }
    public void play() { System.out.println("プログラムされた遊び動作"); }
}
```

## ポイント
- **インターフェース** ＝ 操作パネルの共通デザイン
- **実装クラス** ＝ 中身の動きはそれぞれ違ってOK
