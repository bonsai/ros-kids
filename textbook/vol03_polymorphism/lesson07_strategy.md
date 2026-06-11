# 第7課：戦略パターン——頭脳の差し替え

## 学習目標

- 戦略パターン（Strategy Pattern）を理解する
- 多態性を使って「頭脳の差し替え」を実装できる
- 依存性注入（Dependency Injection）の初歩を理解する
- 「継承よりコンポジション」の意味を説明できる

## 1. ストーリー：ロボット犬の頭脳を交換したい

研究所で、ロボット犬の「性格」を変えたいという要望が出た。

- 探索が好きな「好奇心旺盛モード」
- 慎重に動く「安全第一モード」
- ランダムに動く「ランダムモード」

でも、頭脳を変えるたびにクラスをまるごと書き換えるのは大変。
**「頭脳（Brain）」だけを差し替えられるようにしたい。**

## 2. 戦略パターンとは

**戦略パターン（Strategy Pattern）** は、
アルゴリズム（戦略）をクラスとしてカプセル化し、実行時に差し替えられるようにするデザインパターン。

```
エージェント（身体） → 固定
戦略（頭脳） → 差し替え可能
```

## 3. 頭脳を差し替えるコード

### Brain インターフェース

```java
public interface Brain {
    String decide(String situation);
}
```

### 3 種類の頭脳

```java
public class CuriousBrain implements Brain {
    @Override
    public String decide(String situation) {
        return "未知の場所を探索しに行く！";
    }
}

public class CautiousBrain implements Brain {
    @Override
    public String decide(String situation) {
        return "周囲を確認してから安全なルートを進む";
    }
}

public class RandomBrain implements Brain {
    @Override
    public String decide(String situation) {
        double r = Math.random();
        if (r < 0.33) return "左に行く";
        else if (r < 0.66) return "右に行く";
        else return "その場で待機する";
    }
}
```

### エージェント（頭脳を持ったロボット犬）

```java
public class RobotDogAgent {

    private String name;
    private Brain brain;  // 頭脳（差し替え可能）

    public RobotDogAgent(String name, Brain brain) {
        this.name = name;
        this.brain = brain;
    }

    // 頭脳を後から差し替え
    public void setBrain(Brain brain) {
        this.brain = brain;
    }

    public void act(String situation) {
        System.out.println(name + " は " + situation + " で " +
                           brain.decide(situation));
    }
}
```

### 使ってみる

```java
public class Main {
    public static void main(String[] args) {

        RobotDogAgent agent = new RobotDogAgent("Aibo-X", new CuriousBrain());

        agent.act("見知らぬ部屋にいる"); // 探索に行く

        // 頭脳を差し替え！
        agent.setBrain(new CautiousBrain());
        agent.act("見知らぬ部屋にいる"); // 安全ルートを進む

        // さらに差し替え！
        agent.setBrain(new RandomBrain());
        agent.act("見知らぬ部屋にいる"); // ランダムな行動
    }
}
```

#### 実行結果

```
Aibo-X は 見知らぬ部屋にいる で 未知の場所を探索しに行く！
Aibo-X は 見知らぬ部屋にいる で 周囲を確認してから安全なルートを進む
Aibo-X は 見知らぬ部屋にいる で 右に行く
```

## 4. 依存性注入（Dependency Injection）

上のコードでは、`RobotDogAgent` のコンストラクタで `Brain` を受け取っている。
これが **依存性注入（DI）** の初歩的な形。

```java
// NG：エージェントが自分で頭脳を作る（密結合）
public class RobotDogAgent {
    private Brain brain = new CuriousBrain(); // ← 差し替えにくい
}

// OK：外から頭脳を受け取る（疎結合）
public class RobotDogAgent {
    private Brain brain;
    public RobotDogAgent(Brain brain) {
        this.brain = brain; // ← 外から注入される
    }
}
```

## 5. 継承よりコンポジション

「継承よりコンポジション（composition over inheritance）」は、
「機能を追加するときは、継承より部品を組み合わせるほうが柔軟」という設計原則。

| 方法 | 柔軟性 | 例 |
|------|--------|-----|
| 継承 | 低い（親子関係が固定） | SuperRobotDog extends RobotDog |
| コンポジション | 高い（部品を差し替え可能） | RobotDogAgent has-a Brain |

AI エージェントの頭脳差し替えは、この原則の代表例。

## まとめ

- 戦略パターンは「アルゴリズムを部品として差し替え可能にする」
- Brain インターフェースで頭脳を抽象化する
- 依存性注入で外部から部品を受け取る
- 「継承よりコンポジション」で柔軟な設計になる
- これは多態性の実践的な応用

## キーワード

`戦略パターン` `Strategy パターン` `依存性注入` `DI` `コンポジション` `継承よりコンポジション`

## 演習問題

1. 新しい `SleepyBrain` クラスを作成し、常に「眠いから寝る」と返すようにしてください。
2. 状況によって頭脳を自動的に切り替える `AdaptiveBrain` を作成してください（例：バッテリーが少ないときは CautiousBrain に切り替える）。
3. RobotDogAgent に `battery` プロパティを追加し、行動ごとに消費する仕組みを実装してください。
