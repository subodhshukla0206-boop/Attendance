import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Study Platform',
  description: 'Notes, attendance, and discussion platform'
}

const navLinks = [
  { href: '/', label: 'Notes Feed' },
  { href: '/upload', label: 'Upload' },
  { href: '/attendance', label: 'Attendance' },
  { href: '/discussion', label: 'Discussion' }
]

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <h1>📚 Study Platform</h1>
          <nav>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
