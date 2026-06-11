# 第9課：世界モデル——状態と行動の予測

## 学習目標

- 世界モデル（World Model）の概念を説明できる
- 状態遷移の予測をコード化できる
- 「予測 → 選択 → 実行」のループを実装できる
- 多態性と世界モデルの関係を説明できる

## 1. ストーリー：未来を予測するロボット犬

これまでのロボット犬は「今の状態だけ」で行動を選んでいた。
でも、本当に賢いロボットは **「この行動をしたら、次はどうなるか」** を予測して行動を選ぶ。

今の Aibo-X の問題：

```
バッテリー残量：25
↓
バッテリーが少ないから「充電する」を選ぶ
↓
つまらない…
```

「充電したらその後どうなる？」を予測できれば、
「充電してから探索に行こう」という計画が立てられる。

## 2. 世界モデルとは

**世界モデル（World Model）** は、
「行動すると世界（状態）がどう変わるか」を予測する仕組み。

```
現在の状態 + 行動 → 予測される未来の状態
```

## 3. 世界モデルをコード化する

### 世界モデルインターフェース

```java
public interface WorldModel {
    State predict(State current, Action action);
    double evaluate(State predictedState);
}
```

### シンプルな世界モデルの実装

```java
public class SimpleWorldModel implements WorldModel {

    @Override
    public State predict(State current, Action action) {
        // 行動を仮実行して結果を予測
        return action.execute(current);
    }

    @Override
    public double evaluate(State predictedState) {
        double score = 0;
        score += predictedState.getBattery() * 0.5;      // バッテリーは高いほうが良い
        score += predictedState.hasBall() ? 30 : 0;       // ボールがあれば嬉しい
        score += predictedState.getBattery() >= 50 ? 20 : -20; // 50% 以上を維持したい
        return score;
    }
}
```

### 予測する頭脳（世界モデル搭載）

```java
public class PredictiveBrain implements Brain {

    private WorldModel model;
    private List<Action> possibleActions;

    public PredictiveBrain(WorldModel model) {
        this.model = model;
        this.possibleActions = Arrays.asList(
            new WalkAction(),
            new PlayAction(),
            new ChargeAction(),
            new SearchAction()
        );
    }

    @Override
    public Action decide(State currentState) {
        Action bestAction = null;
        double bestScore = Double.NEGATIVE_INFINITY;

        System.out.println("【世界モデルによる予測】");
        for (Action action : possibleActions) {
            State predicted = model.predict(currentState, action);
            double score = model.evaluate(predicted);

            System.out.println(action.getName() + " → " + predicted + " スコア:" + score);

            if (score > bestScore) {
                bestScore = score;
                bestAction = action;
            }
        }

        System.out.println("選択: " + bestAction.getName());
        return bestAction;
    }
}
```

### 使ってみる

```java
public class Main {
    public static void main(String[] args) {

        WorldModel model = new SimpleWorldModel();
        RobotDogAgent agent = new RobotDogAgent("Aibo-X", new PredictiveBrain(model));

        // バッテリー少ない状態でスタート
        for (int i = 0; i < 4; i++) {
            agent.step();
        }
    }
}
```

#### 実行結果（イメージ）

```
【世界モデルによる予測】
歩く → State{battery=15} スコア:7.5
遊ぶ → State{battery=20} スコア:10.0
充電する → State{battery=100} スコア:70.0
探索する → State{battery=10} スコア:5.0
選択: 充電する

充電後の状態：State{battery=100}

【世界モデルによる予測】
歩く → State{battery=90} スコア:65.0
遊ぶ → State{battery=95} スコア:67.5
充電する → State{battery=100} スコア:70.0
探索する → State{battery=85} スコア:62.5
選択: 充電する（または遊ぶ）
```

## 4. 多態性と世界モデルの関係

### 対応関係

| OOP の多態性 | ロボティクスの世界モデル |
|-------------|------------------------|
| `speak()` の実装がクラスごとに違う | `grasp()` の動作が物体ごとに違う |
| 呼び出す側は相手の型を意識しない | 制御側は物体の種類を意識しない |
| 抽象化されたインターフェース | 抽象化された行動プリミティブ |
| 実装の違いを隠蔽 | 物理的な違いをモデルが吸収 |

### 本質

```java
// 多態性：同じメソッド名、違う実装
animals.forEach(animal -> animal.speak());

// 世界モデル：同じコマンド、違う動作
objects.forEach(obj -> robot.grasp(obj));
```

どちらも **「抽象化された同じ操作が、具体的な対象に応じて変化する」** という本質を持つ。

## まとめ

- 世界モデルは「行動の結果を予測する」仕組み
- `predict()` で未来の状態を予測
- `evaluate()` で予測された状態を評価
- 最適な行動を選択できる
- 世界モデルは多態性の「現実世界版」

## キーワード

`世界モデル` `World Model` `予測` `評価` `状態遷移` `意思決定` `計画`

## 演習問題

1. `evaluate()` に「バッテリーが高いほど良い」だけでなく「変動が少ないほど良い」という評価軸を追加してください。
2. 2 ステップ先まで予測する頭脳 `TwoStepPredictiveBrain` を作成してください。
3. ロボット犬に「お手」と「ふせ」の Action を追加し、それらを含めて世界モデルで評価するコードを書いてください。
