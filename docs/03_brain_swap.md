# 第4話：ロボット犬の頭脳を入れ替えよう

AI エージェントは **頭脳（Brain）を入れ替え可能なモデル** を持つ。

同じロボット犬でも、頭脳を変えると行動が変わる。

## Brain インターフェース

```java
interface Brain {
    String decide(String situation);
}
```

## 3 種類の頭脳

```java
class CuriousBrain implements Brain {
    public String decide(String s) {
        return "未知の場所を探索する！";
    }
}

class CautiousBrain implements Brain {
    public String decide(String s) {
        return "安全なルートを選ぶ";
    }
}

class RandomBrain implements Brain {
    public String decide(String s) {
        return Math.random() > 0.5 ? "右に行く" : "左に行く";
    }
}
```

## エージェント

```java
class RobotDogAgent {
    private Brain brain;
    public RobotDogAgent(Brain brain) { this.brain = brain; }
    public void act(String situation) {
        System.out.println(brain.decide(situation));
    }
}
```

## ポイント
- **身体（Agent）は固定、頭脳（Brain）は差し替え可能**
- インターフェースが同じなら、中身は自由
- これが **多態性（ポリモーフィズム）** の実践
