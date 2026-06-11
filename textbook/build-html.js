const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const srcDir = __dirname;
const outDir = path.join(srcDir, 'output');
fs.mkdirSync(outDir, { recursive: true });

const files = [
  // vol0: Welcome
  'vol01_basics/lesson00_welcome.md',
  // vol1: Java Basics
  'vol01_basics/lesson01_class_object.md',
  'vol01_basics/lesson02_encapsulation.md',
  'vol01_basics/lesson03_constructor.md',
  // vol2: Inheritance & Interface
  'vol02_inheritance_interface/lesson04_inheritance.md',
  'vol02_inheritance_interface/lesson05_interface.md',
  // vol3: Polymorphism
  'vol03_polymorphism/lesson06_polymorphism.md',
  'vol03_polymorphism/lesson07_strategy.md',
  // vol4: Robotics World
  'vol04_robotics_world/lesson08_brain_swap.md',
  'vol04_robotics_world/lesson09_world_model.md',
  // vol5: ROS Communication
  'vol05_ros_communication/lesson10_pub_sub.md',
  'vol05_ros_communication/lesson11_multi_agent.md',
  // Appendix
  'appendix/glossary.md',
  'appendix/exercise_answers.md',
  'appendix/code_index.md',
  'appendix/teacher_guide.md'
];

// Read syllabus for front matter
const syllabus = fs.readFileSync(path.join(srcDir, 'syllabus.md'), 'utf-8');
const readme = fs.readFileSync(path.join(__dirname, '..', 'README.md'), 'utf-8');

let htmlParts = [];

// HTML header with print-friendly CSS
htmlParts.push(`<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>ロボット犬で学ぶ Java & ロボティクス — 教科書</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Fira+Code&display=swap');
  * { box-sizing: border-box; }
  body {
    font-family: 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif;
    font-size: 11pt;
    line-height: 1.8;
    color: #1e1e2e;
    max-width: 210mm;
    margin: 0 auto;
    padding: 20mm 15mm;
    orphans: 3;
    widows: 3;
  }
  h1 { font-size: 20pt; border-bottom: 3px solid #89b4fa; padding-bottom: 6px; margin-top: 48px; page-break-before: always; }
  h1:first-of-type { page-break-before: avoid; }
  h2 { font-size: 16pt; color: #1e1e2e; margin-top: 32px; border-left: 4px solid #89b4fa; padding-left: 10px; }
  h3 { font-size: 13pt; color: #45475a; margin-top: 24px; }
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
  th { background: #e6e9ef; font-weight: 700; }
  blockquote { border-left: 4px solid #89b4fa; margin: 16px 0; padding: 8px 16px; background: #f5f5f5; }
  ul, ol { padding-left: 24px; }
  li { margin-bottom: 4px; }
  .cover {
    text-align: center; padding: 60mm 0;
    page-break-after: always;
  }
  .cover h1 { font-size: 28pt; border: none; margin: 0 0 16px; }
  .cover .subtitle { font-size: 14pt; color: #666; }
  .cover .meta { margin-top: 40px; color: #888; font-size: 11pt; }
  .toc { page-break-after: always; }
  .toc h2 { border: none; font-size: 18pt; }
  .toc ul { list-style: none; padding: 0; }
  .toc li { padding: 4px 0; font-size: 11pt; border-bottom: 1px dotted #ddd; }
  .toc li span { color: #888; }
  @media print {
    body { padding: 0; }
    pre { white-space: pre-wrap; word-break: break-all; }
  }
</style>
</head>
<body>`);

// Cover page
htmlParts.push(`
<div class="cover">
  <h1>ロボット犬で学ぶ</h1>
  <h1>Java &amp; ロボティクス</h1>
  <p class="subtitle">コンピュータ授業のための教科書</p>
  <p class="meta">OOP × ロボット × ROS を一貫したストーリーで学ぶ<br>全11課 + 付録</p>
</div>
`);

// Table of Contents
htmlParts.push(`<div class="toc"><h2>目次</h2><ul>`);
const tocItems = [
  '第0課 Java にようこそ',
  '第1課 クラスとオブジェクト',
  '第2課 カプセル化',
  '第3課 コンストラクタと初期化',
  '第4課 継承',
  '第5課 インターフェースによる抽象化',
  '第6課 多態性（ポリモーフィズム）',
  '第7課 戦略パターン―頭脳の差し替え',
  '第8課 ロボットの頭脳を入れ替える',
  '第9課 世界モデル―状態と行動の予測',
  '第10課 publish / subscribe 通信',
  '第11課 マルチエージェントと協調動作',
  '付録A 用語集',
  '付録B 演習問題解答',
  '付録C コード索引',
  '付録D 教師用ガイド'
];
tocItems.forEach((item, i) => {
  htmlParts.push(`<li>${item}</li>`);
});
htmlParts.push('</ul></div>');

// Syllabus
htmlParts.push('<h1>シラバス</h1>');
let syllabusHtml = marked.parse(syllabus);
syllabusHtml = syllabusHtml.replace(/<table>/g, '<table class="syllabus">');
htmlParts.push(syllabusHtml);

// Convert each file
for (const f of files) {
  const fullPath = path.join(srcDir, f);
  if (!fs.existsSync(fullPath)) {
    htmlParts.push(`<p style="color:red">File not found: ${f}</p>`);
    continue;
  }
  const md = fs.readFileSync(fullPath, 'utf-8');
  const html = marked.parse(md);
  htmlParts.push(html);
}

htmlParts.push('</body></html>');

const finalHtml = htmlParts.join('\n');
const htmlPath = path.join(outDir, 'textbook.html');
fs.writeFileSync(htmlPath, finalHtml, 'utf-8');
console.log('HTML generated:', htmlPath);
