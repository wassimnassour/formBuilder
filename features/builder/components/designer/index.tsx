import { DesignerElements } from "./designerElements"
import DesignerSideBar from "./designerSideBar"
import { DesignerBtnOverlyWrapper } from "./designerOverlyWrapper"

export function Designer() {
  return (
    <div className="flex w-full h-full">
      <DesignerElements />
      <DesignerSideBar />
      <DesignerBtnOverlyWrapper />
    </div>
  )
}
