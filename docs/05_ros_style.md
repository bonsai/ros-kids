# 第6話：ロボット犬はどうやって会話するの？（ROS 風 pub/sub）

きみはロボット研究所の通信チームに配属された。
今日のミッションは「ロボット犬どうしが会話できるようにする」こと。

ROS（Robot Operating System）では、
**ノード（Node）** と **トピック（Topic）** を使ってロボット同士が会話する。

## ノードってなに？

ノードはロボットの中の"ひとつの役割"。

- 吠えるノード
- 歩くノード
- センサーを読むノード

Java ではクラスで表現する。

## トピックってなに？

トピックはメッセージの通り道。
あるノードが **publish（送信）** すると、
別のノードが **subscribe（受信）** できる。

## Java で pub/sub を作ろう

### Topic インターフェース

```java
import java.util.ArrayList;
import java.util.List;

interface Topic {
    void publish(String message);
    void subscribe(Subscriber sub);
}

interface Subscriber {
    void onMessage(String topicName, String message);
}
```

### ブロードキャストトピック

```java
class BroadcastTopic implements Topic {
    private List<Subscriber> subs = new ArrayList<>();
    private String name;

    public BroadcastTopic(String name) { this.name = name; }

    @Override
    public void publish(String message) {
        System.out.println("[" + name + "] publish: " + message);
        for (Subscriber sub : subs) {
            sub.onMessage(name, message);
        }
    }

    @Override
    public void subscribe(Subscriber sub) {
        subs.add(sub);
    }
}
```

### DogNode（購読もできる犬ノード）

```java
interface DogNode extends Subscriber {
    void bark();
    void walk();
    String getName();
}
```

### RealDogNode

```java
class RealDogNode implements DogNode {
    private String name;
    private Topic barkTopic;
    private Topic walkTopic;

    public RealDogNode(String name, Topic barkTopic, Topic walkTopic) {
        this.name = name;
        this.barkTopic = barkTopic;
        this.walkTopic = walkTopic;
    }

    @Override
    public String getName() { return name; }

    @Override
    public void bark() {
        barkTopic.publish(name + ": ワンワン！");
    }

    @Override
    public void walk() {
        walkTopic.publish(name + ": とことこ歩く");
    }

    @Override
    public void onMessage(String topic, String message) {
        System.out.println("  [" + name + " 受信] topic=" + topic + ", msg=" + message);
    }
}
```

### RobotDogNode

```java
class RobotDogNode implements DogNode {
    private String name;
    private Topic barkTopic;
    private Topic walkTopic;

    public RobotDogNode(String name, Topic barkTopic, Topic walkTopic) {
        this.name = name;
        this.barkTopic = barkTopic;
        this.walkTopic = walkTopic;
    }

    @Override
    public String getName() { return name; }

    @Override
    public void bark() {
        barkTopic.publish(name + ": ピコーン！（吠え音再生）");
    }

    @Override
    public void walk() {
        walkTopic.publish(name + ": モーター駆動で歩行");
    }

    @Override
    public void onMessage(String topic, String message) {
        System.out.println("  [" + name + " 受信] topic=" + topic + ", msg=" + message);
    }
}
```

### SubscriberNode（別のロボットが購読する例）

```java
class DisplayNode implements Subscriber {
    private String name;

    public DisplayNode(String name) { this.name = name; }

    @Override
    public void onMessage(String topic, String message) {
        System.out.println("  [" + name + " 表示] " + topic + " → " + message);
    }
}
```

### メイン

```java
public class Main {
    public static void main(String[] args) {

        Topic barkTopic = new BroadcastTopic("bark");
        Topic walkTopic = new BroadcastTopic("walk");

        DogNode[] dogs = {
            new RealDogNode("ポチ", barkTopic, walkTopic),
            new RobotDogNode("Aibo-X", barkTopic, walkTopic)
        };

        // 購読登録
        barkTopic.subscribe(new DisplayNode("モニター"));
        for (DogNode d : dogs) {
            barkTopic.subscribe(d);
            walkTopic.subscribe(d);
        }

        // 実行
        for (DogNode dog : dogs) {
            System.out.println("--- " + dog.getName() + " が動く ---");
            dog.bark();
            dog.walk();
        }
    }
}
```

### 実行結果イメージ

```
--- ポチ が動く ---
[bark] publish: ポチ: ワンワン！
  [モニター 表示] bark → ポチ: ワンワン！
  [ポチ 受信] topic=bark, msg=ポチ: ワンワン！
  [Aibo-X 受信] topic=bark, msg=ポチ: ワンワン！
[walk] publish: ポチ: とことこ歩く
  [モニター 表示] walk → ポチ: とことこ歩く
  [ポチ 受信] topic=walk, msg=ポチ: とことこ歩く
  [Aibo-X 受信] topic=walk, msg=ポチ: とことこ歩く
--- Aibo-X が動く ---
...
```

## ポイント
- **publish** ＝ トピックにメッセージを送る
- **subscribe** ＝ トピックからメッセージを受け取る
- ノードはお互いの存在を知らなくても、トピック経由で会話できる
- これが **ROS の基本設計**
