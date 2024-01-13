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
  const {
    addElement,
    removeElement,
    setSelectedElement,
    selectedElement,
    elements,
  } = useDesigner()

  const droppable = useDroppable({
    id: "Designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  })

  useDndMonitor({
    onDragEnd: (event) => {
      if (!event.active || !event.over) return

      // First scenario: Dropping over the designer area.
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

      // Second scenario: Dropping over Top area or Bottom Area of Designer element
      const isDroppingOverTopHalfDesignerElement =
        event.over.data?.current?.isTopHalfDesignerElement
      const isDroppingOverBottomHalfDesignerElement =
        event.over.data?.current?.isBottomHalfDesignerElement

      const isDroppingOverDesignerElement =
        isDroppingOverTopHalfDesignerElement ||
        isDroppingOverBottomHalfDesignerElement

      if (isDesignerBtnElement && isDroppingOverDesignerElement) {
        const newElement = FormElements[
          event.active.data?.current?.type as ElementsType
        ].construct(generateRandomId())

        const overId = event.over?.data?.current?.id
        const elementIndex = elements?.findIndex((_el) => _el.id === overId)

        if (isDroppingOverTopHalfDesignerElement) {
          return addElement(elementIndex, newElement)
        } else {
          addElement(elementIndex + 1, newElement)
        }
      }

      // thired senario
      const isDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement &&
        (isDroppingOverTopHalfDesignerElement ||
          isDroppingOverBottomHalfDesignerElement)

      if (isDesignerElementOverAnotherDesignerElement) {
        const activeId = event.active.data.current?.id
        const overId = event.over?.data?.current?.id

        const activeElementIndex = elements?.findIndex(
          (_el) => _el.id === activeId
        )

        const elementOverIndex = elements?.findIndex((_el) => _el.id === overId)

        const activeElement = Object.assign({}, elements[activeElementIndex])

        removeElement(activeId)

        if (isDroppingOverTopHalfDesignerElement) {
          addElement(elementOverIndex, activeElement)
        } else {
          addElement(elementOverIndex + 1, activeElement)
        }
      }
    },
  })

  return (
    <div
      className="w-full p-3"
      ref={droppable.setNodeRef}
      onClick={() => {
        if (selectedElement) setSelectedElement(null)
      }}
    >
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
  const { removeElement, setSelectedElement } = useDesigner()
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const DesignerElement = FormElements[element.type]?.designerComponent

  const topHalf = useDroppable({
    id: "top-half" + element.id,
    data: {
      id: element.id,
      type: element.type,
      isTopHalfDesignerElement: true,
    },
  })

  const bottomHalf = useDroppable({
    id: "bottom-half" + element.id,
    data: {
      id: element.id,
      type: element.type,
      isBottomHalfDesignerElement: true,
    },
  })

  const draggable = useDraggable({
    id: element.id + "-drag-element-handler",
    data: {
      type: element.type,
      id: element.id,
      isDesignerElement: true,
    },
  })

  if (draggable.isDragging) return
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md overflow-hidden ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedElement(element)
      }}
    >
      {/* Top Half */}
      <div
        ref={topHalf.setNodeRef}
        className=" absolute top-0 left-0 right-0 h-1/2 w-full"
      />

      {/* Bottom Half */}
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 w-full"
      />
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

      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
      )}

      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
      )}
    </div>
  )
}
