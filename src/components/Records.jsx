import { useState } from 'react'
import { PhaseBadge, Card, DataRow, formatDate, formatDateLong } from './ui'

export function RecordList({ records, onSelect, onBack }) {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("newest")
  const filtered = records.filter(r => !search || (r.name || "").includes(search) || (r.furigana || "").includes(search) || (r.phone || "").includes(search))
  const sorted = [...filtered].sort((a, b) => sort === "alpha" ? (a.furigana || a.name || "").normalize("NFKC").localeCompare((b.furigana || b.name || "").normalize("NFKC"), "ja") : (b.created_at || "").localeCompare(a.created_at || ""))
  return (
    <div className="fu">
      <button onClick={onBack} className="text-[12px] text-[#b0a498] mb-4 hover:text-[#8a7a6a]">← ダッシュボード</button>
      <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-[#4a3f36]" style={{ fontFamily: "'Cormorant Garamond',serif" }}>顧客記録一覧</h2><span className="text-[11px] text-[#b0a498] bg-[#f0e8e0] px-3 py-1 rounded-full">{sorted.length}件</span></div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="名前・ふりがな・電話番号で検索..." className="w-full px-4 py-3 rounded-xl border border-[#e8ddd4] bg-white/70 text-[#4a3f36] placeholder-[#ccc0b4] focus:outline-none focus:border-[#c8a087] text-sm backdrop-blur-sm mb-3" />
      <div className="flex gap-2 mb-5">{[["newest", "新しい順"], ["alpha", "五十音順"]].map(i => <button key={i[0]} onClick={() => setSort(i[0])} className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all duration-300 ${sort === i[0] ? "bg-gradient-to-r from-[#c8a087] to-[#d4a984] text-white border-transparent" : "bg-white/80 border-[#e8ddd4] text-[#8a7666] hover:border-[#c8a087]"}`}>{sort === i[0] ? "● " : ""}{i[1]}</button>)}</div>
      {sorted.length === 0 ? <div className="text-center py-16"><p className="text-[#b0a498] text-sm">該当なし</p></div> :
      <div className="space-y-2.5">{sorted.map((r, i) => <button key={r.id || i} onClick={() => onSelect(r)} className="w-full text-left bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-[#e8ddd4] hover:border-[#c8a087] hover:shadow-md transition-all group">
        <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c8a087] to-[#d4a984] flex items-center justify-center text-white text-sm font-bold shrink-0">{(r.name || "?")[0]}</div><div><div className="text-[14px] font-bold text-[#4a3f36]">{r.name || "名前未入力"}</div><div className="text-[11px] text-[#b0a498] flex items-center gap-1.5 mt-0.5 flex-wrap"><PhaseBadge phase={1} />{r.p2_data && <PhaseBadge phase={2} />}{r.p3_data && <PhaseBadge phase={3} />}{r.is_post_op && <span className="bg-[#7a9e9f]/10 text-[#5a8a7a] px-2 py-0.5 rounded-full text-[10px]">術後</span>}</div></div></div><div className="text-[11px] text-[#b0a498] shrink-0 ml-2">{formatDate(r.created_at)}</div></div>
      </button>)}</div>}
    </div>
  )
}

export function RecordDetail({ record, onBack, onPhase2, onPhase3, onDelete }) {
  const r = record; if (!r) return null
  const [confirmDel, setConfirmDel] = useState(false)
  return (
    <div className="fu">
      <button onClick={onBack} className="text-[12px] text-[#b0a498] mb-4 hover:text-[#8a7a6a]">← 一覧</button>
      <div className="bg-gradient-to-br from-[#f8f0e8] to-[#f0ece8] rounded-3xl p-6 border border-[#e0d4c8] mb-6">
        <div className="flex items-center gap-4 mb-4"><div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c8a087] to-[#d4a984] flex items-center justify-center text-white text-2xl font-bold shadow-lg" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{(r.name || "?")[0]}</div><div><h1 className="text-xl font-bold text-[#4a3f36]">{r.name || "名前未入力"}</h1>{r.furigana && <p className="text-[12px] text-[#b0a498]">{r.furigana}</p>}<p className="text-[11px] text-[#b0a498] mt-1">{formatDateLong(r.created_at)}</p></div></div>
        <div className="flex flex-wrap gap-1.5"><PhaseBadge phase={1} />{r.p2_data && <PhaseBadge phase={2} />}{r.p3_data && <PhaseBadge phase={3} />}{r.is_post_op && <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#7a9e9f]/10 text-[#7a9e9f] border border-[#7a9e9f]/20">術後ケア</span>}{r.photo_consent === "同意する" && <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#b8976a]/10 text-[#b8976a] border border-[#b8976a]/20">写真OK</span>}</div>
        {(!r.p2_data || !r.p3_data) && <div className="flex gap-2 mt-4">{!r.p2_data && <button onClick={() => onPhase2(r)} className="px-4 py-2 rounded-xl bg-[#7a9e9f] text-white text-[12px] font-bold tracking-wider shadow-sm">Phase 2を入力</button>}{!r.p3_data && <button onClick={() => onPhase3(r)} className="px-4 py-2 rounded-xl bg-[#b8976a] text-white text-[12px] font-bold tracking-wider shadow-sm">Phase 3を入力</button>}</div>}
      </div>
      <Card title="基本情報" phase={1}><DataRow label="電話" value={r.phone} /><DataRow label="メール" value={r.email} /><DataRow label="生年月日" value={r.dob} /><DataRow label="職業" value={`${r.occupation || ""}${r.occupation_other ? `（${r.occupation_other}）` : ""}`} /><DataRow label="連絡方法" value={r.contact_pref} /><DataRow label="写真" value={r.photo_consent} /><DataRow label="SNS" value={r.sns_consent} /></Card>
      <Card title="来店経緯" color="gold" phase={1}><DataRow label="きっかけ" value={`${r.source || ""}${r.referrer_name ? `（${r.referrer_name}）` : ""}`} /><DataRow label="紹介元" value={r.referral_type} /><DataRow label="検索KW" value={[...(r.search_kw || []), r.search_kw_other].filter(Boolean)} /></Card>
      <Card title="施術" phase={1}><DataRow label="目的" value={r.purposes} /><DataRow label="部位" value={r.body_parts} /><DataRow label="症状" value={r.symptoms} />{r.is_post_op && <div className="mt-2 pt-2 border-t border-[#f0e8e0]"><DataRow label="施術名" value={`${r.surgery_type || ""}${r.surgery_type_other ? `（${r.surgery_type_other}）` : ""}`} /><DataRow label="施術日" value={r.surgery_date} /><DataRow label="クリニック" value={r.surgery_clinic} /><DataRow label="状態" value={r.surgery_note} /></div>}</Card>
      <Card title="健康・体質" color="cool" phase={1}><DataRow label="健康面" value={r.health} /><DataRow label="女性特有" value={r.health_female} /><DataRow label="睡眠" value={r.sleep_quality} /><DataRow label="運動" value={r.exercise} /></Card>
      {r.therapist_memo && <div className="bg-[#f4f0fc] rounded-2xl p-5 border border-[#d8d0e8] mb-4"><h3 className="text-[12px] font-bold text-[#8a6abf] mb-2 uppercase tracking-widest">セラピストメモ</h3><p className="text-[13px] text-[#4a3f36] leading-relaxed whitespace-pre-wrap">{r.therapist_memo}</p></div>}
      {r.p2_data && <Card title="施術後" color="cool" phase={2}><DataRow label="感想" value={r.p2_data.p2Feedback} /><DataRow label="次回予約" value={r.p2_data.p2NextBooking} /><DataRow label="来店ペース" value={r.p2_data.visitFreq} /></Card>}
      {r.p3_data && <><Card title="フィードバック" color="gold" phase={3}><DataRow label="満足度" value={r.p3_data.satisfaction ? "★".repeat(r.p3_data.satisfaction) + "☆".repeat(5 - r.p3_data.satisfaction) : null} /><DataRow label="サイト評価" value={r.p3_data.siteRating ? "★".repeat(r.p3_data.siteRating) + "☆".repeat(5 - r.p3_data.siteRating) : null} /><DataRow label="選んだ理由" value={[...(r.p3_data.reasons || []), r.p3_data.reasonsOther].filter(Boolean)} /><DataRow label="決め手" value={[...(r.p3_data.bookingTrigger || []), r.p3_data.bookingTriggerOther].filter(Boolean)} /><DataRow label="迷った点" value={r.p3_data.hesitation} /><DataRow label="サイト不足" value={r.p3_data.siteMissing} /></Card><Card title="口コミ・クロスセル" phase={3}><DataRow label="口コミ" value={r.p3_data.reviewOk} /><DataRow label="ジム" value={r.p3_data.crossGym} /><DataRow label="ジム目的" value={r.p3_data.crossGymReason} /><DataRow label="相談所" value={r.p3_data.crossMarriage} /></Card></>}
      <div className="mt-6 mb-8">{!confirmDel ? <button onClick={() => setConfirmDel(true)} className="text-[12px] text-[#c87070] hover:text-[#a05050]">この記録を削除</button> : <div className="bg-red-50 rounded-xl p-4 border border-red-200"><p className="text-[12px] text-red-700 mb-3">本当に削除しますか？</p><div className="flex gap-2"><button onClick={() => onDelete(r.id)} className="px-4 py-2 rounded-lg bg-red-500 text-white text-[12px] font-bold">削除</button><button onClick={() => setConfirmDel(false)} className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 text-[12px]">キャンセル</button></div></div>}</div>
    </div>
  )
}
