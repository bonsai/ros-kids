# 第2課：カプセル化

## 学習目標

- カプセル化の概念を説明できる
- `private` と `public` を使い分けられる
- getter / setter を実装できる
- カプセル化がなぜ重要なのかを説明できる

## 1. ストーリー：ロボット犬が壊れた

研究室で、新人エンジニアの田中くんが叫んだ。

「ロボット犬のバッテリーがマイナスになってる！」

どうやら誰かが直接 `dog.battery = -999;` と書いたらしい。

こんなことを防ぐにはどうすればいいだろう？

## 2. カプセル化とは

**カプセル化（Encapsulation）** は、
「中身を隠して、外から触れるところだけ見せる」仕組みです。

```
カプセル化 ＝ データ（プロパティ）を private で保護する
           ＋ 必要な操作だけ public メソッドで公開する
```

### カプセル化の前（悪い例）

```java
class RobotDog {
    String name;
    int battery; // どこからでも直接書き換え可能！
}
```

誰でも `dog.battery = -999;` とできてしまう。

### カプセル化の後（良い例）

```java
public class RobotDog {
    private String name;
    private int battery; // private → このクラスの中からしか触れない

    public RobotDog(String name) {
        this.name = name;
        this.battery = 100;
    }

    // getter：値を取得するだけ
    public String getName() {
        return name;
    }

    public int getBattery() {
        return battery;
    }

    // setter：条件つきで値を変更する
    public void charge() {
        battery = 100;
    }

    public void walk() {
        if (battery >= 10) {
            System.out.println(name + "：歩いている…");
            battery -= 10;
        } else {
            System.out.println(name + "：バッテリー切れ！充電してください");
        }
    }
}
```

## 3. private と public

| アクセス修飾子 | アクセスできる範囲 |
|----------------|-------------------|
| `public` | どこからでも |
| `private` | 同じクラスの中だけ |
| （指定なし） | 同じパッケージの中だけ |

### アクセス制御のイメージ

```
public  = だれでも押せるボタン（操作パネル）
private = 基板の中身、ふたを開けないと触れない
```

## 4. getter と setter のデザインパターン

**getter**：値を読み取るためのメソッド。名前の慣習は `getプロパティ名`

```java
public String getName() {
    return name;
}
```

**setter**：値を変更するためのメソッド。名前の慣習は `setプロパティ名`

```java
public void setName(String name) {
    if (name != null && name.length() > 0) {
        this.name = name;
    }
}
```

setter の中に **バリデーション（値の検証）** を入れられるのがカプセル化の利点です。

## 5. カプセル化のメリット

1. **データの不正を防ぐ**
   - バッテリーがマイナスになるのを防げる

2. **内部実装を変更しやすい**
   - バッテリーの計算方法を変えても、外からの使い方は変わらない

3. **使い方がシンプルになる**
   - 「このメソッドを呼べばいい」とわかっていれば中身を知らなくてよい

## まとめ

- カプセル化は「中身を隠して、必要な操作だけ公開する」
- プロパティは `private`、メソッドは原則 `public`
- getter / setter で安全にデータを出入りさせる
- カプセル化によってプログラムは壊れにくくなる

## キーワード

`カプセル化` `private` `public` `アクセス修飾子` `getter` `setter` `バリデーション`

## 演習問題

1. ロボット犬の `battery` が 0〜100 の範囲を超えないように setter を実装してください。
2. ロボット犬に `run()`（走る）メソッドを追加してください。走るとバッテリーが 25 減ります。
3. 「バッテリー残量が 20 を切ったら充電を促す」機能を walk() に追加してください。
