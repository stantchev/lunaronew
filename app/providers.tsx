'use client';

import { MDXProvider } from '@mdx-js/react';

const components = {
  h2: (props: any) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
};

export function Providers({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
