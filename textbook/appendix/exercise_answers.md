# 演習問題解答

## 第0課：Java にようこそ

**1. 自分の名前を表示するプログラム**

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("私の名前はロボット研究所の田中です");
    }
}
```

**2. ロボット犬の状態を変数で宣言**

```java
public class Main {
    public static void main(String[] args) {
        String name = "Aibo-X";
        int battery = 85;
        double hours = 3.5;
        System.out.println("名前: " + name);
        System.out.println("バッテリー: " + battery + "%");
        System.out.println("稼働時間: " + hours + "時間");
    }
}
```

**3. println と print の違い**

- `println`: 表示したあと改行する
- `print`: 表示したあと改行しない

```java
System.out.print("改行");  System.out.print("なし");    // 改行なし
System.out.println("改行"); System.out.println("あり");  // 改行あり
```

## 第1課：クラスとオブジェクト

**1. charge() メソッドを追加**

```java
void charge() {
    battery = 100;
    System.out.println(name + "：充電完了！");
}
```

**2. bark() でバッテリー消費**

```java
void bark() {
    if (battery >= 5) {
        System.out.println(name + "：ワンワン！");
        battery -= 5;
    } else {
        System.out.println(name + "：バッテリー切れで吠えられません");
    }
}
```

**3. 3体のロボット犬を作る**

```java
RobotDog d1 = new RobotDog();
d1.name = "Aibo-X";
RobotDog d2 = new RobotDog();
d2.name = "ポチ";
RobotDog d3 = new RobotDog();
d3.name = "タロウ";
d1.bark(); d2.bark(); d3.bark();
```

## 第2課：カプセル化

**1. バッテリーの範囲チェック setter**

```java
public void setBattery(int battery) {
    if (battery < 0) {
        this.battery = 0;
    } else if (battery > 100) {
        this.battery = 100;
    } else {
        this.battery = battery;
    }
}
```

**2. run() メソッド**

```java
public void run() {
    if (battery >= 25) {
        System.out.println(name + "：走っている！");
        battery -= 25;
    } else {
        System.out.println(name + "：バッテリー不足で走れません");
    }
}
```

**3. バッテリー残量警告**

```java
public void walk() {
    if (battery >= 10) {
        System.out.println(name + "：歩いている…");
        battery -= 10;
        if (battery < 20) {
            System.out.println("⚠ バッテリー残量が" + battery + "%です。充電してください");
        }
    } else {
        System.out.println(name + "：バッテリー切れ！");
    }
}
```

## 第3課：コンストラクタと初期化

**1. color プロパティとコンストラクタ**

```java
private String color;

public RobotDog(String name, int battery, String color) {
    this.name = name;
    setBattery(battery);
    this.color = color;
}
```

**2. デフォルトコンストラクタ**

```java
public RobotDog() {
    this("名無しロボット", 50, "白");
}
```

**3. コンストラクタでのバリデーション**

```java
public RobotDog(String name, int battery, String color) {
    this.name = name;
    if (battery < 0 || battery > 100) {
        throw new IllegalArgumentException("バッテリーは0〜100の範囲で指定してください");
    }
    this.battery = battery;
    this.color = color;
}
```

## 第4課：継承

**1. FlyingRobotDog**

```java
public class FlyingRobotDog extends SuperRobotDog {
    public FlyingRobotDog(String name) {
        super(name);
    }
    public void hover() {
        if (getBattery() >= 20) {
            System.out.println(getName() + "：ホバリング中…");
            setBattery(getBattery() - 20);
        }
    }
}
```

**2. 飛行中の bark() オーバーライド**

```java
@Override
public void bark() {
    if (flyMode) {
        System.out.println(getName() + "：フライト中は吠えられません");
    } else {
        super.bark();
    }
}
```

**3. 飛行中の消費バッテリー半減**

```java
@Override
public void walk() {
    if (flyMode) {
        if (getBattery() >= 5) {
            System.out.println(getName() + "：飛行しながら移動中…");
            setBattery(getBattery() - 5);
        }
    } else {
        super.walk();
    }
}
```

## 第5課：インターフェース

**1. Swimmable インターフェース**

```java
public interface Swimmable {
    void swim();
}

public class RobotDog implements Dog, Swimmable {
    public void swim() {
        System.out.println(name + "：防水モードで泳ぐ");
    }
}
```

**2. Sensor インターフェース**

```java
public interface Sensor {
    double readDistance();
}

public class RobotDog implements Dog, Sensor {
    public double readDistance() {
        return Math.random() * 500; // 0〜500cm
    }
}
```

**3. 「お手」を共通インターフェースで**

インターフェースに `hand()` を追加し、両方のクラスで実装する。

```java
void hand(); // インターフェースに追加

// RealDog
public void hand() {
    System.out.println(name + "：お手！（本物の犬）");
}
```

## 第6課：多態性

**1. eat() の追加**

```java
public interface Dog {
    void eat();
}

// RealDog
public void eat() {
    System.out.println(name + "：ご飯を食べる");
}

// RobotDog
public void eat() {
    System.out.println(name + "：充電ドックに接続");
}
```

**2. if-else 地獄とその問題**

```java
void makeSound(Object animal) {
    if (animal instanceof RealDog) ((RealDog)animal).bark();
    else if (animal instanceof RobotDog) ((RobotDog)animal).bark();
    // 新しい種類が増えるたびに修正が必要
}
// 問題: 拡張性が低い、コードが読みにくい、バグが入りやすい
```

**3. List で多態性**

```java
List<Dog> dogs = new ArrayList<>();
dogs.add(new RealDog("ポチ"));
dogs.add(new RobotDog("Aibo-X"));
dogs.add(new SuperRobotDog("タロウ"));
for (Dog d : dogs) {
    d.bark();
}
```

## 第7課：戦略パターン

**1. SleepyBrain**

```java
public class SleepyBrain implements Brain {
    public String decide(String situation) {
        return "眠いから寝る";
    }
}
```

**2. AdaptiveBrain**

```java
public class AdaptiveBrain implements Brain {
    private RobotDogAgent agent;
    public AdaptiveBrain(RobotDogAgent agent) { this.agent = agent; }
    public String decide(String situation) {
        if (agent.getBattery() < 30) {
            return new CautiousBrain().decide(situation);
        }
        return new CuriousBrain().decide(situation);
    }
}
```

## 第8課：頭脳差し替え

**1. AggressiveBrain**

```java
public class AggressiveBrain implements Brain {
    public Action decide(State state) {
        if (state.getBattery() >= 50) return new SearchAction();
        return new ChargeAction();
    }
}
```

**2. temperature の追加と頭脳**

State に `int temperature` を追加。温度が 35 度以上のときは充電を控える。

**3. LoggingBrain**

```java
public class LoggingBrain implements Brain {
    private Brain wrapped;
    private List<String> history = new ArrayList<>();
    public LoggingBrain(Brain wrapped) { this.wrapped = wrapped; }
    public Action decide(State state) {
        Action a = wrapped.decide(state);
        history.add(state + " → " + a.getName());
        return a;
    }
}
```

## 第9課：世界モデル

**1. 安定性の評価軸を追加**

```java
public double evaluate(State predicted) {
    double score = predicted.getBattery() * 0.5;
    score -= Math.abs(predicted.getBattery() - 50) * 0.3; // 50% 付近を安定と評価
    return score;
}
```

**2. TwoStepPredictiveBrain**

```java
public Action decide(State current) {
    Action bestAction = null;
    double bestScore = Double.NEGATIVE_INFINITY;
    for (Action first : actions) {
        State afterFirst = model.predict(current, first);
        for (Action second : actions) {
            State afterSecond = model.predict(afterFirst, second);
            double score = model.evaluate(afterSecond);
            if (score > bestScore) { bestScore = score; bestAction = first; }
        }
    }
    return bestAction;
}
```

## 第10課：pub/sub

**1. play トピックの追加**

```java
Topic playTopic = new BroadcastTopic("play");
// DogNode に play メソッド追加
public void play() {
    playTopic.publish(name + "：遊んでいる！");
}
```

**2. LoggerNode**

```java
public class LoggerNode implements Subscriber {
    private List<String> log = new ArrayList<>();
    public void onMessage(String topic, String msg) {
        String entry = "[" + java.time.LocalTime.now() + "] " + topic + ": " + msg;
        log.add(entry);
        System.out.println("  [ログ] " + entry);
    }
}
```

## 第11課：マルチエージェント

**1. MedicDog**

```java
public class MedicDog implements DogAgent {
    public void onDogMessage(DogMessage msg) {
        if (msg.getType().equals("help")) {
            System.out.println(name + "：充電スポットの場所を案内します！");
            commTopic.publishDogMessage(new DogMessage(name, "info",
                "充電スポットは座標 (0, 0) にあります"));
        }
    }
}
```

**2. LoggingAgent**

```java
public class LoggingAgent implements Subscriber {
    private List<String> log = new ArrayList<>();
    public void onMessage(String topic, String msg) {
        log.add(topic + ": " + msg);
    }
    public void printLog() {
        log.forEach(System.out::println);
    }
}
```
