import { Button } from "@/components/ui"
import { MdPreview } from "react-icons/md"

export function PreviewBtnElement() {
  return (
    <Button variant={"outline"} className="gap-2">
      <MdPreview className="h-6 w-6" />
      Preview
    </Button>
  )
}
