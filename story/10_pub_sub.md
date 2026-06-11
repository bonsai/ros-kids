# 第10話　仲間と会話する

## あらすじ

シロ、ベニ、ゴウ。3匹のロボット犬は、それぞれ別々に動いている。
「もし——会話できたら？」

タクミは「ROS（Robot Operating System）」の考え方を調べ始める。
**ノード**と**トピック**。 publish と subscribe。

「お互いの存在を知らなくても、情報を共有できる——」

---

## 本文

「シロが『ボール見つけた』って思っても、ベニとゴウには伝わらないんだよな」

タクミは3匹のロボット犬を見ながらつぶやいた。

シロは探索中。ベニは充電中。ゴウは待機中。
それぞれが別々のことをやっている。

「人間で言えば——同じ部屋にいるのに、口をきかないで家具の方向だけ見てるようなものだ」

ネットで調べていると、タクミは「ROS」という言葉に行き着いた。

「Robot Operating System……ロボット用のOS？」
「ノード……トピック……publish……subscribe……」

---

## publish / subscribe

ROS の基本はシンプルだ。

- **ノード**：情報を発信したり受信したりする「役割」
- **トピック**：情報の通り道
- **publish**：トピックに情報を送る
- **subscribe**：トピックから情報を受け取る

「要するに——掲示板みたいなものか」
「『bark』っていう掲示板に『吠えたよ！』って書く」
「見たい人はその掲示板を見てる——」

タクミはコードを書き始めた。

```java
import java.util.ArrayList;

interface Subscriber {
    void onMessage(String topic, String msg);
}

interface Topic {
    void publish(String msg);
    void subscribe(Subscriber sub);
}
```

```java
class BroadcastTopic implements Topic {
    ArrayList<Subscriber> subs = new ArrayList<>();
    String name;

    BroadcastTopic(String name) { this.name = name; }

    public void publish(String msg) {
        System.out.println("[" + name + "] " + msg);
        for (Subscriber s : subs) {
            s.onMessage(name, msg);
        }
    }

    public void subscribe(Subscriber sub) {
        subs.add(sub);
    }
}
```

次に、「しゃべれる犬ノード」を作る。

```java
class DogNode implements Subscriber {
    String name;
    Topic barkTopic;
    Topic walkTopic;

    DogNode(String name, Topic barkTopic, Topic walkTopic) {
        this.name = name;
        this.barkTopic = barkTopic;
        this.walkTopic = walkTopic;
    }

    void bark() {
        barkTopic.publish(name + "：ワンワン！");
    }

    void walk() {
        walkTopic.publish(name + "：とことこ歩く");
    }

    public void onMessage(String topic, String msg) {
        if (!msg.contains(name)) {
            System.out.println("  [" + name + " 聞こえた] " + msg);
        }
    }
}
```

---

「よし、試そう！」

```java
public class Main {
    public static void main(String[] args) {
        Topic barkTopic = new BroadcastTopic("bark");
        Topic walkTopic = new BroadcastTopic("walk");

        DogNode shiro = new DogNode("シロ", barkTopic, walkTopic);
        DogNode beni  = new DogNode("ベニ", barkTopic, walkTopic);
        DogNode gou   = new DogNode("ゴウ", barkTopic, walkTopic);

        // 全員が購読する
        barkTopic.subscribe(shiro);
        barkTopic.subscribe(beni);
        barkTopic.subscribe(gou);
        walkTopic.subscribe(shiro);
        walkTopic.subscribe(beni);
        walkTopic.subscribe(gou);

        shiro.bark();
        beni.walk();
    }
}
```

実行結果：

```
[bark] シロ：ワンワン！
  [ベニ 聞こえた] シロ：ワンワン！
  [ゴウ 聞こえた] シロ：ワンワン！
[walk] ベニ：とことこ歩く
  [シロ 聞こえた] ベニ：とことこ歩く
  [ゴウ 聞こえた] ベニ：とことこ歩く
```

「聞こえてる……！ シロが吠えたら、ベニとゴウが『聞こえた』って表示された！」

タクミは感激した。

「シロはベニのことを知らなくていい」
「ベニもシロのことを知らなくていい」
「ただ『bark』っていうトピックを見てるだけで、情報が届く」

**これが——疎結合（そけつごう）。**

---

タクミはさらに `DisplayNode` という、
「とにかく全部表示する係」も追加した。

```java
class DisplayNode implements Subscriber {
    String name;
    DisplayNode(String name) { this.name = name; }
    public void onMessage(String topic, String msg) {
        System.out.println("  [" + name + " 表示] " + topic + ": " + msg);
    }
}
```

シロとベニとゴウが「会話」し始めた。
少なくとも——タクミのプログラムの中では。

## 知ったこと

- **ROS**：ロボット用の通信フレームワーク
- **ノード**：ひとつの役割を持つプログラム
- **トピック**：メッセージの通り道
- **publish**：トピックにメッセージを送る
- **subscribe**：トピックからメッセージを受け取る
- **疎結合**：お互いの存在を知らなくても通信できる設計

## 次回予告

3匹は会話できるようになった。
でも、「会話するだけ」では意味がない。
「会話して、協力して、ひとつの目的を達成する」
それが本当のチーム。

次は——マルチエージェント。複数のロボットが協調して動く世界へ。
