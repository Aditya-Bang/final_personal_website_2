import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BlogArticle from '@/components/BlogArticle';
import blogs from '../../../writing/blogs.json';

export const generateStaticParams = () => {
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
};

export const generateMetadata = ({ params }) => {
    const blog = blogs.find((item) => item.slug === params.slug);

    if (!blog) {
        return {
            title: 'Blog Not Found | AB Portfolio Website',
        };
    }

    return {
        title: `${blog.title} | AB Portfolio Website`,
        description: blog.description,
    };
};

const BlogPost = ({ params }) => {
    const blog = blogs.find((item) => item.slug === params.slug);

    if (!blog) {
        notFound();
    }

    return (
        <div className="flex h-screen flex-col gap-5 p-5">
            <Navbar />
            <main className="min-h-0 grow">
                <BlogArticle blog={blog} />
            </main>
        </div>
    );
};

export default BlogPost;
