<div align="center">
<img alt="Portfolio" src="https://github.com/dillionverma/portfolio/assets/16860528/57ffca81-3f0a-4425-b31d-094f61725455" width="90%">
</div>

# Portfolio [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdillionverma%2Fportfolio)

Built with next.js, [shadcn/ui](https://ui.shadcn.com/), and [magic ui](https://magicui.design/), deployed on Vercel.

# Features

- Setup only takes a few minutes by editing the [single config file](./src/data/resume.tsx)
- Built using Next.js 14, React, Typescript, Shadcn/UI, TailwindCSS, Framer Motion, Magic UI
- Includes a blog
- Responsive for different devices
- Optimized for Next.js and Vercel

# Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/dillionverma/portfolio
   ```

2. Move to the cloned directory

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the local Server:

   ```bash
   pnpm dev
   ```

5. Open the [Config file](./src/data/resume.tsx) and make changes

## Portfolio AI guide

The home hero sends questions to `/api/portfolio-chat`. The server uses public portfolio facts in `src/lib/portfolio-chat-knowledge.ts` and returns a short answer with an optional case-study link. Questions are not sent to analytics or stored on the server. The current tab keeps the conversation in `sessionStorage` so visitors can return from a case study and continue.

To enable it locally, copy `.env.example` to `.env.local`, add your OpenAI API key, and restart `pnpm dev`. For production, add `OPENAI_API_KEY` in the Vercel project's environment variables and redeploy. The key must stay server-side; do not use a `NEXT_PUBLIC_` variable. `OPENAI_MODEL` is optional and defaults to `gpt-6-luna`.

# License

Licensed under the [MIT license](https://github.com/dillionverma/portfolio/blob/main/LICENSE.md).
