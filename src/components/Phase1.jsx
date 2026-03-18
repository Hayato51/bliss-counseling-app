import { useState, useCallback } from 'react'
import { Section, MultiSelect, SingleSelect, Input, StepBar, BottomNav } from './ui'
import { DATA } from '../lib/data'

const INIT = { name: "", furigana: "", dob: "", phone: "", email: "", occupation: "", occupationOther: "", contactPref: [], source: "", referralType: "", referrerName: "", searchKw: [], searchKwOther: "", purposes: [], bodyParts: [], symptoms: [], surgeryType: "", surgeryTypeOther: "", surgeryDate: "", surgeryClinic: "", surgeryNote: "", health: [], healthF: [], sleepQuality: "", exercise: "", photoConsent: "", snsConsent: "" }

export default function Phase1({ onSubmit }) {
  const [step, setStep] = useState(0)
  const [f, setF] = useState({ ...INIT })
  const u = useCallback(k => v => setF(p => ({ ...p, [k]: v })), [])
  const isWeb = ["ホットペッパー", "Google検索", "ホームページ", "Instagram", "TikTok", "YouTube"].includes(f.source)
  const isPostOp = f.purposes.includes("術後ケア")
  const STEPS = ["ようこそ", "基本情報", "施術について", "健康・同意"]

  if (step === 0) return (
    <div className="flex flex-col items-center justify-center min-h-[55vh] text-center fu">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#c8a087] to-[#d4a984] flex items-center justify-center shadow-2xl shadow-[#c8a08740] mb-6 fl">
        <span className="text-white text-3xl font-bold" style={{ fontFamily: "'Cormorant Garamond',serif" }}>B</span>
      </div>
      <h1 className="text-3xl font-bold text-[#4a3f36] mb-2" style={{ fontFamily: "'Cormorant Garamond',serif" }}>Welcome to Bliss</h1>
      <p className="text-[#a09488] text-sm leading-relaxed mb-6">本日はご来店いただき<br />誠にありがとうございます</p>
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#e8ddd4] max-w-xs mx-auto mb-8">
        <p className="text-[12px] text-[#8a7a6a] leading-relaxed">最適な施術のため、簡単なアンケートにご協力ください。<br /><span className="text-[#c8a087] font-bold">約2分で完了します。</span></p>
      </div>
      <button onClick={() => setStep(1)} className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#c8a087] to-[#d4a984] text-white font-bold text-[15px] tracking-widest shadow-xl shadow-[#c8a08740] hover:shadow-2xl active:scale-[0.97] transition-all duration-300">START</button>
    </div>
  )

  return (
    <div>
      <StepBar step={step} total={3} labels={STEPS} />
      <div className="pt-4">
        {step === 1 && <>
          <Section title="お客様情報" delay={0}>
            <div className="space-y-4">
              <div className="flex gap-3 flex-wrap"><Input label="お名前 *" value={f.name} onChange={u("name")} placeholder="山田 花子" half /><Input label="ふりがな" value={f.furigana} onChange={u("furigana")} placeholder="やまだ はなこ" half /></div>
              <div className="flex gap-3 flex-wrap"><Input label="生年月日" value={f.dob} onChange={u("dob")} type="date" half /><Input label="お電話番号 *" value={f.phone} onChange={u("phone")} placeholder="090-1234-5678" type="tel" half /></div>
              <Input label="メールアドレス" value={f.email} onChange={u("email")} placeholder="example@email.com" type="email" />
            </div>
          </Section>
          <Section title="ご職業" delay={1}>
            <SingleSelect options={DATA.occupations} selected={f.occupation} onChange={u("occupation")} />
            {(f.occupation === "自営業・経営者" || f.occupation === "その他") && <div className="mt-3"><Input placeholder="具体的に" value={f.occupationOther} onChange={u("occupationOther")} /></div>}
          </Section>
          <Section title="ご連絡方法の希望" sub="複数選択OK" delay={2}>
            <MultiSelect options={DATA.contactPrefs} selected={f.contactPref} onChange={u("contactPref")} accent="cool" />
          </Section>
          <Section title="当サロンを知ったきっかけ" delay={3}>
            <SingleSelect options={DATA.sources} selected={f.source} onChange={u("source")} />
            {f.source === "ご紹介" && <div className="mt-4 space-y-3 fu">
              <label className="text-[11px] text-[#a09488] uppercase tracking-widest">紹介元</label>
              <SingleSelect options={DATA.referralTypes} selected={f.referralType} onChange={u("referralType")} accent="gold" />
              <Input label="ご紹介者名" value={f.referrerName} onChange={u("referrerName")} placeholder="紹介者のお名前" />
            </div>}
            {isWeb && <div className="mt-4">
              <Section title="検索キーワード" sub="複数選択OK">
                <MultiSelect options={DATA.searchKeywords} selected={f.searchKw} onChange={u("searchKw")} accent="gold" />
                <div className="mt-3"><Input placeholder="その他" value={f.searchKwOther} onChange={u("searchKwOther")} /></div>
              </Section>
            </div>}
          </Section>
        </>}

        {step === 2 && <>
          <Section title="本日の施術の目的" sub="複数選択OK" delay={0}>
            <MultiSelect options={DATA.purposes} selected={f.purposes} onChange={u("purposes")} />
          </Section>
          {isPostOp && <Section title="美容施術の詳細" sub="施術方針に必要な情報です" delay={1}>
            <div className="bg-[#faf6f2] rounded-2xl p-4 border border-[#e8ddd4] space-y-4">
              <div><label className="text-[11px] text-[#a09488] mb-2 block uppercase tracking-widest">施術の種類</label>
                <SingleSelect options={DATA.surgeryTypes} selected={f.surgeryType} onChange={u("surgeryType")} accent="gold" />
                {f.surgeryType === "その他" && <div className="mt-2"><Input placeholder="施術名" value={f.surgeryTypeOther} onChange={u("surgeryTypeOther")} /></div>}
              </div>
              <div className="flex gap-3 flex-wrap"><Input label="施術日" value={f.surgeryDate} onChange={u("surgeryDate")} type="date" half /><Input label="クリニック名（任意）" value={f.surgeryClinic} onChange={u("surgeryClinic")} half /></div>
              <Input label="現在の状態" value={f.surgeryNote} onChange={u("surgeryNote")} placeholder="硬さ、内出血、腫れなど" />
            </div>
          </Section>}
          <Section title="気になる部位" sub="複数選択OK" delay={2}>
            <MultiSelect options={DATA.bodyParts} selected={f.bodyParts} onChange={u("bodyParts")} accent="gold" />
          </Section>
          <Section title="症状" sub="複数選択OK" delay={3}>
            <MultiSelect options={DATA.symptoms} selected={f.symptoms} onChange={u("symptoms")} accent="cool" />
          </Section>
        </>}

        {step === 3 && <>
          <Section title="健康面で気になること" sub="複数選択OK" delay={0}>
            <MultiSelect options={DATA.healthItems} selected={f.health} onChange={u("health")} />
          </Section>
          <Section title="女性特有の項目" sub="該当するものを選択" delay={1}>
            <MultiSelect options={DATA.healthFemale} selected={f.healthF} onChange={u("healthF")} accent="gold" />
          </Section>
          <Section title="生活習慣" delay={2}>
            <div className="space-y-5">
              <div><label className="text-[11px] text-[#a09488] mb-2 block uppercase tracking-widest">睡眠の質</label>
                <SingleSelect options={["良好", "普通", "やや悪い", "悪い"]} selected={f.sleepQuality} onChange={u("sleepQuality")} /></div>
              <div><label className="text-[11px] text-[#a09488] mb-2 block uppercase tracking-widest">運動習慣</label>
                <SingleSelect options={["週3回以上", "週1〜2回", "月数回", "ほとんどしない"]} selected={f.exercise} onChange={u("exercise")} accent="cool" /></div>
            </div>
          </Section>
          <Section title="写真撮影のご同意" delay={3}>
            <div className="bg-[#faf6f2] rounded-2xl p-4 border border-[#e8ddd4] space-y-4">
              <div><p className="text-[12px] text-[#8a7a6a] mb-3 leading-relaxed">施術前後の記録として、お写真を撮影させていただいてもよろしいですか？</p>
                <SingleSelect options={["同意する", "同意しない"]} selected={f.photoConsent} onChange={u("photoConsent")} /></div>
              {f.photoConsent === "同意する" && <div className="fu">
                <p className="text-[12px] text-[#8a7a6a] mb-3 leading-relaxed">お写真をSNS・HP等で（個人が特定されない形で）ご紹介してもよろしいですか？</p>
                <SingleSelect options={["OK", "NGにしたい"]} selected={f.snsConsent} onChange={u("snsConsent")} accent="gold" />
              </div>}
            </div>
          </Section>
          <div className="fu3">
            <div className="bg-[#faf6f2] rounded-2xl p-5 border border-[#e8ddd4] mb-4">
              <p className="text-[11px] text-[#b0a498] leading-relaxed">ご記入いただいた情報は施術提供およびサービス向上のためにのみ使用し、同意なく第三者に提供することはございません。</p>
            </div>
            <button onClick={() => onSubmit(f)} className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#c8a087] to-[#d4a984] text-white font-bold text-[15px] tracking-widest shadow-xl shadow-[#c8a08740] hover:shadow-2xl active:scale-[0.97] transition-all duration-300">送信する</button>
          </div>
        </>}
      </div>
      <BottomNav onBack={() => setStep(step - 1)} onNext={step < 3 ? () => setStep(step + 1) : null} />
    </div>
  )
}
