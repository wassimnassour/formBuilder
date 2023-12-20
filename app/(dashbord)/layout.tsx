import { Header } from "@/components/header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <Header />
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  )
}
