// app/page.js
import ValveReference from '@/components/ValveReference'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">
        Prosthetic Valve Reference Tool
      </h1>
      <ValveReference />
    </main>
  )
}