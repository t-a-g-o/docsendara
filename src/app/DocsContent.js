'use client';

import React from 'react';
import { MarkdownRenderer, extractHeadings } from './utils/contentRenderer';
import clsx from 'clsx';
import styleConfig from './utils/styleConfig';
import docsConfig from './utils/docsConfig';

const DOCSVERSION = '1.0';

function TableOfContents({ content, pageMetadata }) {
  const headings = extractHeadings(content);
  if (headings.length === 0 && !pageMetadata) return null;
  // Ensure author always present
  let authors = pageMetadata?.authors;
  if (!authors || authors.length === 0) {
    // Try single author field
    if (pageMetadata?.author) {
      authors = [pageMetadata.author];
    } else {
      authors = [docsConfig.defaultAuthor];
    }
  }

  return (
<div className={clsx('hidden lg:block sticky w-72', styleConfig.spacing.sidebar)}>
      <div className={clsx(
        styleConfig.radius.card,
        styleConfig.colors.sidebar,
        'backdrop-blur-sm',
        styleConfig.colors.border,
        styleConfig.spacing.card,
        'space-y-6'
      )}>
        {/* Quick Info Section */}
        {pageMetadata && (
          <div className="space-y-4 pb-4 border-b border-white/10">
            {/* Author & Contributors */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                  Author{authors.length > 1 && 's'}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
              </div>
              <div className="flex flex-wrap gap-2">
                {authors.map((author, index) => (
                  <a
                    key={index}
                    href={`https://github.com/${author.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Author: ${author.name}`}
                    className={clsx(
                      'inline-flex items-center gap-1.5 px-2 py-1',
                      styleConfig.font.sizes.small,
                      'text-white/90 hover:text-white',
                      styleConfig.radius.badge,
                      styleConfig.colors.authorBadge,
                      'hover:from-purple-500/30 hover:to-purple-500/20',
                      styleConfig.transitions.default
                    )}
                  >
                    <img
                      src={`https://github.com/${author.github}.png`}
                      alt={author.name}
                      className="w-4 h-4 rounded-full ring-1 ring-purple-400/30"
                    />
                    {author.name}
                  </a>
                ))}
              </div>
              {pageMetadata.contributors?.length > 0 && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                      Contributor{pageMetadata.contributors.length > 1 && 's'}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pageMetadata.contributors.map((contributor, index) => (
                      <a
                        key={index}
                        href={`https://github.com/${contributor.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Contributor: ${contributor.name}`}
                        className="inline-flex items-center gap-1.5 px-2 py-1 text-xs text-white/70 hover:text-white/90 rounded-md bg-gradient-to-b from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10 transition-all duration-150"
                      >
                        <img
                          src={`https://github.com/${contributor.github}.png`}
                          alt={contributor.name}
                          className="w-4 h-4 rounded-full ring-1 ring-blue-400/30"
                        />
                        {contributor.name}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        {/* Table of Contents */}
        {headings.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-white/90">
              <span>On this page</span>
            </div>
            <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-16rem)] pr-2 scrollbar-hide">
              {headings.map((heading, index) => (
                <a
                  key={index}
                  href={`#${heading.id}`}
                  className={clsx(
                    'block transition-colors hover:text-white',
                    heading.level === 2
                      ? 'text-white/90 text-sm'
                      : 'text-white/70 text-sm pl-3 mt-1'
                  )}
                >
                  {heading.title}
                </a>
              ))}
            </nav>
          </div>
        )}
        <span className="relative group">
          <span className="text-[8px] uppercase tracking-wider text-white/50 font-medium">
            v{DOCSVERSION}
          </span>
        </span>
      </div>
    </div>
  );
}

export default function DocsContent({ content, className, slug, pageMetadata }) {
  return (
    <div className="flex justify-between items-start">
      <div className={clsx('w-full max-w-3xl overflow-hidden', className)}>
        <article className="relative">
          <MarkdownRenderer content={content} />
        </article>
      </div>
      <TableOfContents content={content} pageMetadata={pageMetadata} />
    </div>
  );
}
