# 第11話　チームで動く

## あらすじ

会話できるようになった3匹。
でも、まだ「協力」はしていない。

「シロがボールを見つけた」
「ベニがそれを知る」
「ベニがそれを拾いに行く」

この連携が、プログラムで実現できたら——
そこに「チーム」が生まれる。

---

## 本文

「会話はできるようになった。でも——」

タクミは3匹のロボット犬を見渡した。

「まだ『協力』はしてないんだよな」
「ただ『聞こえた』って表示してるだけだ」

タクミが欲しかったのは——
「シロがボールを見つけた」
「ベニがそれを知って、回収に行く」
「ゴウがその間、安全を確保する」

そんな連携だ。

---

## DogMessage

まず、ロボット犬同士でやりとりする「メッセージ」の型を決める。

```java
class DogMessage {
    String sender;      // だれが
    String type;        // どんな種類のメッセージ
    String content;     // 何を伝えたいか

    DogMessage(String sender, String type, String content) {
        this.sender = sender;
        this.type = type;
        this.content = content;
    }

    public String toString() {
        return "[" + sender + "] " + type + ": " + content;
    }
}
```

メッセージの種類は：
- `found_ball`：ボールを見つけた
- `going_to_pickup`：回収に向かう
- `danger`：危険を検知
- `help`：助けて

---

## 3匹の役割

```java
interface DogAgent {
    void act();
    void onMessage(DogMessage msg);
    String getName();
}
```

### シロ（探索担当）

```java
class Explorer implements DogAgent {
    String name;
    Topic comm;

    Explorer(String name, Topic comm) {
        this.name = name; this.comm = comm;
    }

    public String getName() { return name; }

    public void act() {
        System.out.println(name + "：探索中…");
        if (Math.random() > 0.6) {
            DogMessage msg = new DogMessage(name, "found_ball",
                "ボールを発見！位置は (12, 34)");
            comm.publish(msg.toString());
        }
    }

    public void onMessage(DogMessage msg) {
        // シロは探索に集中。メッセージは受け取るだけ
    }
}
```

### ベニ（運搬担当）

```java
class Carrier implements DogAgent {
    String name;
    Topic comm;
    boolean going = false;

    Carrier(String name, Topic comm) {
        this.name = name; this.comm = comm;
    }

    public String getName() { return name; }

    public void act() {
        if (going) {
            System.out.println(name + "：荷物を運搬中…");
            going = false;
        } else {
            System.out.println(name + "：待機中…");
        }
    }

    public void onMessage(DogMessage msg) {
        if (msg.type.equals("found_ball")) {
            System.out.println(name + "：ボールを回収に向かう！");
            going = true;
            DogMessage reply = new DogMessage(name, "going_to_pickup",
                "回収に向かっています");
            comm.publish(reply.toString());
        }
    }
}
```

### ゴウ（警備担当）

```java
class Guard implements DogAgent {
    String name;
    Topic comm;

    Guard(String name, Topic comm) {
        this.name = name; this.comm = comm;
    }

    public String getName() { return name; }

    public void act() {
        System.out.println(name + "：周囲を警戒中…");
        if (Math.random() > 0.7) {
            DogMessage alert = new DogMessage(name, "danger",
                "異常なし。継続監視中");
            comm.publish(alert.toString());
        }
    }

    public void onMessage(DogMessage msg) {
        if (msg.type.equals("help")) {
            System.out.println(name + "：救援に向かう！");
        }
    }
}
```

---

## チーム始動

タクミは3匹を動かした。

```java
public class Main {
    public static void main(String[] args) {

        Topic commTopic = new BroadcastTopic("team_channel");

        DogAgent[] team = {
            new Explorer("シロ", commTopic),
            new Carrier("ベニ", commTopic),
            new Guard("ゴウ", commTopic)
        };

        for (int step = 1; step <= 5; step++) {
            System.out.println("\n=== ステップ " + step + " ===");
            for (DogAgent agent : team) {
                agent.act();
            }
        }
    }
}
```

---

実行が流れた。

```
=== ステップ 1 ===
シロ：探索中…
ベニ：待機中…
ゴウ：周囲を警戒中…
[team_channel] ゴウ: 異常なし。継続監視中

=== ステップ 2 ===
シロ：探索中…
[team_channel] [シロ] found_ball: ボールを発見！位置は (12, 34)
ベニ：ボールを回収に向かう！
[team_channel] [ベニ] going_to_pickup: 回収に向かっています
ゴウ：周囲を警戒中…

=== ステップ 3 ===
シロ：探索中…
ベニ：荷物を運搬中…
ゴウ：周囲を警戒中…
```

「協力してる……！」

タクミはモニタに映るログを見ながら、声が出た。

シロが見つけた。
ベニが受け取って動いた。
ゴウがその間、警戒を続けている。

「3匹が——ひとつのチームになってる」

---

タクミは椅子の背にもたれた。

机の上にはシロ。
その隣でベニが充電中。
床にはゴウが鎮座している。

どれも、最初は動かなかったロボットたちだ。
拾ってきて、直して、プログラムを書いて——今、ここで、
3匹のロボット犬が「チーム」として協力している。

「プログラムって——すごいな」

シロの青い目が、タクミを見ている。
何かを言いたそうに、口を開けて——閉じた。

「……今、何か言おうとした？」

シロは首をかしげた。

タクミは笑った。

「よし、もっとすごいプログラムを書こう」

---

## この物語で学んだこと

すべては、粗大ゴミの山で動かないロボット犬を拾ったことから始まった。

| 話 | タイトル | 学んだこと |
|----|---------|-----------|
| 1 | 拾った | Java プログラムが必要だと知った |
| 2 | 電源を入れた | クラスと main メソッド、println |
| 3 | 名前をつけた | 変数、クラスとオブジェクト |
| 4 | 蓋を開けた | カプセル化、private |
| 5 | 部品を交換した | 継承、オーバーライド |
| 6 | 新しい友達 | インターフェース |
| 7 | 友達を増やした | 多態性（ポリモーフィズム） |
| 8 | 頭脳を作り替えた | 戦略パターン、DI |
| 9 | 考えられるようになった | 世界モデル |
| 10 | 仲間と会話する | pub/sub、ROS |
| 11 | チームで動く | マルチエージェント |

---

**おわり**

---

この後も、物語は続く。
新しいロボット。新しい機能。新しい仲間。

プログラムは——無限に広がっている。
