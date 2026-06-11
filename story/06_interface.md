# 第6話　新しい友達

## あらすじ

友達のアユムが「俺のロボット犬も動かしてくれ」と持ち込んだ。
でも、それはシロとはまったく別のメーカーの、別の設計のロボットだった。

「シロと同じ『犬』として扱いたいのに、クラスが違う…」
そこで登場するのが——**インターフェース**。

---

## 本文

「タクミ——！」

夏休みも終わりに近づいたある日、友達のアユムがタクミの家に飛び込んできた。

腕に抱えているのは、——

「それ、ロボット犬？」

「そう！ うちの物置にあったんだけど、動かなくて！」

アユムが机に置いたのは、シロよりひと回り小さいロボット犬だった。
赤いボディ。丸い目。シロとは似ても似つかないデザイン。

「何ていう機種？」

「わかんない。裏になんか書いてある」

裏返すと、刻印があった。

```
PET-101
by WAN-WAN Robotics
```

「WAN-WAN Robotics……聞いたことないメーカーだ」
「シロは ION-CORP 製で、こっちは WAN-WAN 製…」
「設計がぜんぜん違う」

---

タクミは PET-101 を PC に接続した。

シリアルモニタに表示された：

```
PET-101 bootloader v2.3
Waiting for program…
```

「プログラムなし……シロと同じだ」

でも、問題があった。

シロのクラス設計と、PET-101 のクラス設計。
別の設計だから、同じメソッド名かどうかもわからない。

「例えばシロは `bark()` だけど、PET-101 は `sound()` かもしれない」
「操作方法がバラバラだと、プログラムを書くのが大変だ…」

---

## インターフェース

**インターフェース** は、「こんなメソッドを持っていること」を約束するもの。

```java
interface RobotPet {
    void bark();
    void walk();
    void greet();
}
```

このインターフェースを「約束」として、シロにもPET-101にも守らせる。

```java
class ION_RS01 implements RobotPet {
    public void bark() { System.out.println("ワン！"); }
    public void walk() { System.out.println("歩く"); }
    public void greet() { System.out.println("こんにちは！"); }
}

class WAN_PET101 implements RobotPet {
    private boolean happy = true;

    public void bark() {
        if (happy) {
            System.out.println("キャンキャン！");
        } else {
            System.out.println("……");
        }
    }

    public void walk() { System.out.println("ちょこちょこ歩く"); }
    public void greet() { System.out.println("ピー！（挨拶音）"); }
}
```

そうすると——こんなことができる。

```java
public class Main {
    public static void main(String[] args) {
        RobotPet[] pets = {
            new ION_RS01(),
            new WAN_PET101()
        };

        for (RobotPet p : pets) {
            p.greet();
            p.bark();
            p.walk();
            System.out.println("---");
        }
    }
}
```

「両方とも `RobotPet` っていう同じ型として扱えるんだ！」

---

コンパイルして転送。

「動け！」

シリアルモニタに結果が流れた。

```
こんにちは！
ワン！
歩く
---
ピー！（挨拶音）
キャンキャン！
ちょこちょこ歩く
---
」

「動いた…！ 2匹とも！」

アユムが拍手した。

シロと赤いロボット犬が、机の上で向かい合っている。
シロのほうが大きくて、赤いほうが小さい。
お互いをじっと見つめている。

「……喧嘩しないといいけど」

「大丈夫だって。どっちもペットだろ」

## 知ったこと

- **インターフェース（interface）**：メソッドの「約束事」だけを定義する
- **implements**：「このインターフェースを守ります」という宣言
- インターフェースを使うと、違うクラスも同じ型として扱える
- 継承は「is-a」（〜の一種）、インターフェースは「〜できる」（能力）

## 次回予告

シロと赤いロボット犬（アユムが「ベニ」と名付けた）は仲良さそうだ。

でも、タクミは気づく。
「シロに『吠えろ』って命令したときの動きと、ベニに『吠えろ』って命令したときの動き——結果が違う」

同じ命令なのに、動きが違う。
これって——すごいことじゃないか？
