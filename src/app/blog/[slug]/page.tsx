import { getPost } from "@/data/blog";
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
    <div className="cursor-none min-h-screen grid grid-cols-12 relative w-full">
      {/* Chuột ảo */}
      <SmoothCursor />

      {/* Nội dung blog */}
      <main className="col-span-12 lg:col-span-9 px-6 lg:px-12 py-10">
        <div className="max-w-4xl mx-auto">
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
        </div>
      </main>

      {/* Sidebar TOC */}
      <aside className="hidden lg:block col-span-3 p-6 bg-muted/40 border-l border-border">
        <div className="sticky top-20">
          <TableOfContents />
        </div>
      </aside>
    </div>
  );
}