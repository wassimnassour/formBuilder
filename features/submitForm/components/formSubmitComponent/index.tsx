"use client"

import { FormElements } from "@/components/FormElements"
import { Button } from "@/components/ui"
import { useToast } from "@/hooks"
import { FormElementInstance } from "@/types/FormElements"
import React, { useRef, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { HiCursorClick } from "react-icons/hi"
import { ImSpinner2 } from "react-icons/im"

export function FormSubmitComponent({
  formUrl,
  content,
}: {
  content: FormElementInstance[]
  formUrl: string
}) {
  const methods = useForm({})
  const isSubmitting = methods.formState.isSubmitting

  const { toast } = useToast()
  const formValues = useRef<{ [key: string]: string }>({})
  const [renderKey, setRenderKey] = useState(new Date().getTime())

  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (values: Record<string, string>) => {
    try {
      const jsonContent = JSON.stringify(values)
      //   await SubmitForm(formUrl, jsonContent);
      setSubmitted(true)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  }

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border  shadow-md rounded">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-md shadow-blue-700/20 rounded"
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {content.map((element) => {
              const FormElement = FormElements[element.type].formComponent
              return (
                <FormElement
                  key={element.id}
                  elementInstance={element}
                  defaultValue={methods.getValues(element.id)}
                />
              )
            })}
            <Button type="submit" className="mt-8" disabled={isSubmitting}>
              {!isSubmitting && (
                <>
                  <HiCursorClick className="mr-2" />
                  Submit
                </>
              )}
              {isSubmitting && <ImSpinner2 className="animate-spin" />}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
