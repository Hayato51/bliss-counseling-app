export default function Dashboard({ records, onViewRecords }) {
  if (!records.length) return <div className="text-center py-24 fu"><div className="text-6xl mb-6 fl">✦</div><h2 className="text-xl font-bold text-[#4a3f36] mb-2" style={{ fontFamily: "'Cormorant Garamond',serif" }}>No data yet</h2><p className="text-[#b0a498] text-sm">カウンセリングデータが蓄積されると表示されます</p></div>

  const cnt = (key) => { const c = {}; records.forEach(s => { const v = s[key]; if (Array.isArray(v)) v.forEach(x => { c[x] = (c[x] || 0) + 1 }); else if (v) c[v] = (c[v] || 0) + 1 }); return Object.entries(c).sort((a, b) => b[1] - a[1]) }
  const avg = (key) => { const v = records.map(s => s[key]).filter(Boolean); return v.length ? (v.reduce((a, b) => a + b, 0) / v.length).toFixed(1) : "—" }
  const p2D = records.filter(r => r.p2_data).length, p3D = records.filter(r => r.p3_data).length
  const postOpPct = Math.round(records.filter(r => r.is_post_op).length / records.length * 100)
  const photoPct = Math.round(records.filter(r => r.photo_consent === "同意する").length / records.length * 100)
  const nbk = p2D ? Math.round(records.filter(r => r.p2_data?.p2NextBooking === "本日このまま次回を予約したい").length / p2D * 100) : 0

  const Bar = ({ data, color }) => { const mx = Math.max(...data.map(d => d[1]), 1); return <div className="space-y-2.5">{data.slice(0, 8).map(i => <div key={i[0]} className="flex items-center gap-3"><span className="text-[11px] text-[#8a7a6a] w-28 text-right shrink-0 truncate">{i[0]}</span><div className="flex-1 bg-[#f0e8e0] rounded-full h-5 overflow-hidden"><div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${i[1] / mx * 100}%`, backgroundColor: color || "#c8a087" }} /></div><span className="text-xs font-bold text-[#6a5e54] w-7 text-right">{i[1]}</span></div>)}</div> }
  const Stat = ({ icon, label, value, sub }) => <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-[#e8ddd4] shadow-sm"><div className="text-xl mb-2">{icon}</div><div className="text-3xl font-black text-[#4a3f36]" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{value}</div><div className="text-[11px] font-medium text-[#a09488] mt-1 tracking-wide uppercase">{label}</div>{sub && <div className="text-[10px] text-[#c0b4a8] mt-0.5">{sub}</div>}</div>

  return (
    <div className="space-y-8 fu">
      <div className="grid grid-cols-2 gap-3">
        <Stat icon="✦" label="総来店数" value={records.length} />
        <Stat icon="◈" label="術後ケア率" value={postOpPct + "%"} />
        <Stat icon="◆" label="写真同意率" value={photoPct + "%"} />
        <Stat icon="▲" label="即日予約率" value={nbk + "%"} sub={`P2 ${p2D}件中`} />
      </div>
      <div className="grid grid-cols-3 gap-2">{[["P1", records.length, "#c8a087"], ["P2", p2D, "#7a9e9f"], ["P3", p3D, "#b8976a"]].map(i => <div key={i[0]} className="bg-white/70 rounded-xl p-3 border border-[#e8ddd4] text-center"><div className="text-xl font-black text-[#4a3f36]" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{i[1]}</div><div className="text-[10px] text-[#a09488] uppercase tracking-wider mt-1">{i[0]}</div></div>)}</div>
      <button onClick={onViewRecords} className="w-full py-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#e8ddd4] text-[#4a3f36] font-bold text-[14px] tracking-wider hover:border-[#c8a087] hover:shadow-md transition-all flex items-center justify-center gap-2">📋 全顧客記録 <span className="text-[11px] text-[#b0a498] bg-[#f0e8e0] px-2.5 py-0.5 rounded-full ml-1">{records.length}件</span></button>
      <div className="space-y-5">
        {[["流入経路", "source", "#c8a087"], ["紹介元", "referral_type", "#b8976a"], ["検索KW", "search_kw", "#8a7a6a"], ["施術目的", "purposes", "#7a9e9f"], ["部位", "body_parts", "#b8976a"], ["症状", "symptoms", "#8aadae"]].map(i => { const d = cnt(i[1]); if (!d.length) return null; return <div key={i[1]} className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-[#e8ddd4] shadow-sm"><h3 className="text-sm font-bold text-[#4a3f36] mb-4 tracking-wide">{i[0]}</h3><Bar data={d} color={i[2]} /></div> })}
        <div className="bg-gradient-to-br from-[#f8f0e8] to-[#f0ece8] rounded-2xl p-5 border border-[#e0d4c8]"><h3 className="text-sm font-bold text-[#4a3f36] mb-4 tracking-wide">クロスセル</h3><div className="grid grid-cols-2 gap-4"><div><div className="text-[11px] text-[#a09488] mb-2 uppercase tracking-widest">ジム</div><Bar data={cnt("cross_gym")} color="#7a9e9f" /></div><div><div className="text-[11px] text-[#a09488] mb-2 uppercase tracking-widest">相談所</div><Bar data={cnt("cross_marriage")} color="#b8976a" /></div></div></div>
      </div>
    </div>
  )
}
