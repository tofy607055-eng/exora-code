'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, X, Check, Package, Tag, Gift, Zap } from 'lucide-react'

type Plan = { id: string; name: string; price: string; period: string; features: string; featured: boolean; cta: string }
type Software = { id: string; name: string; description: string; icon: string; color: string; category: string; visible: boolean; plans: Plan[] }

const COLORS = ['#7B3EFF', '#4ECDC4', '#FF6B6B', '#FFD93D', '#A066FF', '#6BCB77', '#FF9F43']
const ICONS = ['🖥️', '📱', '🛒', '📊', '🤖', '🔐', '📧', '🎓', '🏥', '🏗️', '⚡', '🎯']

const card: React.CSSProperties = {
  background: 'rgba(20,0,50,0.6)', border: '1px solid rgba(123,62,255,0.2)',
  borderRadius: '1rem', padding: '1.5rem',
}
const inp: React.CSSProperties = {
  width: '100%', padding: '0.75rem 1rem', borderRadius: '0.625rem',
  background: 'rgba(30,0,64,0.5)', border: '1px solid rgba(123,62,255,0.25)',
  color: 'white', fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
}
const lbl: React.CSSProperties = { display: 'block', color: '#B8B8C7', fontSize: '0.82rem', fontFamily: 'Cairo, sans-serif', marginBottom: '0.35rem' }

const emptyProduct = (): Omit<Software, 'id' | 'plans'> => ({
  name: '', description: '', icon: '🖥️', color: '#7B3EFF', category: 'SaaS', visible: true,
})
const emptyPlan = (): Omit<Plan, 'id'> => ({
  name: '', price: '', period: 'شهر', features: '', featured: false, cta: 'اشترك الآن',
})

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Software[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [editProduct, setEditProduct] = useState<Partial<Software> | null>(null)
  const [editPlan, setEditPlan] = useState<{ productId: string; plan: Partial<Plan> } | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const load = () => {
    setLoading(true)
    fetch('/api/products?all=true')
      .then(r => r.json())
      .then(d => { setProducts(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }
  useEffect(load, [])

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  // ── Save Product ──
  const saveProduct = async () => {
    if (!editProduct?.name) return
    setSaving(true)
    const method = editProduct.id ? 'PUT' : 'POST'
    const url = editProduct.id ? `/api/products/${editProduct.id}` : '/api/products'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editProduct) })
    setSaving(false); setEditProduct(null); flash('✅ تم الحفظ'); load()
  }

  // ── Delete Product ──
  const deleteProduct = async (id: string) => {
    if (!confirm('حذف هذا البرنامج وكل باقاته؟')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    flash('🗑️ تم الحذف'); load()
  }

  // ── Save Plan ──
  const savePlan = async () => {
    if (!editPlan || !editPlan.plan.name) return
    setSaving(true)
    const { productId, plan } = editPlan
    const method = plan.id ? 'PUT' : 'POST'
    const url = plan.id ? `/api/products/${productId}/plans?planId=${plan.id}` : `/api/products/${productId}/plans`
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(plan) })
    setSaving(false); setEditPlan(null); flash('✅ تم حفظ الباقة'); load()
  }

  // ── Delete Plan ──
  const deletePlan = async (productId: string, planId: string) => {
    if (!confirm('حذف هذه الباقة؟')) return
    await fetch(`/api/products/${productId}/plans?planId=${planId}`, { method: 'DELETE' })
    flash('🗑️ تم حذف الباقة'); load()
  }

  return (
    <div style={{ fontFamily: 'Cairo, sans-serif', color: 'white', maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '0.25rem' }}>إدارة البرامج</h1>
          <p style={{ color: '#B8B8C7', fontSize: '0.9rem' }}>أضف برامجك وحدد باقات الاشتراك لكل برنامج</p>
        </div>
        <button onClick={() => setEditProduct({ ...emptyProduct() })}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', border: 'none', color: 'white', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
          <Plus size={18} /> إضافة برنامج
        </button>
      </div>

      {msg && (
        <div style={{ ...card, background: 'rgba(107,203,119,0.15)', border: '1px solid rgba(107,203,119,0.3)', marginBottom: '1.5rem', color: '#6BCB77', padding: '0.875rem 1.25rem' }}>
          {msg}
        </div>
      )}

      {/* Edit Product Modal */}
      {editProduct !== null && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ ...card, width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{editProduct.id ? 'تعديل البرنامج' : 'برنامج جديد'}</h2>
              <button onClick={() => setEditProduct(null)} style={{ background: 'none', border: 'none', color: '#B8B8C7', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={lbl}>اسم البرنامج *</label>
                <input style={inp} value={editProduct.name || ''} onChange={e => setEditProduct({ ...editProduct, name: e.target.value })} placeholder="مثال: نظام الفواتير" />
              </div>
              <div>
                <label style={lbl}>التصنيف</label>
                <input style={inp} value={editProduct.category || ''} onChange={e => setEditProduct({ ...editProduct, category: e.target.value })} placeholder="SaaS / أداة / خدمة" />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={lbl}>الوصف</label>
              <textarea rows={3} style={{ ...inp, resize: 'vertical' }} value={editProduct.description || ''} onChange={e => setEditProduct({ ...editProduct, description: e.target.value })} placeholder="وصف مختصر للبرنامج..." />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={lbl}>الأيقونة (emoji)</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
                  {ICONS.map(ic => (
                    <button key={ic} onClick={() => setEditProduct({ ...editProduct, icon: ic })}
                      style={{ fontSize: '1.4rem', padding: '0.35rem', borderRadius: '0.5rem', border: `2px solid ${editProduct.icon === ic ? '#7B3EFF' : 'transparent'}`, background: editProduct.icon === ic ? 'rgba(123,62,255,0.2)' : 'transparent', cursor: 'pointer' }}>
                      {ic}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={lbl}>اللون</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.4rem' }}>
                  {COLORS.map(c => (
                    <button key={c} onClick={() => setEditProduct({ ...editProduct, color: c })}
                      style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: c, border: `3px solid ${editProduct.color === c ? 'white' : 'transparent'}`, cursor: 'pointer' }} />
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <label style={{ ...lbl, margin: 0 }}>ظاهر للزوار</label>
              <button onClick={() => setEditProduct({ ...editProduct, visible: !editProduct.visible })}
                style={{ width: '3rem', height: '1.6rem', borderRadius: '1rem', border: 'none', cursor: 'pointer', background: editProduct.visible ? '#7B3EFF' : '#333', transition: 'background 0.2s', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '2px', transition: 'right 0.2s', right: editProduct.visible ? '2px' : '18px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', display: 'block' }} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={saveProduct} disabled={saving}
                style={{ flex: 1, padding: '0.875rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', border: 'none', color: 'white', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Check size={18} /> {saving ? 'جاري الحفظ...' : 'حفظ'}
              </button>
              <button onClick={() => setEditProduct(null)}
                style={{ padding: '0.875rem 1.5rem', borderRadius: '0.75rem', border: '1px solid rgba(123,62,255,0.3)', background: 'transparent', color: '#B8B8C7', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      {editPlan !== null && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ ...card, width: '100%', maxWidth: '480px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{editPlan.plan.id ? 'تعديل الباقة' : 'باقة جديدة'}</h2>
              <button onClick={() => setEditPlan(null)} style={{ background: 'none', border: 'none', color: '#B8B8C7', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={lbl}>اسم الباقة *</label>
                <input style={inp} value={editPlan.plan.name || ''} onChange={e => setEditPlan({ ...editPlan, plan: { ...editPlan.plan, name: e.target.value } })} placeholder="مثال: الأساسية" />
              </div>
              <div>
                <label style={lbl}>السعر (اكتب مجاني أو رقم)</label>
                <input style={inp} value={editPlan.plan.price || ''} onChange={e => setEditPlan({ ...editPlan, plan: { ...editPlan.plan, price: e.target.value } })} placeholder="49 أو مجاني" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={lbl}>الفترة</label>
                <select style={{ ...inp, cursor: 'pointer' }} value={editPlan.plan.period || 'شهر'} onChange={e => setEditPlan({ ...editPlan, plan: { ...editPlan.plan, period: e.target.value } })}>
                  {['شهر', 'سنة', 'مرة واحدة', 'مجاني'].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>نص الزر</label>
                <input style={inp} value={editPlan.plan.cta || ''} onChange={e => setEditPlan({ ...editPlan, plan: { ...editPlan.plan, cta: e.target.value } })} placeholder="اشترك الآن" />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={lbl}>المميزات (سطر لكل ميزة)</label>
              <textarea rows={5} style={{ ...inp, resize: 'vertical' }} value={editPlan.plan.features || ''} onChange={e => setEditPlan({ ...editPlan, plan: { ...editPlan.plan, features: e.target.value } })} placeholder={'مستخدم واحد\nتقارير أساسية\ndasha شهرياً'} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <label style={{ ...lbl, margin: 0 }}>الباقة المميزة ⭐</label>
              <button onClick={() => setEditPlan({ ...editPlan, plan: { ...editPlan.plan, featured: !editPlan.plan.featured } })}
                style={{ width: '3rem', height: '1.6rem', borderRadius: '1rem', border: 'none', cursor: 'pointer', background: editPlan.plan.featured ? '#FFD93D' : '#333', transition: 'background 0.2s', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '2px', transition: 'right 0.2s', right: editPlan.plan.featured ? '2px' : '18px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', display: 'block' }} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={savePlan} disabled={saving}
                style={{ flex: 1, padding: '0.875rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', border: 'none', color: 'white', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Check size={18} /> {saving ? 'جاري الحفظ...' : 'حفظ الباقة'}
              </button>
              <button onClick={() => setEditPlan(null)}
                style={{ padding: '0.875rem 1.5rem', borderRadius: '0.75rem', border: '1px solid rgba(123,62,255,0.3)', background: 'transparent', color: '#B8B8C7', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#B8B8C7' }}>جاري التحميل...</div>
      ) : products.length === 0 ? (
        <div style={{ ...card, textAlign: 'center', padding: '4rem' }}>
          <Package size={48} style={{ color: '#7B3EFF', margin: '0 auto 1rem' }} />
          <p style={{ color: '#B8B8C7', fontSize: '1rem', marginBottom: '1.5rem' }}>لا يوجد برامج بعد. ابدأ بإضافة أول برنامج.</p>
          <button onClick={() => setEditProduct({ ...emptyProduct() })}
            style={{ padding: '0.75rem 2rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', border: 'none', color: 'white', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>
            <Plus size={16} style={{ display: 'inline', marginLeft: '0.4rem' }} /> إضافة برنامج
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {products.map(prod => (
            <div key={prod.id} style={{ ...card, borderColor: expanded === prod.id ? prod.color + '50' : 'rgba(123,62,255,0.2)' }}>
              {/* Product Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '0.875rem', background: prod.color + '20', border: `1px solid ${prod.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                  {prod.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <h3 style={{ fontWeight: 800, fontSize: '1rem' }}>{prod.name}</h3>
                    <span style={{ padding: '0.15rem 0.6rem', borderRadius: '1rem', background: prod.color + '20', border: `1px solid ${prod.color}35`, color: prod.color, fontSize: '0.72rem', fontWeight: 700 }}>{prod.category}</span>
                    {!prod.visible && <span style={{ padding: '0.15rem 0.6rem', borderRadius: '1rem', background: 'rgba(255,107,107,0.15)', color: '#FF6B6B', fontSize: '0.72rem', fontWeight: 700 }}>مخفي</span>}
                  </div>
                  <p style={{ color: '#9090A8', fontSize: '0.82rem', marginTop: '0.2rem' }}>{prod.description?.slice(0, 80)}{prod.description?.length > 80 ? '...' : ''}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#B8B8C7', fontSize: '0.8rem' }}>{prod.plans?.length || 0} باقة</span>
                  <button onClick={() => setEditProduct(prod)} style={{ padding: '0.45rem 0.875rem', borderRadius: '0.5rem', background: 'rgba(123,62,255,0.12)', border: '1px solid rgba(123,62,255,0.25)', color: '#A066FF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', fontFamily: 'Cairo, sans-serif' }}>
                    <Pencil size={13} /> تعديل
                  </button>
                  <button onClick={() => deleteProduct(prod.id)} style={{ padding: '0.45rem 0.5rem', borderRadius: '0.5rem', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.2)', color: '#FF6B6B', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <Trash2 size={13} />
                  </button>
                  <button onClick={() => setExpanded(expanded === prod.id ? null : prod.id)} style={{ padding: '0.45rem 0.5rem', borderRadius: '0.5rem', background: 'rgba(123,62,255,0.08)', border: '1px solid rgba(123,62,255,0.15)', color: '#B8B8C7', cursor: 'pointer' }}>
                    {expanded === prod.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Plans */}
              {expanded === prod.id && (
                <div style={{ marginTop: '1.25rem', borderTop: '1px solid rgba(123,62,255,0.15)', paddingTop: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: '#B8B8C7' }}>باقات الاشتراك</h4>
                    <button onClick={() => setEditPlan({ productId: prod.id, plan: { ...emptyPlan() } })}
                      style={{ padding: '0.4rem 0.875rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', border: 'none', color: 'white', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 600, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Plus size={13} /> إضافة باقة
                    </button>
                  </div>
                  {(!prod.plans || prod.plans.length === 0) ? (
                    <p style={{ color: '#6060A8', fontSize: '0.85rem', textAlign: 'center', padding: '1.5rem' }}>لا يوجد باقات — أضف أول باقة</p>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.875rem' }}>
                      {prod.plans.map(plan => (
                        <div key={plan.id} style={{ borderRadius: '0.875rem', padding: '1.25rem', background: plan.featured ? `linear-gradient(145deg, ${prod.color}18, rgba(10,0,31,0.5))` : 'rgba(10,0,31,0.4)', border: `1px solid ${plan.featured ? prod.color + '50' : 'rgba(123,62,255,0.15)'}`, position: 'relative' }}>
                          {plan.featured && <span style={{ position: 'absolute', top: '-10px', right: '1rem', padding: '0.15rem 0.6rem', borderRadius: '1rem', background: prod.color, color: 'white', fontSize: '0.7rem', fontWeight: 700 }}>مميزة ⭐</span>}
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <div>
                              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{plan.name}</div>
                              <div style={{ color: prod.color, fontWeight: 900, fontSize: '1.1rem', marginTop: '0.2rem' }}>
                                {plan.price === 'مجاني' || plan.price === '0' ? <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Gift size={14} />مجاني</span> : <>{plan.price} ريال<span style={{ color: '#9090A8', fontSize: '0.75rem', fontWeight: 400 }}>/{plan.period}</span></>}
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.35rem' }}>
                              <button onClick={() => setEditPlan({ productId: prod.id, plan })} style={{ padding: '0.35rem', borderRadius: '0.4rem', background: 'rgba(123,62,255,0.12)', border: 'none', color: '#A066FF', cursor: 'pointer' }}><Pencil size={12} /></button>
                              <button onClick={() => deletePlan(prod.id, plan.id)} style={{ padding: '0.35rem', borderRadius: '0.4rem', background: 'rgba(255,107,107,0.1)', border: 'none', color: '#FF6B6B', cursor: 'pointer' }}><Trash2 size={12} /></button>
                            </div>
                          </div>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {(plan.features || '').split('\n').filter(Boolean).slice(0, 4).map((f, i) => (
                              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', color: '#B8B8C7', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
                                <Zap size={11} color={prod.color} style={{ marginTop: '2px', flexShrink: 0 }} />{f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
