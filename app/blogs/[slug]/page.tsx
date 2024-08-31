import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import GiscusComment from "@/app/components/giscus";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "nabil.top",
    template: "%s | nabil.top",
  },
  description: "",
};

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allBlogs
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const blog = allBlogs.find((blog) => blog.slug === slug);

  if (!blog) {
    notFound();
  }

  metadata.description = blog.description;

  const views =
    (await redis.get<number>(["pageviews", "blogs", slug].join(":"))) ?? 0;

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header blog={blog} views={views} />
      <ReportView slug={blog.slug} />

      <article className="px-4 py-8 max-w-4xl mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={blog.body.code} />

        <div className="h-16"></div>

        <GiscusComment term={blog.title} />
      </article>
    </div>
  );
}
