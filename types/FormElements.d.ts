export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField"

export type FormElementInstance = {
  id: string
  type: ElementsType
  extraAttributes?: Record<string, any>
}

export type FormElement = {
  type: ElementsType

  construct: (id: string) => FormElementInstance

  designerBtnElement: {
    icon: React.ElementType
    label: string
  }
  propertiesElement: React.FC<{
    elementInstance: FormElementInstance
  }>

  designerComponent: React.FC<{
    elementInstance: FormElementInstance
  }>
}

type FormElementsType = {
  [key in ElementsType]: FormElement
}
