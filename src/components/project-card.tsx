import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string; // static/remote image
  video?: string; // GIF or animated image URL
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Card className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full">
      <Link href={href || "#"} className={cn("block cursor-pointer", className)}>
        {/* Ưu tiên hiển thị 'video' nếu có (thường là GIF); dùng Image để tránh lint warning */}
        {video && (
          <Image
            src={video}
            alt={title}
            width={1200}
            height={384} // ~ h-40 (160px) responsive scale; đặt lớn để downscale đẹp
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
            unoptimized // giữ nguyên GIF/ảnh động
            priority={false}
            sizes="(max-width: 768px) 100vw, 600px"
          />
        )}

        {!video && image && (
          <Image
            src={image}
            alt={title}
            width={1200}
            height={384}
            className="h-40 w-full overflow-hidden object-cover object-top"
            priority={false}
            sizes="(max-width: 768px) 100vw, 600px"
          />
        )}
      </Link>

      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>

      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge className="px-1 py-0 text-[10px]" variant="secondary" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links.map((l, idx) => (
              <Link href={l.href} key={idx} target="_blank">
                <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                  {l.icon}
                  {l.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}