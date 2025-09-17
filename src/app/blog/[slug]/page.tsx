import { getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { TableOfContents } from "@/components/table-of-contents";

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="cursor-none min-h-screen flex relative">
      {/* Chuột ảo */}
      <SmoothCursor />

      {/* Nội dung blog */}
      <main className="flex-1 px-6 lg:px-12 py-10 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {post.metadata.title}
        </h1>

        <div className="text-sm text-muted-foreground mb-6">
          <Suspense fallback={<p className="h-5" />}>
            <p>{formatDate(post.metadata.publishedAt)}</p>
          </Suspense>
        </div>

        <article
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.source }}
        />
      </main>

      {/* Sidebar TOC */}
      <aside className="hidden lg:block w-[300px] flex-shrink-0 p-6 bg-muted/40 border-l border-border">
        <div className="sticky top-20">
          <TableOfContents />
        </div>
      </aside>
    </div>
  );
}
