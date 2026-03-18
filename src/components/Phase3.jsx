import { useState, useCallback } from 'react'
import { Section, MultiSelect, SingleSelect, Input, TextArea, Rating, StepBar, BottomNav, PhaseBadge } from './ui'
import { DATA } from '../lib/data'

export default function Phase3({ customer, onSubmit }) {
  if (!customer) return null
  const [f, setF] = useState({ siteRating: 0, siteMissing: [], siteFeedback: "", reasons: [], reasonsOther: "", bookingTrigger: [], bookingTriggerOther: "", hesitation: [], compareSalons: "", satisfaction: 0, reviewOk: "", crossGym: "", crossGymReason: [], crossMarriage: "", p3Comment: "" })
  const [step, setStep] = useState(0)
  const u = useCallback(k => v => setF(p => ({ ...p, [k]: v })), [])
  const STEPS = ["ご挨拶", "施術の感想", "サイト評価", "ご案内"]

  if (step === 0) return (
    <div className="text-center fu">
      <div className="inline-flex items-center gap-2 bg-[#b8976a]/10 px-4 py-2 rounded-full mb-6"><PhaseBadge phase={3} /><span className="text-[12px] text-[#8a7a60] font-medium">翌日フォローアップ</span></div>
      <h1 className="text-2xl font-bold text-[#4a3f36] mb-2" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{customer.name}様</h1>
      <p className="text-[#a09488] text-sm leading-relaxed mb-6">昨日はBlissをご利用いただき<br />ありがとうございました。</p>
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#e8ddd4] max-w-xs mx-auto mb-8"><p className="text-[12px] text-[#8a7a6a] leading-relaxed">サービス改善のため、簡単なフィードバックをいただけると嬉しいです。<br /><span className="text-[#b8976a] font-bold">約2〜3分で完了します。</span></p></div>
      <button onClick={() => setStep(1)} className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#b8976a] to-[#c9a877] text-white font-bold text-[15px] tracking-widest shadow-xl shadow-[#b8976a40] hover:shadow-2xl active:scale-[0.97] transition-all duration-300">回答する</button>
    </div>
  )

  return (
    <div>
      <StepBar step={step} total={3} labels={STEPS} color="#b8976a" />
      <div className="pt-4">
        {step === 1 && <>
          <Section title="施術の満足度" sub="1=不満 〜 5=大満足" delay={0}><Rating value={f.satisfaction} onChange={u("satisfaction")} lo="不満" hi="大満足" /></Section>
          <Section title="Googleマップへの口コミ" delay={1}>
            <div className="bg-[#faf6f2] rounded-2xl p-5 border border-[#e8ddd4]">
              <p className="text-[12px] text-[#8a7a6a] mb-3 leading-relaxed">Googleマップに<span className="text-[#c8a087] font-bold">写真付きの口コミ</span>をいただけると、<span className="text-[#c8a087] font-bold">次回施術を10分延長</span>いたします。</p>
              <SingleSelect options={["書いてもいい", "今回は遠慮する"]} selected={f.reviewOk} onChange={u("reviewOk")} />
              {f.reviewOk === "書いてもいい" && <div className="mt-3 fu"><p className="text-[11px] text-[#b0a498]">口コミ投稿後、次回来店時にスタッフへお伝えください。</p></div>}
            </div>
          </Section>
        </>}
        {step === 2 && <>
          <Section title="サイトのわかりやすさ" sub="1=わかりにくい 〜 5=わかりやすい" delay={0}><Rating value={f.siteRating} onChange={u("siteRating")} lo="わかりにくい" hi="わかりやすい" /></Section>
          <Section title="サイトに足りなかった情報" sub="複数選択OK" delay={1}><MultiSelect options={DATA.siteMissing} selected={f.siteMissing} onChange={u("siteMissing")} accent="cool" /></Section>
          <Section title="Blissを選んでいただいた理由" sub="複数選択OK" delay={2}><MultiSelect options={DATA.reasons} selected={f.reasons} onChange={u("reasons")} accent="cool" /><div className="mt-3"><Input placeholder="その他" value={f.reasonsOther} onChange={u("reasonsOther")} /></div></Section>
          <Section title="最終的に予約を決めたきっかけ" sub="複数選択OK" delay={3}><MultiSelect options={DATA.bookingTriggers} selected={f.bookingTrigger} onChange={u("bookingTrigger")} /><div className="mt-3"><Input placeholder="その他" value={f.bookingTriggerOther} onChange={u("bookingTriggerOther")} /></div></Section>
          <Section title="予約前に迷ったことは？" sub="複数選択OK"><MultiSelect options={DATA.hesitations} selected={f.hesitation} onChange={u("hesitation")} accent="gold" /></Section>
          <Section title="他のサロンと比較しましたか？"><SingleSelect options={["比較しなかった", "1〜2店舗", "3〜5店舗", "6店舗以上"]} selected={f.compareSalons} onChange={u("compareSalons")} accent="gold" /></Section>
          <Section title="サイトへのご意見"><TextArea value={f.siteFeedback} onChange={u("siteFeedback")} placeholder="改善点やご要望があれば（任意）" /></Section>
        </>}
        {step === 3 && <>
          <div className="bg-gradient-to-br from-[#f8f0e8] via-[#faf6f2] to-[#f0ece8] rounded-3xl p-6 border border-[#e0d4c8] mb-8 fu">
            <div className="text-center mb-5"><p className="text-[10px] uppercase tracking-[0.3em] text-[#b8976a] mb-2">Special offer</p><h2 className="text-xl font-bold text-[#4a3f36]" style={{ fontFamily: "'Cormorant Garamond',serif" }}>Bliss ご利用者様 限定ご案内</h2><p className="text-[12px] text-[#a09488] mt-2">当グループの他サービスを特別料金でご案内しております</p></div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-[#e0d8d0] mb-4">
              <div className="flex items-start gap-3 mb-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7a9e9f] to-[#8aadae] flex items-center justify-center text-white text-lg shrink-0 font-bold">D</div><div><h3 className="text-[14px] font-bold text-[#4a3f36]">Disport World</h3><p className="text-[11px] text-[#a09488]">パーソナルトレーニングジム</p></div></div>
              <p className="text-[12px] text-[#8a7a6a] mb-4 leading-relaxed">JSPO公認アスレティックトレーナーによるマンツーマン指導。ダイエット・姿勢改善・ゴルフパフォーマンス向上など。</p>
              <SingleSelect options={["興味あり", "詳しく聞きたい", "今は不要"]} selected={f.crossGym} onChange={u("crossGym")} accent="cool" />
              {(f.crossGym === "興味あり" || f.crossGym === "詳しく聞きたい") && <div className="mt-3 fu"><label className="text-[11px] text-[#a09488] mb-2 block uppercase tracking-widest">興味のある目的</label><MultiSelect options={DATA.gymReasons} selected={f.crossGymReason} onChange={u("crossGymReason")} accent="cool" /></div>}
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-[#e0d8d0]">
              <div className="flex items-start gap-3 mb-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b8976a] to-[#c9a877] flex items-center justify-center text-white text-lg shrink-0 font-bold">♡</div><div><h3 className="text-[14px] font-bold text-[#4a3f36]">結婚相談所</h3><p className="text-[11px] text-[#a09488]">IBJ加盟</p></div></div>
              <p className="text-[12px] text-[#8a7a6a] mb-4 leading-relaxed">自分磨きと出会いを同時に。理想のパートナーとの出会いをお手伝いします。</p>
              <SingleSelect options={["興味あり", "詳しく聞きたい", "今は不要"]} selected={f.crossMarriage} onChange={u("crossMarriage")} accent="gold" />
            </div>
          </div>
          <Section title="その他ご意見" delay={1}><TextArea value={f.p3Comment} onChange={u("p3Comment")} placeholder="何でもお気軽にどうぞ（任意）" height="h-24" /></Section>
          <button onClick={() => onSubmit(f)} className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#b8976a] to-[#c9a877] text-white font-bold text-[15px] tracking-widest shadow-xl shadow-[#b8976a40] hover:shadow-2xl active:scale-[0.97] transition-all duration-300 fu2">送信する</button>
        </>}
      </div>
      {step > 0 && step < 3 && <BottomNav onBack={() => setStep(step - 1)} onNext={() => setStep(step + 1)} color="#b8976a" />}
    </div>
  )
}
