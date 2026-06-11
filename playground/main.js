const codeArea = document.getElementById('code');
const runButton = document.getElementById('runButton');
const clearButton = document.getElementById('clearButton');
const output = document.getElementById('output');
const sampleSelect = document.getElementById('sampleSelect');

// ----- sample code snippets -----
const samples = {
  hello: `public class Main {
    public static void main(String[] args) {
        System.out.println("こんにちは、ロボット犬の世界！");
    }
}`,

  polymorphism: `interface Dog {
    void bark();
    void walk();
}

class RealDog implements Dog {
    public void bark() { System.out.println("ワンワン！"); }
    public void walk() { System.out.println("とことこ歩く"); }
}

class RobotDog implements Dog {
    public void bark() { System.out.println("ピコーン！（吠え音再生）"); }
    public void walk() { System.out.println("モーター駆動で歩行"); }
}

public class Main {
    public static void main(String[] args) {
        Dog[] dogs = { new RealDog(), new RobotDog() };
        for (Dog d : dogs) {
            d.bark();
            d.walk();
            System.out.println("---");
        }
    }
}`,

  brain: `import java.util.*;

interface Brain {
    String decide(String situation);
}

class CuriousBrain implements Brain {
    public String decide(String s) { return "未知の場所を探索する！"; }
}

class CautiousBrain implements Brain {
    public String decide(String s) { return "安全なルートを選ぶ"; }
}

class RandomBrain implements Brain {
    public String decide(String s) {
        double r = Math.random();
        return r < 0.33 ? "左に行く" : r < 0.66 ? "右に行く" : "その場で待機";
    }
}

class RobotDogAgent {
    private String name;
    private Brain brain;
    public RobotDogAgent(String name, Brain brain) {
        this.name = name; this.brain = brain;
    }
    public void setBrain(Brain brain) { this.brain = brain; }
    public void act(String s) {
        System.out.println(name + " -> " + brain.decide(s));
    }
}

public class Main {
    public static void main(String[] args) {
        RobotDogAgent a = new RobotDogAgent("Aibo-X", new CuriousBrain());
        a.act("見知らぬ部屋");
        a.setBrain(new CautiousBrain());
        a.act("見知らぬ部屋");
        a.setBrain(new RandomBrain());
        a.act("見知らぬ部屋");
    }
}`,

  agent: `interface Brain {
    String decide(String situation);
}

class SimpleBrain implements Brain {
    public String decide(String s) {
        if (s.contains("暗い")) return "ライトを付ける";
        if (s.contains("音")) return "調べに行く";
        return "探索する";
    }
}

class ScoutBrain implements Brain {
    public String decide(String s) {
        return "周囲をスキャンしてマップを作成する";
    }
}

class RobotDogAgent {
    private String name;
    private Brain brain;
    private int battery = 100;

    public RobotDogAgent(String name, Brain brain) {
        this.name = name; this.brain = brain;
    }

    public void act(String situation) {
        if (battery <= 0) {
            System.out.println(name + ": バッテリー切れ！");
            return;
        }
        String action = brain.decide(situation);
        System.out.println(name + " [" + situation + "] -> " + action);
        battery -= 10;
    }
}

public class Main {
    public static void main(String[] args) {
        RobotDogAgent a1 = new RobotDogAgent("Aibo-X", new SimpleBrain());
        RobotDogAgent a2 = new RobotDogAgent("Scout", new ScoutBrain());

        a1.act("暗い部屋に入った");
        a1.act("物音がした");
        a2.act("見晴らしの良い場所にいる");
    }
}`,

  worldmodel: `import java.util.*;

class State {
    int battery;
    boolean hasBall;
    State(int b, boolean h) { battery = b; hasBall = h; }
    public String toString() {
        return "battery=" + battery + " hasBall=" + hasBall;
    }
}

interface Action { State execute(State s); String getName(); }

class WalkAction implements Action {
    public String getName() { return "歩く"; }
    public State execute(State s) {
        return new State(Math.max(0, s.battery - 10), s.hasBall);
    }
}

class ChargeAction implements Action {
    public String getName() { return "充電"; }
    public State execute(State s) {
        return new State(100, s.hasBall);
    }
}

class PredictiveBrain {
    private List<Action> actions = Arrays.asList(new WalkAction(), new ChargeAction());

    public Action decide(State current) {
        Action best = null;
        double bestScore = -999;

        for (Action a : actions) {
            State next = a.execute(current);
            double score = next.battery * 0.5 + (next.hasBall ? 30 : 0);
            System.out.println(a.getName() + " -> " + next + " score=" + score);
            if (score > bestScore) { bestScore = score; best = a; }
        }
        System.out.println("選択: " + best.getName());
        return best;
    }
}

public class Main {
    public static void main(String[] args) {
        PredictiveBrain brain = new PredictiveBrain();
        State s = new State(25, false);
        System.out.println("現在: " + s);
        Action a = brain.decide(s);
        State result = a.execute(s);
        System.out.println("結果: " + result);
    }
}`,

  pubsub: `import java.util.*;

interface Subscriber {
    void onMessage(String topic, String msg);
}

interface Topic {
    void publish(String msg);
    void subscribe(Subscriber sub);
}

class BroadcastTopic implements Topic {
    private List<Subscriber> subs = new ArrayList<>();
    private String name;
    public BroadcastTopic(String n) { name = n; }
    public void publish(String msg) {
        System.out.println("[" + name + "] " + msg);
        for (Subscriber s : subs) s.onMessage(name, msg);
    }
    public void subscribe(Subscriber sub) { subs.add(sub); }
}

class DogNode implements Subscriber {
    private String name;
    private Topic barkTopic, walkTopic;
    public DogNode(String n, Topic bt, Topic wt) {
        name = n; barkTopic = bt; walkTopic = wt;
    }
    public void bark() { barkTopic.publish(name + ": ワンワン！"); }
    public void walk() { walkTopic.publish(name + ": とことこ歩く"); }
    public void onMessage(String t, String msg) {
        if (!msg.contains(name))
            System.out.println("  [" + name + " 聞いた] " + msg);
    }
}

class DisplayNode implements Subscriber {
    public void onMessage(String t, String msg) {
        System.out.println("  [表示] " + t + " -> " + msg);
    }
}

public class Main {
    public static void main(String[] args) {
        Topic bt = new BroadcastTopic("bark");
        Topic wt = new BroadcastTopic("walk");
        DogNode pochi = new DogNode("ポチ", bt, wt);
        DogNode aibo = new DogNode("Aibo-X", bt, wt);
        bt.subscribe(new DisplayNode());
        bt.subscribe(pochi); bt.subscribe(aibo);
        wt.subscribe(pochi); wt.subscribe(aibo);
        pochi.bark();
        aibo.walk();
    }
}`
};

// ----- load default sample -----
function loadSample(key) {
  codeArea.value = samples[key] || samples.hello;
}
sampleSelect.addEventListener('change', () => loadSample(sampleSelect.value));
loadSample('pubsub');

// ----- run -----
runButton.addEventListener('click', async () => {
  const code = codeArea.value;
  output.textContent = "コンパイル中...\n";
  try {
    const result = await runJavaInBrowser(code);
    output.textContent = result;
  } catch (e) {
    output.textContent = "エラー:\n" + e.message;
  }
});

clearButton.addEventListener('click', () => {
  codeArea.value = '';
  output.textContent = '// コードを書いて実行ボタンを押してください';
});

// ----- TeaVM placeholder -----
async function runJavaInBrowser(sourceCode) {
  // TODO: TeaVM.run(sourceCode, callback) に置き換え
  return [
    "【TeaVM ダミー実行】",
    "TeaVM を接続すると正しく動きます。",
    "",
    "---- コード ----",
    sourceCode
  ].join("\n");
}
