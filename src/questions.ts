import type { DifficultyId, Question, StemTopicId, TopicId } from "./types";
import * as D from "./diagramSvgs";
import * as B from "./question-banks";
import * as X from "./question-banks-extra";
import { mulberry32, shuffle } from "./rng";

function expl(detailed: string, gentler: string): Pick<Question, "explanationDetailed" | "explanationGentler"> {
  return { explanationDetailed: detailed, explanationGentler: gentler };
}

function win(brief: string, diagramSvg?: string): Pick<Question, "explanationOnCorrectBrief"> &
  Partial<Pick<Question, "correctDiagramSvg" | "wrongDiagramSvg">> {
  if (diagramSvg !== undefined) {
    return { explanationOnCorrectBrief: brief, correctDiagramSvg: diagramSvg, wrongDiagramSvg: diagramSvg };
  }
  return { explanationOnCorrectBrief: brief };
}

function makeChoices(correct: string, wrongPool: string[], rng: () => number): { choices: string[]; correctIndex: number } {
  const wrong = shuffle([...new Set(wrongPool.filter((w) => w !== correct))], rng).slice(0, 3);
  const choices = shuffle([correct, ...wrong], rng);
  return { choices, correctIndex: Math.max(0, choices.indexOf(correct)) };
}

function pickOne<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)]!;
}

const KANJI_READ_PROMPTS = [
  (k: string) => `「${k}」の読みは？`,
  (k: string) => `次の漢字「${k}」を正しく読むと？`,
  (k: string) => `テスト形式：「${k}」の読みを選べ。`,
  (k: string) => `「${k}」はどう読む？`,
];

const KANJI_READ_HARD_PROMPTS = [
  (k: string, m: string) => `「${k}」（${m}）の読みは？`,
  (k: string, m: string) => `意味「${m}」の言葉「${k}」の読みは？`,
  (k: string, m: string) => `次の熟語「${k}」＝${m}。読みは？`,
];

function allKanji(rng: () => number) {
  return pickOne([...B.KANJI_ITEMS, ...X.KANJI_EXTRA], rng);
}

// ─── 漢字・語彙（12パターン）─────────────────────────────────

function qKanji(seed: number, difficulty: DifficultyId): Question {
  const rng = mulberry32(seed);
  const mode = Math.floor(rng() * 12);

  if (mode === 0) {
    const item = allKanji(rng);
    const { choices, correctIndex } = makeChoices(item.reading, item.wrongReadings, rng);
    const promptFn =
      difficulty === "hard"
        ? pickOne(KANJI_READ_HARD_PROMPTS, rng)
        : pickOne(KANJI_READ_PROMPTS, rng);
    const prompt =
      difficulty === "hard" ? promptFn(item.kanji, item.meaning) : (promptFn as (k: string) => string)(item.kanji);
    return {
      id: `K-${seed}`,
      topic: "kanji",
      prompt,
      choices,
      correctIndex,
      hint: "音読み・訓読み、または熟語としての読みを思い出そう。",
      ...expl(
        `正解は「${item.reading}」です。\n\n「${item.kanji}」＝${item.meaning}。読み・意味・漢字をセットで覚えると定期テストに強いです。`,
        `意味「${item.meaning}」を先に思い浮かべる。\n\n次にノートで見た読み「${item.reading}」を確認。\n\n声に出して3回で定着しやすいです。`
      ),
      ...win(`当たり！「${item.kanji}」＝ ${item.reading}。`, D.svgKanjiHint(item.reading.slice(0, 2), item.reading)),
    };
  }

  if (mode === 1) {
    const item = pickOne([...B.JUKUGO_ITEMS, ...X.JUKUGO_EXTRA], rng);
    const { choices, correctIndex } = makeChoices(item.meaning, item.wrongMeanings, rng);
    const prompts = [
      `四字熟語「${item.word}」の意味として正しいものは？`,
      `「${item.word}」の意味は？`,
      `次の四字熟語の意味を選べ。\n\n「${item.word}」`,
    ];
    return {
      id: `K-${seed}`,
      topic: "kanji",
      prompt: pickOne(prompts, rng),
      choices,
      correctIndex,
      hint: "4つの漢字の意味をつなげて、全体の意味を想像しよう。",
      ...expl(
        `正解は「${item.meaning}」です。\n\n「${item.word}」は中2でよく出る四字熟語。漢字ごとのイメージをつなげて覚えましょう。`,
        `四字熟語＝4つの漢字の意味をつなげるパズル。\n\n「${item.word}」→ ${item.meaning}。\n\nノートに1行で書いておくと復習に便利です。`
      ),
      ...win(`大正解！「${item.word}」＝ ${item.meaning}。`),
    };
  }

  if (mode === 2) {
    const item = pickOne([...B.HOMOPHONE_ITEMS, ...X.HOMOPHONE_EXTRA], rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    const prompts = [
      `次の文の（　）に入る言葉として最も適切なものは？\n\n${item.context}`,
      `同音異義語：空欄に入る言葉は？\n\n${item.context}`,
      `文脈から選べ。\n\n${item.context}`,
    ];
    return {
      id: `K-${seed}`,
      topic: "kanji",
      prompt: pickOne(prompts, rng),
      choices,
      correctIndex,
      hint: "文全体の意味を読んで、同音異義語を区別しよう。",
      ...expl(
        `正解は「${item.correct}」です。\n\n「${item.context}」に自然に入るのは「${item.correct}」だけです。`,
        `手順：①文を言い換える ②空欄の意味を想像 ③4つを当てはめる。\n\nここでは「${item.correct}」。`
      ),
      ...win(`当たり！文脈から「${item.correct}」。`),
    };
  }

  if (mode === 3) {
    const item = pickOne(B.KANJI_WRITE_ITEMS, rng);
    const uniqueWrong = item.wrong.filter((w) => w !== item.correct);
    const { choices, correctIndex } = makeChoices(item.correct, uniqueWrong, rng);
    const prompts = [
      `「${item.meaning}」という意味を表す漢字の書きとして正しいものは？`,
      `意味から漢字を選べ。\n\n意味：${item.meaning}`,
      `次の意味に合う漢字（熟語）の書きは？\n\n${item.meaning}`,
    ];
    return {
      id: `K-${seed}`,
      topic: "kanji",
      prompt: pickOne(prompts, rng),
      choices,
      correctIndex,
      hint: "意味から漢字を思い浮かべ、画数や部首も確認しよう。",
      ...expl(
        `正解は「${item.correct}」です。\n\n「${item.meaning}」→「${item.correct}」。読みとセットで覚えましょう。`,
        `ノートに「意味｜漢字」を1行で書く。\n\n${item.meaning} → ${item.correct}。`
      ),
      ...win(`当たり！「${item.meaning}」→ ${item.correct}。`),
    };
  }

  if (mode === 4) {
    const item = allKanji(rng);
    const pool = [...B.KANJI_ITEMS, ...X.KANJI_EXTRA];
    const { choices, correctIndex } = makeChoices(item.meaning, shuffle(pool, rng).map((x) => x.meaning).slice(0, 8), rng);
    const prompts = [
      `「${item.kanji}（${item.reading}）」の意味として正しいものは？`,
      `次の言葉の意味は？\n\n${item.kanji}`,
      `読み「${item.reading}」の言葉「${item.kanji}」の意味は？`,
    ];
    return {
      id: `K-${seed}`,
      topic: "kanji",
      prompt: pickOne(prompts, rng),
      choices,
      correctIndex,
      hint: "漢字の形から意味を連想しよう。",
      ...expl(
        `正解は「${item.meaning}」です。\n\n「${item.kanji}」は「${item.meaning}」という意味。`,
        `読み「${item.reading}」と意味「${item.meaning}」をセットで覚える。`
      ),
      ...win(`当たり！「${item.kanji}」＝ ${item.meaning}。`),
    };
  }

  if (mode === 5) {
    const item = pickOne(B.KANJI_IN_CONTEXT, rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    return {
      id: `K-${seed}`,
      topic: "kanji",
      prompt: `空欄に入る漢字（語）として最も適切なものは？\n\n${item.sentence}`,
      choices,
      correctIndex,
      hint: "文の意味と漢字の使い方（送り仮名・熟語）を考えよう。",
      ...expl(
        `正解は「${item.correct}」です。\n\n「${item.sentence.replace("（　）", item.correct)}」`,
        `空欄の前後を読んで、どんな言葉が入るか想像する。\n\nここでは「${item.correct}」。`
      ),
      ...win(`当たり！文脈から「${item.correct}」。`),
    };
  }

  if (mode === 6) {
    const pairs = [
      { a: "異議", b: "反対の意見", wrong: ["賛成の意見", "同じ意見", "無関心"] },
      { a: "要約", b: "要点をまとめること", wrong: ["詳しく書くこと", "感想を書くこと", "引用すること"] },
      { a: "比喩", b: "例えて表現すること", wrong: ["正直に書くこと", "省略すること", "反復すること"] },
      { a: "矛盾", b: "前後が食い違うこと", wrong: ["一致すること", "順序立てること", "整理すること"] },
      { a: "貢献", b: "役立つこと", wrong: ["妨害すること", "無関心", "批判すること"] },
    ];
    const item = pickOne(pairs, rng);
    const { choices, correctIndex } = makeChoices(item.b, item.wrong, rng);
    return {
      id: `K-${seed}`,
      topic: "kanji",
      prompt: `「${item.a}」の意味として正しいものは？`,
      choices,
      correctIndex,
      hint: "語の意味を、短い言葉で言い換えてみよう。",
      ...expl(`正解は「${item.b}」です。\n\n「${item.a}」＝${item.b}。`, `「${item.a}」→ ${item.b}。`),
      ...win(`当たり！「${item.a}」＝ ${item.b}。`),
    };
  }

  if (mode === 7) {
    const item = allKanji(rng);
    const pool = [...B.KANJI_ITEMS, ...X.KANJI_EXTRA];
    const other = pickOne(pool.filter((x) => x.kanji !== item.kanji), rng);
    const correct = item.kanji;
    const { choices, correctIndex } = makeChoices(
      correct,
      [other.kanji, pickOne(pool, rng).kanji, pickOne(pool, rng).kanji],
      rng
    );
    return {
      id: `K-${seed}`,
      topic: "kanji",
      prompt:
        difficulty === "hard"
          ? `意味「${item.meaning}」を表す漢字はどれ？（読みは「${item.reading}」）`
          : `意味「${item.meaning}」を表す漢字はどれ？`,
      choices,
      correctIndex,
      hint: "意味から漢字の形を思い出そう。",
      ...expl(`正解は「${item.kanji}」です。\n\n${item.meaning} → ${item.kanji}（${item.reading}）。`, `意味から漢字を選ぶ。\n\n→ ${item.kanji}。`),
      ...win(`当たり！${item.kanji}（${item.reading}）。`),
    };
  }

  if (mode === 8) {
    const item = pickOne(X.PROVERB_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.meaning, item.wrongMeanings, rng);
    return {
      id: `K-${seed}`,
      topic: "kanji",
      prompt: pickOne([`ことわざ「${item.proverb}」の意味は？`, `「${item.proverb}」が教えてくれることは？`], rng),
      choices,
      correctIndex,
      hint: "ことわざは短い文で教訓を伝える。",
      ...expl(`正解は「${item.meaning}」です。`, `「${item.proverb}」→ ${item.meaning}。`),
      ...win(`当たり！ことわざの意味を理解できました。`),
    };
  }

  if (mode === 9) {
    const item = pickOne(X.OKURIGANA_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    return {
      id: `K-${seed}`,
      topic: "kanji",
      prompt: `送り仮名問題：${item.word}（　）`,
      choices,
      correctIndex,
      hint: "送り仮名は読みを助ける。語尾の形に注目。",
      ...expl(`正解は「${item.correct}」です。\n\n${item.word.replace("（　）", item.correct)}`, `送り仮名を正しく書く。\n\n→ ${item.correct}。`),
      ...win(`当たり！送り仮名は「${item.correct}」。`),
    };
  }

  if (mode === 10) {
    const item = pickOne(X.ANTONYM_PAIRS, rng);
    const { choices, correctIndex } = makeChoices(item.antonym, item.wrong, rng);
    return {
      id: `K-${seed}`,
      topic: "kanji",
      prompt: `「${item.word}」の対義語（反対の意味）として最も適切なものは？`,
      choices,
      correctIndex,
      hint: "意味が正反対になる語を選ぼう。",
      ...expl(`正解は「${item.antonym}」です。\n\n${item.word} ↔ ${item.antonym}。`, `対義語ペアを覚える。\n\n→ ${item.antonym}。`),
      ...win(`当たり！「${item.word}」の対義語は「${item.antonym}」。`),
    };
  }

  const item = pickOne(X.JUKUGO_EXTRA, rng);
  const { choices, correctIndex } = makeChoices(item.word, shuffle([...B.JUKUGO_ITEMS, ...X.JUKUGO_EXTRA], rng).map((j) => j.word).filter((w) => w !== item.word).slice(0, 6), rng);
  return {
    id: `K-${seed}`,
    topic: "kanji",
    prompt: `意味「${item.meaning}」を表す四字熟語はどれ？`,
    choices,
    correctIndex,
    hint: "意味から四字熟語の形を思い出そう。",
    ...expl(`正解は「${item.word}」です。`, `意味 → 四字熟語。\n\n→ ${item.word}。`),
    ...win(`当たり！「${item.word}」。`),
  };
}

// ─── 文法（12パターン）─────────────────────────────────

function qGrammar(seed: number, difficulty: DifficultyId): Question {
  const rng = mulberry32(seed + 401);
  const mode = Math.floor(rng() * 12);

  if (mode === 0) {
    const item = pickOne(B.GRAMMAR_POS, rng);
    const { choices, correctIndex } = makeChoices(item.pos, item.wrong, rng);
    const prompts = [
      `「${item.word}」の品詞はどれ？`,
      `品詞問題：「${item.word}」は何詞？`,
      `次の語の品詞を選べ。\n\n${item.word}`,
    ];
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: pickOne(prompts, rng),
      choices,
      correctIndex,
      hint: "文の中でどんな働きをするか考えよう。",
      ...expl(`正解は「${item.pos}」です。\n\n「${item.word}」は${item.pos}として働きます。`, `品詞＝文での役割。\n\n「${item.word}」→ ${item.pos}。`),
      ...win(`当たり！「${item.word}」は ${item.pos}。`),
    };
  }

  if (mode === 1) {
    const item = pickOne(B.SUBJECT_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: `「${item.sentence}」の${item.label}はどれ？`,
      choices,
      correctIndex,
      hint: "「だれが・なにが」に答える部分を探そう。",
      ...expl(`正解は「${item.correct}」です。\n\n主語は「だれが／なにが + 述語？」に答えます。`, `述語を見つけて「だれが？」と問う。\n\n→ ${item.correct}。`),
      ...win(`当たり！${item.label}は「${item.correct}」。`, D.svgSentenceParts(item.correct, item.sentence.replace(/。$/, "").split(/[はが]/).pop()?.trim() ?? "")),
    };
  }

  if (mode === 2) {
    const item = pickOne(B.PREDICATE_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: `「${item.sentence}」の述語（述語部分）はどれ？`,
      choices,
      correctIndex,
      hint: "文の「何をした・どうなった」を表す中心部分。",
      ...expl(`正解は「${item.correct}」です。\n\n述語＝文の結論部分。`, `文の最後の動作・状態が述語。\n\n→ ${item.correct}。`),
      ...win(`当たり！述語は「${item.correct}」。`, D.svgSentenceParts("主語", item.correct)),
    };
  }

  if (mode === 3) {
    const item = pickOne(B.CONNECTOR_GRAMMAR, rng);
    const { choices, correctIndex } = makeChoices(item.role, item.wrong, rng);
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: `接続詞「${item.word}」の働きとして正しいものは？`,
      choices,
      correctIndex,
      hint: "前の文と後の文の関係を考えよう。",
      ...expl(`正解は「${item.role}」です。`, `「${item.word}」→ ${item.role}。`),
      ...win(`当たり！「${item.word}」は ${item.role}。`),
    };
  }

  if (mode === 4) {
    const pool = difficulty === "hard" ? B.KEIGO_HUMBLE : B.KEIGO_RESPECT;
    const item = pickOne(pool, rng);
    const kind = item.kind;
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: `「${item.plain}」の${kind}語として正しいものは？`,
      choices,
      correctIndex,
      hint: kind === "尊敬" ? "相手の動作を高める言い方。" : "自分を低める言い方。",
      ...expl(`正解は「${item.correct}」です。\n\n${kind}語：「${item.plain}」→「${item.correct}」。`, `だれがする動作かで尊敬／謙譲を選ぶ。\n\n→ ${item.correct}。`),
      ...win(`当たり！${kind}語は「${item.correct}」。`),
    };
  }

  if (mode === 5) {
    const item = pickOne(B.MODIFIER_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: `「${item.sentence}」で「${item.modifies}」を修飾している語句は？`,
      choices,
      correctIndex,
      hint: "「どんな〜」「どのように〜」と問いかけてみよう。",
      ...expl(`正解は「${item.correct}」です。\n\n「${item.correct}」が「${item.modifies}」を修飾しています。`, `「${item.modifies}」の前（または後）で説明している語句を探す。\n\n→ ${item.correct}。`),
      ...win(`当たり！修飾語は「${item.correct}」。`),
    };
  }

  if (mode === 6) {
    const item = pickOne(B.PARTICLE_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    const sent = item.sentence.replace("（　）", "（　）");
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: `助詞問題：空欄に入る助詞は？\n\n${sent}`,
      choices,
      correctIndex,
      hint: item.hint,
      ...expl(`正解は「${item.correct}」です。\n\n${item.hint}`, `助詞は「前後の関係」で決まる。\n\n→ ${item.correct}。`),
      ...win(`当たり！助詞は「${item.correct}」。`),
    };
  }

  if (mode === 7) {
    const item = pickOne(X.OBJECT_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: pickOne([`「${item.sentence}」の目的語はどれ？`, `目的語問題：${item.sentence}`], rng),
      choices,
      correctIndex,
      hint: "「何を／誰を + 動詞？」に答える部分。",
      ...expl(`正解は「${item.correct}」です。\n\n動作の対象が目的語。`, `述語を見つけて「何を？」→ ${item.correct}。`),
      ...win(`当たり！目的語は「${item.correct}」。`),
    };
  }

  if (mode === 8) {
    const item = pickOne(X.SENTENCE_TYPE_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.type, item.wrong, rng);
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: `「${item.sentence}」はどんな文の種類？`,
      choices,
      correctIndex,
      hint: "語尾・語調（？／！／なさい／ない）に注目。",
      ...expl(`正解は「${item.type}」です。`, `文の種類＝語尾と働き。\n\n→ ${item.type}。`),
      ...win(`当たり！${item.type}ですね。`),
    };
  }

  if (mode === 9) {
    const item = pickOne(X.CONNECTOR_CONTEXT, rng);
    const { choices, correctIndex } = makeChoices(item.connector, item.wrong, rng);
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: `空欄に入る接続詞は？\n\n${item.before}（　）${item.after}`,
      choices,
      correctIndex,
      hint: "前後の関係（逆接・因果・追加）を考えよう。",
      ...expl(`正解は「${item.connector}」です。`, `前後の関係から接続詞を選ぶ。\n\n→ ${item.connector}。`),
      ...win(`当たり！接続詞は「${item.connector}」。`),
    };
  }

  if (mode === 10) {
    const item = pickOne(X.TEINEI_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.teinei, item.wrong, rng);
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: `「${item.plain}」の丁寧語（です・ます調）として正しいものは？`,
      choices,
      correctIndex,
      hint: "語尾を「ます形」に変えよう。",
      ...expl(`正解は「${item.teinei}」です。`, `丁寧語：${item.plain} → ${item.teinei}。`),
      ...win(`当たり！丁寧語は「${item.teinei}」。`),
    };
  }

  if (mode === 11) {
    const adjVsNoun = [
      { word: "静かだ", type: "形容動詞", wrong: ["形容詞", "名詞", "副詞"] },
      { word: "美しい", type: "形容詞", wrong: ["形容動詞", "副詞", "名詞"] },
      { word: "きれいな", type: "連体詞", wrong: ["形容詞", "副詞", "助詞"] },
      { word: "幸福な", type: "連体詞", wrong: ["名詞", "副詞", "動詞"] },
    ];
    const item = pickOne(adjVsNoun, rng);
    const { choices, correctIndex } = makeChoices(item.type, item.wrong, rng);
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: `「${item.word}」の品詞として最も適切なものは？`,
      choices,
      correctIndex,
      hint: "「〜だ／〜い／〜な」の語尾に注目。",
      ...expl(`正解は「${item.type}」です。`, `語尾の形で品詞を見分ける。\n\n→ ${item.type}。`),
      ...win(`当たり！「${item.word}」は ${item.type}。`),
    };
  }

  return qGrammar(seed + 99, difficulty);
}

// ─── 古典（12パターン）─────────────────────────────────

function qClassic(seed: number, _difficulty: DifficultyId): Question {
  const rng = mulberry32(seed + 701);
  const mode = Math.floor(rng() * 12);

  if (mode === 0) {
    const item = pickOne(B.JODOU_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.meaning, item.wrong, rng);
    const ex = item.example ? `\n\n例：${item.example}` : "";
    return {
      id: `C-${seed}`,
      topic: "classic",
      prompt: `古文の助動詞「${item.classical}」の意味として正しいものは？`,
      choices,
      correctIndex,
      hint: "文末の助動詞は、文全体の意味を決めます。",
      ...expl(`正解は「${item.meaning}」です。${ex}`, `助動詞「${item.classical}」→ ${item.meaning}。`),
      ...win(`当たり！「${item.classical}」＝ ${item.meaning}。`),
    };
  }

  if (mode === 1) {
    const item = pickOne(B.CLASSICAL_WORDS, rng);
    const { choices, correctIndex } = makeChoices(item.modern, item.wrong, rng);
    const prompts = [
      `古典語「${item.line}」の現代語訳として最も適切なものは？`,
      `次の語句の意味は？\n\n${item.line}`,
      `枕草子・源氏などで出る語。「${item.line}」＝？`,
    ];
    return {
      id: `C-${seed}`,
      topic: "classic",
      prompt: pickOne(prompts, rng),
      choices,
      correctIndex,
      hint: "教科書の語句リストを思い出そう。",
      ...expl(`正解は「${item.modern}」です。\n\n「${item.line}」→ ${item.modern}。`, `古典語カード：「${item.line}」→ ${item.modern}。`),
      ...win(`当たり！「${item.line}」→ ${item.modern}。`, D.svgClassicTranslation(item.line, item.modern)),
    };
  }

  if (mode === 2) {
    const item = pickOne(B.WORK_QUOTES, rng);
    const { choices, correctIndex } = makeChoices(item.author, item.wrong, rng);
    return {
      id: `C-${seed}`,
      topic: "classic",
      prompt: `「${item.sentence}」が出てくる作品は？`,
      choices,
      correctIndex,
      hint: "名句・作者・作品名をセットで覚えよう。",
      ...expl(`正解は「${item.author}」です。`, `「${item.sentence}」→ ${item.author}。`),
      ...win(`当たり！${item.author}の作品ですね。`),
    };
  }

  if (mode === 3) {
    const item = pickOne(B.KANBUN_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.reading, item.wrong, rng);
    return {
      id: `C-${seed}`,
      topic: "classic",
      prompt: `漢文「${item.text}」の返り点を踏まえた読み方として正しいものは？`,
      choices,
      correctIndex,
      hint: "返り点で語順を入れ替えて読みます。",
      ...expl(`正解は「${item.reading}」です。`, `漢文：返り点→語順→助詞補う。\n\n→「${item.reading}」。`),
      ...win(`当たり！「${item.reading}」。`),
    };
  }

  if (mode === 4) {
    const item = pickOne(B.CLASSIC_SENTENCES, rng);
    const { choices, correctIndex } = makeChoices(item.modern, item.wrong, rng);
    return {
      id: `C-${seed}`,
      topic: "classic",
      prompt: `次の古文の現代語訳として最も適切なものは？\n\n「${item.classical}」`,
      choices,
      correctIndex,
      hint: "助動詞・古典語の意味を現代語に置き換えよう。",
      ...expl(`正解は「${item.modern}」です。`, `古文を短い単位で現代語に。\n\n→ ${item.modern}。`),
      ...win(`当たり！現代語訳は「${item.modern.slice(0, 20)}…」。`, D.svgClassicTranslation(item.classical.slice(0, 12), item.modern.slice(0, 14))),
    };
  }

  if (mode === 5) {
    const items = [
      { j: "けり", role: "過去・詠嘆", sentence: "花咲きにけり", modern: "花が咲いたのだ" },
      { j: "たり", role: "断定", sentence: "月やあらぬ", modern: "月ではない" },
      { j: "ず", role: "打消", sentence: "知らず", modern: "知らない" },
      { j: "べし", role: "推量・当然", sentence: "学ぶべし", modern: "学ぶべきだ" },
      { j: "らむ", role: "推量", sentence: "雨降らむ", modern: "雨が降るだろう" },
    ];
    const item = pickOne(items, rng);
    const correct = item.modern;
    const { choices, correctIndex } = makeChoices(
      correct,
      shuffle(items.filter((x) => x.sentence !== item.sentence).map((x) => x.modern), rng),
      rng
    );
    return {
      id: `C-${seed}`,
      topic: "classic",
      prompt: `「${item.sentence}」の現代語訳として最も適切なものは？（助動詞「${item.j}」に注意）`,
      choices,
      correctIndex,
      hint: `助動詞「${item.j}」＝${item.role}。`,
      ...expl(`正解は「${correct}」です。\n\n「${item.j}」の意味を訳に反映させる。`, `助動詞の意味を訳に入れる。\n\n→ ${correct}。`),
      ...win(`当たり！「${item.sentence}」→ ${correct}。`),
    };
  }

  if (mode === 6) {
    const authors = [
      { author: "清少納言", work: "枕草子", wrong: ["紫式部", "藤原道長", "和泉式部"] },
      { author: "紫式部", work: "源氏物語", wrong: ["清少納言", "和泉式部", "藤原道長"] },
      { author: "和泉式部", work: "和泉式部集", wrong: ["紫式部", "清少納言", "小野小町"] },
      { author: "菅原孝標女", work: "更級日記", wrong: ["紫式部", "清少納言", "和泉式部"] },
    ];
    const item = pickOne(authors, rng);
    const { choices, correctIndex } = makeChoices(item.work, item.wrong, rng);
    return {
      id: `C-${seed}`,
      topic: "classic",
      prompt: `${item.author}の代表作は？`,
      choices,
      correctIndex,
      hint: "作者と作品名はセットで覚えよう。",
      ...expl(`正解は「${item.work}」です。`, `${item.author} → ${item.work}。`),
      ...win(`当たり！${item.author}の${item.work}。`),
    };
  }

  if (mode === 7) {
    const item = pickOne(X.WAKA_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.theme, item.wrong, rng);
    return {
      id: `C-${seed}`,
      topic: "classic",
      prompt: `次の和歌が表すテーマ（心情・内容）として最も適切なものは？\n\n「${item.waka}」`,
      choices,
      correctIndex,
      hint: "和歌は短い中に感情や情景を込める。",
      ...expl(`正解は「${item.theme}」です。`, `和歌のテーマを読み取る。\n\n→ ${item.theme}。`),
      ...win(`当たり！テーマは「${item.theme}」。`),
    };
  }

  if (mode === 8) {
    const item = pickOne(X.LITERARY_HISTORY, rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    return {
      id: `C-${seed}`,
      topic: "classic",
      prompt: item.question,
      choices,
      correctIndex,
      hint: "文学史・作者・作品名を整理しよう。",
      ...expl(`正解は「${item.correct}」です。`, `文学史の基本問題。\n\n→ ${item.correct}。`),
      ...win(`当たり！${item.correct}。`),
    };
  }

  if (mode === 9) {
    const item = pickOne(X.CLASSICAL_EXTRA, rng);
    const { choices, correctIndex } = makeChoices(item.modern, item.wrong, rng);
    return {
      id: `C-${seed}`,
      topic: "classic",
      prompt: `古典語「${item.line}」の意味は？`,
      choices,
      correctIndex,
      hint: "語句リストを思い出そう。",
      ...expl(`正解は「${item.modern}」です。`, `「${item.line}」→ ${item.modern}。`),
      ...win(`当たり！「${item.line}」→ ${item.modern}。`),
    };
  }

  if (mode === 10) {
    const item = pickOne(X.KANBUN_EXTRA, rng);
    const { choices, correctIndex } = makeChoices(item.reading, item.wrong, rng);
    return {
      id: `C-${seed}`,
      topic: "classic",
      prompt: `漢文「${item.text}」の読み方として正しいものは？`,
      choices,
      correctIndex,
      hint: "返り点と語順に注意。",
      ...expl(`正解は「${item.reading}」です。`, `→「${item.reading}」。`),
      ...win(`当たり！漢文の読み「${item.reading}」。`),
    };
  }

  const item = pickOne([...B.CLASSICAL_WORDS, ...X.CLASSICAL_EXTRA], rng);
  const pool = [...B.CLASSICAL_WORDS, ...X.CLASSICAL_EXTRA].filter((x) => x.line !== item.line);
  const { choices, correctIndex } = makeChoices(item.line, shuffle(pool, rng).map((x) => x.line).slice(0, 6), rng);
  return {
    id: `C-${seed}`,
    topic: "classic",
    prompt: `現代語「${item.modern}」に対応する古典語はどれ？`,
    choices,
    correctIndex,
    hint: "現代語から古典語を逆引きしよう。",
    ...expl(`正解は「${item.line}」です。`, `「${item.modern}」→「${item.line}」。`),
    ...win(`当たり！「${item.modern}」→「${item.line}」。`),
  };
}

// ─── 読解（12パターン）─────────────────────────────────

function qReading(seed: number, _difficulty: DifficultyId): Question {
  const rng = mulberry32(seed + 1103);
  const mode = Math.floor(rng() * 12);

  if (mode === 0) {
    const item = pickOne([...B.PARAGRAPH_SUMMARY, ...X.PARAGRAPH_EXTRA], rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    const prompts = [
      `次の段落の内容として最も適切なものは？\n\n「${item.passage}」`,
      `段落を読んで、内容を選べ。\n\n${item.passage}`,
      `この段落で言いたいことは？\n\n「${item.passage}」`,
    ];
    return {
      id: `R-${seed}`,
      topic: "reading",
      prompt: pickOne(prompts, rng),
      choices,
      correctIndex,
      hint: item.hint,
      ...expl(`正解は「${item.correct}」です。`, item.hint + `\n\n→ ${item.correct}。`),
      ...win(`当たり！段落の内容を読み取れました。`, D.svgReadingLink("前文", "接続→後文")),
    };
  }

  if (mode === 1) {
    const item = pickOne(B.REFERENCE_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    const prompts = [
      `「${item.passage}」の「${item.word}」が指すものは？`,
      `指示語問題：「${item.word}」は何を指す？\n\n${item.passage}`,
      `「${item.word}」の指示内容を選べ。\n\n${item.passage}`,
    ];
    return {
      id: `R-${seed}`,
      topic: "reading",
      prompt: pickOne(prompts, rng),
      choices,
      correctIndex,
      hint: "指示語は前文をたどろう。",
      ...expl(`正解は「${item.correct}」です。\n\n「${item.word}」→ ${item.correct}。`, `前文で「${item.word}」の先行詞を探す。\n\n→ ${item.correct}。`),
      ...win(`当たり！「${item.word}」＝ ${item.correct}。`),
    };
  }

  if (mode === 2) {
    const item = pickOne(B.CONNECTOR_READING, rng);
    const { choices, correctIndex } = makeChoices(item.role, item.wrong, rng);
    return {
      id: `R-${seed}`,
      topic: "reading",
      prompt: `接続表現「${item.word}」が示す、前後の文の関係として正しいものは？`,
      choices,
      correctIndex,
      hint: "接続詞は段落の論理構造の鍵。",
      ...expl(`正解は「${item.role}」です。`, `「${item.word}」→ ${item.role}。`),
      ...win(`当たり！「${item.word}」は ${item.role}。`),
    };
  }

  if (mode === 3) {
    const item = pickOne(B.GIST_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    return {
      id: `R-${seed}`,
      topic: "reading",
      prompt: `次の段落の主旨（筆者が最も伝えたいこと）として最も適切なものは？\n\n「${item.passage}」`,
      choices,
      correctIndex,
      hint: "細部ではなく、段落全体を一言で言い直したもの。",
      ...expl(`正解は「${item.correct}」です。`, `「で、結局なに？」→ ${item.correct}。`),
      ...win(`当たり！主旨は「${item.correct}」。`),
    };
  }

  if (mode === 4) {
    const item = pickOne(B.AUTHOR_OPINION, rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    return {
      id: `R-${seed}`,
      topic: "reading",
      prompt: `次の段落で、筆者が述べている考えとして最も適切なものは？\n\n「${item.passage}」`,
      choices,
      correctIndex,
      hint: item.hint,
      ...expl(`正解は「${item.correct}」です。`, item.hint),
      ...win(`当たり！筆者の考えを読み取れました。`),
    };
  }

  if (mode === 5) {
    const item = pickOne(B.TITLE_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    return {
      id: `R-${seed}`,
      topic: "reading",
      prompt: `次の段落にもっともふさわしいタイトルは？\n\n「${item.passage}」`,
      choices,
      correctIndex,
      hint: "段落の核心を短く表すタイトルを選ぼう。",
      ...expl(`正解は「${item.correct}」です。`, `主旨を短く表す → ${item.correct}。`),
      ...win(`当たり！タイトルは「${item.correct}」。`),
    };
  }

  if (mode === 6) {
    const items = [
      {
        passage: "彼は努力を続けた。それでも結果は出なかった。しかし、彼は諦めなかった。",
        question: "「しかし」の後で筆者が伝えたいことに近いものは？",
        correct: "結果が出なくても諦めなかった",
        wrong: ["努力をやめた", "結果がすぐ出た", "諦めた"],
      },
      {
        passage: "この町は以前、人口が減っていた。ところが最近、若者が戻り始めた。",
        question: "「ところが」の後の内容は？",
        correct: "最近は若者が戻り始めた",
        wrong: ["人口が減り続けた", "若者はいない", "町が消えた"],
      },
      {
        passage: "読書は楽しい。一方、読みすぎて目が疲れることもある。",
        question: "「一方」の後で述べられていることは？",
        correct: "読みすぎて目が疲れることもある",
        wrong: ["読書は楽しくない", "目は疲れない", "読書をやめた"],
      },
    ];
    const item = pickOne(items, rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    return {
      id: `R-${seed}`,
      topic: "reading",
      prompt: `${item.question}\n\n「${item.passage}」`,
      choices,
      correctIndex,
      hint: "接続詞の後ろを重点的に読もう。",
      ...expl(`正解は「${item.correct}」です。`, `接続詞の後＝焦点。\n\n→ ${item.correct}。`),
      ...win(`当たり！接続詞の後を読み取れました。`),
    };
  }

  if (mode === 7) {
    const toneItems = [
      { passage: "ああ、なんと美しい花だろう。春の訪れを感じさせる香りが漂っている。", correct: "美しさへの感動・賛美", wrong: ["悲しみ", "怒り", "恐怖"] },
      { passage: "彼の態度は実に遺憾である。約束を破るなど、信頼に値しない。", correct: "不満・批判", wrong: ["感動", "喜び", "中立"] },
      { passage: "もう二度と、あの日のような失敗は繰り返したくない。", correct: "後悔・決意", wrong: ["喜び", "羨望", "軽蔑"] },
      { passage: "本当にありがたい。こんな支援があってこそ、続けられた。", correct: "感謝・喜び", wrong: ["怒り", "失望", "無関心"] },
    ];
    const item = pickOne(toneItems, rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    return {
      id: `R-${seed}`,
      topic: "reading",
      prompt: `次の段落の筆者の気持ち（トーン）に最も近いものは？\n\n「${item.passage}」`,
      choices,
      correctIndex,
      hint: "語句のニュアンスに注目。",
      ...expl(`正解は「${item.correct}」です。`, `語句から感情を読み取る。\n\n→ ${item.correct}。`),
      ...win(`当たり！筆者の気持ちは「${item.correct}」。`),
    };
  }

  if (mode === 8) {
    const item = pickOne(X.KEYWORD_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.keyword, item.wrong, rng);
    return {
      id: `R-${seed}`,
      topic: "reading",
      prompt: `次の段落のキーワード（中心語）として最も重要なものは？\n\n「${item.passage}」`,
      choices,
      correctIndex,
      hint: "段落の主張に直結する語を選ぼう。",
      ...expl(`正解は「${item.keyword}」です。`, `段落の核心語。\n\n→ ${item.keyword}。`),
      ...win(`当たり！キーワードは「${item.keyword}」。`),
    };
  }

  if (mode === 9) {
    const item = pickOne(X.WRONG_SUMMARY_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.wrongChoice, item.wrong, rng);
    return {
      id: `R-${seed}`,
      topic: "reading",
      prompt: `次の段落の内容として【誤っている】ものは？\n\n「${item.passage}」`,
      choices,
      correctIndex,
      hint: "段落に書かれていない・反する選択肢を探そう。",
      ...expl(`正解は「${item.wrongChoice}」です。\n\nこれは段落の内容と合いません。`, `誤りの選択肢を見つける。\n\n→ ${item.wrongChoice}。`),
      ...win(`当たり！誤っているのは「${item.wrongChoice}」。`),
    };
  }

  if (mode === 10) {
    const item = pickOne(X.RHETORIC_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.type, item.wrong, rng);
    return {
      id: `R-${seed}`,
      topic: "reading",
      prompt: `「${item.sentence}」に使われている表現技法は？`,
      choices,
      correctIndex,
      hint: "比喩・擬人・反復・倒置などを区別しよう。",
      ...expl(`正解は「${item.type}」です。`, `表現技法を見分ける。\n\n→ ${item.type}。`),
      ...win(`当たり！表現は「${item.type}」。`),
    };
  }

  if (mode === 11) {
    const item = pickOne(X.INFERENCE_ITEMS, rng);
    const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
    return {
      id: `R-${seed}`,
      topic: "reading",
      prompt: `次の記述から読み取れることとして最も適切なものは？\n\n「${item.passage}」`,
      choices,
      correctIndex,
      hint: "書かれていないことも、行動から推測できる。",
      ...expl(`正解は「${item.correct}」です。`, `記述から推測する。\n\n→ ${item.correct}。`),
      ...win(`当たり！推測は「${item.correct}」。`),
    };
  }

  return qReading(seed + 77, _difficulty);
}

const STEM_TOPICS: StemTopicId[] = ["kanji", "grammar", "classic", "reading"];

function stemQuestion(seed: number, stem: StemTopicId, difficulty: DifficultyId): Question {
  if (stem === "kanji") return qKanji(seed, difficulty);
  if (stem === "grammar") return qGrammar(seed, difficulty);
  if (stem === "classic") return qClassic(seed, difficulty);
  return qReading(seed, difficulty);
}

export function buildQuestionDeck(topic: TopicId, difficulty: DifficultyId, count: number, baseSeed: number): Question[] {
  if (topic === "mix") {
    const rng = mulberry32((baseSeed ^ 0x4b4b47) >>> 0);
    const out: Question[] = [];
    for (let i = 0; i < count; i++) {
      const stem = STEM_TOPICS[Math.floor(rng() * STEM_TOPICS.length)]!;
      const seed = baseSeed * 1000 + i * 31 + stem.length * 17;
      out.push(stemQuestion(seed, stem, difficulty));
    }
    return out;
  }
  const out: Question[] = [];
  const stem = topic as StemTopicId;
  for (let i = 0; i < count; i++) {
    const seed = baseSeed * 1000 + i * 17 + topic.length * 3;
    out.push(stemQuestion(seed, stem, difficulty));
  }
  return out;
}
