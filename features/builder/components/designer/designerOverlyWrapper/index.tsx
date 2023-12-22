"use client"
import { useState } from "react"
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { SideBarBtnElementOverly } from "../designerSideBar"
import { FormElements } from "@/components/FormElements"
import useDesigner from "@/hooks/useDesigner"
import { ElementsType } from "@/types/FormElements"

export function DesignerBtnOverlyWrapper() {
  const [active, setActive] = useState<Active | null>(null)
  useDndMonitor({
    onDragStart(event) {
      console.log(event)
      setActive(event.active)
    },
  })

  let node

  node = <h1>No overly Wrapper found</h1>

  if (active?.data?.current?.isDesignerBtnElement) {
    const element = FormElements[active.data.current.type as ElementsType]
    node = <SideBarBtnElementOverly element={element} />
    return
  }

  if (active?.data?.current?.isDesignerElement) {
    node = <DesignerElementOverlyWrapper data={active?.data?.current} />
  }

  return <DragOverlay>{node}</DragOverlay>
}

function DesignerElementOverlyWrapper({
  data,
}: {
  data: {
    id: string
    type: ElementsType
  }
}) {
  const { elements } = useDesigner()
  const elementId = data?.id
  const elementType = data?.type
  const elementData = elements?.find((_el) => _el.id === elementId)
  const DesignerComponent = FormElements[elementType].designerComponent

  if (!elementData)
    return (
      <div>
        <h1>Element Not Found</h1>
      </div>
    )
  return (
    <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer pointer-events-none">
      <DesignerComponent elementInstance={elementData} />
    </div>
  )
}
