# 第9話　考えられるようになった

## あらすじ

「今の状況」だけじゃなくて「この行動をしたら、次どうなるか」を
予測できたら——本当に賢いロボットになる。

タクミは「世界モデル」を作り始める。

---

## 本文

頭脳を交換できるようになったシロ。でも、どこか物足りない。

「シロは『今』のことしか考えてないんだよな…」

シロがバッテリー残量25%で「探索！」を選ぶ。
探索中にバッテリーが切れて、動けなくなる。
そんなことが何度かあった。

「未来を予測できればいいのに。
『探索したらバッテリーが10になって、動けなくなる』って
あらかじめわかってたら——」

タクミはノートに書き始めた。

---

## State（状態）とAction（行動）

「まず、シロの『状態』をプログラムで表そう」
「そして『行動』もプログラムで表す」
「行動すると状態が変わる——これをプログラムにしたい」

```java
class State {
    int battery;
    boolean hasBall;

    State(int battery, boolean hasBall) {
        this.battery = battery;
        this.hasBall = hasBall;
    }

    public String toString() {
        return "{battery=" + battery + ", hasBall=" + hasBall + "}";
    }
}

abstract class Action {
    abstract State execute(State current);
}

class WalkAction extends Action {
    State execute(State current) {
        return new State(current.battery - 10, current.hasBall);
    }
}

class ChargeAction extends Action {
    State execute(State current) {
        return new State(100, current.hasBall);
    }
}
```

「行動を『仮に実行』すると、未来の状態がわかる」

---

## 世界モデル

「予測する仕組み」を **世界モデル（World Model）** という。

```java
class WorldModel {

    State predict(State current, Action action) {
        return action.execute(current);
    }

    int evaluate(State state) {
        int score = 0;
        score += state.battery * 2;           // バッテリーは多いほどいい
        score += state.hasBall ? 30 : 0;      // ボールがあれば嬉しい
        if (state.battery < 15) score -= 50;  // バッテリー少なすぎはダメ
        return score;
    }
}
```

「`predict` で未来を予測、`evaluate` で未来を評価。
そして『一番評価の高い行動』を選べば——最適な行動になる！」

```java
class PredictiveBrain implements Brain {

    WorldModel model = new WorldModel();
    Action[] actions = {new WalkAction(), new ChargeAction()};

    public String decide(String situation) {
        State current = new State(getBattery(), false);

        Action best = null;
        int bestScore = -999;

        for (Action a : actions) {
            State future = model.predict(current, a);
            int score = model.evaluate(future);
            System.out.println("予測: " + a.getClass().getSimpleName()
                + " -> " + future + " 評価=" + score);
            if (score > bestScore) {
                bestScore = score;
                best = a;
            }
        }
        return best.getClass().getSimpleName() + " を選択";
    }
}
```

---

「よし、動かしてみよう！」

シロのバッテリーは25%。

```
予測: WalkAction -> {battery=15, hasBall=false} 評価=-20
予測: ChargeAction -> {battery=100, hasBall=false} 評価=200
選択: ChargeAction
```

「充電を選んだ……！」
「予測してる！未来を！」

シロは充電ドックに向かった。
——いや、ロボット犬本体は相変わらずただの筐体で、
動いているのはプログラム上の「判断」だけなんだけど。

でも、タクミにはシロが「考えている」ように見えた。

## 知ったこと

- **世界モデル（World Model）**：「行動すると状態がどう変わるか」を予測する
- **predict**：未来の状態を予測する
- **evaluate**：未来の状態を評価（点数をつける）する
- **予測→評価→選択**：3ステップで最適な行動を選べる
- 世界モデルは「多態性の現実世界版」——同じコマンドでも状況によって最適な動きが変わる

## 次回予告

シロは「考える」ことができるようになった。
でも——1匹だとできることに限りがある。

もし、シロとベニとゴウが「会話」できたら？
情報を共有できたら？
「お互いの存在を知らなくても、メッセージを介して協力できる」

——そんな仕組みを作りたい。
