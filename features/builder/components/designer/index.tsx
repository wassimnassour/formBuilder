import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { DesignerElements } from "./designerElements"
import DesignerSideBar, { SideBarBtnElementOverly } from "./designerSideBar"
import { useState } from "react"
import { ElementsType, FormElements } from "../FormElements"

export function Designer() {
  return (
    <div className="flex w-full h-full">
      <DesignerElements />
      <DesignerSideBar />
      <DesignerDroppableOverlyWrapper />
    </div>
  )
}

function DesignerDroppableOverlyWrapper() {
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
