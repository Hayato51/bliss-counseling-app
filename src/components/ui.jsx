const ac = (a, s) => {
  const m = {
    warm: ["bg-gradient-to-r from-[#c8a087] to-[#d4a984] text-white border-transparent shadow-md", "bg-white/80 border-[#e8ddd4] text-[#8a7666] hover:border-[#c8a087]"],
    cool: ["bg-gradient-to-r from-[#7a9e9f] to-[#8aadae] text-white border-transparent shadow-md", "bg-white/80 border-[#d4ddd8] text-[#6a8080] hover:border-[#7a9e9f]"],
    gold: ["bg-gradient-to-r from-[#b8976a] to-[#c9a877] text-white border-transparent shadow-md", "bg-white/80 border-[#e4d9c8] text-[#8a7a60] hover:border-[#b8976a]"],
  }
  return (m[a || "warm"] || m.warm)[s ? 0 : 1]
}

export function Chip({ label, selected, onClick, accent }) {
  return <button type="button" onClick={onClick} className={"px-4 py-2.5 rounded-full border text-[13px] font-medium tracking-wide transition-all duration-300 " + ac(accent, selected)}>{selected && <span className="mr-1 text-xs">{"●"}</span>}{label}</button>
}

export function MultiSelect({ options, selected, onChange, accent }) {
  const toggle = (o) => selected.includes(o) ? onChange(selected.filter(s => s !== o)) : onChange([...selected, o])
  return <div className="flex flex-wrap gap-2">{options.map(o => <Chip key={o} label={o} selected={selected.includes(o)} onClick={() => toggle(o)} accent={accent} />)}</div>
}

export function SingleSelect({ options, selected, onChange, accent }) {
  return <div className="flex flex-wrap gap-2">{options.map(o => <Chip key={o} label={o} selected={selected === o} onClick={() => onChange(selected === o ? "" : o)} accent={accent} />)}</div>
}

export function Input({ label, value, onChange, placeholder, type, half }) {
  return <div className={half ? "flex-1 min-w-[140px]" : "w-full"}>{label && <label className="block text-[11px] font-medium tracking-widest uppercase text-[#a09488] mb-2">{label}</label>}<input type={type || "text"} value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full px-4 py-3 rounded-xl border border-[#e8ddd4] bg-white/70 text-[#4a3f36] placeholder-[#ccc0b4] focus:outline-none focus:border-[#c8a087] focus:ring-2 focus:ring-[#c8a08720] text-sm" /></div>
}

export function TextArea({ value, onChange, placeholder, height }) {
  return <textarea value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={"w-full px-4 py-3 rounded-xl border border-[#e8ddd4] bg-white/70 text-[#4a3f36] placeholder-[#ccc0b4] focus:outline-none focus:border-[#c8a087] text-sm resize-none " + (height || "h-20")} />
}

export function Section({ title, sub, children }) {
  return <div className="mb-10 fu"><h3 className="text-[15px] font-bold text-[#4a3f36] mb-1 tracking-wide">{title}</h3>{sub ? <p className="text-[11px] text-[#b0a498] mb-4">{sub}</p> : <div className="mb-4" />}{children}</div>
}

export function Rating({ value, onChange, lo, hi }) {
  return <div className="flex items-center gap-2">{[1,2,3,4,5].map(n => <button key={n} onClick={() => onChange(n)} type="button" className={"w-14 h-14 rounded-2xl border-2 text-sm font-bold transition-all " + (value === n ? "bg-gradient-to-br from-[#c8a087] to-[#d4a984] border-transparent text-white scale-110 shadow-lg" : value > 0 && n <= value ? "bg-[#f5ede6] border-[#d4c4b4] text-[#b8976a]" : "bg-white/60 border-[#e8ddd4] text-[#c0b0a0]")}>{n}</button>)}<div className="ml-3 text-[11px] text-[#b0a498]"><div>1={lo}</div><div>5={hi}</div></div></div>
}

export function PhaseBadge({ phase }) {
  const cls = { 1: "bg-[#c8a087]/10 text-[#c8a087] border-[#c8a087]/20", 2: "bg-[#7a9e9f]/10 text-[#7a9e9f] border-[#7a9e9f]/20", 3: "bg-[#b8976a]/10 text-[#b8976a] border-[#b8976a]/20", t: "bg-[#8a6abf]/10 text-[#8a6abf] border-[#8a6abf]/20" }
  const labels = { 1: "施術前", 2: "施術後", 3: "翌日LINE", t: "セラピスト" }
  return <span className={"text-[10px] px-2.5 py-0.5 rounded-full border " + (cls[phase] || "")}>{labels[phase] || ""}</span>
}

export function RowDisplay({ label, value }) {
  if (!value || (Array.isArray(value) && !value.length)) return null
  const v = Array.isArray(value) ? value.join("、") : value
  return <div className="flex py-2.5 border-b border-[#f0e8e0] last:border-0"><span className="text-[11px] text-[#a09488] w-28 shrink-0 uppercase tracking-wider pt-0.5">{label}</span><span className="text-[13px] text-[#4a3f36] flex-1">{v}</span></div>
}

export function Card({ title, color, phase, children }) {
  const cc = color === "cool" ? "text-[#7a9e9f]" : color === "gold" ? "text-[#b8976a]" : "text-[#c8a087]"
  return <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-[#e8ddd4] shadow-sm mb-4"><div className="flex items-center justify-between mb-3"><h3 className={"text-[12px] font-bold uppercase tracking-widest " + cc}>{title}</h3>{phase && <PhaseBadge phase={phase} />}</div>{children}</div>
}

export function ProgressBar({ step, total, labels, color }) {
  const col = color || "#c8a087"
  return <div className="pt-5 pb-2 fu"><div className="flex items-center justify-between mb-2"><span className="text-[10px] tracking-[0.2em] text-[#b0a498]">STEP {step}/{total}</span><span className="text-[11px] font-medium" style={{ color: col }}>{labels[step]}</span></div><div className="h-[3px] bg-[#e8ddd4] rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-700" style={{ width: (step / total * 100) + "%", background: col }} /></div></div>
}

export function BottomNav({ onBack, onNext, color }) {
  const col = color || "#c8a087"
  return <div className="fixed bottom-0 left-0 right-0 border-t border-[#e8ddd4] p-4 z-20" style={{ background: "rgba(250,246,242,0.9)", backdropFilter: "blur(20px)" }}><div className="max-w-lg mx-auto flex gap-3"><button onClick={onBack} className="px-6 py-3.5 rounded-xl border border-[#e0d4c8] text-[#8a7a6a] font-medium text-sm">戻る</button>{onNext && <button onClick={onNext} className="flex-1 py-3.5 rounded-xl text-white font-bold text-sm tracking-widest shadow-lg active:scale-[0.98] transition-all" style={{ background: col }}>次へ</button>}</div></div>
}

export function formatDate(iso) {
  if (!iso) return ""
  const d = new Date(iso)
  return d.getFullYear() + "/" + String(d.getMonth() + 1).padStart(2, "0") + "/" + String(d.getDate()).padStart(2, "0") + " " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0")
}

// Aliases for backward compat
export const DataRow = RowDisplay
export const StepBar = ProgressBar
export const formatDateLong = formatDate
