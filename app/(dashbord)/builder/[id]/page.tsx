"use client"

import DesignerContextProvider from "@/context/designerContext"
import { FormBuilder } from "@/features/builder/components"
import { DndContext } from "@dnd-kit/core"

async function BuilderPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const { id } = params

  //TODO: check if the id provided in url is already created
  const form = true
  if (!form) {
    throw new Error("form not found")
  }

  return (
    <DndContext>
      <DesignerContextProvider>
        <FormBuilder form={form} />
      </DesignerContextProvider>
    </DndContext>
  )
}

export default BuilderPage
