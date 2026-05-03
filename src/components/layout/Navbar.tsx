'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, BookOpen, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <BookOpen className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-gray-900">Tryout<span className="text-blue-600">Ku</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#fitur" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">Fitur</Link>
            <Link href="/#harga" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">Harga</Link>
            <Link href="/dashboard" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">Tryout</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-gray-600">Masuk</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">Daftar Gratis</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <Link href="/#fitur" className="block text-gray-600 hover:text-indigo-600 text-sm font-medium" onClick={() => setOpen(false)}>Fitur</Link>
          <Link href="/#harga" className="block text-gray-600 hover:text-indigo-600 text-sm font-medium" onClick={() => setOpen(false)}>Harga</Link>
          <Link href="/#tentang" className="block text-gray-600 hover:text-indigo-600 text-sm font-medium" onClick={() => setOpen(false)}>Tentang</Link>
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/login" onClick={() => setOpen(false)}><Button variant="outline" size="sm" className="w-full">Masuk</Button></Link>
            <Link href="/register" onClick={() => setOpen(false)}><Button size="sm" className="w-full">Daftar Gratis</Button></Link>
          </div>
        </div>
      )}
    </nav>
  )
}
