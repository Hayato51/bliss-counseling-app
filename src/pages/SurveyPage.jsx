import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { supabase, updateCustomer } from '../lib/supabase'
import { DATA } from '../lib/data'

const sf = "'Cormorant Garamond',serif"

function Chip({ label, active, onClick, accent }) {
    const colors = {
          warm: active ? 'bg-[#c8a087] text-white border-[#c8a087]' : 'bg-white text-[#8a7a6a] border-[#e0d8d0]',
          cool: active ? 'bg-[#7a9e9f] text-white border-[#7a9e9f]' : 'bg-white text-[#8a7a6a] border-[#e0d8d0]',
          gold: active ? 'bg-[#b8976a] text-white border-[#b8976a]' : 'bg-white text-[#8a7a6a] border-[#e0d8d0]',
    }
    return (
          <button onClick={onClick} className={`px-4 py-2.5 rounded-xl border text-[13px] font-medium transition-all duration-200 ${colors[accent || 'warm']}`}>
            {label}
          </button>button>
        )
}

      function MultiSel({ options, selected, onChange, accent }) {
          const toggle = v => onChange(selected.includes(v) ? selected.filter(x => x !== v) : [...selected, v])
          return <div className="flex flex-wrap gap-2">{options.map(o => <Chip key={o} label={o} active={selected.includes(o)} onClick={() => toggle(o)} accent={accent} />)}</div>div>
            }
            
            function SingleSel({ options, selected, onChange, accent }) {
                return <div className="flex flex-wrap gap-2">{options.map(o => <Chip key={o} label={o} active={selected === o} onClick={() => onChange(o)} accent={accent} />)}</div>div>
                  }
                  
                  function RatingStars({ value, onChange, lo, hi }) {
                      return (
                            <div>
                                  <div className="flex justify-center gap-2 mb-2">
                                    {[1,2,3,4,5].map(i => (
                                        <button key={i} onClick={() => onChange(i)} className={`w-12 h-12 rounded-xl border-2 text-lg font-bold transition-all ${i <= value ? 'bg-[#c8a087] border-[#c8a087] text-white scale-110' : 'bg-white border-[#e0d8d0] text-[#c0b8b0]'}`}>{i}</button>button>
                                      ))}
                                  </div>div>
                                  <div className="flex justify-between text-[10px] text-[#b0a498] px-1"><span>{lo}</span>span><span>{hi}</span>span></div>div>
                            </div>div>
                          )
                  }

function Section({ title, sub, children }) {
    return (
          <div className="mb-6">
                <h3 className="text-[15px] font-bold text-[#4a3f36] mb-1">{title}</h3>h3>
            {sub && <p className="text-[11px] text-[#b0a498] mb-3">{sub}</p>p>}
            {children}
          </div>div>
        )
}

export default function SurveyPage() {
    const { id } = useParams()
        const [customer, setCustomer] = useState(null)
            const [loading, setLoading] = useState(true)
                const [error, setError] = useState(null)
                    const [done, setDone] = useState(false)
                        const [step, setStep] = useState(0)
                            const [f, setF] = useState({
                                  satisfaction: 0, reviewOk: '', siteRating: 0, siteMissing: [], siteFeedback: '',
                                  reasons: [], reasonsOther: '', bookingTrigger: [], bookingTriggerOther: '',
                                  hesitation: [], compareSalons: '', crossGym: '', crossGymReason: [],
                                  crossMarriage: '', p3Comment: ''
                            })
                              
                                const u = useCallback(k => v => setF(p => ({ ...p, [k]: v })), [])
                                  
                                    useEffect(() => {
                                          async function load() {
                                                  try {
                                                            const { data, error: err } = await supabase.from('customers').select('*').eq('id', id).single()
                                                                      if (err) throw err
                                                                                if (data.p3_completed_at) { setDone(true) }
                                                            setCustomer(data)
                                                  } catch (e) {
                                                            setError('アンケートが見つかりません')
                                                  } finally {
                                                            setLoading(false)
                                                  }
                                          }
                                          if (id) load()
                                    }, [id])
                                      
                                        const submit = async () => {
                                              try {
                                                      await updateCustomer(id, {
                                                                p3_satisfaction: f.satisfaction,
                                                                p3_review_ok: f.reviewOk,
                                                                p3_site_rating: f.siteRating,
                                                                p3_site_missing: f.siteMissing,
                                                                p3_site_feedback: f.siteFeedback,
                                                                p3_reasons: f.reasons,
                                                                p3_reasons_other: f.reasonsOther,
                                                                p3_booking_trigger: f.bookingTrigger,
                                                                p3_booking_trigger_other: f.bookingTriggerOther,
                                                                p3_hesitation: f.hesitation,
                                                                p3_compare_salons: f.compareSalons,
                                                                p3_cross_gym: f.crossGym,
                                                                p3_cross_gym_reason: f.crossGymReason,
                                                                p3_cross_marriage: f.crossMarriage,
                                                                p3_comment: f.p3Comment,
                                                                p3_completed_at: new Date().toISOString(),
                                                      })
                                                              setDone(true)
                                              } catch (e) {
                                                      alert('送信に失敗しました。もう一度お試しください。')
                                              }
                                        }
                                          
                                            if (loading) return (
                                                  <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#faf6f2,#f5ede5)' }}>
                                                        <div className="text-[#c8a087] text-sm tracking-widest animate-pulse">読み込み中...</div>div>
                                                  </div>div>
                                                )
                                              
                                                if (error) return (
                                                      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg,#faf6f2,#f5ede5)' }}>
                                                            <div className="text-center"><p className="text-[#a09488] text-sm">{error}</p>p></div>div>
                                                      </div>div>
                                                    )
                                                  
                                                    if (done) return (
                                                          <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg,#faf6f2,#f5ede5)' }}>
                                                                <div className="text-center max-w-sm">
                                                                        <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center shadow-2xl mb-6" style={{ background: 'linear-gradient(135deg,#b8976a,#c9a877)' }}>
                                                                                  <span className="text-white text-3xl">✓</span>span>
                                                                        </div>div>
                                                                        <h1 className="text-2xl font-bold text-[#4a3f36] mb-2" style={{ fontFamily: sf }}>ありがとうございます</h1>h1>
                                                                        <p className="text-[#a09488] text-sm leading-relaxed">貴重なご意見をいただきありがとうございました。<br/>今後のサービス向上に役立ててまいります。</p>p>
                                                                        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#e8ddd4]">
                                                                                  <p className="text-[12px] text-[#8a7a6a]">またのご来店を心よりお待ちしております。</p>p>
                                                                                  <p className="text-[14px] font-bold text-[#4a3f36] mt-2" style={{ fontFamily: sf }}>Bliss Roppongi</p>p>
                                                                        </div>div>
                                                                </div>div>
                                                          </div>div>
                                                        )
                                                      
                                                        return (
                                                          <div className="min-h-screen" style={{ background: 'linear-gradient(135deg,#faf6f2,#f5ede5)' }}>
                                                                <div className="sticky top-0 z-30 border-b border-[#e8ddd4]" style={{ background: 'rgba(250,246,242,0.85)', backdropFilter: 'blur(20px)' }}>
                                                                        <div className="max-w-lg mx-auto px-5 py-3 flex items-center gap-2.5">
                                                                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c8a087] to-[#d4a984] flex items-center justify-center">
                                                                                              <span className="text-white text-xs font-black" style={{ fontFamily: sf }}>B</span>span>
                                                                                  </div>div>
                                                                                  <div>
                                                                                              <span className="text-[13px] font-bold text-[#4a3f36] tracking-wider">Bliss</span>span>
                                                                                              <span className="text-[10px] text-[#b0a498] ml-1.5 tracking-widest">ROPPONGI</span>span>
                                                                                  </div>div>
                                                                        </div>div>
                                                                </div>div>
                                                          
                                                                <div className="max-w-lg mx-auto px-5 pb-32 pt-6">
                                                                  {step === 0 && (
                                                                      <div className="text-center pt-8">
                                                                                  <div className="inline-flex items-center gap-2 bg-[#b8976a]/10 px-4 py-2 rounded-full mb-6">
                                                                                                <span className="w-5 h-5 rounded-full bg-[#b8976a] text-white text-[10px] font-bold flex items-center justify-center">3</span>span>
                                                                                                <span className="text-[12px] text-[#8a7a60] font-medium">翌日フォローアップ</span>span>
                                                                                  </div>div>
                                                                                  <h1 className="text-2xl font-bold text-[#4a3f36] mb-2" style={{ fontFamily: sf }}>{customer.name}様</h1>h1>
                                                                                  <p className="text-[#a09488] text-sm leading-relaxed mb-6">昨日はBlissをご利用いただき<br/>ありがとうございました。</p>p>
                                                                                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#e8ddd4] max-w-xs mx-auto mb-8">
                                                                                                <p className="text-[12px] text-[#8a7a6a] leading-relaxed">サービス改善のため、簡単なフィードバックをいただけると嬉しいです。<br/><span className="text-[#b8976a] font-bold">約2〜3分で完了します。</span>span></p>p>
                                                                                  </div>div>
                                                                                  <button onClick={() => setStep(1)} className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#b8976a] to-[#c9a877] text-white font-bold text-[15px] tracking-widest shadow-xl hover:shadow-2xl active:scale-[0.97] transition-all duration-300">回答する</button>button>
                                                                      </div>div>
                                                                        )}
                                                                
                                                                  {step === 1 && (
                                                                      <div>
                                                                                  <div className="flex gap-1 mb-6">{[1,2,3].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${i <= 1 ? 'bg-[#b8976a]' : 'bg-[#e8ddd4]'}`}/>)}</div>div>
                                                                                  <h2 className="text-lg font-bold text-[#4a3f36] mb-6" style={{ fontFamily: sf }}>施術のご感想</h2>h2>
                                                                                  <Section title="施術の満足度" sub="1=不満 〜 5=大満足"><RatingStars value={f.satisfaction} onChange={u('satisfaction')} lo="不満" hi="大満足" /></Section>Section>
                                                                                  <Section title="Googleマップへの口コミ">
                                                                                                <div className="bg-[#faf6f2] rounded-2xl p-5 border border-[#e8ddd4]">
                                                                                                                <p className="text-[12px] text-[#8a7a6a] mb-3 leading-relaxed">Googleマップに<span className="text-[#c8a087] font-bold">写真付きの口コミ</span>span>をいただけると、<span className="text-[#c8a087] font-bold">次回施術を10分延長</span>span>いたします。</p>p>
                                                                                                                <SingleSel options={['書いてもいい', '今回は遠慮する']} selected={f.reviewOk} onChange={u('reviewOk')} />
                                                                                                  {f.reviewOk === '書いてもいい' && <p className="text-[11px] text-[#b0a498] mt-3">口コミ投稿後、次回来店時にスタッフへお伝えください。</p>p>}
                                                                                                  </div>div>
                                                                                  </Section>Section>
                                                                                  <div className="flex gap-3 mt-8">
                                                                                                <button onClick={() => setStep(0)} className="flex-1 py-3.5 rounded-xl bg-white border border-[#e8ddd4] text-[#8a7a6a] font-medium text-sm">戻る</button>button>
                                                                                                <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#b8976a] to-[#c9a877] text-white font-bold text-sm shadow-lg">次へ</button>button>
                                                                                  </div>div>
                                                                      </div>div>
                                                                        )}
                                                                
                                                                  {step === 2 && (
                                                                      <div>
                                                                                  <div className="flex gap-1 mb-6">{[1,2,3].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${i <= 2 ? 'bg-[#b8976a]' : 'bg-[#e8ddd4]'}`}/>)}</div>div>
                                                                                  <h2 className="text-lg font-bold text-[#4a3f36] mb-6" style={{ fontFamily: sf }}>サイト・ご来店について</h2>h2>
                                                                                  <Section title="サイトのわかりやすさ" sub="1=わかりにくい 〜 5=わかりやすい"><RatingStars value={f.siteRating} onChange={u('siteRating')} lo="わかりにくい" hi="わかりやすい" /></Section>Section>
                                                                                  <Section title="サイトに足りなかった情報" sub="複数選択OK"><MultiSel options={DATA.siteMissing} selected={f.siteMissing} onChange={u('siteMissing')} accent="cool" /></Section>Section>
                                                                                  <Section title="Blissを選んでいただいた理由" sub="複数選択OK"><MultiSel options={DATA.reasons} selected={f.reasons} onChange={u('reasons')} accent="cool" /><input className="mt-3 w-full px-4 py-3 rounded-xl border border-[#e0d8d0] bg-white text-sm text-[#4a3f36] placeholder-[#c8beb4]" placeholder="その他" value={f.reasonsOther} onChange={e => u('reasonsOther')(e.target.value)} /></Section>Section>
                                                                                  <Section title="最終的に予約を決めたきっかけ" sub="複数選択OK"><MultiSel options={DATA.bookingTriggers} selected={f.bookingTrigger} onChange={u('bookingTrigger')} /><input className="mt-3 w-full px-4 py-3 rounded-xl border border-[#e0d8d0] bg-white text-sm text-[#4a3f36] placeholder-[#c8beb4]" placeholder="その他" value={f.bookingTriggerOther} onChange={e => u('bookingTriggerOther')(e.target.value)} /></Section>Section>
                                                                                  <Section title="予約前に迷ったことは？" sub="複数選択OK"><MultiSel options={DATA.hesitations} selected={f.hesitation} onChange={u('hesitation')} accent="gold" /></Section>Section>
                                                                                  <Section title="他のサロンと比較しましたか？"><SingleSel options={['比較しなかった', '1〜2店舗', '3〜5店舗', '6店舗以上']} selected={f.compareSalons} onChange={u('compareSalons')} accent="gold" /></Section>Section>
                                                                                  <Section title="サイトへのご意見"><textarea className="w-full px-4 py-3 rounded-xl border border-[#e0d8d0] bg-white text-sm text-[#4a3f36] placeholder-[#c8beb4] h-20 resize-none" placeholder="改善点やご要望があれば（任意）" value={f.siteFeedback} onChange={e => u('siteFeedback')(e.target.value)} /></Section>Section>
                                                                                  <div className="flex gap-3 mt-8">
                                                                                                <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl bg-white border border-[#e8ddd4] text-[#8a7a6a] font-medium text-sm">戻る</button>button>
                                                                                                <button onClick={() => setStep(3)} className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#b8976a] to-[#c9a877] text-white font-bold text-sm shadow-lg">次へ</button>button>
                                                                                  </div>div>
                                                                      </div>div>
                                                                        )}
                                                                
                                                                  {step === 3 && (
                                                                      <div>
                                                                                  <div className="flex gap-1 mb-6">{[1,2,3].map(i => <div key={i} className={`h-1 flex-1 rounded-full bg-[#b8976a]`}/>)}</div>div>
                                                                                  <h2 className="text-lg font-bold text-[#4a3f36] mb-6" style={{ fontFamily: sf }}>ご案内</h2>h2>
                                                                                  <div className="bg-gradient-to-br from-[#f8f0e8] via-[#faf6f2] to-[#f0ece8] rounded-3xl p-6 border border-[#e0d4c8] mb-6">
                                                                                                <div className="text-center mb-5">
                                                                                                                <p className="text-[10px] uppercase tracking-[0.3em] text-[#b8976a] mb-2">Special offer</p>p>
                                                                                                                <h2 className="text-xl font-bold text-[#4a3f36]" style={{ fontFamily: sf }}>Bliss ご利用者様 限定ご案内</h2>h2>
                                                                                                                <p className="text-[12px] text-[#a09488] mt-2">当グループの他サービスを特別料金でご案内しております</p>p>
                                                                                                  </div>div>
                                                                                                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-[#e0d8d0] mb-4">
                                                                                                                <div className="flex items-start gap-3 mb-3">
                                                                                                                                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7a9e9f] to-[#8aadae] flex items-center justify-center text-white text-lg shrink-0 font-bold">D</div>div>
                                                                                                                                  <div><h3 className="text-[14px] font-bold text-[#4a3f36]">Disport World</h3>h3><p className="text-[11px] text-[#a09488]">パーソナルトレーニングジム</p>p></div>div>
                                                                                                                  </div>div>
                                                                                                                <p className="text-[12px] text-[#8a7a6a] mb-4 leading-relaxed">JSPO公認アスレティックトレーナーによるマンツーマン指導。</p>p>
                                                                                                                <SingleSel options={['興味あり', '詳しく聞きたい', '今は不要']} selected={f.crossGym} onChange={u('crossGym')} accent="cool" />
                                                                                                  {(f.crossGym === '興味あり' || f.crossGym === '詳しく聞きたい') && (
                                                                                          <div className="mt-3"><label className="text-[11px] text-[#a09488] mb-2 block">興味のある目的</label>label><MultiSel options={DATA.gymReasons} selected={f.crossGymReason} onChange={u('crossGymReason')} accent="cool" /></div>div>
                                                                                                                )}
                                                                                                  </div>div>
                                                                                                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-[#e0d8d0]">
                                                                                                                <div className="flex items-start gap-3 mb-3">
                                                                                                                                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b8976a] to-[#c9a877] flex items-center justify-center text-white text-lg shrink-0 font-bold">&#9825;</div>div>
                                                                                                                                  <div><h3 className="text-[14px] font-bold text-[#4a3f36]">結婚相談所</h3>h3><p className="text-[11px] text-[#a09488]">IBJ加盟</p>p></div>div>
                                                                                                                  </div>div>
                                                                                                                <p className="text-[12px] text-[#8a7a6a] mb-4 leading-relaxed">自分磨きと出会いを同時に。理想のパートナーとの出会いをお手伝いします。</p>p>
                                                                                                                <SingleSel options={['興味あり', '詳しく聞きたい', '今は不要']} selected={f.crossMarriage} onChange={u('crossMarriage')} accent="gold" />
                                                                                                  </div>div>
                                                                                  </div>div>
                                                                                  <Section title="その他ご意見"><textarea className="w-full px-4 py-3 rounded-xl border border-[#e0d8d0] bg-white text-sm text-[#4a3f36] placeholder-[#c8beb4] h-24 resize-none" placeholder="何でもお気軽にどうぞ（任意）" value={f.p3Comment} onChange={e => u('p3Comment')(e.target.value)} /></Section>Section>
                                                                                  <div className="flex gap-3 mt-8">
                                                                                                <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-xl bg-white border border-[#e8ddd4] text-[#8a7a6a] font-medium text-sm">戻る</button>button>
                                                                                                <button onClick={submit} className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-[#b8976a] to-[#c9a877] text-white font-bold text-[15px] tracking-widest shadow-xl hover:shadow-2xl active:scale-[0.97] transition-all duration-300">送信する</button>button>
                                                                                  </div>div>
                                                                      </div>div>
                                                                        )}
                                                                </div>div>
                                                          </div>div>
                                                        )
                                                      }</div>
