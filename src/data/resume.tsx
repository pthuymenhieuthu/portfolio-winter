import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Winter Nguyen",
  initials: "Winter",
  url: "https://pthuyday.xyz",
  location: "Ho Chi Minh City, Vietnam",
  locationLink: "https://www.google.com/maps/place/hochiminh",
  description:
    "Proactive UI/UX Designer · Passionate about learning and growth",
  summary:
    "My name is Thuy (Winter). I just graduated in July this year, and [I have dedicated a significant amount of time learning about UI/UX as well as participating in a competition](/#certifications), so I have a good understanding of how the design process works and some knowledge of front-end development/coding. Additionally, with internship experience at major companies like [TikTok, Innisfree, and ELSA Speak](/#work), I am confident that I have a solid grasp of business requirements and can view things from both a business and user perspective to deliver the best product. I look forward to collaborating with you!",
  avatarUrl: "/me.jpeg",
  skills: [
    "UI Design",
    "UX Design",
    "UI/UX",
    "Coding",  
    "Video Editing",
    "Social Media",
    "Web Builder",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "phuongthuy101222@gmail.com",
    tel: "+84 583 546 018",
    social: {
      Behance: {
        name: "Behance",
        url: "https://www.behance.net/thuynguyen175",
        icon: Icons.behance,

        navbar: true,
      },
      Dribble: {
        name: "Dribble",
        url: "https://www.behance.net/thuynguyen175",
        icon: Icons.dribble,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/thuy-nguyen-1665ab208/",
        icon: Icons.linkedin,

        navbar: true,
      },
      Threads: {
        name: "Threads",
        url: "https://www.threads.net/@winter.arrt",
        icon: Icons.threads,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto: phuongthuy101222@gmail.com",
        icon: Icons.email,

        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Gufoods",
      href: "https://www.gufoods.com",
      badges: [],
      location: "Remote",
      title: "Design Intern",
      logoUrl: "/gufoods.png",
      start: "Jul 2021",
      end: "Feb 2022",
      description:
        "• Developed the Information Architecture (IA), and completed the high-fidelity wireframe design for Rice Cake Recipes.\n • Designed marketing collateral, including brochures, social media posts, and promotional materials.\n • Edited videos and created interactive stories using CapCut.",
    },
    {
      company: "ELSA Speak",
      badges: [],
      href: "https://elsaspeak.com",
      location: "Remote",
      title: "Intern",
      logoUrl: "/elsaspeak.png",
      start: "Nov 2022",
      end: "Aug 2023",
      description:
        "• Planned and created content across social media channels\n • Designed corresponding images and videos.\n • Supported Influencer Marketing campaign.",
    },
    {
      company: "Innisfree",
      href: "https://innisfree.vn/",
      badges: [],
      location: "Ho Chi Minh City",
      title: "Intern",
      logoUrl: "/innisfree.png",
      start: "May 2023",
      end: "Oct 2023",
      description:
        "• Collaborated with the CJ development team to enhance the landing page\n • Set up campaigns and inserted code into the event page to ensure functionality on sale days.\n • Conducted competitor research on other sales pages, providing briefs and visual feedback for both the key visuals and event pages.",
    },
    {
      company: "TikTok Shop",
      href: "",
      badges: [],
      location: "Ho Chi Minh City",
      title: "Intern",
      logoUrl: "/tiktokshop.png",
      start: "Dec 2023",
      end: "Jul 2024",
      description:
        "• Regularly used Figma to design social media posts, enhancing design and layout skills.\n • Understood the user purchasing journey through experience in e-commerce platforms.\n • Conducted competitor research on sales academy flows on Lazada and Shopee, identifying key UX/UI improvements.",
    },
  ],
  education: [
    {
      school: "Buildspace",
      href: "https://buildspace.so",
      degree: "s3, s4, sf1, s5",
      logoUrl: "/buildspace.jpg",
      start: "2023",
      end: "2024",
    },
    {
      school: "University of Waterloo",
      href: "https://uwaterloo.ca",
      degree: "Bachelor's Degree of Computer Science (BCS)",
      logoUrl: "/waterloo.png",
      start: "2016",
      end: "2021",
    },
    {
      school: "Wilfrid Laurier University",
      href: "https://wlu.ca",
      degree: "Bachelor's Degree of Business Administration (BBA)",
      logoUrl: "/laurier.png",
      start: "2016",
      end: "2021",
    },
    {
      school: "International Baccalaureate",
      href: "https://ibo.org",
      degree: "IB Diploma",
      logoUrl: "/ib.png",
      start: "2012",
      end: "2016",
    },
  ],
  projects: [
    {
      title: "Chat Collect",
      href: "https://chatcollect.com",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://chatcollect.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "Magic UI",
      href: "https://magicui.design",
      dates: "June 2023 - Present",
      active: true,
      description:
        "Designed, developed and sold animated UI components for developers.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://magicui.design",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/magicuidesign/magicui",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "llm.report",
      href: "https://llm.report",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://llm.report",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dillionverma/llm.report",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
    {
      title: "Automatic Chat",
      href: "https://automatic.chat",
      dates: "April 2023 - March 2024",
      active: true,
      description:
        "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://automatic.chat",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    },
  ],
} as const;
