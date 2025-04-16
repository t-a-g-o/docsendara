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
        <div className="text-red-500 font-bold p-8">
          Failed to load documentation page: {error.message}
        </div>
      </DocsLayout>
    );
  }
}
