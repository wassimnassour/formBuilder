import { FormElementsType } from "@/types/FormElements"

import {
  SeparatorFieldFormElement,
  CheckboxFieldFormElement,
  NumberFieldFormElement,
  ParagraphFieldFormElement,
  SelectFieldFormElement,
  SpacerFieldFormElement,
  SubTitleFieldFormElement,
  TextField,
  TitleField,
  DateFieldFormElement,
} from "../fields"

export const FormElements: FormElementsType = {
  TextField: TextField,
  TitleField: TitleField,
  SubTitleField: SubTitleFieldFormElement,
  NumberField: NumberFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SelectField: SelectFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  DateField: DateFieldFormElement,
}
