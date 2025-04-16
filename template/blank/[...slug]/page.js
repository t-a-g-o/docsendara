import DocsLayout from '../DocsLayout';
import DocsContent from '../DocsContent';
import { fetchDoc } from '../utils/fetchDocs';
import docsConfig from '../utils/docsConfig';

export async function generateStaticParams() {
  return Object.keys(docsConfig.docsPaths).map((path) => ({
    slug: path.split('/'),
  }));
}

export default async function DocsendaraDocPage({ params }) {
  const resolvedParams = await params;
  const path = resolvedParams.slug.join('/');
  try {
    const { content, metadata } = await fetchDoc(path);
    return (
      <DocsLayout>
        <DocsContent content={content} slug={path} pageMetadata={metadata} />
      </DocsLayout>
    );
  } catch (error) {
    return (
      <DocsLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="bg-gradient-to-b from-red-900/80 to-black/70 border border-red-400/30 rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
            <div className="flex flex-col items-center gap-3">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-400 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
              </svg>
              <h2 className="text-xl font-semibold text-red-200 mb-2">Unable to Load Documentation</h2>
              <p className="text-red-100 mb-2">{error.message}</p>
              <ul className="text-sm text-red-100 text-left list-disc list-inside space-y-1">
                <li>Check that the file exists in your GitHub repo and matches the sidebar path.</li>
                <li>Make sure your <code>NEXT_PUBLIC_GITHUB_TOKEN</code> is set and valid.</li>
                <li>Verify your <code>docsConfig.js</code> <b>github</b> settings (owner, repo, branch, directory).</li>
                <li>If using a private repo, ensure your token has correct permissions.</li>
              </ul>
              <div className="mt-4 text-xs text-red-300">See <b>Setup & Config</b> in the docs for more help.</div>
            </div>
          </div>
        </div>
      </DocsLayout>
    );
  }
}
