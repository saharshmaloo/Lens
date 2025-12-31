"use client"

import { useEffect } from 'react'
import { useAuth } from '@/lib/auth/auth-context'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/notes')
      } else {
        router.push('/login')
      }
    }
  }, [user, loading, router])

  return <div>Loading...</div>
}