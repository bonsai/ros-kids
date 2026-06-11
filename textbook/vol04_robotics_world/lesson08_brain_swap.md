# 第8課：ロボットの頭脳を入れ替える

## 学習目標

- AI エージェントの基本構造を理解する
- センサー入力 → 頭脳 → 行動出力の流れを実装できる
- 複数の頭脳を切り替えながら実験できる

## 1. ストーリー：ロボット犬の頭脳研究所

研究所のメインプロジェクトは「頭脳の研究」。

ロボット犬のハードウェアは同じでも、
**頭脳（アルゴリズム）を変えるだけでまったく違う振る舞いになる。**

これは「世界モデル（World Model）」への第一歩。

## 2. AI エージェントの基本構造

AI エージェントは以下の3つの要素からなる。

```
センサー入力 → 頭脳（意思決定） → アクチュエータ（行動）
```

ロボット犬で言い換えると：

```
カメラ・マイク → Brain.decide() → モーター・スピーカー
```

## 3. 完全なエージェントの実装

### 状態（State）

```java
public class State {
    private int battery;
    private boolean hasBall;
    private String location;

    public State(int battery, boolean hasBall, String location) {
        this.battery = battery;
        this.hasBall = hasBall;
        this.location = location;
    }

    public int getBattery() { return battery; }
    public boolean hasBall() { return hasBall; }
    public String getLocation() { return location; }

    public State withBattery(int battery) {
        return new State(battery, hasBall, location);
    }

    @Override
    public String toString() {
        return "State{battery=" + battery + ", hasBall=" + hasBall +
               ", location='" + location + "'}";
    }
}
```

### 行動（Action）

```java
public abstract class Action {
    private String name;
    public Action(String name) { this.name = name; }
    public String getName() { return name; }
    public abstract State execute(State current);
}

public class WalkAction extends Action {
    public WalkAction() { super("歩く"); }
    @Override
    public State execute(State current) {
        return current.withBattery(current.getBattery() - 10);
    }
}

public class PlayAction extends Action {
    public PlayAction() { super("遊ぶ"); }
    @Override
    public State execute(State current) {
        return current.withBattery(current.getBattery() - 5);
    }
}

public class ChargeAction extends Action {
    public ChargeAction() { super("充電する"); }
    @Override
    public State execute(State current) {
        return current.withBattery(100);
    }
}

public class SearchAction extends Action {
    public SearchAction() { super("探索する"); }
    @Override
    public State execute(State current) {
        return current.withBattery(current.getBattery() - 15);
    }
}
```

### 頭脳（Brain）インターフェース

```java
public interface Brain {
    Action decide(State currentState);
}
```

### 頭脳の実装：SimpleBrain

```java
public class SimpleBrain implements Brain {
    @Override
    public Action decide(State state) {
        if (state.getBattery() < 20) {
            return new ChargeAction();
        }
        if (state.hasBall()) {
            return new PlayAction();
        }
        return new SearchAction();
    }
}
```

### エージェント本体

```java
public class RobotDogAgent {

    private String name;
    private Brain brain;
    private State state;

    public RobotDogAgent(String name, Brain brain) {
        this.name = name;
        this.brain = brain;
        this.state = new State(100, false, "研究所");
    }

    public void setBrain(Brain brain) {
        this.brain = brain;
        System.out.println(name + "：頭脳を交換しました");
    }

    public void step() {
        System.out.println("現在の状態：" + state);
        Action action = brain.decide(state);
        System.out.println(name + " の選択：" + action.getName());
        state = action.execute(state);
        System.out.println("実行後の状態：" + state);
        System.out.println("---");
    }
}
```

### 実行

```java
public class Main {
    public static void main(String[] args) {

        RobotDogAgent agent = new RobotDogAgent("Aibo-X", new SimpleBrain());

        for (int i = 0; i < 5; i++) {
            agent.step();
        }
    }
}
```

#### 実行結果の例

```
現在の状態：State{battery=100, hasBall=false, location='研究所'}
Aibo-X の選択：探索する
実行後の状態：State{battery=85, hasBall=false, location='研究所'}
---
現在の状態：State{battery=85, hasBall=false, location='研究所'}
Aibo-X の選択：探索する
実行後の状態：State{battery=70, hasBall=false, location='研究所'}
---
...（繰り返し）...
現在の状態：State{battery=15, hasBall=false, location='研究所'}
Aibo-X の選択：充電する
実行後の状態：State{battery=100, hasBall=false, location='研究所'}
---
```

## 4. 頭脳の差し替え実験

```java
public class Main {
    public static void main(String[] args) {

        RobotDogAgent agent = new RobotDogAgent("Aibo-X", new SimpleBrain());

        // シンプル頭脳で3ステップ
        System.out.println("=== SimpleBrain ===");
        for (int i = 0; i < 3; i++) agent.step();

        // ランダム頭脳に差し替え
        agent.setBrain(new RandomBrain());
        System.out.println("=== RandomBrain ===");
        for (int i = 0; i < 3; i++) agent.step();
    }
}
```

## 5. これが世界モデルへの入り口

この「状態 → 判断 → 行動 → 状態変化」のループは、
**世界モデル（World Model）** の最も単純な形。

- 状態（State）＝ 世界の今の状況
- 行動（Action）＝ ロボットの動作
- 頭脳（Brain）＝ 状態から最適な行動を選ぶルール

第9課では、これを「予測」に拡張する。

## まとめ

- AI エージェントは「センサー → 頭脳 → 行動」で構成される
- State で世界の状態を表現する
- Action でロボットの行動を表現する
- Brain が状態から最適な行動を選ぶ
- 頭脳を差し替えるだけで振る舞いが変わる

## キーワード

`AI エージェント` `状態` `行動` `センサー` `アクチュエータ` `意思決定` `世界モデル`

## 演習問題

1. 新しい頭脳 `AggressiveBrain`（バッテリーが 50 以上なら常に探索、それ以下なら充電）を作成してください。
2. State に `temperature`（温度）プロパティを追加し、温度が高いときは充電を控える頭脳を作成してください。
3. 頭脳が選んだ行動の履歴を保持する `LoggingBrain`（実際の頭脳をラップする）を作成してください。
