import { getPost } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { TableOfContents } from "@/components/table-of-contents";
import ClientBlog from "@/components/client-blog";

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
    <div className="cursor-none min-h-screen relative flex justify-center">
      {/* Chuột ảo */}
      <SmoothCursor />

      {/* Nội dung blog */}
      <main className="max-w-3xl w-full px-6 lg:px-12 py-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {post.metadata.title}
        </h1>

        <div className="text-sm text-muted-foreground mb-6">
          <Suspense fallback={<p className="h-5" />}>
            <p>{formatDate(post.metadata.publishedAt)}</p>
          </Suspense>
        </div>

        <ClientBlog source={post.source} />
      </main>

      {/* TOC: nằm ngoài content, cách 28px */}
      <aside className="hidden lg:block fixed left-[calc(50%-768px/2-204px)] top-20 w-44">
        <nav aria-label="Table of contents">
          <TableOfContents className="text-xs" />
        </nav>
      </aside>
    </div>
  );
}