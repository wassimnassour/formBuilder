"use client"
import { MdTextFields } from "react-icons/md"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui"
import { FormElement, FormElementInstance } from "@/types/FormElements"

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here...",
}

export const TextField: FormElement = {
  type: "TextField",
  designerBtnElement: {
    label: "TextField",
    icon: MdTextFields,
  },
  designerComponent: DesignerComponent,
  propertiesElement: () => <h1>propertiesElement</h1>,
  construct: (id: string) => ({
    id,
    type: "TextField",
    extraAttributes,
  }),
}
type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) {
  const {
    extraAttributes: { helperText, required, label, placeHolder },
  } = elementInstance as CustomInstance

  return (
    <div className="flex flex-col gap-2 w-full ">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  )
}
