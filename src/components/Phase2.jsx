import { useState, useCallback } from 'react'
import { Section, MultiSelect, SingleSelect, PhaseBadge } from './ui'
import { DATA } from '../lib/data'

export default function Phase2({ customer, onSubmit }) {
  if (!customer) return null
  const [f, setF] = useState({ p2Feedback: [], p2NextBooking: "", visitFreq: "" })
  const u = useCallback(k => v => setF(p => ({ ...p, [k]: v })), [])
  return (
    <div className="fu">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#7a9e9f]/10 px-4 py-2 rounded-full mb-4">
          <PhaseBadge phase={2} /><span className="text-[12px] text-[#6a8080] font-medium">施術後アンケート</span>
        </div>
        <h1 className="text-2xl font-bold text-[#4a3f36] mb-1" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{customer.name}様</h1>
        <p className="text-[#a09488] text-sm">お疲れさまでした。</p>
      </div>
      <Section title="本日の施術はいかがでしたか？" sub="複数選択OK" delay={0}>
        <MultiSelect options={DATA.p2Feedback} selected={f.p2Feedback} onChange={u("p2Feedback")} accent="cool" />
      </Section>
      <Section title="次回のご来店について" delay={1}>
        <div className="bg-gradient-to-br from-[#f8f0e8] to-[#faf6f2] rounded-2xl p-5 border border-[#e0d4c8]">
          <p className="text-[12px] text-[#8a7a6a] mb-4 leading-relaxed">継続的な施術で効果が高まります。<span className="text-[#c8a087] font-bold">本日ご予約いただくと、次回施術料金を5%OFF</span>でご案内いたします。</p>
          <SingleSelect options={DATA.p2NextOptions} selected={f.p2NextBooking} onChange={u("p2NextBooking")} />
          {f.p2NextBooking === "本日このまま次回を予約したい" && <div className="mt-4 bg-white/80 rounded-xl p-4 border border-[#c8a087]/30 fu"><p className="text-[13px] text-[#c8a087] font-bold text-center">スタッフにお声がけください。<br />このままご予約をお取りいたします。</p></div>}
          {f.p2NextBooking === "日程を相談してから決めたい" && <div className="mt-4 bg-white/80 rounded-xl p-4 border border-[#7a9e9f]/30 fu"><p className="text-[12px] text-[#6a8080] text-center">スタッフが空き状況をご案内いたします。<br />お気軽にご相談ください。</p></div>}
          {f.p2NextBooking === "LINEで後日予約する" && <div className="mt-4 bg-white/80 rounded-xl p-4 border border-[#b8976a]/30 fu"><p className="text-[12px] text-[#8a7a60] text-center">LINE予約は24時間受付中です。<br />5%OFF特典は1週間以内のご予約が対象です。</p></div>}
        </div>
      </Section>
      <Section title="今後の来店ペースのご希望" delay={2}>
        <SingleSelect options={DATA.visitFreqs} selected={f.visitFreq} onChange={u("visitFreq")} accent="cool" />
      </Section>
      <button onClick={() => onSubmit(f)} className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#7a9e9f] to-[#8aadae] text-white font-bold text-[15px] tracking-widest shadow-xl shadow-[#7a9e9f40] hover:shadow-2xl active:scale-[0.97] transition-all duration-300 fu3">送信する</button>
    </div>
  )
}
