import { Header } from '@/components/header'

export default async function Home() {
  return (
    <div className="space-y-4 px-4">
      <div className="pt-6">
        <Header />
      </div>

      <p className="text-sm text-muted-foreground">Select an organization.</p>
    </div>
  )
}
