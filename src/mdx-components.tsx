import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import { ArrowUpRight } from 'lucide-react';
import { isExternalHref } from '~/lib/href';

const components = {
  h1: ({ children, ...props }) => (
    <h1 className="mt-12 font-serif text-xl first:mt-0" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="mt-12 font-serif text-lg first:mt-0" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mt-10 font-serif text-base first:mt-0" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mt-8 font-serif text-sm first:mt-0" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="mt-6 font-serif text-sm/8 first:mt-0" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mt-6 flex list-disc flex-col gap-2 pl-5 font-serif text-sm/8" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mt-6 flex list-decimal flex-col gap-2 pl-5 font-serif text-sm/8" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-1" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="text-foreground/70 mt-8 border-l pl-5 font-serif text-sm/8" {...props}>
      {children}
    </blockquote>
  ),
  hr: (props) => <hr className="my-12 border-t" {...props} />,
  strong: ({ children, ...props }) => (
    <strong className="font-bold" {...props}>
      {children}
    </strong>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-muted text-foreground/80 rounded-sm px-1.5 py-0.5 font-sans text-[0.85em]"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="bg-muted mt-6 overflow-x-auto rounded-lg p-4 font-sans text-xs/6 [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    >
      {children}
    </pre>
  ),
  table: ({ children, ...props }) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse font-serif text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th className="text-foreground/60 border-b px-3 py-2 text-left font-normal" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border-b px-3 py-2 align-top" {...props}>
      {children}
    </td>
  ),
  a: ({ children, href, ...props }) => {
    if (!href) {
      return <span {...props}>{children}</span>;
    }

    if (isExternalHref(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-dotted hover:opacity-60"
          {...props}
        >
          {children}
          <ArrowUpRight className="ml-0.5 inline-block size-3.5 translate-y-[-1px]" />
        </a>
      );
    }

    return (
      <Link href={href} className="underline-dotted hover:opacity-60" {...props}>
        {children}
      </Link>
    );
  },
  img: (props) => (
    <Image
      sizes="(min-width: 672px) 672px, 100vw"
      width={1600}
      height={900}
      className="mt-8 h-auto w-full rounded-lg"
      {...(props as ImageProps)}
    />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
