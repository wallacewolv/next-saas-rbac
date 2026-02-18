import { type FormEvent, useState, useTransition } from 'react'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    // Reset errors while submitting
    setFormState({
      success: false,
      message: null,
      errors: null,
    })

    startTransition(async () => {
      const state = await action(formData)

      if (state.success === true && onSuccess) {
        await onSuccess()
      }

      setFormState(state)

      if (state.success) {
        form.reset()
      }
    })
  }

  return [formState, handleSubmit, isPending] as const
}
