import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

export default function PageLayout({ children, className }: PageLayoutProps) {
  return <div className={cn("w-full", className)}>{children}</div>
}
