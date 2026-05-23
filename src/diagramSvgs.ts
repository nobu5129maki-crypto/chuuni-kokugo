/** 国語向けのシンプルな図解 SVG */

export function svgSentenceParts(subject: string, predicate: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 100" role="img" aria-label="文の成分">
    <rect x="8" y="20" width="130" height="60" rx="8" fill="rgba(56,189,248,0.2)" stroke="#38bdf8"/>
    <text x="73" y="48" text-anchor="middle" fill="#e2e8f0" font-size="12">主語</text>
    <text x="73" y="68" text-anchor="middle" fill="#7dd3fc" font-size="14">${subject}</text>
    <rect x="182" y="20" width="130" height="60" rx="8" fill="rgba(167,139,250,0.2)" stroke="#a78bfa"/>
    <text x="247" y="48" text-anchor="middle" fill="#e2e8f0" font-size="12">述語</text>
    <text x="247" y="68" text-anchor="middle" fill="#c4b5fd" font-size="14">${predicate}</text>
  </svg>`;
}

export function svgKanjiHint(onYomi: string, kunYomi: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 90" role="img" aria-label="読みのヒント">
    <rect x="10" y="15" width="120" height="60" rx="8" fill="rgba(249,115,22,0.15)" stroke="#f97316"/>
    <text x="70" y="38" text-anchor="middle" fill="#fdba74" font-size="11">音読み</text>
    <text x="70" y="58" text-anchor="middle" fill="#fff" font-size="14">${onYomi}</text>
    <rect x="150" y="15" width="120" height="60" rx="8" fill="rgba(251,146,60,0.15)" stroke="#fb923c"/>
    <text x="210" y="38" text-anchor="middle" fill="#fdba74" font-size="11">訓読み</text>
    <text x="210" y="58" text-anchor="middle" fill="#fff" font-size="14">${kunYomi}</text>
  </svg>`;
}

export function svgClassicTranslation(classical: string, modern: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 110" role="img" aria-label="現代語訳">
    <text x="20" y="28" fill="#c4b5fd" font-size="12">古文</text>
    <text x="20" y="50" fill="#f1f5f9" font-size="14">${classical}</text>
    <line x1="20" y1="62" x2="280" y2="62" stroke="rgba(255,255,255,0.2)"/>
    <text x="20" y="82" fill="#86efac" font-size="12">現代語</text>
    <text x="20" y="102" fill="#bbf7d0" font-size="13">${modern}</text>
  </svg>`;
}

export function svgReadingLink(before: string, after: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" role="img" aria-label="文の接続">
    <text x="20" y="35" fill="#94a3b8" font-size="12">${before}</text>
    <text x="140" y="35" fill="#4ade80" font-size="16">→</text>
    <text x="165" y="35" fill="#86efac" font-size="12">${after}</text>
  </svg>`;
}
