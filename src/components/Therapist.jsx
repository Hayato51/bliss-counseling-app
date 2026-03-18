import { Card, DataRow, TextArea, PhaseBadge, formatDateLong } from './ui'

export default function TherapistScreen({ customer, memo, setMemo, onComplete }) {
  if (!customer) return null
  const r = customer
  return (
    <div className="fu">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-[#8a6abf]/10 px-4 py-2 rounded-full mb-4">
          <PhaseBadge phase="t" />
          <span className="text-[12px] text-[#8a6abf] font-medium">セラピスト確認画面</span>
        </div>
        <h1 className="text-2xl font-bold text-[#4a3f36] mb-1" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{r.name}様</h1>
        <p className="text-[11px] text-[#b0a498]">{formatDateLong(r.created_at)}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6 justify-center">
        {r.is_post_op && <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#7a9e9f]/10 text-[#7a9e9f] border border-[#7a9e9f]/20">術後ケア</span>}
        {r.photo_consent === "同意する" && <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#b8976a]/10 text-[#b8976a] border border-[#b8976a]/20">写真OK</span>}
        {(r.purposes || []).map(p => (
          <span key={p} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#c8a087]/10 text-[#c8a087] border border-[#c8a087]/20">{p}</span>
        ))}
      </div>

      <Card title="基本情報">
        <DataRow label="電話" value={r.phone} />
        <DataRow label="メール" value={r.email} />
        <DataRow label="生年月日" value={r.dob} />
        <DataRow label="職業" value={`${r.occupation || ""}${r.occupation_other ? `（${r.occupation_other}）` : ""}`} />
        <DataRow label="連絡方法" value={r.contact_pref} />
      </Card>

      <Card title="来店経緯" color="gold">
        <DataRow label="きっかけ" value={`${r.source || ""}${r.referrer_name ? `（${r.referrer_name}）` : ""}`} />
        <DataRow label="紹介元" value={r.referral_type} />
        <DataRow label="検索KW" value={[...(r.search_kw || []), r.search_kw_other].filter(Boolean)} />
      </Card>

      <Card title="施術">
        <DataRow label="目的" value={r.purposes} />
        <DataRow label="部位" value={r.body_parts} />
        <DataRow label="症状" value={r.symptoms} />
        {r.is_post_op && (
          <div className="mt-2 pt-2 border-t border-[#f0e8e0]">
            <DataRow label="施術名" value={`${r.surgery_type || ""}${r.surgery_type_other ? `（${r.surgery_type_other}）` : ""}`} />
            <DataRow label="施術日" value={r.surgery_date} />
            <DataRow label="クリニック" value={r.surgery_clinic} />
            <DataRow label="状態" value={r.surgery_note} />
          </div>
        )}
      </Card>

      <Card title="健康・体質" color="cool">
        <DataRow label="健康面" value={r.health} />
        <DataRow label="女性特有" value={r.health_f} />
        <DataRow label="睡眠" value={r.sleep_quality} />
        <DataRow label="運動" value={r.exercise} />
      </Card>

      <div className="bg-[#f4f0fc] rounded-2xl p-5 border border-[#d8d0e8] mb-6">
        <h3 className="text-[12px] font-bold text-[#8a6abf] mb-3 uppercase tracking-widest">セラピストメモ</h3>
        <p className="text-[11px] text-[#a098b0] mb-3">カウンセリング内容や施術方針をメモしてください。</p>
        <TextArea value={memo} onChange={setMemo} placeholder="例：腹部の硬結が強い、INDIBAは温度控えめから開始、次回は2週間後を推奨" height="h-32" />
      </div>

      <button onClick={onComplete}
        className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#8a6abf] to-[#a080d0] text-white font-bold text-[16px] tracking-widest shadow-xl shadow-[#8a6abf30] active:scale-[0.97] transition-all">
        ⚡ 施術終了 → お客様アンケートへ
      </button>
      <p className="text-center text-[11px] text-[#b0a498] mt-3">このボタンを押すと施術後アンケートに切り替わります</p>
    </div>
  )
}
