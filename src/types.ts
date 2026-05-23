export type TopicId = "kanji" | "grammar" | "classic" | "reading" | "mix";

/** mix 親モード以外の、問題が属する単元 */
export type StemTopicId = Exclude<TopicId, "mix">;

export type DifficultyId = "normal" | "hard";

export interface TopicMeta {
  id: TopicId;
  title: string;
  subtitle: string;
  emoji: string;
  accent: string;
  /** 指定レベル未満ならロック（省略＝Lv1から） */
  unlockLevel?: number;
}

export interface Question {
  id: string;
  topic: StemTopicId;
  prompt: string;
  choices: string[];
  correctIndex: number;
  hint?: string;
  explanationDetailed: string;
  explanationGentler: string;
  explanationOnCorrectBrief: string;
  correctDiagramSvg?: string;
  wrongDiagramSvg?: string;
}

export interface GameState {
  topic: TopicId;
  difficulty: DifficultyId;
  questionIndex: number;
  score: number;
  combo: number;
  maxCombo: number;
  lives: number;
  streakCorrect: number;
}

export interface Profile {
  totalXp: number;
  bestScores: Partial<Record<TopicId, number>>;
  unlockedBadges: string[];
  roundsPlayed: number;
  topicsPlayed: TopicId[];
}
