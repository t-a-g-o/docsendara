# Setting Up Docsendara

This guide walks you through configuring your Docsendara documentation engine for your project.

## 1. Project Structure
- Place all documentation Markdown files in your chosen directory (e.g., `/documentation` or `/docs`).
- Organize docs into subfolders as desired (e.g., `/getting-started/`, `/reference/`).

## 2. Edit `docsConfig.js`
Open `src/app/utils/docsConfig.js` and update the following:

### GitHub Settings
```js
  github: {
    owner: 'your-github-username',
    repo: 'your-docs-repo',
    branch: 'main',
    directory: 'documentation', // or '' for root
    token: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  },
```

### Navigation Bar Text
```js
  navBarText: {
    titleBread: 'Your Project',
    headerBread: 'Docs',
  },
```

### Sidebar Structure
Define your sidebar navigation in `docsPaths`:
```js
  docsPaths: [
    {
      label: 'Getting Started',
      icon: RocketIcon,
      iconColor: 'text-blue-500',
      children: [
        { label: 'Introduction', path: '/getting-started/introduction' },
        { label: 'Installation', path: '/getting-started/installation' },
      ],
    },
    // Add more categories as needed
  ],
```

### Author & Metadata
Optionally, set a default author and per-page metadata:
```js
  defaultAuthor: { name: 'Jane Doe', github: 'janedoe' },
  pageMetadata: {
    'getting-started/installation': {
      contributors: [{ name: 'John', github: 'johndoe' }],
      author: { name: 'Jane Doe', github: 'janedoe' },
    },
  },
```

## 3. Environment Variables
Set your GitHub token in `.env.local`:
```
NEXT_PUBLIC_GITHUB_TOKEN=ghp_xxxxyourtokenherexxxx
```

## 4. Run the App
- Install dependencies: `npm install`
- Start the dev server: `npm run dev`
- Visit [http://localhost:3000](http://localhost:3000)

## 5. Best Practices
- Keep `docsConfig.js` up to date as your docs grow.
- Use meaningful labels and paths.
- Use environment variables for sensitive data.

---

For GitHub integration, see the [GitHub Setup](./github.md) guide.
