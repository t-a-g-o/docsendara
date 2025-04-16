# Setting Authors & Contributors in Docsendara

Docsendara lets you display author and contributor information for each documentation page. This is managed via the `pageMetadata` section in your `docsConfig.js` file.

## How It Works
- **Per-page metadata:** You can specify an `author` and a list of `contributors` for any doc page using its path as the key.
- **Default author:** If a page does not have an explicit author, the `defaultAuthor` from the config is used.
- **GitHub integration:** Author and contributor profiles link to their GitHub accounts and display their avatars.

## Example Configuration
Below is a real config snippet from your project:

```js
// Per-page metadata such as author and contributors
// If no author is specified for a page, defaultAuthor will be used
pageMetadata: {
  'getting-started/github': {
    // List of contributors to the page
    contributors: [{ name: 'Jane', github: 'jane' }],
    // Main author of the page
    author: { name: 'John', github: 'johndoe' },
  },
  'getting-started/setup-configs': {
    // List of contributors to the page
    contributors: [{ name: 'Jane', github: 'jane' }],
    // Main author of the page
    author: { name: 'John', github: 'johndoe' },
  },
},
```

## How to Add or Edit Authors/Contributors
1. **Find the page path:** Use the relative path (without leading slash) as the key, e.g. `getting-started/github`.
2. **Set the author:**
   ```js
   author: { name: 'John', github: 'johndoe' }
   ```
   - `name`: Display name
   - `github`: GitHub username (used for avatar and profile link)
3. **Add contributors:**
   ```js
   contributors: [
     { name: 'Jane', github: 'jane' },
     { name: 'Alex', github: 'alexdev' },
   ]
   ```
   - List as many contributors as needed.

## Tips
- If you omit the `author` for a page, the `defaultAuthor` from your config will be shown.
- Avatars and GitHub links are automatically rendered in the docs UI.
- Use meaningful names and valid GitHub usernames for best results.

## Where to Edit
- Open `src/app/utils/docsConfig.js` in your project.
- Edit the `pageMetadata` object as shown above.

---

This makes it easy to credit everyone who contributed to your documentation, and helps users know who to contact for each page!
