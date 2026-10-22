This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Analytics (Umami)

The site renders an [Umami](https://umami.is) tag only when a website id is
configured. With no id set the tag is omitted entirely, so local development
and forks never send traffic.

Configuration is read at build time from these variables:

| Variable | Required | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | yes | none (analytics off) |
| `NEXT_PUBLIC_UMAMI_SCRIPT_URL` | no | `https://cloud.umami.is/script.js` |
| `NEXT_PUBLIC_UMAMI_DOMAINS` | no | none (tracks on any host) |

### Turning it on

1. Create a site in [Umami Cloud](https://cloud.umami.is) (free tier) or in
   your self-hosted instance, and copy its **Website ID**.
2. In GitHub, go to **Settings > Secrets and variables > Actions > Variables**
   and add a repository variable `UMAMI_WEBSITE_ID` with that id. The id is
   public (it ships in the page HTML), so a variable is correct here, not a
   secret.
3. Push to `main`. The deploy workflow passes the variable into the build.

Self-hosting instead of Umami Cloud? Also set `UMAMI_SCRIPT_URL` to your
instance's `script.js` URL.

To keep stray hosts out of your stats, set `UMAMI_DOMAINS` to
`n427.github.io`; the Umami script then ignores page views from anywhere else.

### Checking it locally

```bash
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-id npm run dev
```

Then confirm a `script` tag pointing at `script.js` appears in the DOM.
