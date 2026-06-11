# 第4課：継承

## 学習目標

- 継承の概念を説明できる
- `extends` を使ってクラスを継承できる
- メソッドのオーバーライドができる
- `super` で親クラスのメソッドを呼べる
- 「is-a」関係を理解する

## 1. ストーリー：スーパーロボット犬の開発

研究所で新しいプロジェクトが始まった。
「Aibo-X をベースに、もっとすごいロボット犬を作ろう！」

でも、ゼロから作るのは大変…。
そうだ、**既存のロボット犬の機能を引き継いで、新しい機能を追加しよう**。

## 2. 継承とは

**継承（Inheritance）** は、既存のクラス（親クラス）の機能を引き継いで、
新しいクラス（子クラス）を作る仕組みです。

```
親クラス（スーパークラス）＝ 基本的な機能
          ↓ extends
子クラス（サブクラス）    ＝ 基本機能 + 独自機能
```

### ロボット犬の継承

```java
// 親クラス
public class RobotDog {
    protected String name;
    protected int battery;

    public RobotDog(String name) {
        this.name = name;
        this.battery = 100;
    }

    public void bark() {
        System.out.println(name + "：ワンワン！（標準音声）");
    }

    public void walk() {
        if (battery >= 10) {
            System.out.println(name + "：歩いている…");
            battery -= 10;
        }
    }

    public void charge() {
        battery = 100;
        System.out.println(name + "：充電完了");
    }
}

// 子クラス（スーパーロボット犬）
public class SuperRobotDog extends RobotDog {

    private boolean flyMode;

    public SuperRobotDog(String name) {
        super(name); // 親クラスのコンストラクタを呼ぶ
        this.flyMode = false;
    }

    // 新しい機能：飛ぶ
    public void fly() {
        if (battery >= 30) {
            System.out.println(name + "：飛行モード起動！");
            battery -= 30;
            flyMode = true;
        } else {
            System.out.println(name + "：バッテリー不足で飛行できません");
        }
    }

    // 親のメソッドをオーバーライド（上書き）
    @Override
    public void bark() {
        System.out.println(name + "：スーパーワンワン！（大音量）");
    }
}
```

## 3. extends キーワード

`extends` で親クラスを指定します。

```java
public class SuperRobotDog extends RobotDog {
    // RobotDog のすべての機能 + 追加機能
}
```

- 子クラスは親クラスの `public` / `protected` なメンバーを使える
- `private` なメンバーは継承されない

## 4. メソッドのオーバーライド

**オーバーライド（override）** は、親クラスのメソッドを子クラスで上書きすることです。

```java
@Override  // ← コンパイラに「オーバーライドしてるよ」と教える印
public void bark() {
    System.out.println(name + "：スーパーワンワン！（大音量）");
}
```

`@Override` をつけると、間違って親クラスにないメソッド名を書いたときに
コンパイルエラーになって教えてくれます。

## 5. super キーワード

`super` は親クラスを指します。

```java
public SuperRobotDog(String name) {
    super(name);  // 親クラスのコンストラクタを呼ぶ
}

public void charge() {
    super.charge();  // 親のcharge()を呼ぶ
    System.out.println("＋高速充電モード");
}
```

## 6. 継承のメリット

1. **コードの再利用**
   - 共通の機能は親クラスに一度書けばいい

2. **階層構造を作れる**
   - RobotDog → SuperRobotDog → FlyingRobotDog のように拡張できる

3. **変更に強い**
   - 親クラスを修正すると、すべての子クラスに反映される

## 7. protected アクセス修飾子

| 修飾子 | 同じクラス | 同じパッケージ | 子クラス | どこからでも |
|--------|-----------|---------------|---------|------------|
| `private` | ○ | × | × | × |
| （なし） | ○ | ○ | × | × |
| `protected` | ○ | ○ | ○ | × |
| `public` | ○ | ○ | ○ | ○ |

子クラスから親のプロパティにアクセスしたいときは `protected` を使います。

## まとめ

- 継承は「既存のクラスをベースに新しいクラスを作る」
- `extends` で親クラスを指定する
- `@Override` でメソッドを上書きできる
- `super` で親クラスのメソッドを呼べる
- 「is-a」関係（スーパーロボット犬はロボット犬の一種）を表す

## キーワード

`継承` `extends` `スーパークラス` `サブクラス` `オーバーライド` `@Override` `super` `protected`

## 演習問題

1. `FlyingRobotDog` クラスを作成し、`SuperRobotDog` を継承して `hover()`（ホバリング）メソッドを追加してください。
2. `bark()` をオーバーライドして、飛行中は「フライト中は吠えられません」と表示するようにしてください。
3. 親クラスの `walk()` をオーバーライドして、飛行中は消費バッテリーが半分になるようにしてください。
