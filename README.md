# ロボット犬で学ぶ Java & ロボティクス

**コンピュータ授業のための教科書 + 物語 + クイズゲーム**

このリポジトリは、「捨てロボット犬を拾って直す」物語を通じて
Java と OOP（カプセル化・継承・多態性）とロボティクス（ROS 風 pub/sub・世界モデル・マルチエージェント）を学ぶ教材です。

## 🎮 クイズゲーム

物語を読み進めながら知識を試せるクイズゲーム。

👉 https://bonsai.github.io/ros-kids/quiz/

全11ステージ。各章のストーリー + Java の知識問題。クリアで次の章が解放されます。

## 📖 2つの教科書

| | 内容 | 形式 | PDF |
|---|------|------|-----|
| **物語教科書** | ロボット犬を拾う→直す→育てる 小説形式 | `story/` | [物語_捨てロボット犬を拾った話.pdf](./物語_捨てロボット犬を拾った話.pdf) |
| **体系教科書** | 全11課 + 付録 授業用 | `textbook/` | [教科書_Java_ロボティクス.pdf](./教科書_Java_ロボティクス.pdf) |

## 📂 構成

```
ros-kids/
├─ story/               ［3つ目］物語教材（小説ベース）
│  ├─ 01_found_it.md   拾う
│  ├─ 02_power_on.md   電源投入（Java 基本）
│  ├─ 03_name.md       名前（クラスとオブジェクト）
│  ├─ 04_encapsulation.md  カプセル化
│  ├─ 05_inheritance.md    継承
│  ├─ 06_interface.md      インターフェース
│  ├─ 07_polymorphism.md   多態性
│  ├─ 08_brain_swap.md     頭脳差し替え
│  ├─ 09_world_model.md    世界モデル
│  ├─ 10_pub_sub.md        pub/sub ROS
│  └─ 11_multi_agent.md    マルチエージェント
├─ textbook/
│  ├─ syllabus.md
│  ├─ vol01_basics/         基礎3課
│  ├─ vol02_inheritance_interface/
│  ├─ vol03_polymorphism/
│  ├─ vol04_robotics_world/
│  ├─ vol05_ros_communication/
│  └─ appendix/             用語集・解答・索引・教師用ガイド
├─ quiz/                   クイズゲーム
│  └─ index.html           全11ステージ
├─ playground/
│  ├─ index.html            ブラウザで動く Java 実行環境
│  ├─ main.js               TeaVM 差し替えポイント付き
│  └─ style.css
├─ 物語_捨てロボット犬を拾った話.pdf
└─ 教科書_Java_ロボティクス.pdf
```

## 🔧 リンク

| ページ | URL |
|--------|-----|
| クイズゲーム | https://bonsai.github.io/ros-kids/quiz/ |
| Java プレイグラウンド | https://bonsai.github.io/ros-kids/playground/ |

## 📜 ライセンス

All Rights Reserved.

本教材（コード・テキスト・デザインのすべて）は著作権により保護されています。
許可なく複製・再配布・販売・改変することを禁じます。
