import { useState } from "react";

const QUESTIONS = [
  {
    q: "Q1. ピラティスを体験しようと思ったきっかけは？",
    options: [
      "A）姿勢や体型が気になってきた",
      "B）腰・肩など身体の不調を改善したい",
      "C）ストレス発散・気分転換がしたい",
      "D）SNSや友人に勧められた",
    ],
  },
  {
    q: "Q2. 今の自分の身体に対する気持ちは？",
    options: [
      "A）正直、かなり焦っている",
      "B）ゆっくりでいいから着実に変えたい",
      "C）まず楽しめるか確かめたい",
      "D）特に深くは考えていない",
    ],
  },
  {
    q: "Q3. 新しいことを始めるとき、どのタイプ？",
    options: [
      "A）効果や口コミをしっかり調べてから決める",
      "B）「いい！」と思ったら直感で動く",
      "C）誰かに背中を押してもらいたい",
      "D）とりあえず体験してから考える派",
    ],
  },
  {
    q: "Q4. インストラクターに求めることは？",
    options: [
      "A）的確な指導とフィードバック",
      "B）励ましや共感してくれる雰囲気",
      "C）干渉しすぎない適度な距離感",
      "D）まだよくわからない",
    ],
  },
  {
    q: "Q5. 今日の体験後、どうなっていたい？",
    options: [
      "A）「ここなら変われる」と確信したい",
      "B）「楽しかった！また来たい」と思いたい",
      "C）身体の変化をリアルに感じたい",
      "D）自分に合うか見極めたい",
    ],
  },
  {
    q: "Q6. 自分の身体の悩みや課題を、どのくらい把握していますか？",
    options: [
      "A）かなり具体的にわかっている（骨盤・反り腰など）",
      "B）なんとなくわかっている",
      "C）あまりよくわからない",
      "D）特に悩みは意識したことがない",
    ],
  },
  {
    q: "Q7. ピラティスに求めることは何ですか？",
    options: [
      "A）身体の変化・効果をしっかり出したい　→ 続けた結果、見た目や体力が変わった！を目指したい",
      "B）楽しく通えて、長く続けられればいい　→ 「あ〜気持ちよかった」が毎回あれば十分",
      "C）いろんなプログラムや動きを試してみたい　→ 「今日は何やるんだろう？」とワクワクしたい",
      "D）自分のペースで、無理なくできる範囲でやりたい　→ 「これなら私にもできる」と思いながら続けたい",
    ],
  },
  {
    q: "Q8. 運動やボディケアにかけるお金について、どのスタンスに近い？",
    options: [
      "A）効果があると確信できれば、しっかり投資したい",
      "B）続けられる範囲で、無理のない金額がいい",
      "C）まずは試してみて、良ければ考えたい",
      "D）正直、費用面は少し気になっている",
    ],
  },
  {
    q: "Q9. これまで運動やフィットネスを続けた経験は？",
    options: [
      "A）ジムやスポーツを定期的に続けてきた",
      "B）始めてみたけど途中でやめてしまうことが多い",
      "C）ほとんど運動習慣がない",
      "D）ピラティス・ヨガ系は経験あり",
    ],
  },
  {
    q: "Q10. 「通い続けるのが難しい」とすれば、一番の理由は？",
    options: [
      "A）費用が続かなくなりそう",
      "B）忙しくて時間が取れなくなりそう",
      "C）効果を感じられなかったら",
      "D）そういう心配はあまりしていない",
    ],
  },
];

const SCORE_TABLE = [
  { "A）姿勢や体型": { cheetah:3,owl:1,penguin:1,turtle:1,butterfly:2,fox:1 }, "B）腰・肩": { cheetah:1,owl:2,penguin:1,turtle:3,butterfly:0,fox:1 }, "C）ストレス": { cheetah:0,owl:0,penguin:2,turtle:1,butterfly:3,fox:1 }, "D）SNS": { cheetah:1,owl:1,penguin:2,turtle:0,butterfly:2,fox:3 } },
  { "A）正直": { cheetah:4,owl:1,penguin:2,turtle:0,butterfly:1,fox:0 }, "B）ゆっくり": { cheetah:0,owl:2,penguin:1,turtle:4,butterfly:1,fox:1 }, "C）まず楽し": { cheetah:1,owl:0,penguin:1,turtle:0,butterfly:3,fox:3 }, "D）特に深く": { cheetah:0,owl:0,penguin:1,turtle:1,butterfly:2,fox:4 } },
  { "A）効果や口": { cheetah:1,owl:4,penguin:0,turtle:2,butterfly:0,fox:2 }, "B）「いい！": { cheetah:3,owl:0,penguin:1,turtle:0,butterfly:4,fox:0 }, "C）誰かに背": { cheetah:1,owl:0,penguin:4,turtle:1,butterfly:1,fox:0 }, "D）とりあえず": { cheetah:1,owl:1,penguin:1,turtle:1,butterfly:2,fox:3 } },
  { "A）的確": { cheetah:2,owl:3,penguin:0,turtle:2,butterfly:0,fox:1 }, "B）励まし": { cheetah:1,owl:0,penguin:4,turtle:1,butterfly:2,fox:0 }, "C）干渉": { cheetah:1,owl:2,penguin:0,turtle:1,butterfly:1,fox:4 }, "D）まだよく": { cheetah:0,owl:1,penguin:2,turtle:1,butterfly:2,fox:2 } },
  { "A）「ここなら": { cheetah:4,owl:2,penguin:1,turtle:1,butterfly:0,fox:0 }, "B）「楽しかっ": { cheetah:1,owl:0,penguin:2,turtle:1,butterfly:4,fox:0 }, "C）身体の変化": { cheetah:2,owl:1,penguin:1,turtle:3,butterfly:2,fox:0 }, "D）自分に合う": { cheetah:0,owl:2,penguin:1,turtle:0,butterfly:1,fox:4 } },
  { "A）かなり具体": { cheetah:2,owl:4,penguin:0,turtle:2,butterfly:0,fox:1 }, "B）なんとなく": { cheetah:2,owl:1,penguin:1,turtle:2,butterfly:1,fox:1 }, "C）あまりよく": { cheetah:0,owl:0,penguin:3,turtle:1,butterfly:2,fox:1 }, "D）特に悩み": { cheetah:0,owl:0,penguin:1,turtle:0,butterfly:3,fox:3 } },
  { "A）身体の変化・効果": { cheetah:4,owl:3,penguin:0,turtle:1,butterfly:0,fox:1 }, "B）楽しく通え": { cheetah:0,owl:0,penguin:2,turtle:4,butterfly:2,fox:0 }, "C）いろんなプ": { cheetah:1,owl:1,penguin:0,turtle:0,butterfly:4,fox:2 }, "D）自分のペース": { cheetah:0,owl:1,penguin:3,turtle:3,butterfly:1,fox:0 } },
  { "A）効果があると確信": { cheetah:3,owl:3,penguin:0,turtle:1,butterfly:1,fox:1 }, "B）続けられる範囲": { cheetah:0,owl:1,penguin:2,turtle:4,butterfly:1,fox:0 }, "C）まずは試し": { cheetah:1,owl:1,penguin:1,turtle:0,butterfly:3,fox:3 }, "D）正直、費用": { cheetah:0,owl:0,penguin:3,turtle:2,butterfly:0,fox:2 } },
  { "A）ジムやスポーツ": { cheetah:3,owl:2,penguin:0,turtle:2,butterfly:1,fox:2 }, "B）始めてみたけど途中": { cheetah:1,owl:0,penguin:3,turtle:1,butterfly:2,fox:1 }, "C）ほとんど運動": { cheetah:0,owl:0,penguin:3,turtle:2,butterfly:1,fox:1 }, "D）ピラティス・ヨガ": { cheetah:2,owl:3,penguin:0,turtle:1,butterfly:2,fox:2 } },
  { "A）費用が続かな": { cheetah:0,owl:1,penguin:2,turtle:2,butterfly:0,fox:3 }, "B）忙しくて時間": { cheetah:2,owl:1,penguin:1,turtle:1,butterfly:1,fox:2 }, "C）効果を感じられ": { cheetah:3,owl:3,penguin:1,turtle:1,butterfly:1,fox:0 }, "D）そういう心配": { cheetah:1,owl:0,penguin:1,turtle:2,butterfly:4,fox:0 } },
];

const TYPE_DATA = {
  cheetah:   { emoji:"🐆", name:"チーター", sub:"今すぐ変わりたい型", color:"#e8520a", bg:"#fff4f0", point:"焦りと熱量が高い。背中を押すより一緒に走るイメージ。", talks:["「今日体験してみて、身体の変化感じましたか？」","「最初の3ヶ月で変化を実感する方が多いんですよ」","「スタートが早いほど結果も早い。今日が一番もったいなくない日です」"], closing:"今日限定の特典が刺さりやすい。テンポよくプラン提案へ。" },
  owl:       { emoji:"🦉", name:"フクロウ", sub:"納得してから動く型",  color:"#2563eb", bg:"#f0f5ff", point:"感情より根拠。数字・実績・比較があると安心する。", talks:["「他のスタジオとも比較されていますか？」","「うちのプログラムは〇〇という理由で設計されています」","「続けている会員様の平均通室回数は月〇回です」"], closing:"比較表・実績データが効果的。「即決プレッシャー」は逆効果。" },
  penguin:   { emoji:"🐧", name:"ペンギン", sub:"共感・背中押し型",    color:"#7c3aed", bg:"#f5f0ff", point:"「私にできるかな」が本音。否定せず、まず受け止める。", talks:["「初めてで不安でしたよね。どうでしたか？」","「最初から自信がある方なんてほぼいないんですよ」","スタッフ自身の体験談を話す"], closing:"「一人じゃないよ」感を出す。継続サポートの安心感が刺さる。" },
  turtle:    { emoji:"🐢", name:"カメ",    sub:"じっくり健康型",      color:"#16a34a", bg:"#f0fff4", point:"押し売り感を一番嫌う。長期的なビジョンを一緒に描く。", talks:["「1年後どんな身体になっていたいですか？」","「無理なく続けられることがピラティスの強みです」","「月〇回ペースでも半年でしっかり変化が出ます」"], closing:"少回数・継続しやすいプランから提案。「まず3ヶ月」の段階的提案が◎" },
  butterfly: { emoji:"🦋", name:"バタフライ", sub:"感性・体験重視型",  color:"#d97706", bg:"#fffbf0", point:"論理より「なんかいい！」が決め手。体験直後の熱が冷めないうちに。", talks:["「今日、身体どうでしたか？気持ちよかったですか？」","「その感覚、続けるとどんどん深まりますよ」","「スタジオの雰囲気、なじめそうですか？」"], closing:"体験直後すぐに話を進める。「なんかいいな」→「ここにする」への転換を。" },
  fox:       { emoji:"🦊", name:"キツネ",  sub:"冷静・比較検討型",    color:"#9333ea", bg:"#fdf4ff", point:"押すと逃げる。「ここにしかない理由」を静かに伝える。", talks:["「今日いくつかスタジオを見て回ってますか？」","「他と比べて気になった点はありますか？」","「うちが選ばれる理由は〇〇と〇〇なんです」"], closing:"「今日決めなくていい」くらいの余裕が信頼に。後日フォロー必須。" },
};

const typeKeys = ["cheetah","owl","penguin","turtle","butterfly","fox"];

function matchScore(answer, table) {
  for (const key in table) {
    if (answer && answer.includes(key.replace("）","）").substring(0, key.indexOf("）")+2))) {
      return table[key];
    }
    // より柔軟なマッチング
    const shortKey = key.substring(0, Math.min(8, key.length));
    if (answer && answer.includes(shortKey)) return table[key];
  }
  return null;
}

function calcScores(answers) {
  const scores = { cheetah:0,owl:0,penguin:0,turtle:0,butterfly:0,fox:0 };
  answers.forEach((ans, qi) => {
    if (!ans) return;
    const table = SCORE_TABLE[qi];
    for (const key in table) {
      const k = key.substring(0, Math.min(9, key.length));
      if (ans.includes(k)) {
        Object.entries(table[key]).forEach(([t,s]) => { scores[t] += s; });
        break;
      }
    }
  });
  return scores;
}

function getFlags(answers) {
  const flags = [];
  if (answers[7] && answers[7].includes("D）正直")) flags.push({ label:"⚠️ 費用に不安あり", color:"#fef3c7", text:"#d97706", action:"価格プランの説明を丁寧に。分割や少回数プランを先に提示する。" });
  if (answers[8] && answers[8].includes("B）始めてみたけど")) flags.push({ label:"⚠️ 継続リスク高め", color:"#fee2e2", text:"#dc2626", action:"「また続かないかも」という不安を先に拾って。継続サポート体制を強調。" });
  if (answers[8] && answers[8].includes("C）ほとんど運動")) flags.push({ label:"⚠️ 運動習慣なし", color:"#fee2e2", text:"#dc2626", action:"初心者でも安心できる環境を伝える。最初の1ヶ月の丁寧なフォローを約束する。" });
  if (answers[9] && answers[9].includes("A）費用が")) flags.push({ label:"⚠️ 費用で離脱リスク", color:"#fef3c7", text:"#d97706", action:"継続しやすい価格プランを優先提案。長期契約の割引メリットを見せる。" });
  return flags;
}

export default function App() {
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("main");
  const [currentQ, setCurrentQ] = useState(0);

  const scores = calcScores(answers);
  const sorted = typeKeys.slice().sort((a,b) => scores[b]-scores[a]);
  const mainKey = sorted[0];
  const subKey  = sorted[1];
  const main = TYPE_DATA[mainKey];
  const sub  = TYPE_DATA[subKey];
  const maxScore = Math.max(...Object.values(scores));
  const flags = getFlags(answers);
  const answeredCount = answers.filter(a => a !== null).length;
  const allAnswered = answeredCount === 10;

  const handleSelect = (opt) => {
    const next = [...answers];
    next[currentQ] = opt;
    setAnswers(next);
    if (submitted) setSubmitted(false);
    // 自動で次の問へ
    setTimeout(() => {
      if (currentQ < 9) setCurrentQ(currentQ + 1);
    }, 300);
  };

  const handleReset = () => {
    setAnswers(Array(10).fill(null));
    setSubmitted(false);
    setActiveTab("main");
    setCurrentQ(0);
  };

  const progressPct = (answeredCount / 10) * 100;

  return (
    <div style={{ minHeight:"100vh", background:"#f0ede8", fontFamily:"'Hiragino Sans','Yu Gothic',sans-serif" }}>

      {/* ヘッダー */}
      <div style={{ background:"#1a1a2e", padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:24 }}>🐾</span>
          <div>
            <div style={{ color:"#e8d5b7", fontSize:16, fontWeight:700 }}>ピラティスタイプ診断</div>
            <div style={{ color:"#666", fontSize:10 }}>STAFF INTERNAL TOOL · 10問版</div>
          </div>
        </div>
        {!submitted && (
          <div style={{ color:"#e8d5b7", fontSize:13 }}>{answeredCount}<span style={{ color:"#666" }}>/10</span></div>
        )}
      </div>

      {/* プログレスバー */}
      {!submitted && (
        <div style={{ background:"#2a2a3e", height:4 }}>
          <div style={{ background:"#e8d5b7", height:"100%", width:`${progressPct}%`, transition:"width 0.3s" }} />
        </div>
      )}

      <div style={{ maxWidth:640, margin:"0 auto", padding:"20px 16px" }}>

        {/* ===== 入力画面 ===== */}
        {!submitted ? (
          <div>
            {/* Q番号ナビ */}
            <div style={{ display:"flex", gap:6, marginBottom:16, flexWrap:"wrap" }}>
              {QUESTIONS.map((_,i) => (
                <button key={i} onClick={() => setCurrentQ(i)} style={{
                  width:32, height:32, borderRadius:"50%", border:"none", cursor:"pointer",
                  background: answers[i] !== null ? "#1a1a2e" : currentQ===i ? "#e8d5b7" : "#ddd",
                  color: answers[i] !== null ? "#e8d5b7" : currentQ===i ? "#1a1a2e" : "#888",
                  fontSize:12, fontWeight:700, fontFamily:"inherit",
                }}>
                  {i+1}
                </button>
              ))}
            </div>

            {/* 現在の質問 */}
            <div style={{ background:"#fff", borderRadius:16, padding:20, marginBottom:12, border:"1px solid #e0dbd4" }}>
              <div style={{ fontSize:11, color:"#aaa", marginBottom:8 }}>Q{currentQ+1} / 10</div>
              <div style={{ fontWeight:700, fontSize:15, color:"#1a1a2e", marginBottom:16, lineHeight:1.5 }}>
                {QUESTIONS[currentQ].q}
              </div>
              <div style={{ display:"grid", gap:8 }}>
                {QUESTIONS[currentQ].options.map(opt => (
                  <button key={opt} onClick={() => handleSelect(opt)} style={{
                    background: answers[currentQ]===opt ? "#1a1a2e" : "#f8f6f2",
                    color: answers[currentQ]===opt ? "#fff" : "#333",
                    border: answers[currentQ]===opt ? "2px solid #1a1a2e" : "2px solid #e0dbd4",
                    borderRadius:10, padding:"12px 14px", textAlign:"left",
                    fontSize:13, cursor:"pointer", fontFamily:"inherit", lineHeight:1.5,
                    transition:"all 0.15s",
                  }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 前後ナビ */}
            <div style={{ display:"flex", gap:8, marginBottom:16 }}>
              <button onClick={() => setCurrentQ(Math.max(0, currentQ-1))} disabled={currentQ===0} style={{
                flex:1, padding:12, borderRadius:10, border:"2px solid #e0dbd4", background:"#fff",
                color: currentQ===0 ? "#ccc" : "#555", cursor: currentQ===0 ? "not-allowed" : "pointer",
                fontSize:13, fontFamily:"inherit",
              }}>← 前の質問</button>
              <button onClick={() => setCurrentQ(Math.min(9, currentQ+1))} disabled={currentQ===9} style={{
                flex:1, padding:12, borderRadius:10, border:"2px solid #e0dbd4", background:"#fff",
                color: currentQ===9 ? "#ccc" : "#555", cursor: currentQ===9 ? "not-allowed" : "pointer",
                fontSize:13, fontFamily:"inherit",
              }}>次の質問 →</button>
            </div>

            <button onClick={() => allAnswered && setSubmitted(true)} style={{
              width:"100%", padding:16, borderRadius:12, border:"none",
              background: allAnswered ? "#1a1a2e" : "#ccc",
              color:"#fff", fontSize:16, fontWeight:700,
              cursor: allAnswered ? "pointer" : "not-allowed", fontFamily:"inherit",
            }}>
              {allAnswered ? "🔍 タイプを判定する" : `あと${10 - answeredCount}問回答してください`}
            </button>
          </div>

        ) : (
        /* ===== 結果画面 ===== */
          <div>
            {/* メインタイプカード */}
            <div style={{ background:main.bg, borderRadius:20, padding:24, marginBottom:12, border:`2px solid ${main.color}30` }}>
              <div style={{ fontSize:10, color:"#999", letterSpacing:2, marginBottom:8 }}>MAIN TYPE</div>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ fontSize:52 }}>{main.emoji}</div>
                <div>
                  <div style={{ fontSize:26, fontWeight:900, color:main.color }}>{main.name}</div>
                  <div style={{ fontSize:13, color:"#666", marginTop:2 }}>{main.sub}</div>
                </div>
              </div>
              <div style={{ marginTop:14, display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ fontSize:11, color:"#aaa" }}>SUB</div>
                <div style={{ background:"#fff", borderRadius:20, padding:"4px 14px", fontSize:13, border:`1px solid ${sub.color}50`, color:sub.color, fontWeight:600 }}>
                  {sub.emoji} {sub.name}
                </div>
              </div>
            </div>

            {/* 警告フラグ */}
            {flags.length > 0 && (
              <div style={{ marginBottom:12 }}>
                {flags.map((f,i) => (
                  <div key={i} style={{ background:f.color, borderRadius:12, padding:"12px 16px", marginBottom:8, border:`1px solid ${f.text}30` }}>
                    <div style={{ fontSize:13, fontWeight:700, color:f.text, marginBottom:4 }}>{f.label}</div>
                    <div style={{ fontSize:12, color:"#555", lineHeight:1.6 }}>{f.action}</div>
                  </div>
                ))}
              </div>
            )}

            {/* スコアバー */}
            <div style={{ background:"#fff", borderRadius:16, padding:18, marginBottom:12, border:"1px solid #e0dbd4" }}>
              <div style={{ fontSize:12, color:"#888", fontWeight:700, marginBottom:10 }}>📊 スコア分布</div>
              {typeKeys.map(k => {
                const t = TYPE_DATA[k];
                const pct = maxScore > 0 ? (scores[k]/maxScore)*100 : 0;
                return (
                  <div key={k} style={{ marginBottom:8 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                      <span style={{ fontSize:12, color:"#444" }}>{t.emoji} {t.name}</span>
                      <span style={{ fontSize:12, color:"#888" }}>{scores[k]}pt</span>
                    </div>
                    <div style={{ background:"#f0ede8", borderRadius:4, height:8 }}>
                      <div style={{ background:t.color, width:`${pct}%`, height:"100%", borderRadius:4, transition:"width 0.6s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* タブ */}
            <div style={{ display:"flex", gap:6, marginBottom:10 }}>
              {[{id:"main",label:`${main.emoji} ${main.name}`},{id:"sub",label:`${sub.emoji} ${sub.name}`},{id:"memo",label:"📝 接客メモ"}].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  flex:1, padding:"10px 4px", borderRadius:10, border:"none",
                  background: activeTab===tab.id ? "#1a1a2e" : "#e0dbd4",
                  color: activeTab===tab.id ? "#e8d5b7" : "#555",
                  fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                }}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* タブコンテンツ */}
            {(activeTab==="main"||activeTab==="sub") && (() => {
              const t = activeTab==="main" ? main : sub;
              return (
                <div style={{ background:"#fff", borderRadius:16, padding:20, border:"1px solid #e0dbd4" }}>
                  <div style={{ fontSize:13, color:t.color, fontWeight:700, marginBottom:8 }}>💡 このタイプのポイント</div>
                  <div style={{ fontSize:13, color:"#444", lineHeight:1.7, marginBottom:18, padding:"12px 14px", background:t.bg, borderRadius:10 }}>{t.point}</div>
                  <div style={{ fontSize:13, color:"#555", fontWeight:700, marginBottom:10 }}>💬 使えるトーク例</div>
                  {t.talks.map((talk,i) => (
                    <div key={i} style={{ display:"flex", gap:10, marginBottom:10 }}>
                      <div style={{ minWidth:22, height:22, borderRadius:"50%", background:t.color, color:"#fff", fontSize:11, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>{i+1}</div>
                      <div style={{ fontSize:13, color:"#333", lineHeight:1.6 }}>{talk}</div>
                    </div>
                  ))}
                  <div style={{ marginTop:14, padding:"12px 14px", background:"#1a1a2e", borderRadius:10 }}>
                    <div style={{ fontSize:10, color:"#8a7a6a", marginBottom:4 }}>🎯 クロージング</div>
                    <div style={{ fontSize:13, color:"#e8d5b7", lineHeight:1.6 }}>{t.closing}</div>
                  </div>
                </div>
              );
            })()}

            {activeTab==="memo" && (
              <div style={{ background:"#fff", borderRadius:16, padding:20, border:"1px solid #e0dbd4" }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#555", marginBottom:12 }}>📝 今日の接客まとめ</div>
                <div style={{ padding:14, background:main.bg, borderRadius:10, marginBottom:10, border:`1px solid ${main.color}20` }}>
                  <div style={{ fontSize:11, color:main.color, fontWeight:700, marginBottom:4 }}>メインアプローチ</div>
                  <div style={{ fontSize:13, color:"#333", lineHeight:1.7 }}>{main.point}</div>
                  <div style={{ fontSize:12, color:"#777", marginTop:6 }}>→ {main.closing}</div>
                </div>
                <div style={{ padding:14, background:sub.bg, borderRadius:10, marginBottom:10, border:`1px solid ${sub.color}20` }}>
                  <div style={{ fontSize:11, color:sub.color, fontWeight:700, marginBottom:4 }}>サブ傾向（{sub.name}）</div>
                  <div style={{ fontSize:13, color:"#333", lineHeight:1.7 }}>{sub.point}</div>
                </div>
                {flags.length > 0 && (
                  <div style={{ padding:14, background:"#fef9ee", borderRadius:10, border:"1px solid #fde68a" }}>
                    <div style={{ fontSize:11, color:"#d97706", fontWeight:700, marginBottom:6 }}>⚠️ 注意フラグ</div>
                    {flags.map((f,i) => <div key={i} style={{ fontSize:12, color:"#555", marginBottom:4 }}>• {f.label}：{f.action}</div>)}
                  </div>
                )}
                <div style={{ marginTop:10, padding:10, background:"#f8f6f2", borderRadius:8, fontSize:11, color:"#aaa" }}>
                  ※判定はあくまで傾向です。会話の中で随時修正してください。
                </div>
              </div>
            )}

            <button onClick={handleReset} style={{
              width:"100%", marginTop:14, padding:14, borderRadius:12,
              border:"2px solid #1a1a2e", background:"#fff",
              color:"#1a1a2e", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
            }}>
              ← 別のお客様を診断する
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
