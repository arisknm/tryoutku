import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import TryoutEngine from '@/components/tryout/TryoutEngine'

export default async function KerjakanPage({
  params,
}: {
  params: Promise<{ id: string; attemptId: string }>
}) {
  const { id, attemptId } = await params
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: attempt } = await supabase
    .from('tryout_attempts')
    .select('*')
    .eq('id', attemptId)
    .eq('user_id', user.id)
    .single()

  if (!attempt || attempt.status !== 'in_progress') {
    redirect(`/dashboard/tryout/${id}`)
  }

  const { data: tryout } = await supabase.from('tryouts').select('*').eq('id', id).single()
  const { data: questions } = await supabase
    .from('questions')
    .select('id, nomor, soal, soal_image, pilihan, poin')
    .eq('tryout_id', id)
    .order('nomor')

  if (!tryout || !questions) redirect('/dashboard/tryout')

  return (
    <TryoutEngine
      tryout={tryout}
      questions={questions}
      attempt={attempt}
      userId={user.id}
    />
  )
}
