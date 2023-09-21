import './globals.css'
import { Poppins } from 'next/font/google'

const inter = Poppins({ subsets: ['latin'] , weight:'400'})

export const metadata = {
  title: 'Chat App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
