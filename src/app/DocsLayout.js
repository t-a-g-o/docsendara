'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import docsConfig from './utils/docsConfig';

export default function DocsLayout({ children }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Main Content */}
      <div className="">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="flex h-14 items-center justify-between">
              <div className="flex items-center space-x-4">
                <a
                  href="/"
                  className="flex items-center space-x-2 text-white hover:text-white/90 transition-colors"
                >
                  <span className="font-semibold hidden sm:inline-block">{docsConfig.navBarText.titleBread}</span>
                </a>
                <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
                  <span>/</span>
                  <span className="text-white/90">{docsConfig.navBarText.headerBread}</span>
                  {pathname
                    .split('/')
                    .filter(Boolean)
                    .map((part, index) => {
                      if (index === 0 && part.toLowerCase() === 'docsendara') return null;
                      const formattedPart = part
                        .split('-')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                      return (
                        <React.Fragment key={part}>
                          <span>/</span>
                          <span className="text-white/75">{formattedPart}</span>
                        </React.Fragment>
                      );
                    })}
                </nav>
              </div>
              <div className="hidden md:block flex-1" />
              <div className="flex items-center">
                <div className="hidden md:flex items-center divide-x divide-white/10">
                  {require('./utils/navConfig').default.map((btn, idx) => {
                    // Dynamic edit link logic
                    let href = btn.href;
                    if (btn.goToEditPage) {
                      const docsConfig = require('./utils/docsConfig').default;
                      const pathname =
                        typeof window !== 'undefined' ? window.location.pathname : '';
                      let relPath = pathname.replace(/^\/docsendara/, '');
                      if (relPath === '' || relPath === '/') relPath = '/index';
                      relPath = relPath.replace(/\/$/, '');

                      // Find the page in docsPaths
                      let githubPath = '';
                      for (const category of docsConfig.docsPaths) {
                        for (const page of category.children) {
                          // Match ignoring leading slash and with/without .md
                          let pagePath = page.path.replace(/^\/+/, '');
                          let relPathClean = relPath.replace(/^\/+/, '');
                          if (
                            pagePath === relPathClean ||
                            pagePath === relPathClean + '.md' ||
                            pagePath + '.md' === relPathClean
                          ) {
                            githubPath = pagePath.endsWith('.md') ? pagePath : pagePath + '.md';
                            break;
                          }
                        }
                        if (githubPath) break;
                      }

                      // Add directory prefix if set
                      const dir =
                        docsConfig.github.directory && docsConfig.github.directory.trim() !== ''
                          ? docsConfig.github.directory.replace(/\/$/, '') + '/'
                          : '';

                      if (githubPath) {
                        href = `https://github.com/${docsConfig.github.owner}/${docsConfig.github.repo}/blob/${docsConfig.github.branch}/${dir}${githubPath}`;
                      } else {
                        href = `https://github.com/${docsConfig.github.owner}/${docsConfig.github.repo}`;
                      }
                    }
                    const Icon = btn.icon;
                    return (
                      <div className="px-4" key={btn.label}>
                        <a
                          href={href}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white/90 transition-colors rounded-md hover:bg-white/5"
                          target={btn.target || undefined}
                          rel={btn.target === '_blank' ? 'noopener noreferrer' : undefined}
                        >
                          {Icon && <Icon className="w-4 h-4" />}
                          <span>{btn.label}</span>
                        </a>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="md:hidden inline-flex items-center justify-center p-2 text-gray-400 hover:text-white/90 transition-colors rounded-md hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/20"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  <span>{isMobileMenuOpen ? '✕' : '☰'}</span>
                </button>
              </div>
            </div>
            {/* Mobile menu */}
            <div
              className={clsx(
                'md:hidden',
                'transition-all duration-200 ease-in-out',
                isMobileMenuOpen
                  ? 'h-auto py-4 opacity-100'
                  : 'h-0 py-0 opacity-0 pointer-events-none'
              )}
            >
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent"
                />
              </div>
              <div className="text-sm text-gray-400 mb-4">
                <span className="text-white/90">Docs</span>
                {pathname
                  .split('/')
                  .filter(Boolean)
                  .map((part, index) => {
                    if (index === 0 && part.toLowerCase() === 'docsendara') return null;
                    const formattedPart = part
                      .split('-')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ');
                    return (
                      <React.Fragment key={part}>
                        <span className="mx-2">/</span>
                        <span className="text-white/75">{formattedPart}</span>
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          </div>
        </header>
        <div className="container flex-1 md:grid md:grid-cols-[250px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 min-h-[calc(100vh-3.5rem)]">
          <aside
            className={clsx(
              isMobileMenuOpen
                ? 'fixed inset-0 top-14 z-50 bg-black md:relative md:inset-auto md:top-auto md:z-auto md:bg-transparent'
                : 'hidden md:block'
            )}
          >
            <div className="sticky top-14 overflow-y-auto scrollbar-hide p-12 max-h-[calc(100vh-3.5rem)] space-y-8">
              <nav className="space-y-6">
                {docsConfig.docsPaths.map((category) => (
                  <div key={category.label} className="space-y-3">
                    <div className="flex items-center gap-2">
                      {category.icon ? (
                        <category.icon className={clsx('w-4 h-4', category.iconColor || '')} />
                      ) : null}
                      <h4 className="font-display text-sm font-semibold text-white/90 uppercase tracking-wider">
                        {category.label}
                      </h4>
                    </div>
                    <div className="flex flex-col space-y-1 relative">
                      {category.children.map((page) => {
                        const isActive = pathname === page.path;
                        return (
                          <Link
                            key={page.path}
                            href={page.path}
                            className={clsx(
                              'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                              isActive
                                ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-white'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span
                              className={clsx(
                                'absolute left-0 h-6 w-0.5 rounded-full bg-gradient-to-b from-blue-500 to-purple-500 transition-all duration-200',
                                isActive ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                            {page.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </aside>
          <main className="relative py-6 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full min-w-0">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
