import { useDroppable } from "@dnd-kit/core"
export function DesignerElements() {
  const droppable = useDroppable({
    id: "Designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  })

  return (
    <div className="w-full p-3" {...droppable.setNodeRef}>
      <div className="bg-background w-full h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto">
        <div className="flex flex-grow items-center justify-center ">
          <h1>Drop Here </h1>
        </div>
      </div>
    </div>
  )
}
