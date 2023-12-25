import { Header } from "@/components/header"
import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {}

export default function layout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
