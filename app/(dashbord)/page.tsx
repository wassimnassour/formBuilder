import { Separator } from "@/components/ui"
import { CardsStatsWrapper, CreateForm } from "@/features/dashboard"
import "@radix-ui/themes/styles.css"

export default async function Index() {
  return (
    <div className=" pt-4  container xl:max-w-6xl px-4   mx-auto">
      <CardsStatsWrapper />
      <Separator className="my-6" />
      <h1 className="font-bold text-2xl  group-hover:text-primary my-2">
        Your forms
      </h1>
      <Separator className="my-6" />
      <CreateForm />
    </div>
  )
}
