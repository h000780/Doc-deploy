"use client"

import { useEffect, useRef } from "react"

interface DiagramProps {
  title?: string
  description?: string
  children: string
}

export function Diagram({ title, description, children }: DiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadMermaid = async () => {
      try {
        const mermaid = (await import("mermaid")).default
        mermaid.initialize({
          startOnLoad: true,
          theme: "default",
          themeVariables: {
            primaryColor: "#f0f4f8",
            primaryTextColor: "#1a1a1a",
            primaryBorderColor: "#d1d5db",
            lineColor: "#6b7280",
            secondaryColor: "#e0e7ff",
            tertiaryColor: "#fef3c7",
            fontSize: "14px",
          },
        })

        if (containerRef.current) {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
          const { svg } = await mermaid.render(id, children)
          containerRef.current.innerHTML = svg
        }
      } catch (error) {
        console.error("Error rendering diagram:", error)
      }
    }

    loadMermaid()
  }, [children])

  return (
    <div className="my-6 overflow-hidden rounded-lg border bg-muted/30">
      {(title || description) && (
        <div className="border-b bg-muted/50 px-4 py-3">
          {title && (
            <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          )}
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="flex items-center justify-center p-6">
        <div ref={containerRef} className="w-full overflow-x-auto" />
      </div>
    </div>
  )
}
