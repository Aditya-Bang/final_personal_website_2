"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const buildOutline = (content) => {
    const outline = [];

    content.forEach((block) => {
        if (block.type === 'heading') {
            outline.push({ ...block, children: [] });
        }

        if (block.type === 'subheading') {
            if (outline.length === 0) {
                outline.push({ id: block.id, text: 'Overview', children: [block] });
                return;
            }

            outline[outline.length - 1].children.push(block);
        }
    });

    return outline;
};

const InlineText = ({ parts }) => (
    <>
        {parts.map((part, index) => {
            if (part.href) {
                return (
                    <a
                        key={`${part.href}-${index}`}
                        href={part.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-300 underline decoration-blue-400/60 underline-offset-4 transition-colors hover:text-blue-200"
                    >
                        {part.text}
                    </a>
                );
            }

            return <span key={`text-${index}`}>{part.text}</span>;
        })}
    </>
);

const CodeBlock = ({ block }) => {
    const [copied, setCopied] = useState(false);
    const language = block.language === 'c++' ? 'cpp' : block.language;

    const copyCode = async () => {
        await navigator.clipboard.writeText(block.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
    };

    return (
        <figure id={block.id} className="scroll-mt-8 overflow-hidden rounded-xl border border-[#3b426b] bg-slate-950">
            <div className="flex items-center justify-between gap-3 border-b border-[#3b426b] bg-slate-900 px-4 py-3">
                <span className="text-sm uppercase tracking-[0.2em] text-blue-200">{block.language}</span>
                <button
                    type="button"
                    onClick={copyCode}
                    className="rounded-full border border-blue-400 px-3 py-1 text-sm text-blue-100 transition-colors hover:bg-blue-500 hover:text-white"
                >
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                }}
                codeTagProps={{
                    style: {
                        fontSize: '0.875rem',
                        lineHeight: '1.75rem',
                    },
                }}
                className="scrollbar"
            >
                {block.code}
            </SyntaxHighlighter>
            {block.caption && (
                <figcaption className="border-t border-[#3b426b] px-4 py-3 text-sm text-gray-400">
                    {block.caption}
                </figcaption>
            )}
        </figure>
    );
};

const BlogArticle = ({ blog }) => {
    const outline = useMemo(() => buildOutline(blog.content), [blog.content]);

    const renderBlock = (block, index) => {
        if (block.type === 'paragraph') {
            return (
                <p key={`paragraph-${index}`} className="text-lg leading-8 text-gray-300">
                    <InlineText parts={block.parts} />
                </p>
            );
        }

        if (block.type === 'heading') {
            return (
                <h2 key={block.id} id={block.id} className="scroll-mt-8 pt-4 text-3xl font-bold text-white">
                    {block.text}
                </h2>
            );
        }

        if (block.type === 'subheading') {
            return (
                <h3 key={block.id} id={block.id} className="scroll-mt-8 text-2xl font-bold text-blue-200">
                    {block.text}
                </h3>
            );
        }

        if (block.type === 'code') {
            return <CodeBlock key={block.id} block={block} />;
        }

        if (block.type === 'image') {
            return (
                <figure key={`${block.src}-${index}`} className="overflow-hidden rounded-xl border border-[#3b426b] bg-slate-950">
                    <Image
                        src={block.src}
                        width={960}
                        height={540}
                        alt={block.alt}
                        className="h-auto w-full"
                    />
                    <figcaption className="border-t border-[#3b426b] px-4 py-3 text-sm text-gray-400">
                        {block.caption}
                    </figcaption>
                </figure>
            );
        }

        return null;
    };

    return (
        <div className="grid h-full min-h-0 gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="hidden rounded-lg border border-[#3b426b] bg-gray-900 p-4 text-gray-300 scrollbar lg:sticky lg:top-0 lg:block lg:h-full lg:overflow-auto">
                <Link href="/blogs" className="text-sm text-blue-300 transition-colors hover:text-blue-200">
                    Back to blogs
                </Link>

                <div className="mt-5 flex flex-row items-center justify-center gap-3">
                    <div className="h-[1px] flex-grow rounded-full bg-[#3b426b]"></div>
                    <p className="text-lg uppercase text-white">On This Page</p>
                    <div className="h-[1px] flex-grow rounded-full bg-[#3b426b]"></div>
                </div>

                <nav className="mt-5">
                    <ul className="space-y-4 border-l border-[#3b426b] pl-4">
                        {outline.map((item) => (
                            <li key={item.id}>
                                <a href={`#${item.id}`} className="block text-blue-200 transition-colors hover:text-white">
                                    {item.text}
                                </a>
                                {item.children.length > 0 && (
                                    <ul className="mt-3 space-y-2 border-l border-slate-700 pl-4">
                                        {item.children.map((child) => (
                                            <li key={child.id}>
                                                <a href={`#${child.id}`} className="block text-sm text-gray-400 transition-colors hover:text-blue-200">
                                                    {child.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <article className="min-h-0 overflow-auto rounded-lg border border-[#3b426b] bg-gray-900 p-5 text-gray-300 scrollbar md:p-8">
                <div className="mx-auto flex max-w-4xl flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag) => (
                                <span key={tag} className="rounded-full border border-blue-400/60 px-3 py-1 text-sm uppercase tracking-wide text-blue-200">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl font-bold text-white md:text-6xl">{blog.title}</h1>
                        <p className="text-lg leading-8 text-gray-300">{blog.description}</p>
                        <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                            {blog.date} | {blog.readTime}
                        </p>
                    </div>

                    <figure className="overflow-hidden rounded-xl border border-[#3b426b] bg-slate-950">
                        <Image
                            src={blog.heroImage.src}
                            width={960}
                            height={540}
                            alt={blog.heroImage.alt}
                            priority
                            className="h-auto w-full"
                        />
                        <figcaption className="border-t border-[#3b426b] px-4 py-3 text-sm text-gray-400">
                            {blog.heroImage.caption}
                        </figcaption>
                    </figure>

                    <div className="flex flex-col gap-6">
                        {blog.content.map(renderBlock)}
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogArticle;
