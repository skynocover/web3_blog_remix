import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node'; // or "@remix-run/cloudflare"
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
  return redirect('/posts');
};

export default function Index() {
  useLoaderData();

  return <></>;
}
