"use client"

import { createFormSchema, createFormSchemaType } from "@/schemas/createForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ImSpinner2 } from "react-icons/im"

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// import { CreateForm } from "@/actions/form";
import { BsFileEarmarkPlus } from "react-icons/bs"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks"

function CreateForm() {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<createFormSchemaType>({
    resolver: zodResolver(createFormSchema),
  })

  function CreateForm() {
    return 2
  }

  async function onSubmit(values: createFormSchemaType) {
    try {
      // const formId = await CreateForm()
      toast({
        title: "Success",
        description: "Form created successfully",
      })
      // router.push(`/builder/${2}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed "
        >
          <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            Create new form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="w-full mt-4"
          >
            {!form.formState.isSubmitting && <span>Save</span>}
            {form.formState.isSubmitting && (
              <ImSpinner2 className="animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { CreateForm }
