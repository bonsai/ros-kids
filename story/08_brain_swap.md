# 第8話　頭脳を作り替えた

## あらすじ

「プログラム通りにしか動かない」ロボットたち。
タクミは「自分で判断する頭脳」を作ろうとする。

でも——性格はひとつじゃない。
好奇心旺盛な子、慎重な子、やんちゃな子。

「頭脳だけ、取り替えられたら…？」
——**戦略パターン**の始まり。

---

## 本文

「シロ、お手」

シロは前脚を上げた。
「ベニ、お手」
ベニも前脚を上げた。
「ゴウ、お手」

ゴウの重い前脚が、机の上にドンと置かれた。

「みんな『お手』できる。でもさ——」

タクミは考えた。

「自分で『何をするか』を決められたら、もっとロボットらしくない？
もっと——『生きてる』みたいに」

---

## Brain（頭脳）の設計

タクミは新しい設計図を描き始めた。

「ロボット犬は『身体』と『頭脳』に分けよう」
「身体は固定。頭脳は差し替え可能に——」

```java
interface Brain {
    String decide(String situation);
}
```

「『状況を伝えるから、何をするか決めて』——それが頭脳」

3種類の頭脳を作った。

```java
class CuriousBrain implements Brain {
    public String decide(String s) {
        return "探索する！";
    }
}

class CautiousBrain implements Brain {
    public String decide(String s) {
        return "周囲を確認する";
    }
}

class RandomBrain implements Brain {
    public String decide(String s) {
        double r = Math.random();
        return r < 0.33 ? "右に行く" :
               r < 0.66 ? "左に行く" : "その場で待つ";
    }
}
```

次に、頭脳を受け取る「身体」を作る。

```java
class RobotDogBody {
    private String name;
    private Brain brain;

    RobotDogBody(String name, Brain brain) {
        this.name = name;
        this.brain = brain;
    }

    void setBrain(Brain brain) {
        this.brain = brain;
        System.out.println(name + "：頭脳を交換しました");
    }

    void act(String situation) {
        String action = brain.decide(situation);
        System.out.println(name + " は " + situation + " で " + action);
    }
}
```

---

「動け！」

```java
public class Main {
    public static void main(String[] args) {
        RobotDogBody shiro = new RobotDogBody("シロ", new CuriousBrain());

        shiro.act("見知らぬ部屋にいる");
        shiro.act("物音がした");

        System.out.println("--- 頭脳交換 ---");
        shiro.setBrain(new CautiousBrain());

        shiro.act("見知らぬ部屋にいる");
        shiro.act("物音がした");
    }
}
```

実行結果：

```
シロ は 見知らぬ部屋にいる で 探索する！
シロ は 物音がした で 探索する！
--- 頭脳交換 ---
シロ は 見知らぬ部屋にいる で 周囲を確認する
シロ は 物音がした で 周囲を確認する
```

「頭脳を変えただけで——行動が変わった……」

タクミはしばらく、そのログを眺めた。
シロを抱き上げて、目をのぞき込む。

「お前、今どっちの頭脳だ？」

シロは——やっぱりわかってない顔をした。

---

## 依存性注入

この「外部から頭脳を受け取る」設計を **依存性注入（DI）** という。

```java
// 悪い例：自分で頭脳を作る（交換できない）
class RobotDogBody {
    private Brain brain = new CuriousBrain(); // 固定！
}

// 良い例：外から頭脳を受け取る（交換できる）
class RobotDogBody {
    private Brain brain;
    RobotDogBody(Brain brain) {
        this.brain = brain; // 外から注入
    }
}
```

## 継承よりコンポジション

「頭脳を差し替える」設計は、**「継承よりコンポジション」** の原則を体現している。

- 継承：親子関係が固定 → 後から変えられない
- コンポジション：部品を差し替え → 柔軟

## 知ったこと

- **戦略パターン**：アルゴリズム（頭脳）をクラス化して差し替え可能にする
- **依存性注入（DI）**：外部から部品を受け取る設計
- **コンポジション**：部品を組み合わせて機能を作る
- **「継承よりコンポジション」**：固定より柔軟

## 次回予告

頭脳を作り替えたシロは「自分で判断」できるようになった。
でも、判断の基準は「今の状況だけ」。

「未来を予測できたら——もっと賢くなるんじゃないか？」

タクミは次のステージへ進む。
**世界モデル**の構築。
