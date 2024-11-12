import './globals.css'

export const metadata = {
  title: 'Prosthetic Heart Valve Reference Data',
  description: 'Reference values for prosthetic heart valves',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}