"use client"

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  
  const processedContent = content?.replace(/\\n/g, '\n') || ""

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <div className="rounded-md overflow-hidden my-4 border border-border/50">
                <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border/50 text-xs text-muted-foreground font-mono">
                  <span>{match[1]}</span>
                </div>
                <SyntaxHighlighter
                  {...props}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ margin: 0, borderRadius: 0 }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code {...props} className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary font-bold">
                {children}
              </code>
            )
          },
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-primary tracking-tight" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2 border-border/50" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 space-y-2 mb-4 marker:text-primary" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 space-y-2 mb-4 marker:text-primary" {...props} />,
          p: ({node, ...props}) => <p className="leading-7 mb-4 text-muted-foreground" {...props} />,
          a: ({node, ...props}) => <a className="text-primary hover:underline font-medium underline-offset-4" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground my-6 bg-muted/20 py-2 rounded-r" {...props} />,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  )
}