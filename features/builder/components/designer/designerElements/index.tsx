"use client"

import { useState } from "react"
import { BiSolidTrash } from "react-icons/bi"
import { FormElements } from "@/components/FormElements"
import { Button } from "@/components/ui"
import useDesigner from "@/hooks/useDesigner"
import { cn } from "@/lib/utils"
import { generateRandomId } from "@/lib/utils/generateRandomId"
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core"
import { ElementsType, FormElementInstance } from "@/types/FormElements"

export function DesignerElements() {
  const { addElement, elements } = useDesigner()

  const droppable = useDroppable({
    id: "Designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  })

  useDndMonitor({
    onDragEnd: (event) => {
      if (!event.active || !event.over) return

      const isDesignerBtnElement =
        event.active.data.current?.isDesignerBtnElement
      const isDroppingOverDesignerDropArea =
        event?.over?.data?.current?.isDesignerDropArea
      const designerBtnElementDroppingOverDropArea =
        isDesignerBtnElement && isDroppingOverDesignerDropArea

      if (designerBtnElementDroppingOverDropArea) {
        const id = generateRandomId()
        const type = event.active.data?.current?.type
        const newElement = FormElements[type as ElementsType].construct(id)
        addElement(elements.length, newElement)
      }
    },
  })

  return (
    <div className="w-full p-3" ref={droppable.setNodeRef}>
      <div className="bg-background w-full h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto">
        {elements?.length == 0 && (
          <div className="flex flex-grow items-center justify-center ">
            <h1>Drop Here </h1>
          </div>
        )}
        {elements?.length >= 1 && (
          <div className="flex flex-col  w-full gap-2 p-4">
            {elements.map((_el) => {
              return <DesignerElementWrapper element={_el} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const { removeElement } = useDesigner()
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const DesignerElement = FormElements[element.type].designerComponent

  const draggable = useDraggable({
    id: element.id + "-drag-element-handler",
    data: {
      type: element.type,
      id: element.id,
      isDesignerElement: true,
    },
  })
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation() // avoid selection of element while deleting
                removeElement(element.id)
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}

      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  )
}
