# 第10課：publish / subscribe 通信

## 学習目標

- ROS のノードとトピックの概念を理解する
- publish（送信）と subscribe（受信）を実装できる
- インターフェースを使って疎結合な通信を設計できる

## 1. ストーリー：ロボット犬どうしが会話したい

研究所にロボット犬が増えてきた。
Aibo-X、ポチ、そして新しい仲間「タロウ」。

でも、それぞれがバラバラに動いている。
「Aibo-X が吠えたことを、みんなに知らせたい！」

ここで **ROS（Robot Operating System）** の考え方が役立つ。

## 2. ROS とは

ROS（Robot Operating System）は、ロボットソフトウェアを開発するためのフレームワーク。

ROS の基本的な考え方：

```
ノード（Node） = ロボットの中のひとつの機能
トピック（Topic） = メッセージの通り道
publish = メッセージを送る
subscribe = メッセージを受け取る
```

## 3. Java で pub/sub を実装する

### 購読者（Subscriber）インターフェース

```java
public interface Subscriber {
    void onMessage(String topicName, String message);
}
```

### トピック（Topic）インターフェース

```java
import java.util.ArrayList;
import java.util.List;

public interface Topic {
    void publish(String message);
    void subscribe(Subscriber sub);
}
```

### ブロードキャストトピック

```java
public class BroadcastTopic implements Topic {

    private List<Subscriber> subs = new ArrayList<>();
    private String name;

    public BroadcastTopic(String name) {
        this.name = name;
    }

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

### 表示ノード

```java
public class DisplayNode implements Subscriber {

    private String name;

    public DisplayNode(String name) {
        this.name = name;
    }

    @Override
    public void onMessage(String topic, String message) {
        System.out.println("  [" + name + " 表示] " + topic + " → " + message);
    }
}
```

### 犬ノード：自分も購読する

```java
public class DogNode implements Subscriber {

    private String name;
    private Topic barkTopic;
    private Topic walkTopic;

    public DogNode(String name, Topic barkTopic, Topic walkTopic) {
        this.name = name;
        this.barkTopic = barkTopic;
        this.walkTopic = walkTopic;
    }

    public void bark() {
        barkTopic.publish(name + "：ワンワン！");
    }

    public void walk() {
        walkTopic.publish(name + "：とことこ歩く");
    }

    @Override
    public void onMessage(String topic, String message) {
        if (!message.contains(name)) {
            System.out.println("  [" + name + " 聞いた] " + topic +
                               "で「" + message + "」と言っている");
        }
    }
}
```

### メイン

```java
public class Main {
    public static void main(String[] args) {

        Topic barkTopic = new BroadcastTopic("bark");
        Topic walkTopic = new BroadcastTopic("walk");

        DogNode pochi = new DogNode("ポチ", barkTopic, walkTopic);
        DogNode aiboX = new DogNode("Aibo-X", barkTopic, walkTopic);

        // トピックに購読者を登録
        barkTopic.subscribe(new DisplayNode("モニター"));
        barkTopic.subscribe(pochi);
        barkTopic.subscribe(aiboX);
        walkTopic.subscribe(pochi);
        walkTopic.subscribe(aiboX);

        System.out.println("=== ポチが吠える ===");
        pochi.bark();

        System.out.println("=== Aibo-X が歩く ===");
        aiboX.walk();
    }
}
```

#### 実行結果

```
=== ポチが吠える ===
[bark] publish: ポチ：ワンワン！
  [モニター 表示] bark → ポチ：ワンワン！
  [Aibo-X 聞いた] barkで「ポチ：ワンワン！」と言っている
=== Aibo-X が歩く ===
[walk] publish: Aibo-X：とことこ歩く
  [ポチ 聞いた] walkで「Aibo-X：とことこ歩く」と言っている
```

## 4. なぜ publish / subscribe が重要なのか

1. **ノード同士が直接つながっていない（疎結合）**
   - ポチは Aibo-X の存在を知らなくてよい
   - トピックを通して間接的に通信する

2. **新しいノードを追加しやすい**
   - DisplayNode を後から追加しても既存のコードは修正不要

3. **スケールする**
   - 10 匹でも 100 匹でも同じ仕組みで通信できる

## まとめ

- ノードは独立した機能、トピックは通信路
- publish = メッセージを送る、subscribe = 受け取る
- pub/sub によってノード同士は疎結合になる
- 新しいノードの追加が容易になる
- これは ROS の中心的な設計思想

## キーワード

`ROS` `ノード` `トピック` `publish` `subscribe` `疎結合` `ブロードキャスト`

## 演習問題

1. `play` トピックを追加し、犬が遊ぶときもメッセージを publish するようにしてください。
2. `LoggerNode`（すべてのトピックを購読してログに記録するノード）を作成してください。
3. 特定のメッセージだけフィルタリングする `FilterNode` を作成してください（例：「ワンワン」という文字列が含まれるメッセージだけを表示する）。
