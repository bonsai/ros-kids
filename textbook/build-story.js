const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const storyDir = path.join(__dirname, '..', 'story');
const outDir = path.join(__dirname, 'output');
fs.mkdirSync(outDir, { recursive: true });

const files = [
  '01_found_it.md',
  '02_power_on.md',
  '03_name.md',
  '04_encapsulation.md',
  '05_inheritance.md',
  '06_interface.md',
  '07_polymorphism.md',
  '08_brain_swap.md',
  '09_world_model.md',
  '10_pub_sub.md',
  '11_multi_agent.md'
];

const titles = [
  '第1話　拾った',
  '第2話　電源を入れた',
  '第3話　名前をつけた',
  '第4話　蓋を開けた',
  '第5話　部品を交換した',
  '第6話　新しい友達',
  '第7話　友達を増やした',
  '第8話　頭脳を作り替えた',
  '第9話　考えられるようになった',
  '第10話　仲間と会話する',
  '第11話　チームで動く'
];

let htmlParts = [];
htmlParts.push(`<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>捨てロボット犬を拾った話 — Java & ロボティクス 物語教科書</title>
<style>
  * { box-sizing: border-box; }
  body {
    font-family: 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif;
    font-size: 11pt;
    line-height: 2.0;
    color: #1e1e2e;
    max-width: 210mm;
    margin: 0 auto;
    padding: 20mm 15mm;
  }
  .cover {
    text-align: center; padding: 60mm 0;
    page-break-after: always;
  }
  .cover h1 { font-size: 28pt; border: none; margin: 0 0 16px; }
  .cover .sub { font-size: 14pt; color: #666; margin-bottom: 40px; }
  .cover .desc { font-size: 11pt; color: #888; line-height: 1.8; }
  h1 { font-size: 20pt; border-bottom: 3px solid #e06c75; padding-bottom: 6px; margin-top: 48px; page-break-before: always; }
  h1:first-of-type { page-break-before: avoid; }
  h2 { font-size: 14pt; color: #1e1e2e; margin-top: 28px; border-left: 4px solid #e06c75; padding-left: 10px; }
  h3 { font-size: 12pt; color: #45475a; margin-top: 20px; }
  pre {
    background: #1e1e2e; color: #cdd6f4;
    padding: 12px; border-radius: 6px;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 9pt; line-height: 1.5;
    overflow-x: auto;
    page-break-inside: avoid;
  }
  code { font-family: 'Fira Code', 'Consolas', monospace; font-size: 9pt; background: #e6e9ef; padding: 1px 4px; border-radius: 3px; }
  pre code { background: transparent; padding: 0; }
  table { border-collapse: collapse; width: 100%; margin: 16px 0; page-break-inside: avoid; }
  th, td { border: 1px solid #ccc; padding: 6px 10px; text-align: left; font-size: 10pt; }
  th { background: #e6e9ef; }
  blockquote { border-left: 4px solid #e06c75; margin: 16px 0; padding: 8px 16px; background: #fafafa; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>
<div class="cover">
  <h1>捨てロボット犬を<br>拾った話</h1>
  <p class="sub">Java & ロボティクス 物語教科書</p>
  <p class="desc">
    粗大ゴミの山で動かないロボット犬を拾った。<br>
    直したい。動かしたい。もっと賢くしたい。<br>
    これは——プログラムでロボットを育てる物語。
  </p>
</div>
`);

// TOC
htmlParts.push('<div style="page-break-after:always"><h2>目次</h2><ul>');
titles.forEach((t, i) => {
  htmlParts.push(`<li style="padding:6px 0;border-bottom:1px dotted #ddd">${t}</li>`);
});
htmlParts.push('</ul></div>');

for (let i = 0; i < files.length; i++) {
  const fullPath = path.join(storyDir, files[i]);
  if (!fs.existsSync(fullPath)) {
    htmlParts.push(`<p style="color:red">File not found: ${files[i]}</p>`);
    continue;
  }
  const md = fs.readFileSync(fullPath, 'utf-8');
  const html = marked.parse(md);
  htmlParts.push(html);
}

htmlParts.push('</body></html>');

const finalHtml = htmlParts.join('\n');
const htmlPath = path.join(outDir, 'story.html');
fs.writeFileSync(htmlPath, finalHtml, 'utf-8');
console.log('HTML:', htmlPath);
