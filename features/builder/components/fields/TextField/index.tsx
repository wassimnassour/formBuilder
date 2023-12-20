"use client"
import { MdTextFields } from "react-icons/md"
import { FormElement } from "../../FormElements"

export const TextField: FormElement = {
  type: "TextField",
  designerBtnElement: {
    label: "TextField",
    icon: MdTextFields,
  },
  designerComponent: () => <h1>designerComponent</h1>,
  propertiesElement: () => <h1>propertiesElement</h1>,
  construct: (id: string) => ({
    id,
    type: "TextField",
  }),
}
