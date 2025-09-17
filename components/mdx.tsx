"use client";

import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";

function CustomLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  if (!href) return <a {...props}>{children}</a>;

  if (href.startsWith("/")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function HeadingWithId({
  level,
  children,
}: {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
}) {
  const slug = String(children)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");

  const Tag = level;
  return <Tag id={slug}>{children}</Tag>;
}

function Paragraph({ children }: { children: ReactNode }) {
  return <p style={{ lineHeight: "1.7em", margin: "1em 0" }}>{children}</p>;
}

function Pre(props: any) {
  return <pre style={{ background: "#f4f4f4", padding: "1em" }} {...props} />;
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code
      style={{
        background: "#eee",
        padding: "2px 4px",
        borderRadius: "4px",
        fontSize: "0.9em",
      }}
    >
      {children}
    </code>
  );
}

const components = {
  a: CustomLink,
  p: Paragraph,
  h1: (props: any) => <HeadingWithId level="h1" {...props} />,
  h2: (props: any) => <HeadingWithId level="h2" {...props} />,
  h3: (props: any) => <HeadingWithId level="h3" {...props} />,
  h4: (props: any) => <HeadingWithId level="h4" {...props} />,
  h5: (props: any) => <HeadingWithId level="h5" {...props} />,
  h6: (props: any) => <HeadingWithId level="h6" {...props} />,
  pre: Pre,
  code: Code,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export default function CustomMDX(props: CustomMDXProps) {
  return <MDXRemote {...props} components={props.components || {}} />;
};
