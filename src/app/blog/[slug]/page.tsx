import { getPost } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { TableOfContents } from "@/components/table-of-contents";
import ClientBlog from "@/components/client-blog"; // 👈 gọi file client-blog

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
    <div className="cursor-none min-h-screen grid grid-cols-5 relative">
      {/* Chuột ảo */}
      <SmoothCursor />

      {/* Sidebar TOC (chiếm 1/5 bên trái) */}
      <aside className="hidden lg:block col-span-1 p-4 border-r border-border">
        <div className="sticky top-20">
          <nav aria-label="Table of contents">
            <TableOfContents className="text-xs" />
          </nav>
        </div>
      </aside>

      {/* Nội dung blog (chiếm 4/5 bên phải) */}
      <main className="col-span-5 lg:col-span-4 px-6 lg:px-12 py-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {post.metadata.title}
        </h1>

        <div className="text-sm text-muted-foreground mb-6">
          <Suspense fallback={<p className="h-5" />}>
            <p>{formatDate(post.metadata.publishedAt)}</p>
          </Suspense>
        </div>

        {/* 👇 Render nội dung + zoom */}
        <ClientBlog source={post.source} />
      </main>
    </div>
  );
}