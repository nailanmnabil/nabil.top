import React from "react";
import { allBlogs } from "contentlayer/generated";
import { Navigation } from "../../components/nav";
import { Card } from "../../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import LanguageSwitcher from "@/app/components/langSwitcher";

type Props = {
  params: {
    lang: string;
  };
};

const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function BlogsPage({ params }: Props) {
  const views = (
    await redis.mget<number[]>(
      ...allBlogs.map((p) => ["pageviews", "blogs", p.slug].join(":"))
    )
  ).reduce((acc, v, i) => {
    acc[allBlogs[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const lang = params?.lang;

  const sorted = allBlogs
    .filter((p) => p.published)
    .filter((p) => p.lang === lang)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
    );

  return (
    <div className="relative pb-16">
      <Navigation lang={lang} />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="mx-auto lg:mx-0 flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Blogs
          </h2>

          <LanguageSwitcher />
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((blog) => (
                <Card key={blog.slug}>
                  <Article
                    blog={blog}
                    views={views[blog.slug] ?? 0}
                    lang={lang}
                  />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((blog) => (
                <Card key={blog.slug}>
                  <Article
                    blog={blog}
                    views={views[blog.slug] ?? 0}
                    lang={lang}
                  />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((blog) => (
                <Card key={blog.slug}>
                  <Article
                    blog={blog}
                    views={views[blog.slug] ?? 0}
                    lang={lang}
                  />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
