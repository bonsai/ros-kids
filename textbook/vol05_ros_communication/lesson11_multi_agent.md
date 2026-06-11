# 第11課：マルチエージェントと協調動作

## 学習目標

- マルチエージェントシステムの基本を理解する
- 複数のノードが協調して動作する仕組みを実装できる
- メッセージを使ってエージェント間で情報を共有できる
- 分散システムの考え方を理解する

## 1. ストーリー：3 匹のロボット犬で協力しよう

研究所に 3 匹のロボット犬がいる。

- **ポチ**（探索担当）：新しい場所を探す
- **Aibo-X**（運搬担当）：見つけたものを運ぶ
- **タロウ**（警備担当）：危険を知らせる

この 3 匹が協力すれば、1 匹ではできないことができる。

## 2. マルチエージェントシステム

**マルチエージェントシステム（MAS）** は、
複数の独立したエージェントが協調して問題を解決するシステム。

ロボティクスでは、複数のロボットが協力するときに使われる。

### メッセージの設計

まず、犬同士がやりとりするメッセージの型を定義する。

```java
public class DogMessage {
    private String sender;
    private String type;    // "bark", "found_ball", "danger", "help"
    private String content;

    public DogMessage(String sender, String type, String content) {
        this.sender = sender;
        this.type = type;
        this.content = content;
    }

    public String getSender() { return sender; }
    public String getType() { return type; }
    public String getContent() { return content; }

    @Override
    public String toString() {
        return "[" + sender + "] " + type + ": " + content;
    }
}
```

### メッセージキューつきトピック

```java
import java.util.concurrent.ConcurrentLinkedQueue;

public class MessageQueueTopic implements Topic {

    private List<Subscriber> subs = new ArrayList<>();
    private ConcurrentLinkedQueue<DogMessage> queue = new ConcurrentLinkedQueue<>();
    private String name;

    public MessageQueueTopic(String name) {
        this.name = name;
    }

    @Override
    public void publish(String message) {
        System.out.println("[" + name + "] publish: " + message);
        for (Subscriber sub : subs) {
            sub.onMessage(name, message);
        }
    }

    public void publishDogMessage(DogMessage msg) {
        queue.add(msg);
        System.out.println("[" + name + "] メッセージ: " + msg);
        for (Subscriber sub : subs) {
            if (sub instanceof DogAgent) {
                ((DogAgent) sub).onDogMessage(msg);
            }
        }
    }

    @Override
    public void subscribe(Subscriber sub) {
        subs.add(sub);
    }

    public boolean hasMessage() {
        return !queue.isEmpty();
    }

    public DogMessage pollMessage() {
        return queue.poll();
    }
}
```

### DogAgent（高度な犬エージェント）

```java
public interface DogAgent extends Subscriber {
    void onDogMessage(DogMessage msg);
    void act();
    String getName();
}
```

### 探索担当：ポチ

```java
public class ExplorerDog implements DogAgent {

    private String name;
    private MessageQueueTopic commTopic;
    private int battery = 100;

    public ExplorerDog(String name, MessageQueueTopic commTopic) {
        this.name = name;
        this.commTopic = commTopic;
    }

    @Override
    public String getName() { return name; }

    @Override
    public void act() {
        // 探索する
        System.out.println(name + "：探索中…");
        battery -= 15;

        // ボールを発見！
        if (Math.random() > 0.7) {
            DogMessage found = new DogMessage(name, "found_ball",
                "ボールを発見！位置は (12, 34)");
            commTopic.publishDogMessage(found);
        }

        // バッテリー残量が少ない
        if (battery < 20) {
            DogMessage help = new DogMessage(name, "help",
                "バッテリー切れ寸前！場所は (15, 20)");
            commTopic.publishDogMessage(help);
        }
    }

    @Override
    public void onDogMessage(DogMessage msg) {
        if (msg.getType().equals("danger")) {
            System.out.println(name + "：危険！逃げろ！！");
        }
    }

    @Override
    public void onMessage(String topic, String message) {
        // 通常のテキストメッセージ
    }
}
```

### 運搬担当：Aibo-X

```java
public class CarrierDog implements DogAgent {

    private String name;
    private MessageQueueTopic commTopic;
    private boolean carrying = false;
    private int battery = 100;

    public CarrierDog(String name, MessageQueueTopic commTopic) {
        this.name = name;
        this.commTopic = commTopic;
    }

    @Override
    public String getName() { return name; }

    @Override
    public void act() {
        if (carrying) {
            System.out.println(name + "：荷物を運搬中…");
            battery -= 10;
        } else {
            System.out.println(name + "：待機中…");
            battery += 5;
        }
    }

    @Override
    public void onDogMessage(DogMessage msg) {
        if (msg.getType().equals("found_ball")) {
            System.out.println(name + "：ボールを回収に向かう！");
            carrying = true;
            DogMessage reply = new DogMessage(name, "going_to_pickup",
                "ボールを回収に行きます");
            commTopic.publishDogMessage(reply);
        }
    }

    @Override
    public void onMessage(String topic, String message) {}
}
```

### 警備担当：タロウ

```java
public class GuardDog implements DogAgent {

    private String name;
    private MessageQueueTopic commTopic;

    public GuardDog(String name, MessageQueueTopic commTopic) {
        this.name = name;
        this.commTopic = commTopic;
    }

    @Override
    public String getName() { return name; }

    @Override
    public void act() {
        // 警戒中
        System.out.println(name + "：周囲を警戒中…");

        // 異常を検知
        if (Math.random() > 0.8) {
            DogMessage danger = new DogMessage(name, "danger",
                "不審な動きを検知！");
            commTopic.publishDogMessage(danger);
        }
    }

    @Override
    public void onDogMessage(DogMessage msg) {
        if (msg.getType().equals("help")) {
            System.out.println(name + "：" + msg.getSender() +
                               " が助けを求めている！向かう！");
        }
    }

    @Override
    public void onMessage(String topic, String message) {}
}
```

### メイン：3 匹の協調動作

```java
public class Main {
    public static void main(String[] args) {

        MessageQueueTopic commTopic = new MessageQueueTopic("communication");

        DogAgent pochi = new ExplorerDog("ポチ", commTopic);
        DogAgent aiboX = new CarrierDog("Aibo-X", commTopic);
        DogAgent taro = new GuardDog("タロウ", commTopic);

        commTopic.subscribe(pochi);
        commTopic.subscribe(aiboX);
        commTopic.subscribe(taro);

        // 10 ステップのシミュレーション
        for (int step = 1; step <= 10; step++) {
            System.out.println("\n=== ステップ " + step + " ===");

            pochi.act();
            aiboX.act();
            taro.act();

            try { Thread.sleep(500); } catch (Exception e) {}
        }
    }
}
```

## 3. マルチエージェントシステムの設計原則

1. **各エージェントは独立している**
   - ポチが止まっても Aibo-X は動き続けられる

2. **エージェントはメッセージを通してのみ通信する**
   - 直接メソッドを呼ばない。トピック経由で情報を共有

3. **エージェントは自分の役割だけに集中する**
   - ポチは探索だけ、Aibo-X は運搬だけ、タロウは警備だけ

4. **メッセージは非同期で届く**
   - 送信と受信のタイミングは独立している

## まとめ

- マルチエージェントシステムは複数のエージェントが協調する
- 各エージェントは自分の役割を持ち、独立して動く
- メッセージ（トピック通信）で情報を共有する
- イベント駆動で他のエージェントの行動に反応できる
- これは ROS を使った実世界のロボットシステムと同じ設計

## キーワード

`マルチエージェント` `協調動作` `メッセージ通信` `イベント駆動` `役割分担` `ROS`

## 演習問題

1. 新しい役割を持つ犬エージェント「医療担当（MedicDog）」を作成してください（バッテリーが切れかけのエージェントに充電スポットの場所を知らせる）。
2. 各エージェントの行動ログを収集する `LoggingAgent` を作成し、すべての通信を監視できるようにしてください。
3. 3 匹のエージェントが協力して「ボールを探す → 回収する → 拠点に戻す」という一連のタスクを完了するシミュレーションを完成させてください。
