import React, { PropsWithChildren, ReactNode } from "react"

interface Props extends PropsWithChildren {}

export default function layout({ children }: Props) {
  return <div>{children}</div>
}
