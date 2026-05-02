import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { CheckCircle, Star, Download, BarChart3, BookOpen, Zap } from 'lucide-react'
import PremiumCheckoutButton from '@/components/premium/PremiumCheckoutButton'

const premiumFeatures = [
  { icon: BookOpen, title: 'Pembahasan Lengkap', desc: 'Akses pembahasan detail setiap soal dari semua tryout.' },
  { icon: Download, title: 'Download PDF', desc: 'Unduh soal dan pembahasan untuk belajar offline.' },
  { icon: BarChart3, title: 'Analisis Mendalam', desc: 'Lihat grafik perkembangan dan analisis per topik.' },
  { icon: Star, title: 'Tanpa Iklan', desc: 'Belajar tanpa gangguan iklan sama sekali.' },
  { icon: Zap, title: 'Akses Prioritas', desc: 'Dapatkan tryout baru lebih awal sebelum pengguna gratis.' },
]

export default async function PremiumPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('is_premium, premium_until').eq('id', user.id).single()

  if (profile?.is_premium) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-10 h-10 text-amber-500 fill-current" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Kamu sudah Premium!</h1>
        <p className="text-gray-500 text-sm">Aktif hingga: <span className="font-semibold text-gray-900">{profile.premium_until ? new Date(profile.premium_until).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Selamanya'}</span></p>
        <p className="text-gray-500 text-sm mt-2">Nikmati semua fitur premium tanpa batas.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-semibold px-4 py-2 rounded-full border border-amber-200 mb-4">
          <Star className="w-4 h-4 fill-current" /> TryoutKu Premium
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Belajar Lebih Maksimal</h1>
        <p className="text-gray-500">Unlock semua fitur premium dan raih nilai terbaik.</p>
      </div>

      {/* Fitur */}
      <div className="grid sm:grid-cols-2 gap-4">
        {premiumFeatures.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">{title}</div>
              <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: '1 Bulan', price: 49000, days: 30, popular: false },
          { label: '3 Bulan', price: 129000, days: 90, popular: true, save: 'Hemat 12%' },
        ].map((pkg) => (
          <div key={pkg.label} className={`bg-white rounded-2xl p-5 border-2 ${pkg.popular ? 'border-amber-400' : 'border-gray-100'}`}>
            {pkg.popular && (
              <div className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full inline-block mb-3">{pkg.save}</div>
            )}
            <div className="text-lg font-bold text-gray-900 mb-1">{pkg.label}</div>
            <div className="mb-4">
              <span className="text-3xl font-extrabold text-gray-900">Rp{(pkg.price / 1000).toFixed(0)}rb</span>
            </div>
            <ul className="space-y-2 mb-5">
              {['Semua fitur premium', 'Pembahasan & download PDF', 'Tanpa iklan', `Valid ${pkg.days} hari`].map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" /> {f}
                </li>
              ))}
            </ul>
            <PremiumCheckoutButton userId={user.id} days={pkg.days} price={pkg.price} label={pkg.label} />
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400">
        Pembayaran aman via Midtrans. Pertanyaan? Email kami di hello@tryoutku.id
      </p>
    </div>
  )
}
