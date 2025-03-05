import type { PropsWithChildren, ReactNode } from "react"
import { Button } from "./button"
import { href, useNavigate } from "react-router";

export function Hero({ title, desc, startText = "スタート", onClickStart, children }: PropsWithChildren<{
  title: ReactNode,
  desc?: ReactNode,
  startText?: string
  onClickStart?: () => void
}>) {
  const navigate = useNavigate();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              {title}
            </h1>
            {desc && <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              {desc}
            </p>}
          </div>

          {children}

          {onClickStart && <Button onClick={onClickStart}>{startText}</Button>}
        </div>
      </div>
    </section>
  )
}
