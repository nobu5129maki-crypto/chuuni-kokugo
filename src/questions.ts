import type { DifficultyId, Question, StemTopicId, TopicId } from "./types";
import * as D from "./diagramSvgs";
import { mulberry32, shuffle } from "./rng";

function expl(detailed: string, gentler: string): Pick<Question, "explanationDetailed" | "explanationGentler"> {
  return { explanationDetailed: detailed, explanationGentler: gentler };
}

function win(brief: string, diagramSvg?: string): Pick<Question, "explanationOnCorrectBrief"> &
  Partial<Pick<Question, "correctDiagramSvg" | "wrongDiagramSvg">> {
  if (diagramSvg !== undefined) {
    return {
      explanationOnCorrectBrief: brief,
      correctDiagramSvg: diagramSvg,
      wrongDiagramSvg: diagramSvg,
    };
  }
  return { explanationOnCorrectBrief: brief };
}

function makeChoices(correct: string, wrongPool: string[], rng: () => number): { choices: string[]; correctIndex: number } {
  const wrong = shuffle([...new Set(wrongPool.filter((w) => w !== correct))], rng).slice(0, 3);
  const choices = shuffle([correct, ...wrong], rng);
  return { choices, correctIndex: choices.indexOf(correct) };
}

// ─── 漢字・語彙 ─────────────────────────────────────────

const KANJI_ITEMS: { kanji: string; reading: string; meaning: string; wrongReadings: string[] }[] = [
  { kanji: "異議", reading: "いぎ", meaning: "反対の意見", wrongReadings: ["いぎょう", "いき", "ぎい"] },
  { kanji: "妥協", reading: "だきょう", meaning: "互いに譲り合うこと", wrongReadings: ["たきょう", "だきょ", "じゅうきょう"] },
  { kanji: "頻繁", reading: "ひんぱん", meaning: "何度も繰り返すさま", wrongReadings: ["ひんばん", "びんぱん", "ひんぺん"] },
  { kanji: "抽象", reading: "ちゅうしょう", meaning: "具体から離れた考え方", wrongReadings: ["ちゅうぞう", "ちょうしょう", "ちゅうしょ"] },
  { kanji: "矛盾", reading: "むじゅん", meaning: "前後が食い違うこと", wrongReadings: ["ぼうじゅん", "むじゅう", "もうじゅん"] },
  { kanji: "顕著", reading: "けんちょ", meaning: "目立ってはっきりしている", wrongReadings: ["けんしょ", "げんちょ", "けんちゃく"] },
  { kanji: "抑制", reading: "よくせい", meaning: "押さえて抑えること", wrongReadings: ["よくし", "よくぜい", "おくせい"] },
  { kanji: "貢献", reading: "こうけん", meaning: "社会などに役立つこと", wrongReadings: ["こうげん", "くんけん", "こうかん"] },
  { kanji: "暫定", reading: "ざんてい", meaning: "しばらくの間の仮決め", wrongReadings: ["ざんちょう", "せんてい", "ざんて"] },
  { kanji: "顕微", reading: "けんび", meaning: "非常に小さいもの（顕微鏡）", wrongReadings: ["けんみ", "げんび", "けんい"] },
];

const JUKUGO_ITEMS: { word: string; meaning: string; wrongMeanings: string[] }[] = [
  { word: "一石二鳥", meaning: "一つのことで二つの利益を得る", wrongMeanings: ["二つの失敗を避ける", "鳥を二羽捕まえる", "石を二つ投げる"] },
  { word: "自画自賛", meaning: "自分で自分をほめる", wrongMeanings: ["絵を描いて褒める", "他人を批判する", "計画を立てる"] },
  { word: "以心伝心", meaning: "言葉がなくても心が通じ合う", wrongMeanings: ["心を入れ替える", "秘密を守る", "手紙で伝える"] },
  { word: "温故知新", meaning: "古いことを学んで新しい知識を得る", wrongMeanings: ["新しいものだけを学ぶ", "昔を忘れる", "温度を調べる"] },
  { word: "切磋琢磨", meaning: "互いに励まし高め合う", wrongMeanings: ["石を研ぐ", "競争して争う", "一人で努力する"] },
];

const HOMOPHONE_ITEMS: { context: string; correct: string; wrong: string[] }[] = [
  { context: "新しい（　）を立てる", correct: "計画", wrong: ["経過", "軽快", "啓蒙"] },
  { context: "（　）を深める", correct: "理解", wrong: ["起立", "群立", "解離"] },
  { context: "（　）を整える", correct: "体制", wrong: ["大勢", "体勢", "停滞"] },
  { context: "意見の（　）がある", correct: "相違", wrong: ["想定", "相当", "装丁"] },
];

function qKanji(seed: number, difficulty: DifficultyId): Question {
  const rng = mulberry32(seed);
  const mode = Math.floor(rng() * 4);

  if (mode === 0) {
    const item = KANJI_ITEMS[Math.floor(rng() * KANJI_ITEMS.length)]!;
    const { choices, correctIndex } = makeChoices(item.reading, item.wrongReadings, rng);
    return {
      id: `K-${seed}`,
      topic: "kanji",
      prompt: difficulty === "hard" ? `次の熟語「${item.kanji}」（${item.meaning}）の読みは？` : `「${item.kanji}」の読みは？`,
      choices,
      correctIndex,
      hint: "音読み・訓読みのどちらか、または熟語として覚えた読みを思い出そう。",
      ...expl(
        `正解は「${item.reading}」です。\n\n「${item.kanji}」は「${item.meaning}」という意味の言葉です。テストでは漢字そのものと意味・読みをセットで覚えると強いです。`,
        `まず意味「${item.meaning}」を頭に置きます。\n\n次に、教科書やノートで出会った読みを思い出す。ここでは「${item.reading}」。\n\n声に出して3回言うと、定着しやすいです。`
      ),
      ...win(`当たり！「${item.kanji}」＝ ${item.reading}。意味もセットで覚えよう。`, D.svgKanjiHint(item.reading.slice(0, 2), item.reading)),
    };
  }

  if (mode === 1) {
    const item = JUKUGO_ITEMS[Math.floor(rng() * JUKUGO_ITEMS.length)]!;
    const { choices, correctIndex } = makeChoices(item.meaning, item.wrongMeanings, rng);
    return {
      id: `K-${seed}`,
      topic: "kanji",
      prompt: `四字熟語「${item.word}」の意味として正しいものは？`,
      choices,
      correctIndex,
      hint: "漢字一つずつのイメージから、全体の意味を推測してみよう。",
      ...expl(
        `正解は「${item.meaning}」です。\n\n「${item.word}」は中2でよく出る四字熟語の一つ。漢字の意味をつなげて、全体の意味を言葉にできるようにしましょう。`,
        `四字熟語は「4つの漢字の意味をつなげる」ゲームだと考えてください。\n\n「${item.word}」→ ${item.meaning}。\n\nノートに「熟語｜意味」を1行で書くと復習しやすいです。`
      ),
      ...win(`大正解！「${item.word}」＝ ${item.meaning}。`),
    };
  }

  if (mode === 2) {
    const items = shuffle([...HOMOPHONE_ITEMS], rng);
    const item = items[0]!;
    const pool = shuffle([item.correct, ...item.wrong.filter((w) => w !== item.correct)], rng);
    const unique = [...new Set(pool)].slice(0, 4);
    const correctIndex = unique.indexOf(item.correct);
    return {
      id: `K-${seed}`,
      topic: "kanji",
      prompt: `次の文の（　）に入る言葉として最も適切なものは？\n\n${item.context}`,
      choices: unique,
      correctIndex: correctIndex >= 0 ? correctIndex : 0,
      hint: "文全体の意味を読んで、同音異義語を区別しよう。",
      ...expl(
        `正解は「${item.correct}」です。\n\n文脈「${item.context}」に自然に入るのは「${item.correct}」。同じ読みの別の言葉は意味が合いません。`,
        `やり方はシンプルです。\n\n①文の意味を日本語で言い直す\n②（　）に入る言葉の意味を想像する\n③4つの選択肢を1つずつ当てはめる\n\nここでは「${item.correct}」だけがスッと入ります。`
      ),
      ...win(`当たり！文脈から「${item.correct}」と判断できました。`),
    };
  }

  const writeItems = [
    { meaning: "反対の意見", correct: "異議", wrong: ["異儀", "意義", "異議"] },
    { meaning: "互いに譲り合うこと", correct: "妥協", wrong: ["打協", "妥協", "多協"] },
    { meaning: "目立ってはっきりしている", correct: "顕著", wrong: ["健著", "顕著", "検著"] },
    { meaning: "社会などに役立つこと", correct: "貢献", wrong: ["貢献", "貢建", "公献"] },
  ];
  const item = writeItems[Math.floor(rng() * writeItems.length)]!;
  const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
  return {
    id: `K-${seed}`,
    topic: "kanji",
    prompt: `「${item.meaning}」という意味を表す漢字の書きとして正しいものは？`,
    choices,
    correctIndex,
    hint: "意味から漢字を思い浮かべ、画数や部首も確認しよう。",
    ...expl(
      `正解は「${item.correct}」です。\n\n「${item.meaning}」を表す漢字は「${item.correct}」。読みと意味をセットで覚えましょう。`,
      `意味「${item.meaning}」をノートに書き、横に漢字「${item.correct}」を書く。\n\nこれを見るだけでも、書き問題に強くなります。`
    ),
    ...win(`当たり！「${item.meaning}」→ ${item.correct}。`),
  };
}

// ─── 文法 ─────────────────────────────────────────

function qGrammar(seed: number, _difficulty: DifficultyId): Question {
  const rng = mulberry32(seed + 401);
  const mode = Math.floor(rng() * 5);

  if (mode === 0) {
    const items = [
      { word: "美しい", pos: "形容詞", wrong: ["副詞", "名詞", "連体詞"] },
      { word: "静かに", pos: "副詞", wrong: ["形容詞", "連体詞", "助詞"] },
      { word: "学校", pos: "名詞", wrong: ["代名詞", "動詞", "形容動詞"] },
      { word: "走る", pos: "動詞", wrong: ["名詞", "副詞", "助動詞"] },
      { word: "これ", pos: "代名詞", wrong: ["名詞", "連体詞", "副詞"] },
    ];
    const item = items[Math.floor(rng() * items.length)]!;
    const { choices, correctIndex } = makeChoices(item.pos, item.wrong, rng);
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: `「${item.word}」の品詞はどれ？`,
      choices,
      correctIndex,
      hint: "文の中でどんな働きをするか考えよう。",
      ...expl(
        `正解は「${item.pos}」です。\n\n「${item.word}」は文の中で${item.pos}として働きます。品詞は「その言葉が文でどんな役割をするか」で決まります。`,
        `品詞の見分け方：\n\n・名詞＝もの・人・場所の名前\n・動詞＝動き・状態（語尾がう段など）\n・形容詞＝「〜い」で終わる性質\n・副詞＝動詞や形容詞を修飾\n\n「${item.word}」→ ${item.pos}。`
      ),
      ...win(`当たり！「${item.word}」は ${item.pos}。`),
    };
  }

  if (mode === 1) {
    const sentence = "太郎は本を読む。";
    const correct = "太郎";
    const wrong = ["は", "本を", "読む"];
    const { choices, correctIndex } = makeChoices(correct, wrong, rng);
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: `「${sentence}」の主語はどれ？`,
      choices,
      correctIndex,
      hint: "「〜は」「〜が」などの後ろ、または動作をする主体を探そう。",
      ...expl(
        `正解は「${correct}」です。\n\n主語は「だれが・なにが」に答える部分。この文では「だれが読む？」→ 太郎。`,
        `主語の見つけ方：\n\n①述語（動詞）を見つける → 「読む」\n②「だれが／なにが + 読む？」と問う → 「太郎」\n\n「は」は主題を示す助詞で、主語「太郎」とセットです。`
      ),
      ...win(`当たり！主語は「${correct}」。`, D.svgSentenceParts("太郎", "読む")),
    };
  }

  if (mode === 2) {
    const sentence = "花子はきれいな花を摘んだ。";
    const correct = "摘んだ";
    const wrong = ["花子は", "きれいな", "花を"];
    const { choices, correctIndex } = makeChoices(correct, wrong, rng);
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: `「${sentence}」の述語（述語部分）はどれ？`,
      choices,
      correctIndex,
      hint: "文の「何をした・どうなった」を表す中心部分を探そう。",
      ...expl(
        `正解は「${correct}」です。\n\n述語は文の中心となる動作・状態。「摘んだ」がこの文の述語です。`,
        `述語＝文の「結論」部分。\n\n「花子はきれいな花を」まで読んだら、最後に来る動作「摘んだ」が述語。\n\n主語「花子」＋述語「摘んだ」で文の骨組みができます。`
      ),
      ...win(`当たり！述語は「${correct}」。`, D.svgSentenceParts("花子", "摘んだ")),
    };
  }

  if (mode === 3) {
    const items = [
      { word: "しかし", role: "逆接（前と反対の内容をつなぐ）", wrong: ["原因・理由", "例示", "追加"] },
      { word: "したがって", role: "因果（結果・結論）", wrong: ["対比", "例示", "並列"] },
      { word: "例えば", role: "例示（具体例を示す）", wrong: ["逆接", "因果", "時間"] },
      { word: "また", role: "追加（さらに同じ方向の内容）", wrong: ["逆接", "因果", "条件"] },
    ];
    const item = items[Math.floor(rng() * items.length)]!;
    const { choices, correctIndex } = makeChoices(item.role, item.wrong, rng);
    return {
      id: `G-${seed}`,
      topic: "grammar",
      prompt: `接続詞「${item.word}」の働きとして正しいものは？`,
      choices,
      correctIndex,
      hint: "前の文と後の文の関係（反対・原因・例・追加）を考えよう。",
      ...expl(
        `正解は「${item.role}」です。\n\n「${item.word}」は${item.role}の接続詞。読解でも接続詞は段落のつながりを読む鍵になります。`,
        `接続詞チェック：\n\n・しかし → でも（反対）\n・したがって → だから（結果）\n・例えば → たとえば（例）\n・また → さらに（追加）\n\n「${item.word}」は ${item.role}。`
      ),
      ...win(`当たり！「${item.word}」は ${item.role}。`),
    };
  }

  const keigoItems = [
    { plain: "行く", correct: "いらっしゃる", wrong: ["参る", "行かれる", "お行きになる"] },
    { plain: "見る", correct: "ご覧になる", wrong: ["拝見する", "見られる", "ご覧なさる"] },
    { plain: "言う", correct: "おっしゃる", wrong: ["申す", "言われる", "お言いになる"] },
    { plain: "食べる", correct: "召し上がる", wrong: ["いただく", "食べられる", "お食べになる"] },
  ];
  const item = keigoItems[Math.floor(rng() * keigoItems.length)]!;
  const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
  return {
    id: `G-${seed}`,
    topic: "grammar",
    prompt: `「${item.plain}」の尊敬語（相手を高める言い方）として正しいものは？`,
    choices,
    correctIndex,
    hint: "相手の動作を高める「尊敬語」と、自分を低める「謙譲語」を区別しよう。",
    ...expl(
      `正解は「${item.correct}」です。\n\n尊敬語は相手の動作を高める言い方。「${item.plain}」→「${item.correct}」。`,
      `尊敬語の覚え方：\n\n・相手がする動作 → 尊敬語（${item.correct}）\n・自分がする動作 → 謙譲語（別の形）\n\n「だれがするか」で選び分けます。`
    ),
    ...win(`当たり！尊敬語は「${item.correct}」。`),
  };
}

// ─── 古典 ─────────────────────────────────────────

function qClassic(seed: number, _difficulty: DifficultyId): Question {
  const rng = mulberry32(seed + 701);
  const mode = Math.floor(rng() * 4);

  if (mode === 0) {
    const items = [
      { classical: "けり", meaning: "過去・詠嘆（〜だったのだ）", wrong: ["推量（〜だろう）", "打消（〜ない）", "完了（〜てしまった）"] },
      { classical: "たり", meaning: "断定・詠嘆（〜である）", wrong: ["過去", "打消", "推量"] },
      { classical: "なり", meaning: "断定（〜である）", wrong: ["過去", "完了", "打消"] },
      { classical: "べし", meaning: "推量・当然（〜べきだ）", wrong: ["過去", "詠嘆", "打消"] },
      { classical: "ず", meaning: "打消（〜ない）", wrong: ["断定", "推量", "詠嘆"] },
    ];
    const item = items[Math.floor(rng() * items.length)]!;
    const { choices, correctIndex } = makeChoices(item.meaning, item.wrong, rng);
    return {
      id: `C-${seed}`,
      topic: "classic",
      prompt: `古文の助動詞「${item.classical}」の意味として正しいものは？`,
      choices,
      correctIndex,
      hint: "文末の助動詞は、文全体の意味（過去・断定・否定など）を決めます。",
      ...expl(
        `正解は「${item.meaning}」です。\n\n助動詞「${item.classical}」は${item.meaning}の働きをします。現代語訳ではこの意味を必ず反映させましょう。`,
        `助動詞は「文末のスイッチ」です。\n\n「${item.classical}」→ ${item.meaning}。\n\nノートに「助動詞｜意味｜例文」を表にすると暗記しやすいです。`
      ),
      ...win(`当たり！「${item.classical}」＝ ${item.meaning}。`),
    };
  }

  if (mode === 1) {
    const items = [
      { line: "春はあけぼの", modern: "春は明け方がよい", wrong: ["春は明るい", "春は夜明け", "春は始まり"] },
      { line: "やうやう白くなりゆく", modern: "少しずつ白くなっていく", wrong: ["急に白くなる", "完全に白い", "白くならない"] },
      { line: "をかし", modern: "趣がある・おもしろい", wrong: ["可笑しい", "悲しい", "美しい"] },
      { line: "いと", modern: "とても（程度を表す）", wrong: ["糸", "意図", "異常"] },
    ];
    const item = items[Math.floor(rng() * items.length)]!;
    const { choices, correctIndex } = makeChoices(item.modern, item.wrong, rng);
    return {
      id: `C-${seed}`,
      topic: "classic",
      prompt: `次の古典語「${item.line}」の現代語訳として最も適切なものは？`,
      choices,
      correctIndex,
      hint: "枕草子・源氏物語などでよく出る語。教科書の語句リストを思い出そう。",
      ...expl(
        `正解は「${item.modern}」です。\n\n「${item.line}」は古典文学でよく出る表現。現代語では「${item.modern}」と訳します。`,
        `古典語は「単語カード」で覚えるのが近道です。\n\n「${item.line}」→ ${item.modern}。\n\n文全体の流れの中で意味を確認すると定着します。`
      ),
      ...win(`当たり！「${item.line}」→ ${item.modern}。`, D.svgClassicTranslation(item.line, item.modern)),
    };
  }

  if (mode === 2) {
    const items = [
      { sentence: "月見れば ちゝに物こそ かなしけれ", author: "源氏物語（光源氏）", wrong: ["枕草子（清少納言）", "竹取物語", "更級日記"] },
      { sentence: "春はあけぼの", author: "枕草子（清少納言）", wrong: ["源氏物語", "竹取物語", "徒然草"] },
      { sentence: "いと よろし", author: "竹取物語", wrong: ["源氏物語", "枕草子", "更級日記"] },
    ];
    const item = items[Math.floor(rng() * items.length)]!;
    const { choices, correctIndex } = makeChoices(item.author, item.wrong, rng);
    return {
      id: `C-${seed}`,
      topic: "classic",
      prompt: `「${item.sentence}」という名句が出てくる作品は？`,
      choices,
      correctIndex,
      hint: "作者と作品名をセットで覚えよう。",
      ...expl(
        `正解は「${item.author}」です。\n\n「${item.sentence}」は${item.author}の名句として知られています。`,
        `古典は「名句｜作者｜作品」の3点セットで覚えると、テストで強いです。\n\n「${item.sentence}」→ ${item.author}。`
      ),
      ...win(`当たり！${item.author}の名句ですね。`),
    };
  }

  const kanbunItems = [
    { text: "学而時習之", reading: "学びて時に之を習う", wrong: ["学んで時を習う", "時に学び習う", "習う時に学ぶ"] },
    { text: "温故知新", reading: "故きを温ねて新しきを知る", wrong: ["温かい故郷を知る", "新しい故郷を温める", "古い知識を捨てる"] },
  ];
  const item = kanbunItems[Math.floor(rng() * kanbunItems.length)]!;
  const { choices, correctIndex } = makeChoices(item.reading, item.wrong, rng);
  return {
    id: `C-${seed}`,
    topic: "classic",
    prompt: `漢文「${item.text}」の返り点を踏まえた読み方として正しいものは？`,
    choices,
    correctIndex,
    hint: "返り点（レ点・一二三点）で語順を入れ替えて読みます。",
    ...expl(
      `正解は「${item.reading}」です。\n\n漢文は返り点で日本語の語順に直して読みます。「${item.text}」→「${item.reading}」。`,
      `漢文の読み方：\n\n①返り点で語順を直す\n②「を・に・は」などを補う\n\n「${item.text}」は「${item.reading}」と読みます。`
    ),
    ...win(`当たり！漢文の読み「${item.reading}」。`),
  };
}

// ─── 読解 ─────────────────────────────────────────

function qReading(seed: number, _difficulty: DifficultyId): Question {
  const rng = mulberry32(seed + 1103);
  const mode = Math.floor(rng() * 4);

  if (mode === 0) {
    const passage =
      "近年、スマートフォンの普及により、情報へのアクセスは格段に便利になった。しかし、その一方で、深く考える時間が減っているという指摘もある。";
    const correct = "情報アクセスの便利さと、深く考える時間の減少";
    const wrong = ["スマートフォンの歴史", "情報の正しさの問題", "子どもの教育環境"];
    const { choices, correctIndex } = makeChoices(correct, wrong, rng);
    return {
      id: `R-${seed}`,
      topic: "reading",
      prompt: `次の段落の内容として最も適切なものは？\n\n「${passage}」`,
      choices,
      correctIndex,
      hint: "「しかし」の前後で何が対比されているかに注目しよう。",
      ...expl(
        `正解は「${correct}」です。\n\n段落は「便利になった」→「しかし」→「深く考える時間が減る」という対比構造。両方の内容を含む選択肢が正解です。`,
        `読解の手順：\n\n①「しかし」「したがって」などの接続詞を見つける\n②その前後で何が言われているか整理する\n\nここでは便利さ vs 考える時間の減少、の対比です。`
      ),
      ...win(`当たり！対比構造を読み取れました。`, D.svgReadingLink("便利", "しかし→減少")),
    };
  }

  if (mode === 1) {
    const passage = "田中は毎日図書館で勉強している。彼は来月のテストに向けて、数学を重点的に復習している。";
    const correct = "田中";
    const wrong = ["彼", "来月", "数学"];
    const { choices, correctIndex } = makeChoices(correct, wrong, rng);
    return {
      id: `R-${seed}`,
      topic: "reading",
      prompt: `「${passage}」の「彼」が指すのは誰？`,
      choices,
      correctIndex,
      hint: "指示語（彼・それ・このように）は、前に出てきた言葉を指します。",
      ...expl(
        `正解は「${correct}」です。\n\n「彼」は直前に出てきた「田中」を指しています。指示語は必ず前文をたどりましょう。`,
        `指示語の見つけ方：\n\n①「彼・彼女・それ・これ」を見つける\n②直前の文で「だれ・なに」が主語か確認\n\n前の文の主語は「田中」→「彼」＝田中。`
      ),
      ...win(`当たり！「彼」＝ ${correct}。`),
    };
  }

  if (mode === 2) {
    const items = [
      { connector: "したがって", relation: "原因・結果（前が理由、後が結論）", wrong: ["対比・逆接", "例示", "時間の順序"] },
      { connector: "一方で", relation: "対比（別の側面・反対の視点）", wrong: ["因果", "例示", "追加"] },
      { connector: "つまり", relation: "言い換え・要約", wrong: ["逆接", "例示", "時間"] },
    ];
    const item = items[Math.floor(rng() * items.length)]!;
    const { choices, correctIndex } = makeChoices(item.relation, item.wrong, rng);
    return {
      id: `R-${seed}`,
      topic: "reading",
      prompt: `接続表現「${item.connector}」が示す、前後の文の関係として正しいものは？`,
      choices,
      correctIndex,
      hint: "接続詞・接続助詞は段落の論理構造を読む鍵です。",
      ...expl(
        `正解は「${item.relation}」です。\n\n「${item.connector}」は${item.relation}を示します。読解問題ではこの関係を把握すると速く正解できます。`,
        `接続の整理：\n\n・したがって → だから\n・一方で → 別の面では\n・つまり → 要するに\n\n「${item.connector}」→ ${item.relation}。`
      ),
      ...win(`当たり！「${item.connector}」は ${item.relation}。`),
    };
  }

  const gistItems = [
    {
      passage: "読書は、知識を得るだけでなく、他者の視点を理解する力を育てる。本を通じて様々な人生に触れることで、自分の考えを広げることができる。",
      correct: "読書は知識と他者理解を通じて考えを広げる",
      wrong: ["読書は知識だけが目的", "本は娯楽にすぎない", "読書は時間の無駄"],
    },
    {
      passage: "運動不足は生活習慣病のリスクを高める。毎日少しでも体を動かす習慣が、健康維持に重要である。",
      correct: "運動習慣が健康維持に重要",
      wrong: ["運動は必要ない", "生活習慣病は治らない", "運動は若者だけのもの"],
    },
  ];
  const item = gistItems[Math.floor(rng() * gistItems.length)]!;
  const { choices, correctIndex } = makeChoices(item.correct, item.wrong, rng);
  return {
    id: `R-${seed}`,
    topic: "reading",
    prompt: `次の段落の主旨（筆者が最も伝えたいこと）として最も適切なものは？\n\n「${item.passage}」`,
    choices,
    correctIndex,
    hint: "細かい情報ではなく、段落全体を一言で言い直したものを選ぼう。",
    ...expl(
      `正解は「${item.correct}」です。\n\n主旨は段落全体の「結論」。細部ではなく、筆者が一番伝えたい核心を選びます。`,
      `主旨の見つけ方：\n\n①段落を読んだあと「で、結局なに？」と自分に問う\n②4つの選択肢を1行ずつ当てはめる\n\nここでは「${item.correct}」がぴったりです。`
    ),
    ...win(`当たり！主旨は「${item.correct}」。`),
  };
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
