/** 問題データバンク（中学2年・国語） */

export type KanjiItem = { kanji: string; reading: string; meaning: string; wrongReadings: string[] };
export type JukugoItem = { word: string; meaning: string; wrongMeanings: string[] };
export type HomophoneItem = { context: string; correct: string; wrong: string[] };
export type WriteItem = { meaning: string; correct: string; wrong: string[] };
export type PosItem = { word: string; pos: string; wrong: string[] };
export type SentencePartItem = { sentence: string; correct: string; wrong: string[]; label: string };
export type ConnectorItem = { word: string; role: string; wrong: string[] };
export type KeigoItem = { plain: string; correct: string; wrong: string[]; kind: "尊敬" | "謙譲" };
export type ParticleItem = { sentence: string; blank: string; correct: string; wrong: string[]; hint: string };
export type JodouItem = { classical: string; meaning: string; wrong: string[]; example?: string };
export type ClassicalWordItem = { line: string; modern: string; wrong: string[] };
export type WorkQuoteItem = { sentence: string; author: string; wrong: string[] };
export type KanbunItem = { text: string; reading: string; wrong: string[] };
export type ClassicSentenceItem = { classical: string; modern: string; wrong: string[] };
export type PassageItem = { passage: string; correct: string; wrong: string[]; hint: string };
export type ReferenceItem = { passage: string; word: string; correct: string; wrong: string[] };
export type GistItem = { passage: string; correct: string; wrong: string[] };

export const KANJI_ITEMS: KanjiItem[] = [
  { kanji: "異議", reading: "いぎ", meaning: "反対の意見", wrongReadings: ["いぎょう", "いき", "ぎい"] },
  { kanji: "妥協", reading: "だきょう", meaning: "互いに譲り合うこと", wrongReadings: ["たきょう", "だきょ", "じゅうきょう"] },
  { kanji: "頻繁", reading: "ひんぱん", meaning: "何度も繰り返すさま", wrongReadings: ["ひんばん", "びんぱん", "ひんぺん"] },
  { kanji: "抽象", reading: "ちゅうしょう", meaning: "具体から離れた考え方", wrongReadings: ["ちゅうぞう", "ちょうしょう", "ちゅうしょ"] },
  { kanji: "矛盾", reading: "むじゅん", meaning: "前後が食い違うこと", wrongReadings: ["ぼうじゅん", "むじゅう", "もうじゅん"] },
  { kanji: "顕著", reading: "けんちょ", meaning: "目立ってはっきりしている", wrongReadings: ["けんしょ", "げんちょ", "けんちゃく"] },
  { kanji: "抑制", reading: "よくせい", meaning: "押さえて抑えること", wrongReadings: ["よくし", "よくぜい", "おくせい"] },
  { kanji: "貢献", reading: "こうけん", meaning: "社会などに役立つこと", wrongReadings: ["こうげん", "くんけん", "こうかん"] },
  { kanji: "暫定", reading: "ざんてい", meaning: "しばらくの間の仮決め", wrongReadings: ["ざんちょう", "せんてい", "ざんて"] },
  { kanji: "洞察", reading: "どうさつ", meaning: "本質を見抜く力", wrongReadings: ["とうさつ", "どうせつ", "とうせつ"] },
  { kanji: "潜在", reading: "せんざい", meaning: "表面に現れず内に秘める", wrongReadings: ["ぜんざい", "せんさい", "ぜんさい"] },
  { kanji: "要約", reading: "ようやく", meaning: "要点だけをまとめること", wrongReadings: ["ようやっ", "ようえき", "ようらく"] },
  { kanji: "比喩", reading: "ひゆ", meaning: "似ているものに例えること", wrongReadings: ["ひう", "ひよ", "ひゆう"] },
  { kanji: "含蓄", reading: "がんちく", meaning: "言葉の奥に含まれた意味", wrongReadings: ["がんしゅく", "かんちく", "がんちゃく"] },
  { kanji: "端緒", reading: "たんしょ", meaning: "物事の始まり・きっかけ", wrongReadings: ["たんしょう", "はんしょ", "たんし"] },
  { kanji: "諷刺", reading: "ふうし", meaning: "皮肉を込めて批判すること", wrongReadings: ["ふうじ", "ほうし", "ふうしゃ"] },
  { kanji: "修辞", reading: "しゅうじ", meaning: "言葉を巧みに使うこと", wrongReadings: ["しゅうし", "しゅじ", "しゅうち"] },
  { kanji: "論旨", reading: "ろんし", meaning: "論じている内容の要点", wrongReadings: ["ろんじ", "ろんしゅ", "ろんしん"] },
  { kanji: "賛成", reading: "さんせい", meaning: "意見に同意すること", wrongReadings: ["ざんせい", "さんしょう", "せんせい"] },
  { kanji: "異論", reading: "いろん", meaning: "反対の意見", wrongReadings: ["いりん", "ぎろん", "いだん"] },
  { kanji: "妥当", reading: "だとう", meaning: "筋道が通っていて適切", wrongReadings: ["たとう", "だと", "じゅうとう"] },
  { kanji: "的確", reading: "てきかく", meaning: "要点を外さず正確", wrongReadings: ["てきがく", "てっかく", "てきかつ"] },
  { kanji: "推測", reading: "すいそく", meaning: "材料から判断すること", wrongReadings: ["すいそ", "すいさく", "ついそく"] },
  { kanji: "推定", reading: "すいてい", meaning: "材料からおおよそ決める", wrongReadings: ["すいじょう", "ついてい", "すいて"] },
];

export const JUKUGO_ITEMS: JukugoItem[] = [
  { word: "一石二鳥", meaning: "一つのことで二つの利益を得る", wrongMeanings: ["二つの失敗を避ける", "鳥を二羽捕まえる", "石を二つ投げる"] },
  { word: "自画自賛", meaning: "自分で自分をほめる", wrongMeanings: ["絵を描いて褒める", "他人を批判する", "計画を立てる"] },
  { word: "以心伝心", meaning: "言葉がなくても心が通じ合う", wrongMeanings: ["心を入れ替える", "秘密を守る", "手紙で伝える"] },
  { word: "温故知新", meaning: "古いことを学んで新しい知識を得る", wrongMeanings: ["新しいものだけを学ぶ", "昔を忘れる", "温度を調べる"] },
  { word: "切磋琢磨", meaning: "互いに励まし高め合う", wrongMeanings: ["石を研ぐ", "競争して争う", "一人で努力する"] },
  { word: "臥薪嘗胆", meaning: "苦労に耐えて目的を達成する", wrongMeanings: ["薪を寝床にする", "胆を試す料理", "寝て過ごす"] },
  { word: "百発百中", meaning: "やれば必ず成功する", wrongMeanings: ["百回失敗する", "百個の的を射る", "百回休憩する"] },
  { word: "一心不乱", meaning: "一つのことに集中する", wrongMeanings: ["心が乱れる", "二心を持つ", "乱暴に行動する"] },
  { word: "十人十色", meaning: "人それぞれ好みや考えが違う", wrongMeanings: ["十人が同じ色", "十色の絵の具", "十人で一色"] },
  { word: "因果応報", meaning: "原因と結果が一致する", wrongMeanings: ["原因がない", "結果だけが大事", "偶然の一致"] },
  { word: "巧言令色", meaning: "うまい言葉で人をだます", wrongMeanings: ["巧みな絵", "令嬢の色", "正直な言葉"] },
  { word: "温故知新", meaning: "古いことを学んで新しい知識を得る", wrongMeanings: ["新しいだけ学ぶ", "故郷を温める", "知識を捨てる"] },
  { word: "不言実行", meaning: "言わずに実行する", wrongMeanings: ["言わないで終わる", "実行しない", "多くを語る"] },
  { word: "自給自足", meaning: "自分で必要なものをまかなう", wrongMeanings: ["他人に頼る", "不足する", "贅沢をする"] },
  { word: "急転直下", meaning: "事態が突然変わる", wrongMeanings: ["ゆっくり変わる", "変わらない", "上向きに進む"] },
];

export const HOMOPHONE_ITEMS: HomophoneItem[] = [
  { context: "新しい（　）を立てる", correct: "計画", wrong: ["経過", "軽快", "啓蒙"] },
  { context: "（　）を深める", correct: "理解", wrong: ["起立", "群立", "解離"] },
  { context: "（　）を整える", correct: "体制", wrong: ["大勢", "体勢", "停滞"] },
  { context: "意見の（　）がある", correct: "相違", wrong: ["想定", "相当", "装丁"] },
  { context: "（　）を確認する", correct: "事実", wrong: ["自室", "示唆", "支持"] },
  { context: "（　）を述べる", correct: "所感", wrong: ["初感", "諸感", "助言"] },
  { context: "（　）を重視する", correct: "過程", wrong: ["過激", "華麗", "課題"] },
  { context: "（　）に参加する", correct: "行事", wrong: ["行為", "抗議", "興行"] },
  { context: "（　）を大切にする", correct: "伝統", wrong: ["転倒", "伝達", "転換"] },
  { context: "（　）を発揮する", correct: "実力", wrong: ["質力", "執力", "尽力"] },
  { context: "（　）を迎える", correct: "世紀", wrong: ["是正", "制席", "整式"] },
  { context: "（　）を探る", correct: "真相", wrong: ["真実", "深層", "進行"] },
];

export const KANJI_WRITE_ITEMS: WriteItem[] = [
  { meaning: "反対の意見", correct: "異議", wrong: ["異儀", "意義", "異議"] },
  { meaning: "互いに譲り合うこと", correct: "妥協", wrong: ["打協", "多協", "妥協"] },
  { meaning: "目立ってはっきりしている", correct: "顕著", wrong: ["健著", "検著", "顕者"] },
  { meaning: "社会などに役立つこと", correct: "貢献", wrong: ["貢建", "公献", "貢献"] },
  { meaning: "要点だけをまとめること", correct: "要約", wrong: ["要約", "要役", "容約"] },
  { meaning: "本質を見抜く力", correct: "洞察", wrong: ["洞察", "洞察", "動察"] },
  { meaning: "前後が食い違うこと", correct: "矛盾", wrong: ["矛順", "矛盾", "務順"] },
  { meaning: "似ているものに例えること", correct: "比喩", wrong: ["比喩", "非喩", "比諭"] },
  { meaning: "何度も繰り返すさま", correct: "頻繁", wrong: ["頻繁", "品繁", "貧繁"] },
  { meaning: "具体から離れた考え方", correct: "抽象", wrong: ["抽象", "中象", "抽像"] },
  { meaning: "筋道が通っていて適切", correct: "妥当", wrong: ["妥協", "妥当", "多当"] },
  { meaning: "材料から判断すること", correct: "推測", wrong: ["推測", "推則", "堆測"] },
];

export const KANJI_IN_CONTEXT: { sentence: string; correct: string; wrong: string[]; reading?: string }[] = [
  { sentence: "会議で（　）を唱えた。", correct: "異議", wrong: ["異儀", "意義", "異論"] },
  { sentence: "双方が（　）して合意した。", correct: "妥協", wrong: ["打協", "多協", "妥協点"] },
  { sentence: "変化が（　）に現れた。", correct: "顕著", wrong: ["健著", "検著", "顕在"] },
  { sentence: "社会への（　）が評価された。", correct: "貢献", wrong: ["貢建", "公献", "貢物"] },
  { sentence: "本文を（　）した。", correct: "要約", wrong: ["要役", "容約", "曜日"] },
  { sentence: "（　）から本質が見えた。", correct: "洞察", wrong: ["洞察", "動察", "同察"] },
  { sentence: "発言に（　）があった。", correct: "矛盾", wrong: ["矛順", "務順", "防順"] },
  { sentence: "（　）を用いた表現だ。", correct: "比喩", wrong: ["非喩", "比諭", "被喩"] },
];

export const GRAMMAR_POS: PosItem[] = [
  { word: "美しい", pos: "形容詞", wrong: ["副詞", "名詞", "連体詞"] },
  { word: "静かに", pos: "副詞", wrong: ["形容詞", "連体詞", "助詞"] },
  { word: "学校", pos: "名詞", wrong: ["代名詞", "動詞", "形容動詞"] },
  { word: "走る", pos: "動詞", wrong: ["名詞", "副詞", "助動詞"] },
  { word: "これ", pos: "代名詞", wrong: ["名詞", "連体詞", "副詞"] },
  { word: "静かだ", pos: "形容動詞", wrong: ["形容詞", "副詞", "動詞"] },
  { word: "とても", pos: "副詞", wrong: ["連体詞", "助詞", "名詞"] },
  { word: "あの", pos: "連体詞", wrong: ["代名詞", "副詞", "助詞"] },
  { word: "書いた", pos: "動詞", wrong: ["助動詞", "形容詞", "名詞"] },
  { word: "幸福", pos: "名詞", wrong: ["形容詞", "副詞", "動詞"] },
  { word: "幸せ", pos: "名詞", wrong: ["形容詞", "副詞", "連体詞"] },
  { word: "しかし", pos: "接続詞", wrong: ["副詞", "助詞", "連体詞"] },
  { word: "から", pos: "助詞", wrong: ["接続詞", "副詞", "助動詞"] },
  { word: "だろう", pos: "助動詞", wrong: ["動詞", "副詞", "助詞"] },
  { word: "きれいな", pos: "連体詞", wrong: ["形容詞", "副詞", "名詞"] },
];

export const SUBJECT_ITEMS: SentencePartItem[] = [
  { sentence: "太郎は本を読む。", correct: "太郎", wrong: ["は", "本を", "読む"], label: "主語" },
  { sentence: "雨が降っている。", correct: "雨", wrong: ["が", "降っている", "降る"], label: "主語" },
  { sentence: "私の弟がサッカーをする。", correct: "弟", wrong: ["私", "サッカーを", "する"], label: "主語" },
  { sentence: "この問題は難しい。", correct: "問題", wrong: ["この", "は", "難しい"], label: "主語" },
  { sentence: "鳥が空を飛んでいる。", correct: "鳥", wrong: ["空", "を", "飛んでいる"], label: "主語" },
  { sentence: "先生が説明してくれた。", correct: "先生", wrong: ["が", "説明", "くれた"], label: "主語" },
  { sentence: "彼女は毎朝ジョギングをする。", correct: "彼女", wrong: ["毎朝", "ジョギングを", "する"], label: "主語" },
  { sentence: "新しい店がオープンした。", correct: "店", wrong: ["新しい", "が", "オープンした"], label: "主語" },
];

export const PREDICATE_ITEMS: SentencePartItem[] = [
  { sentence: "花子はきれいな花を摘んだ。", correct: "摘んだ", wrong: ["花子は", "きれいな", "花を"], label: "述語" },
  { sentence: "空が青い。", correct: "青い", wrong: ["空", "が", "青"], label: "述語" },
  { sentence: "彼は英語が上手だ。", correct: "上手だ", wrong: ["彼", "英語", "が"], label: "述語" },
  { sentence: "子どもたちが公園で遊んでいる。", correct: "遊んでいる", wrong: ["子どもたち", "公園", "で"], label: "述語" },
  { sentence: "この本はとてもおもしろい。", correct: "おもしろい", wrong: ["本", "とても", "この"], label: "述語" },
  { sentence: "明日は試験がある。", correct: "ある", wrong: ["明日", "は", "試験"], label: "述語" },
  { sentence: "彼女はピアノを弾く。", correct: "弾く", wrong: ["彼女", "ピアノ", "を"], label: "述語" },
  { sentence: "部屋が明るくなった。", correct: "明るくなった", wrong: ["部屋", "が", "明るく"], label: "述語" },
];

export const MODIFIER_ITEMS: { sentence: string; correct: string; wrong: string[]; modifies: string }[] = [
  { sentence: "赤い花が咲いている。", correct: "赤い", wrong: ["花", "咲いている", "が"], modifies: "花" },
  { sentence: "静かな海を見た。", correct: "静かな", wrong: ["海", "見た", "を"], modifies: "海" },
  { sentence: "三冊の本を読んだ。", correct: "三冊の", wrong: ["本", "読んだ", "を"], modifies: "本" },
  { sentence: "彼は速く走った。", correct: "速く", wrong: ["走った", "彼", "は"], modifies: "走った" },
  { sentence: "とても美しい景色だった。", correct: "とても", wrong: ["美しい", "景色", "だった"], modifies: "美しい" },
  { sentence: "昨日買った辞書を使う。", correct: "昨日買った", wrong: ["辞書", "使う", "を"], modifies: "辞書" },
];

export const PARTICLE_ITEMS: ParticleItem[] = [
  { sentence: "私（　）学生です。", blank: "は", correct: "は", wrong: ["が", "を", "に"], hint: "主題を示す助詞を選ぼう。" },
  { sentence: "猫（　）ネズミを追う。", blank: "が", correct: "が", wrong: ["は", "を", "に"], hint: "動作の主体を示す助詞。" },
  { sentence: "本（　）読む。", blank: "を", correct: "を", wrong: ["が", "は", "に"], hint: "動作の対象を示す助詞。" },
  { sentence: "学校（　）行く。", blank: "に", correct: "に", wrong: ["を", "が", "で"], hint: "方向・到達点を示す助詞。" },
  { sentence: "公園（　）遊ぶ。", blank: "で", correct: "で", wrong: ["に", "を", "が"], hint: "動作の場所を示す助詞。" },
  { sentence: "友達（　）会った。", blank: "と", correct: "と", wrong: ["を", "に", "で"], hint: "共同・相手を示す助詞。" },
  { sentence: "電車（　）乗る。", blank: "に", correct: "に", wrong: ["で", "を", "が"], hint: "乗り物への乗車は「に」。" },
  { sentence: "八時（　）起きる。", blank: "に", correct: "に", wrong: ["で", "を", "が"], hint: "時刻を示す助詞。" },
];

export const CONNECTOR_GRAMMAR: ConnectorItem[] = [
  { word: "しかし", role: "逆接（前と反対の内容をつなぐ）", wrong: ["原因・理由", "例示", "追加"] },
  { word: "したがって", role: "因果（結果・結論）", wrong: ["対比", "例示", "並列"] },
  { word: "例えば", role: "例示（具体例を示す）", wrong: ["逆接", "因果", "時間"] },
  { word: "また", role: "追加（さらに同じ方向の内容）", wrong: ["逆接", "因果", "条件"] },
  { word: "ところが", role: "逆接（予想外の結果）", wrong: ["因果", "例示", "追加"] },
  { word: "そのため", role: "因果（理由から結果）", wrong: ["逆接", "例示", "対比"] },
  { word: "すなわち", role: "言い換え・説明", wrong: ["逆接", "例示", "時間"] },
  { word: "一方", role: "対比（別の側面）", wrong: ["因果", "例示", "追加"] },
  { word: "ところで", role: "話題転換", wrong: ["因果", "逆接", "例示"] },
  { word: "つまり", role: "言い換え・要約", wrong: ["逆接", "例示", "時間"] },
];

export const KEIGO_RESPECT: KeigoItem[] = [
  { plain: "行く", correct: "いらっしゃる", wrong: ["参る", "行かれる", "お行きになる"], kind: "尊敬" },
  { plain: "見る", correct: "ご覧になる", wrong: ["拝見する", "見られる", "ご覧なさる"], kind: "尊敬" },
  { plain: "言う", correct: "おっしゃる", wrong: ["申す", "言われる", "お言いになる"], kind: "尊敬" },
  { plain: "食べる", correct: "召し上がる", wrong: ["いただく", "食べられる", "お食べになる"], kind: "尊敬" },
  { plain: "来る", correct: "いらっしゃる", wrong: ["参る", "来られる", "おいでになる"], kind: "尊敬" },
  { plain: "読む", correct: "お読みになる", wrong: ["拝読する", "読まれる", "読み上げる"], kind: "尊敬" },
  { plain: "書く", correct: "お書きになる", wrong: ["申し上げる", "書かれる", "執筆する"], kind: "尊敬" },
  { plain: "知っている", correct: "ご存じだ", wrong: ["存じ上げる", "知られている", "存知する"], kind: "尊敬" },
];

export const KEIGO_HUMBLE: KeigoItem[] = [
  { plain: "行く", correct: "参る", wrong: ["いらっしゃる", "行かれる", "お行きになる"], kind: "謙譲" },
  { plain: "見る", correct: "拝見する", wrong: ["ご覧になる", "見られる", "ご覧なさる"], kind: "謙譲" },
  { plain: "言う", correct: "申す", wrong: ["おっしゃる", "言われる", "お言いになる"], kind: "謙譲" },
  { plain: "食べる", correct: "いただく", wrong: ["召し上がる", "食べられる", "お食べになる"], kind: "謙譲" },
  { plain: "来る", correct: "参る", wrong: ["いらっしゃる", "来られる", "おいでになる"], kind: "謙譲" },
  { plain: "読む", correct: "拝読する", wrong: ["お読みになる", "読まれる", "お読み申す"], kind: "謙譲" },
  { plain: "会う", correct: "お目にかかる", wrong: ["お会いになる", "会われる", "ご面会する"], kind: "謙譲" },
  { plain: "聞く", correct: "伺う", wrong: ["お聞きになる", "聞かれる", "拝聴する"], kind: "謙譲" },
];

export const JODOU_ITEMS: JodouItem[] = [
  { classical: "けり", meaning: "過去・詠嘆（〜だったのだ）", wrong: ["推量（〜だろう）", "打消（〜ない）", "完了（〜てしまった）"], example: "花咲きにけり" },
  { classical: "たり", meaning: "断定・詠嘆（〜である）", wrong: ["過去", "打消", "推量"], example: "月やあらぬ" },
  { classical: "なり", meaning: "断定（〜である）", wrong: ["過去", "完了", "打消"], example: "秋の夕暮れ" },
  { classical: "べし", meaning: "推量・当然（〜べきだ）", wrong: ["過去", "詠嘆", "打消"], example: "学ばんとす" },
  { classical: "ず", meaning: "打消（〜ない）", wrong: ["断定", "推量", "詠嘆"], example: "知らず" },
  { classical: "らむ", meaning: "推量（〜だろう）", wrong: ["過去", "断定", "打消"], example: "雨降らむ" },
  { classical: "らん", meaning: "推量（〜だろう）", wrong: ["過去", "断定", "詠嘆"], example: "行かん" },
  { classical: "む", meaning: "意志（〜しよう）", wrong: ["過去", "打消", "詠嘆"], example: "行かむ" },
  { classical: "つ", meaning: "完了（〜てしまった）", wrong: ["過去", "断定", "推量"], example: "老いぬ" },
  { classical: "き", meaning: "過去（〜た）", wrong: ["断定", "推量", "打消"], example: "書きし" },
  { classical: "けむ", meaning: "過去の推量", wrong: ["断定", "打消", "意志"], example: "知りけむ" },
  { classical: "まじ", meaning: "否定の推量（〜まい）", wrong: ["断定", "過去", "意志"], example: "忘れまじ" },
];

export const CLASSICAL_WORDS: ClassicalWordItem[] = [
  { line: "春はあけぼの", modern: "春は明け方がよい", wrong: ["春は明るい", "春は夜明け", "春は始まり"] },
  { line: "やうやう白くなりゆく", modern: "少しずつ白くなっていく", wrong: ["急に白くなる", "完全に白い", "白くならない"] },
  { line: "をかし", modern: "趣がある・おもしろい", wrong: ["可笑しい", "悲しい", "美しい"] },
  { line: "いと", modern: "とても（程度を表す）", wrong: ["糸", "意図", "異常"] },
  { line: "あはれ", modern: "なつかしい・心が動く", wrong: ["かわいそう", "憎らしい", "うれしい"] },
  { line: "いみじ", modern: "とても（程度が甚だしい）", wrong: ["意味", "異見", "今時"] },
  { line: "なむ", modern: "（詠嘆・断定の助詞）", wrong: ["涙", "波", "並"] },
  { line: "いとよし", modern: "とてもよい", wrong: ["糸がよい", "意図がよい", "異常によい"] },
  { line: "いづく", modern: "どこ", wrong: ["いつ", "いくつ", "いかに"] },
  { line: "いかで", modern: "どうして", wrong: ["いつ", "いくら", "いかに"] },
  { line: "いかに", modern: "どのように", wrong: ["いくつ", "いつ", "いずれ"] },
  { line: "たえず", modern: "絶えず・常に", wrong: ["時々", "一度", "まれに"] },
  { line: "さすがに", modern: "流石に・さすが", wrong: ["やはり", "偶然", "決して"] },
  { line: "いとま", modern: "暇・時間的余裕", wrong: ["糸", "意図", "今"] },
  { line: "もののふ", modern: "武士", wrong: ["物", "野人", "者"] },
];

export const WORK_QUOTES: WorkQuoteItem[] = [
  { sentence: "月見れば ちゝに物こそ かなしけれ", author: "源氏物語", wrong: ["枕草子", "竹取物語", "更級日記"] },
  { sentence: "春はあけぼの", author: "枕草子", wrong: ["源氏物語", "竹取物語", "徒然草"] },
  { sentence: "いと よろし", author: "竹取物語", wrong: ["源氏物語", "枕草子", "更級日記"] },
  { sentence: "やうやう白くなりゆく山際", author: "枕草子", wrong: ["源氏物語", "竹取物語", "伊勢物語"] },
  { sentence: "あはれ いかに", author: "更級日記", wrong: ["源氏物語", "枕草子", "竹取物語"] },
  { sentence: "いと おかし", author: "枕草子", wrong: ["源氏物語", "竹取物語", "徒然草"] },
  { sentence: "月やあらぬ 春や昔の 春ならぬ", author: "伊勢物語", wrong: ["源氏物語", "枕草子", "竹取物語"] },
  { sentence: "花の色は 移りにけりな 我が世誰ぞ", author: "小倉百人一首", wrong: ["源氏物語", "枕草子", "竹取物語"] },
  { sentence: "世の中に 絶えて桜の なかりせば", author: "古今和歌集", wrong: ["源氏物語", "枕草子", "更級日記"] },
  { sentence: "かくばかり うるはしきものを", author: "更級日記", wrong: ["源氏物語", "枕草子", "竹取物語"] },
];

export const KANBUN_ITEMS: KanbunItem[] = [
  { text: "学而時習之", reading: "学びて時に之を習う", wrong: ["学んで時を習う", "時に学び習う", "習う時に学ぶ"] },
  { text: "温故知新", reading: "故きを温ねて新しきを知る", wrong: ["温かい故郷を知る", "新しい故郷を温める", "古い知識を捨てる"] },
  { text: "守株待兎", reading: "株を守りて兎を待つ", wrong: ["株を守って兎を飼う", "兎を守って株を待つ", "株を待って兎を守る"] },
  { text: "矛盾", reading: "矛を売る者と盾を売る者", wrong: ["矛盾する二人", "盾と矛を買う", "売る者と買う者"] },
  { text: "画蛇添足", reading: "蛇を画きて足を添う", wrong: ["蛇に足をつける絵", "足を画いて蛇を添える", "蛇と足を描く"] },
  { text: "臥薪嘗胆", reading: "薪を臥し胆を嘗む", wrong: ["薪を寝て胆を食べる", "胆を臥し薪を嘗む", "薪と胆を交換する"] },
  { text: "百聞不如一見", reading: "百聞は一見に如かず", wrong: ["百聞は一見より上", "一見は百聞に如かず", "百見は一聞に如かず"] },
  { text: "温故知新", reading: "故きを温めて新しきを知る", wrong: ["新しきを温めて故きを知る", "温かい故郷を知る", "故郷を新しくする"] },
];

export const CLASSIC_SENTENCES: ClassicSentenceItem[] = [
  { classical: "春はあけぼの。やうやう白くなりゆく山際、少し明るくなりて", modern: "春は明け方がよい。少しずつ白くなっていく山の端が、少し明るくなって", wrong: ["春は夜明けが早い", "山が急に白くなる", "春は始まった"] },
  { classical: "月見れば ちゝに物こそ かなしけれ", modern: "月を見れば、父のことが哀れに思われる", wrong: ["月を見ればうれしい", "月は悲しい", "父を見れば月が哀れ"] },
  { classical: "いと よろし", modern: "とてもよい", wrong: ["糸がよい", "意図がよい", "あまりよくない"] },
  { classical: "をかし いと おかし", modern: "趣があって、とてもおもしろい", wrong: ["可笑しくて悲しい", "美しくて醜い", "普通の様子"] },
  { classical: "かくばかり うるはしきものを いかでかは 見捨て奉らん", modern: "これほど美しいものを、どうして見捨てられよう", wrong: ["美しいものを見捨てた", "見捨ててよい", "美しくないものを見る"] },
  { classical: "物のあはれ", modern: "物事を深く感じ入る心", wrong: ["物が哀れ", "物の形", "物の値段"] },
];

export const PARAGRAPH_SUMMARY: PassageItem[] = [
  {
    passage: "近年、スマートフォンの普及により、情報へのアクセスは格段に便利になった。しかし、その一方で、深く考える時間が減っているという指摘もある。",
    correct: "情報アクセスの便利さと、深く考える時間の減少",
    wrong: ["スマートフォンの歴史", "情報の正しさの問題", "子どもの教育環境"],
    hint: "「しかし」の前後で何が対比されているかに注目しよう。",
  },
  {
    passage: "読書は、知識を得るだけでなく、他者の視点を理解する力を育てる。本を通じて様々な人生に触れることで、自分の考えを広げることができる。",
    correct: "読書は知識と他者理解を通じて考えを広げる",
    wrong: ["読書は知識だけが目的", "本は娯楽にすぎない", "読書は時間の無駄"],
    hint: "段落全体を一言で言い直すと？",
  },
  {
    passage: "運動不足は生活習慣病のリスクを高める。毎日少しでも体を動かす習慣が、健康維持に重要である。",
    correct: "運動習慣が健康維持に重要",
    wrong: ["運動は必要ない", "生活習慣病は治らない", "運動は若者だけのもの"],
    hint: "2文目が筆者の主張の核心です。",
  },
  {
    passage: "Plastic bags were convenient. However, they harm the environment. Therefore, many shops now use reusable bags.",
    correct: "レジ袋の環境問題と、再利用バッグへの転換",
    wrong: ["レジ袋の歴史", "店の経営方法", "買い物の楽しさ"],
    hint: "However → Therefore の流れを追おう。",
  },
  {
    passage: "彼は小さい頃から本が好きだった。特に冒険小説を読むと、主人公と一緒に旅をしているような気持ちになった。こうした体験が、のちの創作活動の原点となった。",
    correct: "読書体験が創作活動の原点になった",
    wrong: ["冒険小説が一番おもしろい", "小さい頃は本が嫌いだった", "旅に出たことがある"],
    hint: "最後の文が結論です。",
  },
  {
    passage: "チームワークとは、各自が役割を果たしながら、全体の目標に向かって協力することである。一人でできることには限りがある。",
    correct: "チームワークは協力して目標に向かうこと",
    wrong: ["一人で全部やること", "役割分担は不要", "目標は不要"],
    hint: "定義文＋理由の構造です。",
  },
  {
    passage: "昔は手紙で連絡を取り合っていた。今はSNSやメールで、瞬時にやり取りできる。便利になった一方で、言葉選びがおろそかになりがちだという声もある。",
    correct: "連絡手段の変化と、言葉選びへの懸念",
    wrong: ["手紙が一番よい", "SNSは使うべきでない", "メールの歴史"],
    hint: "「一方で」以降も読み取ろう。",
  },
  {
    passage: "失敗は終わりではない。むしろ、何が足りなかったかを教えてくれる大切な経験である。次に活かす姿勢が、成長につながる。",
    correct: "失敗から学び次に活かすことが成長につながる",
    wrong: ["失敗は避けるべき", "失敗は終わり", "経験は不要"],
    hint: "「むしろ」「次に活かす」がキーワード。",
  },
];

export const REFERENCE_ITEMS: ReferenceItem[] = [
  { passage: "田中は毎日図書館で勉強している。彼は来月のテストに向けて、数学を重点的に復習している。", word: "彼", correct: "田中", wrong: ["彼", "来月", "数学"] },
  { passage: "桜の木の下で、少女が本を読んでいた。その姿は、絵に描いたような静けさだった。", word: "その", correct: "少女が本を読んでいた姿", wrong: ["桜の木", "絵", "静けさ"] },
  { passage: "新しい政策が発表された。これにより、環境問題への取り組みが加速すると期待されている。", word: "これ", correct: "新しい政策", wrong: ["環境問題", "取り組み", "期待"] },
  { passage: "兄は医者で、弟は教師だ。後者は毎日、生徒と向き合っている。", word: "後者", correct: "弟（教師）", wrong: ["兄", "医者", "生徒"] },
  { passage: "A案は費用が安いが、B案は効果が高い。前者を選ぶか後者を選ぶか、慎重に検討した。", word: "前者", correct: "A案", wrong: ["B案", "費用", "効果"] },
  { passage: "夏休みに海へ行った。そこでは初めてダイビングを体験した。", word: "そこ", correct: "海", wrong: ["夏休み", "ダイビング", "体験"] },
  { passage: "祖母は料理が上手だ。特に、その味付けは家族みんなに愛されている。", word: "その", correct: "祖母の味付け", wrong: ["料理", "家族", "祖母"] },
  { passage: "この問題は複雑だ。こうした課題には、時間をかけて取り組む必要がある。", word: "こうした", correct: "複雑な問題のような課題", wrong: ["時間", "必要", "取り組み"] },
  { passage: "先生は厳しいが、学生思いだ。こういう教師に出会えてよかった。", word: "こういう", correct: "厳しいが学生思いな教師", wrong: ["厳しい教師", "学生", "出会い"] },
  { passage: "彼女はピアノが得意だ。それどころか、コンクールで賞も取った。", word: "それどころか", correct: "（得意である上に）さらに", wrong: ["しかし", "だから", "例えば"] },
];

export const CONNECTOR_READING: ConnectorItem[] = [
  { word: "したがって", role: "原因・結果（前が理由、後が結論）", wrong: ["対比・逆接", "例示", "時間の順序"] },
  { word: "一方で", role: "対比（別の側面・反対の視点）", wrong: ["因果", "例示", "追加"] },
  { word: "つまり", role: "言い換え・要約", wrong: ["逆接", "例示", "時間"] },
  { word: "なぜなら", role: "理由の説明", wrong: ["結果", "逆接", "例示"] },
  { word: "ところで", role: "話題の転換", wrong: ["因果", "逆接", "例示"] },
  { word: "その結果", role: "因果（結果）", wrong: ["逆接", "例示", "対比"] },
  { word: "たとえば", role: "例示", wrong: ["逆接", "因果", "対比"] },
  { word: "しかも", role: "添加（さらに）", wrong: ["逆接", "因果", "例示"] },
  { word: "もっとも", role: "但し書き・例外", wrong: ["因果", "例示", "追加"] },
  { word: "要するに", role: "要約・結論", wrong: ["逆接", "例示", "時間"] },
];

export const GIST_ITEMS: GistItem[] = [
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
  {
    passage: "言葉は単なる情報の伝達手段ではない。相手への思いやりや、関係を築く力も含まれている。丁寧な言葉遣いは、信頼関係の基礎となる。",
    correct: "言葉は思いやりと信頼関係を築く力がある",
    wrong: ["言葉は情報だけ伝えればよい", "丁寧語は不要", "信頼は言葉と無関係"],
  },
  {
    passage: "失敗から学ぶ姿勢が大切だ。同じ間違いを繰り返さないために、原因を分析し、次の行動に活かすことが求められる。",
    correct: "失敗の原因を分析し次に活かすことが大切",
    wrong: ["失敗は避けるべき", "分析は不要", "同じ間違いを繰り返してよい"],
  },
  {
    passage: "古典文学は、現代とは異なる価値観や表現を通じて、人間の普遍的な感情に触れさせてくれる。現代語訳を手がかりに読むことで、その魅力に近づける。",
    correct: "古典は普遍的な感情に触れ、現代語訳で読める",
    wrong: ["古典は古くて読む価値がない", "現代語訳は不要", "感情は現代だけのもの"],
  },
  {
    passage: "要約は、文章の要点だけを抜き出して短くまとめることである。細部をすべて写すのではなく、筆者の伝えたい核心をとらえる練習になる。",
    correct: "要約は要点を抜き出し核心をとらえる技術",
    wrong: ["要約は全文を写すこと", "細部がすべて重要", "核心は不要"],
  },
  {
    passage: "敬語は、相手への敬意を言葉で示すものである。場面と相手との関係に応じて、尊敬語・謙譲語・丁寧語を使い分ける必要がある。",
    correct: "敬語は場面に応じて使い分ける",
    wrong: ["敬語はいつも同じ", "丁寧語だけでよい", "場面は関係ない"],
  },
  {
    passage: "比喩は、似ているものに例えることで、イメージを伝える表現である。読み手の理解を深め、文章に味わいを与える。",
    correct: "比喩は例えでイメージを伝え理解を深める",
    wrong: ["比喩は意味がない", "例えは不要", "イメージは伝わらない"],
  },
];

export const AUTHOR_OPINION: PassageItem[] = [
  {
    passage: "私は、毎日少しでも本を読む習慣を身につけるべきだと考える。短時間でも、言葉に触れることで思考力が育つからである。",
    correct: "毎日少しでも読書する習慣をつけるべき",
    wrong: ["読書は不要", "長時間読むべき", "思考力と読書は無関係"],
    hint: "「べきだと考える」の後ろが筆者の主張。",
  },
  {
    passage: "スマートフォンの使いすぎは問題だ。特に、深く考える時間を奪う点が心配である。",
    correct: "スマホの使いすぎ、特に思考時間を奪う点が問題",
    wrong: ["スマホは使ってよい", "使いすぎは問題ない", "思考時間は増えている"],
    hint: "「問題だ」「心配」の対象を押さえよう。",
  },
  {
    passage: "古典を読むことは、現代の自分を見つめ直す良い機会になる。時代が違っても、人の心は通じ合うのだ。",
    correct: "古典は自分を見つめ直す機会になる",
    wrong: ["古典は読む価値がない", "時代が違えば心は通じない", "現代の自分は不要"],
    hint: "筆者が「良い機会」と言っていること。",
  },
  {
    passage: "要約を書く練習は、読む力と書く力の両方を伸ばす。要点を見極める目が養われる。",
    correct: "要約練習は読む力・書く力・要点を見極める力を伸ばす",
    wrong: ["要約は読む力だけ", "書く力は伸びない", "要点は見極めなくてよい"],
    hint: "「両方を伸ばす」がポイント。",
  },
  {
    passage: "敬語を正しく使えることは、社会人として必要なスキルである。相手への配慮が言葉に表れる。",
    correct: "敬語は社会人として必要な配慮の表れ",
    wrong: ["敬語は不要", "配慮と無関係", "学生には関係ない"],
    hint: "「必要なスキル」の理由を読もう。",
  },
  {
    passage: "同音異義語を区別できるかどうかは、語彙力の表れである。文脈から正しい言葉を選ぶ練習をしよう。",
    correct: "同音異義語の区別は語彙力の表れ、文脈で選ぶ練習が大切",
    wrong: ["同音異義語は区別不要", "文脈は関係ない", "語彙力と無関係"],
    hint: "筆者が勧めていることは？",
  },
];

export const TITLE_ITEMS: { passage: string; correct: string; wrong: string[] }[] = [
  {
    passage: "読書は、知識を得るだけでなく、他者の視点を理解する力を育てる。本を通じて様々な人生に触れることで、自分の考えを広げることができる。",
    correct: "読書が広げるもの",
    wrong: ["本の歴史", "図書館の利用法", "読書量の記録"],
  },
  {
    passage: "失敗は終わりではない。むしろ、何が足りなかったかを教えてくれる大切な経験である。",
    correct: "失敗から学ぶ",
    wrong: ["成功の方法", "失敗の恐怖", "経験の否定"],
  },
  {
    passage: "敬語は、相手への敬意を言葉で示すものである。場面と相手との関係に応じて使い分ける必要がある。",
    correct: "敬語の使い分け",
    wrong: ["丁寧語だけ", "敬語の歴史", "言葉の起源"],
  },
  {
    passage: "古典文学は、現代とは異なる価値観や表現を通じて、人間の普遍的な感情に触れさせてくれる。",
    correct: "古典と普遍的な感情",
    wrong: ["現代文学の優位", "価値観の一致", "古典の暗記"],
  },
  {
    passage: "比喩は、似ているものに例えることで、イメージを伝える表現である。",
    correct: "比喩の働き",
    wrong: ["比喩の禁止", "例えの歴史", "イメージの否定"],
  },
  {
    passage: "チームワークとは、各自が役割を果たしながら、全体の目標に向かって協力することである。",
    correct: "チームワークとは",
    wrong: ["一人作業のすすめ", "役割の放棄", "目標の否定"],
  },
];
