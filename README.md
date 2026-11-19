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

### Windows: Supabase `fetch failed`

If Node reports `SELF_SIGNED_CERT_IN_CHAIN` on a machine that uses approved HTTPS inspection, Node may not trust the same certificate authority (CA) as Windows. Use a PEM copy of the trusted CA provided by your IT administrator.

Stop the existing Next.js server with Ctrl+C. If the CA path was already saved in your Windows user environment, load it in the same PowerShell terminal that will start Next.js:

```powershell
$env:NODE_EXTRA_CA_CERTS = [Environment]::GetEnvironmentVariable('NODE_EXTRA_CA_CERTS', 'User')
if (-not $env:NODE_EXTRA_CA_CERTS -or -not (Test-Path -LiteralPath $env:NODE_EXTRA_CA_CERTS -PathType Leaf)) {
  throw 'Set NODE_EXTRA_CA_CERTS to the path of your trusted CA PEM file first.'
}
npm run dev
```

Use `npm run dev -- -p 3001` instead if a production server already uses port 3000, then open [http://localhost:3001/contact](http://localhost:3001/contact). For production mode, use `npm run start` after building. Node reads `NODE_EXTRA_CA_CERTS` at startup; setting it only in `.env.local` will not fix an already-running process. Do not disable TLS verification.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

In your Vercel project, open **Settings > Environment Variables** and add both variables from your local `.env.local`:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | The publishable key from the same Supabase project |

Select **Production** for the live site and **Preview** if preview deployments need Supabase. Do not use a secret or service-role key. Redeploy after saving so the next build picks up the values; `.env.local` is not deployed from Git.

Without these variables, public pages still load, but session refresh is disabled and the contact form cannot save enquiries. To enable submissions, apply the [contact enquiries migration](./supabase/migrations/20261119123700_create_contact_enquiries.sql) to the same Supabase project.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
