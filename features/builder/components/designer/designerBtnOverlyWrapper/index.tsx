"use client"
import { useState } from "react"
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { SideBarBtnElementOverly } from "../designerSideBar"
import { ElementsType, FormElements } from "@/components/FormElements"

export function DesignerBtnOverlyWrapper() {
  const [active, setActive] = useState<Active | null>(null)
  useDndMonitor({
    onDragStart(event) {
      console.log(event)
      setActive(event.active)
    },
  })

  let node

  if (active?.data?.current?.isDesignerBtnElement) {
    const element = FormElements[active.data.current.type as ElementsType]
    node = <SideBarBtnElementOverly element={element} />
  }

  return <DragOverlay>{node}</DragOverlay>
}
