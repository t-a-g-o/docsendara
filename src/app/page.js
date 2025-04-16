import DocsLayout from './DocsLayout';
import DocsContent from './DocsContent';

import { fetchDoc } from './utils/fetchDocs';
import docsConfig from './utils/docsConfig';

export default async function DocsendaraHomePage() {
  // Fetch the index page content using the same logic as other docs
  const indexSlug = docsConfig.indexPage.replace(/^\//, '');
  const { content, metadata } = await fetchDoc(indexSlug);
  return (
    <DocsLayout>
      <DocsContent content={content} slug={indexSlug} pageMetadata={metadata} />
    </DocsLayout>
  );
}
