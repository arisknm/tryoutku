'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, FileText, Users, Settings, LogOut, Menu, X, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/tryout', icon: FileText, label: 'Kelola Tryout' },
  { href: '/admin/soal', icon: BookOpen, label: 'Kelola Soal' },
  { href: '/admin/users', icon: Users, label: 'Pengguna' },
  { href: '/admin/statistik', icon: BarChart3, label: 'Statistik' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-0.5">TryoutKu</div>
        <div className="text-sm font-bold text-gray-900">Admin Panel</div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}
              className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100')}>
              <Icon className="w-5 h-5" /> {label}
            </Link>
          )
        })}
      </nav>
      <div className="px-3 py-4 border-t border-gray-100">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:text-indigo-600 hover:bg-gray-50 rounded-xl">
          ← Kembali ke Dashboard
        </Link>
        <form action="/api/auth/logout" method="POST">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 mt-1">
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        <SidebarContent />
      </aside>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b px-4 h-14 flex items-center justify-between">
        <span className="font-bold text-indigo-600">Admin Panel</span>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-gray-100">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <aside className="absolute top-0 left-0 w-64 h-full bg-white shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="h-14" /><SidebarContent />
          </aside>
        </div>
      )}
    </>
  )
}
