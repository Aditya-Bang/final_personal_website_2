"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import katex from 'katex';
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

const isEscaped = (text, index) => {
    let slashCount = 0;

    for (let position = index - 1; position >= 0 && text[position] === '\\'; position -= 1) {
        slashCount += 1;
    }

    return slashCount % 2 === 1;
};

const findInlineMathDelimiter = (text, startIndex) => {
    for (let index = startIndex; index < text.length; index += 1) {
        if (text[index] === '$' && text[index + 1] !== '$' && !isEscaped(text, index)) {
            return index;
        }
    }

    return -1;
};

const splitInlineMath = (text) => {
    const segments = [];
    let cursor = 0;

    while (cursor < text.length) {
        const start = findInlineMathDelimiter(text, cursor);

        if (start === -1) {
            segments.push({ type: 'text', text: text.slice(cursor) });
            break;
        }

        const end = findInlineMathDelimiter(text, start + 1);

        if (end === -1) {
            segments.push({ type: 'text', text: text.slice(cursor) });
            break;
        }

        if (start > cursor) {
            segments.push({ type: 'text', text: text.slice(cursor, start) });
        }

        segments.push({ type: 'math', math: text.slice(start + 1, end) });
        cursor = end + 1;
    }

    return segments;
};

const getMathMarkup = (math, displayMode = false) => ({
    __html: katex.renderToString(math, {
        displayMode,
        throwOnError: false,
    }),
});

const MathInline = ({ math }) => (
    <span
        className="mx-1 text-blue-100"
        dangerouslySetInnerHTML={getMathMarkup(math)}
    />
);

const MathBlock = ({ block }) => (
    <figure id={block.id} className="scroll-mt-8 rounded-xl border border-[#3b426b] bg-slate-950/70 px-4 py-5">
        <div
            className="overflow-x-auto text-center text-blue-100 scrollbar"
            dangerouslySetInnerHTML={getMathMarkup(block.math || block.equation, true)}
        />
        {block.caption && (
            <figcaption className="mt-4 border-t border-[#3b426b] pt-3 text-sm text-gray-400">
                {block.caption}
            </figcaption>
        )}
    </figure>
);

const renderTextWithMath = (text, keyPrefix) => (
    splitInlineMath(text).map((segment, index) => {
        if (segment.type === 'math') {
            return <MathInline key={`${keyPrefix}-math-${index}`} math={segment.math} />;
        }

        return <span key={`${keyPrefix}-text-${index}`}>{segment.text.replace(/\\\$/g, '$')}</span>;
    })
);

const InlineText = ({ parts }) => (
    <>
        {parts.map((part, index) => {
            if (part.math || part.equation) {
                return <MathInline key={`math-${index}`} math={part.math || part.equation} />;
            }

            if (part.href) {
                return (
                    <a
                        key={`${part.href}-${index}`}
                        href={part.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-300 underline decoration-blue-400/60 underline-offset-4 transition-colors hover:text-blue-200"
                    >
                        {renderTextWithMath(part.text, `link-${index}`)}
                    </a>
                );
            }

            return renderTextWithMath(part.text, `text-${index}`);
        })}
    </>
);

const CodeBlock = ({ block }) => {
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const language = block.language === 'c++' ? 'cpp' : block.language;
    const wrapText = block.wrapText === true;
    const collapseAfterLines = block.collapseAfterLines || 24;
    const isCollapsible = block.collapsible !== false && block.code.split('\n').length > collapseAfterLines;
    const shouldCollapse = isCollapsible && !isExpanded;
    const codeTextStyles = {
        sm: {
            fontSize: '0.875rem',
            lineHeight: '1.75rem',
        },
        xs: {
            fontSize: '0.75rem',
            lineHeight: '1.5rem',
        },
        '2xs': {
            fontSize: '0.6875rem',
            lineHeight: '1.375rem',
        },
    };
    const codeTextStyle = codeTextStyles[block.textSize] || codeTextStyles.sm;

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
            <div className={block.caption ? 'border-b border-[#3b426b]' : ''}>
                <div className="relative">
                    <div
                        className="transition-[max-height]"
                        style={{
                            maxHeight: shouldCollapse ? (block.collapsedHeight || '28rem') : 'none',
                            overflow: shouldCollapse ? 'hidden' : 'visible',
                        }}
                    >
                        <SyntaxHighlighter
                            language={language}
                            style={oneDark}
                            wrapLongLines={wrapText}
                            customStyle={{
                                margin: 0,
                                padding: isCollapsible ? '1rem 1rem 4rem' : '1rem',
                                background: 'transparent',
                                overflowX: wrapText ? 'visible' : 'auto',
                            }}
                            codeTagProps={{
                                style: {
                                    ...codeTextStyle,
                                    whiteSpace: wrapText ? 'pre-wrap' : 'pre',
                                    wordBreak: wrapText ? 'break-word' : 'normal',
                                },
                            }}
                            className="scrollbar"
                        >
                            {block.code}
                        </SyntaxHighlighter>
                    </div>
                    {shouldCollapse && (
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
                    )}
                    {isCollapsible && (
                        <button
                            type="button"
                            onClick={() => setIsExpanded((current) => !current)}
                            className="absolute inset-x-0 bottom-6 z-10 mx-auto w-fit rounded-full border border-blue-400/70 bg-slate-950/95 px-3 py-1 text-sm text-blue-100 shadow-lg transition-colors hover:bg-blue-500 hover:text-white"
                        >
                            {isExpanded ? 'Show less' : 'Show more'}
                        </button>
                    )}
                </div>
            </div>
            {block.caption && (
                <figcaption className="px-4 py-3 text-sm text-gray-400">
                    {block.caption}
                </figcaption>
            )}
        </figure>
    );
};

const BlogArticle = ({ blog }) => {
    const outline = useMemo(() => buildOutline(blog.content), [blog.content]);
    const [isOutlineOpen, setIsOutlineOpen] = useState(true);
    const blogDescription = blog.descriptionBlog || blog.description;

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

        if (block.type === 'equation') {
            return <MathBlock key={block.id || `equation-${index}`} block={block} />;
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
        <div className={`grid h-full min-h-0 gap-5 ${isOutlineOpen ? 'lg:grid-cols-[280px_minmax(0,1fr)]' : 'lg:grid-cols-[72px_minmax(0,1fr)]'}`}>
            <aside className={`hidden min-h-0 rounded-lg border border-[#3b426b] bg-gray-900 text-gray-300 transition-all lg:sticky lg:top-0 lg:flex lg:h-full lg:flex-col lg:overflow-visible ${isOutlineOpen ? 'p-4' : 'p-3'}`}>
                <div className={`flex items-start ${isOutlineOpen ? 'justify-between gap-3' : 'justify-center'}`}>
                    {isOutlineOpen && (
                        <Link href="/blogs" className="text-sm text-blue-300 transition-colors hover:text-blue-200">
                            Back to blogs
                        </Link>
                    )}
                    <div className="group relative">
                        <button
                            type="button"
                            onClick={() => setIsOutlineOpen((current) => !current)}
                            aria-label={isOutlineOpen ? 'Collapse menu' : 'Expand menu'}
                            aria-expanded={isOutlineOpen}
                            aria-controls="blog-outline-nav"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#3b426b] text-blue-100 transition-colors hover:border-blue-400 hover:bg-slate-800 hover:text-white"
                        >
                            <span aria-hidden="true">{isOutlineOpen ? '<' : '>'}</span>
                        </button>
                        <span className={`pointer-events-none absolute top-1/2 z-[9999] hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-[#3b426b] bg-slate-950 px-2 py-1 text-xs text-gray-300 shadow-lg group-hover:block ${isOutlineOpen ? 'right-10' : 'left-10'}`}>
                            {isOutlineOpen ? 'Collapse menu' : 'Expand menu'}
                        </span>
                    </div>
                </div>

                {isOutlineOpen && (
                    <>
                        <div className="mt-5 flex flex-row items-center justify-center gap-3">
                            <div className="h-[1px] flex-grow rounded-full bg-[#3b426b]"></div>
                            <p className="whitespace-nowrap text-lg uppercase text-white">On This Page</p>
                            <div className="h-[1px] flex-grow rounded-full bg-[#3b426b]"></div>
                        </div>

                        <nav id="blog-outline-nav" className="mt-5 min-h-0 overflow-auto scrollbar">
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
                    </>
                )}
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
                        {blogDescription && <p className="text-lg leading-8 text-gray-300">{blogDescription}</p>}
                        <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                            {blog.date} | {blog.readTime}
                        </p>
                    </div>

                    {blog.heroImage && (
                        <figure className="overflow-hidden rounded-xl border border-[#3b426b] bg-slate-950">
                            <Image
                                src={blog.heroImage.src}
                                width={960}
                                height={540}
                                alt={blog.heroImage.alt}
                                priority
                                className="h-auto w-full"
                            />
                            {blog.heroImage.caption && (
                                <figcaption className="border-t border-[#3b426b] px-4 py-3 text-sm text-gray-400">
                                    {blog.heroImage.caption}
                                </figcaption>
                            )}
                        </figure>
                    )}

                    <div className="flex flex-col gap-6">
                        {blog.content.map(renderBlock)}
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogArticle;
