"use client";

import Giscus from "@giscus/react";

export default function GiscusComment({ term }: { term: string }) {
  return (
    <Giscus
      repo="nailanmnabil/nabil.top"
      repoId="R_kgDOMqyF3A"
      category="General"
      categoryId="DIC_kwDOMqyF3M4CiGnO"
      reactionsEnabled="1"
      emitMetadata="0"
      theme="light"
      lang="en"
      loading="lazy"
      mapping="specific"
      id="comments"
      term={term}
      inputPosition="top"
    />
  );
}
