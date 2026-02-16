'use client'

import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { OrganizationForm } from '../../create-organization/organization-form'

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
          <SheetDescription>
            Create a new organization to manage projects and team members.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <OrganizationForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
