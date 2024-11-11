// app/layout.js
export const metadata = {
  title: 'Prosthetic Valve Reference',
  description: 'Reference values for prosthetic heart valves',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}