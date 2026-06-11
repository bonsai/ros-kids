# 第5話：ロボットは世界をどう見ている？

ロボットは **世界モデル（World Model）** を使って動く。

世界モデルとは「世界の状態」と「行動の結果」を予測する仕組み。

## 状態（State）と行動（Action）

```java
class State {
    int energy;
    boolean hasBall;
    String location;
}
```

```java
interface Action {
    void execute(RobotDog dog);
}
```

## 世界モデルの例

```java
class SimpleWorldModel {
    State predict(State current, Action action) {
        // 行動の結果を予測する
        State next = new State();
        next.energy = current.energy - 5;
        return next;
    }
}
```

## ポイント
- 多態性は「同じメソッド名で違う動き」
- 世界モデルは「同じコマンドでも状況によって最適な動きを選ぶ」
- **世界モデルは多態性を現実世界に拡張したもの**
