"use client"
import { FormSubmitComponent } from "@/features/submitForm/components"
import { FormElementInstance } from "@/types/FormElements"

export default function SubmitFormPage() {
  const element: FormElementInstance[] = [
    {
      id: "test",
      type: "TextField",
      extraAttributes: {
        label: "test",
        required: true,
      },
    },
  ]
  return <FormSubmitComponent content={element} />
}
