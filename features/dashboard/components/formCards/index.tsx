import { formatDistance } from "date-fns"
import Link from "next/link"
import { LuView } from "react-icons/lu"
import { FaEdit, FaWpforms } from "react-icons/fa"
import { BiSolidRightArrowAlt } from "react-icons/bi"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui"
import { Badge } from "@/components/ui/badge"
import { Form } from "@prisma/client"

const mockObject = {
  id: 1,
  content: "Wassim Fake Note",
  description: "wassim fake note description",
  createdAt: 23423423,
  name: "Note",
  published: true,
  shareUrl: "https:localhost:3000",
  submissions: 34,
  userId: 23344,
  vistits: 34,
}

export async function FormCards() {
  const forms = [mockObject, mockObject, mockObject, mockObject]
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  )
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {/* {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })} */}
          {form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.vistits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/forms/${form.id}`}>
              View submissions <BiSolidRightArrowAlt />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button
            asChild
            variant={"secondary"}
            className="w-full mt-2 text-md gap-4"
          >
            <Link href={`/builder/${form.id}`}>
              Edit form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
