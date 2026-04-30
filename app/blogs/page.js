import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import blogs from '../../writing/blogs';

export const metadata = {
    title: 'Blogs | AB Portfolio Website',
    description: 'Blog posts by Aditya Bang about software, design, and portfolio projects.',
};

const Blogs = () => {
    return (
        <div className="flex h-screen flex-col p-5">
            <Navbar />

            <div className="mt-5 flex min-h-0 grow flex-col rounded-lg bg-gray-900 p-5 text-gray-300">
                <div className="flex flex-row items-center justify-center gap-5 pr-5 pl-5">
                    <div className="h-[1px] flex-grow rounded-full bg-[#3b426b]"></div>
                    <p className="text-4xl uppercase text-white">Blogs</p>
                    <div className="h-[1px] flex-grow rounded-full bg-[#3b426b]"></div>
                </div>

                <div className="mt-3 grid min-h-0 gap-5 overflow-auto pr-4 scrollbar md:grid-cols-2 xl:grid-cols-3">
                    {blogs.map((blog) => {
                        const cardDescription = blog.descriptionCard || blog.description;

                        return (
                            <Link
                                key={blog.slug}
                                href={`/blogs/${blog.slug}`}
                                className="group flex h-full flex-col rounded-xl border border-[#3b426b] bg-slate-950 p-5 transition-colors hover:border-blue-400 hover:bg-slate-900"
                            >
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag) => (
                                        <span key={tag} className="rounded-full border border-blue-400/50 px-3 py-1 text-xs uppercase tracking-wide text-blue-200">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-5 flex grow flex-col gap-3">
                                    <h2 className="text-2xl font-bold text-white transition-colors group-hover:text-blue-200">
                                        {blog.title}
                                    </h2>
                                    {cardDescription && <p className="leading-7 text-gray-400">{cardDescription}</p>}
                                </div>

                                <div className="mt-6 flex items-center justify-between border-t border-[#3b426b] pt-4 text-sm uppercase tracking-[0.2em] text-gray-500">
                                    <span>{blog.date}</span>
                                    <span>{blog.readTime}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
