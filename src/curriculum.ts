import type { TopicId } from "./types";

/** 中学校（本アプリは中2範囲）の学期区分 */
export type SemesterId = 1 | 2 | 3;

export interface CurriculumUnit {
  id: string;
  title: string;
  summary: string;
  emoji: string;
  accent: string;
  playTopic: TopicId | null;
  relatedTopic?: TopicId;
  relatedHint?: string;
}

export interface CurriculumGenre {
  id: string;
  label: string;
  emoji: string;
  accent: string;
  units: CurriculumUnit[];
}

export interface SemesterPlan {
  id: SemesterId;
  title: string;
  ribbon: string;
  periodHint: string;
  lead: string;
  genres: CurriculumGenre[];
}

/**
 * 公立中学校・中2 の典型的な進度イメージで学期・領域を整理。
 */
export const SEMESTER_PLANS: SemesterPlan[] = [
  {
    id: 1,
    title: "1学期",
    ribbon: "読む力の土台",
    periodHint: "おおむね 4〜7月",
    lead:
      "漢字・語彙と文法の復習から、説明文・論説文の読解、古典（物語・随筆）の入口まで。言葉の意味を正確にとらえる力を育てましょう。",
    genres: [
      {
        id: "s1-kanji",
        label: "漢字・語彙",
        emoji: "🈶",
        accent: "#f97316",
        units: [
          {
            id: "s1-kanji-read",
            title: "漢字の音読み・訓読み",
            summary: "中2で出会う漢字の読みを、文脈とセットで定着させる。",
            emoji: "🔤",
            accent: "#f97316",
            playTopic: "kanji",
          },
          {
            id: "s1-kanji-write",
            title: "漢字の書き・熟語",
            summary: "意味から漢字を選ぶ・二字熟語の意味を言葉で説明する。",
            emoji: "✍️",
            accent: "#fb923c",
            playTopic: "kanji",
          },
          {
            id: "s1-vocab",
            title: "語彙・同音異義語",
            summary: "似た読みの言葉を区別し、文脈に合う語を選ぶ。",
            emoji: "💬",
            accent: "#fdba74",
            playTopic: "kanji",
          },
        ],
      },
      {
        id: "s1-grammar",
        label: "文法",
        emoji: "📐",
        accent: "#38bdf8",
        units: [
          {
            id: "s1-pos",
            title: "品詞の復習（名詞・動詞・形容詞など）",
            summary: "文の中で働きを見分け、品詞名を正確に言えるようにする。",
            emoji: "🏷️",
            accent: "#38bdf8",
            playTopic: "grammar",
          },
          {
            id: "s1-particle",
            title: "助詞・接続詞の働き",
            summary: "「は」「が」「を」や接続詞が文の関係をどうつくるか。",
            emoji: "🔗",
            accent: "#7dd3fc",
            playTopic: "grammar",
          },
          {
            id: "s1-keigo-intro",
            title: "敬語の入口（尊敬・謙譲・丁寧）",
            summary: "場面に合った言い方の区別。中2後半〜中3への橋渡し。",
            emoji: "🙇",
            accent: "#bae6fd",
            playTopic: null,
            relatedTopic: "grammar",
            relatedHint: "いまは「文法クエスト」で品詞と文の関係を固められます。",
          },
        ],
      },
      {
        id: "s1-reading",
        label: "現代文（読解）",
        emoji: "📖",
        accent: "#4ade80",
        units: [
          {
            id: "s1-exposition",
            title: "説明文・論説文の読み方",
            summary: "段落の役割・キーワード・筆者の主張をとらえる。",
            emoji: "📄",
            accent: "#4ade80",
            playTopic: "reading",
          },
          {
            id: "s1-reference",
            title: "指示語・接続（因果・対比）",
            summary: "「それ」「このように」が何を指すか、文と文のつながり。",
            emoji: "🔍",
            accent: "#86efac",
            playTopic: "reading",
          },
        ],
      },
      {
        id: "s1-classic",
        label: "古典",
        emoji: "📜",
        accent: "#a78bfa",
        units: [
          {
            id: "s1-tale-genji",
            title: "物語文学（源氏物語など）",
            summary: "古典の世界観と、現代語訳の読み方の入口。",
            emoji: "🌸",
            accent: "#a78bfa",
            playTopic: "classic",
          },
          {
            id: "s1-essay-pillow",
            title: "随筆文学（枕草子など）",
            summary: "作者の視点と表現の特色を味わう読み。",
            emoji: "🍃",
            accent: "#c4b5fd",
            playTopic: "classic",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "2学期",
    ribbon: "古典と表現",
    periodHint: "おおむね 9〜12月",
    lead:
      "竹取物語・更級日記など物語・日記文学を深め、小説・詩の読解と要約・意見を書く表現力を伸ばす学期です。",
    genres: [
      {
        id: "s2-classic",
        label: "古典",
        emoji: "📜",
        accent: "#a78bfa",
        units: [
          {
            id: "s2-taketori",
            title: "竹取物語",
            summary: "物語の展開と登場人物、古典語の意味を現代語でとらえる。",
            emoji: "🎋",
            accent: "#a78bfa",
            playTopic: "classic",
          },
          {
            id: "s2-diary",
            title: "日記文学（更級日記など）",
            summary: "作者の心情と時代背景を読み取る。",
            emoji: "📔",
            accent: "#c4b5fd",
            playTopic: "classic",
          },
          {
            id: "s2-kanbun",
            title: "漢文の基礎（返り点・送り仮名）",
            summary: "漢文の読み方の型と、現代語への置き換え。",
            emoji: "🏯",
            accent: "#8b5cf6",
            playTopic: null,
            relatedTopic: "classic",
            relatedHint: "古文の語彙・助動詞クイズで、漢文への土台を固められます。",
          },
        ],
      },
      {
        id: "s2-reading",
        label: "現代文（読解）",
        emoji: "📖",
        accent: "#4ade80",
        units: [
          {
            id: "s2-novel",
            title: "小説・物語の読み方",
            summary: "登場人物の心情・場面描写・伏線を読み取る。",
            emoji: "📚",
            accent: "#4ade80",
            playTopic: "reading",
          },
          {
            id: "s2-poetry",
            title: "詩・短歌のイメージ",
            summary: "比喩やリズムから、作者が伝えたい感覚を言葉にする。",
            emoji: "🎵",
            accent: "#86efac",
            playTopic: null,
            relatedTopic: "reading",
            relatedHint: "比喩や指示語の読解クイズで、イメージを言葉にする練習ができます。",
          },
        ],
      },
      {
        id: "s2-grammar",
        label: "文法",
        emoji: "📐",
        accent: "#38bdf8",
        units: [
          {
            id: "s2-components",
            title: "文の成分（主語・述語・修飾語）",
            summary: "文の骨組みを分解し、どの部分が何を説明しているか。",
            emoji: "🧩",
            accent: "#38bdf8",
            playTopic: "grammar",
          },
          {
            id: "s2-modifier",
            title: "修飾関係・係り受け",
            summary: "どの言葉がどの言葉を修飾しているかを見分ける。",
            emoji: "↔️",
            accent: "#7dd3fc",
            playTopic: "grammar",
          },
        ],
      },
      {
        id: "s2-expression",
        label: "表現（見通し）",
        emoji: "✏️",
        accent: "#f472b6",
        units: [
          {
            id: "s2-summary",
            title: "要約・意見を書く",
            summary: "読んだ内容を短くまとめ、自分の考えを筋道立てて書く。",
            emoji: "📝",
            accent: "#f472b6",
            playTopic: null,
            relatedTopic: "reading",
            relatedHint: "読解クイズで「主旨・要約」の感覚を先取りできます。",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "3学期",
    ribbon: "総仕上げ・実力確認",
    periodHint: "おおむね 1〜3月",
    lead:
      "古典・現代文・漢字・文法を横断して総復習。定期テストや学力テスト前の「切り替え練習」にも使えます。",
    genres: [
      {
        id: "s3-classic",
        label: "古典",
        emoji: "📜",
        accent: "#a78bfa",
        units: [
          {
            id: "s3-classic-review",
            title: "古文・助動詞の総復習",
            summary: "「けり」「たり」「なり」など、意味と現代語訳の定着。",
            emoji: "🔄",
            accent: "#a78bfa",
            playTopic: "classic",
          },
        ],
      },
      {
        id: "s3-kanji",
        label: "漢字・語彙",
        emoji: "🈶",
        accent: "#f97316",
        units: [
          {
            id: "s3-kanji-review",
            title: "漢字・語彙の総復習",
            summary: "1〜2学期の語彙をランダムに復習し、ミスを減らす。",
            emoji: "🎯",
            accent: "#f97316",
            playTopic: "kanji",
          },
        ],
      },
      {
        id: "s3-reading",
        label: "現代文（読解）",
        emoji: "📖",
        accent: "#4ade80",
        units: [
          {
            id: "s3-reading-review",
            title: "読解の総合（指示語・接続・要旨）",
            summary: "説明文から小説まで、题型をまたいだ読解力チェック。",
            emoji: "🧠",
            accent: "#4ade80",
            playTopic: "reading",
          },
        ],
      },
      {
        id: "s3-grammar",
        label: "文法",
        emoji: "📐",
        accent: "#38bdf8",
        units: [
          {
            id: "s3-grammar-review",
            title: "文法の総復習（品詞・成分・敬語）",
            summary: "文の分析と敬語の使い分けをまとめて確認。",
            emoji: "✅",
            accent: "#38bdf8",
            playTopic: "grammar",
          },
        ],
      },
      {
        id: "s3-mixdown",
        label: "総合チャレンジ",
        emoji: "🎪",
        accent: "#fbbf24",
        units: [
          {
            id: "s3-mix-rush",
            title: "オールジャンル・ラッシュ",
            summary: "4ステージからランダム出題。試験まわりの切り替え練習に。",
            emoji: "🎪",
            accent: "#fbbf24",
            playTopic: "mix",
          },
        ],
      },
    ],
  },
];

export function semesterPlan(id: SemesterId): SemesterPlan {
  const p = SEMESTER_PLANS.find((s) => s.id === id);
  if (!p) throw new Error("unknown semester");
  return p;
}
