import { Header } from '@/components/header'

import { OrganizationForm } from './organization-form'

export default function CreateOrganization() {
  return (
    <div className="p-4 space-y-4">
      <Header />

      <main className="mx-auto w-full max-w-300 space-y-4">
        <h1 className="text-2xl font-bold">Create Organization</h1>

        <OrganizationForm />
      </main>
    </div>
  )
}
