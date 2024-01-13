"use client"
import { Button, Separator } from "@/components/ui"
import { FormElements } from "@/components/FormElements"
import { cn } from "@/lib/utils"
import { useDraggable } from "@dnd-kit/core"
import useDesigner from "@/hooks/useDesigner"
import { FormElement } from "@/types/FormElements"
import { Designer } from ".."
import DesignerPropertiesElement from "../designerPropertiesElement"

export default function DesignerSideBar() {
  const { selectedElement } = useDesigner()

  console.log("selectedElement", selectedElement)
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {selectedElement ? (
        <DesignerPropertiesElement />
      ) : (
        <SideBarDesignerElement />
      )}
    </aside>
  )
}

function SideBarDesignerElement() {
  return (
    <div>
      <p className="text-sm text-foreground/70">Drag and drop elements</p>
      <Separator className="my-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Layout elements
        </p>
        <SideBarBtnElement element={FormElements.TextField} />
        <SideBarBtnElement element={FormElements.TitleField} />
        <SideBarBtnElement element={FormElements.SubTitleField} />
        <SideBarBtnElement element={FormElements.NumberField} />
        <SideBarBtnElement element={FormElements.CheckboxField} />
        <SideBarBtnElement element={FormElements.ParagraphField} />
        <SideBarBtnElement element={FormElements.SelectField} />
        <SideBarBtnElement element={FormElements.SpacerField} />
        <SideBarBtnElement element={FormElements.SeparatorField} />
        <SideBarBtnElement element={FormElements.DateField} />
      </div>
    </div>
  )
}

function SideBarBtnElement({ element }: { element: FormElement }) {
  const { label, icon: Icon } = element?.designerBtnElement

  const draggable = useDraggable({
    id: `designer-sidebarBtn-${element.type}`,
    data: {
      type: element.type,
      isDesignerBtnElement: true,
    },
  })
  return (
    <Button
      ref={draggable.setNodeRef}
      variant={"outline"}
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.attributes}
      {...draggable.listeners}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  )
}

export function SideBarBtnElementOverly({ element }: { element: FormElement }) {
  const { label, icon: Icon } = element.designerBtnElement
  return (
    <Button
      variant={"outline"}
      className={cn("flex flex-col gap-2 h-[120px] w-[120px] cursor-grab")}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  )
}
