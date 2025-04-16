import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styleConfig from './styleConfig';
import clsx from 'clsx';

export function extractHeadings(content) {
  const headings = [];
  const lines = content.split('\n');
  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      const title = line.replace('## ', '').trim();
      const id = title.toLowerCase().replace(/\s+/g, '-');
      headings.push({ title, id, level: 2 });
    } else if (line.startsWith('### ')) {
      const title = line.replace('### ', '').trim();
      const id = title.toLowerCase().replace(/\s+/g, '-');
      headings.push({ title, id, level: 3 });
    }
  });
  return headings;
}

export function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ node, ...props }) => (
          <h1
            className={clsx(
              styleConfig.font.sizes.h1,
              styleConfig.font.family,
              styleConfig.font.weights.bold,
              styleConfig.colors.text.primary,
              'mb-4 leading-tight'
            )}
            {...props}
          />
        ),
        h2: ({ node, ...props }) => (
          <h2
            id={props.children.toString().toLowerCase().replace(/\s+/g, '-')}
            className={clsx(
              styleConfig.font.sizes.h2,
              styleConfig.font.weights.semibold,
              styleConfig.colors.text.primary,
              'mt-12 mb-4 scroll-mt-24 flex items-center gap-2'
            )}
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <h3
            id={props.children.toString().toLowerCase().replace(/\s+/g, '-')}
            className={clsx(
              styleConfig.font.sizes.h3,
              styleConfig.font.weights.semibold,
              'text-white/90',
              'mt-8 mb-3 scroll-mt-24 flex items-center gap-2'
            )}
            {...props}
          />
        ),
        p: ({ node, ...props }) => (
          <p
            className={clsx(
              styleConfig.colors.text.secondary,
              'leading-relaxed mb-4 whitespace-normal break-words'
            )}
            {...props}
          />
        ),
        ul: ({ node, ...props }) => (
          <ul
            className={clsx(
              'my-6 ml-6 list-disc marker:text-gray-500 space-y-2',
              styleConfig.colors.text.secondary
            )}
            {...props}
          />
        ),
        ol: ({ node, ...props }) => (
          <ol
            className={clsx(
              'my-6 ml-6 list-decimal marker:text-gray-500 space-y-2',
              styleConfig.colors.text.secondary
            )}
            {...props}
          />
        ),
        li: ({ node, ...props }) => <li className={clsx('leading-relaxed')} {...props} />,
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          return !inline && match ? (
            <div className="relative group my-4 overflow-hidden">
              <div className="overflow-x-auto max-w-[calc(100vw-32px)] lg:max-w-[736px]">
                <SyntaxHighlighter
                  language={language}
                  style={vscDarkPlus}
                  className="!whitespace-pre !m-0 !p-4 !rounded-lg !bg-black/20"
                  customStyle={{ margin: 0, padding: 0, background: 'transparent' }}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            </div>
          ) : (
            <span className="relative rounded bg-white/5 px-[0.3rem] py-[0.2rem] font-mono text-sm text-gray-300">
              {children}
            </span>
          );
        },
        a: ({ node, ...props }) => (
          <a
            className="font-medium text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 transition-colors"
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props}
          >
            {props.children}
          </a>
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="mt-6 border-l-2 border-blue-500 pl-6 italic text-gray-300 mb-4"
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
