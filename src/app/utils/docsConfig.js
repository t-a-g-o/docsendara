import { Plug, RocketIcon } from 'lucide-react';

// docsConfig controls how your documentation site sources, organizes, and displays docs content.
// Each section below is explained in detail to help you customize it for your own project.
const docsConfig = {
  // Navigation bar text settings
  navBarText: {
    titleBread: 'Docsendara Engine',
    headerBread: 'Docs',
  },
  // GitHub repository settings for sourcing documentation content
  github: {
    // GitHub username or organization that owns the repository
    owner: 't-a-g-o',
    // Name of the repository containing your docs
    repo: 'docsendara',
    // Branch to pull docs from (e.g., 'main' or 'master')
    branch: 'main',
    // (Optional) Subdirectory within the repo where docs are stored. Leave '' if docs are at the root.
    directory: 'documentation',
    // GitHub token for accessing private repositories or increasing API rate limits. Preferably set via environment variable for security.
    token: process.env.NEXT_PUBLIC_GITHUB_TOKEN || '',
  },
  // Default author information used when no author is specified for a page
  defaultAuthor: {
    // Display name of the default author
    name: 'tago',
    // GitHub username of the default author
    github: 't-a-g-o',
  },
  // Path to the main index page of your documentation
  indexPage: '/index',
  // Sidebar navigation structure for your docs
  docsPaths: [
    {
      // Category label shown in the sidebar
      label: 'Getting Started',
      // (Optional) Icon component for the category
      icon: RocketIcon,
      // (Optional) Tailwind CSS color class for the icon
      iconColor: 'text-blue-500',
      // List of pages under this category
      children: [
        // Do not add a trailing .md extension to the path
        { label: 'Github Configuration', path: '/getting-started/github' },
        { label: 'Setup & Config', path: '/getting-started/setup-configs' },
        { label: 'Authors & Contributors', path: '/getting-started/authors-contributors' },
      ],
    },
    {
      label: 'Integrations',
      icon: Plug,
      iconColor: 'text-green-500',
      children: [
        { label: 'Netlify', path: '/integration/netlify' },
        { label: 'Vercel', path: '/integration/vercel' },
      ],
    },
    // Add more categories and pages as needed
  ],
  // Per-page metadata such as author and contributors
  // If no author is specified for a page, defaultAuthor will be used
  pageMetadata: {
    'getting-started/authors-contributors': {
      // List of contributors to the page
      contributors: [{ name: 'Jane', github: 'jane' }],
      // Main author of the page
      authors: [{ name: 'John', github: 'johndoe' }, { name: 'tago', github: 't-a-g-o' }],
    },
  },
};

export default docsConfig;
