# GitHub Integration for Docsendara

Docsendara fetches and renders documentation directly from your GitHub repository. This guide explains how to configure your repo, branch, directory, and authentication for a seamless experience.

## 1. Choose Your Repository
- You can use any public or private GitHub repository.
- Docs can be at the root or in a subdirectory (e.g., `/docs` or `/documentation`).

## 2. Configure Branch and Directory
- **Branch:** Set the `branch` in your `docsConfig.js` (commonly `main` or `master`).
- **Directory:** If your docs are in a subfolder, set the `directory` (e.g., `documentation`). Leave blank if docs are at the repo root.

## 3. Generate a GitHub Token
- Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens).
- Click **Generate new token**.
- Select `repo` (for private repos) and `public_repo` scopes.
- Copy the token and add it to your environment as `NEXT_PUBLIC_GITHUB_TOKEN`.

## 4. Update Your Config
Edit `src/app/utils/docsConfig.js`:

```js
const docsConfig = {
  github: {
    owner: 'your-github-username',
    repo: 'your-docs-repo',
    branch: 'main',
    directory: 'documentation', // or '' for root
    token: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  },
  // ...
};
```

## 5. Security Tips
- **Never** hard-code your token in public repos.
- Use environment variables for deployment.

---

For more details, see the [Setup & Config](./setup-configs.md) guide.
