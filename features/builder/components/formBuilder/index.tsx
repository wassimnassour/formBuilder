import { DndContext } from "@dnd-kit/core"
import { Designer } from "../designer"
import { PreviewBtnElement } from "../previewBtn"
import { PublishBtn } from "../publishBtn"
import { SaveFormBtn } from "../saveFormBtn"

export function FormBuilder() {
  return (
    <main className="flex flex-col w-full ">
      <nav className="flex justify-between border-b-2 p-4 gap-3 items-center   ">
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">Form:</span>
          Static Form Name
        </h2>
        <div className="flex items-center gap-2">
          <PreviewBtnElement />
          {true && (
            <>
              <SaveFormBtn />
              <PublishBtn />
            </>
          )}
        </div>
      </nav>
      <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
        <Designer />
      </div>
    </main>
  )
}
