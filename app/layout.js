import './globals.css'

export const metadata = {
  title: 'PHVDR: Prosthetic Heart Valve Doppler Reference',
  description: 'JASE Guideline Doppler reference values for prosthetic heart valves',
  icons: {
    icon: '/favicon.ico',
  },

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}