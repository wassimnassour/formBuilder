"use client"

import DesignerContextProvider from "@/context/designerContext"
import { FormBuilder } from "@/features/builder/components"
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"

async function BuilderPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  })
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  })
  const sensors = useSensors(touchSensor, mouseSensor)

  const { id } = params

  //TODO: check if the id provided in url is already created
  const form = true
  if (!form) {
    throw new Error("form not found")
  }

  return (
    <DndContext sensors={sensors}>
      <DesignerContextProvider>
        <FormBuilder form={form} />
      </DesignerContextProvider>
    </DndContext>
  )
}

export default BuilderPage
