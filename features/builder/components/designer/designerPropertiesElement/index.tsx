import { AiOutlineClose } from "react-icons/ai"

import { Button, Separator } from "@/components/ui"
import useDesigner from "@/hooks/useDesigner"
import { FormElements } from "@/components/FormElements"
import { FormElementInstance } from "@/types/FormElements"

export default function DesignerPropertiesElement() {
  const { setSelectedElement, selectedElement } = useDesigner()

  if (!selectedElement) return
  const element = selectedElement as FormElementInstance
  const PropertiesForm = FormElements[element.type].propertiesElement
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setSelectedElement(null)
          }}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </>
  )
}
