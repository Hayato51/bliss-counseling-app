import { useState, useEffect } from 'react'
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from './lib/supabase'
import Phase1 from './components/Phase1'
import TherapistScreen from './components/Therapist'
import Phase2 from './components/Phase2'
import Phase3 from './components/Phase3'
import Dashboard from './components/Dashboard'
import { RecordList, RecordDetail } from './components/Records'

export default function App() {
  const [mode, setMode] = useState("form")
  const [phase, setPhase] = useState(1)
  const [adminView, setAdminView] = useState("dashboard")
  const [selRecord, setSelRecord] = useState(null)
  const [records, setRecords] = useState([])
  const [done, setDone] = useState(false)
  const [donePhase, setDonePhase] = useState(1)
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [memo, setMemo] = useState("")

  const refresh = async () => { const r = await getCustomers(); setRecords(r) }
  useEffect(() => { getCustomers().then(r => { setRecords(r); setLoading(false) }).catch(() => setLoading(false)) }, [])

  // Phase 1: camelCase form → snake_case DB
  const submitP1 = async (form) => {
    const row = await createCustomer({
      name: form.name, furigana: form.furigana, dob: form.dob || null,
      phone: form.phone, email: form.email,
      occupation: form.occupation, occupation_other: form.occupationOther,
      contact_pref: form.contactPref, source: form.source,
      referral_type: form.referralType, referrer_name: form.referrerName,
      search_kw: form.searchKw, search_kw_other: form.searchKwOther,
      purposes: form.purposes, body_parts: form.bodyParts, symptoms: form.symptoms,
      is_post_op: form.purposes.includes("術後ケア"),
      surgery_type: form.surgeryType, surgery_type_other: form.surgeryTypeOther,
      surgery_date: form.surgeryDate || null, surgery_clinic: form.surgeryClinic,
      surgery_note: form.surgeryNote,
      health: form.health, health_f: form.healthF,
      sleep_quality: form.sleepQuality, exercise: form.exercise,
      photo_consent: form.photoConsent, sns_consent: form.snsConsent,
    })
    await refresh()
    setCustomer(row)
    setMemo("")
    setPhase("therapist")
  }

  // Therapist memo
  const submitMemo = async () => {
    const row = await updateCustomer(customer.id, {
      therapist_memo: memo,
      treatment_ended_at: new Date().toISOString(),
    })
    await refresh()
    setCustomer(row)
    setPhase(2)
  }

  // Phase 2: camelCase form → snake_case DB
  const submitP2 = async (form) => {
    const row = await updateCustomer(customer.id, {
      p2_feedback: form.p2Feedback,
      p2_next_booking: form.p2NextBooking,
      p2_visit_freq: form.visitFreq,
      p2_completed_at: new Date().toISOString(),
    })
    await refresh()
    setCustomer(row)
    setDonePhase(2)
    setDone(true)
  }

  // Phase 3: camelCase form → snake_case DB
  const submitP3 = async (form) => {
    const row = await updateCustomer(customer.id, {
      p3_satisfaction: form.satisfaction,
      p3_review_ok: form.reviewOk,
      p3_site_rating: form.siteRating,
      p3_site_missing: form.siteMissing,
      p3_site_feedback: form.siteFeedback,
      p3_reasons: form.reasons,
      p3_reasons_other: form.reasonsOther,
      p3_booking_trigger: form.bookingTrigger,
      p3_booking_trigger_other: form.bookingTriggerOther,
      p3_hesitation: form.hesitation,
      p3_compare_salons: form.compareSalons,
      p3_cross_gym: form.crossGym,
      p3_cross_gym_reason: form.crossGymReason,
      p3_cross_marriage: form.crossMarriage,
      p3_comment: form.p3Comment,
      p3_completed_at: new Date().toISOString(),
    })
    await refresh()
    setCustomer(row)
    setDonePhase(3)
    setDone(true)
  }

  const reset = () => { setPhase(1); setDone(false); setCustomer(null); setMemo("") }
  const handleDelete = async (id) => {
    await deleteCustomer(id)
    await refresh()
    setAdminView("list")
    setSelRecord(null)
  }

  const sf = "'Cormorant Garamond',serif"

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-[#c8a087] text-sm tracking-widest">読み込み中...</div>
    </div>
  )

  if (done) {
    const msgs = {
      1: ["施術前アンケート完了", "セラピスト確認画面へ", "#c8a087"],
      2: ["施術後アンケート完了", "ご協力ありがとうございました", "#7a9e9f"],
      3: ["フィードバック完了", "貴重なご意見をありがとうございます", "#b8976a"],
    }
    const [title, sub, col] = msgs[donePhase]
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-sm fu">
          <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center shadow-2xl mb-6 fl"
            style={{ background: `linear-gradient(135deg,${col},${col}dd)` }}>
            <span className="text-white text-3xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-[#4a3f36] mb-2" style={{ fontFamily: sf }}>{title}</h1>
          <p className="text-[#a09488] text-sm mb-8">{sub}</p>
          <div className="space-y-3">
            <button onClick={reset} className="w-full py-3.5 rounded-xl bg-white border border-[#e8ddd4] text-[#8a7a6a] font-medium">次のお客様へ</button>
            <button onClick={() => { setMode("admin"); setAdminView("dashboard"); setDone(false) }}
              className="w-full py-3.5 rounded-xl bg-white border border-[#e8ddd4] text-[#8a7a6a] font-medium">管理画面</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-30 border-b border-[#e8ddd4]"
        style={{ background: "rgba(250,246,242,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
        <div className="max-w-lg mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c8a087] to-[#d4a984] flex items-center justify-center">
              <span className="text-white text-xs font-black" style={{ fontFamily: sf }}>B</span>
            </div>
            <div>
              <span className="text-[13px] font-bold text-[#4a3f36] tracking-wider">Bliss</span>
              <span className="text-[10px] text-[#b0a498] ml-1.5 tracking-widest">ROPPONGI</span>
            </div>
          </div>
          <div className="flex bg-[#f0e8e0] rounded-lg p-0.5">
            {[["form", "入力"], ["admin", "管理"]].map(([m, l]) => (
              <button key={m} onClick={() => {
                setMode(m)
                if (m === "admin") setAdminView("dashboard")
                if (m === "form") { setPhase(1); setCustomer(null) }
              }} className={`px-3.5 py-1.5 rounded-md text-[11px] font-medium tracking-wider transition-all ${mode === m ? "bg-white text-[#4a3f36] shadow-sm" : "text-[#a09488]"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-5 pb-32">
        {mode === "admin" ? (
          <div className="pt-6">
            {adminView === "dashboard" && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#b8976a] mb-1">Analytics</p>
                <h1 className="text-xl font-bold text-[#4a3f36] mb-6" style={{ fontFamily: sf }}>Data dashboard</h1>
                <Dashboard records={records} onViewRecords={() => setAdminView("list")} />
              </div>
            )}
            {adminView === "list" && (
              <RecordList records={records}
                onSelect={r => { setSelRecord(r); setAdminView("detail") }}
                onBack={() => setAdminView("dashboard")} />
            )}
            {adminView === "detail" && selRecord && (
              <RecordDetail record={selRecord}
                onBack={() => setAdminView("list")}
                onPhase2={r => { setCustomer(r); setPhase(2); setMode("form") }}
                onPhase3={r => { setCustomer(r); setPhase(3); setMode("form") }}
                onDelete={handleDelete} />
            )}
          </div>
        ) : (
          <div className="pt-2">
            {phase === 1 && <Phase1 onSubmit={submitP1} />}
            {phase === "therapist" && customer && (
              <TherapistScreen customer={customer} memo={memo} setMemo={setMemo} onComplete={submitMemo} />
            )}
            {phase === 2 && customer && <Phase2 customer={customer} onSubmit={submitP2} />}
            {phase === 3 && customer && <Phase3 customer={customer} onSubmit={submitP3} />}
          </div>
        )}
      </div>
    </div>
  )
}
