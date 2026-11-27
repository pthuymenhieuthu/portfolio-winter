import { getPost } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TableOfContents } from "@/components/table-of-contents";
import ClientBlog from "@/components/client-blog";
import { PasswordGate } from "@/components/password-gate";
import { AffinaBrandCaseStudy } from "@/components/affina-brand-case-study";
import { AffinaProductCaseStudy } from "@/components/affina-product-case-study";
import { redirect } from "next/navigation";
import { FourOrangesCaseStudy } from "@/components/four-oranges-case-study";
import { ZoanCaseStudy } from "@/components/zoan-case-study";
import { MedhuntCaseStudy } from "@/components/medhunt-case-study";
import { TrueProfitCaseStudy } from "@/components/trueprofit-case-study";
import { EdTechCaseStudy } from "@/components/edtech-case-study";
import { UiDesignSeriesCaseStudy } from "@/components/ui-design-series-case-study";
import { KioskCaseStudy } from "@/components/kiosk-case-study";
import {
  CakeCaseStudy,
  GraphicsCaseStudy,
  PizzyCaseStudy,
  ZanZanCaseStudy,
} from "@/components/legacy-project-case-studies";

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  if (params.slug === "mcdonalds-kiosk") {
    return <KioskCaseStudy />;
  }

  if (params.slug === "medhunt") {
    return <MedhuntCaseStudy />;
  }

  if (params.slug === "affina") {
    return <AffinaBrandCaseStudy />;
  }

  if (params.slug === "affina-partner-flow") {
    redirect("/blog/affina-product-design#affina-family");
  }

  if (params.slug === "affina-product-design") {
    return <AffinaProductCaseStudy />;
  }

  if (params.slug === "4oranges") {
    return <FourOrangesCaseStudy />;
  }

  if (params.slug === "zoan") {
    return <ZoanCaseStudy />;
  }

  if (params.slug === "trueprofit") {
    return <TrueProfitCaseStudy />;
  }

  if (params.slug === "edtechapp") {
    return <EdTechCaseStudy />;
  }

  if (params.slug === "chande") {
    return <UiDesignSeriesCaseStudy />;
  }

  if (params.slug === "graphics") {
    return <GraphicsCaseStudy />;
  }

  if (params.slug === "pizzy") {
    return <PizzyCaseStudy />;
  }

  if (params.slug === "cake") {
    return <CakeCaseStudy />;
  }

  if (params.slug === "lollypop" || params.slug === "zanzan") {
    return <ZanZanCaseStudy />;
  }

  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const isProtected = Boolean(post.metadata.protected);

  return (
    <div className="min-h-screen relative flex justify-center">
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

        {/* Nếu bài viết được đánh dấu protected thì wrap trong PasswordGate */}
        {isProtected ? (
          <PasswordGate slug={params.slug} title={post.metadata.title}>
            <ClientBlog source={post.source} />
          </PasswordGate>
        ) : (
          <ClientBlog source={post.source} />
        )}
      </main>

      {/* TOC */}
      <aside className="hidden lg:block fixed left-[calc(50%-768px/2-200px)] top-36 w-44">
        <nav aria-label="Table of contents">
          <TableOfContents className="text-xs" />
        </nav>
      </aside>
    </div>
  );
}
