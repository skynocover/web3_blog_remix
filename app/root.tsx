import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { json } from '@remix-run/node'; // or "@remix-run/cloudflare"
import { useLoaderData } from '@remix-run/react';
import { Layout } from '~/components';
import styles from './styles/app.css';
import { AppProvider } from '~/AppContext';

import liteCss from 'react-markdown-editor-lite/lib/index.css';

export function links() {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: liteCss },
  ];
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'ELog',
  viewport: 'width=device-width,initial-scale=1',
});

export async function loader() {
  return json({ ENV: { NODE_ENV: process.env.NODE_ENV } });
}

export default function App() {
  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-500">
        <AppProvider>
          <Layout>
            <Outlet />
          </Layout>
        </AppProvider>

        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
