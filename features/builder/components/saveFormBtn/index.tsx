import { Button } from "@/components/ui"
import { FaSpinner } from "react-icons/fa"
import { HiSaveAs } from "react-icons/hi"

export function SaveFormBtn() {
  return (
    <Button variant={"outline"} className="gap-2">
      <HiSaveAs className="h-4 w-4" />
      Save
      {false && <FaSpinner className="animate-spin" />}
    </Button>
  )
}
