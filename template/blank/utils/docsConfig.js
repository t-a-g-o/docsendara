import { Plug, RocketIcon } from 'lucide-react';

// docsConfig controls how your documentation site sources, organizes, and displays docs content.
// Each section below is explained in detail to help you customize it for your own project.
const docsConfig = {
  // Navigation bar text settings
  navBarText: {
    titleBread: '',
    headerBread: 'Docs',
  },
  // GitHub repository settings for sourcing documentation content
  github: {
    // GitHub username or organization that owns the repository
    owner: '',
    // Name of the repository containing your docs
    repo: '',
    // Branch to pull docs from (e.g., 'main' or 'master')
    branch: 'main',
    // (Optional) Subdirectory within the repo where docs are stored. Leave '' if docs are at the root.
    directory: '',
    // GitHub token for accessing private repositories or increasing API rate limits. Preferably set via environment variable for security.
    token: process.env.NEXT_PUBLIC_GITHUB_TOKEN || '',
  },
  // Default author information used when no author is specified for a page
  defaultAuthor: {
    // Display name of the default author
    name: '',
    // GitHub username of the default author
    github: '',
  },
  // Path to the main index page of your documentation
  indexPage: '/index',
  // Sidebar navigation structure for your docs
  docsPaths: [
    // Add your categories and pages here. If you forgot how they are formatted check the default config
],
  // Per-page metadata such as author and contributors
  // If no author is specified for a page, defaultAuthor will be used
  pageMetadata: {},
};

export default docsConfig;
