# 第2話　電源を入れた

## あらすじ

ロボット犬にはプログラムが必要だ。
タクミは Java の基本を調べながら、最初のプログラムを書く。

「Hello, World」ならぬ「Hello, Robot」。

目指せ——起動。

---

## 本文

「Main.class がない……」

タクミは検索しまくった。

Java のプログラムは `.java` というファイルに書いて、
`javac` という道具でコンパイルすると `.class` ファイルができる。

つまり、`Main.java` を書けばいいんだ。

タクミはテキストエディタを開いて、打ち込んだ。

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("起動します");
    }
}
```

意味はよくわからない。でも、とにかく「起動します」って表示するプログラムらしい。

コンパイルした。

```
javac Main.java
```

エラーは出なかった。カレントディレクトリに `Main.class` ができている。

「これをロボット犬の中に送り込む…？」

サービスマニュアルをもう一度読むと、こう書いてあった。

```
ファイル転送:
シリアル接続後、 internal/ ディレクトリに Main.class を配置してください。
```

タクミは言われた通りに、`Main.class` をロボット犬に転送した。

```
transferred: Main.class → /internal/system/Main.class
```

「…よし、起動してみよう」

USB-C ケーブルを抜いて、もう一度差し込んだ。

ロボット犬の耳がピクリ。

目が開く。

シリアルモニタに文字が流れた。

```
Booting RS-01…
JVM loaded.
Main class found.
Executing…

--- 起動します ---

System: 起動完了。音声モジュール未初期化。
```

ロボット犬が立ち上がった。

そして——

「……」

こっちを見ている。

「あ、あの……こんにちは？」

ロボット犬は首をかしげた。

「そうか。喋るプログラムもないんだな……」

---

タクミはもう一度エディタを開いた。

「喋らせたい。…どう書くんだ？」

検索すると、メソッドというものを使うらしい。
「メソッド」は「動き」のこと。ロボット犬に「動き」を教えてやればいい。

```java
public class Main {
    public static void main(String[] args) {
        greet();
    }

    static void greet() {
        System.out.println("こんにちは");
        System.out.println("ぼくはRS-01です");
        System.out.println("よろしく");
    }
}
```

コンパイルして転送して再起動。

```
---
こんにちは
ぼくはRS-01です
よろしく
---
```

「喋った……！」

ロボット犬が「こんにちは」と言った——少なくとも、シリアルモニタに表示された。

ロボット犬は青い目をぱちぱちさせて、また首をかしげた。

## この話で出てきた概念

### クラス
```java
public class Main {
```
プログラムを入れる「箱」。箱の名前は `Main`。

### main メソッド
```java
public static void main(String[] args) {
```
プログラムの「入口」。ここから実行が始まる。

### メソッド呼び出し
```java
greet();
```
他の「動き」を呼び出すこと。

### println
```java
System.out.println("こんにちは");
```
文字を表示する命令。

## 次回予告

ロボット犬に名前をつけたい。
でも、プログラムを直すたびに `Main.java` を書き換えるのはめんどうだ。

「名前を変えるには、毎回コンパイルし直さないといけないの？」

新しいアイデアが必要だ。
