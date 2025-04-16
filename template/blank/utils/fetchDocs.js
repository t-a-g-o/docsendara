import docsConfig from './docsConfig';

const RECENTLY_UPDATED_DAYS = 31;
const CACHE_DURATION = 5 * 60 * 1000; // 5 min

class DocsCache {
  constructor() {
    this.contentCache = new Map();
    this.commitsCache = null;
    this.lastFetch = 0;
  }

  async initialize() {
    if (this.needsRefresh()) {
      await this.refreshCache();
    }
  }

  needsRefresh() {
    return !this.commitsCache || Date.now() - this.lastFetch > CACHE_DURATION;
  }

  async refreshCache() {
    const { owner, repo, branch, token, directory } = docsConfig.github;
    // Fetch commits as before
    const commitsUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;
    const commitsResponse = await fetch(commitsUrl, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    if (!commitsResponse.ok) throw new Error('Failed to fetch commit history');
    const commits = await commitsResponse.json();
    this.commitsCache = new Map();
    for (const commit of commits) {
      const commitUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${commit.sha}`;
      const commitResponse = await fetch(commitUrl, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      if (commitResponse.ok) {
        const fullCommit = await commitResponse.json();
        for (const file of fullCommit.files || []) {
          if (!this.commitsCache.has(file.filename)) {
            const date = new Date(commit.commit.committer.date);
            this.commitsCache.set(file.filename, date);
          }
        }
      }
    }
    // Fetch all files in the repo or subdir recursively and cache .md files
    const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
    const treeResponse = await fetch(treeUrl, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    if (!treeResponse.ok) throw new Error('Failed to fetch repo tree');
    const tree = await treeResponse.json();
    this.contentCache.clear();
    // Filter for .md files in the correct directory (if set)
    let prefix = directory && directory.trim() !== '' ? directory.replace(/\/$/, '') + '/' : '';
    const mdFiles = (tree.tree || []).filter(
      (item) => item.type === 'blob' && item.path.endsWith('.md') && item.path.startsWith(prefix)
    );
    // Fetch and cache each .md file
    await Promise.all(
      mdFiles.map(async (item) => {
        const contentUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${item.path}`;
        const contentResponse = await fetch(contentUrl, {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            Accept: 'application/vnd.github.v3.raw',
          },
        });
        if (contentResponse.ok) {
          // Strip prefix for cache key if directory is set
          let cacheKey = prefix ? item.path.substring(prefix.length) : item.path;
          this.contentCache.set(cacheKey.replace(/^\//, ''), await contentResponse.text());
        }
      })
    );
    this.lastFetch = Date.now();
  }

  async getContent(path) {
    if (this.needsRefresh()) await this.refreshCache();
    if (!this.contentCache.has(path)) {
      const { owner, repo, token } = docsConfig.github;
      // Support subdirectory if set in docsConfig.github.directory
      let fullPath = path;
      if (docsConfig.github.directory && docsConfig.github.directory.trim() !== '') {
        fullPath = docsConfig.github.directory.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
      }
      const contentUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${fullPath}`;
      console.log('[Docsendara] Fetching content:', { path, contentUrl });
      const contentResponse = await fetch(contentUrl, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          Accept: 'application/vnd.github.v3.raw',
        },
      });
      console.log('[Docsendara] GitHub API response:', {
        status: contentResponse.status,
        ok: contentResponse.ok,
      });
      if (!contentResponse.ok) throw new Error(`Failed to fetch content: ${path}`);
      const content = await contentResponse.text();
      this.contentCache.set(path, content);
    }
    return this.contentCache.get(path);
  }

  getLastCommitDate(path) {
    if (this.commitsCache?.has(path)) return this.commitsCache.get(path);
    for (const [cachedPath, date] of this.commitsCache?.entries() || []) {
      if (cachedPath.endsWith(path) || path.endsWith(cachedPath)) return date;
    }
    return null;
  }
}

const docsCache = new DocsCache();

function findDocPath(slug) {
  // Remove leading slashes for consistency
  let cleanSlug = slug.replace(/^\/+/, '');
  // Try to match with or without .md extension
  for (const category of docsConfig.docsPaths) {
    for (const page of category.children) {
      let pagePath = page.path.replace(/^\/+/, '');
      if (pagePath === cleanSlug || pagePath === cleanSlug + '.md') {
        return pagePath;
      }
      // If config omits .md but file exists with .md, prefer that
      if (!cleanSlug.endsWith('.md') && pagePath === cleanSlug + '.md') {
        return pagePath;
      }
    }
  }
  // If not found in config, try appending .md
  if (!cleanSlug.endsWith('.md')) {
    return cleanSlug + '.md';
  }
  return cleanSlug;
}

export async function fetchDoc(path) {
  // Use the helper to resolve the GitHub path
  let docPath = findDocPath(path);
  console.log('[Docsendara] fetchDoc', { path, resolvedDocPath: docPath });
  await docsCache.initialize();
  // If the first attempt fails, try again with .md if not present
  try {
    const content = await docsCache.getContent(docPath);
    const lastCommitDate = docsCache.getLastCommitDate(docPath);
    let metadata = { ...(docsConfig.pageMetadata[path] || {}) };
    if (lastCommitDate) {
      const daysSinceUpdate =
        (new Date().getTime() - lastCommitDate.getTime()) / (1000 * 60 * 60 * 24);
      metadata = {
        ...metadata,
        lastUpdated: lastCommitDate.toISOString(),
        isRecentlyUpdated: daysSinceUpdate <= RECENTLY_UPDATED_DAYS,
        daysSinceUpdate: parseFloat(daysSinceUpdate.toFixed(1)),
      };
    }
    return { content, metadata };
  } catch (e) {
    if (!docPath.endsWith('.md')) {
      docPath = docPath + '.md';
      console.log('[Docsendara] Retrying fetch with .md extension:', docPath);
      const content = await docsCache.getContent(docPath);
      const lastCommitDate = docsCache.getLastCommitDate(docPath);
      let metadata = { ...(docsConfig.pageMetadata[path] || {}) };
      if (lastCommitDate) {
        const daysSinceUpdate =
          (new Date().getTime() - lastCommitDate.getTime()) / (1000 * 60 * 60 * 24);
        metadata = {
          ...metadata,
          lastUpdated: lastCommitDate.toISOString(),
          isRecentlyUpdated: daysSinceUpdate <= RECENTLY_UPDATED_DAYS,
          daysSinceUpdate: parseFloat(daysSinceUpdate.toFixed(1)),
        };
      }
      return { content, metadata };
    }
    throw e;
  }
}

export async function fetchDocsIndex() {
  return docsConfig.docsPaths;
}
