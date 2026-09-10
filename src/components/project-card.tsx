import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ResponsiveMotionImage } from "@/components/responsive-motion-image";
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
  video?: string;
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
    <Card className="group relative flex h-full flex-col overflow-hidden border text-[#29303B] transition-all duration-300 ease-out hover:shadow-lg">
      <Link
        aria-label={`View ${title} project`}
        href={href || "#"}
        className={cn(
          "absolute inset-0 z-10 cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3BA0FF]/45 focus-visible:ring-inset",
          className
        )}
      />

      <div className="block">
        {video && (
          <ResponsiveMotionImage
            src={video}
            alt={title}
            width={1200}
            height={900}
            mobilePosterSrc={image || undefined}
            className="pointer-events-none mx-auto aspect-[4/3] h-auto w-full object-cover object-top"
            unoptimized
            sizes="(max-width: 768px) 100vw, 600px"
          />
        )}

        {!video && image && (
          <ResponsiveMotionImage
            src={image}
            alt={title}
            width={1200}
            height={900}
            className="aspect-[4/3] h-auto w-full overflow-hidden object-cover object-top"
            priority={false}
            sizes="(max-width: 768px) 100vw, 600px"
          />
        )}
      </div>

      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-[17px] font-medium leading-[1.25] tracking-normal text-[#29303B] sm:text-lg">
            {title}
          </CardTitle>
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
              <Badge className="px-1 py-0 text-[10px] text-[#29303B]" variant="secondary" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="relative z-20 px-2 pb-2">
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
