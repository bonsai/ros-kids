/**
 * R検定データ → クイズJSON パーサー
 *
 * exam/R検定.md に蓄積した問題データを読み込み、
 * quiz/index.html に組み込める JSON 形式に変換する。
 *
 * 使い方:
 *   node exam/parse.js
 *
 * 出力:
 *   exam/questions.json  — クイズに直接貼り付け可能な配列
 */

const fs = require('fs');
const path = require('path');

const MD_PATH = path.join(__dirname, 'R検定.md');
const OUT_PATH = path.join(__dirname, 'questions.json');

const md = fs.readFileSync(MD_PATH, 'utf-8');

// Extract each question block: ```yaml ... ```
const blocks = md.match(/```yaml\n([\s\S]*?)```/g) || [];

const questions = [];

for (const block of blocks) {
  const yaml = block.replace(/```yaml\n?|```/g, '').trim();
  const lines = yaml.split('\n');

  let meta = '';
  let bodyLines = [];
  let lookingForStart = true;
  let inMeta = false;

  for (const line of lines) {
    if (lookingForStart && line.trim() === '---') {
      lookingForStart = false;
      inMeta = true;
      continue;
    }
    if (inMeta) {
      if (line.trim() === '---') {
        inMeta = false; // end of front matter
        continue;
      }
      meta += line + '\n';
    } else {
      bodyLines.push(line);
    }
  }
  meta = meta.trim();

  // Parse YAML-like front matter (simple key: value)
  const parseMeta = (str) => {
    const obj = {};
    for (const line of str.split('\n')) {
      const m = line.match(/^(\w+):\s*(.+)$/);
      if (m) {
        let val = m[2].trim();
        // strip inline comments
        const hashIdx = val.indexOf('#');
        if (hashIdx >= 0) val = val.substring(0, hashIdx).trim();
        if (val.startsWith('[')) {
          try { obj[m[1]] = JSON.parse(val.replace(/'/g, '"')); } catch { obj[m[1]] = val; }
        } else if (!isNaN(val) && val !== '') {
          obj[m[1]] = Number(val);
        } else {
          obj[m[1]] = val;
        }
      }
    }
    return obj;
  };

  const parsed = parseMeta(meta);

  const body = bodyLines.join('\n').trim();
  const opts = [];
  let answer = -1;
  let answerText = '';

  // Parse choice options: - text ←
  for (const line of bodyLines) {
    const m = line.match(/^-\s+(.+?)(?:\s+←)?$/);
    if (m) {
      const text = m[1].trim();
      const isCorrect = line.includes('←');
      opts.push(text);
      if (isCorrect) { answer = opts.length - 1; answerText = text; }
    }
  }

  // If it's a text/code type, extract the answer from > line
  if (parsed.type === 'text' || parsed.type === 'code') {
    const ansMatch = body.match(/^>\s*(.+)$/m);
    if (ansMatch) {
      answerText = ansMatch[1].trim();
    }
    const question = body.split('\n').filter(l => !l.match(/^>\s*/)).join('\n').trim();
    questions.push({
      chapter: parsed.chapter || 0,
      type: parsed.type || 'multiple',
      difficulty: parsed.difficulty || 'basic',
      tags: parsed.tags || [],
      q: question,
      opts: [],
      answer: 0,
      answerText
    });
  } else if (opts.length > 0) {
    const question = body.split('\n').filter(l => !l.match(/^-\s+/)).join('\n').trim();
    questions.push({
      chapter: parsed.chapter || 0,
      type: parsed.type || 'multiple',
      difficulty: parsed.difficulty || 'basic',
      tags: parsed.tags || [],
      q: question,
      opts,
      answer
    });
  }
}

// Group by chapter
const grouped = {};
for (const q of questions) {
  if (!grouped[q.chapter]) grouped[q.chapter] = [];
  grouped[q.chapter].push(q);
}

const output = {
  total: questions.length,
  byChapter: grouped,
  questions
};

fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2), 'utf-8');
console.log(`✅ ${questions.length} questions parsed → ${OUT_PATH}`);
console.log('By chapter:', Object.keys(grouped).map(k => `ch${k}: ${grouped[k].length}`).join(', '));
