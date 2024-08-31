import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import GiscusComment from "@/app/components/giscus";
import { Metadata } from "next";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
    lang: string;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
  const data = allBlogs
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
      lang: p.slug,
    }));

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params?.slug;
  const lang = params?.slug;
  const blog = allBlogs.find((blog) => blog.slug === slug && blog.lang == lang);

  if (!blog) {
    return {
      title: "Not Found | Nabil",
      description: "The blog post you are looking for was not found.",
    };
  }

  return {
    title: `${blog.title}`,
    description: blog.description,
  };
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const lang = params?.lang;
  const blog = allBlogs.find((blog) => blog.slug === slug && blog.lang == lang);

  if (!blog) {
    notFound();
  }

  const views =
    (await redis.get<number>(["pageviews", "blogs", slug].join(":"))) ?? 0;

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header blog={blog} views={views} lang={lang} />
      <ReportView slug={blog.slug} />

      <article className="px-4 py-8 max-w-4xl mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={blog.body.code} />

        <div className="h-16"></div>

        <GiscusComment term={blog.title} />
      </article>
    </div>
  );
}
