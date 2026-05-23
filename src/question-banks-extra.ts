/** 追加問題バンク（第2弾・中学2年国語） */

export const KANJI_EXTRA: { kanji: string; reading: string; meaning: string; wrongReadings: string[] }[] = [
  { kanji: "顕彰", reading: "けんしょう", meaning: "功績などを表立ってほめる", wrongReadings: ["げんしょう", "けんしょ", "げんしょ"] },
  { kanji: "踏襲", reading: "とうしゅう", meaning: "前例どおりに踏み行う", wrongReadings: ["とうしゅ", "どうしゅう", "とうじゅう"] },
  { kanji: "逸話", reading: "いつわ", meaning: "世間に伝わる興味深い話", wrongReadings: ["いつば", "いちわ", "いっわ"] },
  { kanji: "継承", reading: "けいしょう", meaning: "前のものを引き継ぐこと", wrongReadings: ["けいしょ", "げいしょう", "けいじょう"] },
  { kanji: "遷移", reading: "せんい", meaning: "状態が移り変わること", wrongReadings: ["せんえい", "ぜんい", "せんいつ"] },
  { kanji: "帰結", reading: "きけつ", meaning: "最終的にたどり着く結論", wrongReadings: ["きけち", "きっけつ", "きかつ"] },
  { kanji: "端的", reading: "たんてき", meaning: "要点だけをはっきり述べる", wrongReadings: ["たんて", "だんてき", "たんてつ"] },
  { kanji: "簡潔", reading: "かんけつ", meaning: "無駄がなく短い", wrongReadings: ["かんかつ", "けんけつ", "かんせつ"] },
  { kanji: "含蓄", reading: "がんちく", meaning: "言葉の奥に含まれた意味", wrongReadings: ["がんしゅく", "かんちく", "がんちゃく"] },
  { kanji: "諷刺", reading: "ふうし", meaning: "皮肉を込めて批判する", wrongReadings: ["ふうじ", "ほうし", "ふうしゃ"] },
  { kanji: "妥当", reading: "だとう", meaning: "筋道が通っていて適切", wrongReadings: ["たとう", "だと", "じゅうとう"] },
  { kanji: "的確", reading: "てきかく", meaning: "要点を外さず正確", wrongReadings: ["てきがく", "てっかく", "てきかつ"] },
  { kanji: "推論", reading: "すいろん", meaning: "根拠から理論を立てる", wrongReadings: ["すいりん", "ついろん", "すいろ"] },
  { kanji: "帰納", reading: "きのう", meaning: "個別から一般を導く", wrongReadings: ["きの", "きのうう", "きのん"] },
  { kanji: "演繹", reading: "えんえき", meaning: "一般から個別を導く", wrongReadings: ["えんやく", "えんえつ", "いんえき"] },
];

export const JUKUGO_EXTRA: { word: string; meaning: string; wrongMeanings: string[] }[] = [
  { word: "臥薪嘗胆", meaning: "苦労に耐えて目的を達成する", wrongMeanings: ["薪を寝床にする", "胆を試す", "寝て過ごす"] },
  { word: "百聞不如一見", meaning: "百聞は一見に如かず", wrongMeanings: ["百回聞く", "一見は百聞より上", "見るより聞く"] },
  { word: "温故知新", meaning: "古を学び新しきを知る", wrongMeanings: ["新だけ学ぶ", "故郷を温める", "知識を捨てる"] },
  { word: "不言実行", meaning: "言わずに実行する", wrongMeanings: ["言わないで終わる", "実行しない", "多くを語る"] },
  { word: "急転直下", meaning: "事態が突然変わる", wrongMeanings: ["ゆっくり変わる", "変わらない", "上向きに進む"] },
  { word: "自給自足", meaning: "自分で必要なものをまかなう", wrongMeanings: ["他人に頼る", "不足する", "贅沢する"] },
  { word: "一心不乱", meaning: "一つのことに集中する", wrongMeanings: ["心が乱れる", "二心を持つ", "乱暴に行動する"] },
  { word: "十人十色", meaning: "人それぞれ考えや好みが違う", wrongMeanings: ["十人が同じ色", "十色の絵の具", "十人で一色"] },
  { word: "因果応報", meaning: "原因と結果が一致する", wrongMeanings: ["原因がない", "結果だけが大事", "偶然の一致"] },
  { word: "巧言令色", meaning: "うまい言葉で人をだます", wrongMeanings: ["巧みな絵", "令嬢の色", "正直な言葉"] },
  { word: "臨機応変", meaning: "状況に応じて柔軟に対応する", wrongMeanings: ["機会を待つ", "変わらない", "固定の対応"] },
];

export const HOMOPHONE_EXTRA: { context: string; correct: string; wrong: string[] }[] = [
  { context: "（　）を立て直す", correct: "体制", wrong: ["大勢", "体勢", "停滞"] },
  { context: "（　）を整える", correct: "秩序", wrong: ["治療", "直列", "直球"] },
  { context: "（　）を深める", correct: "理解", wrong: ["起立", "群立", "解離"] },
  { context: "（　）を確認する", correct: "事実", wrong: ["自室", "示唆", "支持"] },
  { context: "（　）を重視する", correct: "過程", wrong: ["過激", "華麗", "課題"] },
  { context: "（　）を発揮する", correct: "実力", wrong: ["質力", "執力", "尽力"] },
  { context: "（　）を探る", correct: "真相", wrong: ["真実", "深層", "進行"] },
  { context: "（　）を述べる", correct: "所感", wrong: ["初感", "諸感", "助言"] },
  { context: "（　）を大切にする", correct: "伝統", wrong: ["転倒", "伝達", "転換"] },
  { context: "（　）に参加する", correct: "行事", wrong: ["行為", "抗議", "興行"] },
  { context: "（　）を迎える", correct: "世紀", wrong: ["是正", "制席", "整式"] },
  { context: "（　）を掲げる", correct: "理念", wrong: ["離れ", "理想", "理解"] },
];

export const PROVERB_ITEMS: { proverb: string; meaning: string; wrongMeanings: string[] }[] = [
  { proverb: "継続は力なり", meaning: "続けることで力がつく", wrongMeanings: ["一度で力がつく", "続けてはいけない", "力は不要"] },
  { proverb: "百聞は一見に如かず", meaning: "見た方がよくわかる", wrongMeanings: ["聞く方がよい", "百回聞くべき", "見る必要はない"] },
  { proverb: "急がば回れ", meaning: "急ぐより確実な道を選べ", wrongMeanings: ["急いで走れ", "回ってはいけない", "遠回りは悪い"] },
  { proverb: "塵も積もれば山となる", meaning: "小さな積み重ねが大きな結果になる", wrongMeanings: ["塵は捨てる", "山は一瞬でできる", "積み重ねは無意味"] },
  { proverb: "能ある鷹は爪を隠す", meaning: "実力がある人ほど謙虚", wrongMeanings: ["鷹は爪を見せる", "実力は隠すな", "謙虚は不要"] },
  { proverb: "花より団子", meaning: "見た目より実利を重んじる", wrongMeanings: ["花が一番大事", "団子は嫌い", "見た目だけ大事"] },
  { proverb: "二兎を追う者は一兎をも得ず", meaning: "欲張るとどちらも失う", wrongMeanings: ["二兎を追え", "一兎で十分", "追わない方がよい"] },
  { proverb: "知らぬは仏なり", meaning: "知らない方が楽なこともある", wrongMeanings: ["知ることが悪", "仏になれ", "知識は不要"] },
];

export const OKURIGANA_ITEMS: { word: string; correct: string; wrong: string[] }[] = [
  { word: "美（　）", correct: "しさ", wrong: ["さ", "み", "し"] },
  { word: "静（　）", correct: "か", wrong: ["かさ", "しず", "かに"] },
  { word: "答（　）", correct: "え", wrong: ["えい", "う", "ええ"] },
  { word: "変（　）", correct: "わる", wrong: ["わるい", "へん", "わるさ"] },
  { word: "短（　）", correct: "い", wrong: ["いい", "みじか", "たん"] },
  { word: "明（　）", correct: "るい", wrong: ["る", "あか", "るさ"] },
  { word: "重（　）", correct: "い", wrong: ["いい", "おも", "さ"] },
  { word: "暖（　）", correct: "かい", wrong: ["か", "あたた", "かさ"] },
];

export const ANTONYM_PAIRS: { word: string; antonym: string; wrong: string[] }[] = [
  { word: "賛成", antonym: "反対", wrong: ["同意", "賛同", "支持"] },
  { word: "具体", antonym: "抽象", wrong: ["詳細", "実際", "現実"] },
  { word: "潜在", antonym: "顕在", wrong: ["秘密", "内部", "隠れ"] },
  { word: "抑制", antonym: "促進", wrong: ["停止", "禁止", "控えめ"] },
  { word: "簡潔", antonym: "冗長", wrong: ["短い", "端的", "要約"] },
  { word: "妥当", antonym: "不当", wrong: ["適切", "正しい", "当然"] },
  { word: "頻繁", antonym: "稀", wrong: ["多い", "しばしば", "常に"] },
  { word: "矛盾", antonym: "一致", wrong: ["対立", "反対", "食い違い"] },
];

export const OBJECT_ITEMS: { sentence: string; correct: string; wrong: string[] }[] = [
  { sentence: "太郎は本を読む。", correct: "本", wrong: ["太郎", "読む", "は"] },
  { sentence: "花子は手紙を書いた。", correct: "手紙", wrong: ["花子", "書いた", "は"] },
  { sentence: "犬が骨を埋めた。", correct: "骨", wrong: ["犬", "埋めた", "が"] },
  { sentence: "彼は英語を勉強している。", correct: "英語", wrong: ["彼", "勉強", "は"] },
  { sentence: "妹はケーキを作った。", correct: "ケーキ", wrong: ["妹", "作った", "は"] },
  { sentence: "鳥が虫を捕まえた。", correct: "虫", wrong: ["鳥", "捕まえた", "が"] },
  { sentence: "先生は問題を説明した。", correct: "問題", wrong: ["先生", "説明", "は"] },
  { sentence: "私は友達にプレゼントをあげた。", correct: "プレゼント", wrong: ["友達", "私", "あげた"] },
];

export const SENTENCE_TYPE_ITEMS: { sentence: string; type: string; wrong: string[] }[] = [
  { sentence: "明日は晴れるだろうか。", type: "疑問文", wrong: ["断定文", "命令文", "感嘆文"] },
  { sentence: "早く起きなさい。", type: "命令文", wrong: ["疑問文", "断定文", "否定文"] },
  { sentence: "彼は来ない。", type: "否定文", wrong: ["疑問文", "命令文", "感嘆文"] },
  { sentence: "なんと美しい景色だろう。", type: "感嘆文", wrong: ["疑問文", "命令文", "断定文"] },
  { sentence: "今日は暑い。", type: "断定文", wrong: ["疑問文", "命令文", "否定文"] },
  { sentence: "どこへ行くのですか。", type: "疑問文", wrong: ["断定文", "命令文", "否定文"] },
  { sentence: "窓を開けてください。", type: "命令文", wrong: ["疑問文", "断定文", "感嘆文"] },
  { sentence: "雨は降っていない。", type: "否定文", wrong: ["疑問文", "命令文", "断定文"] },
];

export const CONNECTOR_CONTEXT: { before: string; after: string; connector: string; wrong: string[] }[] = [
  { before: "努力は必要だ。", after: "結果は必ず出るとは限らない。", connector: "しかし", wrong: ["したがって", "例えば", "また"] },
  { before: "気温が上がった。", after: "氷は溶け始めた。", connector: "そのため", wrong: ["しかし", "一方", "ところで"] },
  { before: "読書は楽しい。", after: "映画鑑賞もおもしろい。", connector: "また", wrong: ["しかし", "したがって", "つまり"] },
  { before: "彼は優秀だ。", after: "彼女も成績がよい。", connector: "同様に", wrong: ["しかし", "したがって", "ところで"] },
  { before: "計画を立てた。", after: "実行に移した。", connector: "そして", wrong: ["しかし", "一方", "なぜなら"] },
  { before: "都市部は便利だ。", after: "自然が身近なのは地方だ。", connector: "一方", wrong: ["したがって", "例えば", "つまり"] },
  { before: "要約とは要点をまとめることだ。", after: "全文を写すことではない。", connector: "すなわち", wrong: ["しかし", "一方", "ところで"] },
  { before: "彼は病気だった。", after: "試合に出場できなかった。", connector: "そのため", wrong: ["しかし", "一方", "例えば"] },
];

export const WAKA_ITEMS: { waka: string; theme: string; wrong: string[] }[] = [
  { waka: "花の色は 移りにけりな 我が世誰ぞ 常ならむ", theme: "無常（はかなさ）", wrong: ["喜び", "怒り", "希望"] },
  { waka: "月やあらぬ 春や昔の 春ならぬ 我が身ひとつは もとの身にして", theme: "昔への思い・変わらぬ自分", wrong: ["月の観察", "春の到来", "身体の健康"] },
  { waka: "世の中に 絶えて桜の なかりせば 春の心は のどけからまし", theme: "桜への愛着", wrong: ["桜の嫌い", "春の否定", "心の平静"] },
  { waka: "奥山に 紅葉踏み分け 鳴く鹿の 声きく時ぞ 秋はかなしき", theme: "秋の哀愁", wrong: ["狩りの喜び", "山登り", "冬の到来"] },
  { waka: "田子の浦に うち出でて見れば 白妙の 富士の高嶺に 雪は降りつつ", theme: "富士の雄大な姿", wrong: ["雪の嫌い", "田子の浦の歴史", "冬の厳しさ"] },
  { waka: "君がため 惜しからざりし 命さへ 長くもがなと 思ひけるかな", theme: "恋の情熱", wrong: ["命の軽視", "友情", "家族愛"] },
];

export const LITERARY_HISTORY: { question: string; correct: string; wrong: string[] }[] = [
  { question: "『源氏物語』の作者は？", correct: "紫式部", wrong: ["清少納言", "和泉式部", "菅原孝標女"] },
  { question: "『枕草子』の作者は？", correct: "清少納言", wrong: ["紫式部", "和泉式部", "小野小町"] },
  { question: "『更級日記』の作者は？", correct: "菅原孝標女", wrong: ["紫式部", "清少納言", "和泉式部"] },
  { question: "『竹取物語』は日本最古の何文学？", correct: "物語文学", wrong: ["随筆文学", "日記文学", "歌文学"] },
  { question: "『枕草子』は何文学の代表作？", correct: "随筆文学", wrong: ["物語文学", "日記文学", "軍記物語"] },
  { question: "『更級日記』は何文学？", correct: "日記文学", wrong: ["物語文学", "随筆文学", "歌文学"] },
  { question: "平安時代中期の代表的作品群を何時代という？", correct: "国風文化", wrong: ["律令文化", "武士文化", "町文化"] },
  { question: "『伊勢物語』の中心となる形式は？", correct: "和歌と散文", wrong: ["漢詩のみ", "日記のみ", "劇のみ"] },
];

export const CLASSICAL_EXTRA: { line: string; modern: string; wrong: string[] }[] = [
  { line: "いとおかし", modern: "とてもおもしろい", wrong: ["とても可笑しい", "とても悲しい", "普通"] },
  { line: "いとあはれ", modern: "とてもなつかしい・心が動く", wrong: ["とてもかわいそう", "とてもうれしい", "無関心"] },
  { line: "いとよし", modern: "とてもよい", wrong: ["糸がよい", "意図がよい", "あまりよくない"] },
  { line: "いみじう", modern: "とても（程度が甚だしい）", wrong: ["意味がない", "異常", "今時"] },
  { line: "たえず", modern: "絶えず・常に", wrong: ["時々", "一度", "まれに"] },
  { line: "いづく", modern: "どこ", wrong: ["いつ", "いくつ", "いかに"] },
  { line: "いかで", modern: "どうして", wrong: ["いつ", "いくら", "いかに"] },
  { line: "いかに", modern: "どのように", wrong: ["いくつ", "いつ", "いずれ"] },
  { line: "もののふ", modern: "武士", wrong: ["物", "野人", "者"] },
  { line: "いとま", modern: "暇・時間的余裕", wrong: ["糸", "意図", "今"] },
  { line: "をかなし", modern: "ほしい・恋しい", wrong: ["可笑しい", "悲しい", "美しい"] },
  { line: "さすがに", modern: "流石に・さすが", wrong: ["やはり", "偶然", "決して"] },
];

export const KEYWORD_ITEMS: { passage: string; keyword: string; wrong: string[] }[] = [
  {
    passage: "読書は、知識を得るだけでなく、他者の視点を理解する力を育てる。",
    keyword: "他者の視点",
    wrong: ["知識", "読書量", "図書館"],
  },
  {
    passage: "失敗は終わりではない。むしろ、何が足りなかったかを教えてくれる大切な経験である。",
    keyword: "経験",
    wrong: ["成功", "終わり", "教師"],
  },
  {
    passage: "比喩は、似ているものに例えることで、イメージを伝える表現である。",
    keyword: "例える",
    wrong: ["否定する", "省略する", "反復する"],
  },
  {
    passage: "敬語は、相手への敬意を言葉で示すものである。",
    keyword: "敬意",
    wrong: ["情報", "命令", "冗談"],
  },
  {
    passage: "要約は、文章の要点だけを抜き出して短くまとめることである。",
    keyword: "要点",
    wrong: ["詳細", "感想", "引用"],
  },
  {
    passage: "古典文学は、人間の普遍的な感情に触れさせてくれる。",
    keyword: "感情",
    wrong: ["文法", "歴史年号", "漢字"],
  },
];

export const WRONG_SUMMARY_ITEMS: { passage: string; wrongChoice: string; wrong: string[] }[] = [
  {
    passage: "読書は、知識を得るだけでなく、他者の視点を理解する力を育てる。",
    wrongChoice: "読書は娯楽にすぎない",
    wrong: ["読書は知識と他者理解を育てる", "読書で考えを広げられる", "本を通じて人生に触れる"],
  },
  {
    passage: "運動不足は生活習慣病のリスクを高める。毎日少しでも体を動かす習慣が重要である。",
    wrongChoice: "運動は若者だけのもの",
    wrong: ["運動不足はリスクを高める", "毎日少し動く習慣が大切", "健康維持に運動が重要"],
  },
  {
    passage: "失敗から学ぶ姿勢が大切だ。原因を分析し、次に活かすことが求められる。",
    wrongChoice: "同じ間違いを繰り返してよい",
    wrong: ["失敗から学ぶ姿勢が大切", "原因を分析する", "次に活かす"],
  },
  {
    passage: "敬語は場面と相手に応じて使い分ける必要がある。",
    wrongChoice: "敬語はいつも同じでよい",
    wrong: ["場面に応じて使い分ける", "相手との関係が大切", "敬意を示す言葉"],
  },
];

export const RHETORIC_ITEMS: { sentence: string; type: string; wrong: string[] }[] = [
  { sentence: "時間は金なり", type: "比喩（例え）", wrong: ["擬人法", "反復", "倒置"] },
  { sentence: "風がささやく", type: "擬人法", wrong: ["比喩", "反復", "誇張"] },
  { sentence: "走る、走る、走る", type: "反復", wrong: ["比喩", "擬人法", "倒置"] },
  { sentence: "美しきかな、春の野", type: "倒置", wrong: ["比喩", "擬人法", "反復"] },
  { sentence: "目から火が出るほど怒った", type: "誇張（Hyperbole）", wrong: ["比喩", "擬人法", "反復"] },
  { sentence: "彼の心は氷のように冷たかった", type: "比喩（直喩）", wrong: ["擬人法", "反復", "倒置"] },
];

export const INFERENCE_ITEMS: { passage: string; correct: string; wrong: string[] }[] = [
  {
    passage: "彼は毎朝6時に起き、30分ジョギングをしてから朝食を取る。休日も同じ生活リズムを守っている。",
    correct: "規則正しい生活を大切にしている",
    wrong: ["朝寝坊が好き", "運動は嫌い", "生活リズムは乱れている"],
  },
  {
    passage: "彼女は図書館で借りた本を一冊ずつ丁寧にノートにまとめている。",
    correct: "読書を真面目に取り組んでいる",
    wrong: ["本を読まない", "ノートが嫌い", "図書館に行かない"],
  },
  {
    passage: "会議で誰も発言しない。彼だけが異議を唱えた。",
    correct: "彼は自分の意見をはっきり述べる人",
    wrong: ["彼も沈黙した", "会議が盛り上がった", "異議は不要だった"],
  },
  {
    passage: "試験の結果が悪かった。それでも彼は翌日からまた同じ問題集を開いた。",
    correct: "失敗しても諦めずに再挑戦する",
    wrong: ["もう勉強しない", "問題集を捨てた", "試験を放棄した"],
  },
  {
    passage: "祖母は古い手紙を大切に箱にしまっている。時々取り出して読み返す。",
    correct: "思い出を大切にしている",
    wrong: ["手紙を捨てた", "思い出を忘れた", "箱を開けない"],
  },
  {
    passage: "彼は説明を聞いたあと、さらに三つ質問をした。",
    correct: "理解を深めようと積極的に考えている",
    wrong: ["何も聞かなかった", "説明を無視した", "理解を放棄した"],
  },
];

export const PARAGRAPH_EXTRA: { passage: string; correct: string; wrong: string[]; hint: string }[] = [
  {
    passage: "語彙力は、読む量と書く量を増やすことで自然と伸びる。ただし、ただ量をこなすのではなく、新しい言葉に出会ったら意味を調べ、自分の言葉として使うことが大切だ。",
    correct: "語彙力は読み書きと能動的な言葉の定着で伸びる",
    wrong: ["語彙力は量だけ", "調べなくてよい", "書く量は関係ない"],
    hint: "「ただし」以降が筆者の本音。",
  },
  {
    passage: "古典の語句は暗記だけでは足りない。文の流れの中で意味を確認し、現代語訳と照らし合わせることで、初めて自分のものになる。",
    correct: "古典語は文脈と現代語訳で定着させる",
    wrong: ["暗記だけで十分", "現代語訳は不要", "文脈は関係ない"],
    hint: "「だけでは足りない」の後を読もう。",
  },
  {
    passage: "指示語を正確に読み取るには、空欄に入る言葉を推測する前に、必ず前文をたどる習慣が必要である。",
    correct: "指示語は前文をたどる習慣が必要",
    wrong: ["推測だけでよい", "前文は読まなくてよい", "指示語は不要"],
    hint: "筆者が「必要」と言っていること。",
  },
  {
    passage: "文章の主旨を問う問題では、細かい事実の選択肢に惑わされない。段落全体を一言で言い換えたとき、最も自然なものを選ぶ。",
    correct: "主旨問題は細部ではなく全体の言い換えで選ぶ",
    wrong: ["細かい事実を選ぶ", "一言で言い換えない", "段落全体は読まない"],
    hint: "「惑わされない」の対象は？",
  },
  {
    passage: "同音異義語の問題は、空欄の前後を声に出して読むと正解率が上がる。耳で確認すると、文脈に合わない言葉が浮かび上がる。",
    correct: "同音異義語は声に出して文脈を確認する",
    wrong: ["声に出さない", "文脈は関係ない", "耳は使わない"],
    hint: "筆者の具体的な方法は？",
  },
];

export const KANBUN_EXTRA: { text: string; reading: string; wrong: string[] }[] = [
  { text: "守株待兎", reading: "株を守りて兎を待つ", wrong: ["株を守って兎を飼う", "兎を守って株を待つ", "株を待って兎を守る"] },
  { text: "画蛇添足", reading: "蛇を画きて足を添う", wrong: ["蛇に足をつける絵", "足を画いて蛇を添える", "蛇と足を描く"] },
  { text: "百聞不如一見", reading: "百聞は一見に如かず", wrong: ["百聞は一見より上", "一見は百聞に如かず", "百見は一聞に如かず"] },
  { text: "温故知新", reading: "故きを温めて新しきを知る", wrong: ["新しきを温めて故きを知る", "温かい故郷を知る", "故郷を新しくする"] },
  { text: "学而時習之", reading: "学びて時に之を習う", wrong: ["学んで時を習う", "時に学び習う", "習う時に学ぶ"] },
  { text: "矛盾", reading: "矛を売る者と盾を売る者", wrong: ["矛盾する二人", "盾と矛を買う", "売る者と買う者"] },
];

export const TEINEI_ITEMS: { plain: string; teinei: string; wrong: string[] }[] = [
  { plain: "行く", teinei: "行きます", wrong: ["行く", "行かれる", "行きました"] },
  { plain: "読む", teinei: "読みます", wrong: ["読む", "読まれます", "読みました"] },
  { plain: "書く", teinei: "書きます", wrong: ["書く", "書かれます", "書きました"] },
  { plain: "食べる", teinei: "食べます", wrong: ["食べる", "食べられます", "食べました"] },
  { plain: "来る", teinei: "来ます", wrong: ["来る", "来られます", "来ました"] },
  { plain: "する", teinei: "します", wrong: ["する", "されます", "しました"] },
];
