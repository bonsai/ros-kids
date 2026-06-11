import org.teavm.interop.Export;

public class PlaygroundRunner {

    @Export(name = "run")
    public static String run(String code) {
        try {
            return "【TeaVM 実行結果】\n" + code;
        } catch (Exception e) {
            return "エラー: " + e.getMessage();
        }
    }
}
