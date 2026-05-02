import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import ProfilForm from '@/components/dashboard/ProfilForm'
import { User, Star } from 'lucide-react'
import Link from 'next/link'

export default async function ProfilPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola informasi akun kamu</p>
      </div>

      {/* Avatar & Info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="w-10 h-10 text-indigo-400" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">{profile?.name}</h2>
        <p className="text-gray-500 text-sm">{profile?.email}</p>
        {profile?.is_premium && (
          <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Star className="w-3 h-3 fill-current" /> Premium
            {profile.premium_until && ` · s/d ${new Date(profile.premium_until).toLocaleDateString('id-ID')}`}
          </span>
        )}
      </div>

      <ProfilForm profile={profile} userId={user.id} />

      <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
        <p className="text-sm text-red-600 mb-3">Ingin keluar dari akun?</p>
        <form action="/api/auth/logout" method="POST">
          <button className="text-sm font-semibold text-red-600 hover:text-red-700 underline">Keluar dari Akun</button>
        </form>
      </div>
    </div>
  )
}
