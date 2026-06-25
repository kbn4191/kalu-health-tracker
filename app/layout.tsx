import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kalu Okeke Nwankwo — Recovery Tracker',
  description: 'Post-stroke health monitoring and medication record',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800">{children}</body>
    </html>
  )
}
