'use client'
import { useState, useEffect } from 'react'
import { Eye, MousePointer, TrendingUp, BarChart2 } from 'lucide-react'

type Stats = {
  totalViews: number
  totalContacts: number
  totalSubmitted: number
  conversionRate: number
  viewsByPage: { path: string; count: number }[]
  dailyViews: { date: string; views: number }[]
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [days, setDays] = useState(30)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/analytics?days=${days}`)
      .then(r => r.json())
      .then(d => {
        setStats({
          totalViews: 0, totalContacts: 0, totalSubmitted: 0, conversionRate: 0,
          viewsByPage: [], dailyViews: [],
          ...d,
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [days])

  const maxViews = stats?.dailyViews?.length ? Math.max(...stats.dailyViews.map(d => d.views), 1) : 1

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.5rem' }}>إحصائيات الموقع</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[7, 30, 90].map(d => (
            <button key={d} onClick={() => setDays(d)} style={{
              padding: '0.4rem 0.875rem', borderRadius: '1rem', border: 'none', cursor: 'pointer',
              fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem',
              background: days === d ? 'linear-gradient(135deg,#7B3EFF,#A066FF)' : 'rgba(123,62,255,0.1)',
              color: days === d ? 'white' : '#B8B8C7',
            }}>آخر {d} يوم</button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={{ color: '#B8B8C7', textAlign: 'center', padding: '4rem', fontFamily: 'Cairo, sans-serif' }}>جاري التحميل...</p>
      ) : !stats ? (
        <p style={{ color: '#B8B8C7', textAlign: 'center', padding: '4rem', fontFamily: 'Cairo, sans-serif' }}>تعذر تحميل البيانات</p>
      ) : (
        <>
          {/* Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            {[
              { label: 'إجمالي الزيارات', value: stats.totalViews, icon: <Eye size={22} />, color: '#7B3EFF' },
              { label: 'فتح نموذج التواصل', value: stats.totalContacts, icon: <MousePointer size={22} />, color: '#FFD93D' },
              { label: 'أرسلوا بالفعل', value: stats.totalSubmitted, icon: <TrendingUp size={22} />, color: '#4ECDC4' },
              { label: 'معدل التحويل', value: `${stats.conversionRate}%`, icon: <BarChart2 size={22} />, color: '#A066FF' },
            ].map((card, i) => (
              <div key={i} className="admin-card" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: `${card.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, marginBottom: '1rem' }}>
                  {card.icon}
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', fontFamily: 'Cairo, sans-serif', marginBottom: '0.25rem' }}>{card.value}</div>
                <div style={{ color: '#B8B8C7', fontSize: '0.9rem', fontFamily: 'Cairo, sans-serif' }}>{card.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Daily Chart */}
            <div className="admin-card" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
              <h3 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', marginBottom: '1.5rem' }}>الزيارات اليومية</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: '140px' }}>
                {(stats.dailyViews ?? []).map((d, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', height: '100%', justifyContent: 'flex-end' }}>
                    <span style={{ color: '#B8B8C7', fontSize: '0.75rem', fontFamily: 'Cairo, sans-serif' }}>{d.views}</span>
                    <div style={{
                      width: '100%', borderRadius: '0.35rem 0.35rem 0 0',
                      background: `linear-gradient(180deg, #7B3EFF, #A066FF)`,
                      height: `${Math.max((d.views / maxViews) * 100, 4)}%`,
                      minHeight: '4px', transition: 'height 0.5s ease',
                    }} />
                    <span style={{ color: '#B8B8C7', fontSize: '0.7rem', fontFamily: 'Cairo, sans-serif' }}>{d.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Pages */}
            <div className="admin-card" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
              <h3 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', marginBottom: '1.5rem' }}>أكثر الصفحات زيارة</h3>
              {(stats.viewsByPage ?? []).length === 0 ? (
                <p style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', textAlign: 'center', padding: '2rem' }}>لا توجد بيانات حتى الآن</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(stats.viewsByPage ?? []).slice(0, 6).map((page, i) => {
                    const maxPg = (stats.viewsByPage ?? [])[0]?.count || 1
                    return (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                          <span style={{ color: '#B8B8C7', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif' }}>{page.path}</span>
                          <span style={{ color: '#A066FF', fontSize: '0.85rem', fontWeight: 700 }}>{page.count}</span>
                        </div>
                        <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(123,62,255,0.15)' }}>
                          <div style={{ height: '100%', borderRadius: '3px', background: 'linear-gradient(90deg,#7B3EFF,#A066FF)', width: `${(page.count / maxPg) * 100}%`, transition: 'width 0.5s' }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
