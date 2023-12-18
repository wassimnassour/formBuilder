import { Separator } from "@/components/ui"
import { CardsStatsWrapper, CreateForm } from "@/features/dashboard"

export default async function Index() {
  return (
    <div className=" pt-4  h-screen  max-w-6xl mx-auto">
      <CardsStatsWrapper />
      <Separator className="my-6" />
      <h1 className="font-bold text-xl text-muted-foreground group-hover:text-primary">
        Your forms
      </h1>
      <CreateForm />
    </div>
  )
}
