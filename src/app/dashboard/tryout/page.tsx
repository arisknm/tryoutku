import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import TryoutCard from '@/components/tryout/TryoutCard'
import AdBanner from '@/components/ads/AdBanner'
import { Search } from 'lucide-react'

export default async function TryoutListPage({
  searchParams,
}: {
  searchParams: Promise<{ jenjang?: string; mapel?: string; q?: string }>
}) {
  const params = await searchParams
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

  let query = supabase.from('tryouts').select('*').eq('is_active', true)
  if (params.jenjang) query = query.eq('jenjang', params.jenjang)
  if (params.mapel) query = query.eq('mata_pelajaran', params.mapel)
  if (params.q) query = query.ilike('title', `%${params.q}%`)

  const { data: tryouts } = await query.order('created_at', { ascending: false })

  const isPremium = profile?.is_premium

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Semua Tryout</h1>
        <p className="text-gray-500 text-sm mt-1">Pilih tryout sesuai jenjang dan mata pelajaranmu</p>
      </div>

      {!isPremium && <AdBanner slot="0987654321" format="horizontal" />}

      {/* Filter */}
      <div className="flex flex-wrap gap-3">
        {['SD', 'SMP', 'SMA'].map(j => (
          <a key={j} href={`?jenjang=${j}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
              ${params.jenjang === j ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'}`}>
            {j}
          </a>
        ))}
        {params.jenjang && <a href="?" className="px-4 py-1.5 rounded-full text-sm font-medium border bg-white text-red-500 border-red-200 hover:bg-red-50">Reset Filter</a>}
      </div>

      {/* Tryout Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tryouts && tryouts.length > 0 ? (
          tryouts.map((t: any) => <TryoutCard key={t.id} tryout={t} />)
        ) : (
          <div className="col-span-3 text-center py-16 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>Tidak ada tryout ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  )
}
