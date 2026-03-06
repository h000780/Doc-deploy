"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  className?: string
}

export function CodeBlock({ code, language = "typescript", title, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("rounded-lg overflow-hidden bg-code-bg border border-border", className)}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <span className="text-xs text-muted-foreground uppercase">{language}</span>
        </div>
      )}
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 rounded-md bg-muted/20 hover:bg-muted/40 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4 text-code-foreground/60" />
          )}
        </button>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono text-code-foreground leading-relaxed whitespace-pre">
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}
