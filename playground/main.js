const codeArea = document.getElementById('code');
const runButton = document.getElementById('runButton');
const output = document.getElementById('output');

runButton.addEventListener('click', async () => {
  const code = codeArea.value;
  output.textContent = "コンパイル中...\n";

  try {
    const result = await runJavaWithTeaVM(code);
    output.textContent = result;
  } catch (e) {
    output.textContent = "エラー:\n" + e.message;
  }
});

/**
 * TeaVM 実行エンジン（差し替えポイント）
 * TeaVM の JS API に合わせて書き換えて使う。
 * ダミー実装としてコードを返すだけにしている。
 */
async function runJavaWithTeaVM(sourceCode) {
  // TODO: TeaVM.run(sourceCode, callback) に置き換える
  return [
    "【TeaVM ダミー実行】",
    "実際の TeaVM / CheerpJ を接続するとここで正しく動きます。",
    "",
    "---- 送信されたコード ----",
    sourceCode
  ].join("\n");
}
