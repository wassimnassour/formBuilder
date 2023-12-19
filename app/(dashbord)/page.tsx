import { Separator } from "@/components/ui"
import { CardsStatsWrapper, CreateForm, FormCards } from "@/features/dashboard"

export default async function Index() {
  return (
    <div className=" pt-4  container xl:max-w-6xl px-4   mx-auto">
      <CardsStatsWrapper />
      <Separator className="my-6" />
      <h1 className="font-bold text-2xl  group-hover:text-primary my-2">
        Your forms
      </h1>
      <Separator className="my-6" />
      <div className="grid gric-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateForm />
        <FormCards />
      </div>
    </div>
  )
}
