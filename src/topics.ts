import type { TopicId, TopicMeta } from "./types";

export const TOPICS: TopicMeta[] = [
  {
    id: "kanji",
    title: "漢字・語彙チャレンジ",
    subtitle: "読み・書き・熟語・同音異義",
    emoji: "🈶",
    accent: "#f97316",
  },
  {
    id: "grammar",
    title: "文法クエスト",
    subtitle: "品詞・文の成分・接続・敬語",
    emoji: "📐",
    accent: "#38bdf8",
  },
  {
    id: "classic",
    title: "古典アリーナ",
    subtitle: "古文・漢文の意味と現代語訳",
    emoji: "📜",
    accent: "#a78bfa",
  },
  {
    id: "reading",
    title: "読解ライブラリ",
    subtitle: "内容理解・指示語・接続・要旨",
    emoji: "📖",
    accent: "#4ade80",
  },
  {
    id: "mix",
    title: "オールジャンル・ラッシュ",
    subtitle: "4単元まぜこぜ・いつ何が出るかお楽しみ",
    emoji: "🎪",
    accent: "#f472b6",
    unlockLevel: 5,
  },
];

export function topicMeta(id: TopicId): TopicMeta {
  const found = TOPICS.find((t) => t.id === id);
  if (!found) throw new Error("unknown topic");
  return found;
}
